import { call, select } from "redux-saga/effects";
import { selectWidgetCoordinatesByRef } from "../../store/layout/layoutSelectors.js";
import { removeSectionItemSaga } from "./removeSectionItemHandler.js";
import { invalidArgumentsProvided } from "../../events/general.js";
import { objRefToString } from "@gooddata/sdk-model";
export function* removeSectionItemByWidgetRefHandler(ctx, cmd) {
    let widgetCoordinates;
    try {
        widgetCoordinates = yield select(selectWidgetCoordinatesByRef(cmd.payload.widgetRef));
    }
    catch (e) {
        throw invalidArgumentsProvided(ctx, cmd, `Can't get widget coordinates for widget ref: ${objRefToString(cmd.payload.widgetRef)}, ${e.message}`);
    }
    return yield call(removeSectionItemSaga, ctx, {
        correlationId: cmd.correlationId,
        payload: Object.assign(Object.assign({}, widgetCoordinates), { eager: cmd.payload.eager, stashIdentifier: cmd.payload.stashIdentifier }),
    }, cmd);
}
//# sourceMappingURL=removeSectionItemByWidgetRefHandler.js.map