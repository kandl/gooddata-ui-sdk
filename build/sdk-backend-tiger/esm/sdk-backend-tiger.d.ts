/**
 * This package provides the Analytical Backend implementation for GoodData Cloud and GoodData.CN.
 *
 * @remarks
 * You can use this package to communicate with GoodData Cloud and GoodData.CN in a convenient way without concerning yourself
 * with low-level details. The functionality includes but is not limited to:
 * getting and creating metadata objects, running executions, getting settings, getting available workspaces, and more.
 *
 * For similar package for the GoodData platform, see `@gooddata/sdk-backend-bear`.
 *
 * @packageDocumentation
 */

import { ActionsApiProcessInvitationRequest } from '@gooddata/api-client-tiger';
import { AnonymousAuthProvider } from '@gooddata/sdk-backend-base';
import { ApiEntitlement } from '@gooddata/api-client-tiger';
import { ApiEntitlementNameEnum } from '@gooddata/api-client-tiger';
import { AuthenticationFlow } from '@gooddata/sdk-backend-spi';
import { AxiosRequestConfig } from 'axios';
import { DataSourceParameter } from '@gooddata/api-client-tiger';
import { DeclarativeAnalytics } from '@gooddata/api-client-tiger';
import { DeclarativeModel } from '@gooddata/api-client-tiger';
import { DeclarativePdm } from '@gooddata/api-client-tiger';
import { DeclarativeTables } from '@gooddata/api-client-tiger';
import { DeclarativeWorkspaceDataFilters } from '@gooddata/api-client-tiger';
import { DependentEntitiesRequest } from '@gooddata/api-client-tiger';
import { DependentEntitiesResponse } from '@gooddata/api-client-tiger';
import { GenerateLdmRequest } from '@gooddata/api-client-tiger';
import { HierarchyObjectIdentification } from '@gooddata/api-client-tiger';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAnalyticalBackendConfig } from '@gooddata/sdk-backend-spi';
import { IAuthenticatedPrincipal } from '@gooddata/sdk-backend-spi';
import { IAuthenticationContext } from '@gooddata/sdk-backend-spi';
import { IAuthenticationProvider } from '@gooddata/sdk-backend-spi';
import { IdentifierDuplications } from '@gooddata/api-client-tiger';
import { ITigerClient } from '@gooddata/api-client-tiger';
import { IUser } from '@gooddata/sdk-model';
import { JsonApiAnalyticalDashboardOutMetaOrigin } from '@gooddata/api-client-tiger';
import { JsonApiDatasetOutList } from '@gooddata/api-client-tiger';
import { JsonApiDataSourceInAttributesTypeEnum } from '@gooddata/api-client-tiger';
import { JsonApiDataSourceInDocument } from '@gooddata/api-client-tiger';
import { JsonApiOrganizationOutMetaPermissionsEnum } from '@gooddata/api-client-tiger';
import { JsonApiWorkspaceInDocument } from '@gooddata/api-client-tiger';
import { LayoutApiPutWorkspaceLayoutRequest } from '@gooddata/api-client-tiger';
import { LayoutApiSetPdmLayoutRequest } from '@gooddata/api-client-tiger';
import { NotAuthenticated } from '@gooddata/sdk-backend-spi';
import { NotAuthenticatedHandler } from '@gooddata/sdk-backend-spi';
import { ObjectType } from '@gooddata/sdk-model';
import { PlatformUsage } from '@gooddata/api-client-tiger';
import { ScanSqlResponse } from '@gooddata/api-client-tiger';
import { TestDefinitionRequestTypeEnum } from '@gooddata/api-client-tiger';

export { AnonymousAuthProvider }

export { ApiEntitlement }

export { ApiEntitlementNameEnum }

/**
 * This implementation of authentication provider defers the responsibility for performing authentication
 * to the context in which it exists.
 *
 * @remarks
 * In other words it expects that the application will take care of driving
 * the authentication and creating a correct session in which the Tiger backend can make authenticated calls.
 *
 * This is a go-to authentication provider for UI applications. The entire flow is as follows:
 *
 * -  The application that uses backend configured with this provider must expect that some of the backend
 *    calls with result in NotAuthenticated exception.
 *
 * -  The exception will contain `loginUrl` set to the URL on the current origin - this is location of the login page.
 *
 * -  The application must redirect the entire window to this URL appended with `redirectTo` query parameter.
 *
 * -  The value of this parameter is the application's URL that will be used as a return location.
 *
 * -  The login page will start and drive the OIDC authentication flow. Once the flow finishes and session
 *    is set up, the login page will redirect back to the application.
 *
 * You may use the provider's ability to use passed `NotAuthenticatedHandler` function. This will be called
 * every time a NotAuthenticated error is raised by the backend. Your application can pass a custom handler of
 * this event - typically something that will start driving the authentication from a single place.
 *
 * Note: the not authenticated handler MAY be called many times in succession so you may want to wrap it in a
 * call guard or in a debounce.
 *
 * See {@link redirectToTigerAuthentication} for implementation of the NotAuthenticated handler which
 * you may use with this provider.
 * @public
 */
export declare class ContextDeferredAuthProvider extends TigerAuthProviderBase {
    private readonly notAuthenticatedHandler?;
    constructor(notAuthenticatedHandler?: NotAuthenticatedHandler | undefined);
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
}

/**
 * Given tiger backend, authentication flow details and current location, this function creates URL where the
 * browser should redirect to start authentication flow with correct return address.
 *
 * @remarks
 * The current location is essential to determine whether the return redirect should contain absolute or
 * related return path:
 *
 * -  When running on same origin, then use relative path
 *
 * -  When running on different origin, then use absolute path
 *
 * @param backend - an instance of analytical backend
 * @param authenticationFlow - details about the tiger authentication flow
 * @param location - current location
 * @public
 */
export declare function createTigerAuthenticationUrl(backend: IAnalyticalBackend, authenticationFlow: AuthenticationFlow, location: Location): string;

/**
 * @internal
 */
export declare type DataSourceDefinition = JsonApiDataSourceInDocument;

/**
 * @internal
 */
export declare type DeclarativeAnalyticsModel = DeclarativeAnalytics;

/**
 * @internal
 */
export declare type DeclarativeLogicalModel = DeclarativeModel;

export { DeclarativeModel }

export { DeclarativePdm }

/**
 * @internal
 */
export declare type DependentEntitiesGraphRequest = DependentEntitiesRequest;

/**
 * @internal
 */
export declare type DependentEntitiesGraphResponse = DependentEntitiesResponse;

/**
 * @internal
 */
export declare interface Entitlement {
    id: string;
    value?: string;
    expiry?: string;
}

export { GenerateLdmRequest }

/**
 * @internal
 */
export declare type GenerateLogicalModelRequest = GenerateLdmRequest;

/**
 * This method split id by Prefix separator (:) and return origin info
 *
 * @remarks
 * Id without prefix - LOCAL origin type with not origin id
 * Id with prefix - REMOTE origin type with origin id as first part of id (before :) and
 *  id as second part if id (after :)
 *
 * @param id - string that represent id with or without prefix
 * @internal
 */
export declare function getIdOrigin(id: string): OriginInfoWithId;

/**
 * @internal
 */
export declare interface IApiToken {
    id: string;
}

/**
 * @internal
 */
export declare interface IApiTokenExtended extends IApiToken {
    bearerToken: string | undefined;
}

/**
 * @internal
 */
export declare interface ICSPDirective {
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
export declare interface ICustomApplicationSetting {
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
 * Copy of interface from gooddata/data-source-management
 * This should be refactored to have the source of truth here in SDK and not expose JSON API entities
 *
 * @internal
 */
export declare interface IDataSource {
    entity: JsonApiDataSourceInDocument;
    pdm: DeclarativePdm;
}

/**
 *@internal
 */
export declare interface IDataSourceApiResult {
    data?: IDataSourceConnectionInfo;
    errorMessage?: string;
}

/**
 * @internal
 */
export declare interface IDataSourceConnectionInfo {
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
 * @internal
 */
export declare interface IDataSourceDeletedResponse {
    successful?: boolean;
    errorMessage?: string;
}

/**
 * @internal
 */
export declare interface IDataSourcePatchRequest {
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
export declare type IDataSourcePermission = "MANAGE" | "USE";

/**
 * @internal
 */
export declare interface IDataSourceTestConnectionRequest {
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
export declare interface IDataSourceTestConnectionResponse {
    successful: boolean;
    error?: string;
}

/**
 * @internal
 */
export declare type IDataSourceType = JsonApiDataSourceInAttributesTypeEnum;

/**
 * @internal
 */
export declare interface IDataSourceUpsertRequest {
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
export declare interface IInvitationUserResponse {
    successful?: boolean;
    errorMessage?: string;
}

/**
 * @alpha
 */
export declare const isTigerCompatibleType: (obj: unknown) => obj is TigerObjectType;

/**
 * @alpha
 */
export declare const isTigerType: (obj: unknown) => obj is TigerObjectType;

/**
 * Handler that will be called by a JWT authentication provider before the JWT
 * is about to expire. The handler will receive a method that can be used to set a new JWT value.
 *
 * The method throws an exception when the provided JWT is not for the same subject as the previously set
 * JWT (if such token was already set).
 *
 * @alpha
 */
export declare type JwtIsAboutToExpireHandler = (setJwt: SetJwtCallback) => void;

/**
 * @alpha
 */
export declare const objectTypeToTigerIdType: {
    measure: TigerObjectType;
    fact: TigerObjectType;
    attribute: TigerObjectType;
    displayForm: TigerObjectType;
    dataSet: TigerObjectType;
    insight: TigerObjectType;
    variable: TigerObjectType;
    analyticalDashboard: TigerObjectType;
    theme: TigerObjectType;
    colorPalette: TigerObjectType;
    filterContext: TigerObjectType;
    dashboardPlugin: TigerObjectType;
    attributeHierarchy: TigerObjectType;
};

/**
 * @internal
 */
export declare type OrganizationPermission = JsonApiOrganizationOutMetaPermissionsEnum;

/**
 * @internal
 */
export declare type OriginInfoWithId = JsonApiAnalyticalDashboardOutMetaOrigin & {
    id: string;
};

/**
 * @internal
 */
export declare type PhysicalDataModel = DeclarativePdm;

/**
 * @internal
 */
export declare interface PublishPdmResult {
    status: string;
}

/**
 * @internal
 */
export declare type PutWorkspaceLayoutRequest = LayoutApiPutWorkspaceLayoutRequest;

/**
 * Given authentication context and the authentication error, this implementation of `NotAuthenticatedHandler`
 * will redirect current window to location where Tiger authentication flow will start.
 *
 * @remarks
 * The location will be setup with correct return address so that when the flow finishes successfully, the
 * browser window will be redirected from whence it came.
 *
 * See also {@link createTigerAuthenticationUrl}; this function is used to construct the URL. You may use
 *  it when build your own handler.
 *
 * @param context - authentication context
 * @param error - not authenticated error, must contain the `authenticationFlow` information otherwise the
 *  handler just logs an error and does nothing
 * @public
 */
export declare function redirectToTigerAuthentication(context: IAuthenticationContext, error: NotAuthenticated): void;

/**
 * @internal
 */
export declare interface ScanRequest {
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
export declare interface ScanResult {
    pdm: DeclarativeTables;
}

/**
 * @internal
 */
export declare type ScanSqlResult = ScanSqlResponse;

/**
 * Callback that is used to set the new JWT value before original token expires.
 *
 * Optionally, the callback accepts the number of seconds before the token expiration in which
 * JwtIsAboutToExpireHandler will be called the next time. Expiration reminder will not be called
 * when value is not provided or it is not greater than zero.
 *
 * @alpha
 */
export declare type SetJwtCallback = (jwt: string, secondsBeforeTokenExpirationToCallReminder?: number) => void;

/**
 * @internal
 */
export declare type SetPdmLayoutRequest = LayoutApiSetPdmLayoutRequest;

/**
 * Tiger AFM types
 *
 * @public
 */
export declare type TigerAfmType = "label" | "metric" | "dataset" | "fact" | "attribute" | "prompt";

/**
 * Base for other IAuthenticationProvider implementations.
 *
 * @public
 */
export declare abstract class TigerAuthProviderBase implements IAuthenticationProvider {
    protected principal: IAuthenticatedPrincipal | undefined;
    abstract authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    deauthenticate(context: IAuthenticationContext): Promise<void>;
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    protected obtainCurrentPrincipal(context: IAuthenticationContext): Promise<void>;
    private loadProfile;
}

/**
 * @alpha
 */
export declare type TigerCompatibleObjectType = Exclude<ObjectType, "tag">;

/**
 * Returns function which creates instances of Analytical Backend implementation which works with the 'tiger'
 * version of the GoodData platform.
 *
 * @param config - analytical backend configuration, may be omitted and provided later
 * @param implConfig - tiger client specific configuration, may be omitted at this point but it cannot be provided later
 * @public
 */
declare function tigerFactory(config?: IAnalyticalBackendConfig, implConfig?: any): IAnalyticalBackend;
export default tigerFactory;

/**
 * @alpha
 */
export declare const tigerIdTypeToObjectType: {
    [tigerType in TigerObjectType]: TigerCompatibleObjectType;
};

/**
 * The implementation of authentication provider uses an JWT (JSON Web Token) as bearer of authentication.
 *
 * @remarks
 * You can provide token at construction time, and it will be passed on all calls to Tiger APIs.
 *
 * Keep in mind that this authentication provider can lead to security holes; having
 * the token available as JavaScript variable in an UI application means anyone can find it and use it for
 * themselves while the token is valid. UI applications should prefer {@link ContextDeferredAuthProvider}
 * instead.
 *
 * @alpha
 */
export declare class TigerJwtAuthProvider extends TigerTokenAuthProvider {
    private jwt;
    private readonly tokenIsAboutToExpireHandler?;
    private secondsBeforeTokenExpirationToCallReminder;
    private expirationReminderId;
    /**
     * Create a new instance of TigerJwtAuthProvider
     *
     * @param jwt - The JSON Web Token value.
     * @param notAuthenticatedHandler - Optional handler called when auth provider encounters
     *  "non-authenticated" error (for example when session is no longer valid due to expired JWT).
     * @param tokenIsAboutToExpireHandler - Optional handler called when JWT is about to expire. The handler
     *  will receive function that can be used to set the new JWT to continue the current session.
     * @param secondsBeforeTokenExpirationToCallReminder - The number of seconds before token expiration to
     *  call tokenIsAboutToExpireHandler handler. The handler is called only when the value is positive number
     *  greater than zero and tokenIsAboutToExpireHandler handler value is provided.
     */
    constructor(jwt: string, notAuthenticatedHandler?: NotAuthenticatedHandler, tokenIsAboutToExpireHandler?: JwtIsAboutToExpireHandler | undefined, secondsBeforeTokenExpirationToCallReminder?: number);
    initializeClient(client: ITigerClient): void;
    /**
     * Update JWT value of the API client
     *
     * @param jwt - new JWT value
     * will receive function that can be used to set the new JWT to continue the current session.
     * @param secondsBeforeTokenExpirationToCallReminder - The number of seconds before token expiration to
     *  call tokenIsAboutToExpireHandler handler. The handler is called only when the value is positive number
     *  greater than zero and tokenIsAboutToExpireHandler handler value was provided during provider
     *  construction.
     *
     * @throws error is thrown when the method is called before client was initialized, if JWT is empty,
     *  or if JWT is not valid (if "sub" claim does not match the sub of the previous JWT).
     */
    updateJwt: (jwt: string, secondsBeforeTokenExpirationToCallReminder?: number) => void;
    private startReminder;
}

/**
 * Tiger metadata types
 *
 * @public
 */
export declare type TigerMetadataType = "analyticalDashboard" | "visualizationObject" | "filterContext" | "dashboardPlugin";

/**
 * Tiger entity types
 *
 * @public
 */
export declare type TigerObjectType = TigerAfmType | TigerMetadataType;

/**
 * TigerBackend-specific functions.
 * If possible, avoid these functions, they are here for specific use cases.
 *
 * Do not use parameters or return values from \@gooddata/api-client-tiger.
 *
 * @internal
 */
export declare type TigerSpecificFunctions = {
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

/**
 * This implementation of authentication provider uses an API Token as bearer of authentication.
 *
 * @remarks
 * You can provide token at construction time and it will be passed on all calls to Tiger APIs
 *
 * This is a go-to authentication provider for command-line applications. While nothing stops you from using
 * this provider in UI applications, keep in mind that this is discouraged due to security holes it leads to; having
 * the token hardcoded in a UI application means anyone can find it and use it for themselves.
 *
 * @public
 */
export declare class TigerTokenAuthProvider extends TigerAuthProviderBase {
    private apiToken;
    private readonly notAuthenticatedHandler?;
    private clients;
    constructor(apiToken: string, notAuthenticatedHandler?: NotAuthenticatedHandler | undefined);
    initializeClient(client: ITigerClient): void;
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    updateApiToken: (apiToken: string) => void;
}

/**
 * @internal
 */
export declare type WorkspaceDataFiltersLayout = DeclarativeWorkspaceDataFilters;

/**
 * @internal
 */
export declare type WorkspaceDefinition = JsonApiWorkspaceInDocument;

/**
 * @internal
 */
export declare type WorkspaceEntitiesDatasets = JsonApiDatasetOutList;

export { }
