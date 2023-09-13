// (C) 2021 GoodData Corporation
import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingInsightWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { insightWidgetVisPropertiesChanged } from "../../events/insight.js";
export function* changeInsightWidgetVisPropertiesHandler(ctx, cmd) {
    const { payload: { properties }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const insightWidget = validateExistingInsightWidget(widgets, cmd, ctx);
    yield put(layoutActions.replaceInsightWidgetVisProperties({
        ref: insightWidget.ref,
        properties,
        undo: {
            cmd,
        },
    }));
    return insightWidgetVisPropertiesChanged(ctx, insightWidget.ref, properties, correlationId);
}
//# sourceMappingURL=changeInsightWidgetVisPropertiesHandler.js.map