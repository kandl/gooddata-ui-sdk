// (C) 2022 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call, put, select, SagaReturnType, takeEvery } from "redux-saga/effects";

import { selectAttributeFilterDisplayForm } from "../attributeFilter/selectors";
import { actions } from "../slice";
import { cancelableCall, getAttributeFilterContext } from "../common/sagas";
import { loadAttributeElements } from "./effects";

/**
 * @internal
 */
export function* attributeElementsWorker(): SagaIterator<void> {
    yield takeEvery(actions.attributeElementsRequest.match, attributeElementsRequestSaga);
}

function* attributeElementsRequestSaga({
    payload: { correlationId, elements, limit, offset },
}: ReturnType<typeof actions.attributeElementsRequest>): SagaIterator<void> {
    const context: SagaReturnType<typeof getAttributeFilterContext> = yield call(getAttributeFilterContext);
    const displayFormRef: ReturnType<typeof selectAttributeFilterDisplayForm> = yield select(
        selectAttributeFilterDisplayForm,
    );

    yield call(() =>
        cancelableCall({
            promise: () =>
                loadAttributeElements(context, {
                    displayFormRef,
                    elements,
                    limit,
                    offset,
                }),
            onSuccess: function* (attributeElementsResult) {
                yield put(
                    actions.attributeElementsSuccess({
                        correlationId,
                        attributeElements: attributeElementsResult.items,
                        totalCount: attributeElementsResult.totalCount,
                    }),
                );
            },
            onError: function* (error) {
                yield put(actions.attributeElementsError({ error, correlationId }));
            },
            onCancel: function* () {
                yield put(actions.attributeElementsCancel({ correlationId }));
            },
        }),
    );
}
