import { put } from "redux-saga/effects";
import { drillRequested, drillResolved } from "../../events/drill.js";
import { filterDrillsByDrillEvent } from "../../../_staging/drills/drillingUtils.js";
export function* drillHandler(ctx, cmd) {
    yield put(drillRequested(ctx, cmd.payload.drillEvent, cmd.payload.drillContext, cmd.correlationId));
    // TODO: better signature
    const validDrillDefinitions = filterDrillsByDrillEvent(cmd.payload.drillEvent.drillDefinitions, cmd.payload.drillEvent);
    return drillResolved(ctx, Object.assign(Object.assign({}, cmd.payload.drillEvent), { drillDefinitions: validDrillDefinitions }), cmd.payload.drillContext, cmd.correlationId);
}
//# sourceMappingURL=drillHandler.js.map