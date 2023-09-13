import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { kpiWidgetHeaderChanged } from "../../events/kpi.js";
export function* changeKpiWidgetHeaderHandler(ctx, cmd) {
    const { payload: { header }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    yield put(layoutActions.replaceWidgetHeader({
        ref: kpiWidget.ref,
        header,
        undo: {
            cmd,
        },
    }));
    return kpiWidgetHeaderChanged(ctx, kpiWidget.ref, header, correlationId);
}
//# sourceMappingURL=changeKpiWidgetHeaderHandler.js.map