// (C) 2021-2023 GoodData Corporation
import { __rest } from "tslib";
import { batchActions } from "redux-batched-actions";
import { call, put, select } from "redux-saga/effects";
import { dashboardFilterContextIdentity } from "../../../_staging/dashboard/dashboardFilterContext.js";
import { dashboardLayoutRemoveIdentity, dashboardLayoutWidgetIdentityMap, } from "../../../_staging/dashboard/dashboardLayout.js";
import { dashboardCopySaved } from "../../events/dashboard.js";
import { filterContextActions } from "../../store/filterContext/index.js";
import { selectFilterContextDefinition } from "../../store/filterContext/filterContextSelectors.js";
import { layoutActions } from "../../store/layout/index.js";
import { selectBasicLayout } from "../../store/layout/layoutSelectors.js";
import { metaActions } from "../../store/meta/index.js";
import { selectDashboardDescriptor, selectPersistedDashboard, selectPersistedDashboardFilterContextAsFilterContextDefinition, } from "../../store/meta/metaSelectors.js";
import { selectDateFilterConfigOverrides } from "../../store/dateFilterConfig/dateFilterConfigSelectors.js";
import { alertsActions } from "../../store/alerts/index.js";
import { savingActions } from "../../store/saving/index.js";
import { selectSettings } from "../../store/config/configSelectors.js";
import { selectBackendCapabilities } from "../../store/backendCapabilities/backendCapabilitiesSelectors.js";
import { listedDashboardsActions } from "../../store/listedDashboards/index.js";
import { createListedDashboard } from "../../../_staging/listedDashboard/listedDashboardUtils.js";
import { accessibleDashboardsActions } from "../../store/accessibleDashboards/index.js";
import { selectCurrentUser } from "../../store/user/userSelectors.js";
import { changeRenderModeHandler } from "../renderMode/changeRenderModeHandler.js";
import { changeRenderMode } from "../../commands/index.js";
import { selectIsInViewMode } from "../../store/renderMode/renderModeSelectors.js";
function createDashboard(ctx, saveAsCtx) {
    return ctx.backend.workspace(ctx.workspace).dashboards().createDashboard(saveAsCtx.dashboardToSave);
}
/*
 * TODO: custom widget persistence; we need a new backend capability that indicates whether the
 *  backend can persist custom widget content (tiger can already, bear cannot). Based on that
 *  capability, this code should use either the selectBasicLayout (that strips any custom widgets) or
 *  selectLayout (that keeps custom widgets).
 */
function* createDashboardSaveAsContext(cmd) {
    const { title, useOriginalFilterContext } = cmd.payload;
    const titleProp = title ? { title } : {};
    const persistedDashboard = yield select(selectPersistedDashboard);
    const dashboardDescriptor = yield select(selectDashboardDescriptor);
    const originalDashboardDescription = yield select(selectPersistedDashboard);
    const filterContextDefinition = yield select(!useOriginalFilterContext || !originalDashboardDescription
        ? selectFilterContextDefinition
        : selectPersistedDashboardFilterContextAsFilterContextDefinition);
    const layout = yield select(selectBasicLayout);
    const dateFilterConfig = yield select(selectDateFilterConfigOverrides);
    const settings = yield select(selectSettings);
    const capabilities = yield select(selectBackendCapabilities);
    const { isUnderStrictControl: _unusedProp } = dashboardDescriptor, dashboardDescriptorRest = __rest(dashboardDescriptor, ["isUnderStrictControl"]);
    const dashboardFromState = Object.assign(Object.assign({ type: "IDashboard" }, dashboardDescriptorRest), { filterContext: Object.assign({}, filterContextDefinition), layout,
        dateFilterConfig });
    const pluginsProp = (persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.plugins) ? { plugins: persistedDashboard.plugins } : {};
    const shareProp = settings.enableAnalyticalDashboardPermissions && capabilities.supportsAccessControl
        ? {
            isLocked: false,
            shareStatus: "private",
            isUnderStrictControl: true,
        }
        : {
            isLocked: false,
            shareStatus: "public",
        };
    // remove widget identity from all widgets; according to the SPI contract, this will result in
    // creation of new widgets
    const dashboardToSave = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, dashboardFromState), titleProp), { layout: dashboardLayoutRemoveIdentity(layout, () => true) }), shareProp), pluginsProp);
    return {
        cmd,
        dashboardFromState,
        dashboardToSave,
    };
}
function* saveAs(ctx, saveAsCtx) {
    const dashboard = yield call(createDashboard, ctx, saveAsCtx);
    const user = yield select(selectCurrentUser);
    // we need to set createdBy manually, because conversion userRef -> IUser in createDashboard call needs UserMap for this,
    // but to get a UserMap is expensive and we know who created the dashboard.
    const dashboardWithUser = Object.assign(Object.assign({}, dashboard), { createdBy: user });
    if (!saveAsCtx.cmd.payload.switchToCopy) {
        return {
            dashboard: dashboardWithUser,
        };
    }
    const identityMapping = dashboardLayoutWidgetIdentityMap(saveAsCtx.dashboardFromState.layout, dashboardWithUser.layout);
    const batch = batchActions([
        metaActions.setMeta({ dashboard: dashboardWithUser }),
        alertsActions.setAlerts([]),
        filterContextActions.updateFilterContextIdentity({
            filterContextIdentity: dashboardFilterContextIdentity(dashboardWithUser),
        }),
        layoutActions.updateWidgetIdentities(identityMapping),
        layoutActions.clearLayoutHistory(),
    ], "@@GDC.DASH.SAVE_AS");
    return {
        batch,
        dashboard: dashboardWithUser,
    };
}
export function* saveAsDashboardHandler(ctx, cmd) {
    var _a;
    try {
        yield put(savingActions.setSavingStart());
        const saveAsCtx = yield call(createDashboardSaveAsContext, cmd);
        const { payload: { switchToCopy }, } = cmd;
        const result = yield call(saveAs, ctx, saveAsCtx);
        const { dashboard, batch } = result;
        if (batch) {
            yield put(batch);
        }
        if (switchToCopy) {
            /*
             * We must do this by mutating the context object, the setContext effect changes the context only
             * for the current saga and its children. See https://github.com/redux-saga/redux-saga/issues/1798#issuecomment-468054586
             */
            ctx.dashboardRef = dashboard.ref;
        }
        const listedDashboard = createListedDashboard(dashboard);
        yield put(listedDashboardsActions.addListedDashboard(listedDashboard));
        yield put(accessibleDashboardsActions.addAccessibleDashboard(listedDashboard));
        const isInViewMode = yield select(selectIsInViewMode);
        if (!isInViewMode) {
            yield call(changeRenderModeHandler, ctx, changeRenderMode("view", undefined, cmd.correlationId));
        }
        yield put(savingActions.setSavingSuccess());
        const isOriginalDashboardLocked = (_a = saveAsCtx.dashboardFromState.isLocked) !== null && _a !== void 0 ? _a : false;
        return dashboardCopySaved(ctx, dashboard, isOriginalDashboardLocked, cmd.correlationId);
    }
    catch (e) {
        yield put(savingActions.setSavingError(e));
        throw e;
    }
}
//# sourceMappingURL=saveAsDashboardHandler.js.map