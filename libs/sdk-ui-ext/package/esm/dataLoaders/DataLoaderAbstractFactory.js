// (C) 2021-2023 GoodData Corporation
import LRUCache from "lru-cache";
import { LOADER_CACHE_SIZE } from "./constants";
export const dataLoaderAbstractFactory = (createLoader) => {
    const loaders = new LRUCache({ max: LOADER_CACHE_SIZE });
    return {
        forWorkspace(workspace) {
            let loader = loaders.get(workspace);
            if (!loader) {
                loader = createLoader(workspace);
                loaders.set(workspace, loader);
            }
            return loader;
        },
        reset() {
            loaders.clear();
        },
    };
};
//# sourceMappingURL=DataLoaderAbstractFactory.js.map