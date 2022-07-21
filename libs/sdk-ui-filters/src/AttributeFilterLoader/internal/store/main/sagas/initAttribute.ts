// (C) 2022 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call, put, SagaReturnType } from "redux-saga/effects";

import { asyncRequestSaga } from "../../common/asyncRequestSaga";
import { actions } from "../../slice";

/**
 * @internal
 */
export function* initAttributeSaga(initCorrelationId: string): SagaIterator<void> {
    const correlationId = `init_attribute_${initCorrelationId}`;

    const initAttribute = () =>
        asyncRequestSaga(
            actions.attributeRequest({ correlationId }),
            actions.attributeSuccess.match,
            actions.attributeError.match,
            actions.attributeCancelRequest({ correlationId }),
        );

    const result: SagaReturnType<typeof initAttribute> = yield call(initAttribute);

    if (result.success) {
        yield put(
            actions.setAttribute({
                attribute: result.success.payload.attribute,
            }),
        );
    }

    if (result.error) {
        throw result.error.payload.error;
    }
}
