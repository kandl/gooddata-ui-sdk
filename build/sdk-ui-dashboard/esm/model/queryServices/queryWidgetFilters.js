import { all, call, select } from "redux-saga/effects";
import { createQueryService } from "../store/_infra/queryService.js";
import { areObjRefsEqual, filterObjRef, idRef, insightFilters, insightMeasures, isAllTimeDateFilter, isAttributeFilter, isDateFilter, isMeasureValueFilter, isRankingFilter, isSimpleMeasure, measureFilters, newAllTimeFilter, objRefToString, uriRef, isDashboardAttributeFilterReference, isInsightWidget, } from "@gooddata/sdk-model";
import { selectAllFiltersForWidgetByRef, selectWidgetByRef } from "../store/layout/layoutSelectors.js";
import { selectInsightByRef } from "../store/insights/insightsSelectors.js";
import { invalidQueryArguments } from "../events/general.js";
import compact from "lodash/compact.js";
import { selectAllCatalogDateDatasetsMap } from "../store/catalog/catalogSelectors.js";
import { resolveDisplayFormMetadata } from "../utils/displayFormResolver.js";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
export const QueryWidgetFiltersService = createQueryService("GDC.DASH/QUERY.WIDGET.FILTERS", queryService);
function refMatchesMdObject(ref, mdObject, type) {
    return (areObjRefsEqual(ref, mdObject.ref) ||
        areObjRefsEqual(ref, idRef(mdObject.id, type)) ||
        areObjRefsEqual(ref, uriRef(mdObject.uri)));
}
function* loadDisplayFormsForAttributeFilters(ctx, filters) {
    const refs = filters.map(filterObjRef);
    const resolvedObjects = yield call(resolveDisplayFormMetadata, ctx, compact(refs));
    // if some display forms could not be resolved then there is something seriously amiss
    invariant(isEmpty(resolvedObjects.missing));
    return filters.map((filter) => {
        return {
            filter,
            displayForm: resolvedObjects.resolved.get(filterObjRef(filter)),
        };
    });
}
function selectDateDatasetsForDateFilters(state, filters) {
    const fromCatalog = selectAllCatalogDateDatasetsMap(state);
    return filters.map((filter) => {
        const dateDataset = fromCatalog.get(filterObjRef(filter));
        return {
            dateDataset,
            filter,
        };
    });
}
function* getResolvedInsightAttributeFilters(ctx, widget, dashboardAttributeFilters, insightAttributeFilters) {
    // only dashboard filters are subject to widget ignores
    const resolvedDashboardFilters = yield call(getResolvedAttributeFilters, ctx, widget, dashboardAttributeFilters);
    return [...resolvedDashboardFilters, ...insightAttributeFilters];
}
function* getResolvedAttributeFilters(ctx, widget, attributeFilters) {
    const attributeFilterDisplayFormPairs = yield call(loadDisplayFormsForAttributeFilters, ctx, attributeFilters);
    const attributeFilterDisplayFormPairsWithIgnoreResolved = resolveWidgetFilterIgnore(widget, attributeFilterDisplayFormPairs);
    return attributeFilterDisplayFormPairsWithIgnoreResolved.map((item) => item.filter);
}
function resolveWidgetFilterIgnore(widget, dashboardNonDateFilterDisplayFormPairs) {
    return dashboardNonDateFilterDisplayFormPairs.filter(({ displayForm }) => {
        var _a;
        const matches = displayForm &&
            ((_a = widget.ignoreDashboardFilters) === null || _a === void 0 ? void 0 : _a.filter(isDashboardAttributeFilterReference).some((ignored) => refMatchesMdObject(ignored.displayForm, displayForm, "displayForm")));
        return !matches;
    });
}
/**
 * Tests whether dashboard's date filter should not be applied on the insight included in the provided widget.
 *
 * This should happen for insights whose simple measures are all already set up with date filters. I guess ignoring
 * global date filter is desired because otherwise there is a large chance that the intersection of global date filter
 * and measure's date filters would lead to empty set and no data shown for the insight?
 */
export function isDashboardDateFilterIgnoredForInsight(insight) {
    const simpleMeasures = insightMeasures(insight, isSimpleMeasure);
    return simpleMeasures.length > 0 && simpleMeasures.every((m) => { var _a; return (_a = measureFilters(m)) === null || _a === void 0 ? void 0 : _a.some(isDateFilter); });
}
function selectResolvedInsightDateFilters(state, insight, dashboardDateFilters, insightDateFilters) {
    if (isDashboardDateFilterIgnoredForInsight(insight)) {
        return insightDateFilters;
    }
    return selectResolvedDateFilters(state, [...insightDateFilters, ...dashboardDateFilters]);
}
function selectResolvedDateFilters(state, dateFilters) {
    const allDateFilterDateDatasetPairs = selectDateDatasetsForDateFilters(state, dateFilters);
    return resolveDateFilters(allDateFilterDateDatasetPairs);
}
function resolveDateFilters(allDateFilterDateDatasetPairs) {
    // go through the filters in reverse order using the first filter for a given dimension encountered
    // and strip useless all time filters at the end
    return allDateFilterDateDatasetPairs
        .filter((item) => !!item.dateDataset)
        .reduceRight((acc, curr) => {
        const alreadyPresent = acc.some((item) => refMatchesMdObject(filterObjRef(item), curr.dateDataset.dataSet, "dataSet"));
        if (!alreadyPresent) {
            acc.push(curr.filter);
        }
        return acc;
    }, [])
        .filter((item) => !isAllTimeDateFilter(item));
}
function* queryWithInsight(ctx, widget, insight) {
    const widgetAwareDashboardFiltersSelector = selectAllFiltersForWidgetByRef(widget.ref);
    const widgetAwareDashboardFilters = yield select(widgetAwareDashboardFiltersSelector);
    // add all time filter explicitly in case the date widgetAwareDashboardFilters are empty
    // this will cause the all time filter to be used instead of the insight date filter
    // if the dashboard date filter is not ignored by the widget
    if (!widgetAwareDashboardFilters.filter(isDateFilter).length && widget.dateDataSet) {
        widgetAwareDashboardFilters.push(newAllTimeFilter(widget.dateDataSet));
    }
    const effectiveInsightFilters = insightFilters(insight);
    const [dateFilters, attributeFilters] = yield all([
        select(selectResolvedInsightDateFilters, insight, widgetAwareDashboardFilters.filter(isDateFilter), effectiveInsightFilters.filter(isDateFilter)),
        call(getResolvedInsightAttributeFilters, ctx, widget, widgetAwareDashboardFilters.filter(isAttributeFilter), effectiveInsightFilters.filter(isAttributeFilter)),
    ]);
    return [
        ...dateFilters,
        ...attributeFilters,
        /**
         * Strictly speaking, there should be a resolution here that makes sure there is at most one MVF per measure.
         * This, however, is not worth the hassle: AD will not allow creating such insight, so the only way this might
         * happen is if widgetFilterOverrides have this clash (or someone created an insight manually using API directly).
         *
         * We choose to not do it here as doing it would need extension of the SPI with some getMeasures method
         * (because the catalog API cannot be used here as we do not know which dataset the given measure might come from)
         * and we do not want that extension at the moment (catalog API should still be good enough for most use cases).
         */
        ...effectiveInsightFilters.filter(isMeasureValueFilter),
        // nothing to resolve for ranking filters
        ...effectiveInsightFilters.filter(isRankingFilter),
    ];
}
function* queryWithoutInsight(ctx, widget) {
    const widgetAwareDashboardFiltersSelector = selectAllFiltersForWidgetByRef(widget.ref);
    const widgetAwareDashboardFilters = yield select(widgetAwareDashboardFiltersSelector);
    const [dateFilters, attributeFilters] = yield all([
        select(selectResolvedDateFilters, widgetAwareDashboardFilters.filter(isDateFilter)),
        call(getResolvedAttributeFilters, ctx, widget, widgetAwareDashboardFilters.filter(isAttributeFilter)),
    ]);
    return [...dateFilters, ...attributeFilters];
}
function* queryService(ctx, query) {
    const { payload: { widgetRef, insight }, correlationId, } = query;
    const widgetSelector = selectWidgetByRef(widgetRef);
    const widget = yield select(widgetSelector);
    if (!widget) {
        throw invalidQueryArguments(ctx, `Widget with ref ${objRefToString(widgetRef)} does not exist on the dashboard`, correlationId);
    }
    if (insight) {
        return yield call(queryWithInsight, ctx, widget, insight);
    }
    else {
        if (isInsightWidget(widget)) {
            const insightRef = widget.insight;
            const insightSelector = selectInsightByRef(insightRef);
            const linkedInsight = yield select(insightSelector);
            if (!linkedInsight) {
                throw invalidQueryArguments(ctx, `Insight with ref ${objRefToString(insightRef)} does not exist on the dashboard`, correlationId);
            }
            return yield call(queryWithInsight, ctx, widget, linkedInsight);
        }
        else {
            return yield call(queryWithoutInsight, ctx, widget);
        }
    }
}
//# sourceMappingURL=queryWidgetFilters.js.map