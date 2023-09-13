import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { kpiWidgetComparisonChanged } from "../../events/kpi.js";
export function* changeKpiWidgetComparisonHandler(ctx, cmd) {
    const { payload: { comparison: { comparisonType, comparisonDirection }, }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    const resolvedComparisonType = comparisonType !== null && comparisonType !== void 0 ? comparisonType : "none";
    const resolvedComparisonDirection = resolvedComparisonType !== "none" ? comparisonDirection !== null && comparisonDirection !== void 0 ? comparisonDirection : "growIsGood" : undefined;
    yield put(layoutActions.replaceKpiWidgetComparison({
        ref: kpiWidget.ref,
        comparisonType: resolvedComparisonType,
        comparisonDirection: resolvedComparisonDirection,
        undo: {
            cmd,
        },
    }));
    const updatedWidgets = yield select(selectWidgetsMap);
    const updatedKpiWidget = updatedWidgets.get(kpiWidget.ref);
    return kpiWidgetComparisonChanged(ctx, kpiWidget.ref, updatedKpiWidget.kpi, correlationId);
}
//# sourceMappingURL=changeKpiWidgetComparisonHandler.js.map