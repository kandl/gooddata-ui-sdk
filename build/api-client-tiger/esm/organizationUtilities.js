// (C) 2019-2022 GoodData Corporation
var _a;
import flatMap from "lodash/flatMap.js";
import merge from "lodash/merge.js";
import uniqBy from "lodash/uniqBy.js";
import { jsonApiHeaders } from "./constants.js";
const DefaultPageSize = 250;
const DefaultOptions = {
    headers: jsonApiHeaders,
};
/**
 * Tiger organization utility functions
 *
 * @internal
 */
class OrganizationUtilities {
    /**
     * Guard for recognizing entities which support `included` field.
     * @internal
     */
    static supportsIncluded(entity) {
        return entity.included !== undefined;
    }
    /**
     * This function merges multiple pages containing metadata entities into a single page. The entity data from different
     * pages are concatenated. The side-loaded entities are concatenated and their uniqueness is ensured so that same
     * entity sideloaded on multiple pages only appears once.
     *
     * The merges result WILL NOT contain any links section.
     *
     * @param pages - pages to merge
     * @internal
     */
    static mergeEntitiesResults(pages) {
        return {
            data: flatMap(pages, (page) => page.data),
            included: uniqBy(flatMap(pages, (page) => { var _b; return OrganizationUtilities.supportsIncluded(page) ? (_b = page.included) !== null && _b !== void 0 ? _b : [] : []; }), (item) => `${item.id}_${item.type}`),
        };
    }
}
_a = OrganizationUtilities;
/**
 * Given a function to get a paged list of metadata entities, API call parameters and options, this function will
 * retrieve all pages from the metadata.
 *
 * The parameters are passed to the function as is. The options will be used as a 'template'. If the options specify
 * page `size`, it will be retained and used for paging. Otherwise the size will be set to a default value (250). The
 * `page` number will be added dynamically upon each page request.
 *
 * @param client - API client to use, this is required so that function can correctly bind 'this' for
 *  the entitiesGet function
 * @param entitiesGet - function to get pages list of entities
 * @param params - parameters accepted by the function
 * @param options - options accepted by the function
 * @internal
 */
OrganizationUtilities.getAllPagesOf = async (client, entitiesGet, params, options = {}) => {
    var _b;
    const boundGet = entitiesGet.bind(client.entities);
    const results = [];
    const pageSize = (_b = params === null || params === void 0 ? void 0 : params.size) !== null && _b !== void 0 ? _b : DefaultPageSize;
    let reachedEnd = false;
    let nextPage = 0;
    while (!reachedEnd) {
        const result = await boundGet(Object.assign(Object.assign({}, params), { page: nextPage, size: pageSize }), merge({}, DefaultOptions, options));
        results.push(result.data);
        if (result.data.data.length < pageSize) {
            reachedEnd = true;
        }
        else {
            nextPage += 1;
        }
    }
    return results;
};
export { OrganizationUtilities };
//# sourceMappingURL=organizationUtilities.js.map