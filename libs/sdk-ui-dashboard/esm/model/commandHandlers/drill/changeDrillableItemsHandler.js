import { put } from "redux-saga/effects";
import { drillableItemsChanged } from "../../events/drill.js";
import { drillActions } from "../../store/drill/index.js";
export function* changeDrillableItemsHandler(ctx, cmd) {
    const { drillableItems } = cmd.payload;
    yield put(drillActions.setDrillableItems(drillableItems));
    return drillableItemsChanged(ctx, drillableItems, cmd.correlationId);
}
//# sourceMappingURL=changeDrillableItemsHandler.js.map