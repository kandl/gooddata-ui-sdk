import { call, put } from "redux-saga/effects";
import { alertCreated } from "../../events/alerts.js";
import { alertsActions } from "../../store/alerts/index.js";
function createAlert(ctx, alert) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().createWidgetAlert(alert);
}
export function* createAlertHandler(ctx, cmd) {
    const alert = yield call(createAlert, ctx, cmd.payload.alert);
    yield put(alertsActions.addAlert(alert));
    return alertCreated(ctx, alert, cmd.correlationId);
}
//# sourceMappingURL=createAlertHandler.js.map