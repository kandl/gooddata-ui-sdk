import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { Drill } from "../../commands/drill.js";
import { DashboardDrillResolved } from "../../events/drill.js";
export declare function drillHandler(ctx: DashboardContext, cmd: Drill): SagaIterator<DashboardDrillResolved>;
