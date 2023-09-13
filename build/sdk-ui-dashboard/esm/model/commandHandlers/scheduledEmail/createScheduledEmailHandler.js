import { call } from "redux-saga/effects";
import { scheduledEmailCreated } from "../../events/scheduledEmail.js";
function createScheduledEmail(ctx, scheduledEmail, filterContext) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().createScheduledMail(scheduledEmail, filterContext);
}
export function* createScheduledEmailHandler(ctx, cmd) {
    const scheduledEmail = yield call(createScheduledEmail, ctx, cmd.payload.scheduledEmail, cmd.payload.filterContext);
    return scheduledEmailCreated(ctx, scheduledEmail, cmd.correlationId);
}
//# sourceMappingURL=createScheduledEmailHandler.js.map