// (C) 2021-2022 GoodData Corporation
import { alertsActions } from "../../../store/alerts/index.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { createDefaultFilterContext } from "../../../../_staging/dashboard/defaultFilterContext.js";
import { layoutActions } from "../../../store/layout/index.js";
import { insightsActions } from "../../../store/insights/index.js";
import { metaActions } from "../../../store/meta/index.js";
import { uiActions } from "../../../store/ui/index.js";
import { areObjRefsEqual, isDashboardAttributeFilter, } from "@gooddata/sdk-model";
import { dashboardFilterContextDefinition, dashboardFilterContextIdentity, } from "../../../../_staging/dashboard/dashboardFilterContext.js";
import { dashboardLayoutSanitize } from "../../../../_staging/dashboard/dashboardLayout.js";
import { resolveFilterDisplayForms } from "../../../utils/filterResolver.js";
import { call } from "redux-saga/effects";
import { getPrivateContext } from "../../../store/_infra/contexts.js";
import { loadAvailableDisplayFormRefs } from "./loadAvailableDisplayFormRefs.js";
import update from "lodash/fp/update.js";
import isEmpty from "lodash/isEmpty.js";
export const EmptyDashboardLayout = {
    type: "IDashboardLayout",
    sections: [],
};
/**
 * Returns a list of actions which when processed will initialize the essential parts of the dashboard
 * state so that it shows a new, empty dashboard.
 *
 * @param dateFilterConfig - date filter config to use for the new dashboard
 */
export function actionsToInitializeNewDashboard(dateFilterConfig) {
    return [
        alertsActions.setAlerts([]),
        filterContextActions.setFilterContext({
            filterContextDefinition: createDefaultFilterContext(dateFilterConfig),
            attributeFilterDisplayForms: [],
        }),
        layoutActions.setLayout(EmptyDashboardLayout),
        insightsActions.setInsights([]),
        metaActions.setMeta({}),
    ];
}
function* sanitizeFilterContext(ctx, filterContext) {
    // we don't need sanitize filter references, if backend guarantees consistent references
    if (!ctx.backend.capabilities.allowsInconsistentRelations) {
        return filterContext;
    }
    if (!filterContext || isEmpty(filterContext.filters)) {
        return filterContext;
    }
    const usedFilterDisplayForms = filterContext.filters
        .filter(isDashboardAttributeFilter)
        .map((f) => f.attributeFilter.displayForm);
    const availableRefs = yield call(loadAvailableDisplayFormRefs, ctx, usedFilterDisplayForms);
    return update("filters", (filters) => filters.filter((filter) => {
        if (!isDashboardAttributeFilter(filter)) {
            return true;
        }
        return availableRefs.some((ref) => areObjRefsEqual(ref, filter.attributeFilter.displayForm));
    }), filterContext);
}
/**
 * Returns a list of actions which when processed will initialize filter context, layout and meta parts
 * of the state for an existing dashboard.
 *
 * This generator will perform the essential cleanup, sanitization and resolution on top of of the input
 * dashboard and use the sanitized values to initialize the state:
 *
 * -  Layout sizing sanitization happens here
 * -  Resolution of attribute filter display forms happens here (this may be async)
 *
 * @param ctx - dashboard context in which the initialization is done
 * @param dashboard - dashboard to create initialization actions for
 * @param insights - insights used on the dashboard; note that this function will not create actions to store
 *  these insights in the state; it uses the insights to perform sanitization of the dashboard layout
 * @param settings - settings currently in effect; note that this function will not create actions to store
 *  the settings in the state; it uses the settings during layout sanitization
 * @param dateFilterConfig - effective date filter config to use; note that this function will not store
 *  the date filter config anywhere; it uses the config during filter context sanitization & determining
 *  which date option is selected
 * @param displayForms - specify display forms that should be used for in-memory resolution of
 *  attribute filter display forms to metadata objects
 * @param persistedDashboard - dashboard to use for the persisted dashboard state slice in case it needs to be different from the dashboard param
 */
export function* actionsToInitializeExistingDashboard(ctx, dashboard, insights, settings, dateFilterConfig, displayForms, persistedDashboard) {
    var _a, _b, _c, _d, _e, _f;
    const sanitizedFilterContext = yield call(sanitizeFilterContext, ctx, dashboard.filterContext);
    const sanitizedDashboard = Object.assign(Object.assign({}, dashboard), { layout: (_a = dashboard.layout) !== null && _a !== void 0 ? _a : EmptyDashboardLayout, filterContext: sanitizedFilterContext });
    const privateCtx = yield call(getPrivateContext);
    const customizedDashboard = (_c = (_b = privateCtx === null || privateCtx === void 0 ? void 0 : privateCtx.existingDashboardTransformFn) === null || _b === void 0 ? void 0 : _b.call(privateCtx, sanitizedDashboard)) !== null && _c !== void 0 ? _c : sanitizedDashboard;
    const modifiedWidgets = (_e = (_d = privateCtx === null || privateCtx === void 0 ? void 0 : privateCtx.widgetsOverlayFn) === null || _d === void 0 ? void 0 : _d.call(privateCtx, customizedDashboard)) !== null && _e !== void 0 ? _e : {};
    const filterContextDefinition = dashboardFilterContextDefinition(customizedDashboard, dateFilterConfig);
    const filterContextIdentity = dashboardFilterContextIdentity(customizedDashboard);
    const attributeFilterDisplayForms = yield call(resolveFilterDisplayForms, ctx, filterContextDefinition.filters, displayForms);
    /*
     * NOTE: cannot do without the cast here. The layout in IDashboard is parameterized with IDashboardWidget
     * which also includes KPI and Insight widget definitions = those without identity. That is however
     * not valid: any widget for a persisted dashboard must have identity.
     *
     * Also note, nested layouts are not yet supported
     */
    const dashboardLayout = dashboardLayoutSanitize((_f = customizedDashboard.layout) !== null && _f !== void 0 ? _f : EmptyDashboardLayout, insights, settings);
    return [
        filterContextActions.setFilterContext({
            originalFilterContextDefinition: filterContextDefinition,
            filterContextDefinition,
            filterContextIdentity,
            attributeFilterDisplayForms,
        }),
        layoutActions.setLayout(dashboardLayout),
        metaActions.setMeta({
            dashboard: persistedDashboard !== null && persistedDashboard !== void 0 ? persistedDashboard : dashboard,
        }),
        insightsActions.setInsights(insights),
        metaActions.setDashboardTitle(dashboard.title),
        uiActions.clearWidgetSelection(),
        uiActions.setWidgetsOverlay(modifiedWidgets),
    ];
}
//# sourceMappingURL=stateInitializers.js.map