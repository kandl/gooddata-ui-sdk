// (C) 2021-2022 GoodData Corporation
import { serializeObjRef } from "@gooddata/sdk-model";
import { invalidArgumentsProvided } from "../../../events/general.js";
/**
 * Given list of all kpi alerts and a command that contains a refs array, this function tests that the `ref` are
 * a reference to an existing kpi alerts.
 *
 * @param ctx - dashboard context, this will be included in the DashboardCommandFailed event
 * @param alerts - map of alerts on the dashboard
 * @param cmd - any command that has 'ref' in its payload
 */
export function validateExistingAlerts(alerts, cmd, ctx) {
    const { payload: { refs }, } = cmd;
    return refs.map((ref) => {
        const alert = alerts.get(ref);
        if (!alert) {
            throw invalidArgumentsProvided(ctx, cmd, `Cannot find Kpi alert with ref: ${serializeObjRef(ref)}.`);
        }
        return alert;
    });
}
//# sourceMappingURL=alertsValidation.js.map