import { call } from "redux-saga/effects";
import { isObjRef } from "@gooddata/sdk-model";
import { scheduledEmailSaved } from "../../events/scheduledEmail.js";
function saveScheduledEmail(ctx, scheduledEmail, filterContextRef) {
    const { backend, workspace } = ctx;
    if (!isObjRef(scheduledEmail)) {
        throw new Error("Cannot save schedule not referencing to an persisted object");
    }
    return backend
        .workspace(workspace)
        .dashboards()
        .updateScheduledMail(scheduledEmail, scheduledEmail, filterContextRef);
}
export function* saveScheduledEmailHandler(ctx, cmd) {
    const { scheduledEmail, filterContextRef } = cmd.payload;
    yield call(saveScheduledEmail, ctx, scheduledEmail, filterContextRef);
    return scheduledEmailSaved(ctx, cmd.correlationId);
}
//# sourceMappingURL=saveScheduledEmailHandler.js.map