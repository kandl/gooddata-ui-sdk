// (C) 2021 GoodData Corporation
import { queryEnvelopeWithPromise } from "./queryProcessing.js";
/**
 * Dispatches a query and returns a promise to its result.
 *
 * @param dispatch - dashboard dispatch to use
 * @param query - query to trigger and wait for results of
 * @returns Promise of the query result
 * @alpha
 */
export async function queryAndWaitFor(dispatch, query) {
    const { promise, envelope } = queryEnvelopeWithPromise(query);
    dispatch(envelope);
    return promise;
}
//# sourceMappingURL=queryAndWaitFor.js.map