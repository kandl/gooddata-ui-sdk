// (C) 2021-2023 GoodData Corporation
import LRUCache from "lru-cache";
import { objRefToString } from "@gooddata/sdk-model";
import { INSIGHT_CACHE_SIZE } from "./constants";
import { dataLoaderAbstractFactory } from "./DataLoaderAbstractFactory";
class InsightDataLoader {
    constructor(workspace) {
        this.workspace = workspace;
        this.insightCache = new LRUCache({ max: INSIGHT_CACHE_SIZE });
    }
    getInsight(backend, ref) {
        const cacheKey = objRefToString(ref);
        let insight = this.insightCache.get(cacheKey);
        if (!insight) {
            insight = backend
                .workspace(this.workspace)
                .insights()
                .getInsight(ref)
                .catch((error) => {
                this.insightCache.delete(cacheKey);
                throw error;
            });
            this.insightCache.set(cacheKey, insight);
        }
        return insight;
    }
}
/**
 * @internal
 */
export const insightDataLoaderFactory = dataLoaderAbstractFactory((workspace) => new InsightDataLoader(workspace));
//# sourceMappingURL=InsightDataLoader.js.map