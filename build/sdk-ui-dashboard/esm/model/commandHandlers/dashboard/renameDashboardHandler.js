import { dashboardRenamed } from "../../events/dashboard.js";
import { metaActions } from "../../store/meta/index.js";
import { put } from "redux-saga/effects";
export function* renameDashboardHandler(ctx, cmd) {
    const { newTitle } = cmd.payload;
    yield put(metaActions.setDashboardTitle(newTitle));
    return dashboardRenamed(ctx, newTitle, cmd.correlationId);
}
//# sourceMappingURL=renameDashboardHandler.js.map