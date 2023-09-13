import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { DashboardDrillToLegacyDashboardResolved } from "../../events/drill.js";
import { DrillToLegacyDashboard } from "../../commands/index.js";
export declare function drillToLegacyDashboardHandler(ctx: DashboardContext, cmd: DrillToLegacyDashboard): SagaIterator<DashboardDrillToLegacyDashboardResolved>;
