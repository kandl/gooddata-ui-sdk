import omit from "lodash/omit.js";
import { call, select } from "redux-saga/effects";
import { selectAttributeFilterDisplayForm, selectHiddenElementsAsAttributeElements, } from "../filter/filterSelectors.js";
import { selectAttribute } from "../loadAttribute/loadAttributeSelectors.js";
import { getAttributeFilterContext } from "../common/sagas.js";
import { selectStaticElements } from "./elementsSelectors.js";
import { loadElements } from "./loadElements.js";
/**
 * @internal
 */
export function* elementsSaga(options) {
    const context = yield call(getAttributeFilterContext);
    const hiddenElements = yield select(selectHiddenElementsAsAttributeElements);
    const attribute = yield select(selectAttribute);
    const attributeFilterDisplayFormRef = yield select(selectAttributeFilterDisplayForm);
    const staticElements = yield select(selectStaticElements);
    const elementsQueryResult = yield call(loadElements, context, Object.assign({ displayFormRef: attributeFilterDisplayFormRef }, options), {
        hiddenElements,
        attribute,
    }, staticElements);
    return {
        elements: elementsQueryResult.items,
        totalCount: elementsQueryResult.totalCount,
        options: omit(options, "signal"),
    };
}
//# sourceMappingURL=elementsSaga.js.map