import { DrillDefinition, IInsightWidget, IKpiWidget } from "@gooddata/sdk-model";
import { IDashboardCommand } from "../../commands/index.js";
import { DashboardContext } from "../../types/commonTypes.js";
interface IInvalidDrillInfo {
    invalidDrills: DrillDefinition[];
    widget: IInsightWidget;
}
export declare function validateDrills(ctx: DashboardContext, cmd: IDashboardCommand, widgets: (IKpiWidget | IInsightWidget)[]): Generator<import("redux-saga/effects").AllEffect<import("redux-saga/effects").CallEffect<IInvalidDrillInfo>> | import("redux-saga/effects").PutEffect<{
    payload: import("@gooddata/sdk-model").ObjRef[];
    type: "uiSlice/removeInvalidDrillWidgetRefs";
}> | import("redux-saga/effects").AllEffect<import("redux-saga/effects").CallEffect<void>> | import("redux-saga/effects").PutEffect<{
    payload: import("@gooddata/sdk-model").ObjRef[];
    type: "uiSlice/addInvalidDrillWidgetRefs";
}>, void, IInvalidDrillInfo[]>;
export {};
