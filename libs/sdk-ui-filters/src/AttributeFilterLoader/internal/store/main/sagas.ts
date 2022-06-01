// (C) 2022 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { all, call, takeLatest } from "redux-saga/effects";

import { actions } from "../slice";
import { initAttribute } from "./sagas/initAttribute";
import { initSelection } from "./sagas/initSelection";
import { initAttributeElements } from "./sagas/initAttributeElements";

/**
 * @internal
 */
export function* mainWorker(): SagaIterator<void> {
    yield takeLatest(actions.init.match, initSaga);
}

function* initSaga(): SagaIterator<void> {
    // this.displayForm = filterObjRef(config.filter);

    // this.attributeLoader = new DefaultAttributeDisplayFormLoader(
    //     this.displayForm,
    //     config.backend,
    //     config.workspace,
    //     // config.displayFormLoad,
    // );

    // const elements = filterAttributeElements(config.filter);

    // const initialSelection: InvertableSelection = {
    //     isInverted: isNegativeAttributeFilter(config.filter),
    //     items: isAttributeElementsByRef(elements) ? elements.uris : elements.values,
    // };

    // this.isElementsByRef = isAttributeElementsByRef(elements);

    // this.stagedSelectionHandler = new DefaultStagedAttributeElementsSelectionHandler(initialSelection);

    // this.elementLoader = new DefaultAttributeElementsLoader(
    //     this.displayForm,
    //     config.backend,
    //     config.workspace,
    //     // config.elementsLoad,
    // );

    // this.init(initialSelection);

    yield all([call(initAttribute), call(initAttributeElements), call(initSelection)]);
}
