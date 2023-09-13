import { selectPersistedDashboard } from "../../store/meta/metaSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { dashboardWasReset } from "../../events/dashboard.js";
import { selectEffectiveDateFilterConfig } from "../../store/dateFilterConfig/dateFilterConfigSelectors.js";
import { selectDateFilterConfig, selectSettings } from "../../store/config/configSelectors.js";
import { actionsToInitializeExistingDashboard, actionsToInitializeNewDashboard, } from "./common/stateInitializers.js";
import { batchActions } from "redux-batched-actions";
import uniqWith from "lodash/uniqWith.js";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { resolveInsights } from "../../utils/insightResolver.js";
import { insightReferences } from "./common/insightReferences.js";
export function* resetDashboardHandler(ctx, cmd) {
    const data = yield call(resetDashboardFromPersisted, ctx);
    yield put(batchActions(data.batch, "@@GDC.DASH/RESET"));
    return dashboardWasReset(ctx, data.persistedDashboard, cmd.correlationId);
}
export function* resetDashboardRuntime(ctx, cmd) {
    const data = yield call(resetDashboardFromPersisted, ctx);
    return {
        batch: batchActions(data.batch, "@@GDC.DASH/RESET"),
        reset: dashboardWasReset(ctx, data.persistedDashboard, cmd.correlationId),
    };
}
function* resetDashboardFromPersisted(ctx) {
    const persistedDashboard = yield select(selectPersistedDashboard);
    let batch = [];
    if (persistedDashboard) {
        /*
         * For dashboard that is already persisted the insights and effective date filter config can be used
         * as is (date filter config is read-only).
         *
         * The only exception is the insights: thanks to the Reload button in plugins, the dashboard could have been
         * reloaded with a different set of insights, so when resetting, we need to make sure that we still have all
         * the insights needed for the original dashboard shape.
         *
         * The call to create actions to initialize existing dashboard will use all this to set state
         * of filter context, layout and meta based on the contents of persisted dashboard; this is the
         * same logic as what is done during the initialization of the dashboard based on data from backend.
         *
         * Everything else can stay untouched.
         */
        const insightRefsFromWidgets = insightReferences(persistedDashboard.layout);
        const uniqueInsightRefsFromWidgets = uniqWith(insightRefsFromWidgets, areObjRefsEqual);
        const resolvedInsights = yield call(resolveInsights, ctx, uniqueInsightRefsFromWidgets);
        const settings = yield select(selectSettings);
        const effectiveConfig = yield select(selectEffectiveDateFilterConfig);
        const resolvedInsightsValues = Array(...resolvedInsights.resolved.values());
        batch = yield call(actionsToInitializeExistingDashboard, ctx, persistedDashboard, resolvedInsightsValues, settings, effectiveConfig);
    }
    else {
        /*
         * For dashboard that is not persisted, the dashboard component is reset to an 'empty' state.
         */
        const dateFilterConfig = yield select(selectDateFilterConfig);
        batch = actionsToInitializeNewDashboard(dateFilterConfig);
    }
    return {
        batch,
        persistedDashboard,
    };
}
//# sourceMappingURL=resetDashboardHandler.js.map