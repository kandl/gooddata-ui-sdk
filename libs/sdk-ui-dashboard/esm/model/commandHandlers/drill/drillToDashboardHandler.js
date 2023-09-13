import { call, put, select } from "redux-saga/effects";
import compact from "lodash/compact.js";
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
import { drillToDashboardRequested, drillToDashboardResolved, } from "../../events/drill.js";
import { selectFilterContextAttributeFilters, selectFilterContextDateFilter, } from "../../store/filterContext/filterContextSelectors.js";
import { selectAnalyticalWidgetByRef } from "../../store/layout/layoutSelectors.js";
import { dashboardAttributeFilterToAttributeFilter, dashboardDateFilterToDateFilterByWidget, } from "../../../converters/index.js";
import { isDrillIntersectionAttributeItem, } from "@gooddata/sdk-ui";
import { areObjRefsEqual, insightMeasures, isSimpleMeasure, measureFilters, isDateFilter, newPositiveAttributeFilter, newAllTimeFilter, } from "@gooddata/sdk-model";
import { selectCatalogDateAttributes } from "../../store/catalog/catalogSelectors.js";
import { selectInsightByRef } from "../../store/insights/insightsSelectors.js";
export function* drillToDashboardHandler(ctx, cmd) {
    var _a;
    // put start event
    yield put(drillToDashboardRequested(ctx, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId));
    // decide if we should use date filter (only if enabled and connected to a dataset)
    const widget = yield select(selectAnalyticalWidgetByRef(cmd.payload.drillEvent.widgetRef));
    const insight = yield select(selectInsightByRef(widget.insight));
    // if this bombs, widget is not an insight widget and something is seriously wrong
    invariant(insight);
    const shouldUseDateFilter = !!widget.dateDataSet && !isDateFilterDisabled(insight);
    const dateFilter = shouldUseDateFilter ? yield select(selectDrillingDateFilter, widget) : undefined;
    // get proper attr filters
    const isDrillingToSelf = areObjRefsEqual(ctx.dashboardRef, cmd.payload.drillDefinition.target);
    const dashboardFilters = isDrillingToSelf
        ? // if drilling to self, just take all filters
            yield select(selectAllAttributeFilters)
        : // if drilling to other, resolve widget filter ignores
            yield call(getWidgetAwareAttributeFilters, ctx, widget);
    const dateAttributes = yield select(selectCatalogDateAttributes);
    const drillIntersectionFilters = convertIntersectionToAttributeFilters(cmd.payload.drillEvent.drillContext.intersection, dateAttributes.map((dA) => dA.attribute.ref), (_a = ctx.backend.capabilities.supportsElementUris) !== null && _a !== void 0 ? _a : true);
    // concat everything, order is important – drill filters must go first
    const resultingFilters = compact([dateFilter, ...drillIntersectionFilters, ...dashboardFilters]);
    // put end event
    return drillToDashboardResolved(ctx, resultingFilters, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId);
}
function selectDrillingDateFilter(state, widget) {
    const globalDateFilter = selectFilterContextDateFilter(state);
    return globalDateFilter
        ? dashboardDateFilterToDateFilterByWidget(globalDateFilter, widget)
        : newAllTimeFilter(widget.dateDataSet);
}
function selectAllAttributeFilters(state) {
    return selectFilterContextAttributeFilters(state);
}
function* getWidgetAwareAttributeFilters(ctx, widget) {
    const filterContextItems = yield select(selectFilterContextAttributeFilters);
    const filters = filterContextItems.map(dashboardAttributeFilterToAttributeFilter);
    return yield call(getResolvedFiltersForWidget, ctx, widget, filters);
}
function isDateFilterDisabled(insight) {
    const measures = insightMeasures(insight);
    return isEmpty(measures)
        ? false
        : measures.every((measure) => {
            if (isSimpleMeasure(measure)) {
                const filters = measureFilters(measure);
                return !!(filters === null || filters === void 0 ? void 0 : filters.some(isDateFilter));
            }
            return true;
        });
}
function getResolvedFiltersForWidget(ctx, widget, filters) {
    return ctx.backend.workspace(ctx.workspace).dashboards().getResolvedFiltersForWidget(widget, filters);
}
/**
 *  For correct drill intersection that should be converted into AttributeFilters must be drill intersection:
 *  1. AttributeItem
 *  2. Not a date attribute
 */
function filterIntersection(intersection, dateDataSetsAttributesRefs) {
    var _a, _b;
    const attributeItem = isDrillIntersectionAttributeItem(intersection) ? intersection : undefined;
    const ref = (_b = (_a = attributeItem === null || attributeItem === void 0 ? void 0 : attributeItem.attributeHeader) === null || _a === void 0 ? void 0 : _a.formOf) === null || _b === void 0 ? void 0 : _b.ref;
    return ref ? !dateDataSetsAttributesRefs.some((ddsRef) => areObjRefsEqual(ddsRef, ref)) : false;
}
function convertIntersectionToAttributeFilters(intersection, dateDataSetsAttributesRefs, backendSupportsElementUris) {
    return intersection
        .map((i) => i.header)
        .filter((i) => filterIntersection(i, dateDataSetsAttributesRefs))
        .filter(isDrillIntersectionAttributeItem)
        .map((h) => {
        if (backendSupportsElementUris) {
            return newPositiveAttributeFilter(h.attributeHeader.ref, {
                uris: [h.attributeHeaderItem.uri],
            });
        }
        else {
            return newPositiveAttributeFilter(h.attributeHeader.ref, {
                uris: [h.attributeHeaderItem.name],
            });
        }
    });
}
//# sourceMappingURL=drillToDashboardHandler.js.map