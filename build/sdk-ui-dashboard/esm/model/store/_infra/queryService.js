import { createEntityAdapter, createSelector, createSlice, } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import memoize from "lodash/memoize.js";
import { invariant } from "ts-invariant";
import capitalize from "lodash/capitalize.js";
/**
 * Given query name, this function will create name to use for the slice that will hold the cache with query results.
 *
 * For slice name, the function drops the "GDC.DASH/QUERY." prefix and then the rest is camel-cased with the word 'Cache' appended at the end.
 *
 * @param queryName - query name in format GDC.DASH/QUERY.SOME.THING
 */
export function createSliceNameForQueryCache(queryName) {
    const withoutPrefix = queryName.split("/")[1];
    invariant(withoutPrefix, `Trying to create slice for query data but the query type name seems invalid: ${queryName}. Must always start with "GDC.DASH/QUERY." prefix`);
    // take the part after GDC.DASH/, split it into segments, drop the first segment (QUERY) and then capitalize the rest
    const segments = withoutPrefix.split(".").slice(1).map(capitalize);
    // and make sure the first segment is back to lowercase
    segments[0] = segments[0].toLowerCase();
    return `${segments.join("")}Cache`;
}
function createQueryCacheSlice(queryName, selectId) {
    const sliceName = createSliceNameForQueryCache(queryName);
    const cacheEntryId = (entry) => selectId(entry.query);
    const adapter = createEntityAdapter({ selectId: cacheEntryId });
    // TODO: getting massive typing errors here, don't know how to solve them
    const reducers = {
        set: adapter.setOne,
        remove: adapter.removeOne,
        removeAll: adapter.removeAll,
    };
    const slice = createSlice({
        name: sliceName,
        initialState: adapter.getInitialState(),
        reducers,
    });
    const cacheSelectors = adapter.getSelectors((state) => state._queryCache[sliceName]);
    const selectById = (id) => {
        return createSelector((state) => state, (state) => {
            return cacheSelectors.selectById(state, id);
        });
    };
    const selectQueryResult = memoize((query) => {
        const id = selectId(query);
        return createSelector((state) => state, (state) => {
            return cacheSelectors.selectById(state, id);
        });
    }, (query) => selectId(query));
    return {
        cacheName: sliceName,
        reducer: slice.reducer,
        actions: slice.actions,
        selectQueryResult,
        selectById,
    };
}
/**
 * Creates a query service whose results will be stored in the dashboard component's state. Cached query
 * services are useful when the query itself requires expensive operation backend.
 *
 * The dashboard store takes care of everything related to
 *
 * @param queryName - name of the query
 * @param generator - the generator function that processes the query
 * @param queryToCacheKey - function to map query into a cache key under which to store the results
 */
export function createCachedQueryService(queryName, generator, queryToCacheKey) {
    const queryCache = createQueryCacheSlice(queryName, queryToCacheKey);
    function* generatorWithQueryCache(ctx, query, refresh = false) {
        const cacheKey = queryToCacheKey(query);
        const cachedResult = yield select(queryCache.selectById(cacheKey));
        if ((cachedResult === null || cachedResult === void 0 ? void 0 : cachedResult.result) && !refresh) {
            return cachedResult.result;
        }
        try {
            yield put(queryCache.actions.set({
                query,
                status: "loading",
            }));
            const result = yield call(generator, ctx, query);
            yield put(queryCache.actions.set({
                query,
                status: "success",
                result,
            }));
            return result;
        }
        catch (e) {
            yield put(queryCache.actions.set({
                query,
                status: "error",
                error: e.message,
            }));
            throw e;
        }
    }
    return {
        name: queryName,
        generator: generatorWithQueryCache,
        cache: queryCache,
    };
}
/**
 * Creates a non-cached query service.
 *
 * @param queryName - name of the query
 * @param generator - the generator function that processes the query
 */
export function createQueryService(queryName, generator) {
    return {
        name: queryName,
        generator,
    };
}
//# sourceMappingURL=queryService.js.map