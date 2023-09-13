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
import { IAnalyticalBackendConfig, IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
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
export { AnonymousAuthProvider } from "@gooddata/sdk-backend-base";
export { DeclarativeModel, GenerateLdmRequest, DeclarativePdm, ApiEntitlement, ApiEntitlementNameEnum, } from "@gooddata/api-client-tiger";
export { ContextDeferredAuthProvider, TigerTokenAuthProvider, SetJwtCallback, JwtIsAboutToExpireHandler, TigerJwtAuthProvider, TigerAuthProviderBase, createTigerAuthenticationUrl, redirectToTigerAuthentication, } from "./auth.js";
export { TigerSpecificFunctions, IApiToken, IApiTokenExtended, IDataSource, ScanRequest, ScanResult, PublishPdmResult, Entitlement, IDataSourceApiResult, IDataSourceUpsertRequest, IDataSourceTestConnectionRequest, IDataSourceTestConnectionResponse, IDataSourceConnectionInfo, IDataSourceType, IDataSourcePermission, IDataSourcePatchRequest, OrganizationPermission, GenerateLogicalModelRequest, DeclarativeLogicalModel, DeclarativeAnalyticsModel, PhysicalDataModel, SetPdmLayoutRequest, PutWorkspaceLayoutRequest, DataSourceDefinition, IDataSourceDeletedResponse, IInvitationUserResponse, WorkspaceDefinition, DependentEntitiesGraphRequest, DependentEntitiesGraphResponse, WorkspaceDataFiltersLayout, ICSPDirective, ICustomApplicationSetting, ScanSqlResult, WorkspaceEntitiesDatasets, } from "./backend/tigerSpecificFunctions.js";
export { TigerAfmType, TigerMetadataType, TigerObjectType } from "./types/index.js";
export { isTigerType, isTigerCompatibleType, tigerIdTypeToObjectType, objectTypeToTigerIdType, TigerCompatibleObjectType, } from "./types/refTypeMapping.js";
export { getIdOrigin, OriginInfoWithId } from "./convertors/fromBackend/ObjectInheritance.js";
//# sourceMappingURL=index.d.ts.map