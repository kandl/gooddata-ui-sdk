import { IVisualizationObjectContent } from "../visualizationObject/GdcVisualizationObject.js";
/**
 * @public
 */
export type CatalogItemType = "attribute" | "metric" | "fact" | "attributeHierarchy";
/**
 * @public
 */
export interface ICatalogGroup {
    readonly title: string;
    readonly identifier: string;
}
/**
 * @public
 */
export interface ICatalogItemBase {
    readonly type: CatalogItemType;
    readonly title: string;
    readonly identifier: string;
    readonly summary: string;
    readonly production: boolean;
    readonly groups?: string[];
    readonly links: {
        self: string;
    };
}
/**
 * @public
 */
export interface ICatalogAttribute extends ICatalogItemBase {
    readonly type: "attribute";
    readonly links: {
        readonly self: string;
        readonly defaultDisplayForm: string;
        readonly geoPinDisplayForms?: string[];
    };
}
/**
 * @public
 */
export declare function isCatalogAttribute(obj: unknown): obj is ICatalogAttribute;
/**
 * @public
 */
export interface ICatalogMetric extends ICatalogItemBase {
    readonly type: "metric";
    readonly expression: string;
    readonly format: string;
}
/**
 * @public
 */
export declare function isCatalogMetric(obj: unknown): obj is ICatalogMetric;
/**
 * @public
 */
export interface ICatalogFact extends ICatalogItemBase {
    readonly type: "fact";
}
/**
 * @public
 */
export declare function isCatalogFact(obj: unknown): obj is ICatalogFact;
/**
 * @public
 */
export type CatalogItem = ICatalogAttribute | ICatalogMetric | ICatalogFact;
/**
 * @public
 */
export interface IStoredItemDescription {
    uri: string;
}
/**
 * @public
 */
export interface IAdHocItemDescription {
    expression: string;
}
/**
 * @public
 */
export type ItemDescription = IStoredItemDescription | IAdHocItemDescription;
/**
 * @public
 */
export interface IColumnsAndDefinitions {
    columns: string[];
    definitions: Array<{
        metricDefinition: {
            identifier: string;
            uri: string;
        };
    }>;
}
/**
 * request params for GET /gdc/internal/projects/$\{projectId\}/catalog/items
 * @public
 */
export interface ILoadCatalogItemsParams {
    readonly types?: CatalogItemType[];
    readonly offset?: number;
    readonly limit?: number;
    readonly includeWithTags?: string[];
    readonly excludeWithTags?: string[];
    readonly production?: 1 | 0;
    readonly csvDataSets?: string[];
}
/**
 * response for GET /gdc/internal/projects/$\{projectId\}/catalog/items
 * @public
 */
export interface ILoadCatalogItemsResponse {
    catalogItems: {
        items: CatalogItem[];
        paging: {
            offset: number;
            limit: number;
        };
    };
}
/**
 * request params for GET /gdc/internal/projects/$\{projectId\}/catalog/groups
 * @public
 */
export interface ILoadCatalogGroupsParams {
    readonly includeWithTags?: string[];
    readonly excludeWithTags?: string[];
    readonly production?: 1 | 0;
    readonly csvDataSets?: string[];
}
/**
 * response for GET /gdc/internal/projects/$\{projectId\}/catalog/groups
 * @public
 */
export interface ILoadCatalogGroupsResponse {
    catalogGroups: ICatalogGroup[];
}
/**
 * request params for POST /gdc/internal/projects/$\{projectId\}/catalog/query
 * @public
 */
export interface ILoadAvailableCatalogItemsParams {
    catalogQueryRequest: {
        bucketItems: ItemDescription[];
        types?: CatalogItemType[];
    };
}
/**
 * response for POST /gdc/internal/projects/$\{projectId\}/catalog/query
 * @public
 */
export interface ILoadAvailableCatalogItemsResponse {
    catalogAvailableItems: {
        items: string[];
    };
}
/**
 * @public
 */
export interface ILoadDateDataSetsParams {
    bucketItems?: IVisualizationObjectContent;
    excludeObjectsWithTags?: string[];
    includeObjectsWithTags?: string[];
    dataSetIdentifier?: string;
    includeAvailableDateAttributes?: boolean;
    includeUnavailableDateDataSetsCount?: boolean;
    returnAllDateDataSets?: boolean;
    returnAllRelatedDateDataSets?: boolean;
    attributesMap?: Record<string, unknown>;
    includeDateGranularities?: string[];
}
//# sourceMappingURL=GdcCatalog.d.ts.map