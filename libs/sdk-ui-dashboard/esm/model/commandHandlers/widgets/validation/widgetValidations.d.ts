import { ObjRefMap } from "../../../../_staging/metadata/objRefMap.js";
import { ObjRef, IKpiWidget, IInsightWidget } from "@gooddata/sdk-model";
import { IDashboardCommand } from "../../../commands/index.js";
import { DashboardContext } from "../../../types/commonTypes.js";
import { ExtendedDashboardWidget } from "../../../types/layoutTypes.js";
type CommandWithRef = IDashboardCommand & {
    payload: {
        ref: ObjRef;
    };
};
/**
 * Given list of all dashboard widgets and a command that contains a ref, this function tests that the `ref` is
 * a reference to an existing dashboard widget and that the existing widget is an insight widget.
 *
 * If the validation succeeds, the located insight widget will be returned. Otherwise an error will fly. The error
 * will be an instance of DashboardCommandFailed event - it can be propagated through the command handler all the
 * way to the root command handler saga.
 *
 * @param ctx - dashboard context, this will be included in the DashboardCommandFailed event
 * @param widgets - map of widgets on the dashboard
 * @param cmd - any command that has 'ref' in its payload
 */
export declare function validateExistingInsightWidget(widgets: ObjRefMap<ExtendedDashboardWidget>, cmd: CommandWithRef, ctx: DashboardContext): IInsightWidget;
/**
 * Given list of all dashboard widgets and a command that contains a ref, this function tests that the `ref` is
 * a reference to an existing dashboard widget and that the existing widget is a KPI widget.
 *
 * If the validation succeeds, the located KPI widget will be returned. Otherwise an error will fly. The error
 * will be an instance of DashboardCommandFailed event - it can be propagated through the command handler all the
 * way to the root command handler saga.
 *
 * @param ctx - dashboard context, this will be included in the DashboardCommandFailed event
 * @param widgets - map of widgets on the dashboard
 * @param cmd - any command that has 'ref' in its payload
 */
export declare function validateExistingKpiWidget(widgets: ObjRefMap<ExtendedDashboardWidget>, cmd: CommandWithRef, ctx: DashboardContext): IKpiWidget;
export {};
