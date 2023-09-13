// (C) 2021-2022 GoodData Corporation
import { put, select } from "redux-saga/effects";
import { kpiWidgetDrillRemoved } from "../../events/kpi.js";
import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
export function* removeDrillForKpiWidgetHandler(ctx, cmd) {
    const { correlationId } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    const { ref: widgetRef } = kpiWidget;
    yield put(layoutActions.replaceKpiWidgetDrill({
        ref: widgetRef,
        drill: undefined,
        undo: {
            cmd,
        },
    }));
    return kpiWidgetDrillRemoved(ctx, widgetRef, correlationId);
}
//# sourceMappingURL=removeDrillForKpiWidgetHandler.js.map