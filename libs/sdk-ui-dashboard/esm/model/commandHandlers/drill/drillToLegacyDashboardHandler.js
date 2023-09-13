import { put } from "redux-saga/effects";
import { drillToLegacyDashboardRequested, drillToLegacyDashboardResolved, } from "../../events/drill.js";
export function* drillToLegacyDashboardHandler(ctx, cmd) {
    yield put(drillToLegacyDashboardRequested(ctx, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId));
    return drillToLegacyDashboardResolved(ctx, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId);
}
//# sourceMappingURL=drillToLegacyDashboardHandler.js.map