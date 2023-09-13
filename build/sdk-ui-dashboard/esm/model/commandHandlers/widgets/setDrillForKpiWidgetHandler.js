// (C) 2021-2022 GoodData Corporation
import { call, put, select } from "redux-saga/effects";
import { kpiWidgetDrillSet } from "../../events/kpi.js";
import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { validateKpiDrill } from "./validation/kpiDrillValidation.js";
export function* setDrillForKpiWidgetHandler(ctx, cmd) {
    const { correlationId } = cmd;
    const { legacyDashboardTabIdentifier, legacyDashboardRef } = cmd.payload;
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    const { ref: widgetRef } = kpiWidget;
    const drill = {
        tab: legacyDashboardTabIdentifier,
        target: legacyDashboardRef,
        origin: {
            type: "drillFromMeasure",
            measure: kpiWidget.kpi.metric,
        },
        type: "drillToLegacyDashboard",
        transition: "in-place",
    };
    yield call(validateKpiDrill, drill, ctx, cmd);
    yield put(layoutActions.replaceKpiWidgetDrill({
        ref: widgetRef,
        drill,
        undo: {
            cmd,
        },
    }));
    return kpiWidgetDrillSet(ctx, widgetRef, drill, correlationId);
}
//# sourceMappingURL=setDrillForKpiWidgetHandler.js.map