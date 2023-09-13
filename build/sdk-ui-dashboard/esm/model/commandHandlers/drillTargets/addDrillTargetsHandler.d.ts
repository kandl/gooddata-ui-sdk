import { SagaIterator } from "redux-saga";
import { AddDrillTargets } from "../../commands/drillTargets.js";
import { DrillTargetsAdded } from "../../events/drillTargets.js";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function addDrillTargetsHandler(ctx: DashboardContext, cmd: AddDrillTargets): SagaIterator<DrillTargetsAdded>;
