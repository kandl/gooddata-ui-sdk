import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { DrillToDashboard } from "../../commands/drill.js";
import { DashboardDrillToDashboardResolved } from "../../events/drill.js";
export declare function drillToDashboardHandler(ctx: DashboardContext, cmd: DrillToDashboard): SagaIterator<DashboardDrillToDashboardResolved>;
