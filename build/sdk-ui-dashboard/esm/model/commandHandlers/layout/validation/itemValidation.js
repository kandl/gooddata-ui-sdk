import { areObjRefsEqual, insightRef, objRefToString, isDashboardAttributeFilterReference, isKpiWidget, isInsightWidget, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { resolveInsights } from "../../../utils/insightResolver.js";
import { call, select } from "redux-saga/effects";
import isEmpty from "lodash/isEmpty.js";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { extractInsightRefsFromItems } from "../../../utils/dashboardItemUtils.js";
import { insightSelectDateDataset, queryDateDatasetsForInsight, queryDateDatasetsForMeasure, } from "../../../queries/index.js";
import { query } from "../../../store/_infra/queryCall.js";
import { validateAttributeFiltersToIgnore, validateDatasetForInsightWidgetDateFilter, validateDatasetForKpiWidgetDateFilter, } from "../../widgets/validation/filterValidation.js";
import { selectFilterContextAttributeFilters } from "../../../store/filterContext/filterContextSelectors.js";
function normalizeItems(items, insights) {
    return items.map((item) => {
        if (isInsightWidget(item.widget)) {
            const existingInsight = insights.get(item.widget.insight);
            invariant(existingInsight);
            return Object.assign(Object.assign({}, item), { widget: Object.assign(Object.assign({}, item.widget), { insight: insightRef(existingInsight) }) });
        }
        return item;
    });
}
/**
 * Given resolved items that should be added onto a dashboard, this function will ensure that items that reference
 * either KPI or Insight widgets reference valid insights or measures.
 *
 * Once the validity of used insights and measures is established, the code will additionally normalize the widget
 * definitions so that they use the native object `ref`s included in the referenced objects.
 *
 * This generator function will consult with backend on the existence of insights and measures if they are not
 * already stored in the state. If an insight is not found in the state but is available on the backend, the
 * insight will be retrieved and returned in the final validation result.
 */
export function* validateAndNormalizeWidgetItems(ctx, items, cmd) {
    const insightRefs = extractInsightRefsFromItems(items.resolved);
    const resolvedInsights = yield call(resolveInsights, ctx, insightRefs);
    if (!isEmpty(resolvedInsights.missing)) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to add dashboard items that reference missing insights: ${resolvedInsights.missing
            .map(objRefToString)
            .join(", ")}`);
    }
    return {
        normalizedItems: Object.assign(Object.assign({}, items), { resolved: normalizeItems(items.resolved, resolvedInsights.resolved) }),
        resolvedInsights,
    };
}
function* validateAndResolveInsightWidgetFilters(ctx, cmd, widget, autoDateDataset, resolvedInsight) {
    var _a;
    const ignoredFilterRefs = widget.ignoreDashboardFilters
        .filter(isDashboardAttributeFilterReference)
        .map((f) => f.displayForm);
    yield call(validateAttributeFiltersToIgnore, ctx, cmd, widget, ignoredFilterRefs);
    if (widget.dateDataSet) {
        yield call(validateDatasetForInsightWidgetDateFilter, ctx, cmd, widget, widget.dateDataSet, resolvedInsight);
        return widget;
    }
    else if (autoDateDataset) {
        const insightDateDatasets = yield call(query, queryDateDatasetsForInsight(resolvedInsight));
        return Object.assign(Object.assign({}, widget), { dateDataSet: (_a = insightSelectDateDataset(insightDateDatasets)) === null || _a === void 0 ? void 0 : _a.dataSet.ref });
    }
    else {
        return widget;
    }
}
function* validateAndResolveKpiFilters(ctx, cmd, widget, autoDateDataset) {
    var _a;
    const ignoredFilterRefs = widget.ignoreDashboardFilters
        .filter(isDashboardAttributeFilterReference)
        .map((f) => f.displayForm);
    yield call(validateAttributeFiltersToIgnore, ctx, cmd, widget, ignoredFilterRefs);
    if (widget.dateDataSet) {
        yield call(validateDatasetForKpiWidgetDateFilter, ctx, cmd, widget, widget.dateDataSet);
        return widget;
    }
    else if (autoDateDataset) {
        const measureDateDatasets = yield call(query, queryDateDatasetsForMeasure(widget.kpi.metric));
        return Object.assign(Object.assign({}, widget), { dateDataSet: (_a = measureDateDatasets.dateDatasetsOrdered[0]) === null || _a === void 0 ? void 0 : _a.dataSet.ref });
    }
    else {
        return widget;
    }
}
function removeObsoleteAttributeFilterIgnores(widget, attributeFilters) {
    const onlyExistingFilterIgnores = widget.ignoreDashboardFilters.filter((filterRef) => {
        if (isDashboardAttributeFilterReference(filterRef)) {
            return attributeFilters.find((filter) => areObjRefsEqual(filter.attributeFilter.displayForm, filterRef.displayForm));
        }
        return true;
    });
    return Object.assign(Object.assign({}, widget), { ignoreDashboardFilters: onlyExistingFilterIgnores });
}
/**
 * This generator function will ensure that Insight and KPI widgets that are included in the `items`
 * have valid filter settings:
 *
 * -  the date dataset to use for filtering is correct
 * -  the attribute filters to ignore are correct and reference existing attribute filters
 *
 * Additionally, if the widget does not have dateDataSet to use for filtering set AND the `autoDateDataset` is true,
 * the generator will automatically update the widget with date dataset to use for filtering. It does this by
 * performing the necessary query to obtain relevant date dataset and then picking the most relevant one.
 *
 * @param ctx - dashboard context in which filter validation & resolution is done
 * @param items - items that are about to be added to the dashboard
 * @param cmd - command that is adding the items to the dashboard
 * @param autoDateDataset - indicates whether to automatically resolve and set date dataset to use for filtering for
 * KPI and Insight widgets.
 */
export function* validateAndResolveItemFilterSettings(ctx, cmd, items, autoDateDataset = false) {
    const attributeFilters = yield select(selectFilterContextAttributeFilters);
    const { resolvedInsights, normalizedItems } = items;
    const updatedItems = [];
    let i = 0;
    for (const item of normalizedItems.resolved) {
        const widget = item.widget;
        const isNew = normalizedItems.newItemBitmap[i];
        if (!isNew) {
            /*
             * processing an existing item; this is the case when some items from the layout got stashed and
             * are now being retrieved from stash and added back onto the dashboard.
             *
             * the stashed items were already thoroughly validated & normalized the first time they were added onto the
             * dashboard so the code does not have to re-do all the validations.
             */
            if (isInsightWidget(widget) || isKpiWidget(widget)) {
                /*
                 * Insight and KPI widgets may be set to ignore some attribute filters. validation must check
                 * that any ignored filters on the stashed item are still present on the filter context.
                 *
                 * Any ignored filters that are obsolete can be safely removed.
                 */
                const updatedWidget = removeObsoleteAttributeFilterIgnores(widget, attributeFilters);
                updatedItems.push(Object.assign(Object.assign({}, item), { widget: updatedWidget }));
            }
            else {
                updatedItems.push(item);
            }
        }
        else {
            if (isInsightWidget(widget)) {
                const resolvedInsight = resolvedInsights.resolved.get(widget.insight);
                // if code gets here and the insight for the widget is not found it means either the resolution logic
                // or the logic to verify resolution result has failed. normally if insight widget references missing
                // insight the handler should find this and fail way sooner
                invariant(resolvedInsight);
                const updatedWidget = yield call(validateAndResolveInsightWidgetFilters, ctx, cmd, widget, autoDateDataset, resolvedInsight);
                updatedItems.push(Object.assign(Object.assign({}, item), { widget: updatedWidget }));
            }
            else if (isKpiWidget(widget)) {
                const updatedWidget = yield call(validateAndResolveKpiFilters, ctx, cmd, widget, autoDateDataset);
                updatedItems.push(Object.assign(Object.assign({}, item), { widget: updatedWidget }));
            }
            else {
                updatedItems.push(item);
            }
        }
        i++;
    }
    return updatedItems;
}
//# sourceMappingURL=itemValidation.js.map