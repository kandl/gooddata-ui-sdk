// (C) 2021-2022 GoodData Corporation
import { objRefToString, isDashboardAttributeFilter, isKpiWidget, } from "@gooddata/sdk-model";
import { filterContextItemsToDashboardFiltersByWidget } from "../../converters/index.js";
import isEmpty from "lodash/isEmpty.js";
import { select, call } from "redux-saga/effects";
import { invariant } from "ts-invariant";
import { invalidQueryArguments } from "../events/general.js";
import { selectAlertByWidgetRef } from "../store/alerts/alertsSelectors.js";
import { selectFilterContextFilters } from "../store/filterContext/filterContextSelectors.js";
import { selectAnalyticalWidgetByRef } from "../store/layout/layoutSelectors.js";
import { createQueryService } from "../store/_infra/queryService.js";
import { resolveDisplayFormMetadata } from "../utils/displayFormResolver.js";
import { getBrokenAlertFiltersBasicInfo } from "../utils/alertsUtils.js";
export const QueryWidgetBrokenAlertService = createQueryService("GDC.DASH/QUERY.WIDGET.BROKEN_ALERTS", queryService);
function* queryService(ctx, query) {
    var _a;
    const { payload: { widgetRef }, correlationId, } = query;
    const { alert, kpiWidget } = yield call(getKpiWidgetAndAlert, widgetRef, ctx, correlationId);
    const alertFilters = (_a = alert === null || alert === void 0 ? void 0 : alert.filterContext) === null || _a === void 0 ? void 0 : _a.filters;
    // no filters -> no filters can be broken, bail early
    if (!alert || !alertFilters) {
        return [];
    }
    const displayFormsMap = yield call(resolveDisplayForms, alert, ctx);
    const appliedFilters = yield call(getDashboardFilters, kpiWidget);
    return getBrokenAlertFiltersBasicInfo(alert, kpiWidget, appliedFilters, displayFormsMap);
}
function* getKpiWidgetAndAlert(widgetRef, ctx, correlationId) {
    const widgetSelector = selectAnalyticalWidgetByRef(widgetRef);
    const kpiWidget = yield select(widgetSelector);
    if (!kpiWidget) {
        throw invalidQueryArguments(ctx, `Widget with ref ${objRefToString(widgetRef)} does not exist on the dashboard`, correlationId);
    }
    if (!isKpiWidget(kpiWidget)) {
        throw invalidQueryArguments(ctx, `Widget with ref ${objRefToString(widgetRef)} is not IKpiWidget, only IKpiWidget could has alert assign.`, correlationId);
    }
    const alertSelector = selectAlertByWidgetRef(kpiWidget.ref);
    const alert = yield select(alertSelector);
    return { alert, kpiWidget };
}
function* resolveDisplayForms(alert, ctx) {
    const displayFormIds = extractDisplayFormRefs(alert);
    const result = yield call(resolveDisplayFormMetadata, ctx, displayFormIds);
    // if some display forms could not be resolved then there is something seriously wrong
    invariant(isEmpty(result.missing), "Unable resolve some AttributeDisplayForms defined by alert filters");
    return result.resolved;
}
function* getDashboardFilters(kpiWidget) {
    const dashboardFilters = yield select(selectFilterContextFilters);
    const allFilters = filterContextItemsToDashboardFiltersByWidget(dashboardFilters, kpiWidget);
    return allFilters !== null && allFilters !== void 0 ? allFilters : [];
}
function extractDisplayFormRefs(alert) {
    var _a, _b;
    const alertFilters = (_b = (_a = alert.filterContext) === null || _a === void 0 ? void 0 : _a.filters) !== null && _b !== void 0 ? _b : [];
    return alertFilters.filter(isDashboardAttributeFilter).map((filter) => {
        return filter.attributeFilter.displayForm;
    });
}
//# sourceMappingURL=queryWidgetBrokenAlerts.js.map