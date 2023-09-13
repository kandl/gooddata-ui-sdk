import { DashboardContext } from "../../types/commonTypes.js";
import { RenameDashboard } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardRenamed } from "../../events/index.js";
export declare function renameDashboardHandler(ctx: DashboardContext, cmd: RenameDashboard): SagaIterator<DashboardRenamed>;
