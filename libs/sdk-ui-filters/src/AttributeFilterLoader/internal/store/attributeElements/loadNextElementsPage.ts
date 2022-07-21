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
import { selectLoadInitialElementsPageStatus } from "./selectors";

/**
 * @internal
 */
export function* loadNextElementsPageWorker(): SagaIterator<void> {
    yield takeLatest(actions.loadNextElementsPageRequest.match, loadNextElementsPageSaga);
}

// Musi byt init success a nebo se predtim zavolat initialsElementsPage
// novy init / initialsElementsPageRequest to zrusi

/**
 * @internal
 */
function* loadNextElementsPageSaga({
    payload: { correlationId },
}: ReturnType<typeof actions.loadNextElementsPageRequest>): SagaIterator<void> {
    let cancel = false;
    try {
        const initStatus: ReturnType<typeof selectInitStatus> = yield select(selectInitStatus);
        if (initStatus !== "success") {
            throw new UnexpectedSdkError("Cannot call loadNextElementsPageSaga() before the initialization.");
        }

        // TODO: is this correct?
        const loadInitialElementsPageStatus: ReturnType<typeof selectLoadInitialElementsPageStatus> =
            yield select(selectLoadInitialElementsPageStatus);
        if (loadInitialElementsPageStatus !== "success") {
            throw new UnexpectedSdkError(
                "Cannot call loadNextElementsPageSaga() if the the initial page is not loaded.",
            );
        }

        // TODO: settings are different before next call

        // throw error if loadInitialElementsPage
        // - is still running
        // - was not called
        // - settings was changed and loadInitialElementsPage was not called before

        yield put(actions.setLoadNextElementsPageStatus("loading"));

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
            loadNextElementsPageResult,
            loadNextElementsPageCancelRequest,
        }: {
            loadNextElementsPageResult?: SagaReturnType<typeof loadElementsRange>;
            loadNextElementsPageCancelRequest?: ReturnType<typeof actions.loadNextElementsPageCancelRequest>;
        } = yield race({
            loadNextElementsPageResult: call(loadElementsRange),
            loadNextElementsPageCancelRequest: take(actions.loadNextElementsPageCancelRequest.match),
        });

        if (loadNextElementsPageCancelRequest) {
            cancel = true;
        } else if (loadNextElementsPageResult) {
            const { success, error } = loadNextElementsPageResult;

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

                yield put(actions.setLoadNextElementsPageStatus("success"));

                yield put(actions.loadNextElementsPageSuccess(success.payload));
            } else if (error) {
                yield put(actions.setLoadNextElementsPageStatus("error"));

                yield put(actions.loadNextElementsPageError(error.payload));
            }
        } else {
            // throw new Error() something went wrong
        }
    } finally {
        if (yield cancelled()) {
            cancel = true;
        }

        if (cancel) {
            yield put(actions.setLoadNextElementsPageStatus("canceled"));
            yield put(actions.loadNextElementsPageCancel({ correlationId }));
        }
    }
}
