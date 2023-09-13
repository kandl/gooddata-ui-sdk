// (C) 2007-2020 GoodData Corporation
import { makeCancelable } from "./CancelablePromise.js";
import values from "lodash/values.js";
/**
 * Simple promise cache, that allows promise canceling
 * After reset() call, it cancels pending promises
 * @internal
 */
export class PromiseCache {
    constructor(handler, getCacheKey = JSON.stringify) {
        this.handler = handler;
        this.getCacheKey = getCacheKey;
        this.promises = {};
        this.params = {};
        this.results = {};
        this.errors = {};
        this.getResult = (params) => {
            const cacheKey = this.getCacheKey(params);
            return this.results[cacheKey];
        };
        this.getError = (params) => {
            const cacheKey = this.getCacheKey(params);
            return this.errors[cacheKey];
        };
        this.getPromise = (params) => {
            const cacheKey = this.getCacheKey(params);
            const cachedPromise = this.promises[cacheKey];
            const cachedPromiseError = this.errors[cacheKey];
            if (cachedPromise && !cachedPromiseError) {
                return cachedPromise.promise;
            }
        };
        this.reset = () => {
            values(this.params).forEach(this.cancel);
            this.params = {};
            this.promises = {};
            this.results = {};
            this.errors = {};
        };
        this.cancel = (params) => {
            const cacheKey = this.getCacheKey(params);
            const cancelablePromise = this.promises[cacheKey];
            if (cancelablePromise) {
                cancelablePromise.cancel();
            }
        };
        this.load = (params) => {
            const cacheKey = this.getCacheKey(params);
            const cachedPromise = this.promises[cacheKey];
            if (cachedPromise) {
                return cachedPromise.promise;
            }
            const cancelablePromise = makeCancelable(this.handler(params));
            cancelablePromise.promise
                .then((result) => (this.results[cacheKey] = result))
                .catch((error) => (this.errors[cacheKey] = error));
            this.promises[cacheKey] = cancelablePromise;
            return cancelablePromise.promise;
        };
    }
}
//# sourceMappingURL=PromiseCache.js.map