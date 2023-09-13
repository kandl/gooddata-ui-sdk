import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingInsightWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { insightWidgetHeaderChanged } from "../../events/insight.js";
export function* changeInsightWidgetHeaderHandler(ctx, cmd) {
    const { payload: { header }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const insightWidget = validateExistingInsightWidget(widgets, cmd, ctx);
    yield put(layoutActions.replaceWidgetHeader({
        ref: insightWidget.ref,
        header,
        undo: {
            cmd,
        },
    }));
    return insightWidgetHeaderChanged(ctx, insightWidget.ref, header, correlationId);
}
//# sourceMappingURL=changeInsightWidgetHeaderHandler.js.map