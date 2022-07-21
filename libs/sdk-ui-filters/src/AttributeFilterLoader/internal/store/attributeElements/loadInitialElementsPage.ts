// (C) 2022 GoodData Corporation
// import { AnyAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { put, call, take, race, takeLatest, SagaReturnType, select, cancelled } from "redux-saga/effects";
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
import { selectLoadNextElementsPageStatus } from "./selectors";

/**
 * @internal
 */
export function* loadInitialElementsPageWorker(): SagaIterator<void> {
    yield takeLatest(actions.loadInitialElementsPageRequest.match, loadInitialElementsPageSaga);
}

/**
 * @internal
 */
function* loadInitialElementsPageSaga({
    payload: { correlationId },
}: ReturnType<typeof actions.loadInitialElementsPageRequest>): SagaIterator<void> {
    let cancel = false;
    try {
        // Move outside of the sage? (or it will totally destroy the sagas) -> or maybe rather create some generic error action and propagate it upper
        const initStatus: ReturnType<typeof selectInitStatus> = yield select(selectInitStatus);
        if (initStatus !== "success") {
            throw new UnexpectedSdkError("Cannot call loadInitialElementsPage() before the initialization.");
        }

        const loadNextElementsPageStatus: ReturnType<typeof selectLoadNextElementsPageStatus> = yield select(
            selectLoadNextElementsPageStatus,
        );
        if (loadNextElementsPageStatus === "loading") {
            yield put(actions.loadNextElementsPageCancelRequest());
        }

        yield put(actions.setLoadInitialElementsPageStatus("loading"));

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
            loadInitialElementsPageResult,
            loadInitialElementsPageCancelRequest,
        }: {
            loadInitialElementsPageResult?: SagaReturnType<typeof loadElementsRange>;
            loadInitialElementsPageCancelRequest?: ReturnType<
                typeof actions.loadInitialElementsPageCancelRequest
            >;
        } = yield race({
            loadInitialElementsPageResult: call(loadElementsRange),
            loadInitialElementsPageCancelRequest: take(actions.loadInitialElementsPageCancelRequest.match),
        });

        if (loadInitialElementsPageCancelRequest) {
            cancel = true;
        } else if (loadInitialElementsPageResult) {
            const { success, error } = loadInitialElementsPageResult;

            if (success) {
                yield put(
                    actions.setAttributeElements({
                        attributeElements: success.payload.attributeElements,
                    }),
                );

                yield put(
                    actions.setAttributeElementsTotalCountWithCurrentSettings({
                        totalCount: success.payload.totalCount,
                    }),
                );

                yield put(actions.setLoadInitialElementsPageStatus("success"));
                yield put(actions.loadInitialElementsPageSuccess(success.payload));
            } else if (error) {
                yield put(actions.setLoadInitialElementsPageStatus("error"));
                yield put(actions.loadInitialElementsPageError(error.payload));
            }
        } else {
            // throw new Error() something went wrong
        }
    } finally {
        if (yield cancelled()) {
            cancel = true;
        }

        if (cancel) {
            yield put(actions.setLoadInitialElementsPageStatus("canceled"));
            yield put(actions.loadInitialElementsPageCancel({ correlationId }));
        }
    }
}
