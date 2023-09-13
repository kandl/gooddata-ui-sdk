import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { SaveScheduledEmail } from "../../commands/scheduledEmail.js";
import { DashboardScheduledEmailSaved } from "../../events/scheduledEmail.js";
export declare function saveScheduledEmailHandler(ctx: DashboardContext, cmd: SaveScheduledEmail): SagaIterator<DashboardScheduledEmailSaved>;
