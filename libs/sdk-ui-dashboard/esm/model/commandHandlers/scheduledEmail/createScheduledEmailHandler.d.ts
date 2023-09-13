import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { CreateScheduledEmail } from "../../commands/scheduledEmail.js";
import { DashboardScheduledEmailCreated } from "../../events/scheduledEmail.js";
export declare function createScheduledEmailHandler(ctx: DashboardContext, cmd: CreateScheduledEmail): SagaIterator<DashboardScheduledEmailCreated>;
