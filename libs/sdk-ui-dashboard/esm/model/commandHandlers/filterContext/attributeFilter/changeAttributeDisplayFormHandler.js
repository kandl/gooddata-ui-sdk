// (C) 2022-2023 GoodData Corporation
import { call, put, select } from "redux-saga/effects";
import { invariant } from "ts-invariant";
import { batchActions } from "redux-batched-actions";
import flatMap from "lodash/flatMap.js";
import { attributeDisplayFormChanged } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { selectFilterContextAttributeFilterByLocalId } from "../../../store/filterContext/filterContextSelectors.js";
import { dispatchFilterContextChanged } from "../common.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
import { validateFilterDisplayForm } from "./validation/filterDisplayFormValidation.js";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { selectAllCatalogDisplayFormsMap } from "../../../store/catalog/catalogSelectors.js";
import { query } from "../../../store/_infra/queryCall.js";
import { queryAttributeByDisplayForm } from "../../../queries/index.js";
import { newDisplayFormMap } from "../../../../_staging/metadata/objRefMap.js";
export function* changeAttributeDisplayFormHandler(ctx, cmd) {
    const { filterLocalId, displayForm } = cmd.payload;
    const { backend: { capabilities: { supportsElementUris }, }, } = ctx;
    const catalogDisplayFormsMap = yield select(selectAllCatalogDisplayFormsMap);
    const attributes = yield call(query, queryAttributeByDisplayForm([displayForm]));
    const attributeDisplayFormsMap = newDisplayFormMap([...flatMap(attributes, (a) => a.displayForms)]);
    const displayFormData = catalogDisplayFormsMap.get(displayForm) || attributeDisplayFormsMap.get(displayForm);
    invariant(displayFormData, "Inconsistent state in changeAttributeDisplayFormHandler, cannot update attribute filter with display form not available in the catalog.");
    const attribute = displayFormData === null || displayFormData === void 0 ? void 0 : displayFormData.attribute;
    const validationResult = yield call(validateFilterDisplayForm, ctx, attribute, displayForm);
    if (validationResult !== "VALID") {
        const message = validationResult === "INVALID_ATTRIBUTE_DISPLAY_FORM"
            ? "The display form provided is not a valid display form of the attribute filter."
            : "Cannot find the attribute for the display form used on the attribute filter.";
        throw invalidArgumentsProvided(ctx, cmd, message);
    }
    yield put(batchActions([
        // keep the attribute display form field up to date
        filterContextActions.addAttributeFilterDisplayForm(displayFormData),
        filterContextActions.changeAttributeDisplayForm({
            filterLocalId,
            displayForm,
            supportsElementUris,
        }),
    ]));
    const changedFilter = yield select(selectFilterContextAttributeFilterByLocalId(filterLocalId));
    invariant(changedFilter, "Inconsistent state in changeAttributeDisplayFormHandler, cannot update attribute filter for given local identifier.");
    yield dispatchDashboardEvent(attributeDisplayFormChanged(ctx, changedFilter, cmd.correlationId));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
//# sourceMappingURL=changeAttributeDisplayFormHandler.js.map