// (C) 2021-2022 GoodData Corporation
import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateExistingInsightWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { insightWidgetVisConfigurationChanged } from "../../events/insight.js";
export function* changeInsightWidgetVisConfigurationHandler(ctx, cmd) {
    const { payload: { config }, correlationId, } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const insightWidget = validateExistingInsightWidget(widgets, cmd, ctx);
    yield put(layoutActions.replaceInsightWidgetVisConfiguration({
        ref: insightWidget.ref,
        config,
        undo: {
            cmd,
        },
    }));
    return insightWidgetVisConfigurationChanged(ctx, insightWidget.ref, config, insightWidget.configuration, correlationId);
}
//# sourceMappingURL=changeInsightWidgetVisConfigurationHandler.js.map