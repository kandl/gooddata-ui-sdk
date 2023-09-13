import { AxiosPromise } from "axios";
import { ITigerClient } from "./client.js";
import { JsonApiAnalyticalDashboardOutList, JsonApiApiTokenOutList, JsonApiAttributeOutList, JsonApiDashboardPluginOutList, JsonApiDatasetOutList, JsonApiFactOutList, JsonApiFilterContextOutList, JsonApiLabelOutList, JsonApiMetricOutList, JsonApiThemeOutList, JsonApiColorPaletteOutList, JsonApiVisualizationObjectOutList } from "./generated/metadata-json-api/index.js";
/**
 * Workspace get entities params
 *
 * @internal
 */
export type MetadataGetEntitiesWorkspaceParams = {
    workspaceId: string;
    filter?: string;
};
/**
 * User get entities params
 *
 * @internal
 */
export type MetadataGetEntitiesUserParams = {
    userId: string;
    filter?: string;
};
/**
 * Theme get entities params
 *
 * @internal
 */
export type MetadataGetEntitiesThemeParams = {
    filter?: string;
};
/**
 * Color palette get entities params
 *
 * @internal
 */
export type MetadataGetEntitiesColorPaletteParams = {
    filter?: string;
};
/**
 * Common parameters for all API client getEntities* parameters.
 *
 * Note: the different generated client functions are actually incorrect. They list page, size, include, sort in
 * the params, but they are not picked from there anyway. They need to be passed in options as query parameters.
 *
 * @internal
 */
export type MetadataGetEntitiesParams = MetadataGetEntitiesWorkspaceParams | MetadataGetEntitiesUserParams | MetadataGetEntitiesThemeParams | MetadataGetEntitiesColorPaletteParams;
/**
 * Common parameters for all API client getEntities* parameters.
 *
 * @internal
 */
export type MetadataGetEntitiesOptions = {
    headers?: object;
    params?: {
        page?: number;
        size?: number;
        include?: any;
        sort?: any;
        tags?: any;
    };
};
/**
 * All possible responses of API client getEntities* functions.
 *
 * @internal
 */
export type MetadataGetEntitiesResult = JsonApiVisualizationObjectOutList | JsonApiAnalyticalDashboardOutList | JsonApiDashboardPluginOutList | JsonApiDatasetOutList | JsonApiAttributeOutList | JsonApiLabelOutList | JsonApiMetricOutList | JsonApiFactOutList | JsonApiFilterContextOutList | JsonApiApiTokenOutList | JsonApiThemeOutList | JsonApiColorPaletteOutList;
/**
 * All API client getEntities* functions follow this signature.
 *
 * @internal
 */
export type MetadataGetEntitiesFn<T extends MetadataGetEntitiesResult, P extends MetadataGetEntitiesParams> = (params: P, options: MetadataGetEntitiesOptions) => AxiosPromise<T>;
/**
 * Tiger metadata utility functions
 *
 * @internal
 */
export declare class MetadataUtilities {
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
    static getAllPagesOf: <T extends MetadataGetEntitiesResult, P extends MetadataGetEntitiesParams>(client: ITigerClient, entitiesGet: MetadataGetEntitiesFn<T, P>, params: P, options?: MetadataGetEntitiesOptions) => Promise<T[]>;
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
    static mergeEntitiesResults<T extends MetadataGetEntitiesResult>(pages: T[]): T;
    /**
     * Given list of JSON API entities, return those which have not broken relations to other MD objects. This
     * info is computed by backend when "X-GDC-VALIDATE-RELATIONS" is sent with the GET request. Note that backend
     * checks the relations recursively.
     *
     * @param result - MetadataGetEntitiesResult
     */
    static filterValidEntities<T extends MetadataGetEntitiesResult>(result: T): T;
}
//# sourceMappingURL=metadataUtilities.d.ts.map