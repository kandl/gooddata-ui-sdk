import { IUserProjectsResponse, IProjectLcmIdentifiers, IProject, IGetUserListParams, IGetUserListResponse, IUserListItem, IAssociatedProjectPermissions, IGetUserGroupsParams, IGetUserGroupsResponse, IGetGranteesParams, IGetGranteesResponse } from "@gooddata/api-model-bear";
import { IColor, IColorPalette, IFeatureFlags, ITimezone } from "./interfaces.js";
import { ApiResponse, XhrModule } from "./xhr.js";
export declare const DEFAULT_PALETTE: {
    r: number;
    g: number;
    b: number;
}[];
export interface IProjectConfigSettingItem {
    settingItem: {
        key: string;
        links: {
            self: string;
        };
        source: string;
        value: string;
    };
}
export interface IProjectConfigResponse {
    settings: {
        items: IProjectConfigSettingItem[];
    };
}
/**
 * Functions for working with projects
 *
 */
export declare class ProjectModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * Get current project id
     *
     * @returns current project identifier
     */
    getCurrentProjectId(): Promise<string>;
    /**
     * Fetches project by its identifier.
     *
     * @param projectId - Project identifier
     * @returns Project
     */
    getProject(projectId: string): Promise<IProject>;
    /**
     * Fetches projects available for the user represented by the given profileId
     *
     * @param profileId - User profile identifier
     * @returns An Array of projects
     */
    getProjects(profileId: string): Promise<IProject[]>;
    /**
     * Fetches projects available for the user represented by the given profileId page by page.
     * @param userId - id of the user to get the projects for
     * @param offset - number of items to skip
     * @param limit - maximum items on page
     * @param search - search string that is matched to project title as a substring
     */
    getProjectsWithPaging(userId: string, offset: number, limit: number, search?: string): Promise<IUserProjectsResponse>;
    /**
     * Fetches all datasets for the given project
     *
     * @param projectId - GD project identifier
     * @returns An array of objects containing datasets metadata
     */
    getDatasets(projectId: string): Promise<any>;
    /**
     * Fetches a chart color palette for a project represented by the given
     * projectId parameter.
     *
     * @param projectId - A project identifier
     * @returns An array of objects with r, g, b fields representing a project's
     * color palette
     */
    getColorPalette(projectId: string): Promise<{
        r: number;
        g: number;
        b: number;
    }[] | {
        r: any;
        g: any;
        b: any;
    }[]>;
    /**
     * Fetches a chart color palette for a project represented by the given
     * projectId parameter.
     *
     * @param projectId - A project identifier
     * @returns An array of objects representing a project's
     * color palette with color guid or undefined
     */
    getColorPaletteWithGuids(projectId: string): Promise<IColorPalette | undefined>;
    /**
     * Sets given colors as a color palette for a given project.
     *
     * @param projectId - GD project identifier
     * @param colors - An array of colors that we want to use within the project.
     * Each color should be an object with r, g, b fields. // TODO really object?
     */
    setColorPalette(projectId: string, colors: IColor[]): Promise<ApiResponse>;
    /**
     * Gets current timezone and its offset.
     * @example
     *
     * Example output:
     *
     * ```
     * {
     *     id: 'Europe/Prague',
     *     displayName: 'Central European Time',
     *     currentOffsetMs: 3600000
     * }
     * ```
     *
     * @param projectId - GD project identifier
     */
    getTimezone(projectId: string): Promise<ITimezone>;
    setTimezone(projectId: string, timezone: ITimezone): Promise<any>;
    /**
     * Create project
     * Note: returns a promise which is resolved when the project creation is finished
     *
     * @experimental
     * @param title - title of the new project
     * @param authorizationToken - authorization token to use
     * @param options - for project creation (summary, projectTemplate, ...)
     * @returns created project object
     */
    createProject(title: string, authorizationToken: string, options?: any): Promise<any>;
    /**
     * Delete project
     *
     * @param projectId - projectId to delete
     */
    deleteProject(projectId: string): Promise<ApiResponse<any>>;
    /**
     * Gets aggregated feature flags for given project and current user
     *
     * @param projectId - A project identifier
     * @returns Hash table of feature flags and theirs values where feature flag is as key
     */
    getFeatureFlags(projectId: string): Promise<IFeatureFlags>;
    /**
     * Gets project config including project specific feature flags
     *
     * @param projectId - A project identifier
     * @returns An array of project config setting items
     */
    getConfig(projectId: string): Promise<IProjectConfigSettingItem[]>;
    /**
     * Gets project config including project specific feature flags
     *
     * @param projectId - A project identifier
     * @param key - config item key
     * @returns single setting item or undefined if item with such key does not exist
     */
    getConfigItem(projectId: string, key: string): Promise<IProjectConfigSettingItem | undefined>;
    /**
     * Gets project specific feature flags
     *
     * @param projectId - A project identifier
     * @param source - optional filter settingItems with specific source
     * @returns Hash table of feature flags and theirs values where feature flag is as key
     */
    getProjectFeatureFlags(projectId: string, source?: string): Promise<IFeatureFlags>;
    /**
     * Get paged user list
     *
     * @param projectId - project identifier
     * @param options - filtering options for the user list
     * @returns List of users with paging
     */
    getUserListWithPaging(projectId: string, options: IGetUserListParams): Promise<IGetUserListResponse>;
    /**
     * Get full user list
     *
     * @param projectId - project identifier
     * @param options - filtering options for the user list
     * @returns List of users
     */
    getUserList(projectId: string, options: Omit<IGetUserListParams, "offset" | "limit">): Promise<IUserListItem[]>;
    /**
     * Get paged user groups
     *
     * @param projectId - project identifier
     * @param options - paging params
     * @returns List of user groups with paging
     */
    getUserGroups(projectId: string, options: IGetUserGroupsParams): Promise<IGetUserGroupsResponse>;
    /**
     * Get info about all grantees able to access given object
     *
     * @param objectUri - object's uri
     * @param options - grantee limitations params
     * @returns List of all grantees
     */
    getGranteesInfo(objectUri: string, options: IGetGranteesParams): Promise<IGetGranteesResponse>;
    private convertGrantees;
    private handleGranteesChangeError;
    /**
     * Add grantees to access given object
     * @param objectUri - object's uri
     * @param granteeUris - grantees uri array
     */
    addGrantees(objectUri: string, granteeUris: string[]): Promise<any>;
    /**
     * Remove grantees access given object
     * @param objectUri - object's uri
     * @param granteeUris - grantees uri array
     */
    removeGrantees(objectUri: string, granteeUris?: string[]): Promise<any>;
    /**
     * Get permissions for the workspace and user
     * @param workspaceId - ID of the workspace
     * @param userId - ID of the user
     */
    getPermissions(workspaceId: string, userId: string): Promise<IAssociatedProjectPermissions>;
    /**
     * Resolves LCM workspace identifiers. This function will use the data product and client information
     * and consult the backend in order to obtain identifier of workspace contains analytics for that
     * data product & client combination.
     *
     * Domain parameter is required. Then either project ID or product ID and client ID pair must be provided.
     *
     * @param domainId - ID of the domain, must be provided
     * @param projectId - ID of the project. LCM identifiers will be fetched via project ID if the
     *  ID is provided.
     * @param productId - ID of the product. LCM identifiers will be provided by product ID and client ID
     *  pair, if project ID is not provided.
     * @param clientId - ID of the client. LCM identifiers will be provided by product ID and client ID pair,
     *  if project ID is not provided.
     *
     * @returns Resolves with project LCM identifiers.
     */
    getProjectLcmIdentifiers(domainId: string, projectId?: string, productId?: string, clientId?: string): Promise<IProjectLcmIdentifiers>;
    private extractIdFromUri;
}
//# sourceMappingURL=project.d.ts.map