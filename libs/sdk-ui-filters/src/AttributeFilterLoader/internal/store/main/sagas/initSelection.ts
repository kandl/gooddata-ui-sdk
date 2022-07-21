// (C) 2022 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { put, select, call, SagaReturnType } from "redux-saga/effects";
import { asyncRequestSaga } from "../../common/asyncRequestSaga";
import { selectIsCommittedSelectionInverted } from "../../selection/selectors";
import { actions } from "../../slice";
import { selectAttributeFilterElements } from "../selectors";

/**
 * @internal
 */
export function* initSelectionSaga(initCorrelationId: string): SagaIterator<void> {
    const correlationId = `init_selection_${initCorrelationId}`;
    const isInverted: ReturnType<typeof selectIsCommittedSelectionInverted> = yield select(
        selectIsCommittedSelectionInverted,
    );
    const elements: ReturnType<typeof selectAttributeFilterElements> = yield select(
        selectAttributeFilterElements,
    );

    const loadSelection = () =>
        asyncRequestSaga(
            actions.attributeElementsRequest({ correlationId, elements }),
            actions.attributeElementsSuccess.match,
            actions.attributeElementsError.match,
            actions.attributeElementsCancelRequest({ correlationId }),
        );

    const { success, error }: SagaReturnType<typeof loadSelection> = yield call(loadSelection);

    if (error) {
        throw error.payload.error;
    } else if (success) {
        yield put(
            actions.changeSelection({
                selection: success.payload.attributeElements.map((element) => element.uri),
                isInverted,
            }),
        );

        yield put(actions.commitSelection());
    }
}
