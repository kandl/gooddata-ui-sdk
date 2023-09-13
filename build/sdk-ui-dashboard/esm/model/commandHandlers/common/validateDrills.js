// (C) 2022-2023 GoodData Corporation
import { isInsightWidget, widgetRef, } from "@gooddata/sdk-model";
import { all, call, put } from "redux-saga/effects";
import flatMap from "lodash/flatMap.js";
import { insightWidgetDrillsRemoved } from "../../events/insight.js";
import { layoutActions } from "../../store/layout/index.js";
import { existsDrillDefinitionInArray } from "../widgets/validation/insightDrillDefinitionUtils.js";
import { getValidationData, validateDrillDefinition, } from "../widgets/validation/insightDrillDefinitionValidation.js";
import { uiActions } from "../../store/ui/index.js";
export function* validateDrills(ctx, cmd, widgets) {
    const possibleInvalidDrills = yield all(widgets
        .filter(isInsightWidget) // KPI drills should not be validated like this and never removed
        .map((widget) => call(validateInsightDrillDefinitions, ctx, cmd, widget)));
    const invalidDrills = possibleInvalidDrills.filter(({ invalidDrills }) => invalidDrills.length > 0);
    if (invalidDrills.length === 0) {
        yield put(uiActions.removeInvalidDrillWidgetRefs(widgets.map(widgetRef)));
    }
    else {
        yield all(invalidDrills.map((drillInfo) => call(removeInsightWidgetDrills, ctx, cmd, drillInfo.widget, drillInfo.invalidDrills)));
        yield put(uiActions.addInvalidDrillWidgetRefs(invalidDrills.map((drill) => drill.widget.ref)));
    }
}
function* removeInsightWidgetDrills(ctx, cmd, widget, invalidDrills) {
    const notModifiedDrillDefinition = widget.drills.filter((drillItem) => !existsDrillDefinitionInArray(drillItem, invalidDrills));
    yield put(layoutActions.replaceWidgetDrillWithoutUndo({
        ref: widgetRef(widget),
        drillDefinitions: notModifiedDrillDefinition,
    }));
    yield put(insightWidgetDrillsRemoved(ctx, widgetRef(widget), invalidDrills, cmd.correlationId));
}
function* validateInsightDrillDefinitions(ctx, cmd, widget) {
    const validationData = yield call(getValidationData, widgetRef(widget), widget.drills, ctx);
    if (!validationData.drillTargets) {
        return {
            invalidDrills: [],
            widget,
        };
    }
    const invalidDrills = flatMap(widget.drills, (drillItem) => {
        try {
            validateDrillDefinition(drillItem, validationData, ctx, cmd);
            return [];
        }
        catch (_a) {
            return [drillItem];
        }
    });
    return { invalidDrills, widget };
}
//# sourceMappingURL=validateDrills.js.map