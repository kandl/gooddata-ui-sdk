import { JsonApiOrganizationOutMetaPermissionsEnum, GenerateLdmRequest, DeclarativeModel, DeclarativePdm, JsonApiDataSourceInDocument, LayoutApiSetPdmLayoutRequest, LayoutApiPutWorkspaceLayoutRequest, ITigerClient, JsonApiDataSourceInAttributesTypeEnum, TestDefinitionRequestTypeEnum, DeclarativeTables, DeclarativeAnalytics, JsonApiWorkspaceInDocument, DependentEntitiesRequest, DependentEntitiesResponse, ApiEntitlement, ActionsApiProcessInvitationRequest, PlatformUsage, DeclarativeWorkspaceDataFilters, DataSourceParameter, ScanSqlResponse, HierarchyObjectIdentification, IdentifierDuplications, JsonApiDatasetOutList } from "@gooddata/api-client-tiger";
import { ErrorConverter, IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { AuthenticatedAsyncCall } from "@gooddata/sdk-backend-base";
import { AxiosRequestConfig } from "axios";
import { IUser } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IApiToken {
    id: string;
}
/**
 * @internal
 */
export interface IApiTokenExtended extends IApiToken {
    bearerToken: string | undefined;
}
/**
 * Copy of interface from gooddata/data-source-management
 * This should be refactored to have the source of truth here in SDK and not expose JSON API entities
 *
 * @internal
 */
export interface IDataSource {
    entity: JsonApiDataSourceInDocument;
    pdm: DeclarativePdm;
}
/**
 * @internal
 */
export interface ScanRequest {
    scanTables: boolean;
    scanViews: boolean;
    separator: string;
    tablePrefix: string;
    viewPrefix: string;
    schemata: string[];
}
/**
 * @internal
 */
export interface ScanResult {
    pdm: DeclarativeTables;
}
/**
 * @internal
 */
export interface PublishPdmResult {
    status: string;
}
/**
 * @internal
 */
export interface Entitlement {
    id: string;
    value?: string;
    expiry?: string;
}
/**
 * @internal
 */
export type IDataSourceType = JsonApiDataSourceInAttributesTypeEnum;
/**
 * @internal
 */
export type IDataSourcePermission = "MANAGE" | "USE";
/**
 * @internal
 */
export interface IDataSourceConnectionInfo {
    id: string;
    type: IDataSourceType;
    name: string;
    schema: string;
    username?: string;
    url?: string;
    permissions?: IDataSourcePermission[];
    parameters?: Array<DataSourceParameter>;
    decodedParameters?: Array<DataSourceParameter>;
}
/**
 *@internal
 */
export interface IDataSourceApiResult {
    data?: IDataSourceConnectionInfo;
    errorMessage?: string;
}
/**
 * @internal
 */
export interface IDataSourceUpsertRequest {
    id: string;
    name: string;
    password?: string;
    schema: string;
    token?: string;
    type: IDataSourceType;
    url?: string;
    username?: string;
    parameters?: Array<DataSourceParameter>;
}
/**
 * @internal
 */
export interface IDataSourcePatchRequest {
    id: string;
    name?: string;
    password?: string;
    schema?: string;
    token?: string;
    type?: IDataSourceType;
    url?: string;
    username?: string;
    parameters?: Array<DataSourceParameter>;
}
/**
 * @internal
 */
export interface IDataSourceTestConnectionRequest {
    password?: string;
    schema: string;
    token?: string;
    type: TestDefinitionRequestTypeEnum;
    url: string;
    username?: string;
    parameters?: Array<DataSourceParameter>;
}
/**
 * @internal
 */
export interface IDataSourceTestConnectionResponse {
    successful: boolean;
    error?: string;
}
/**
 * @internal
 */
export interface IDataSourceDeletedResponse {
    successful?: boolean;
    errorMessage?: string;
}
/**
 * @internal
 */
export interface IInvitationUserResponse {
    successful?: boolean;
    errorMessage?: string;
}
/**
 * @internal
 */
export interface ICSPDirective {
    id: string;
    attributes: {
        /**
         * Representation values of the CSP directive entity.
         * Ex: http://a.com, *.abc.com, 'self', ..
         */
        sources: Array<string>;
    };
}
/**
 * @internal
 */
export interface ICustomApplicationSetting {
    id: string;
    /**
     * Name of the application the setting is applied.
     * Ex: ldmModeler
     */
    applicationName: string;
    /**
     * Representation values of the setting.
     * Ex: Layout setting of ldmModeler:  \{ "layout" : []\}
     */
    content: {
        [key: string]: any;
    };
}
/**
 * @internal
 */
export type OrganizationPermission = JsonApiOrganizationOutMetaPermissionsEnum;
/**
 * @internal
 */
export type GenerateLogicalModelRequest = GenerateLdmRequest;
/**
 * @internal
 */
export type DeclarativeLogicalModel = DeclarativeModel;
/**
 * @internal
 */
export type DeclarativeAnalyticsModel = DeclarativeAnalytics;
/**
 * @internal
 */
export type PhysicalDataModel = DeclarativePdm;
/**
 * @internal
 */
export type SetPdmLayoutRequest = LayoutApiSetPdmLayoutRequest;
/**
 * @internal
 */
export type PutWorkspaceLayoutRequest = LayoutApiPutWorkspaceLayoutRequest;
/**
 * @internal
 */
export type DataSourceDefinition = JsonApiDataSourceInDocument;
/**
 * @internal
 */
export type WorkspaceDefinition = JsonApiWorkspaceInDocument;
/**
 * @internal
 */
export type DependentEntitiesGraphRequest = DependentEntitiesRequest;
/**
 * @internal
 */
export type DependentEntitiesGraphResponse = DependentEntitiesResponse;
/**
 * @internal
 */
export type WorkspaceDataFiltersLayout = DeclarativeWorkspaceDataFilters;
/**
 * @internal
 */
export type ScanSqlResult = ScanSqlResponse;
/**
 * @internal
 */
export type WorkspaceEntitiesDatasets = JsonApiDatasetOutList;
/**
 * TigerBackend-specific functions.
 * If possible, avoid these functions, they are here for specific use cases.
 *
 * Do not use parameters or return values from \@gooddata/api-client-tiger.
 *
 * @internal
 */
export type TigerSpecificFunctions = {
    isCommunityEdition?: () => Promise<boolean>;
    isOrganizationAdmin?: () => Promise<boolean>;
    organizationExpiredDate?: () => Promise<string>;
    getOrganizationAllowedOrigins?: (organizationId: string) => Promise<string[]>;
    getOrganizationPermissions?: (organizationId: string) => Promise<Array<OrganizationPermission>>;
    updateOrganizationAllowedOrigins?: (organizationId: string, updatedOrigins: string[]) => Promise<string[]>;
    getDeploymentVersion?: () => Promise<string>;
    getAllApiTokens?: (userId: string) => Promise<IApiToken[]>;
    generateApiToken?: (userId: string, tokenId: string) => Promise<IApiTokenExtended | undefined>;
    deleteApiToken?: (userId: string, tokenId: string) => Promise<void>;
    someDataSourcesExists?: (filter?: string) => Promise<boolean>;
    generateLogicalModel?: (dataSourceId: string, generateLogicalModelRequest: GenerateLogicalModelRequest) => Promise<DeclarativeLogicalModel>;
    scanDataSource?: (dataSourceId: string, scanRequest: ScanRequest) => Promise<ScanResult>;
    publishPdm?: (dataSourceId: string, declarativePdm: PhysicalDataModel) => Promise<PublishPdmResult>;
    createDemoWorkspace?: (sampleWorkspace: WorkspaceDefinition) => Promise<string>;
    createDemoDataSource?: (sampleDataSource: DataSourceDefinition) => Promise<string>;
    setPdmLayout?: (requestParameters: SetPdmLayoutRequest) => Promise<void>;
    createWorkspace?: (id: string, name: string) => Promise<string>;
    updateWorkspaceTitle?: (id: string, name: string) => Promise<void>;
    deleteWorkspace?: (id: string) => Promise<void>;
    canDeleteWorkspace?: (id: string) => Promise<boolean>;
    getWorkspaceLogicalModel?: (id: string, includeParents?: boolean) => Promise<DeclarativeLogicalModel>;
    getWorkspaceEntitiesDatasets?: (id: string) => Promise<WorkspaceEntitiesDatasets>;
    getEntitlements?: () => Promise<Array<Entitlement>>;
    putWorkspaceLayout?: (requestParameters: PutWorkspaceLayoutRequest) => Promise<void>;
    getAllDataSources?: () => Promise<IDataSourceConnectionInfo[]>;
    getDataSourceById?: (id: string) => Promise<IDataSourceApiResult>;
    getDataSourceIdentifierById?: (id: string) => Promise<IDataSourceApiResult>;
    createDataSource?: (requestData: IDataSourceUpsertRequest) => Promise<IDataSourceApiResult>;
    updateDataSource?: (id: string, requestData: IDataSourceUpsertRequest) => Promise<IDataSourceApiResult>;
    patchDataSource?: (id: string, requestData: IDataSourcePatchRequest) => Promise<IDataSourceApiResult>;
    deleteDataSource?: (id: string) => Promise<IDataSourceDeletedResponse>;
    testDataSourceConnection?: (connectionData: IDataSourceTestConnectionRequest, id?: string) => Promise<IDataSourceTestConnectionResponse>;
    publishLogicalModel?: (workspaceId: string, declarativeModel: DeclarativeLogicalModel) => Promise<void>;
    getDataSourceSchemata?: (dataSourceId: string) => Promise<string[]>;
    getPdm?: (dataSourceId: string) => Promise<PhysicalDataModel>;
    getDependentEntitiesGraph?: (workspaceId: string) => Promise<DependentEntitiesGraphResponse>;
    getDependentEntitiesGraphFromEntryPoints?: (workspaceId: string, dependentEntitiesGraphRequest: DependentEntitiesGraphRequest) => Promise<DependentEntitiesGraphResponse>;
    resolveAllEntitlements?: () => Promise<ApiEntitlement[]>;
    getAllPlatformUsage?: () => Promise<PlatformUsage[]>;
    inviteUser?: (requestParameters: ActionsApiProcessInvitationRequest, options?: AxiosRequestConfig) => Promise<IInvitationUserResponse>;
    getWorkspaceDataFiltersLayout?: () => Promise<WorkspaceDataFiltersLayout>;
    setWorkspaceDataFiltersLayout?: (workspaceDataFiltersLayout: WorkspaceDataFiltersLayout) => Promise<void>;
    getAllCSPDirectives?: () => Promise<Array<ICSPDirective>>;
    getCSPDirective?: (directiveId: string) => Promise<ICSPDirective>;
    createCSPDirective?: (requestData: ICSPDirective) => Promise<ICSPDirective>;
    updateCSPDirective?: (directiveId: string, requestData: ICSPDirective) => Promise<ICSPDirective>;
    deleteCSPDirective?: (directiveId: string) => Promise<void>;
    registerUploadNotification?: (dataSourceId: string) => Promise<void>;
    /**
     * Return all custom setting of a workspace.
     *
     * @param workspaceId - id of the workspace
     * @param applicationName - name of the appliation the setting was set for - ex: ldmModeler
     * @returns ICustomApplicationSetting[]
     *
     */
    getWorkspaceCustomAppSettings?: (workspaceId: string, applicationName?: string) => Promise<ICustomApplicationSetting[]>;
    /**
     * Return all custom setting of a workspace.
     *
     * @param workspaceId - id of the workspace
     * @param settingId - id of the custom setting
     * @returns ICustomApplicationSetting
     *
     */
    getWorkspaceCustomAppSetting?: (workspaceId: string, settingId: string) => Promise<ICustomApplicationSetting>;
    /**
     * Create a custom setting of a for a workspace.
     *
     * @param workspaceId - id of the workspace
     * @param applicationName - name of the appliation the setting was set for - ex: ldmModeler
     * @param content - setting data - json object
     * @example : \{"layout" : []\}
     * @param settingId - id of the custom setting, generated if not provided
     * @returns ICustomApplicationSetting
     *
     */
    createWorkspaceCustomAppSetting?: (workspaceId: string, applicationName: string, content: object, settingId?: string) => Promise<ICustomApplicationSetting>;
    /**
     * Delete a custom setting by workspace id and setting id.
     *
     * @param workspaceId - id of the workspace
     * @param settingId - id of the custom setting that should be deleted
     */
    deleteWorkspaceCustomAppSetting?: (workspaceId: string, settingId: string) => Promise<void>;
    /**
     * Get the User Entity data
     *
     * @param id - id of the current userId
     * @returns IUser
     *
     */
    getEntityUser?: (id: string) => Promise<IUser>;
    /**
     * Get metadata about SQL query
     *
     * @param dataSourceId - id of the datasource
     * @param sql - SQL query to be analyzed
     * @returns ScanSqlResult -
     *
     */
    scanSql?: (dataSourceId: string, sql: string) => Promise<ScanSqlResult>;
    /**
     * Check if entities are not overrides by entities from parents workspaces
     * @param entities - All i and types for check
     * @returns IdentifierDuplications[]
     */
    checkEntityOverrides?: (workspaceId: string, entities: Array<HierarchyObjectIdentification>) => Promise<Array<IdentifierDuplications>>;
};
export declare const buildTigerSpecificFunctions: (backend: IAnalyticalBackend, authApiCall: <T>(call: AuthenticatedAsyncCall<ITigerClient, T>, errorConverter?: ErrorConverter) => Promise<T>) => TigerSpecificFunctions;
//# sourceMappingURL=tigerSpecificFunctions.d.ts.map