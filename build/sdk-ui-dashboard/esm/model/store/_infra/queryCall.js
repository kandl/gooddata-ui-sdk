// (C) 2021-2022 GoodData Corporation
import { queryEnvelopeWithPromise } from "./queryProcessing.js";
import { call, put } from "redux-saga/effects";
/**
 * Runs the provided query and returns its result.
 *
 * @param q - query to run
 * @param refresh - indicates whether the query should ignore cached results and re-load data from backend
 */
export function* query(q, refresh = false) {
    const { promise, envelope } = queryEnvelopeWithPromise(q, refresh);
    const waitForResult = () => {
        return promise;
    };
    /*
     * dispatch the enveloped query. the envelope is setup so that upon query finish a promise will be resolved
     */
    yield put(envelope);
    return yield call(waitForResult);
}
/**
 * Runs the provided query, forcing refresh of any results that may be cached in the state, and returns its result.
 *
 * @param q - query to run
 */
export function* queryFresh(q) {
    return yield call(query, q, true);
}
//# sourceMappingURL=queryCall.js.map