import { __rest } from "tslib";
import { changeRenderMode } from "../../commands/index.js";
import { selectBasicLayout } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { selectFilterContextDefinition, selectFilterContextIdentity, } from "../../store/filterContext/filterContextSelectors.js";
import { selectDashboardDescriptor, selectPersistedDashboard } from "../../store/meta/metaSelectors.js";
import { selectDateFilterConfigOverrides } from "../../store/dateFilterConfig/dateFilterConfigSelectors.js";
import { batchActions } from "redux-batched-actions";
import { dashboardSaved } from "../../events/dashboard.js";
import { metaActions } from "../../store/meta/index.js";
import { filterContextActions } from "../../store/filterContext/index.js";
import { dashboardFilterContextIdentity } from "../../../_staging/dashboard/dashboardFilterContext.js";
import { invariant } from "ts-invariant";
import { dashboardLayoutRemoveIdentity, dashboardLayoutWidgetIdentityMap, } from "../../../_staging/dashboard/dashboardLayout.js";
import { isTemporaryIdentity } from "../../utils/dashboardItemUtils.js";
import { layoutActions } from "../../store/layout/index.js";
import { savingActions } from "../../store/saving/index.js";
import { selectSettings } from "../../store/config/configSelectors.js";
import { selectBackendCapabilities } from "../../store/backendCapabilities/backendCapabilitiesSelectors.js";
import { changeRenderModeHandler } from "../renderMode/changeRenderModeHandler.js";
import { selectIsInViewMode } from "../../store/renderMode/renderModeSelectors.js";
import { createListedDashboard } from "../../../_staging/listedDashboard/listedDashboardUtils.js";
import { listedDashboardsActions } from "../../store/listedDashboards/index.js";
import { accessibleDashboardsActions } from "../../store/accessibleDashboards/index.js";
function createDashboard(ctx, saveCtx) {
    return ctx.backend.workspace(ctx.workspace).dashboards().createDashboard(saveCtx.dashboardToSave);
}
function updateDashboard(ctx, saveCtx) {
    const { persistedDashboard, dashboardToSave } = saveCtx;
    invariant(persistedDashboard);
    return ctx.backend
        .workspace(ctx.workspace)
        .dashboards()
        .updateDashboard(persistedDashboard, dashboardToSave);
}
export function getDashboardWithSharing(dashboard, sharingEnabled = false, sharingSupported = true, isNewDashboard) {
    let shareProp = {};
    if (isNewDashboard) {
        const { isUnderStrictControl: _unusedIsUnderStrictControl } = dashboard, dashboardRest = __rest(dashboard, ["isUnderStrictControl"]);
        shareProp =
            sharingEnabled && sharingSupported
                ? {
                    shareStatus: "private",
                    isUnderStrictControl: true,
                }
                : {
                    shareStatus: "public",
                };
        return Object.assign(Object.assign({}, dashboardRest), shareProp);
    }
    return dashboard;
}
/*
 * TODO: custom widget persistence; we need a new backend capability that indicates whether the
 *  backend can persist custom widget content (tiger can already, bear cannot). Based on that
 *  capability, this code should use either the selectBasicLayout (that strips any custom widgets) or
 *  selectLayout (that keeps custom widgets).
 */
function* createDashboardSaveContext(cmd, isNewDashboard) {
    var _a;
    const persistedDashboard = yield select(selectPersistedDashboard);
    const dashboardDescriptor = yield select(selectDashboardDescriptor);
    const filterContextDefinition = yield select(selectFilterContextDefinition);
    const filterContextIdentity = yield select(selectFilterContextIdentity);
    const layout = yield select(selectBasicLayout);
    const dateFilterConfig = yield select(selectDateFilterConfigOverrides);
    const settings = yield select(selectSettings);
    const capabilities = yield select(selectBackendCapabilities);
    /*
     * When updating an existing dashboard, the services expect that the dashboard definition to use for
     * updating contains the identity of the existing dashboard.
     *
     * It's ok to have no identity when creating a new dashboard - it will be assigned during the save.
     */
    const dashboardIdentity = {
        ref: persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.ref,
        uri: persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.uri,
        identifier: persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.identifier,
    };
    const pluginsProp = (persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.plugins) ? { plugins: persistedDashboard.plugins } : {};
    const dashboardFromState = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ type: "IDashboard" }, dashboardDescriptor), { title: (_a = cmd.payload.title) !== null && _a !== void 0 ? _a : dashboardDescriptor.title }), dashboardIdentity), { filterContext: Object.assign(Object.assign({}, filterContextIdentity), filterContextDefinition), layout,
        dateFilterConfig }), pluginsProp);
    const dashboardToSave = Object.assign(Object.assign({}, dashboardFromState), { layout: dashboardLayoutRemoveIdentity(layout, isTemporaryIdentity) });
    return {
        cmd,
        persistedDashboard,
        dashboardFromState,
        dashboardToSave: getDashboardWithSharing(dashboardToSave, settings.enableAnalyticalDashboardPermissions, capabilities.supportsAccessControl, isNewDashboard),
    };
}
function* save(ctx, saveCtx, saveFn, saveActionName) {
    const dashboard = yield call(saveFn, ctx, saveCtx);
    /*
     * The crucial thing to do after the save is to update the identities of different objects that are stored
     * in the dashboard state and either:
     *
     * 1.  have no identity (such as dashboard itself or filter context in case of new dashboards)
     * 2.  or have temporary identity (such as KPI and Insight widgets in case of any dashboard that gets
     *     modified with new content).
     *
     * The first task is easy. The second requires additional processing to identify mapping between
     * temporary identity and persistent identity and then update the layout state accordingly.
     */
    const identityMapping = dashboardLayoutWidgetIdentityMap(saveCtx.dashboardFromState.layout, dashboard.layout);
    const actions = [
        metaActions.setMeta({ dashboard }),
        filterContextActions.updateFilterContextIdentity({
            filterContextIdentity: dashboardFilterContextIdentity(dashboard),
        }),
        layoutActions.updateWidgetIdentities(identityMapping),
        layoutActions.clearLayoutHistory(),
    ];
    if (saveCtx.persistedDashboard === undefined) {
        const listedDashboard = createListedDashboard(dashboard);
        actions.push(listedDashboardsActions.addListedDashboard(listedDashboard), accessibleDashboardsActions.addAccessibleDashboard(listedDashboard));
    }
    const batch = batchActions(actions, saveActionName);
    return {
        batch,
        dashboard,
    };
}
export function* saveDashboardHandler(ctx, cmd) {
    try {
        yield put(savingActions.setSavingStart());
        const persistedDashboard = yield select(selectPersistedDashboard);
        const isNewDashboard = persistedDashboard === undefined;
        const saveCtx = yield call(createDashboardSaveContext, cmd, isNewDashboard);
        let result;
        if (isNewDashboard) {
            result = yield call(save, ctx, saveCtx, createDashboard, "@@GDC.DASH.SAVE_NEW");
        }
        else {
            result = yield call(save, ctx, saveCtx, updateDashboard, "@@GDC.DASH.SAVE_EXISTING");
        }
        const { dashboard, batch } = result;
        yield put(batch);
        if (isNewDashboard) {
            /*
             * We must do this by mutating the context object, the setContext effect changes the context only
             * for the current saga and its children. See https://github.com/redux-saga/redux-saga/issues/1798#issuecomment-468054586
             */
            ctx.dashboardRef = dashboard.ref;
        }
        const isInViewMode = yield select(selectIsInViewMode);
        if (!isInViewMode) {
            yield call(changeRenderModeHandler, ctx, changeRenderMode("view", undefined, cmd.correlationId));
        }
        yield put(savingActions.setSavingSuccess());
        return dashboardSaved(ctx, dashboard, isNewDashboard, cmd.correlationId);
    }
    catch (e) {
        yield put(savingActions.setSavingError(e));
        throw e;
    }
}
//# sourceMappingURL=saveDashboardHandler.js.map