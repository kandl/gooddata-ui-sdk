import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { DrillToInsight } from "../../commands/drill.js";
import { DashboardDrillToInsightResolved } from "../../events/drill.js";
export declare function drillToInsightHandler(ctx: DashboardContext, cmd: DrillToInsight): SagaIterator<DashboardDrillToInsightResolved>;
