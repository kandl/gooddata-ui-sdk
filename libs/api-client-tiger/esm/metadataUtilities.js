// (C) 2019-2022 GoodData Corporation
var _a;
import flatMap from "lodash/flatMap.js";
import merge from "lodash/merge.js";
import uniqBy from "lodash/uniqBy.js";
import { jsonApiHeaders } from "./constants.js";
const DefaultPageSize = 250;
const DefaultOptions = {
    headers: jsonApiHeaders,
    params: {
        size: DefaultPageSize,
    },
};
function createOptionsForPage(page, options) {
    return merge({}, DefaultOptions, options, { params: { page } });
}
/**
 * Tiger metadata utility functions
 *
 * @internal
 */
class MetadataUtilities {
    /**
     * This function merges multiple pages containing metadata entities into a single page. The entity data from different
     * pages are concatenated. The side-loaded entities are concatenated and their uniqueness is ensured so that same
     * entity side-loaded on multiple pages only appears once.
     *
     * The merges result WILL NOT contain any links section.
     *
     * @param pages - pages to merge
     * @internal
     */
    static mergeEntitiesResults(pages) {
        return {
            data: flatMap(pages, (page) => page.data),
            included: uniqBy(
            // we need the as any because the JsonApiDashboardPluginOutList does not have the "included" property
            flatMap(pages, (page) => { var _b; return (_b = page.included) !== null && _b !== void 0 ? _b : []; }), (item) => `${item.id}_${item.type}`),
        };
    }
    /**
     * Given list of JSON API entities, return those which have not broken relations to other MD objects. This
     * info is computed by backend when "X-GDC-VALIDATE-RELATIONS" is sent with the GET request. Note that backend
     * checks the relations recursively.
     *
     * @param result - MetadataGetEntitiesResult
     */
    static filterValidEntities(result) {
        result.data = result.data.filter((entity) => { var _b, _c; return (_c = (_b = entity.attributes) === null || _b === void 0 ? void 0 : _b.areRelationsValid) !== null && _c !== void 0 ? _c : true; });
        return result;
    }
}
_a = MetadataUtilities;
/**
 * Given a function to get a paged list of metadata entities, API call parameters and options, this function will
 * retrieve all pages from the metadata.
 *
 * The parameters are passed to the function as is. The options will be used as a 'template'. If the options specify
 * page `size`, it will be retained and used for paging. Otherwise, the size will be set to a default value (250). The
 * `page` number will be added dynamically upon each page request.
 *
 * @param client - API client to use, this is required so that function can correctly bind 'this' for
 *  the entitiesGet function
 * @param entitiesGet - function to get pages list of entities
 * @param params - parameters accepted by the function
 * @param options - options accepted by the function
 * @internal
 */
MetadataUtilities.getAllPagesOf = async (client, entitiesGet, params, options = {}) => {
    var _b, _c;
    const boundGet = entitiesGet.bind(client.entities);
    const results = [];
    const pageSize = (_c = (_b = options.params) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : DefaultPageSize;
    let reachedEnd = false;
    let nextPage = 0;
    while (!reachedEnd) {
        const optionsToUse = createOptionsForPage(nextPage, options);
        const result = await boundGet(params, optionsToUse);
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
export { MetadataUtilities };
//# sourceMappingURL=metadataUtilities.js.map