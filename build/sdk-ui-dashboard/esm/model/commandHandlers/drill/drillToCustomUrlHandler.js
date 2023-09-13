import { all, call, put } from "redux-saga/effects";
import { drillToCustomUrlRequested, drillToCustomUrlResolved, } from "../../events/drill.js";
import { resolveDrillToCustomUrl } from "./resolveDrillToCustomUrl.js";
import { getDrillToUrlFiltersWithResolvedValues } from "./getDrillToUrlFilters.js";
export function* drillToCustomUrlHandler(ctx, cmd) {
    yield put(drillToCustomUrlRequested(ctx, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId));
    const [resolvedUrl, filtersInfo] = yield all([
        call(resolveDrillToCustomUrl, cmd.payload.drillDefinition, cmd.payload.drillEvent.widgetRef, cmd.payload.drillEvent, ctx, cmd),
        call(getDrillToUrlFiltersWithResolvedValues, ctx, cmd.payload.drillEvent.widgetRef),
    ]);
    return drillToCustomUrlResolved(ctx, resolvedUrl, cmd.payload.drillDefinition, cmd.payload.drillEvent, filtersInfo, cmd.correlationId);
}
//# sourceMappingURL=drillToCustomUrlHandler.js.map