import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { kpiWidgetDescriptionChanged } from "../../events/kpi.js";
export function* changeKpiWidgetDescriptionHandler(ctx, cmd) {
    const { payload: { description }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    yield put(layoutActions.replaceWidgetDescription({
        ref: kpiWidget.ref,
        description,
        undo: {
            cmd,
        },
    }));
    return kpiWidgetDescriptionChanged(ctx, kpiWidget.ref, description, correlationId);
}
//# sourceMappingURL=changeKpiWidgetDescriptionHandler.js.map