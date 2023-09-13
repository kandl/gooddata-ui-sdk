import { __rest } from "tslib";
import { call, put, select } from "redux-saga/effects";
import { isFilterContext, isGranularAccessGrantee, } from "@gooddata/sdk-model";
import { dashboardSharingChanged } from "../../events/dashboard.js";
import { selectDashboardRef, selectPersistedDashboard } from "../../store/meta/metaSelectors.js";
import { invalidArgumentsProvided } from "../../events/general.js";
import { metaActions } from "../../store/meta/index.js";
import { batchActions } from "redux-batched-actions";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import { loadDashboardPermissions } from "./initializeDashboardHandler/loadDashboardPermissions.js";
import { dashboardPermissionsActions } from "../../store/dashboardPermissions/index.js";
function* createDashboardSaveSharingContext(cmd) {
    const { newSharingProperties } = cmd.payload;
    const persistedDashboard = yield select(selectPersistedDashboard);
    invariant(persistedDashboard, "Cant change sharing of unsaved dashboard");
    const { filterContext } = persistedDashboard, otherDashboardProps = __rest(persistedDashboard, ["filterContext"]);
    // ignore temp filter context to please TS as it can be present only during export
    const filterContextProp = isFilterContext(filterContext)
        ? {
            filterContext,
        }
        : {};
    const dashboardFromState = Object.assign(Object.assign({}, otherDashboardProps), filterContextProp);
    const dashboardToSave = Object.assign(Object.assign({}, dashboardFromState), { shareStatus: newSharingProperties.shareStatus, isLocked: newSharingProperties.isLocked, isUnderStrictControl: newSharingProperties.isUnderStrictControl });
    return {
        cmd,
        persistedDashboard,
        dashboardToSave,
    };
}
function updateDashboard(ctx, saveSharingCtx) {
    return ctx.backend
        .workspace(ctx.workspace)
        .dashboards()
        .updateDashboard(saveSharingCtx.persistedDashboard, saveSharingCtx.dashboardToSave);
}
function getDashboard(ctx, dashboardRef) {
    return ctx.backend.workspace(ctx.workspace).dashboards().getDashboard(dashboardRef);
}
function changeGrantees(ctx, saveSharingCtx) {
    const { granteesToAdd, granteesToDelete } = saveSharingCtx.cmd.payload.newSharingProperties;
    const grantees = [...granteesToAdd, ...granteesToDelete].filter(isGranularAccessGrantee);
    return ctx.backend.workspace(ctx.workspace).accessControl().changeAccess(ctx.dashboardRef, grantees);
}
function* saveSharing(ctx, saveSharingCtx) {
    const { granteesToAdd, granteesToDelete } = saveSharingCtx.cmd.payload.newSharingProperties;
    const grantees = [...granteesToAdd, ...granteesToDelete].filter(isGranularAccessGrantee);
    if (!isEmpty(grantees)) {
        yield call(changeGrantees, ctx, saveSharingCtx);
    }
    // get up-to-date permissions from backend
    const updatedDashboardPermissions = yield call(loadDashboardPermissions, ctx);
    const setDashboardPermissionsAction = dashboardPermissionsActions.setDashboardPermissions(updatedDashboardPermissions);
    let dashboard;
    if (updatedDashboardPermissions.canViewDashboard) {
        if (!ctx.backend.capabilities.supportsGranularAccessControl) {
            // update dashboard with specified share status
            dashboard = yield call(updateDashboard, ctx, saveSharingCtx);
        }
        else {
            // get dashboard with computed share status from backend
            dashboard = yield call(getDashboard, ctx, saveSharingCtx.persistedDashboard.ref);
        }
    }
    else {
        dashboard = saveSharingCtx.persistedDashboard;
    }
    const setDashboardMetaAction = metaActions.setMeta({ dashboard });
    const batch = batchActions([setDashboardMetaAction, setDashboardPermissionsAction], "@@GDC.DASH.SAVE_SHARING");
    return {
        batch,
        dashboard,
    };
}
export function* changeSharingHandler(ctx, cmd) {
    const dashboardRef = yield select(selectDashboardRef);
    if (!dashboardRef) {
        throw invalidArgumentsProvided(ctx, cmd, "Dashboard to change its sharing status must have an ObjRef.");
    }
    const saveSharingCtx = yield call(createDashboardSaveSharingContext, cmd);
    const result = yield call(saveSharing, ctx, saveSharingCtx);
    const { batch, dashboard } = result;
    if (batch) {
        yield put(batch);
    }
    /**
     * BE might evaluate that share status has changed for the dashboard. When this happens, we want to use the new share status
     * for further operations to avoid UI inconsistencies.
     */
    const updatedDashboardProperties = Object.assign(Object.assign({}, cmd.payload.newSharingProperties), { shareStatus: dashboard.shareStatus });
    return dashboardSharingChanged(ctx, updatedDashboardProperties, cmd.correlationId);
}
//# sourceMappingURL=changeSharingHandler.js.map