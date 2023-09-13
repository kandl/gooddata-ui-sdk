import { AxiosPromise, AxiosRequestConfig } from "axios";
import { ITigerClient } from "./client.js";
import { JsonApiUserOutList, JsonApiUserGroupOutList, JsonApiWorkspaceOutList, JsonApiDataSourceIdentifierOutList, EntitiesApiGetAllEntitiesWorkspacesRequest, EntitiesApiGetAllEntitiesAttributesRequest, EntitiesApiGetAllEntitiesFactsRequest, EntitiesApiGetAllEntitiesMetricsRequest, EntitiesApiGetAllEntitiesDashboardPluginsRequest, EntitiesApiGetAllEntitiesVisualizationObjectsRequest, EntitiesApiGetAllEntitiesAnalyticalDashboardsRequest } from "./generated/metadata-json-api/index.js";
/**
 * All possible responses of API client getEntities* functions which support `included` field
 *
 * @internal
 */
export type OrganizationGetEntitiesSupportingIncludedResult = JsonApiUserOutList | JsonApiUserGroupOutList | JsonApiWorkspaceOutList;
/**
 * All possible responses of API client getEntities* functions.
 *
 * @internal
 */
export type OrganizationGetEntitiesResult = JsonApiDataSourceIdentifierOutList | OrganizationGetEntitiesSupportingIncludedResult;
/**
 * All possible params of API client getEntities* functions.
 *
 * @internal
 */
export type OrganizationGetEntitiesParams = EntitiesApiGetAllEntitiesAttributesRequest | EntitiesApiGetAllEntitiesFactsRequest | EntitiesApiGetAllEntitiesAnalyticalDashboardsRequest | EntitiesApiGetAllEntitiesDashboardPluginsRequest | EntitiesApiGetAllEntitiesVisualizationObjectsRequest | EntitiesApiGetAllEntitiesMetricsRequest | EntitiesApiGetAllEntitiesWorkspacesRequest;
/**
 * All API client getEntities* functions follow this signature.
 *
 * @internal
 */
export type OrganizationGetEntitiesFn<T extends OrganizationGetEntitiesResult, P extends OrganizationGetEntitiesParams> = (params: P, options: AxiosRequestConfig) => AxiosPromise<T>;
/**
 * Tiger organization utility functions
 *
 * @internal
 */
export declare class OrganizationUtilities {
    /**
     * Guard for recognizing entities which support `included` field.
     * @internal
     */
    private static supportsIncluded;
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
    static getAllPagesOf: <T extends OrganizationGetEntitiesResult, P extends OrganizationGetEntitiesParams>(client: ITigerClient, entitiesGet: OrganizationGetEntitiesFn<T, P>, params: P, options?: AxiosRequestConfig) => Promise<T[]>;
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
    static mergeEntitiesResults<T extends OrganizationGetEntitiesResult>(pages: T[]): T;
}
//# sourceMappingURL=organizationUtilities.d.ts.map