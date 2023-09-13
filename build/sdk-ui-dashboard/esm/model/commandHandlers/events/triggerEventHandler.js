import { dispatchDashboardEvent } from "../../store/_infra/eventDispatcher.js";
export function* triggerEventHandler(ctx, cmd) {
    // fill the ctx property of the event properly so that the caller does not need to do this
    const fullEvent = Object.assign(Object.assign({}, cmd.payload.eventBody), { ctx });
    yield dispatchDashboardEvent(fullEvent);
}
//# sourceMappingURL=triggerEventHandler.js.map