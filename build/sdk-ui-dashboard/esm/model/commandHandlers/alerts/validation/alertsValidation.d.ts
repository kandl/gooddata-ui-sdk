import { ObjRef, IWidgetAlert } from "@gooddata/sdk-model";
import { ObjRefMap } from "../../../../_staging/metadata/objRefMap.js";
import { IDashboardCommand } from "../../../commands/index.js";
import { DashboardContext } from "../../../types/commonTypes.js";
type CommandWithRefs = IDashboardCommand & {
    payload: {
        refs: ObjRef[];
    };
};
/**
 * Given list of all kpi alerts and a command that contains a refs array, this function tests that the `ref` are
 * a reference to an existing kpi alerts.
 *
 * @param ctx - dashboard context, this will be included in the DashboardCommandFailed event
 * @param alerts - map of alerts on the dashboard
 * @param cmd - any command that has 'ref' in its payload
 */
export declare function validateExistingAlerts(alerts: ObjRefMap<IWidgetAlert>, cmd: CommandWithRefs, ctx: DashboardContext): IWidgetAlert[];
export {};
