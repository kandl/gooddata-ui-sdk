import { call, put, select } from "redux-saga/effects";
import { batchActions } from "redux-batched-actions";
import { resetDashboard as resetDashboardCommand } from "../../commands/index.js";
import { renderModeChanged } from "../../events/renderMode.js";
import { renderModeActions } from "../../store/renderMode/index.js";
import { resetDashboardRuntime } from "../dashboard/resetDashboardHandler.js";
import { validateDrills } from "../common/validateDrills.js";
import { selectAllAnalyticalWidgets } from "../../store/layout/layoutSelectors.js";
import { validateDrillToCustomUrlParams } from "../common/validateDrillToCustomUrlParams.js";
import { isInsightWidget } from "@gooddata/sdk-model";
import { loadInaccessibleDashboards } from "../dashboard/initializeDashboardHandler/loadInaccessibleDashboards.js";
import { uiActions } from "../../store/ui/index.js";
export function* changeRenderModeHandler(ctx, cmd) {
    const { payload: { renderMode, renderModeChangeOptions }, correlationId, } = cmd;
    // Reset dashboard and widgets first, as changing the edit mode forces visualizations to re-execute.
    // To avoid sending DashboardWidgetExecutionSucceeded or DashboardWidgetExecutionFailed events
    // for discarded widgets, sanitization must be done before the mode is changed.
    if (renderModeChangeOptions.resetDashboard) {
        const data = yield call(resetDashboardRuntime, ctx, resetDashboardCommand(correlationId));
        yield put(batchActions([
            data.batch,
            uiActions.resetInvalidDrillWidgetRefs(),
            uiActions.resetAllInvalidCustomUrlDrillParameterWidgetsWarnings(),
            renderModeActions.setRenderMode(renderMode),
        ]));
        yield put(data.reset);
    }
    else {
        yield put(batchActions([
            uiActions.resetInvalidDrillWidgetRefs(),
            uiActions.resetAllInvalidCustomUrlDrillParameterWidgetsWarnings(),
            renderModeActions.setRenderMode(renderMode),
        ]));
    }
    if (renderMode === "edit") {
        const widgets = yield select(selectAllAnalyticalWidgets);
        yield call(loadInaccessibleDashboards, ctx, widgets);
        yield call(validateDrills, ctx, cmd, widgets);
        yield call(validateDrillToCustomUrlParams, widgets.filter(isInsightWidget));
    }
    return renderModeChanged(ctx, renderMode, correlationId);
}
//# sourceMappingURL=changeRenderModeHandler.js.map