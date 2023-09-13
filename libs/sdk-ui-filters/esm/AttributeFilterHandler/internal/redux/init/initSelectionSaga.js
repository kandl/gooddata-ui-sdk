import { select, fork, take, race, call } from "redux-saga/effects";
import { isAttributeElementsByRef } from "@gooddata/sdk-model";
import { loadCustomElementsSaga } from "../loadCustomElements/loadCustomElementsSaga.js";
import { selectAttributeFilterElements } from "../filter/filterSelectors.js";
import { actions } from "../store/slice.js";
import { getAttributeFilterContext } from "../common/sagas.js";
import { selectElementsForm } from "../common/selectors.js";
/**
 * @internal
 */
export function* initSelectionSaga(correlation) {
    const elements = yield select(selectAttributeFilterElements);
    const context = yield call(getAttributeFilterContext);
    const elementsForm = yield select(selectElementsForm);
    const elementKeys = isAttributeElementsByRef(elements) ? elements.uris : elements.values;
    if (elementKeys.length === 0) {
        return;
    }
    const initSelectionCorrelation = `initSelection_${correlation}`;
    yield fork(loadCustomElementsSaga, actions.loadCustomElementsRequest({
        options: {
            elements,
            offset: 0,
            limit: 550,
            search: undefined,
            excludePrimaryLabel: !context.backend.capabilities.supportsElementUris && elementsForm === "values",
        },
        correlation: initSelectionCorrelation,
    }));
    const { error, } = yield race({
        success: take((a) => actions.loadCustomElementsSuccess.match(a) &&
            a.payload.correlation === initSelectionCorrelation),
        error: take((a) => actions.loadCustomElementsError.match(a) &&
            a.payload.correlation === initSelectionCorrelation),
        cancel: take((a) => actions.loadCustomElementsCancel.match(a) &&
            a.payload.correlation === initSelectionCorrelation),
    });
    if (error) {
        throw error.payload.error;
    }
}
//# sourceMappingURL=initSelectionSaga.js.map