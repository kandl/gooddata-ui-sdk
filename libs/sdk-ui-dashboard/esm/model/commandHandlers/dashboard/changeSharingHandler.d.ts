import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeSharing } from "../../commands/index.js";
import { DashboardSharingChanged } from "../../events/dashboard.js";
export declare function changeSharingHandler(ctx: DashboardContext, cmd: ChangeSharing): SagaIterator<DashboardSharingChanged>;
