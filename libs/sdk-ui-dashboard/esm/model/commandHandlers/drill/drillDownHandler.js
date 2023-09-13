import { put } from "redux-saga/effects";
import { drillDownRequested, drillDownResolved } from "../../events/drill.js";
import { getInsightWithAppliedDrillDown } from "@gooddata/sdk-ui-ext";
export function* drillDownHandler(ctx, cmd) {
    var _a;
    const { drillDefinition, drillEvent, insight } = cmd.payload;
    yield put(drillDownRequested(ctx, insight, drillDefinition, drillEvent, cmd.correlationId));
    const insightWithDrillDownApplied = getInsightWithAppliedDrillDown(insight, drillEvent, drillDefinition, (_a = ctx.backend.capabilities.supportsElementUris) !== null && _a !== void 0 ? _a : true);
    return drillDownResolved(ctx, insightWithDrillDownApplied, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId);
}
//# sourceMappingURL=drillDownHandler.js.map