// (C) 2022 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { put, call, take, race, takeEvery, SagaReturnType, select, cancelled } from "redux-saga/effects";
import { UnexpectedSdkError } from "@gooddata/sdk-ui";

import { asyncRequestSaga } from "../common/asyncRequestSaga";
import { actions } from "../slice";
import {
    selectInitStatus,
    selectLimitingAttributeFilters,
    selectLimitingDateFilters,
    selectLimitingMeasureFilters,
    selectSearch,
} from "../main/selectors";

/**
 * @internal
 */
export function* loadCustomElementsWorker(): SagaIterator<void> {
    yield takeEvery(actions.loadCustomElementsRequest.match, loadCustomElementsSaga);
}

/**
 * @internal
 */
function* loadCustomElementsSaga({
    payload: { correlationId },
}: ReturnType<typeof actions.loadCustomElementsRequest>): SagaIterator<void> {
    let cancel = false;
    try {
        // Move outside of the sage? (or it will totally destroy the sagas) -> or maybe rather create some generic error action and propagate it upper
        // Is this necessary here at all? (it's totally custom call)
        const initStatus: ReturnType<typeof selectInitStatus> = yield select(selectInitStatus);
        if (initStatus !== "success") {
            throw new UnexpectedSdkError("Cannot call loadCustomElements() before the initialization.");
        }

        // const order =
        // const limit =
        const search: ReturnType<typeof selectSearch> = yield select(selectSearch);
        const limitingAttributeFilters: ReturnType<typeof selectLimitingAttributeFilters> = yield select(
            selectLimitingAttributeFilters,
        );
        const limitingMeasures: ReturnType<typeof selectLimitingMeasureFilters> = yield select(
            selectLimitingMeasureFilters,
        );
        const limitingDateFilters: ReturnType<typeof selectLimitingDateFilters> = yield select(
            selectLimitingDateFilters,
        );

        const loadElementsRange = () =>
            asyncRequestSaga(
                actions.attributeElementsRequest({
                    correlationId,
                    search,
                    limitingAttributeFilters,
                    limitingDateFilters,
                    limitingMeasures,
                }),
                actions.attributeElementsSuccess.match,
                actions.attributeElementsError.match,
                actions.attributeElementsCancelRequest({ correlationId }),
            );

        const {
            loadCustomElementsResult,
            loadCustomElementsCancelRequest,
        }: {
            loadCustomElementsResult?: SagaReturnType<typeof loadElementsRange>;
            loadCustomElementsCancelRequest?: ReturnType<typeof actions.loadCustomElementsCancelRequest>;
        } = yield race({
            loadCustomElementsResult: call(loadElementsRange),
            loadCustomElementsCancelRequest: take(actions.loadCustomElementsCancelRequest.match),
        });

        if (loadCustomElementsCancelRequest) {
            cancel = true;
        } else if (loadCustomElementsResult) {
            const { success, error } = loadCustomElementsResult;

            if (success) {
                yield put(actions.loadCustomElementsSuccess(success.payload));
            } else if (error) {
                yield put(actions.loadCustomElementsError(error.payload));
            }
        } else {
            // throw new Error() something went wrong
        }
    } finally {
        if (yield cancelled()) {
            cancel = true;
        }

        if (cancel) {
            yield put(actions.loadCustomElementsCancel({ correlationId }));
        }
    }
}
