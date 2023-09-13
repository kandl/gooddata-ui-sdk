import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingInsightWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { insightWidgetDescriptionChanged } from "../../events/insight.js";
export function* changeInsightWidgetDescriptionHandler(ctx, cmd) {
    const { payload: { description }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const insightWidget = validateExistingInsightWidget(widgets, cmd, ctx);
    yield put(layoutActions.replaceWidgetDescription({
        ref: insightWidget.ref,
        description,
        undo: {
            cmd,
        },
    }));
    return insightWidgetDescriptionChanged(ctx, insightWidget.ref, description, correlationId);
}
//# sourceMappingURL=changeInsightWidgetDescriptionHandler.js.map