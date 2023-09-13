import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { DrillToCustomUrl } from "../../commands/drill.js";
import { DashboardDrillToCustomUrlResolved } from "../../events/drill.js";
export declare function drillToCustomUrlHandler(ctx: DashboardContext, cmd: DrillToCustomUrl): SagaIterator<DashboardDrillToCustomUrlResolved>;
