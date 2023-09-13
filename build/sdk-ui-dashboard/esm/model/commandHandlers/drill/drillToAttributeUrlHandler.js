import { all, call, put, select } from "redux-saga/effects";
import { drillToAttributeUrlRequested, drillToAttributeUrlResolved, } from "../../events/drill.js";
import { resolveDrillToAttributeUrl } from "./resolveDrillToAttributeUrl.js";
import { getDrillToUrlFiltersWithResolvedValues } from "./getDrillToUrlFilters.js";
import { selectWidgetDrills } from "../../store/layout/layoutSelectors.js";
import { isDrillConfigured } from "../../../_staging/drills/drillingUtils.js";
export function* drillToAttributeUrlHandler(ctx, cmd) {
    yield put(drillToAttributeUrlRequested(ctx, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId));
    const [resolvedUrl, filtersInfo] = yield all([
        call(resolveDrillToAttributeUrl, cmd.payload.drillDefinition, cmd.payload.drillEvent, ctx),
        call(getDrillToUrlFiltersWithResolvedValues, ctx, cmd.payload.drillEvent.widgetRef),
    ]);
    const { widgetRef } = cmd.payload.drillEvent;
    const widgetConfiguredDrills = yield select(selectWidgetDrills(widgetRef));
    const isImplicit = !isDrillConfigured(cmd.payload.drillDefinition, widgetConfiguredDrills);
    return drillToAttributeUrlResolved(ctx, resolvedUrl, cmd.payload.drillDefinition, cmd.payload.drillEvent, filtersInfo, isImplicit, cmd.correlationId);
}
//# sourceMappingURL=drillToAttributeUrlHandler.js.map