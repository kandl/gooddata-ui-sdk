// (C) 2022 GoodData Corporation
import { isDrillToCustomUrl, widgetRef } from "@gooddata/sdk-model";
import { all, call, put, select } from "redux-saga/effects";
import { extractDisplayFormIdentifiers } from "../widgets/validation/insightDrillDefinitionUtils.js";
import { uiActions } from "../../store/ui/index.js";
import { selectDrillTargetsByWidgetRef } from "../../store/drillTargets/drillTargetsSelectors.js";
import { selectAllCatalogDisplayFormsMap } from "../../store/catalog/catalogSelectors.js";
import { isDisplayFormRelevantToDrill } from "./isDisplayFormRelevantToDrill.js";
export function* validateDrillToCustomUrlParams(widgets) {
    const possibleInvalidDrills = yield all(widgets.map((widget) => call(validateWidgetDrillToCustomUrlParams, widget)));
    const invalidDrills = possibleInvalidDrills.filter(({ invalidDrills }) => invalidDrills.length > 0);
    if (invalidDrills.length === 0) {
        yield put(uiActions.resetInvalidCustomUrlDrillParameterWidget(widgets));
    }
    else {
        yield put(uiActions.setInvalidCustomUrlDrillParameterWidgets(invalidDrills));
    }
}
function* validateWidgetDrillToCustomUrlParams(widget) {
    const selectDrillTargetsByWidgetRefSelector = selectDrillTargetsByWidgetRef(widgetRef(widget));
    const drillTargets = yield select(selectDrillTargetsByWidgetRefSelector);
    if (!(drillTargets === null || drillTargets === void 0 ? void 0 : drillTargets.availableDrillTargets)) {
        // skip this part of the validation in case the drill targets are not available yet
        return {
            widget,
            invalidDrills: [],
        };
    }
    const displayForms = yield select(selectAllCatalogDisplayFormsMap);
    return widget.drills.filter(isDrillToCustomUrl).reduce((acc, drillDefinition) => {
        const ids = extractDisplayFormIdentifiers([drillDefinition]);
        const hasInvalidParam = ids.some((identifier) => {
            const displayForm = displayForms.get(identifier);
            if (!displayForm) {
                // the drill as a whole is invalid, no reason to validate the parameters
                return false;
            }
            return !isDisplayFormRelevantToDrill(drillDefinition, drillTargets.availableDrillTargets, displayForm);
        });
        if (hasInvalidParam) {
            acc.invalidDrills.push(drillDefinition);
        }
        return acc;
    }, { widget, invalidDrills: [] });
}
//# sourceMappingURL=validateDrillToCustomUrlParams.js.map