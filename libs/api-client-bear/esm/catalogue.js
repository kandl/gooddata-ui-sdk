// (C) 2007-2022 GoodData Corporation
import find from "lodash/find.js";
import omit from "lodash/omit.js";
import omitBy from "lodash/omitBy.js";
import isEmpty from "lodash/isEmpty.js";
import cloneDeep from "lodash/cloneDeep.js";
import { omitEmpty } from "./util.js";
const REQUEST_DEFAULTS = {
    types: ["attribute", "metric", "fact"],
    paging: {
        offset: 0,
    },
};
const LOAD_DATE_DATASET_DEFAULTS = {
    includeUnavailableDateDataSetsCount: true,
    includeAvailableDateAttributes: true,
};
/**
 * Convert specific params in options to "requiredDataSets" structure. For more details look into
 * res file https://github.com/gooddata/gdc-bear/blob/develop/resources/specification/internal/catalog.res
 *
 * @param options - Supported keys in options are:
 * <ul>
 * <li>dataSetIdentifier - in value is string identifier of dataSet - this leads to CUSTOM type
 * <li>returnAllDateDataSets - true value means to return ALL values without dataSet differentiation
 * <li>returnAllRelatedDateDataSets - only related date dataSets are loaded across all dataSets
 * <li>by default we get PRODUCTION dataSets
 * </ul>
 * @returns "requiredDataSets" object hash.
 */
const getRequiredDataSets = (options = {}) => {
    if (options.returnAllRelatedDateDataSets) {
        return {};
    }
    if (options.returnAllDateDataSets) {
        return { requiredDataSets: { type: "ALL" } };
    }
    if (options.dataSetIdentifier) {
        return {
            requiredDataSets: {
                type: "CUSTOM",
                customIdentifiers: [options.dataSetIdentifier],
            },
        };
    }
    return { requiredDataSets: { type: "PRODUCTION" } };
};
const buildItemDescriptionObjects = ({ columns, definitions }) => {
    if (!columns) {
        return [];
    }
    return columns.map((column) => {
        var _a;
        const definition = find(definitions, ({ metricDefinition }) => metricDefinition.identifier === column);
        const maql = (_a = definition === null || definition === void 0 ? void 0 : definition.metricDefinition) === null || _a === void 0 ? void 0 : _a.expression;
        if (maql) {
            return { expression: maql };
        }
        return { uri: column };
    });
};
const isStoredItemDescription = (itemDescription) => {
    return !!itemDescription.uri;
};
const isAdHocItemDescription = (itemDescription) => {
    return !!itemDescription.expression;
};
/**
 * @internal
 */
export const unwrapItemDescriptionObject = (itemDescription) => {
    if (isStoredItemDescription(itemDescription)) {
        return itemDescription.uri;
    }
    if (isAdHocItemDescription(itemDescription)) {
        return itemDescription.expression;
    }
    throw new Error("Item description can only have expression or uri");
};
// When the limit is more than 2000,
// catalog items endpoint returns status of 500
const CATALOG_ITEMS_LIMIT = 1000;
export class CatalogueModule {
    constructor(xhr, execution) {
        this.xhr = xhr;
        this.execution = execution;
    }
    /**
     * Load all catalog items
     * @param projectId - string
     * @param options - ILoadCatalogItemsParams
     */
    async loadAllItems(projectId, options = {}) {
        const sanitizedOptions = omitEmpty(options);
        const loadAll = async (requestOptions, items = []) => {
            const result = await this.xhr.getParsed(`/gdc/internal/projects/${projectId}/catalog/items`, {
                data: requestOptions,
            });
            const resultItems = result.catalogItems.items;
            const updatedItems = [...items, ...resultItems];
            if (resultItems.length === requestOptions.limit) {
                const updatedRequestOptions = Object.assign(Object.assign({}, requestOptions), { offset: result.catalogItems.paging.offset + requestOptions.limit });
                return loadAll(updatedRequestOptions, updatedItems);
            }
            return updatedItems;
        };
        return loadAll(Object.assign({ offset: 0, limit: CATALOG_ITEMS_LIMIT }, sanitizedOptions));
    }
    /**
     * Load catalog groups
     * @param projectId - string
     * @param options - ILoadCatalogGroupsParams
     */
    async loadGroups(projectId, options = {}) {
        const result = await this.xhr.getParsed(`/gdc/internal/projects/${projectId}/catalog/groups`, {
            data: omitEmpty(options),
        });
        return result.catalogGroups;
    }
    /**
     * Load available item uris by already used uris and expressions
     * @param projectId - string
     * @param options - ILoadAvailableCatalogItemsParams
     */
    async loadAvailableItemUris(projectId, options) {
        const sanitizedCatalogQueryRequest = omitBy(options.catalogQueryRequest, isEmpty);
        const result = await this.xhr.postParsed(`/gdc/internal/projects/${projectId}/catalog/query`, {
            data: {
                catalogQueryRequest: sanitizedCatalogQueryRequest,
            },
        });
        return result.catalogAvailableItems.items;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    loadItems(projectId, options = {}) {
        var _a;
        const request = omit(Object.assign(Object.assign(Object.assign({}, REQUEST_DEFAULTS), options), getRequiredDataSets(options)), ["dataSetIdentifier", "returnAllDateDataSets", "attributesMap"]);
        const mdObj = (_a = cloneDeep(options)) === null || _a === void 0 ? void 0 : _a.bucketItems;
        const attributesMap = options === null || options === void 0 ? void 0 : options.attributesMap;
        const hasBuckets = (mdObj === null || mdObj === void 0 ? void 0 : mdObj.buckets) !== undefined;
        if (hasBuckets) {
            return this.loadItemDescriptionObjects(projectId, mdObj, attributesMap).then((descriptionObjects) => this.loadCatalog(projectId, Object.assign(Object.assign({}, request), { bucketItems: descriptionObjects.map(unwrapItemDescriptionObject) })));
        }
        return this.loadCatalog(projectId, request);
    }
    async loadDateDataSets(projectId, options) {
        const mdObj = cloneDeep(options).bucketItems;
        const descriptionObjects = mdObj
            ? await this.loadItemDescriptionObjects(projectId, mdObj, options.attributesMap)
            : undefined;
        const bucketItems = descriptionObjects === null || descriptionObjects === void 0 ? void 0 : descriptionObjects.map(unwrapItemDescriptionObject);
        const omittedOptions = [
            "filter",
            "types",
            "paging",
            "dataSetIdentifier",
            "returnAllDateDataSets",
            "returnAllRelatedDateDataSets",
            "attributesMap",
        ];
        // includeObjectsWithTags has higher priority than excludeObjectsWithTags,
        // so when present omit excludeObjectsWithTags
        if (options.includeObjectsWithTags) {
            omittedOptions.push("excludeObjectsWithTags");
        }
        const request = omit(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, LOAD_DATE_DATASET_DEFAULTS), REQUEST_DEFAULTS), options), getRequiredDataSets(options)), { bucketItems }), omittedOptions);
        return this.requestDateDataSets(projectId, request);
    }
    /**
     * Loads item description objects and returns them
     *
     * @internal
     *
     * @param projectId - id of the project to load from
     * @param mdObj - metadata object containing buckets, visualization class, properties etc.
     * @param attributesMap - contains map of attributes where the keys are the attributes display forms URIs
     * @param removeDateItems - whether to skip date items
     * @returns ItemDescription which is either `{ uri: string }` or `{ expression: string }`
     */
    async loadItemDescriptionObjects(projectId, mdObj, attributesMap = {}, removeDateItems = false) {
        const definitionsAndColumns = await this.execution.mdToExecutionDefinitionsAndColumns(projectId, mdObj, { attributesMap, removeDateItems });
        return buildItemDescriptionObjects(definitionsAndColumns);
    }
    /**
     * Loads all available data sets.
     * @param projectId - id of the project to load from
     */
    async loadDataSets(projectId) {
        const uri = `/gdc/dataload/internal/projects/${projectId}/csv/datasets`;
        const response = await this.xhr.getParsed(uri);
        return response.datasets.items;
    }
    requestDateDataSets(projectId, dateDataSetsRequest) {
        const uri = `/gdc/internal/projects/${projectId}/loadDateDataSets`;
        return this.xhr
            .postParsed(uri, { data: { dateDataSetsRequest } })
            .then((data) => data.dateDataSetsResponse);
    }
    loadCatalog(projectId, catalogRequest) {
        const uri = `/gdc/internal/projects/${projectId}/loadCatalog`;
        return this.xhr
            .post(uri, { data: { catalogRequest } })
            .then((r) => r.getData())
            .then((data) => data.catalogResponse);
    }
}
//# sourceMappingURL=catalogue.js.map