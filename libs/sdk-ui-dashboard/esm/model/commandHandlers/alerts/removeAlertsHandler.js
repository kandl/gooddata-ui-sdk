import { call, select, put } from "redux-saga/effects";
import { objRefToString } from "@gooddata/sdk-model";
import { alertsRemoved } from "../../events/alerts.js";
import { alertsActions } from "../../store/alerts/index.js";
import { selectAlertsMap } from "../../store/alerts/alertsSelectors.js";
import { validateExistingAlerts } from "./validation/alertsValidation.js";
function removeAlerts(ctx, alertRefs) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().deleteWidgetAlerts(alertRefs);
}
export function* removeAlertsHandler(ctx, cmd) {
    const alertsMap = yield select(selectAlertsMap);
    const alerts = validateExistingAlerts(alertsMap, cmd, ctx);
    const refs = alerts.map((alert) => alert.ref);
    yield call(removeAlerts, ctx, refs);
    const ids = alerts.map((alert) => objRefToString(alert.ref));
    yield put(alertsActions.removeAlerts(ids));
    return alertsRemoved(ctx, alerts, cmd.correlationId);
}
//# sourceMappingURL=removeAlertsHandler.js.map