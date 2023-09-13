import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { DrillDown } from "../../commands/drill.js";
import { DashboardDrillDownResolved } from "../../events/drill.js";
export declare function drillDownHandler(ctx: DashboardContext, cmd: DrillDown): SagaIterator<DashboardDrillDownResolved>;
