// (C) 2022 GoodData Corporation
// import { AnyAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { put, call, take, race, takeLatest, SagaReturnType, cancelled } from "redux-saga/effects";

import { asyncRequestSaga } from "../common/asyncRequestSaga";
import { actions } from "../slice";

/**
 * @internal
 */
export function* loadAttributeWorker(): SagaIterator<void> {
    yield takeLatest(actions.loadAttributeRequest.match, loadAttributeSaga);
}

/**
 * @internal
 */
function* loadAttributeSaga({
    payload: { correlationId },
}: ReturnType<typeof actions.loadAttributeRequest>): SagaIterator<void> {
    let cancel = false;
    try {
        yield put(actions.setLoadAttributeStatus("loading"));

        const loadAttribute = () =>
            asyncRequestSaga(
                actions.attributeRequest({
                    correlationId,
                }),
                actions.attributeSuccess.match,
                actions.attributeError.match,
                actions.attributeCancelRequest({ correlationId }),
            );

        const {
            loadAttributeResult,
            cancelRequest,
        }: {
            loadAttributeResult?: SagaReturnType<typeof loadAttribute>;
            cancelRequest?: ReturnType<typeof actions.loadAttributeCancelRequest>;
        } = yield race({
            loadAttributeResult: call(loadAttribute),
            cancelRequest: take(actions.loadAttributeCancelRequest.match),
        });

        if (cancelRequest) {
            cancel = true;
        } else {
            const { success, error } = loadAttributeResult;

            if (success) {
                yield put(
                    actions.setAttribute({
                        attribute: success.payload.attribute,
                    }),
                );

                yield put(actions.setLoadAttributeStatus("success"));

                yield put(actions.loadAttributeSuccess(success.payload));
            } else if (error) {
                yield put(actions.setLoadAttributeStatus("error"));

                yield put(actions.loadAttributeError(error.payload));
            }
        }
    } finally {
        if (yield cancelled()) {
            cancel = true;
        }

        if (cancel) {
            yield put(actions.setLoadAttributeStatus("canceled"));
            yield put(actions.loadAttributeCancel({ correlationId }));
        }
    }
}
