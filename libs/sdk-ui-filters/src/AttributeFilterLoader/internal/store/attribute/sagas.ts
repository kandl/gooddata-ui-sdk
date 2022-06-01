// (C) 2022 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call, put, select, SagaReturnType, takeLatest } from "redux-saga/effects";

import { selectAttributeFilterDisplayForm } from "../attributeFilter/selectors";
import { cancelableCall, getAttributeFilterContext } from "../common/sagas";
import { actions } from "../slice";

import { loadAttributeByDisplayForm } from "./effects";

/**
 * @internal
 */
export function* attributeWorker(): SagaIterator<void> {
    yield takeLatest(actions.attributeRequest.type, attributeRequestSaga);
}

function* attributeRequestSaga({
    payload: { correlationId },
}: ReturnType<typeof actions.attributeRequest>): SagaIterator<void> {
    const context: SagaReturnType<typeof getAttributeFilterContext> = yield call(getAttributeFilterContext);
    const displayFormRef: ReturnType<typeof selectAttributeFilterDisplayForm> = yield select(
        selectAttributeFilterDisplayForm,
    );

    // TODO: attributeCancelRequest
    yield call(() =>
        cancelableCall({
            promise: () => loadAttributeByDisplayForm(context, displayFormRef),
            onSuccess: function* (attribute) {
                yield put(actions.attributeSuccess({ attribute, correlationId }));
            },
            onError: function* (error) {
                yield put(actions.attributeError({ error, correlationId }));
            },
            onCancel: function* () {
                yield put(actions.attributeCancel({ correlationId }));
            },
        }),
    );
}
