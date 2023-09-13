// (C) 2021-2022 GoodData Corporation
import { actionChannel, call, spawn, take } from "redux-saga/effects";
import keyBy from "lodash/keyBy.js";
import { combineReducers } from "@reduxjs/toolkit";
import fromPairs from "lodash/fromPairs.js";
import noop from "lodash/noop.js";
import compact from "lodash/compact.js";
import { dispatchDashboardEvent } from "./eventDispatcher.js";
import { internalQueryErrorOccurred, isDashboardQueryFailed, queryCompleted, queryRejected, queryStarted, } from "../../events/general.js";
import { getDashboardContext } from "./contexts.js";
/**
 * @internal
 */
export const QueryEnvelopeActionPrefix = "__Q";
function isQueryEnvelope(obj) {
    return !!obj && obj.type.startsWith(QueryEnvelopeActionPrefix);
}
/**
 * @internal
 */
export function queryEnvelope(query, eventHandlers, refresh = false) {
    var _a, _b, _c;
    return {
        type: `${QueryEnvelopeActionPrefix}(${query.type})`,
        query,
        refresh,
        onError: (_a = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onError) !== null && _a !== void 0 ? _a : noop,
        onStart: (_b = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onStart) !== null && _b !== void 0 ? _b : noop,
        onSuccess: (_c = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onSuccess) !== null && _c !== void 0 ? _c : noop,
    };
}
/**
 * @internal
 */
export function queryEnvelopeWithPromise(query, refresh = false) {
    const queryEnvelopeEventHandlers = {};
    const promise = new Promise((resolve, reject) => {
        queryEnvelopeEventHandlers.onSuccess = resolve;
        queryEnvelopeEventHandlers.onError = reject;
    });
    const envelope = queryEnvelope(query, queryEnvelopeEventHandlers, refresh);
    return {
        promise,
        envelope,
    };
}
function* processQuery(service, ctx, envelope) {
    var _a;
    const { query, query: { type, correlationId }, } = envelope;
    const correlationIdForLog = correlationId !== null && correlationId !== void 0 ? correlationId : "(no correlationId provided)";
    try {
        try {
            envelope.onStart(query);
        }
        catch (e) {
            console.warn(`An error has occurred while calling onStart function provided for ${type}@${correlationIdForLog} processing:`, e);
        }
        yield dispatchDashboardEvent(queryStarted(ctx, query, correlationId));
        const result = yield call(service.generator, ctx, envelope.query, (_a = envelope.refresh) !== null && _a !== void 0 ? _a : false);
        try {
            envelope.onSuccess(result);
        }
        catch (e) {
            console.warn(`An error has occurred while calling onSuccess function provided for ${type}@${correlationIdForLog} processing`, e);
        }
        yield dispatchDashboardEvent(queryCompleted(ctx, query, result, correlationId));
    }
    catch (e) {
        try {
            envelope.onError(e);
        }
        catch (ne) {
            console.warn(`An error has occurred while calling onError function provided for ${type}@${correlationIdForLog} processing:`, ne);
        }
        if (isDashboardQueryFailed(e)) {
            yield dispatchDashboardEvent(e);
        }
        else {
            yield dispatchDashboardEvent(internalQueryErrorOccurred(ctx, `An internal error has occurred while processing ${type}`, e, correlationId));
        }
    }
}
function ensureQueryWrappedInEnvelope(action) {
    return isQueryEnvelope(action) ? action : queryEnvelope(action);
}
/**
 * Creates components that should be integrated into the dashboard store in order to facilitate query processing.
 *
 * @param queryServices - query services use to initialize the components
 */
export function createQueryProcessingModule(queryServices) {
    const servicesByType = keyBy(queryServices, (service) => service.name);
    const queryToReducers = fromPairs(compact(queryServices.map((service) => {
        if (!service.cache) {
            return null;
        }
        return [service.cache.cacheName, service.cache.reducer];
    })));
    return {
        queryCacheReducer: combineReducers(queryToReducers),
        /*
         * The root saga for all query processing. This will channel in all query envelopes and all non-enveloped
         * queries and will dispatch the query
         */
        rootQueryProcessor: function* () {
            const queryChannel = yield actionChannel((action) => action.type &&
                (action.type.startsWith(QueryEnvelopeActionPrefix) ||
                    action.type.startsWith("GDC.DASH/QUERY.")));
            while (true) {
                const query = yield take(queryChannel);
                const envelope = ensureQueryWrappedInEnvelope(query);
                const dashboardContext = yield call(getDashboardContext);
                const service = servicesByType[envelope.query.type];
                if (!service) {
                    yield dispatchDashboardEvent(queryRejected(dashboardContext, envelope.query.correlationId));
                }
                else {
                    yield spawn(processQuery, service, dashboardContext, envelope);
                }
            }
        },
    };
}
//# sourceMappingURL=queryProcessing.js.map