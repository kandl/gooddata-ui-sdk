// (C) 2021-2022 GoodData Corporation
import { serializeObjRef, isKpiWidget, isInsightWidget, } from "@gooddata/sdk-model";
import { invalidArgumentsProvided } from "../../../events/general.js";
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
export function validateExistingInsightWidget(widgets, cmd, ctx) {
    const { payload: { ref }, } = cmd;
    const widget = widgets.get(ref);
    if (!widget) {
        throw invalidArgumentsProvided(ctx, cmd, `Cannot find insight widget with ref: ${serializeObjRef(ref)}.`);
    }
    if (!isInsightWidget(widget)) {
        throw invalidArgumentsProvided(ctx, cmd, `Widget with ref: ${serializeObjRef(ref)} exists but is not an insight widget.`);
    }
    return widget;
}
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
export function validateExistingKpiWidget(widgets, cmd, ctx) {
    const { payload: { ref }, } = cmd;
    const widget = widgets.get(ref);
    if (!widget) {
        throw invalidArgumentsProvided(ctx, cmd, `Cannot find insight widget with ref: ${serializeObjRef(ref)}.`);
    }
    if (!isKpiWidget(widget)) {
        throw invalidArgumentsProvided(ctx, cmd, `Widget with ref: ${serializeObjRef(ref)} exists but is not a KPI widget.`);
    }
    return widget;
}
//# sourceMappingURL=widgetValidations.js.map