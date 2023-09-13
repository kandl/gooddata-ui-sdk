// (C) 2021-2022 GoodData Corporation
import compact from "lodash/compact.js";
import flatMap from "lodash/flatMap.js";
import zip from "lodash/zip.js";
import { uriRef, isDashboardAttributeFilter, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
/**
 * Since bear backend does not support idRefs in filter context objects, we need to covert them to uriRefs if they are present.
 *
 * @param filterContext - filter context to sanitize
 * @param objRefsToUris - function converting ObjRefs to URIs
 * @returns filter context that uses uriRefs exclusively in its filters
 */
export async function sanitizeFilterContext(filterContext, objRefsToUris) {
    const { filters } = filterContext;
    if (!filters.length) {
        return filterContext;
    }
    const refs = compact(flatMap(filters, (filter) => {
        var _a;
        const ref = getDashboardFilterRef(filter);
        const overRefs = isDashboardAttributeFilter(filter)
            ? flatMap((_a = filter.attributeFilter.filterElementsBy) !== null && _a !== void 0 ? _a : [], (item) => item.over.attributes)
            : [];
        return [ref, ...overRefs];
    }));
    const convertedRefs = await objRefsToUris(refs);
    const refUriPairs = zip(refs, convertedRefs);
    const sanitizedFilters = filters.map((filter) => {
        var _a;
        const originalRef = getDashboardFilterRef(filter);
        if (!originalRef) {
            return filter;
        }
        // we can use referential comparison here, the objects are the same
        const refMatch = refUriPairs.find(([ref]) => ref === originalRef);
        // this indicates a serious fault in the logic
        invariant(refMatch);
        const sanitizedRef = uriRef(refMatch[1]);
        if (isDashboardAttributeFilter(filter)) {
            const sanitizedFilterElementsBy = (_a = filter.attributeFilter.filterElementsBy) === null || _a === void 0 ? void 0 : _a.map((item) => (Object.assign(Object.assign({}, item), { over: Object.assign(Object.assign({}, item.over), { attributes: item.over.attributes.map((attrRef) => {
                        // we can use referential comparison here, the objects are the same
                        const attrMatch = refUriPairs.find(([ref]) => ref === attrRef);
                        // this indicates a serious fault in the logic
                        invariant(attrMatch);
                        return uriRef(attrMatch[1]);
                    }) }) })));
            return {
                attributeFilter: Object.assign(Object.assign({}, filter.attributeFilter), { displayForm: sanitizedRef, filterElementsBy: sanitizedFilterElementsBy }),
            };
        }
        else {
            return {
                dateFilter: Object.assign(Object.assign({}, filter.dateFilter), { dataSet: sanitizedRef }),
            };
        }
    });
    return Object.assign(Object.assign({}, filterContext), { filters: sanitizedFilters });
}
function getDashboardFilterRef(filter) {
    return isDashboardAttributeFilter(filter)
        ? filter.attributeFilter.displayForm
        : filter.dateFilter.dataSet;
}
//# sourceMappingURL=filterContexts.js.map