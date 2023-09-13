import { call, put, select } from "redux-saga/effects";
import { dashboardExportToPdfRequested, dashboardExportToPdfResolved, } from "../../events/dashboard.js";
import { selectDashboardRef } from "../../store/meta/metaSelectors.js";
import { invalidArgumentsProvided } from "../../events/general.js";
import { selectFilterContextFilters } from "../../store/filterContext/filterContextSelectors.js";
import { ensureAllTimeFilterForExport } from "../../../_staging/exportUtils/filterUtils.js";
function exportDashboardToPdf(ctx, dashboardRef, filters) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().exportDashboardToPdf(dashboardRef, filters);
}
export function* exportDashboardToPdfHandler(ctx, cmd) {
    yield put(dashboardExportToPdfRequested(ctx, cmd.correlationId));
    const dashboardRef = yield select(selectDashboardRef);
    if (!dashboardRef) {
        throw invalidArgumentsProvided(ctx, cmd, "Dashboard to export to PDF must have an ObjRef.");
    }
    const filterContextFilters = yield select(selectFilterContextFilters);
    const effectiveFilters = ensureAllTimeFilterForExport(filterContextFilters);
    const result = yield call(exportDashboardToPdf, ctx, dashboardRef, effectiveFilters);
    // prepend hostname if provided so that the results are downloaded from there, not from where the app is hosted
    const fullUri = ctx.backend.config.hostname
        ? new URL(result.uri, ctx.backend.config.hostname).href
        : result.uri;
    const sanitizedResult = Object.assign(Object.assign({}, result), { uri: fullUri });
    return dashboardExportToPdfResolved(ctx, sanitizedResult, cmd.correlationId);
}
//# sourceMappingURL=exportDashboardToPdfHandler.js.map