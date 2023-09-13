import { call, put } from "redux-saga/effects";
import { objRefToString } from "@gooddata/sdk-model";
import { alertUpdated } from "../../events/alerts.js";
import { alertsActions } from "../../store/alerts/index.js";
function updateAlert(ctx, alert) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().updateWidgetAlert(alert);
}
export function* updateAlertHandler(ctx, cmd) {
    const alert = yield call(updateAlert, ctx, cmd.payload.alert);
    yield put(alertsActions.updateAlert({
        changes: cmd.payload.alert,
        id: objRefToString(cmd.payload.alert.ref),
    }));
    return alertUpdated(ctx, alert, cmd.correlationId);
}
//# sourceMappingURL=updateAlertHandler.js.map