import { DashboardContext } from "../../types/commonTypes.js";
import { DeleteDashboard } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardDeleted } from "../../events/index.js";
export declare function deleteDashboardHandler(ctx: DashboardContext, cmd: DeleteDashboard): SagaIterator<DashboardDeleted>;
