/**
 * This package provides definitions of the Service Provider Interface (SPI) for the Analytical Backend.
 *
 * @remarks
 * The interface defines functionality to be implemented for a particular backend to be used in GoodData.UI.
 * The Analytical Backend SPI for the GoodData platform (codename `bear` in `@gooddata/sdk-backend-bear`) is fully implemented.
 * The Analytical Backend SPI for GoodData Cloud and GoodData.CN (joint codename `tiger` in `@gooddata/sdk-backend-tiger`) is almost fully implemented.
 *
 * @packageDocumentation
 */

import { AccessGranteeDetail } from '@gooddata/sdk-model';
import { CatalogItem } from '@gooddata/sdk-model';
import { CatalogItemType } from '@gooddata/sdk-model';
import { DataValue } from '@gooddata/sdk-model';
import { DimensionGenerator } from '@gooddata/sdk-model';
import { FilterContextItem } from '@gooddata/sdk-model';
import { IAccessGrantee } from '@gooddata/sdk-model';
import { IAttributeDisplayFormMetadataObject } from '@gooddata/sdk-model';
import { IAttributeElement } from '@gooddata/sdk-model';
import { IAttributeFilter } from '@gooddata/sdk-model';
import { IAttributeMetadataObject } from '@gooddata/sdk-model';
import { IAttributeOrMeasure } from '@gooddata/sdk-model';
import { IAvailableAccessGrantee } from '@gooddata/sdk-model';
import { IBucket } from '@gooddata/sdk-model';
import { ICatalogAttribute } from '@gooddata/sdk-model';
import { ICatalogAttributeHierarchy } from '@gooddata/sdk-model';
import { ICatalogDateDataset } from '@gooddata/sdk-model';
import { ICatalogFact } from '@gooddata/sdk-model';
import { ICatalogGroup } from '@gooddata/sdk-model';
import { ICatalogMeasure } from '@gooddata/sdk-model';
import { IColorPalette } from '@gooddata/sdk-model';
import { IColorPaletteDefinition } from '@gooddata/sdk-model';
import { IColorPaletteMetadataObject } from '@gooddata/sdk-model';
import { IDashboard } from '@gooddata/sdk-model';
import { IDashboardDefinition } from '@gooddata/sdk-model';
import { IDashboardLayout } from '@gooddata/sdk-model';
import { IDashboardLayoutItem } from '@gooddata/sdk-model';
import { IDashboardLayoutSection } from '@gooddata/sdk-model';
import { IDashboardPermissions } from '@gooddata/sdk-model';
import { IDashboardPlugin } from '@gooddata/sdk-model';
import { IDashboardPluginDefinition } from '@gooddata/sdk-model';
import { IDashboardWidget } from '@gooddata/sdk-model';
import { IDataset } from '@gooddata/sdk-model';
import { IDateFilterConfig } from '@gooddata/sdk-model';
import { IDimension } from '@gooddata/sdk-model';
import { IDimensionDescriptor } from '@gooddata/sdk-model';
import { IEntitlementDescriptor } from '@gooddata/sdk-model';
import { IExecutionConfig } from '@gooddata/sdk-model';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IExistingDashboard } from '@gooddata/sdk-model';
import { IFilter } from '@gooddata/sdk-model';
import { IFilterContextDefinition } from '@gooddata/sdk-model';
import { IGranularAccessGrantee } from '@gooddata/sdk-model';
import { IInsight } from '@gooddata/sdk-model';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { IListedDashboard } from '@gooddata/sdk-model';
import { IMeasure } from '@gooddata/sdk-model';
import { IMeasureMetadataObject } from '@gooddata/sdk-model';
import { IMeasureMetadataObjectDefinition } from '@gooddata/sdk-model';
import { IMetadataObject } from '@gooddata/sdk-model';
import { INullableFilter } from '@gooddata/sdk-model';
import { IOrganizationDescriptor } from '@gooddata/sdk-model';
import { IRelativeDateFilter } from '@gooddata/sdk-model';
import { IResultHeader } from '@gooddata/sdk-model';
import { IResultWarning } from '@gooddata/sdk-model';
import { IScheduledMail } from '@gooddata/sdk-model';
import { IScheduledMailDefinition } from '@gooddata/sdk-model';
import { ISeparators } from '@gooddata/sdk-model';
import { ISettings } from '@gooddata/sdk-model';
import { ISortItem } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { IThemeDefinition } from '@gooddata/sdk-model';
import { IThemeMetadataObject } from '@gooddata/sdk-model';
import { IUser } from '@gooddata/sdk-model';
import { IVisualizationClass } from '@gooddata/sdk-model';
import { IWhiteLabeling } from '@gooddata/sdk-model';
import { IWidget } from '@gooddata/sdk-model';
import { IWidgetAlert } from '@gooddata/sdk-model';
import { IWidgetAlertDefinition } from '@gooddata/sdk-model';
import { IWidgetDefinition } from '@gooddata/sdk-model';
import { IWorkspacePermissions } from '@gooddata/sdk-model';
import { IWorkspaceUser } from '@gooddata/sdk-model';
import { IWorkspaceUserGroup } from '@gooddata/sdk-model';
import { ObjectType } from '@gooddata/sdk-model';
import { ObjRef } from '@gooddata/sdk-model';
import { SortDirection } from '@gooddata/sdk-model';

/**
 * Superclass for all exceptions that can occur in Analytical Backend.
 *
 * @public
 */
export declare abstract class AnalyticalBackendError extends Error {
    readonly abeType: string;
    readonly cause?: Error | undefined;
    protected constructor(message: string, abeType: string, cause?: Error | undefined);
}

/**
 * Types of errors that can be raised by Analytical Backends.
 *
 * @public
 */
export declare const AnalyticalBackendErrorTypes: {
    NO_DATA: string;
    DATA_TOO_LARGE: string;
    PROTECTED_DATA: string;
    UNEXPECTED_HTTP: string;
    UNEXPECTED: string;
    NOT_SUPPORTED: string;
    NOT_IMPLEMENTED: string;
    NOT_AUTHENTICATED: string;
    LIMIT_REACHED: string;
    CONTRACT_EXPIRED: string;
    TIMEOUT_ERROR: string;
};

/**
 * Factory function to create new instances of Analytical Backend realization using both platform agnostic
 * and platform specific configuration.
 *
 * @remarks
 * This factory function implementation MUST be exposed as the default export of packages which contain
 * realizations of the Analytical Backend SPI.
 *
 *
 * @param config - platform agnostic configuration
 * @param implConfig - platform specific configuration
 * @public
 */
export declare type AnalyticalBackendFactory = (config?: IAnalyticalBackendConfig, implConfig?: any) => IAnalyticalBackend;

/**
 * Implementation of different backends MAY indicate through this structure where to redirect the browser
 * in order to start authentication flow.
 *
 * @remarks
 * The `returnRedirectParam` is the name of the query parameter that the application should set when redirecting.
 * The value of the query parameter is the return URL where the browser should return after successful authentication.
 *
 * @public
 */
export declare type AuthenticationFlow = {
    loginUrl: string;
    returnRedirectParam: string;
};

/**
 * Options that is used for propagation cancellation signal / abort signal
 * @beta
 */
export declare type CancelableOptions = {
    signal?: AbortSignal;
};

/**
 * This exception is thrown when a contract has expired, for example if a plan's trial period has ended
 *
 * @public
 */
export declare class ContractExpired extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}

/**
 * This exception MUST be thrown when backend execution identifies that there is too much data
 * to process for the execution and refuses to proceed.
 *
 * @public
 */
export declare class DataTooLargeError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}

/**
 * Specification of particular elements to load in {@link IElementsQueryOptions}.
 *
 * @public
 */
export declare type ElementsQueryOptionsElementsSpecification = IElementsQueryOptionsElementsByValue | IElementsQueryOptionsElementsByPrimaryDisplayFormValue | IElementsQueryOptionsElementsByUri;

/**
 * Error converter
 *
 * @public
 */
export declare type ErrorConverter = (e: Error) => AnalyticalBackendError;

/**
 * Config for execution in explain mode
 * @internal
 */
export declare type ExplainConfig<T extends ExplainType | undefined> = {
    explainType?: T;
};

/**
 * All supported explain types
 * @internal
 */
export declare type ExplainType = "MAQL" | "GRPC_MODEL" | "WDF" | "QT" | "QT_SVG" | "OPT_QT" | "OPT_QT_SVG" | "SQL";

/**
 * Only for these filter types makes sense to resolve their elements
 *
 * @public
 */
export declare type FilterWithResolvableElements = IAttributeFilter | IRelativeDateFilter;

/**
 * The root of the Analytical Backend SPI.
 *
 * @remarks
 * It allows configuration related to communication with the backend and access to analytical workspaces.
 *
 * The analytical backend instance MUST be immutable. Changes to configuration of the backend MUST create a new
 * instance to work with.
 *
 * @public
 */
export declare interface IAnalyticalBackend {
    /**
     * Configuration used for communication with this backend.
     */
    readonly config: IAnalyticalBackendConfig;
    /**
     * Capabilities available on this backend.
     */
    readonly capabilities: IBackendCapabilities;
    /**
     * Creates new instance of backend on the provided hostname.
     *
     * @remarks
     * It is valid NOT TO specify any hostname, in
     * which case the analytical backend assumes it should communicate with the current origin.
     *
     * @param hostname - host[:port]
     * @returns new, unauthenticated instance
     */
    onHostname(hostname: string): IAnalyticalBackend;
    /**
     * Sets telemetry information that SHOULD be sent to backend to track component usage.
     *
     * @param componentName - name of component
     * @param props - props
     * @returns a new instance of backend, set up with the provided telemetry
     */
    withTelemetry(componentName: string, props: object): IAnalyticalBackend;
    /**
     * Sets authentication provider to be used when backend discovers current session is
     * not authenticated.
     *
     * @param provider - authentication provider to use
     * @returns a new instance of backend, set up with the provider
     */
    withAuthentication(provider: IAuthenticationProvider): IAnalyticalBackend;
    /**
     * Tests authentication against this backend.
     *
     * @remarks
     * This requires network communication and is thus
     * asynchronous. If the current backend (or session it lives in) is not authenticated, then
     * this method MUST NOT call the authentication provider.
     *
     * @returns promise of authenticated principal is returned if authenticated, null is returned if not authenticated.
     */
    isAuthenticated(): Promise<IAuthenticatedPrincipal | null>;
    /**
     * Triggers authentication process against the backend.
     *
     * @remarks
     * If the 'force' parameter is specified, then the method MUST always lead to a call to the authentication
     * provider.
     *
     * If the 'force' parameter is not specified, then the method MAY lead to a call to the authentication provider -
     * if the backend lives in an already authenticated session, principal is returned. If the session is not
     * authenticated, then the provider WILL BE called.
     *
     * @param force - indicates whether authentication should be forced = must always be done even if the current
     *  session is already authenticated; defaults to false
     * @returns promise of authenticated principal, or rejection if authentication has failed.
     */
    authenticate(force?: boolean): Promise<IAuthenticatedPrincipal>;
    /**
     * Triggers deauthentication process against the backend.
     *
     * @returns promise of the completed process, or rejection if deauthentication failed.
     */
    deauthenticate(): Promise<void>;
    /**
     * Returns an organization available on the backend.
     * @param organizationId - unique ID of the organization
     */
    organization(organizationId: string): IOrganization;
    /**
     * Returns a service that can be obtained to obtain organizations.
     */
    organizations(): IOrganizations;
    /**
     * Returns a service for interacting with the currently authenticated user.
     *
     * @returns an instance that can be used to interact with the user
     */
    currentUser(): IUserService;
    /**
     * Returns an analytical workspace available on this backend.
     *
     * @param id - identifier of the workspace
     * @returns an instance that can be used to interact with the workspace
     */
    workspace(id: string): IAnalyticalWorkspace;
    /**
     * Returns service that can be used to obtain available workspaces.
     */
    workspaces(): IWorkspacesQueryFactory;
    /**
     * Returns service that can be used to obtain license entitlements.
     */
    entitlements(): IEntitlements;
}

/**
 * Specifies platform agnostic configuration of an analytical backend.
 *
 * @remarks
 * Only config items that make sense for any and all analytical backend implementations are specified here.
 *
 * @public
 */
export declare interface IAnalyticalBackendConfig {
    /**
     * Server hostname (including protocol and port).
     *
     * @remarks
     * If not specified and running in browser, then the
     * backend will communicate with origin.
     */
    readonly hostname?: string;
}

/**
 * Represents an analytical workspace hosted on a backend.
 *
 * @remarks
 * It is an entry point to various services that can be used to inspect and modify the workspace
 * and run executions to obtain analytics for the workspace.
 *
 * @public
 */
export declare interface IAnalyticalWorkspace {
    readonly workspace: string;
    /**
     * Returns details about the analytical workspace.
     * Throws error in case the workspace does not exist.
     */
    getDescriptor(): Promise<IWorkspaceDescriptor>;
    /**
     * Returns parent analytical workspace when this workspace has a parent, undefined otherwise.
     */
    getParentWorkspace(): Promise<IAnalyticalWorkspace | undefined>;
    /**
     * Returns factory that can be used to query workspace catalog items - attributes, measures, facts and date data sets.
     */
    catalog(): IWorkspaceCatalogFactory;
    /**
     * Returns service that can be used to query and update insights.
     */
    insights(): IWorkspaceInsightsService;
    /**
     * Returns service that can be used to query and update dashboards.
     */
    dashboards(): IWorkspaceDashboardsService;
    /**
     * Returns service that can be used to query date filter configs.
     */
    dateFilterConfigs(): IDateFilterConfigsQuery;
    /**
     * Returns service that can be used to query additional attributes and attribtue display forms data, and their elements.
     */
    attributes(): IWorkspaceAttributesService;
    /**
     * Returns service that can be used to query additional measures data.
     */
    measures(): IWorkspaceMeasuresService;
    /**
     * Returns service that can be used to query additional facts data.
     */
    facts(): IWorkspaceFactsService;
    /**
     * Returns service that can be used to query data sets defined in this workspace.
     */
    datasets(): IWorkspaceDatasetsService;
    /**
     * Returns execution factory - which is an entry point to triggering executions and thus obtaining
     * analytics from the workspace.
     */
    execution(): IExecutionFactory;
    /**
     * Returns service that can be used to query workspace users.
     */
    users(): IWorkspaceUsersQuery;
    /**
     * Returns service that can be used to query workspace user groups.
     */
    userGroups(): IWorkspaceUserGroupsQuery;
    /**
     * Returns service that can be used to query workspace permissions.
     */
    permissions(): IWorkspacePermissionsService;
    /**
     * Returns service that can be used to obtain settings that are currently in effect for the workspace.
     */
    settings(): IWorkspaceSettingsService;
    /**
     * Returns service that can be used to obtain workspace styling settings. These settings specify for instance
     * what colors should be used in the charts.
     */
    styling(): IWorkspaceStylingService;
    /**
     * Returns service that can be used to manage access control records for the workspace.
     */
    accessControl(): IWorkspaceAccessControlService;
}

/**
 * Parsed {@link https://help.gooddata.com/pages/viewpage.action?pageId=86795279 | MAQL} token referencing an attribute element.
 *
 * @remarks
 * See {@link IMeasureExpressionToken} for more information.
 *
 * @public
 */
export declare interface IAttributeElementExpressionToken {
    /**
     * Expression token type
     */
    type: "attributeElement";
    /**
     * Element title
     */
    value: string | undefined;
    /**
     * Deleted element
     */
    deleted?: boolean;
}

/**
 * Describes user, which is currently authenticated to the backend.
 *
 * @public
 */
export declare interface IAuthenticatedPrincipal {
    /**
     * Unique identifier of the authenticated user.
     *
     * @remarks
     * The identifier semantics MAY differ between backend
     * implementations. The client code SHOULD NOT make assumptions on the content (such as userId being
     * valid email and so on).
     */
    userId: string;
    /**
     * Backend-specific user metadata.
     */
    userMeta?: any;
}

/**
 * Describes context in which the authentication is done.
 *
 * @remarks
 * To cater for custom authentication schemes. the API client of the underlying backend IS exposed anonymously
 * to the provider - the provider SHOULD use the provided API client to exercise any backend-specific authentication
 * mechanisms.
 *
 * @public
 */
export declare interface IAuthenticationContext {
    /**
     * An instance of analytical backend which triggered the authentication.
     */
    backend: IAnalyticalBackend;
    /**
     * API client used to communicate with the backend.
     *
     * @remarks
     * This can be used to perform any backend-specific,
     * non-standard authentication.
     */
    client: any;
}

/**
 * Defines authentication provider to use when instance of {@link IAnalyticalBackend} discovers that
 * the current session is not authentication.
 *
 * @public
 */
export declare interface IAuthenticationProvider {
    /**
     * Perform custom initialization of the client that the Analytical Backend uses to communicate
     * with the server.
     *
     * @remarks
     * If implemented, this function WILL BE called by the backend every time a new instance of API client
     * is created.
     *
     * Note: the configuration and construction of Analytical Backend instance is cumulative. Backend implementations
     * MAY create multiple instances of clients during construction.
     *
     * @param client - an instance of client
     */
    initializeClient?(client: any): void;
    /**
     * Specify function to be called when the Analytical Backend raises a {@link NotAuthenticated} error.
     *
     * @param context - context in which the authentication is done
     * @param error - an instance of {@link NotAuthenticated} error
     */
    onNotAuthenticated?: NotAuthenticatedHandler;
    /**
     * Perform authentication.
     *
     * @param context - context in which the authentication is done
     */
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    /**
     * Returns the currently authenticated principal, or undefined if not authenticated.
     * Does not trigger authentication if no principal is available.
     */
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    /**
     * Clear existing authentication.
     *
     * @param context - context in which the authentication is done
     */
    deauthenticate(context: IAuthenticationContext): Promise<void>;
}

/**
 * Analytical Backend communicates its capabilities via objects of this type. In return, the capabilities
 * can then be used by applications to enable / disable particular features.
 *
 * @public
 */
export declare interface IBackendCapabilities {
    /**
     * Indicates whether the backend is capable to address objects using URIs
     */
    supportsObjectUris?: boolean;
    /**
     * Indicates whether the backend is capable to calculate and include totals in the resulting data view.
     */
    canCalculateTotals?: boolean;
    /**
     * Indicates whether the backend is capable to calculate and include grand totals in the resulting data view.
     */
    canCalculateGrandTotals?: boolean;
    /**
     * Indicates whether the backend is capable to calculate and include subtotals in the resulting data view.
     */
    canCalculateSubTotals?: boolean;
    /**
     * Indicates whether the backend is capable to calculate and include native totals (aka rollups) in the resulting data view.
     */
    canCalculateNativeTotals?: boolean;
    /**
     * Indicates whether the backend is capable to sort the result data view.
     */
    canSortData?: boolean;
    /**
     * Indicates whether the backend can recognize attribute elements by URI.
     */
    supportsElementUris?: boolean;
    /**
     * Indicates maximum result dimensions that the backend is able to produce.
     */
    maxDimensions?: number;
    /**
     * Indicates whether backend can export data to CSV file.
     */
    canExportCsv?: boolean;
    /**
     * Indicates whether backend can export data to Excel.
     */
    canExportXlsx?: boolean;
    /**
     * Indicates whether backend can transform an existing result into a different shape / sorting / totals.
     */
    canTransformExistingResult?: boolean;
    /**
     * Indicates whether backend can execute an existing, persistent insight by reference.
     */
    canExecuteByReference?: boolean;
    /**
     * Indicates whether backend supports adding CSV datasets and switching between them.
     */
    supportsCsvUploader?: boolean;
    /**
     * Indicates whether backend supports ranking filters.
     */
    supportsRankingFilter?: boolean;
    /**
     * Indicates whether backend supports ranking filters in combination with measure value filters (in the same execution).
     */
    supportsRankingFilterWithMeasureValueFilter?: boolean;
    /**
     * Indicates whether backend supports element query parent filtering.
     */
    supportsElementsQueryParentFiltering?: boolean;
    /**
     * Indicates whether backend supports a special dashboard-specific KPI Widget.
     */
    supportsKpiWidget?: boolean;
    /**
     * Indicates whether backend supports Widget as standalone addressable entity.
     */
    supportsWidgetEntity?: boolean;
    /**
     * Indicates whether backend supports hyperlink attribute labels.
     */
    supportsHyperlinkAttributeLabels?: boolean;
    /**
     * Indicates whether backend supports returning of the valid elements (values) for generic date attributes (Day of Week, Month of Year, etc.).
     */
    supportsGenericDateAttributeElements?: boolean;
    /**
     * Indicates whether backend supports downloading of files that will be used for debugging.
     * Indicates whether backend supports retrieving of data that will be used for debugging.
     */
    supportsExplain?: boolean;
    /**
     * Indicates whether backend's identifiers are scoped to a type.
     *
     * @remarks
     * They are unique only on type level. When working with backend that has type scoped identifiers it is essential to provide
     * both `identifier` and `type` when using `IdentifierRef`.
     *
     * If not specified then assume identifiers do not require `type` information in order to exactly identify an object.
     */
    hasTypeScopedIdentifiers?: boolean;
    /**
     * Indicates whether backend supports control of access to the MD objects
     */
    supportsAccessControl?: boolean;
    /**
     * Indicates whether backend supports only strict access control.
     *
     * @remarks
     * It means that no one without proper permissions is able to get restricted MD object even knowing its URI.
     */
    usesStrictAccessControl?: boolean;
    /**
     * Indicates whether backend supports filtering object by owner/creator.
     */
    supportsOwners?: boolean;
    /**
     * Indicates whether backend allows objects with damaged references.
     */
    allowsInconsistentRelations?: boolean;
    /**
     * Indicates whether backend supports time granularities (gdc.time.minute, gdc.time.hour);
     */
    supportsTimeGranularities?: boolean;
    /**
     * Indicates whether backend supports hierarchical workspaces
     */
    supportsHierarchicalWorkspaces?: boolean;
    /**
     * Indicates whether backend supports custom color palettes.
     */
    supportsCustomColorPalettes?: boolean;
    /**
     * Indicates whether backend supports organization settings.
     */
    supportsOrganizationSettings?: boolean;
    /**
     * Indicates whether backend supports inline measures in execution.
     */
    supportsInlineMeasures?: boolean;
    /**
     * Indicates whether backend supports bootstrap resource that returns initial app data.
     */
    supportsBootstrapResource?: boolean;
    /**
     * Indicates whether backends supports locking of metadata objects that prevents their edit by other
     * users than admins.
     */
    supportsMetadataObjectLocking?: boolean;
    /**
     * Indicates whether backend supports granular access controls of metadata objects or if permissions
     * are tied to the user role.
     */
    supportsGranularAccessControl?: boolean;
    /**
     * Indicates whether backend supports virtual "Everyone" group that is used when we want
     * to assign permissions for all current and future users of the platform.
     */
    supportsEveryoneUserGroupForAccessControl?: boolean;
    /**
     * Indicates whether backend supports non production data sets.
     */
    supportsNonProductionDatasets?: boolean;
    /**
     * Indicates whether backend supports executions listing all attribute values
     */
    supportsShowAllAttributeValues?: boolean;
    /**
     * Indicates whether backend supports separate numerical labels (display forms) for geo chart's latitude and longitude.
     * If false, string label with "latitude;longitude" values is expected.
     */
    supportsSeparateLatitudeLongitudeLabels?: boolean;
    /**
     * Indicates whether backends supports displaying message to inform workspace managers about having
     * access to the shared object.
     */
    canWorkspaceManagerSeeEverySharedObject?: boolean;
    /**
     * Indicates whether dackend supports enumerating datetime attributes.
     */
    supportsEnumeratingDatetimeAttributes?: boolean;
    /**
     * Catchall for additional capabilities
     */
    [key: string]: undefined | boolean | number | string;
}

/**
 * Parsed {@link https://help.gooddata.com/pages/viewpage.action?pageId=86795279 | MAQL} bracket.
 *
 * @remarks
 * See {@link IMeasureExpressionToken} for more information.
 *
 * @public
 */
export declare interface IBracketExpressionToken {
    /**
     * Expression token type
     */
    type: "bracket";
    /**
     * Plain text
     */
    value: string;
}

/**
 * Interface that implements aborting of requests
 *
 * @beta
 */
export declare interface ICancelable<T> {
    /**
     * @param signal - Abort signal used for canceling requests
     * @returns Instance of object with interface
     */
    withSignal(signal: AbortSignal): T;
}

/**
 * Parsed {@link https://help.gooddata.com/pages/viewpage.action?pageId=86795279 | MAQL} comment text.
 *
 * @remarks
 * See {@link IMeasureExpressionToken} for more information.
 *
 * @public
 */
export declare interface ICommentExpressionToken {
    /**
     * Expression token type
     */
    type: "comment";
    /**
     * Plain text
     */
    value: string;
}

/**
 * Dashboard referenced objects
 * @alpha
 */
export declare interface IDashboardReferences {
    /**
     * Referenced insights. Empty if no insights on dashboard or referenced insights were not requested.
     */
    insights: IInsight[];
    /**
     * Referenced plugins. Empty if no plugins on dashboard or referenced plugins were not requested.
     */
    plugins: IDashboardPlugin[];
}

/**
 * Dashboard with referenced objects
 * @alpha
 */
export declare interface IDashboardWithReferences {
    dashboard: IDashboard;
    references: IDashboardReferences;
}

/**
 * A view on the calculated data.
 *
 * @remarks
 *
 * See also the `{@link @gooddata/sdk-ui#DataViewFacade}`. This wrapper on top of this raw IDataView can be used to work
 * with the data in a way more convenient fashion.
 *
 * @public
 */
export declare interface IDataView {
    /**
     * Coordinates of where this data view starts. One coordinate per result dimension.
     */
    readonly offset: number[];
    /**
     * Count of data in each dimension.
     */
    readonly count: number[];
    /**
     * Total size of data in each dimension.
     */
    readonly totalCount: number[];
    /**
     * Headers are metadata for the data in this view.
     *
     * @remarks
     * There are headers for each dimension and in
     * each dimension headers are further sliced by the attribute or measure or total to which the data
     * belongs.
     *
     * Thus:
     *
     * - Top array contains 0 to N per-dimension arrays, one for each requested dimension (if any)
     * - The per-dimension arrays then contain per-slice array, one for each attribute or measure in the dimension
     * - The per-slice-array then contains the actual result header which includes information such as attribute element
     *   or measure name
     */
    readonly headerItems: IResultHeader[][][];
    /**
     * The calculated data. Dimensionality of the data matches the dimensions requested at execution time.
     */
    readonly data: DataValue[][] | DataValue[];
    /**
     * Grand totals included in this data view.
     *
     * @remarks
     * Grand totals are included for each dimension; within each
     * dimension there is one entry per requested total and for each requested total there are list of values.
     *
     * Thus:
     *
     * - Top array contains 0 to N per-dimension arrays
     * - Each per-dimension array contains one per-total entry for each requested total
     * - Each per-total entry contains array of calculated values, cardinality of this matches the cardinality
     *   of the data in the respective dimension.
     */
    readonly totals?: DataValue[][][];
    /**
     * Totals of grand totals included in this data view.
     */
    readonly totalTotals?: DataValue[][][];
    /**
     * Full definition of execution that computed data included in this DataView.
     */
    readonly definition: IExecutionDefinition;
    /**
     * Result of the execution that calculated data for this view.
     */
    readonly result: IExecutionResult;
    /**
     * Result warnings.
     *
     * @remarks
     * Backend MAY return warnings to indicate that the result is different compared to what the caller can expect.
     * For example, the caller executes a definition with particular filter,
     * but the backend determines that the filter has no effect on the computation.
     * Backend runs the execution and communicates by warning that the filter was useless.
     */
    readonly warnings?: IResultWarning[];
    /**
     * Tests if this data view is same as the other data view.
     *
     * @param other - other data view
     * @returns true if equal, false if not
     */
    equals(other: IDataView): boolean;
    /**
     * Unique fingerprint of this data view.
     *
     * @remarks
     * The fingerprint is influenced by the execution result and the
     * offset and limit of the data view.
     *
     * Thus, two data views on the same result, with same offset and limit will have the same fingerprint.
     */
    fingerprint(): string;
}

/**
 * This service provides access to workspace date filter configs (also known as extended date filters).
 * Date filter configs allow to define your own date filter presets, that appear in the date filter.
 * To make date filter configs work, you have to set enableKPIDashboardExtendedDateFilters feature flag to true.
 *
 * @alpha
 */
export declare interface IDateFilterConfigsQuery {
    /**
     * Sets number of date filter configs to return per page.
     * Default/max limit is specific per backend
     *
     * @param limit - desired max number of date filter configs per page; must be a positive number
     * @returns date filter configs query
     */
    withLimit(limit: number): IDateFilterConfigsQuery;
    /**
     * Sets starting point for the query. Backend WILL return no data if the offset is greater than
     * total number of date filter configs
     * Default offset: 0
     *
     * @param offset - zero indexed, must be non-negative
     * @returns date filter configs query
     */
    withOffset(offset: number): IDateFilterConfigsQuery;
    /**
     * Starts the date filter configs query.
     *
     * @returns promise of first page of the results
     */
    query(): Promise<IDateFilterConfigsQueryResult>;
}

/**
 * Paged result of valid element query. Last page of data returns empty items.
 *
 * @public
 */
export declare type IDateFilterConfigsQueryResult = IPagedResource<IDateFilterConfig>;

/**
 * Service to query valid attribute elements for particular display form.
 *
 * @public
 */
export declare interface IElementsQuery extends ICancelable<IElementsQuery> {
    /**
     * Sets number of valid elements to return per page.
     * Default limit is specific per backend
     *
     * @param limit - desired max number of valid elements per page; must be a positive number
     * @returns element query
     */
    withLimit(limit: number): IElementsQuery;
    /**
     * Sets starting point for the query. Backend WILL return no data if the offset is greater than
     * total number of valid elements.
     * Default offset: 0
     *
     * @param offset - zero indexed, must be non-negative
     * @returns element query
     */
    withOffset(offset: number): IElementsQuery;
    /**
     * Sets the attribute filters that will limit the available elements
     *
     * @param filters - attribute filters limiting the elements
     * @returns element query
     */
    withAttributeFilters(filters: IElementsQueryAttributeFilter[]): IElementsQuery;
    /**
     * Sets the measures that will limit the available elements - only elements for which the measures
     * have data will be returned.
     *
     * @param measures - measures limiting the elements
     * @returns element query
     */
    withMeasures(measures: IMeasure[]): IElementsQuery;
    /**
     * Allows to specify advanced options for the elements query.
     *
     * @param options - advanced options
     * @returns element query
     */
    withOptions(options: IElementsQueryOptions): IElementsQuery;
    /**
     * Starts the valid elements query.
     *
     * @returns promise of first page of the results
     */
    query(): Promise<IElementsQueryResult>;
    /**
     * Sets the date filters that will limit the available elements
     *
     * @param filters - date filters limiting the elements
     * @returns element query
     */
    withDateFilters(filters: IRelativeDateFilter[]): IElementsQuery;
}

/**
 * Attribute filter limiting the elements.
 *
 * @remarks
 * To be able to filter elements, the current attribute
 * and the filter attribute must be connected in the data model. The property `overAttribute` identifies
 * the connecting table in the logical data model.
 *
 * For method providing all possible connecting attributes see {@link IWorkspaceAttributesService.getCommonAttributes}.
 *
 * @public
 */
export declare interface IElementsQueryAttributeFilter {
    attributeFilter: IAttributeFilter;
    overAttribute: ObjRef;
}

/**
 * The attribute itself contains no view data, it's just a sequence of id's.
 *
 * @remarks
 * To get data that is useful to users, we need to represent these id's with specific values.
 * For this purpose, we pair the attribute with it's display form (specific representation of attribute values).
 * An attribute can have multiple display forms.
 *
 * @public
 */
export declare interface IElementsQueryFactory {
    /**
     * Query attribute elements represented by concrete display form
     *
     * @param ref - display form ref
     * @returns instance that can be used to query attribute elements
     */
    forDisplayForm(ref: ObjRef): IElementsQuery;
    /**
     * Query attribute elements used by provided filter
     *
     * @param filter - resolvable filter
     * @param dateFilterDisplayForm - display form of resolvable filter if it is date filter
     * @returns instance that can be used to query attribute elements
     *
     */
    forFilter(filter: FilterWithResolvableElements, dateFilterDisplayForm?: ObjRef): IFilterElementsQuery;
}

/**
 * Configuration options for querying attribute elements
 *
 * @public
 */
export declare interface IElementsQueryOptions {
    /**
     * Ordering of the elements
     */
    order?: SortDirection;
    /**
     * Filter elements by text value
     */
    filter?: string;
    /**
     * If true, the `filter` prop will behave negatively - i.e. it will not include items matching the `filter` value.
     */
    complement?: boolean;
    /**
     * Include the total count of all elements in the response (without filters applied)
     */
    includeTotalCountWithoutFilters?: boolean;
    /**
     * Specify particular elements to load.
     *
     * @remarks
     * This is commonly used to preload selected elements in the attribute filter.
     */
    elements?: ElementsQueryOptionsElementsSpecification;
    /**
     * Decides whether result will include also the primary label elements or only requested label ones.
     * It changes also the cardinality of result.
     *
     * If true, returned label values are in cardinality of primary label, i.e., result could contain
     * duplicated values.
     *
     * If false, returned label values are unique values and smaller amount of label values can be returned
     * than the number of primary label values.
     *
     * @remarks
     * This is used mainly in filters to not display duplicate values where each of them filter out the same
     * records from an insight when text value attribute filters are used.
     *
     * The value is applied only on backends without the supportsElementUris capability.
     */
    excludePrimaryLabel?: boolean;
}

/**
 * Specification of particular elements to load in {@link IElementsQueryOptions} using the values of the primary
 * display form related to the attribute the requested display form is from.
 *
 * @public
 */
export declare interface IElementsQueryOptionsElementsByPrimaryDisplayFormValue {
    /**
     * The values to request.
     */
    primaryValues: Array<string | null>;
}

/**
 * Specification of particular elements to load in {@link IElementsQueryOptions} using their URIs.
 *
 * @remarks
 * This is not supported on backends without the supportsElementUris capability.
 *
 * @public
 */
export declare interface IElementsQueryOptionsElementsByUri {
    /**
     * The element URIs to request.
     */
    uris: Array<string | null>;
}

/**
 * Specification of particular elements to load in {@link IElementsQueryOptions} using their values.
 *
 * @public
 */
export declare interface IElementsQueryOptionsElementsByValue {
    /**
     * The values to request.
     */
    values: Array<string | null>;
}

/**
 * Paged result of valid element query. Last page of data returns empty items.
 *
 * @public
 */
export declare type IElementsQueryResult = IPagedResource<IAttributeElement>;

/**
 * Provides functions to obtain entitlements
 *
 * @public
 */
export declare interface IEntitlements {
    /**
     * Returns current license entitlements
     */
    resolveEntitlements(): Promise<IEntitlementDescriptor[]>;
}

/**
 * Execution factory provides several methods to create a prepared execution from different types
 * of inputs.
 *
 * @remarks
 * Note: the execution factory WILL perform extensive input validation to ensure that the created
 * instance of prepared execution is semantically correct.
 *
 * @public
 */
export declare interface IExecutionFactory {
    /**
     * Prepares a new execution for the provided execution definition.
     *
     * @remarks
     * The contract is that the definition is taken and used in the prepared execution AS IS. Compared
     * to the other convenience methods, this method MUST NOT create prepared executions with automatically
     * generated dimensions.
     *
     * @param def - execution definition
     * @returns new prepared execution
     */
    forDefinition(def: IExecutionDefinition): IPreparedExecution;
    /**
     * Prepares a new execution for a list of attributes and measures, filtered using the
     * provided filters.
     *
     * @remarks
     * The contract is that prepared executions created by this method MUST be executable and MUST come with
     * pre-filled dimensions created using the {@link @gooddata/sdk-model#defaultDimensionsGenerator}.
     *
     * @param items - list of attributes and measures, must not be empty
     * @param filters - list of filters, may not be provided
     */
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    /**
     * Prepares a new execution for a list of buckets.
     *
     * @remarks
     * Attributes and measures WILL be transferred to the
     * execution in natural order:
     *
     * - Order of items within a bucket is retained in the execution
     * - Items from first bucket appear before items from second bucket
     *
     * Or more specifically, given two buckets with items as [A1, A2, M1] and [A3, M2, M3], the resulting
     * prepared execution WILL have definition with attributes = [A1, A2, A3] and measures = [M1, M2, M3]
     *
     * The contract is that prepared executions created by this method MUST be executable and MUST come with
     * pre-filled dimensions created using the {@link @gooddata/sdk-model#defaultDimensionsGenerator}.
     *
     * @param buckets - list of buckets with attributes and measures, must be non empty, must have at least one attr or measure
     * @param filters - optional, may not be provided, may contain null or undefined values which must be ignored
     */
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    /**
     * Prepares a new execution for the provided insight.
     *
     * @remarks
     * Buckets with attributes and measures WILL be used
     * to obtain attributes and measures - the behavior WILL be same as in forBuckets() function. Filters, sort by
     * and totals in the insight WILL be included in the prepared execution.
     *
     * Additionally, an optional list of additional filters WILL be merged with the filters already defined in
     * the insight.
     *
     * The contract is that prepared executions created by this method MUST be executable and MUST come with
     * pre-filled dimensions greated using the {@link @gooddata/sdk-model#defaultDimensionsGenerator}.
     *
     * @param insightDefinition - insight definition to create execution for, must have buckets which must have some attributes or measures in them
     * @param filters - optional, may not be provided, may contain null or undefined values which must be ignored
     */
    forInsight(insightDefinition: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    /**
     * Prepares new, by-reference execution for an existing insight.
     *
     * @remarks
     * Execution prepared using this method MAY be realized using different backend API than the executions where
     * attributes and measures are provided 'freeform'. In return, this different backend API may provide additional
     * authorization guarantees - for instance the backend MAY only allow end user to execute these stored insights
     * and not do any 'freeform' execution.
     *
     * If the backend does not support execution by reference, then it MUST fall back to freeform execution.
     *
     * The contract is that prepared executions created by this method MUST be executable and MUST come with
     * pre-filled dimensions created using the {@link @gooddata/sdk-model#defaultDimensionsGenerator}.
     *
     * @param insight - saved insight
     * @param filters - optional list of filters to merge with filters already defined in the insight, may contain null or undefined values which must be ignored
     */
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
}

/**
 * Represents results of execution done with particular definition.
 *
 * @remarks
 * Within the result is the description of the shape of the data and methods to to obtain views on the data.
 *
 * @public
 */
export declare interface IExecutionResult {
    /**
     * Full definition of execution that yielded this result.
     */
    readonly definition: IExecutionDefinition;
    /**
     * Description of shape of the data.
     */
    readonly dimensions: IDimensionDescriptor[];
    /**
     * Asynchronously reads all data for this result into a single data view.
     *
     * @returns Promise of data view
     */
    readAll(): Promise<IDataView>;
    /**
     * Asynchronously reads a window of data for this result.
     *
     * @remarks
     * The window is specified using
     * offset array and size array. The offsets specify coordinates where the view starts and
     * are zero-based. The sizes specify size of the window in each of the results dimension.
     *
     *
     * @param offset - coordinates where the window starts
     * @param size - size of the window in each of the dimensions
     * @returns Promise of data view
     */
    readWindow(offset: number[], size: number[]): Promise<IDataView>;
    /**
     * Transforms this execution result - changing the result sorting, dimensionality and available
     * totals is possible through transformation.
     *
     * @remarks
     * It is strongly encouraged to use this function every time when data SHOULD remain the same and just
     * its sorting or dimensionality or totals MUST change. That is because since this intent of the caller
     * is known, the function can apply additional optimizations and obtain the updated result faster
     * compared to fully running the execution.
     *
     * Whether the reuse of the computed result actually happens depends on couple of factors:
     *
     * - Transformation is eligible: adding new native totals (roll-ups) necessitates full re-execution;
     *   all other types of changes (including adding other types of totals) are eligible for execution result reuse.
     *
     * - Backend capabilities: backend MAY NOT be able to natively reuse existing execution result. This is
     *   communicated by the canTransformExistingResult indicator.
     *
     * If the transformation is not eligible for result reuse or the backend is not capable of this optimization, then
     * a new execution WILL be done completely transparently for the caller.
     *
     * @returns new prepared execution with no sorts, dimensions or totals
     */
    transform(): IPreparedExecution;
    /**
     * Asynchronously exports all data in this result to a blob.
     *
     * Exported file is downloaded and attached as Blob data to the current window instance.
     *
     * @param options - customize how the result looks like (format etc.)
     * @returns promise with object URL pointing to a Blob data of downloaded exported insight
     */
    export(options: IExportConfig): Promise<IExportResult>;
    /**
     * Tests if this execution result is same as the other result.
     *
     * @param other - other result
     * @returns true if equal, false if not
     */
    equals(other: IExecutionResult): boolean;
    /**
     * Unique fingerprint of the execution result.
     *
     * @remarks
     * The fingerprint is influenced by both data included in
     * the result and its dimensionality, sorting and totals.
     *
     * Thus, two results with the same data and same execution definition will have the same fingerprint.
     */
    fingerprint(): string;
}

/**
 * Explain provider for download or get data from explain api
 * @internal
 */
export declare interface IExplainProvider<T extends ExplainType | undefined> {
    download(): Promise<void>;
    data(): Promise<T extends undefined ? void : IExplainResult[NonNullable<T>]>;
}

/**
 * Represents results of explain done with particular definition for provided exaplain type.
 * @see ExplainType
 *
 * @internal
 */
export declare type IExplainResult = {
    ["MAQL"]: unknown;
    ["GRPC_MODEL"]: unknown;
    ["WDF"]: unknown;
    ["QT"]: unknown;
    ["OPT_QT"]: unknown;
    ["QT_SVG"]: string;
    ["OPT_QT_SVG"]: string;
    ["SQL"]: string;
};

/**
 * Configuration for exports of results into XLSX or CSV.
 *
 * @public
 */
export declare interface IExportConfig {
    /**
     * Format of the export file. Defaults to CSV if not specified.
     */
    format?: "xlsx" | "csv" | "raw";
    /**
     * Applicable for XLSX format; specifies title of the workbook.
     */
    title?: string;
    /**
     * Applicable for XLSX format; indicates whether headers and cells in the sheet
     * should be merged.
     */
    mergeHeaders?: boolean;
    /**
     * Applicable for XLSX format; specifies filters to include as comments / metadata in
     * the Excel sheet.
     *
     * @remarks
     * Filters provided here are purely to paint a better context for the
     * person looking at the XLSX file. They serve no other purpose and are merely serialized
     * into the XLSX in a human readable form.
     */
    showFilters?: boolean;
}

/**
 * Result of export is an object URL pointing to a Blob of downloaded data attached to the current
 * window instance. The result also contains name of the downloaded file provided by the backend export
 * service.
 *
 * {@link URL#revokeObjectURL} method must be used when object URL is no longer needed to release
 * the blob memory.
 *
 * @public
 */
export declare interface IExportResult {
    /** URI from which can the export be fetched again */
    uri: string;
    /** Object URL pointing to the downloaded blob of exported data */
    objectUrl: string;
    /** Name of the exported file provided by the export service */
    fileName?: string;
}

/**
 * Service to query valid filter elements for particular filter.
 *
 * @public
 */
export declare interface IFilterElementsQuery {
    /**
     * Sets number of valid elements to return per page.
     * Default limit is specific per backend
     *
     * @param limit - desired max number of valid elements per page; must be a positive number
     * @returns element query
     */
    withLimit(limit: number): IFilterElementsQuery;
    /**
     * Sets starting point for the query. Backend WILL return no data if the offset is greater than
     * total number of valid elements.
     * Default offset: 0
     *
     * @param offset - zero indexed, must be non-negative
     * @returns element query
     */
    withOffset(offset: number): IFilterElementsQuery;
    /**
     * Starts the valid elements query.
     *
     * @returns promise of first page of the results
     */
    query(): Promise<IElementsQueryResult>;
}

/**
 * Configuration options for getting dashboards.
 *
 * @alpha
 */
export declare interface IGetDashboardOptions {
    /**
     * Specify if information about the users that created/modified the dashboard should be loaded.
     * Defaults to false.
     *
     * If user is inactive or logged in user has not rights to access this information than users that created/modified is undefined.
     */
    loadUserData?: boolean;
    /**
     * Specify if also dashboards available only via link should be loaded.
     * Such dashboards may not be supported by every backend.
     *
     * Defaults to false.
     */
    includeAvailableViaLink?: boolean;
    /**
     * Specify id of the currently performed dashboard pdf export.
     * This id is used to retrieve export-related metadata, such as currently active attribute filters.
     *
     * The id is missing when the dashboard is not loaded in the export mode
     */
    exportId?: string;
}

/**
 * Configuration options for getting dashboard plugin.
 *
 * @alpha
 */
export declare interface IGetDashboardPluginOptions {
    /**
     * Specify if information about the users that created/modified the dashboard plugin should be loaded.
     * Defaults to false.
     *
     * If user is inactive or logged-in user has not rights to access this information than users that created/modified is undefined.
     */
    loadUserData?: boolean;
}

/**
 * Configuration options for getting a single insight.
 *
 * @public
 */
export declare interface IGetInsightOptions {
    /**
     * Specify if information about the users that created/modified the insight should be loaded.
     *
     * @remarks
     * Defaults to false.
     *
     * If user is inactive or logged in user has not rights to access this information than users that created/modified is undefined.
     */
    loadUserData?: boolean;
}

/**
 * Configuration options for getting scheduled mails.
 *
 * @alpha
 */
export declare interface IGetScheduledMailOptions {
    /**
     * Specify if information about the users that created/modified the scheduled email should be loaded.
     *
     * @remarks
     * Defaults to false.
     *
     * If user is inactive or logged in user has not rights to access this information than users that created/modified is undefined.
     */
    loadUserData?: boolean;
    /**
     * List only subset of scheduled mails authored by current user.
     *
     * @remarks
     * Defaults to false.
     */
    createdByCurrentUser?: boolean;
}

/**
 * Additional options for the {@link IWorkspaceInsightsService.getVisualizationClasses} function.
 *
 * @public
 */
export declare interface IGetVisualizationClassesOptions {
    /**
     * If true, deprecated visualization classes will be included in the result.
     */
    includeDeprecated?: boolean;
}

/**
 * Contains information about objects that may be referenced by an insight.
 *
 * @remarks
 * The contents of this object depend on the insight and the types requested
 * at the time of call to the {@link IWorkspaceInsightsService.getInsightReferencedObjects} function.
 *
 * @public
 */
export declare interface IInsightReferences {
    /**
     * Requested catalog items.
     *
     * @remarks
     * If requested, measures, attributes, display forms, facts and dateDataSets referenced by the insight will be
     * returned here. If none of them were requested, the catalogItems will be undefined. If some were
     * requested but insight is not referencing those types, then the array will be empty.
     */
    catalogItems?: CatalogItem[];
    /**
     * If requested, metadata about data sets from which this insight queries data will be returned here.
     */
    dataSetMeta?: IMetadataObject[];
}

/**
 * Contains information about objects that may be referencing an insight.
 *
 * @remarks
 * The contents of this object depend on reference of the insight requested at the time
 * of call to the {@link IWorkspaceInsightsService.getInsightReferencingObjects} function.
 *
 * @public
 */
export declare interface IInsightReferencing {
    /**
     * If requested, metadata about analytical dashboards from which this insight queries data will be returned here.
     */
    analyticalDashboards?: IMetadataObject[];
}

/**
 * Configuration options for querying insights
 *
 * @public
 */
export declare interface IInsightsQueryOptions {
    /**
     * Specify (zero-based) starting offset for the results. Default: 0
     */
    offset?: number;
    /**
     * Specify number of items per page. Default: 50
     */
    limit?: number;
    /**
     * Specify ordering of the insights. Default: natural ordering provided by the
     * analytical backend. Note: this may differ between backend implementations.
     */
    orderBy?: InsightOrdering;
    /**
     * Filter insights by their author. The value of this property is URI of the author.
     */
    author?: string;
    /**
     * Filter insights by their title
     */
    title?: string;
    /**
     * Specify if information about the users that created/modified the insights should be loaded for each insight.
     *
     * @remarks
     * Defaults to false.
     */
    loadUserData?: boolean;
}

/**
 * Queried insights are returned in a paged representation.
 *
 * @public
 */
export declare type IInsightsQueryResult = IPagedResource<IInsight>;

/**
 * Token representing part of parsed MAQL measure expression.
 *
 * @example
 * ```ts
 * // for example "SELECT [/gdc/md/projectId/obj/6273] WHERE [/gdc/md/projectId/obj/6307] = [/gdc/md/projectId/obj/6307/elements?id=5703453]"
 * // could be represented as
 * const expressionTokens = [
 *      {
 *          "type": "text",
 *          "value": "SELECT "
 *      },
 *      {
 *          "type": "measure",
 *          "value": "Amount",
 *      },
 *      {
 *          "type": "text",
 *          "value": " WHERE "
 *      },
 *      {
 *          "type": "attribute",
 *          "value": "Status",
 *      },
 *      {
 *          "type": "text",
 *          "value": " = "
 *      },
 *      {
 *          "type": "attributeElement",
 *          "value": "Won",
 *      }
 *  ]
 * ```
 *
 * @public
 */
export declare type IMeasureExpressionToken = IObjectExpressionToken | IAttributeElementExpressionToken | ITextExpressionToken | ICommentExpressionToken | IBracketExpressionToken;

/**
 * Contains information about objects that may be referencing an measure. {@link IWorkspaceMeasuresService.getMeasureReferencingObjects} function.
 *
 * @public
 */
export declare interface IMeasureReferencing {
    measures?: IMetadataObject[];
    insights?: IInsight[];
}

/**
 * Ordering options for insight query.
 *
 * @public
 */
export declare type InsightOrdering = "id" | "title" | "updated";

/**
 * @public
 */
export declare type InsightReferenceTypes = Exclude<ObjectType, "insight" | "tag" | "colorPalette">;

/**
 * Parsed {@link https://help.gooddata.com/pages/viewpage.action?pageId=86795279 | MAQL} token referencing a metadata object.
 *
 * @remarks
 * See {@link IMeasureExpressionToken} for more information.
 *
 * @public
 */
export declare interface IObjectExpressionToken {
    /**
     * Expression token type
     */
    type: ObjectType;
    /**
     * Title of the object
     */
    value: string;
    /**
     * Id of the object
     */
    id?: string;
    /**
     * Ref of the object
     */
    ref: ObjRef;
}

/**
 * Represents an organization that services analytical workspaces.
 *
 * @public
 */
export declare interface IOrganization {
    /**
     * ID of organization.
     */
    readonly organizationId: string;
    /**
     * Returns details about the organization.
     */
    getDescriptor(): Promise<IOrganizationDescriptor>;
    /**
     * Returns service that can be used to query and update organization security settings.
     */
    securitySettings(): ISecuritySettingsService;
    /**
     * Returns service that can be used to query and update organization styling.
     */
    styling(): IOrganizationStylingService;
    /**
     * Returns current organization settings.
     */
    settings(): IOrganizationSettingsService;
}

/**
 * Provides functions to obtain {@link IOrganization} instances
 *
 * @public
 */
export declare interface IOrganizations {
    /**
     * Gets the organization the current user is part of.
     */
    getCurrentOrganization(): Promise<IOrganization>;
}

/**
 * This service provides access to organization settings
 *
 * @public
 */
export declare interface IOrganizationSettingsService {
    /**
     * Sets whiteLabeling for organization.
     *
     * @param whiteLabeling - describes whitelabeling setting for logoUrl, faviconUrl etc.
     *
     * @returns promise
     */
    setWhiteLabeling(whiteLabeling: IWhiteLabeling): Promise<void>;
    /**
     * Sets locale for current workspace.
     *
     * @param locale - IETF BCP 47 Code locale ID, for example "en-US", "cs-CZ", etc.
     *
     * @returns promise
     */
    setLocale(locale: string): Promise<void>;
    /**
     * Sets timezone for organization.
     *
     * @param timezone - the value based on IANA time zone database naming convention.
     * for example: "America/Los_Angeles", etc.
     *
     * @returns promise
     */
    setTimezone(timezone: string): Promise<void>;
    /**
     * Sets date format for organization.
     *
     * @param dateFormat - the format based on the ICU standard, for example: "en-US", "cs-CZ", etc.
     *
     * @returns promise
     */
    setDateFormat(dateFormat: string): Promise<void>;
    /**
     * Sets first day of week for organization.
     *
     * @param weekStart - "Sunday | "Monday"
     *
     * @returns promise
     */
    setWeekStart(weekStart: string): Promise<void>;
    /**
     * Sets theme for organization.
     *
     * @param themeId - ID of the theme to apply to workspaces in organization.
     *
     * @returns promise
     */
    setTheme(themeId: string): Promise<void>;
    /**
     * Sets color palette for organization.
     *
     * @param colorPaletteId - ID of the color palette to apply to charts in organization.
     *
     * @returns promise
     */
    setColorPalette(colorPaletteId: string): Promise<void>;
    /**
     * Deletes theme from organization settings returning workspace styling to default.
     *
     * @returns promise
     */
    deleteTheme(): Promise<void>;
    /**
     * Deletes color palette from organization settings returning chart colors to default.
     *
     * @returns promise
     */
    deleteColorPalette(): Promise<void>;
    /**
     * Get all current organization settings.
     *
     * @remarks
     * User has to have an organization level permission to access them.
     *
     * @returns promise
     */
    getSettings(): Promise<ISettings>;
}

/**
 * This service provides access to organization styling settings such as theme.
 *
 * @public
 */
export declare interface IOrganizationStylingService {
    /**
     * Request all themes defined on organization level.
     *
     * @returns promise of array of theme metadata objects
     */
    getThemes(): Promise<IThemeMetadataObject[]>;
    /**
     * Request active theme setting from organization.
     *
     * @returns promise of theme object reference
     */
    getActiveTheme(): Promise<ObjRef | undefined>;
    /**
     * Set active theme setting in organization.
     *
     * @param themeRef - active theme reference
     * @returns promise
     */
    setActiveTheme(themeRef: ObjRef): Promise<void>;
    /**
     * Clear active theme setting from organization.
     *
     * @returns promise
     */
    clearActiveTheme(): Promise<void>;
    /**
     * Create new theme on organization level.
     *
     * @returns promise
     */
    createTheme(theme: IThemeDefinition): Promise<IThemeMetadataObject>;
    /**
     * Update existing theme on organization level.
     *
     * @returns promise
     */
    updateTheme(theme: IThemeDefinition): Promise<IThemeMetadataObject>;
    /**
     * Delete theme on organization level.
     *
     * @returns promise
     */
    deleteTheme(themeRef: ObjRef): Promise<void>;
    /**
     * Request all color palettes defined on organization level.
     *
     * @returns promise of array of color palette metadata objects
     */
    getColorPalettes(): Promise<IColorPaletteMetadataObject[]>;
    /**
     * Request active color palette setting from organization.
     *
     * @returns promise of color palette object reference
     */
    getActiveColorPalette(): Promise<ObjRef | undefined>;
    /**
     * Set active color palette setting in organization.
     *
     * @param colorPaletteRef - active color palette reference
     * @returns promise
     */
    setActiveColorPalette(colorPaletteRef: ObjRef): Promise<void>;
    /**
     * Clear active color palette setting from organization.
     *
     * @returns promise
     */
    clearActiveColorPalette(): Promise<void>;
    /**
     * Create new color palette on organization level.
     *
     * @returns promise
     */
    createColorPalette(colorPalette: IColorPaletteDefinition): Promise<IColorPaletteMetadataObject>;
    /**
     * Update existing color palette on organization level.
     *
     * @returns promise
     */
    updateColorPalette(colorPalette: IColorPaletteDefinition): Promise<IColorPaletteMetadataObject>;
    /**
     * Delete color palette on organization level.
     *
     * @returns promise
     */
    deleteColorPalette(colorPaletteRef: ObjRef): Promise<void>;
}

/**
 * Interface to interact with paged asynchronous resources
 *
 * @public
 */
export declare interface IPagedResource<TItem> {
    readonly items: TItem[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    /**
     * Request next page of the resource
     *
     * @returns promise of a paged resource with the results of next page
     */
    next(): Promise<IPagedResource<TItem>>;
    /**
     * Request a specific page of the resource
     *
     * @param pageIndex - index of requested page: positive, zero-based
     * @returns promise of a paged resource with the results of selected page
     */
    goTo(pageIndex: number): Promise<IPagedResource<TItem>>;
    /**
     * Request all the pages merged in a single array.
     *
     * @remarks
     * This MUST respect all the original query settings except for the paging settings (e.g. offset, limit).
     *
     * @returns promise of an array for all the pages' contents in one array
     */
    all(): Promise<TItem[]>;
    /**
     * Request all the pages merged in a single array and sort them using the given comparator.
     *
     * @remarks
     * This MUST respect all the original query settings except for the paging settings (e.g. offset, limit).
     *
     * @param compareFn - the compare function to use - the semantics are the same os for the Array.sort parameter
     *
     * @returns promise of an array for all the pages' contents in one array
     */
    allSorted(compareFn: (a: TItem, b: TItem) => number): Promise<TItem[]>;
}

/**
 * Prepared execution already knows what data to calculate and allows to specify how the data should be
 * sorted and shaped into dimensions.
 *
 * @remarks
 * To this end, it provides several functions to customize sort items and dimensions. The prepared execution
 * is immutable and so all the customization functions WILL result in a new instance of prepared execution.
 *
 * The contract for creating these new instances is that the new prepared execution MUST be created using the
 * execution factory that created current execution.
 *
 * @public
 */
export declare interface IPreparedExecution {
    /**
     * Definition of the execution accumulated to so far.
     */
    readonly definition: IExecutionDefinition;
    /**
     * Changes sorting of the resulting data. Any sorting settings accumulated so far WILL be wiped out.
     *
     * @param items - items to sort by
     * @returns new execution with the updated sorts
     */
    withSorting(...items: ISortItem[]): IPreparedExecution;
    /**
     * Configures dimensions of the resulting data. Any dimension settings accumulated so far WILL be wiped out.
     *
     * @remarks
     * The realizations of analytical backend MAY impose constraints on the minimum and maximum number of dimensions.
     * This call WILL fail if the input dimensions do not match constraints imposed by the backend.
     *
     * @param dim - dimensions to set
     * @returns new execution with the updated dimensions
     */
    withDimensions(...dim: Array<IDimension | DimensionGenerator>): IPreparedExecution;
    /**
     * Adds the desired date format to the postProcessing of an IPreparedExecution.
     *
     * @param dateFormat - Format to be applied to the dates in an AFM execution response.
     * @returns new execution with the updated postProcessing
     */
    withDateFormat(dateFormat: string): IPreparedExecution;
    /**
     * Starts the execution.
     */
    execute(): Promise<IExecutionResult>;
    /**
     * Starts the execution in explain mode.
     * @internal
     */
    explain<T extends ExplainType | undefined>(config: ExplainConfig<T>): IExplainProvider<typeof config["explainType"]>;
    /**
     * Tests whether this execution and the other execution are the same.
     *
     * @remarks
     * This effectively means that their definitions are deeply equal.
     *
     * If you are only concerned with the equality from the result calculation point of view,
     * consider comparing fingerprints instead.
     *
     * @param other - another execution
     */
    equals(other: IPreparedExecution): boolean;
    /**
     * Fingerprint of this prepared execution.
     *
     * @remarks
     * This is effectively the fingerprint of the execution
     * definition underlying this instance of Prepared Execution.
     */
    fingerprint(): string;
    /**
     * Additional execution configuration
     */
    withExecConfig(config: IExecutionConfig): IPreparedExecution;
}

/**
 * Type guard checking whether input is an instance of {@link AnalyticalBackendError}
 *
 * @public
 */
export declare function isAnalyticalBackendError(obj: unknown): obj is AnalyticalBackendError;

/**
 * Type guard checking whether input is an instance of {@link ContractExpired}
 *
 * @public
 */
export declare function isContractExpired(obj: unknown): obj is ContractExpired;

/**
 * Has dashboard layout only empty sections and widgets?
 * @alpha
 */
export declare const isDashboardLayoutEmpty: (layout: IDashboardLayout<any>) => boolean;

/**
 * Type guard checking whether input is an instance of {@link DataTooLargeError}
 *
 * @public
 */
export declare function isDataTooLargeError(obj: unknown): obj is DataTooLargeError;

/**
 * This service provides access to security settings defined on backend.
 *
 * @public
 */
export declare interface ISecuritySettingsService {
    /**
     * The scope in which is security settings accessed (URI of organization, workspace, user profile).
     */
    readonly scope: string;
    /**
     * Validate URL against backend list of allowed URLs.
     *
     * @param url - URL for validation.
     * @param context - context in which the URL must be valid.
     * @returns promise with boolean: true when validated URL is allowed as external host, false if it is not.
     */
    isUrlValid(url: string, context: ValidationContext): Promise<boolean>;
    /**
     * Validate plugin URL against list of allowed hosting locations.
     *
     * @remarks
     * Dashboard plugins MUST be loaded only from allowed locations. If the plugin is hosted elsewhere, it
     * MUST NOT be loaded.
     *
     * @param url - plugin content URL
     * @param workspace - workspace in context of which the validation is done
     */
    isDashboardPluginUrlValid(url: string, workspace: string): Promise<boolean>;
}

/**
 * Type guard checking whether the object is an instance of {@link IElementsQueryOptionsElementsByPrimaryDisplayFormValue}.
 *
 * @public
 */
export declare function isElementsQueryOptionsElementsByPrimaryDisplayFormValue(obj: unknown): obj is IElementsQueryOptionsElementsByPrimaryDisplayFormValue;

/**
 * Type guard checking whether the object is an instance of {@link IElementsQueryOptionsElementsByValue}.
 *
 * @public
 */
export declare function isElementsQueryOptionsElementsByValue(obj: unknown): obj is IElementsQueryOptionsElementsByValue;

/**
 * Type guard checking whether input is an instance of {@link LimitReached}
 *
 * @public
 */
export declare function isLimitReached(obj: unknown): obj is LimitReached;

/**
 * Type guard checking whether input is an instance of {@link NoDataError}
 *
 * @public
 */
export declare function isNoDataError(obj: unknown): obj is NoDataError;

/**
 * Type guard checking whether input is an instance of {@link NotAuthenticated}
 *
 * @public
 */
export declare function isNotAuthenticated(obj: unknown): obj is NotAuthenticated;

/**
 * Type guard checking whether input is an instance of {@link NotImplemented}
 *
 * @public
 */
export declare function isNotImplemented(obj: unknown): obj is NotImplemented;

/**
 * Type guard checking whether input is an instance of {@link NotSupported}
 *
 * @public
 */
export declare function isNotSupported(obj: unknown): obj is NotSupported;

/**
 * Type guard checking whether input is an instance of {@link ProtectedDataError}
 *
 * @public
 */
export declare function isProtectedDataError(obj: unknown): obj is ProtectedDataError;

/**
 * Type guard checking whether input is an instance of {@link UnexpectedResponseError}
 *
 * @public
 */
export declare function isUnexpectedError(obj: unknown): obj is UnexpectedError;

/**
 * Type guard checking whether input is an instance of {@link UnexpectedResponseError}
 *
 * @public
 */
export declare function isUnexpectedResponseError(obj: unknown): obj is UnexpectedResponseError;

/**
 * Type guard checking whether the object is an instance of {@link IElementsQueryOptionsElementsByValue} or {@link IElementsQueryOptionsElementsByPrimaryDisplayFormValue}.
 *
 * @public
 */
export declare function isValueBasedElementsQueryOptionsElements(obj: unknown): obj is IElementsQueryOptionsElementsByValue | IElementsQueryOptionsElementsByPrimaryDisplayFormValue;

/**
 * Parsed {@link https://help.gooddata.com/pages/viewpage.action?pageId=86795279 | MAQL} text.
 *
 * @remarks
 * See {@link IMeasureExpressionToken} for more information.
 *
 * @public
 */
export declare interface ITextExpressionToken {
    /**
     * Expression token type
     */
    type: "text" | "quoted_text" | "number";
    /**
     * Plain text
     */
    value: string;
}

/**
 * Represents a user. It is an entry point to various services that can be used to inspect and modify the user.
 *
 * @public
 */
export declare interface IUserService {
    /**
     * Returns service that can be used to obtain settings that are currently in effect for the user.
     *
     * @returns user settings service
     */
    settings(): IUserSettingsService;
    /**
     * Returns currently authenticated user
     */
    getUser(): Promise<IUser>;
}

/**
 * Settings for particular user.
 *
 * @public
 */
export declare interface IUserSettings extends ISettings {
    /**
     * User to which the settings belong.
     */
    userId: string;
    /**
     * User locale
     */
    locale: string;
    /**
     * Regional number formatting
     */
    separators: ISeparators;
}

/**
 * This query service provides access to feature flags that are in effect for particular user.
 *
 * @public
 */
export declare interface IUserSettingsService {
    /**
     * Asynchronously queries actual feature flags.
     *
     * @returns promise of the feature flags of the current user
     */
    getSettings(): Promise<IUserSettings>;
    /**
     * Set locale for the current user
     *
     * @param locale - IETF BCP 47 Code locale ID, for example "en-US", "cs-CZ", etc.
     *
     * @returns promise
     */
    setLocale(locale: string): Promise<void>;
}

/**
 * Settings for particular combination of user and workspace.
 *
 * @public
 */
export declare interface IUserWorkspaceSettings extends IUserSettings, IWorkspaceSettings {
}

/**
 * Pair of the widget and it's alert count
 * @alpha
 */
export declare interface IWidgetAlertCount {
    /**
     * Widget reference
     */
    readonly ref: ObjRef;
    /**
     * Number of alerts for the referenced widget
     */
    readonly alertCount: number;
}

/**
 * Contains information about objects that may be referenced by a widget. The contents of this object
 * depend on the widget and the types requested at the time of call to getWidgetReferencedObjects.
 *
 * @alpha
 */
export declare interface IWidgetReferences {
    /**
     * If requested, measures referenced by the widget will be returned here.
     * If none of them were requested, the catalogItems will be undefined.
     */
    catalogItems?: CatalogItem[];
}

/**
 * Widget with it's layout path
 * @alpha
 */
export declare interface IWidgetWithLayoutPath<TWidget = IDashboardWidget> {
    path: LayoutPath;
    widget: TWidget;
}

/**
 * Service to manage access to the objects.
 *
 * @alpha
 */
export declare interface IWorkspaceAccessControlService {
    getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]>;
    grantAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void>;
    revokeAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void>;
    /**
     * Function that allows to change access (add, edit, revoke) to an object for multiple grantees.
     * If the grantee permissions array is empty, the access is revoked. Otherwise, it is set to the
     * permissions in the array.
     *
     * If backend does not support granular permissions, the array content is used only to check if
     * access should be granted or revoked.
     *
     * @param sharedObject - the ref of object that will have access changed
     * @param grantees - list of grantees that will have access changed for the shared object
     */
    changeAccess(sharedObject: ObjRef, grantees: IGranularAccessGrantee[]): Promise<void>;
    /**
     * Get list of available grantees for the shared object.
     * @param sharedObject - the ref of object that will have access changed
     * @param search - optional string used to limit the results (matched against name of user group,
     *  or first name, last name, or email of user).
     */
    getAvailableGrantees(sharedObject: ObjRef, search?: string): Promise<IAvailableAccessGrantee[]>;
}

/**
 * Service for querying additional attributes and attribute display forms data, and their elements.
 *
 * @remarks
 * If you want to query attributes themselves, use catalog {@link IWorkspaceCatalogFactory}
 *
 * @public
 */
export declare interface IWorkspaceAttributesService {
    /**
     * Returns service that can be used to query attribute elements for attributes defined in this workspace.
     *
     * @remarks
     * For instance if workspace has data set Employee with attribute Name, then this service can be used to retrieve
     * names of all employees.
     */
    elements(): IElementsQueryFactory;
    /**
     * Gets the attribute display form with the provided identifier.
     * @param ref - ref of the attribute display form to retrieve
     * @returns promise of attribute display form metadata object
     */
    getAttributeDisplayForm(ref: ObjRef): Promise<IAttributeDisplayFormMetadataObject>;
    /**
     * Gets the list of metadata of attribute display form with the provided list of uris or identifiers. (list of object refs).
     *
     * @remarks
     * If a display form referenced by any of the refs does not exist, then the call must not fail and instead return only
     * those display forms that exist.
     *
     * @param refs - list of refs of the attribute display form to retrieve.
     * @returns promise of list of attribute display form metadata object.
     */
    getAttributeDisplayForms(refs: ObjRef[]): Promise<IAttributeDisplayFormMetadataObject[]>;
    /**
     * Gets metadata of the attribute for particular display form reference.
     *
     * @param ref - ref of the display form to retrieve attribute for
     * @returns promise of attribute metadata object
     */
    getAttributeByDisplayForm(ref: ObjRef): Promise<IAttributeMetadataObject>;
    /**
     * Gets metadata of the attribute.
     *
     * @param ref - ref of the attribute to retrieve
     * @returns promise of attribute metadata object
     */
    getAttribute(ref: ObjRef): Promise<IAttributeMetadataObject>;
    /**
     * Gets the list of metadata of attribute with the provided list of uris. (list of object refs)
     *
     * @remarks
     * If a display form referenced by any of the refs does not exist, then the call must not fail and instead return only
     * those display forms that exist.
     *
     * @param refs - list of refs of the attribute to retrieve.
     * @returns promise of list of attribute metadata object.
     */
    getAttributes(refs: ObjRef[]): Promise<IAttributeMetadataObject[]>;
    /**
     * Request list of attributes that are "center of star" for the input attributes in the data model.
     *
     * @param attributeRefs - input list of attribute references
     * @returns promise returning list of attribute references.
     * It can be one of the input attributes or another attribute(s)
     * that connects the input attributes in the data model.
     */
    getCommonAttributes(attributeRefs: ObjRef[]): Promise<ObjRef[]>;
    /**
     * Request the "center of star" for multiple series of attributes.
     *
     * @param attributesRefsBatch - input batch of list of attribute references
     * @returns promise returning batch of attribute references.
     */
    getCommonAttributesBatch(attributesRefsBatch: ObjRef[][]): Promise<ObjRef[][]>;
    /**
     * Get information about the given attribute's dataset
     * @param ref - ref of the attribute
     * @returns promise of metadata object
     */
    getAttributeDatasetMeta(ref: ObjRef): Promise<IMetadataObject>;
}

/**
 * Instance of workspace catalog with loaded items
 *
 * @public
 */
export declare interface IWorkspaceCatalog extends IWorkspaceCatalogMethods {
    /**
     * Get only items that are valid for specific insight or execution items.
     *
     * @returns catalog available items factory
     */
    availableItems(): IWorkspaceCatalogAvailableItemsFactory;
}

/**
 * Service to obtain only valid items for a particular execution or insight.
 *
 * @remarks
 * This is useful for interactive insight/execution creation.
 * (catalog will offer you only valid items that you can add to your insight/execution)
 *
 * @public
 */
export declare interface IWorkspaceCatalogAvailableItemsFactory extends IWorkspaceCatalogFactoryMethods<IWorkspaceCatalogAvailableItemsFactory, IWorkspaceCatalogWithAvailableItemsFactoryOptions> {
    /**
     * Setup catalog to fetch only items that are valid for the provided execution items
     *
     * @param items - execution items
     * @returns catalog available items factory
     */
    forItems(items: IAttributeOrMeasure[]): IWorkspaceCatalogAvailableItemsFactory;
    /**
     * Setup catalog to fetch only items that are valid for the provided insight definition
     *
     * @param insight - insight definition
     * @returns catalog available items factory
     */
    forInsight(insight: IInsightDefinition): IWorkspaceCatalogAvailableItemsFactory;
    /**
     * Fetch available catalog items for the current setup
     *
     * @returns promise of catalog with loaded available items
     */
    load(): Promise<IWorkspaceCatalogWithAvailableItems>;
}

/**
 * Catalog is useful for:
 * - Interactive insight/execution creation
 * - Exporting execution model for a specific workspace
 *
 * @public
 */
export declare interface IWorkspaceCatalogFactory extends IWorkspaceCatalogFactoryMethods<IWorkspaceCatalogFactory, IWorkspaceCatalogFactoryOptions> {
    /**
     * Workspace whose catalog is being loaded.
     */
    readonly workspace: string;
    /**
     * Options set for the loader so far.
     */
    readonly options: IWorkspaceCatalogFactoryOptions;
    /**
     * Get catalog items for the current configuration.
     * Returns items that are either not "unlisted" or that are created by the current user.
     *
     * @returns promise of catalog with loaded items
     */
    load(): Promise<IWorkspaceCatalog>;
}

/**
 * Common methods for catalog configuration
 *
 * @public
 */
export declare interface IWorkspaceCatalogFactoryMethods<TFactory, TOptions> {
    /**
     * Setup catalog to fetch only items of the provided dataset
     *
     * @param dataset - dataset reference
     * @returns catalog factory
     */
    forDataset(dataset: ObjRef): TFactory;
    /**
     * Setup catalog to fetch only items of the provided types (attribute, measure, fact or dateDataset)
     *
     * @param types - catalog item types
     * @returns catalog factory
     */
    forTypes(types: CatalogItemType[]): TFactory;
    /**
     * Setup catalog to fetch only items with provided tags
     *
     * @param tags - tags references
     * @returns catalog factory
     */
    includeTags(tags: ObjRef[]): TFactory;
    /**
     * Setup catalog to fetch only items without provided tags
     *
     * @param tags - tags references
     * @returns catalog factory
     */
    excludeTags(tags: ObjRef[]): TFactory;
    /**
     * Setup whether catalog should fetch groups.
     * Default: true
     *
     * @param loadGroups - should fetch groups
     * @returns catalog factory
     */
    withGroups(loadGroups: boolean): TFactory;
    /**
     * Setup catalog to fetch only items for specific options
     *
     * @param options - catalog options
     * @returns catalog factory
     */
    withOptions(options: Partial<TOptions>): TFactory;
}

/**
 * Configuration options for querying catalog items
 *
 * @public
 */
export declare interface IWorkspaceCatalogFactoryOptions {
    /**
     * Get catalog items from a specific dataset
     */
    dataset?: ObjRef;
    /**
     * Get catalog items of specific types (attribute, measure, fact, dateDataset or attributeHierarchy)
     * Default: ["attribute", "measure", fact", "dateDataset", "attributeHierarchy"]
     */
    types: CatalogItemType[];
    /**
     * Get catalog items that have reference to specific tags.
     * This is commonly used to obtain catalog items from specific group(s).
     */
    includeTags: ObjRef[];
    /**
     * Get catalog items that don't have reference to specific tags
     * Use this to obtain catalog items that are not included in specific group(s).
     */
    excludeTags: ObjRef[];
    /**
     * When true, get only production ready catalog items.
     * When false, get only non-production ready catalog items.
     * Otherwise, return both.
     * Default: undefined
     */
    production?: boolean;
    /**
     * Optional list of additional date dataset granularities that must be added by backend to the
     * ones returned by default.
     * Default: undefined
     */
    includeDateGranularities?: string[];
    /**
     * Should catalog fetch groups?
     * Default: true
     */
    loadGroups?: boolean;
}

/**
 * Common methods to obtain catalog items
 *
 * @public
 */
export declare interface IWorkspaceCatalogMethods {
    /**
     * Get all catalog groups
     *
     * @returns array of catalog groups
     */
    groups(): ICatalogGroup[];
    /**
     * Get all catalog items
     *
     * @returns array of catalog items
     */
    allItems(): CatalogItem[];
    /**
     * Get all catalog attributes
     *
     * @returns array of catalog attribtues
     */
    attributes(): ICatalogAttribute[];
    /**
     * Get all catalog measures
     *
     * @returns array of catalog measures
     */
    measures(): ICatalogMeasure[];
    /**
     * Get all catalog facts
     *
     * @returns array of catalog facts
     */
    facts(): ICatalogFact[];
    /**
     * Get all catalog date datasets
     *
     * @returns array of catalog date datasets
     */
    dateDatasets(): ICatalogDateDataset[];
    /**
     * Get all catalog attribute hierarchies
     *
     * @returns array of catalog attribute hierarchies
     */
    attributeHierarchies(): ICatalogAttributeHierarchy[];
}

/**
 * Instance of workspace catalog with loaded available items.
 *
 * @public
 */
export declare interface IWorkspaceCatalogWithAvailableItems extends IWorkspaceCatalogMethods {
    /**
     * Get all available catalog items
     *
     * @returns array of available catalog items
     */
    allAvailableItems(): CatalogItem[];
    /**
     * Get all available catalog attributes
     *
     * @returns array of available catalog attributes
     */
    availableAttributes(): ICatalogAttribute[];
    /**
     * Get all available catalog measures
     *
     * @returns array of available catalog measures
     */
    availableMeasures(): ICatalogMeasure[];
    /**
     * Get all available catalog facts
     *
     * @returns array of available catalog facts
     */
    availableFacts(): ICatalogFact[];
    /**
     * Get all available catalog date datasets
     *
     * @returns array of available catalog date datasets
     */
    availableDateDatasets(): ICatalogDateDataset[];
    /**
     * Get all available catalog attribute hierarchies
     *
     * @returns array of available catalog attribute hierarchies
     */
    availableAttributeHierarchies(): ICatalogAttributeHierarchy[];
}

/**
 * Configuration options for querying catalog available items
 *
 * @public
 */
export declare interface IWorkspaceCatalogWithAvailableItemsFactoryOptions extends IWorkspaceCatalogFactoryOptions {
    /**
     * Get only catalog items that are available for the provided execution items
     */
    items?: IAttributeOrMeasure[];
    /**
     * Get only items that are available for the provided insight
     */
    insight?: IInsightDefinition;
}

/**
 * Service to list, create and update analytical dashboards
 *
 * @alpha
 */
export declare interface IWorkspaceDashboardsService {
    readonly workspace: string;
    /**
     * Gets all dashboards available in current workspace.
     *
     * @param options - Specify additional options
     * @returns promise of list of the dashboards
     */
    getDashboards(options?: IGetDashboardOptions): Promise<IListedDashboard[]>;
    /**
     * Load dashboard by its reference,
     * and override filter context with the given custom filter context
     * (custom filter context is used mainly for exporting)
     *
     * @param ref - dashboard ref
     * @param filterContextRef - Override dashboard filter context with the custom filter context
     * (This allows to modify filter context when exporting the dashboard)
     * @param options - Specify additional options
     * @returns promise of the dashboard
     */
    getDashboard(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions): Promise<IDashboard>;
    /**
     * Loads a dashboard and objects that the dashboard references.
     *
     * @param ref - dashboard ref
     * @param filterContextRef - Override dashboard filter context with the custom filter context
     * (This allows to modify filter context when exporting the dashboard)
     * @param options - Specify additional options
     * @param types - types of dashboard references to load; if the types are undefined, the service
     *  must default to loading insights related to the dashboard
     * @returns promise of the dashboard and references
     */
    getDashboardWithReferences(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardWithReferences>;
    /**
     * Get objects referenced by a given dashboard.
     *
     * @param dashboard - dashboard to get referenced objects for
     * @param types - optional array of object types to include, when not specified, all supported references will
     *  be retrieved
     */
    getDashboardReferencedObjects(dashboard: IDashboard, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardReferences>;
    /**
     * Create and save dashboard for the provided dashboard definition
     *
     * @param dashboard - dashboard definition
     * @returns promise of the created dashboard
     */
    createDashboard(dashboard: IDashboardDefinition): Promise<IDashboard>;
    /**
     * Update dashboard
     *
     * @param dashboard - original dashboard before modifications
     * @param updatedDashboard - modified dashboard
     * @returns promise of the updated dashboard
     */
    updateDashboard(dashboard: IDashboard, updatedDashboard: IDashboardDefinition): Promise<IDashboard>;
    /**
     * Delete dashboard
     *
     * @param ref - dashboard reference
     * @returns promise
     */
    deleteDashboard(ref: ObjRef): Promise<void>;
    /**
     * Export dashboard to pdf. You can override dashboard filters with custom filters.
     * When no custom filters are set, the persisted dashboard filters will be used.
     *
     * PDF file is downloaded and attached as Blob data to the current window instance.
     *
     * @param ref - dashboard reference
     * @param filters - Override stored dashboard filters with custom filters
     * @returns promise with object URL pointing to a Blob data of downloaded exported dashboard
     */
    exportDashboardToPdf(ref: ObjRef, filters?: FilterContextItem[]): Promise<IExportResult>;
    /**
     * Create scheduled mail for the dashboard
     *
     * @param scheduledMail - scheduled email definition
     * @param exportFilterContext - override dashboard filter context with the custom filter context during the export
     * @returns promise of the created scheduled email
     */
    createScheduledMail(scheduledMail: IScheduledMailDefinition, exportFilterContext?: IFilterContextDefinition): Promise<IScheduledMail>;
    /**
     * Update existing scheduled mail for the dashboard
     *
     * @param ref - reference to the existing scheduled email object
     * @param scheduledMail - scheduled email definition
     * @param filterContextRef - optional reference to an existing filter context to be used in all attachments
     * @returns promise of the updated scheduled email
     */
    updateScheduledMail(ref: ObjRef, scheduledMail: IScheduledMailDefinition, filterContextRef?: ObjRef): Promise<void>;
    /**
     * Delete scheduled mail
     *
     * @param ref - scheduled email reference
     * @returns promise
     */
    deleteScheduledMail(ref: ObjRef): Promise<void>;
    /**
     * Get scheduled emails for particular dashboard
     *
     * @param ref - dashboard reference
     * @param options - specify additional options
     * @returns promise with scheduled emails connected to the dashboard
     */
    getScheduledMailsForDashboard(ref: ObjRef, options?: IGetScheduledMailOptions): Promise<IScheduledMail[]>;
    /**
     * Get the number of scheduled emails for particular dashboard
     *
     * @param ref - dashboard reference
     * @returns promise with the number of scheduled emails connected to the dashboard
     */
    getScheduledMailsCountForDashboard(ref: ObjRef): Promise<number>;
    /**
     * Get all widget alerts for the current user
     *
     * @returns promise with all user widget alerts
     */
    getAllWidgetAlertsForCurrentUser(): Promise<IWidgetAlert[]>;
    /**
     * Get all widget alerts for the current user for the given dashboard
     *
     * @param ref - dashboard reference
     * @returns promise with all user widget alerts for the dashboard
     */
    getDashboardWidgetAlertsForCurrentUser(ref: ObjRef): Promise<IWidgetAlert[]>;
    /**
     * Get the number of widget alerts (created by any user) for particular widgets
     *
     * @param refs - widget references
     * @returns promise with array of pairs of widget ref and alert count
     */
    getWidgetAlertsCountForWidgets(refs: ObjRef[]): Promise<IWidgetAlertCount[]>;
    /**
     * Create widget alert for the provided widget alert definition
     *
     * @param alert - widget alert definition
     * @returns promise with the created alert
     */
    createWidgetAlert(alert: IWidgetAlertDefinition): Promise<IWidgetAlert>;
    /**
     * Update widget alert
     *
     * @param alert - updated widget alert
     * @returns promise with the updated alert
     */
    updateWidgetAlert(alert: IWidgetAlert | IWidgetAlertDefinition): Promise<IWidgetAlert>;
    /**
     * Delete widget alert with the given reference
     *
     * @param ref - widget alert reference
     * @returns promise
     */
    deleteWidgetAlert(ref: ObjRef): Promise<void>;
    /**
     * Widget alerts bulk delete
     *
     * @param refs - widget alerts references
     * @returns promise
     */
    deleteWidgetAlerts(refs: ObjRef[]): Promise<void>;
    /**
     * Get all metadata objects referenced by a given widget.
     *
     * @param widget - widget to get referenced objects for
     * @param types - optional array of object types to include, when not specified, all supported references will
     *  be retrieved
     */
    getWidgetReferencedObjects(widget: IWidget, types?: SupportedWidgetReferenceTypes[]): Promise<IWidgetReferences>;
    /**
     * Takes a widget and a list of filters and returns filters that can be used for the widget.
     * - for attribute filters, these are filters that should NOT be ignored according to the ignoreDashboardFilters property.
     * - for date filters it is the last filter with the same date dimension as specified in dateDataSet property.
     *
     * The implementation MUST take different ObjRef types into account, for example if an incoming filter
     * uses idRef and an ignoreDashboardFilters item uses uriRef but they point to the same metadata object,
     * the filter MUST NOT be included in the result.
     *
     * @param widget - widget to get filters for
     * @param filters - filters to apply on the widget
     * @returns promise with the filters with the ignored filters removed
     */
    getResolvedFiltersForWidget(widget: IWidget, filters: IFilter[]): Promise<IFilter[]>;
    /**
     * Gets all dashboard plugins registered in the current workspace.
     *
     * @param options - options that specify how the plugin should be loaded
     */
    getDashboardPlugins(options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin[]>;
    /**
     * Load dashboard plugin by it's reference.
     *
     * @param ref - plugin reference
     * @param options - options that specify how the plugin should be loaded
     */
    getDashboardPlugin(ref: ObjRef, options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin>;
    /**
     * Creates a record about a dashboard plugin. Creating a new dashboard plugin does not impact any
     * existing dashboards in the workspace.
     *
     * In order to use a plugin on a dashboard, you need to create a link between the dashboard and the
     * plugin. Multiple dashboards may link to a single plugin; each dashboard may link to the plugin with
     * different plugin-specific parameters.
     *
     * @remarks
     * Analytical Backend only allows creating new dashboard plugins or deleting existing plugins. The goal
     * behind this decision is to encourage safe, phased rollout of new plugin versions. You must first
     * create a new dashboard plugin and then explicitly start using this new version on dashboards in
     * order for changes to take effect.
     *
     * @param plugin - definition of plugin to create
     */
    createDashboardPlugin(plugin: IDashboardPluginDefinition): Promise<IDashboardPlugin>;
    /**
     * Deletes a record about a dashboard plugin from the backend.
     *
     * @remarks
     * -  some backend implementations may reject to delete a dashboard plugin that is used on existing dashboards
     *
     * @param ref - reference to plugin to
     */
    deleteDashboardPlugin(ref: ObjRef): Promise<void>;
    /**
     * Get current user's permissions to the dashboard.
     *
     * @param ref - dashboard reference
     */
    getDashboardPermissions(ref: ObjRef): Promise<IDashboardPermissions>;
    /**
     * Checks whether dashboards exist for current user. Returns sanitized array of existing dashboards according to user's
     * permissions to access or drill to them.
     *
     * @param dashboardRefs - dashboard references to validate
     */
    validateDashboardsExistence(dashboardRefs: ObjRef[]): Promise<IExistingDashboard[]>;
}

/**
 * Service for querying workspace datasets
 *
 * @public
 */
export declare interface IWorkspaceDatasetsService {
    /**
     * Receive all workspace csv datasets
     *
     * @returns promise of workspace csv datasets
     */
    getDatasets(): Promise<IDataset[]>;
    /**
     * Receive all workspace datasets metadata
     *
     * @returns promise of workspace datasets metadata
     */
    getAllDatasetsMeta(): Promise<IMetadataObject[]>;
}

/**
 * Workspace descriptor contains details about the analytical workspace.
 *
 * @public
 */
export declare interface IWorkspaceDescriptor {
    id: string;
    title: string;
    description: string;
    isDemo?: boolean;
    /**
     * Prefix used by current workspace
     */
    prefix?: string;
    /**
     * Identifier of the parent workspace
     */
    parentWorkspace?: string;
    /**
     * Prefixes of parent workspaces
     */
    parentPrefixes?: string[];
}

/**
 * Service for querying additional facts data.
 * If you want to query facts themselves, use catalog {@link IWorkspaceCatalogFactory}
 *
 * @public
 */
export declare interface IWorkspaceFactsService {
    /**
     * Get information about the given fact's dataset
     * @param ref - ref of the fact
     * @returns promise of metadata object
     */
    getFactDatasetMeta(ref: ObjRef): Promise<IMetadataObject>;
}

/**
 * Service to query, update or delete insights, and other methods related to insights.
 * Check IInsight for more details.
 *
 * @public
 */
export declare interface IWorkspaceInsightsService {
    /**
     * Request visualization class for the given reference
     *
     * @param ref - visualization class reference
     * @returns promise of visualization class
     */
    getVisualizationClass(ref: ObjRef): Promise<IVisualizationClass>;
    /**
     * Request all visualization classes
     *
     * @param options - specify additional options
     * @returns promise of visualization classes
     */
    getVisualizationClasses(options?: IGetVisualizationClassesOptions): Promise<IVisualizationClass[]>;
    /**
     * Request insight for the given reference
     *
     * @param ref - insight reference
     * @param options - specify additional options
     * @returns promise of insight
     */
    getInsight(ref: ObjRef, options?: IGetInsightOptions): Promise<IInsight>;
    /**
     * Queries workspace insights, using various criteria and paging settings.
     *
     * @param options - query options; if not specified defaults to no sorting, no filtering and 50 items per page
     * @returns paged results, empty page with zero total count if there are no insights stored in the workspace
     */
    getInsights(options?: IInsightsQueryOptions): Promise<IInsightsQueryResult>;
    /**
     * Create and save insight for the provided insight definition
     *
     * @param insight - insight definition
     * @returns promise of created insight
     */
    createInsight(insight: IInsightDefinition): Promise<IInsight>;
    /**
     * Update provided insight
     *
     * @param insight - insight to update
     * @returns promise of updated insight
     */
    updateInsight(insight: IInsight): Promise<IInsight>;
    /**
     * Delete insight with the given reference
     *
     * @param ref - ref of the insight to delete
     * @returns promise of undefined
     */
    deleteInsight(ref: ObjRef): Promise<void>;
    /**
     * Get all metadata objects referenced by a given insight.
     *
     * @param insight - insight to get referenced objects for
     * @param types - optional array of object types to include, when not specified, all supported references will
     *  be retrieved
     */
    getInsightReferencedObjects(insight: IInsight, types?: SupportedInsightReferenceTypes[]): Promise<IInsightReferences>;
    /**
     * Get all metadata objects which uses specified object(ie. object is used by these objects) by a given reference.
     *
     * @param ref - ref of the insight to get referencing objects for
     */
    getInsightReferencingObjects(ref: ObjRef): Promise<IInsightReferencing>;
    /**
     * Get insight with the filters provided merged with the filters specified by the insight itself.
     *
     * @param insight - insight to start with
     * @param filters - filters to merge
     * @returns promise of new insight with the filters merged in
     */
    getInsightWithAddedFilters<T extends IInsightDefinition>(insight: T, filters: IFilter[]): Promise<T>;
}

/**
 * Service for create, update or delete measures and querying additional measures data.
 * If you want to query measures themselves, use catalog {@link IWorkspaceCatalogFactory}
 *
 * @public
 */
export declare interface IWorkspaceMeasuresService {
    /**
     * Get measure expression tokens for provided measure identifier
     * @param ref - ref of the measure
     * @returns promise of measure expression tokens
     */
    getMeasureExpressionTokens(ref: ObjRef): Promise<IMeasureExpressionToken[]>;
    /**
     * Create and save measure for the provided measure definition
     *
     * @param measure - measure definition
     * @returns promise of created measure
     */
    createMeasure(measure: IMeasureMetadataObjectDefinition): Promise<IMeasureMetadataObject>;
    /**
     * Update provided measure
     *
     * @param measure - measure to update
     * @returns promise of updated measure
     */
    updateMeasure(measure: IMeasureMetadataObject): Promise<IMeasureMetadataObject>;
    /**
     * Delete measure with the given reference
     *
     * @param measureRef - ref of the measure to delete
     * @returns promise of undefined
     */
    deleteMeasure(measureRef: ObjRef): Promise<void>;
    /**
     * Get all metadata objects which uses specified object (ie. object is used by these objects) by a given reference.
     *
     * @param measureRef - ref of the measure to check
     * @returns promise of references
     */
    getMeasureReferencingObjects(measureRef: ObjRef): Promise<IMeasureReferencing>;
}

/**
 * Service to query workspace permissions
 *
 * @public
 */
export declare interface IWorkspacePermissionsService {
    /**
     * Request workspace permissions for the currently authenticated user
     *
     * @returns promise of user workspace permissions
     */
    getPermissionsForCurrentUser(): Promise<IWorkspacePermissions>;
}

/**
 * Settings for particular workspace.
 *
 * @public
 */
export declare interface IWorkspaceSettings extends ISettings {
    /**
     * Workspace to which the settings belong.
     */
    workspace: string;
    /**
     * Stores Mapbox token used for WS
     */
    mapboxToken?: string;
}

/**
 * This query service provides access to feature flags that are in effect for particular workspace.
 *
 * @public
 */
export declare interface IWorkspaceSettingsService {
    /**
     * Asynchronously queries actual feature flags.
     *
     * @returns promise of workspace settings
     */
    getSettings(): Promise<IWorkspaceSettings>;
    /**
     * Asynchronously queries feature flags taking into account settings from both the workspace and the current user.
     *
     * @returns promise of user/workspace settings
     */
    getSettingsForCurrentUser(): Promise<IUserWorkspaceSettings>;
    /**
     * Sets locale for current workspace.
     *
     * @param locale - IETF BCP 47 Code locale ID, for example "en-US", "cs-CZ", etc.
     *
     * @returns promise
     */
    setLocale(locale: string): Promise<void>;
}

/**
 * Query to retrieve available workspaces.
 *
 * @public
 */
export declare interface IWorkspacesQuery {
    /**
     * Sets a limit on how many items to retrieve at once.
     * @param limit - how many items to retrieve at most
     *
     * @public
     */
    withLimit(limit: number): IWorkspacesQuery;
    /**
     * Sets a number of items to skip.
     * @param offset - how many items to skip
     */
    withOffset(offset: number): IWorkspacesQuery;
    /**
     * Sets a identifier of the parent workspace to get its children, otherwise the root workspace.
     * @param workspaceId - identifier of the parent workspace
     */
    withParent(workspaceId: string | undefined): IWorkspacesQuery;
    /**
     * Sets a text to search.
     * @param search - text to search
     */
    withSearch(search: string): IWorkspacesQuery;
    /**
     * Executes the query and returns the result asynchronously.
     */
    query(): Promise<IWorkspacesQueryResult>;
}

/**
 * Factory providing creating queries used to get available workspaces.
 *
 * @public
 */
export declare interface IWorkspacesQueryFactory {
    /**
     * Creates a query for workspaces available to the specified user.
     *
     * @param userId - id of the user to retrieve workspaces for
     * @public
     */
    forUser(userId: string): IWorkspacesQuery;
    /**
     * Creates a query for workspaces available to the user currently logged in.
     *
     * @public
     */
    forCurrentUser(): IWorkspacesQuery;
}

/**
 * Paged resource with results of a workspace query.
 *
 * @public
 */
export declare type IWorkspacesQueryResult = IPagedResource<IAnalyticalWorkspace>;

/**
 * This service provides access to workspace styling settings such as color palette.
 *
 * @remarks
 * The contract here is that styling settings ARE applied in Analytical Designer and Dashboard applications and
 * so any SDK code that embeds entities created by those applications MUST also use the same styling settings in
 * order to maintain consistent user experience.
 *
 * @public
 */
export declare interface IWorkspaceStylingService {
    /**
     * Asynchronously returns items in the color palette.
     *
     * @returns promise of color palette
     */
    getColorPalette(): Promise<IColorPalette>;
    /**
     * Asynchronously returns theme.
     *
     * @returns promise of theme
     */
    getTheme(): Promise<ITheme>;
}

/**
 * Service to query user groups for current workspace
 *
 * @alpha
 */
export declare interface IWorkspaceUserGroupsQuery {
    /**
     * Starts the user groups query.
     *
     * @returns promise with a list of all user groups matching the specified options
     */
    query(options: IWorkspaceUserGroupsQueryOptions): Promise<IWorkspaceUserGroupsQueryResult>;
}

/**
 * Configuration options for querying user groups
 *
 * @alpha
 */
export declare interface IWorkspaceUserGroupsQueryOptions {
    /**
     * String prefix filter
     */
    search?: string;
    /**
     * Specify (zero-based) starting offset for the results.
     */
    offset?: number;
    /**
     * Specify number of items per page.
     */
    limit?: number;
}

/**
 * Paged result of user groups query. Last page of data returns empty items.
 *
 * @alpha
 */
export declare type IWorkspaceUserGroupsQueryResult = IPagedResource<IWorkspaceUserGroup>;

/**
 * Service to query users for current workspace
 *
 * @public
 */
export declare interface IWorkspaceUsersQuery {
    /**
     * Allows to specify advanced options for the users query.
     *
     * @param options - advanced options
     * @returns users query
     */
    withOptions(options: IWorkspaceUsersQueryOptions): IWorkspaceUsersQuery;
    /**
     * Starts the users query.
     *
     * @returns promise with a list of all users matching the specified options
     */
    queryAll(): Promise<IWorkspaceUser[]>;
    /**
     * Starts the users query.
     *
     * @returns promise of first page of the results
     */
    query(): Promise<IWorkspaceUsersQueryResult>;
}

/**
 * Configuration options for querying users
 *
 * @public
 */
export declare interface IWorkspaceUsersQueryOptions {
    /**
     * Structured prefix filter
     * - disjunctions are separated by colon (',')
     * - conjunctions are separated by space (' ')
     * - basic form match, if it matches as prefix to any of firstName, lastName and email
     */
    search?: string;
    /**
     * Specify (zero-based) starting offset for the paged results.
     */
    offset?: number;
    /**
     * Specify number of items per page.
     *
     * @remarks
     * Default value is 1000
     */
    limit?: number;
}

/**
 * Paged result of users query. Last page of data returns empty items.
 *
 * @public
 */
export declare type IWorkspaceUsersQueryResult = IPagedResource<IWorkspaceUser>;

/**
 * Represents nested path in layout
 * It's useful to track the layout location of the widget
 * Example: ["sections", 0, "items", 2, "widget"] points to the third item widget in first section
 * @alpha
 */
export declare type LayoutPath = Array<string | number>;

/**
 * @alpha
 */
export declare function layoutWidgets<TWidget extends IDashboardWidget>(layout: IDashboardLayout<TWidget>): Array<IWidgetDefinition | IWidget>;

/**
 * Get all dashboard widgets
 * (layout does not only specify rendering, but also all used widgets)
 *
 * @alpha
 * @param layout - dashboard layout
 * @param collectedWidgets - bag for collecting widgets recursively from the layout
 * @returns - widgets with layout paths
 */
export declare function layoutWidgetsWithPaths<TWidget extends IDashboardWidget>(layout: IDashboardLayout<TWidget>): IWidgetWithLayoutPath<TWidget>[];

/**
 * This exception is thrown when the limit of objects that can be created on backend is reached, for example
 * if no more workspaces can be created because of the plan limits.
 *
 * @public
 */
export declare class LimitReached extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}

/**
 * This exception MUST be thrown when the backend execution identifies that there is no data to
 * calculate.
 *
 * @public
 */
export declare class NoDataError extends AnalyticalBackendError {
    /**
     * Empty data view MAY be included by the backend in case execution metadata and data view metadata is present.
     */
    readonly dataView?: IDataView;
    constructor(message: string, dataView?: IDataView, cause?: Error);
}

/**
 * This exception is thrown when client code triggers an operation which requires authentication but the client
 * code did not provide credentials or the credentials are invalid.
 *
 * @public
 */
export declare class NotAuthenticated extends AnalyticalBackendError {
    authenticationFlow?: AuthenticationFlow;
    /**
     * More detailed reason of the NotAuthenticated error. See {@link NotAuthenticatedReason} for more information.
     *
     * @remarks
     * MAY be undefined if the particular backend implementation does not provide this value.
     */
    reason?: NotAuthenticatedReason;
    constructor(message: string, cause?: Error, reason?: NotAuthenticatedReason);
}

/**
 * Type of the function to be called when the Analytical Backend raises a {@link NotAuthenticated} error.
 * See {@link IAuthenticationProvider.onNotAuthenticated} for more details.
 *
 * @public
 */
export declare type NotAuthenticatedHandler = (context: IAuthenticationContext, error: NotAuthenticated) => void;

/**
 * More detailed reason of the NotAuthenticated error.
 *
 * @remarks
 * - invalid_credentials - the provided credentials were invalid
 * - credentials_expired - the credentials' validity expired
 *
 * @public
 */
export declare type NotAuthenticatedReason = "invalid_credentials" | "credentials_expired";

/**
 * This exception is thrown when client code asks Analytical Backend to exercise a feature that is not
 * implemented yet.
 * @public
 */
export declare class NotImplemented extends AnalyticalBackendError {
    constructor(message: string);
}

/**
 * This exception is thrown when client code asks Analytical Backend to exercise an unsupported feature.
 *
 * @public
 */
export declare class NotSupported extends AnalyticalBackendError {
    constructor(message: string);
}

/**
 * Prepares execution of the provided definition against a backend.
 *
 * @remarks
 * This is a convenience function which uses the backend methods to create and prepare an execution.
 *
 * @param definition - execution definition to prepare execution for
 * @param backend - backend to use
 * @returns new prepared execution
 * @public
 */
export declare function prepareExecution(backend: IAnalyticalBackend, definition: IExecutionDefinition): IPreparedExecution;

/**
 * This exception MUST be thrown when backend execution identifies that the data to calculate
 * results for is protected and the caller lacks the sufficient authorization.
 *
 * @public
 */
export declare class ProtectedDataError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}

/**
 * @alpha
 */
export declare type SupportedDashboardReferenceTypes = "insight" | "dashboardPlugin";

/**
 * List of currently supported types of references that can be retrieved using the {@link IWorkspaceInsightsService.getInsightReferencedObjects} function.
 * @public
 */
export declare type SupportedInsightReferenceTypes = Exclude<InsightReferenceTypes, "displayForm" | "variable">;

/**
 * List of currently supported types of references that can be retrieved using getWidgetReferencedObjects()
 * @alpha
 */
export declare type SupportedWidgetReferenceTypes = Exclude<ObjectType, "fact" | "attribute" | "displayForm" | "dataSet" | "tag" | "insight" | "variable" | "colorPalette" | "attributeHierarchy">;

/**
 * This error means that during a repeated polling for some resource, we did not
 * reach 200 response within the certain number of attempts/time.
 *
 * @public
 */
export declare class TimeoutError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}

/**
 * This exception MUST be thrown when the unexpected happens. This is a last-resort error type that SHOULD
 * be used if the erroneous state cannot be categorized in a better way.
 *
 * @public
 */
export declare class UnexpectedError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}

/**
 * This exception MUST be thrown when communication with the backend encounters an unexpected
 * response status code and it cannot handle or categorize it to a known, domain-specific error.
 *
 * @public
 */
export declare class UnexpectedResponseError extends AnalyticalBackendError {
    readonly httpStatus: number;
    readonly responseBody: unknown;
    readonly traceId: string | undefined;
    constructor(message: string, httpStatus: number, responseBody: unknown, traceId?: string, cause?: Error);
}

/**
 * The type of context in which is tested URL valid.
 *
 * @public
 */
export declare type ValidationContext = "CORS" | "UI_EVENT" | "DRILL_TO_URI";

/**
 * Walk dashboard layout
 * This is useful to collect widgets from the layout or perform transforms on the layout
 *
 * @alpha
 * @param layout - dashboard layout
 * @param callbacks - walk callbacks
 * @returns void
 */
export declare function walkLayout<TWidget extends IDashboardWidget>(layout: IDashboardLayout<TWidget>, { sectionCallback, itemCallback, widgetCallback, }: {
    sectionCallback?: (section: IDashboardLayoutSection<TWidget>, sectionPath: LayoutPath) => void;
    itemCallback?: (item: IDashboardLayoutItem<TWidget>, widgetPath: LayoutPath) => void;
    widgetCallback?: (widget: TWidget, widgetPath: LayoutPath) => void;
}, path?: LayoutPath): void;

export { }
