// (C) 2023 GoodData Corporation
import { call, put, select } from "redux-saga/effects";
import { isDrillToDashboard, isInsightWidget } from "@gooddata/sdk-model";
import flatMap from "lodash/flatMap.js";
import compact from "lodash/compact.js";
import { selectAccessibleDashboardsMap } from "../../../store/accessibleDashboards/accessibleDashboardsSelectors.js";
import { inaccessibleDashboardsActions } from "../../../store/inaccessibleDashboards/index.js";
export function* loadInaccessibleDashboards(ctx, widgets) {
    const accessibleDashboardsMap = yield select(selectAccessibleDashboardsMap);
    const dashboardDrillTargets = flatMap(widgets.filter(isInsightWidget).map(({ drills }) => drills.filter(isDrillToDashboard)));
    const dashboardDrillTargetRefs = compact(dashboardDrillTargets.map(({ target }) => target));
    const unknownDashboardDrillTargetRefs = dashboardDrillTargetRefs.filter((ref) => !accessibleDashboardsMap.get(ref));
    const existingDashboards = yield call(getExistingDashboards, ctx, unknownDashboardDrillTargetRefs);
    const inaccessibleDashboards = existingDashboards.map((dashboard) => {
        var _a;
        return Object.assign(Object.assign({}, dashboard), { title: (_a = dashboard.title) !== null && _a !== void 0 ? _a : "", accessibilityLimitation: dashboard.title === undefined ? "forbidden" : "notShared" });
    });
    yield put(inaccessibleDashboardsActions.addInaccessibleDashboards(inaccessibleDashboards));
}
async function getExistingDashboards(ctx, dashboardRefs) {
    try {
        return await ctx.backend
            .workspace(ctx.workspace)
            .dashboards()
            .validateDashboardsExistence(dashboardRefs);
    }
    catch (_a) {
        // when the call fails, we have no way to check whether the unknown dashboards exist
        return [];
    }
}
//# sourceMappingURL=loadInaccessibleDashboards.js.map