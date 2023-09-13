import { put, select } from "redux-saga/effects";
import { drillToInsightRequested, drillToInsightResolved, } from "../../events/drill.js";
import { selectInsightByRef } from "../../store/insights/insightsSelectors.js";
import { addIntersectionFiltersToInsight } from "@gooddata/sdk-ui-ext";
export function* drillToInsightHandler(ctx, cmd) {
    var _a;
    const { drillDefinition, drillEvent } = cmd.payload;
    const insight = yield select(selectInsightByRef(drillDefinition.target));
    yield put(drillToInsightRequested(ctx, insight, drillDefinition, drillEvent, cmd.correlationId));
    const insightWithDrillsApplied = addIntersectionFiltersToInsight(insight, drillEvent.drillContext.intersection, (_a = ctx.backend.capabilities.supportsElementUris) !== null && _a !== void 0 ? _a : true);
    return drillToInsightResolved(ctx, insightWithDrillsApplied, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId);
}
//# sourceMappingURL=drillToInsightHandler.js.map