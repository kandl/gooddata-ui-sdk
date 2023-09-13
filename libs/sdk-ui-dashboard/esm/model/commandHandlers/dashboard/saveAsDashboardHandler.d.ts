import { SagaIterator } from "redux-saga";
import { SaveDashboardAs } from "../../commands/dashboard.js";
import { DashboardCopySaved } from "../../events/dashboard.js";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function saveAsDashboardHandler(ctx: DashboardContext, cmd: SaveDashboardAs): SagaIterator<DashboardCopySaved>;
