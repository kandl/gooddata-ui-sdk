/**
 * This package provides foundational reusable code useful for building new or decorating existing Analytical Backend implementations.
 *
 * @remarks
 * The package includes several composable backend decorators and metadata object builders.
 * You can use them to either build your own Analytical Backend implementation or enhance existing
 * implementations (by adding caching, for example).
 *
 * @packageDocumentation
 */

import { AttributeModifications } from '@gooddata/sdk-model';
import { CatalogItem } from '@gooddata/sdk-model';
import { CatalogItemType } from '@gooddata/sdk-model';
import { DateAttributeGranularity } from '@gooddata/sdk-model';
import { DimensionGenerator } from '@gooddata/sdk-model';
import { ErrorConverter } from '@gooddata/sdk-backend-spi';
import { ExplainConfig } from '@gooddata/sdk-backend-spi';
import { ExplainType } from '@gooddata/sdk-backend-spi';
import { FilterContextItem } from '@gooddata/sdk-model';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAnalyticalBackendConfig } from '@gooddata/sdk-backend-spi';
import { IAttribute } from '@gooddata/sdk-model';
import { IAttributeDisplayFormMetadataObject } from '@gooddata/sdk-model';
import { IAttributeMetadataObject } from '@gooddata/sdk-model';
import { IAttributeOrMeasure } from '@gooddata/sdk-model';
import { IAuthenticatedPrincipal } from '@gooddata/sdk-backend-spi';
import { IAuthenticationContext } from '@gooddata/sdk-backend-spi';
import { IAuthenticationProvider } from '@gooddata/sdk-backend-spi';
import { IBucket } from '@gooddata/sdk-model';
import { ICatalogAttribute } from '@gooddata/sdk-model';
import { ICatalogAttributeHierarchy } from '@gooddata/sdk-model';
import { ICatalogDateAttribute } from '@gooddata/sdk-model';
import { ICatalogDateDataset } from '@gooddata/sdk-model';
import { ICatalogFact } from '@gooddata/sdk-model';
import { ICatalogGroup } from '@gooddata/sdk-model';
import { ICatalogMeasure } from '@gooddata/sdk-model';
import { IDashboard } from '@gooddata/sdk-model';
import { IDashboardDefinition } from '@gooddata/sdk-model';
import { IDashboardFilterReference } from '@gooddata/sdk-model';
import { IDashboardMetadataObject } from '@gooddata/sdk-model';
import { IDashboardPermissions } from '@gooddata/sdk-model';
import { IDashboardPlugin } from '@gooddata/sdk-model';
import { IDashboardPluginDefinition } from '@gooddata/sdk-model';
import { IDashboardReferences } from '@gooddata/sdk-backend-spi';
import { IDashboardWithReferences } from '@gooddata/sdk-backend-spi';
import { IDataSetMetadataObject } from '@gooddata/sdk-model';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { IDimension } from '@gooddata/sdk-model';
import { IDimensionDescriptor } from '@gooddata/sdk-model';
import { IExecutionConfig } from '@gooddata/sdk-model';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IExecutionFactory } from '@gooddata/sdk-backend-spi';
import { IExecutionResult } from '@gooddata/sdk-backend-spi';
import { IExistingDashboard } from '@gooddata/sdk-model';
import { IExplainProvider } from '@gooddata/sdk-backend-spi';
import { IExportConfig } from '@gooddata/sdk-backend-spi';
import { IExportResult } from '@gooddata/sdk-backend-spi';
import { IFactMetadataObject } from '@gooddata/sdk-model';
import { IFilter } from '@gooddata/sdk-model';
import { IFilterContextDefinition } from '@gooddata/sdk-model';
import { IGetDashboardOptions } from '@gooddata/sdk-backend-spi';
import { IGetDashboardPluginOptions } from '@gooddata/sdk-backend-spi';
import { IGetScheduledMailOptions } from '@gooddata/sdk-backend-spi';
import { IGroupableCatalogItemBase } from '@gooddata/sdk-model';
import { IInsight } from '@gooddata/sdk-model';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { IInsightWidget } from '@gooddata/sdk-model';
import { IInsightWidgetDefinition } from '@gooddata/sdk-model';
import { IKpi } from '@gooddata/sdk-model';
import { IKpiComparisonDirection } from '@gooddata/sdk-model';
import { IKpiComparisonTypeComparison } from '@gooddata/sdk-model';
import { IKpiWidget } from '@gooddata/sdk-model';
import { IKpiWidgetDefinition } from '@gooddata/sdk-model';
import { IListedDashboard } from '@gooddata/sdk-model';
import { IMeasure } from '@gooddata/sdk-model';
import { IMeasureMetadataObject } from '@gooddata/sdk-model';
import { IMetadataObject } from '@gooddata/sdk-model';
import { InsightDrillDefinition } from '@gooddata/sdk-model';
import { INullableFilter } from '@gooddata/sdk-model';
import { IPagedResource } from '@gooddata/sdk-backend-spi';
import { IPostProcessing } from '@gooddata/sdk-model';
import { IPreparedExecution } from '@gooddata/sdk-backend-spi';
import { IResultHeader } from '@gooddata/sdk-model';
import { IScheduledMail } from '@gooddata/sdk-model';
import { IScheduledMailDefinition } from '@gooddata/sdk-model';
import { ISecuritySettingsService } from '@gooddata/sdk-backend-spi';
import { ISettings } from '@gooddata/sdk-model';
import { ISortItem } from '@gooddata/sdk-model';
import { IUser } from '@gooddata/sdk-model';
import { IUserWorkspaceSettings } from '@gooddata/sdk-backend-spi';
import { IVariableMetadataObject } from '@gooddata/sdk-model';
import { IWidget } from '@gooddata/sdk-model';
import { IWidgetAlert } from '@gooddata/sdk-model';
import { IWidgetAlertCount } from '@gooddata/sdk-backend-spi';
import { IWidgetAlertDefinition } from '@gooddata/sdk-model';
import { IWidgetReferences } from '@gooddata/sdk-backend-spi';
import { IWorkspaceAttributesService } from '@gooddata/sdk-backend-spi';
import { IWorkspaceCatalog } from '@gooddata/sdk-backend-spi';
import { IWorkspaceCatalogAvailableItemsFactory } from '@gooddata/sdk-backend-spi';
import { IWorkspaceCatalogFactory } from '@gooddata/sdk-backend-spi';
import { IWorkspaceCatalogFactoryOptions } from '@gooddata/sdk-backend-spi';
import { IWorkspaceDashboardsService } from '@gooddata/sdk-backend-spi';
import { IWorkspaceSettings } from '@gooddata/sdk-backend-spi';
import { IWorkspaceSettingsService } from '@gooddata/sdk-backend-spi';
import { KpiDrillDefinition } from '@gooddata/sdk-model';
import { MeasureBuilder } from '@gooddata/sdk-model';
import { MeasureModifications } from '@gooddata/sdk-model';
import { NotAuthenticated } from '@gooddata/sdk-backend-spi';
import { ObjRef } from '@gooddata/sdk-model';
import { SupportedDashboardReferenceTypes } from '@gooddata/sdk-backend-spi';
import { SupportedWidgetReferenceTypes } from '@gooddata/sdk-backend-spi';
import { ValidationContext } from '@gooddata/sdk-backend-spi';
import { VisualizationProperties } from '@gooddata/sdk-model';

/**
 * Abstract base class that can be extended to implement concrete execution factories for different
 * backend implementations.
 *
 * This class implements the convenience methods which do not need to change in implementations.
 *
 * Note: the `forInsightByRef` is implemented as fallback to freeform execution done by `forInsight`. The
 * rationale is that most backends do not support that anyway so it is a safe default behavior. If the backend
 * supports execute-by-reference, then overload the method with your own implementation (see sdk-backend-bear for
 * inspiration)
 *
 * @internal
 */
export declare abstract class AbstractExecutionFactory implements IExecutionFactory {
    protected readonly workspace: string;
    constructor(workspace: string);
    abstract forDefinition(def: IExecutionDefinition): IPreparedExecution;
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
}

/**
 * Defines callbacks for events that are emitted by with eventing backend decorator.
 *
 * @beta
 */
export declare type AnalyticalBackendCallbacks = {
    /**
     * Called before prepared execution's execute() is called.
     *
     * @param def - definition that will be used for the execution
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    beforeExecute?: (def: IExecutionDefinition, executionId: string) => void;
    /**
     * Called when the execute successfully completes.
     *
     * @param result - execution result (mind that this contains definition already)
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    successfulExecute?: (result: IExecutionResult, executionId: string) => void;
    /**
     * Called when the execute ends with an error.
     *
     * @param error - error from the underlying backend, contractually this should be an instance of AnalyticalBackendError
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    failedExecute?: (error: any, executionId: string) => void;
    /**
     * Called when IExecuteResult.readAll() successfully completes.
     *
     * @param dataView - data view (mind that this contains definition and result already)
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    successfulResultReadAll?: (dataView: IDataView, executionId: string) => void;
    /**
     * Called when IExecuteResult.readAll() ends with an error.
     *
     * @param error - error from the underlying backend, contractually this should be an instance of AnalyticalBackendError
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    failedResultReadAll?: (error: any, executionId: string) => void;
    /**
     * Called when IExecuteResult.readWindow() successfully completes. The function is called with the requested
     * window arguments and the resulting data size (note: requested window & actual window may differ)
     *
     * @param offset - *requested window offset, the actual offset may differ, actual offset is in data view
     * @param size - *request* window size, the actual size may differ, actual size is in data view
     * @param dataView - data view (mind that this contains definition and result already)
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    successfulResultReadWindow?: (offset: number[], size: number[], dataView: IDataView, executionId: string) => void;
    /**
     * Called when IExecuteResult.readWindow() ends with an error. The function is called with the requested
     * window arguments and the error from the underlying backend.
     *
     * @param offset - *requested window offset, the actual offset may differ, actual offset is in data view
     * @param size - *request* window size, the actual size may differ, actual size is in data view
     * @param error - error from the underlying backend, contractually this should be an instance of AnalyticalBackendError
     * @param executionId - unique ID assigned to each execution that can be used to correlate individual events that "belong" to the same execution
     */
    failedResultReadWindow?: (offset: number[], size: number[], error: any, executionId: string) => void;
};

/**
 * This is a noop implementation of authentication provider - it does nothing and assumes anonymous user.
 *
 * @public
 */
export declare class AnonymousAuthProvider implements IAuthProviderCallGuard {
    authenticate(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(_context: IAuthenticationContext): Promise<void>;
    reset(): void;
}

/**
 * @beta
 */
export declare type ApiClientProvider = (config: CustomBackendConfig) => any;

/**
 * Attribute display form metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class AttributeDisplayFormMetadataObjectBuilder<T extends IAttributeDisplayFormMetadataObject = IAttributeDisplayFormMetadataObject> extends MetadataObjectBuilder<T> {
    attribute(ref: ObjRef): this;
    displayFormType(type: string | undefined): this;
    isDefault(value: boolean | undefined): this;
}

/**
 * Attribute metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class AttributeMetadataObjectBuilder<T extends IAttributeMetadataObject = IAttributeMetadataObject> extends MetadataObjectBuilder<T> {
    drillDownStep(ref: ObjRef | undefined): this;
    drillToAttributeLink(ref: ObjRef | undefined): this;
    displayForms(displayForms: IAttributeDisplayFormMetadataObject[]): this;
}

/**
 * @alpha
 */
export declare type AttributesDecoratorFactory = (attributes: IWorkspaceAttributesService, workspace: string) => IWorkspaceAttributesService;

/**
 * Authenticated async call
 *
 * @beta
 */
export declare type AuthenticatedAsyncCall<TSdk, TReturn> = (sdk: TSdk, context: IAuthenticatedAsyncCallContext) => Promise<TReturn>;

/**
 * Authenticated call guard
 *
 * @beta
 */
export declare type AuthenticatedCallGuard<TSdk = any> = <TReturn>(call: AuthenticatedAsyncCall<TSdk, TReturn>, errorConverter?: ErrorConverter) => Promise<TReturn>;

/**
 * This implementation of auth provider ensures, that the auth provider is called exactly once in the happy path
 * execution where provider successfully authenticates a principal.
 *
 * If underlying provider fails, subsequent calls that need authentication will land in the provider.
 *
 * This class encapsulates the stateful nature of interaction of the provider across multiple different instances
 * of the bear backend, all of which are set with the same provider. All instances of the backend should be
 * subject to the same authentication flow AND the call to the authentication provider should be synchronized
 * through this scoped instance.
 *
 * @internal
 */
export declare class AuthProviderCallGuard implements IAuthProviderCallGuard {
    private readonly realProvider;
    private inflightRequest;
    private principal;
    constructor(realProvider: IAuthenticationProvider);
    reset: () => void;
    initializeClient: (client: any) => void;
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate: (context: IAuthenticationContext) => Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(context: IAuthenticationContext): Promise<void>;
}

/**
 * We are using Builder pattern to create sdk-model objects https://en.wikipedia.org/wiki/Builder_pattern
 * Each sdk-model should have its own builder, and you should use it.
 *
 * This class serves to:
 * - unify all builders & builder factories across our codebase
 * - hold all common methods and properties of builders (e.g. item & build)
 *
 * @beta
 */
export declare class Builder<T> implements IBuilder<T> {
    protected item: Partial<T>;
    protected validator?: ((item: Partial<T>) => void) | undefined;
    constructor(item: Partial<T>, validator?: ((item: Partial<T>) => void) | undefined);
    build(): T;
    modify(modifications: BuilderModifications<this, T>): this;
    validate(): this;
}

/**
 * Type that represents generic builder constructor
 *
 * @beta
 */
export declare type BuilderConstructor<TBuilder extends IBuilder<TItem>, TItem> = new (item: Partial<TItem>) => TBuilder;

/**
 * Generic builder factory to create sdk-model objects using builder pattern
 *
 * @beta
 */
export declare function builderFactory<TItem, TBuilder extends Builder<TItem>, TBuilderConstructor extends BuilderConstructor<TBuilder, TItem>>(Builder: TBuilderConstructor, defaultItem: Partial<TItem>, modifications: BuilderModifications<TBuilder, TItem>): TItem;

/**
 * Function that will be called to perform modifications on item before it is fully constructed
 *
 * @beta
 */
export declare type BuilderModifications<TBuilder extends IBuilder<TItem>, TItem = ExtractBuilderType<TBuilder>> = (builder: TBuilder) => TBuilder;

/**
 * Cache control can be used to interact with the caching layer - at the moment to reset the contents of the
 * different top-level caches.
 *
 * @public
 */
export declare type CacheControl = {
    /**
     * Resets all execution caches.
     *
     * NOTE: this only resets the top-level caches. If your code holds onto execution results returned by
     * caching backend, those have additional sub-caches which _will not_ be impacted by this call.
     */
    resetExecutions: () => void;
    /**
     * Resets all catalog caches.
     */
    resetCatalogs: () => void;
    /**
     * Resets all organization security settings caches.
     */
    resetSecuritySettings: () => void;
    /**
     * Resets all workspace attribute caches.
     */
    resetAttributes: () => void;
    /**
     * Resets all workspace settings caches.
     */
    resetWorkspaceSettings: () => void;
    /**
     * Convenience method to reset all caches (calls all the particular resets).
     */
    resetAll: () => void;
};

/**
 * Specifies where should the caching decorator apply and to what size should caches grow.
 *
 * @public
 */
export declare type CachingConfiguration = {
    /**
     * Maximum number of executions which will have their results cached. The execution fingerprint is used
     * as cache key - the caching is thus subject to some limitations. See `defFingerprint` function for more
     * information.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * executions cache is dangerous in applications with long-lived sessions that can create many unique executions -
     * memory usage will only go up.
     *
     * When non-positive number is specified, then no caching will be done.
     */
    maxExecutions?: number;
    /**
     * Maximum number of execution result's pages to cache PER result. The window offset and limit are used as cache key.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * result window cache is dangerous in applications that read result windows in 'random' fashion.
     *
     * When non-positive number is specified, then no caching of result windows will be done.
     *
     * Note: this option has no effect if execution caching is disabled.
     */
    maxResultWindows?: number;
    /**
     * Maximum number of workspaces for which to cache catalogs. The workspace identifier is used as cache key. For
     * each workspace, there will be a cache entry holding `maxCatalogOptions` entries.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * catalogs cache may be OK in applications where number of workspaces is small - the cache will be limited
     * naturally and will not grow uncontrollably.
     *
     * When non-positive number is specified, then no caching of result windows will be done.
     */
    maxCatalogs?: number;
    /**
     * Catalog can be viewed in many different ways - determined by the options specified during load. This option
     * indicates how many unique options to cache results for.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. How dangerous
     * this is depends on how many catalog load options combinations your application allows to create. Recommended
     * approach is to load entire catalog of all items once and reuse it. If there is chance that your app can create
     * many unique options, then it is better to bound this.
     *
     * Setting non-positive number here is invalid. If you want to turn off catalog caching, tweak the `maxCatalogs`.
     */
    maxCatalogOptions?: number;
    /**
     * Specify function to call once the caching is set up. If present, the function will be called
     * with an instance of {@link CacheControl} which you can use to interact with the caches.
     *
     * @param cacheControl - cache control instance
     */
    onCacheReady?: (cacheControl: CacheControl) => void;
    /**
     * Maximum number of organizations that will have its security settings cached. The scope string built by
     * particular backend implementation from organization ID will be used as cache key.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * security settings organization cache is dangerous in applications with long-lived sessions that can
     * create many unique requests and memory usage will only go up.
     *
     * When non-positive number is specified, then no caching will be done.
     */
    maxSecuritySettingsOrgs?: number;
    /**
     * Maximum number of URLs per organization that will have its validation result cached. The URL
     * and validation context is used to form a cache key.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * security settings organization URL cache is dangerous in applications with long-lived sessions that can
     * create many unique requests and memory usage will only go up.
     *
     * Setting non-positive number here is invalid. If you want to turn off organization security settings caching,
     * tweak the `maxSecuritySettingsOrgs`.
     */
    maxSecuritySettingsOrgUrls?: number;
    /**
     * Maximum age of cached organization's URL validation results. The value is in milliseconds.
     *
     * Items are not pro-actively pruned out as they age, but if you try to get an item that is too old,
     * it'll drop it and make a new request to the backend. The purpose of the cache setting is not mainly
     * to limit its size to prevent memory usage grow (tweak `maxSecuritySettingsOrgUrls` for that)
     * but to propagate URL whitelist changes on backend to the long-lived application sessions.
     *
     * Setting non-positive number here is invalid. If you want to turn off organization security settings
     * caching, tweak the `maxSecuritySettingsOrgs`.
     */
    maxSecuritySettingsOrgUrlsAge?: number;
    /**
     * Maximum number of workspaces for which to cache selected {@link @gooddata/sdk-backend-spi#IWorkspaceAttributesService} calls.
     * The workspace identifier is used as cache key.
     * For each workspace, there will be a cache entry holding `maxAttributeDisplayFormsPerWorkspace` entries for attribute display form-related calls.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * cache may be OK in applications where number of workspaces is small - the cache will be limited
     * naturally and will not grow uncontrollably.
     *
     * When non-positive number is specified, then no caching will be done.
     */
    maxAttributeWorkspaces?: number;
    /**
     * Maximum number of attribute display forms to cache per workspace.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * attribute display form cache may be OK in applications where number of attribute display forms is small
     * and/or they are requested infrequently - the cache will be limited naturally and will not grow uncontrollably.
     *
     * Setting non-positive number here is invalid. If you want to turn off attribute display form
     * caching, tweak the `maxAttributeWorkspaces` value.
     */
    maxAttributeDisplayFormsPerWorkspace?: number;
    /**
     * Maximum number of attributes to cache per workspace.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * attribute cache may be OK in applications where number of attributes is small and/or they are requested
     * infrequently - the cache will be limited naturally and will not grow uncontrollably.
     *
     * Setting non-positive number here is invalid. If you want to turn off attribute caching,
     * tweak the `maxAttributeWorkspaces` value.
     */
    maxAttributesPerWorkspace?: number;
    /**
     * Maximum number of attribute element results to cache per workspace.
     *
     * Note that not all the queries are cached (e.g. queries with `filter` value).
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * attribute elements cache may be OK in applications where number of attributes and/or their elements is small
     * and/or they are requested infrequently - the cache will be limited naturally and will not grow uncontrollably.
     *
     * The `maxAttributeWorkspaces` value must be positive, otherwise this setting is ignored.
     * When non-positive number is specified, then no caching of attribute element results will be done.
     */
    maxAttributeElementResultsPerWorkspace?: number;
    /**
     * Maximum number of settings for a workspace and for a user to cache per workspace.
     *
     * When limit is reached, cache entries will be evicted using LRU policy.
     *
     * When no maximum number is specified, the cache will be unbounded and no evictions will happen. Unbounded
     * workspace settings cache is dangerous in applications that change query the settings of many different
     * workspaces - this will cache quite large objects for each workspace and can make the memory usage go up.
     *
     * When non-positive number is specified, then no caching of result windows will be done.
     */
    maxWorkspaceSettings?: number;
};

/**
 * Catalog attribute builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogAttributeBuilder<T extends ICatalogAttribute = ICatalogAttribute> extends GroupableCatalogItemBuilder<T> {
    attribute(attributeOrRef: IAttributeMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeMetadataObjectBuilder>): this;
    defaultDisplayForm(displayFormOrRef: IAttributeDisplayFormMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeDisplayFormMetadataObjectBuilder>): this;
    displayForms(displayForms: IAttributeDisplayFormMetadataObject[]): this;
    geoPinDisplayForms(displayForms: IAttributeDisplayFormMetadataObject[]): this;
    toExecutionModel(modifications?: AttributeModifications): IAttribute;
}

/**
 * Catalog date attribute builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogDateAttributeBuilder<T extends ICatalogDateAttribute = ICatalogDateAttribute> extends Builder<T> {
    granularity(granularity: DateAttributeGranularity): this;
    attribute(attributeOrRef: IAttributeMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeMetadataObjectBuilder>): this;
    defaultDisplayForm(displayFormOrRef: IAttributeDisplayFormMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeDisplayFormMetadataObjectBuilder>): this;
}

/**
 * Catalog date dataset builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogDateDatasetBuilder<T extends ICatalogDateDataset = ICatalogDateDataset> extends Builder<T> {
    relevance(relevance: number): this;
    dateAttributes(dateAttributes: ICatalogDateAttribute[]): this;
    dataSet(dataSetOrRef: IDataSetMetadataObject | ObjRef, modifications?: BuilderModifications<DataSetMetadataObjectBuilder>): this;
}

/**
 * @alpha
 */
export declare type CatalogDecoratorFactory = (catalog: IWorkspaceCatalogFactory) => IWorkspaceCatalogFactory;

/**
 * Catalog fact builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogFactBuilder<T extends ICatalogFact = ICatalogFact> extends GroupableCatalogItemBuilder<T> {
    fact(factOrRef: IFactMetadataObject | ObjRef, modifications?: BuilderModifications<FactMetadataObjectBuilder>): this;
}

/**
 * Catalog group builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogGroupBuilder<T extends ICatalogGroup = ICatalogGroup> extends Builder<T> {
    title(title: string): this;
    tag(tagRef: ObjRef): this;
}

/**
 * Catalog measure builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogMeasureBuilder<T extends ICatalogMeasure = ICatalogMeasure> extends GroupableCatalogItemBuilder<T> {
    measure(measureOrRef: IMeasureMetadataObject | ObjRef, modifications?: BuilderModifications<MeasureMetadataObjectBuilder>): this;
    toExecutionModel(modifications?: MeasureModifications<MeasureBuilder>): IMeasure;
}

/**
 * Adjusts both workspace and user settings
 *
 * @beta
 */
export declare type CommonSettingsWrapper = (settings: ISettings) => ISettings;

/**
 * Adjusts current user config
 *
 * @beta
 */
export declare type CurrentUserSettingsWrapper = (settings: IUserWorkspaceSettings) => IUserWorkspaceSettings;

/**
 * Creates an instance of backend which uses custom functions to calculate results. See {@link CustomBackendConfig}
 * to learn more on what and how should be customized.
 *
 * ---
 *
 * Authentication is handled according to the specification described in the IAnalyticalBackend SPI. The custom backend
 * can be set up with authentication provider which will realize the desired authentication mechanism.
 *
 * Unless explicitly told via forced authentication (see {@link IAnalyticalBackend#authenticate}), the custom backend
 * will defer authentication until it is actually needed. In order for the custom backend to recognize that authentication
 * is needed, the different providers must throw the `NotAuthenticated` error.
 *
 * @beta
 */
export declare function customBackend(config: CustomBackendConfig): IAnalyticalBackend;

/**
 * @beta
 */
export declare type CustomBackendConfig = IAnalyticalBackendConfig & {
    /**
     * Provider which will be called to obtain an instance of API client to talk to the backend server.
     */
    readonly clientProvider: ApiClientProvider;
    /**
     * Provider of execution results for particular execution definition - this triggers the actual
     * computation on the backend.
     *
     * The UI.SDK separates between the execution result and the actual data. The execution result is an umbrella
     * for the entire computation. It contains descriptors of the result dimensions and allows to obtain different
     * views on the data - be it different data windows (pages) or all data for the computation.
     *
     * ---
     *
     * Given the execution context, trigger computation on the backend and return an IExecutionResult
     * representing the result.
     *
     * The result provider must choose one of two approaches:
     *
     * 1. Use the resultFactory included in the context to create a default implementation of the IExecutionResult.
     * The default implementation includes all the boilerplate and uses `dataProvider` to obtain DataViews for
     * the {@link IExecutionResult#readAll} and {@link IExecutionResult#readWindow} methods.
     *
     * 2. Create its own implementation of IExecutionResult and instantiate as needed. In that case the the
     * `dataProvider` does not have to be specified.
     *
     * ---
     *
     * Note: if the provider encounters problems during execution, it MUST raise exceptions from the `AnalyticalBackendError`
     * error hierarchy.
     */
    readonly resultProvider: ResultProvider;
    /**
     * Provider of data for particular execution result.
     *
     * ---
     *
     * This property MUST be specified when your implementation of `resultProvider` uses the default implementation
     * of the IExecutionResult. Otherwise this property is optional. See description of `resultProvider` to learn more.
     *
     * ---
     *
     * Note: if the provider encounters problems during execution, it MUST raise exceptions from the `AnalyticalBackendError`
     * error hierarchy.
     *
     */
    readonly dataProvider?: DataProvider;
};

/**
 * @beta
 */
export declare type CustomBackendState = {
    /**
     * Telemetry available at the time of the provider call.
     */
    telemetry?: TelemetryData;
    /**
     * Authentication call guard.
     *
     * Always wrap custom calls to authenticated APIs in the call guard. That way if the client is not yet authenticated the
     * backend will trigger authentication flow and have authentication provider take care of the situation.
     *
     * Note that calls to `resultProvider` and `dataProvider` done by the custom backend infrastructure are already
     * wrapped by this and provide the `client` as part of their respective call contexts. Use that instance of `client`
     */
    authApiCall: AuthenticatedCallGuard;
};

/**
 * @beta
 */
export declare type CustomCallContext = {
    /**
     * Actual configuration of the backend.
     */
    config: CustomBackendConfig;
    /**
     * Essential backend state of the custom backend is passed down to providers.
     */
    state: CustomBackendState;
    /**
     * API client to use for backend communication. The custom backend obtains this
     * instance using the `clientProvider` specified in the custom backend configuration.
     *
     * Use this instance to communicate with the backend. You SHOULD NOT use the clientProvider to obtain
     * an instance of client. The custom backend implementation takes care of obtaining an instance
     * of client and uses the same instance to drive authentication flow as needed.
     */
    client: any;
};

/**
 * Dashboard metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class DashboardMetadataObjectBuilder<T extends IDashboardMetadataObject = IDashboardMetadataObject> extends MetadataObjectBuilder<T> {
}

/**
 * @alpha
 */
export declare type DashboardsDecoratorFactory = (dashboards: IWorkspaceDashboardsService, workspace: string) => IWorkspaceDashboardsService;

/**
 * @beta
 */
export declare type DataProvider = (context: DataProviderContext) => Promise<IDataView>;

/**
 * @beta
 */
export declare type DataProviderContext = CustomCallContext & {
    /**
     * Execution result from which to obtain data.
     */
    result: IExecutionResult;
    /**
     * Indicates whether all data or just a window of data should be returned.
     *
     * If window is not defined, then all data are desired.
     */
    window?: {
        offset: number[];
        size: number[];
    };
};

/**
 * DataSet metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class DataSetMetadataObjectBuilder<T extends IDataSetMetadataObject = IDataSetMetadataObject> extends MetadataObjectBuilder<T> {
}

/**
 * Decorated backend is a wrapper of any other backend implementations that can be used to enrich
 * functionality of the services that the wrapped backend normally provides.
 *
 * It can be for instance used to decorate execution factories and in conjunction with {@link DecoratedPreparedExecution}
 * also create decorated prepared executions.
 *
 * @param backend - instance of backend to decorate
 * @param decorators - configuration for the decorations
 * @returns new decorated backend
 * @alpha
 */
export declare function decoratedBackend(backend: IAnalyticalBackend, decorators: DecoratorFactories): IAnalyticalBackend;

/**
 * Base class for execution factory decorators. Implements all delegates.
 *
 * There is an opt-in functionality to decorate the prepared executions - which is a typical use case for
 * factory decorators.
 *
 * @alpha
 */
export declare class DecoratedExecutionFactory implements IExecutionFactory {
    protected readonly decorated: IExecutionFactory;
    private readonly wrapper;
    constructor(decorated: IExecutionFactory, wrapper?: PreparedExecutionWrapper);
    forDefinition(def: IExecutionDefinition): IPreparedExecution;
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
    /**
     * This method is a hook that can be used to wrap the execution prepared by the decorated factory - in essence
     * to keep the decorator chain going and add extra functionality to the prepared execution.
     *
     * By default, this method will call the wrapper function passed to this class at construction time - so use
     * that unless you need anything more fancy.
     *
     * @param execution - execution to wrap
     */
    protected wrap: (execution: IPreparedExecution) => IPreparedExecution;
}

/**
 * Abstract base class for execution result decorators. Implements delegates to decorated execution. Concrete
 * implementations can override just the functions they are interested in.
 *
 * The prepared execution wrap is needed here because of the transform function which normally creates new
 * instances of prepared execution - and so the decoration needs to be maintained.
 *
 * @alpha
 */
export declare abstract class DecoratedExecutionResult implements IExecutionResult {
    private readonly decorated;
    private readonly wrapper;
    definition: IExecutionDefinition;
    dimensions: IDimensionDescriptor[];
    protected constructor(decorated: IExecutionResult, wrapper?: PreparedExecutionWrapper);
    export(options: IExportConfig): Promise<IExportResult>;
    readAll(): Promise<IDataView>;
    readWindow(offset: number[], size: number[]): Promise<IDataView>;
    transform(): IPreparedExecution;
    equals(other: IExecutionResult): boolean;
    fingerprint(): string;
}

/**
 * Abstract base class for prepared execution decorators. Implements delegates to decorated execution. Concrete
 * implementations can override just the functions they are interested in.
 *
 * @alpha
 */
export declare abstract class DecoratedPreparedExecution implements IPreparedExecution {
    protected readonly decorated: IPreparedExecution;
    readonly definition: IExecutionDefinition;
    protected constructor(decorated: IPreparedExecution);
    equals(other: IPreparedExecution): boolean;
    execute(): Promise<IExecutionResult>;
    explain<T extends ExplainType | undefined>(config: ExplainConfig<T>): IExplainProvider<typeof config["explainType"]>;
    fingerprint(): string;
    withDimensions(...dim: Array<IDimension | DimensionGenerator>): IPreparedExecution;
    withSorting(...items: ISortItem[]): IPreparedExecution;
    withDateFormat(dateFormat: string): IPreparedExecution;
    withExecConfig(config: IExecutionConfig): IPreparedExecution;
    /**
     * Methods that create new instances of prepared executions (withDimensions, withSorting, withDateFormat) will
     * call out to this method to create decorated execution. This is essential to maintain the decoration
     * during immutable operations where decorated implementation creates new instances.
     *
     * @param decorated - instance to decorate
     */
    protected abstract createNew(decorated: IPreparedExecution): IPreparedExecution;
}

/**
 * @alpha
 */
export declare abstract class DecoratedSecuritySettingsService implements ISecuritySettingsService {
    private decorated;
    scope: string;
    protected constructor(decorated: ISecuritySettingsService);
    isUrlValid(url: string, context: ValidationContext): Promise<boolean>;
    isDashboardPluginUrlValid(url: string, workspace: string): Promise<boolean>;
}

/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceCatalog implements IWorkspaceCatalog {
    private readonly decorated;
    protected constructor(decorated: IWorkspaceCatalog);
    availableItems(): IWorkspaceCatalogAvailableItemsFactory;
    attributes(): ICatalogAttribute[];
    dateDatasets(): ICatalogDateDataset[];
    facts(): ICatalogFact[];
    groups(): ICatalogGroup[];
    allItems(): CatalogItem[];
    measures(): ICatalogMeasure[];
    attributeHierarchies(): ICatalogAttributeHierarchy[];
}

/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceCatalogFactory implements IWorkspaceCatalogFactory {
    private decorated;
    protected readonly wrapper: WorkspaceCatalogWrapper;
    options: IWorkspaceCatalogFactoryOptions;
    workspace: string;
    protected constructor(decorated: IWorkspaceCatalogFactory, wrapper?: WorkspaceCatalogWrapper);
    forDataset(dataset: ObjRef): IWorkspaceCatalogFactory;
    forTypes(types: CatalogItemType[]): IWorkspaceCatalogFactory;
    excludeTags(tags: ObjRef[]): IWorkspaceCatalogFactory;
    includeTags(tags: ObjRef[]): IWorkspaceCatalogFactory;
    withOptions(options: IWorkspaceCatalogFactoryOptions): IWorkspaceCatalogFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogFactory;
    load(): Promise<IWorkspaceCatalog>;
    /**
     * Methods that create new instances of catalog loader (e.g. all except load) will
     * call out to this method to create decorated loader. This is essential to maintain the decoration
     * during immutable operations where decorated implementation creates new instances.
     *
     * @param decorated - instance to decorate
     */
    protected abstract createNew(decorated: IWorkspaceCatalogFactory): IWorkspaceCatalogFactory;
}

/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceDashboardsService implements IWorkspaceDashboardsService {
    protected decorated: IWorkspaceDashboardsService;
    workspace: string;
    protected constructor(decorated: IWorkspaceDashboardsService, workspace: string);
    getDashboards(options?: IGetDashboardOptions): Promise<IListedDashboard[]>;
    getDashboard(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions): Promise<IDashboard>;
    getDashboardWithReferences(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardWithReferences>;
    getDashboardReferencedObjects(dashboard: IDashboard, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardReferences>;
    createDashboard(dashboard: IDashboardDefinition): Promise<IDashboard>;
    updateDashboard(dashboard: IDashboard, updatedDashboard: IDashboardDefinition): Promise<IDashboard>;
    deleteDashboard(ref: ObjRef): Promise<void>;
    exportDashboardToPdf(ref: ObjRef, filters?: FilterContextItem[]): Promise<IExportResult>;
    createScheduledMail(scheduledMail: IScheduledMailDefinition, exportFilterContext?: IFilterContextDefinition): Promise<IScheduledMail>;
    updateScheduledMail(ref: ObjRef, scheduledMailDefinition: IScheduledMailDefinition, filterContextRef?: ObjRef): Promise<void>;
    deleteScheduledMail(ref: ObjRef): Promise<void>;
    getScheduledMailsForDashboard(ref: ObjRef, options?: IGetScheduledMailOptions): Promise<IScheduledMail[]>;
    getScheduledMailsCountForDashboard(ref: ObjRef): Promise<number>;
    getAllWidgetAlertsForCurrentUser(): Promise<IWidgetAlert[]>;
    getDashboardWidgetAlertsForCurrentUser(ref: ObjRef): Promise<IWidgetAlert[]>;
    getWidgetAlertsCountForWidgets(refs: ObjRef[]): Promise<IWidgetAlertCount[]>;
    createWidgetAlert(alert: IWidgetAlertDefinition): Promise<IWidgetAlert>;
    updateWidgetAlert(alert: IWidgetAlert | IWidgetAlertDefinition): Promise<IWidgetAlert>;
    deleteWidgetAlert(ref: ObjRef): Promise<void>;
    deleteWidgetAlerts(refs: ObjRef[]): Promise<void>;
    getWidgetReferencedObjects(widget: IWidget, types?: SupportedWidgetReferenceTypes[]): Promise<IWidgetReferences>;
    getResolvedFiltersForWidget(widget: IWidget, filters: IFilter[]): Promise<IFilter[]>;
    getDashboardPlugins(options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin[]>;
    getDashboardPlugin(ref: ObjRef, options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin>;
    createDashboardPlugin(plugin: IDashboardPluginDefinition): Promise<IDashboardPlugin>;
    deleteDashboardPlugin(ref: ObjRef): Promise<void>;
    getDashboardPermissions(ref: ObjRef): Promise<IDashboardPermissions>;
    validateDashboardsExistence(dashboardRefs: ObjRef[]): Promise<IExistingDashboard[]>;
}

/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceSettingsService implements IWorkspaceSettingsService {
    protected decorated: IWorkspaceSettingsService;
    protected constructor(decorated: IWorkspaceSettingsService);
    getSettings(): Promise<IWorkspaceSettings>;
    getSettingsForCurrentUser(): Promise<IUserWorkspaceSettings>;
    setLocale(locale: string): Promise<void>;
}

/**
 * Provides factory functions for the different decorators (currently only supports execution
 * decorator). Input to each factory function is the original implementation from the wrapped backend, output
 * is whatever decorateur sees fit.
 *
 * @alpha
 */
export declare type DecoratorFactories = {
    execution?: ExecutionDecoratorFactory;
    catalog?: CatalogDecoratorFactory;
    securitySettings?: SecuritySettingsDecoratorFactory;
    workspaceSettings?: WorkspaceSettingsDecoratorFactory;
    attributes?: AttributesDecoratorFactory;
    dashboards?: DashboardsDecoratorFactory;
};

/**
 * @internal
 */
export declare class Denormalizer {
    readonly state: NormalizationState;
    static from(state: NormalizationState): Denormalizer;
    private readonly originalAttributes;
    private readonly originalMeasures;
    private constructor();
    /**
     * Given the current normalization state, this method transforms the dimension descriptors of the
     * normalized execution, so that all the customization of the original execution definition is restored
     * into them:
     *
     * -  Reverse lookup of local identifiers happens
     * -  Attribute / Measure name is set according to the defined alias
     * -  Measure format is set according to the format in definition
     *
     * @param normalizedDims - normalized dimension descriptors
     * @returns new descriptors
     */
    denormalizeDimDescriptors: (normalizedDims: IDimensionDescriptor[]) => IDimensionDescriptor[];
    /**
     * Derived measures or arithmetic measures have the 'name' in result header defaulted to measure
     * localId. This method deals with it. It creates a copy of headers with the measure headers denormalized,
     * values replaced with the contents of alias or title (whichever comes first).
     *
     * @param headerItems - headers to denormalize, copy will be done
     * @returns new headers
     */
    denormalizeHeaders: (headerItems: IResultHeader[][][]) => IResultHeader[][][];
    private originalLocalId;
    private fillOriginalMeasureTitle;
    private originalMeasureTitle;
}

/**
 * Returns dummy backend - this backend focuses on the execution 'branch' of the SPI. it implements
 * execution factory and prepared execution so that clients receive NoData exception when trying to obtain
 * results.
 *
 * This implementation is suitable when testing code which builds and configures an instance of IPreparedExecution or
 * testing component behavior when backend returns no results.
 *
 * @remarks see {@link dummyBackendEmptyData} for a variant of dummy backend
 * @param config - Provide configuration of the backend (host/user)
 * @internal
 */
export declare function dummyBackend(config?: DummyBackendConfig): IAnalyticalBackend;

/**
 * @internal
 */
export declare type DummyBackendConfig = IAnalyticalBackendConfig & {
    /**
     * Influences whether readAll() / readWindow() should throw NoDataError() or return empty data view.
     *
     * The empty data view is returned by default - and can be used in tests that verify definition parts of
     * the returned data view.
     *
     * Throwing NoDataError is closer to how normal backends behave.
     *
     * If set to "without-data-view", it will throw NoDataErrors without a DataView.
     * If set to "with-data-view", it will throw NoDataErrors with a DataView.
     */
    raiseNoDataExceptions: false | "without-data-view" | "with-data-view";
};

/**
 * Convenience function to create a dummy backend configured to NOT throw exceptions when client requests
 * data view. Instead, it returns an empty data view (which does not follow the SPI contract...)
 *
 * While this behavior violates contract of the SPI, a backend configured in this way is suitable for
 * particular test scenarios - for instance in tests that exercise logic which only works with IDataView's
 * execution definition.
 *
 * @internal
 */
export declare function dummyBackendEmptyData(): IAnalyticalBackend;

/**
 * Creates a new, empty data view for the provided execution definition. The definition will be retained as-is, data
 * will be empty.
 *
 * @param definition - execution definition
 * @param result - A result to link with the data view, if not provided an execution result will be
 *  created
 * @param config - Override config that will be passed to exec result that may be created for the
 *  data view (it is needed there in order to correctly handle readAll() and read()); config will not be used
 *  if the `result` parameter is provided explicitly
 * @returns new instance of data view
 * @internal
 */
export declare function dummyDataView(definition: IExecutionDefinition, result?: IExecutionResult, config?: DummyBackendConfig): IDataView;

/**
 * @alpha
 */
export declare type ExecutionDecoratorFactory = (executionFactory: IExecutionFactory) => IExecutionFactory;

/**
 * This implementation of execution factory will transparently upgrade any `forInsight` execution
 * to `forInsightByRef` execution IF the argument to `forInsight` is actually a persisted insight (`IInsight` which
 * is subtype of `IInsightDefinition`).
 *
 * @internal
 */
export declare class ExecutionFactoryUpgradingToExecByReference extends DecoratedExecutionFactory {
    constructor(decorated: IExecutionFactory);
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
}

/**
 * This implementation of execution factory allows transparent injection of fixed set of filters to all
 * executions started through it.
 *
 * This factory will not perform any filter merging. All it does is ensure some filters are always passed
 * to the underlying factory. The responsibility to do the filter merging lies in the underlying factory.
 *
 * @internal
 */
export declare class ExecutionFactoryWithFixedFilters extends DecoratedExecutionFactory {
    private readonly filters;
    constructor(decorated: IExecutionFactory, filters?: INullableFilter[]);
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
}

/**
 * Extracts item type from generic builder type
 *
 * @beta
 */
export declare type ExtractBuilderType<TBuilder> = TBuilder extends IBuilder<infer TItem> ? TItem : never;

/**
 * Fact metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class FactMetadataObjectBuilder<T extends IFactMetadataObject = IFactMetadataObject> extends MetadataObjectBuilder<T> {
}

/**
 * Groupable catalog item builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class GroupableCatalogItemBuilder<T extends IGroupableCatalogItemBase = IGroupableCatalogItemBase> extends Builder<T> implements IGroupableCatalogItemBuilder<T> {
    groups(tagRefs: ObjRef[]): this;
}

/**
 * Authenticated async call context
 *
 * @beta
 */
export declare interface IAuthenticatedAsyncCallContext {
    /**
     * Returns the currently authenticated principal.
     * Calling this function MAY trigger the authentication flow in case the current session
     * is not yet authenticated and the principal is unknown.
     * If the authentication flow fails, the NotAuthenticated error is thrown.
     */
    getPrincipal(): Promise<IAuthenticatedPrincipal>;
}

/**
 * see AuthProviderCallGuard
 * @public
 */
export declare interface IAuthProviderCallGuard extends IAuthenticationProvider {
    reset(): void;
}

/**
 * Common builder interface
 * @beta
 */
export declare interface IBuilder<T> {
    /**
     * Build & return current item
     */
    build(): T;
    /**
     * Modify current item with set of modifications
     */
    modify(modifications: BuilderModifications<this, T>): this;
    /**
     * Validate current item, throws error when item is not valid
     */
    validate(): this;
}

/**
 * Groupable catalog item builder interface
 *
 * @beta
 */
export declare interface IGroupableCatalogItemBuilder<T extends IGroupableCatalogItemBase = IGroupableCatalogItemBase> extends IBuilder<T> {
    groups(tagRefs: ObjRef[]): this;
}

/**
 * Insight widget builder
 *
 * @alpha
 */
export declare interface IInsightWidgetBuilder extends IWidgetBaseBuilder<IInsightWidget> {
    drills(valueOrUpdateCallback: ValueOrUpdateCallback<InsightDrillDefinition[]>): this;
    insight(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>): this;
    properties(valueOrUpdateCallback: ValueOrUpdateCallback<VisualizationProperties | undefined>): this;
}

/**
 * Kpi widget builder
 *
 * @alpha
 */
export declare interface IKpiWidgetBuilder extends IWidgetBaseBuilder<IKpiWidget> {
    drills(valueOrUpdateCallback: ValueOrUpdateCallback<KpiDrillDefinition[]>): this;
    measure(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>): this;
    comparisonType(valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonTypeComparison>): this;
    comparisonDirection(valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonDirection | undefined>): this;
}

/**
 * Metadata object builder interface
 *
 * @beta
 */
export declare interface IMetadataObjectBuilder<T extends IMetadataObject = IMetadataObject> extends IBuilder<T> {
    /**
     * Set metadata object title
     *
     * @param title - metadata object title
     * @returns this
     */
    title(title: string): this;
    /**
     * Set metadata object description
     *
     * @param description - metadata object description
     * @returns this
     */
    description(description: string): this;
    /**
     * Set metadata object identifier
     *
     * @param id - metadata object identifier
     * @returns this
     */
    id(id: string): this;
    /**
     * Set metadata object uri
     *
     * @param uri - metadata object uri
     * @returns this
     */
    uri(uri: string): this;
    /**
     * Sets metadata object 'unlisted' flag
     *
     * @param value - true if unlisted
     * @returns this
     */
    unlisted(value: boolean): this;
    /**
     * Set metadata object isProduction flag
     *
     * @param isProduction - true if production
     * @returns this
     */
    production(isProduction: boolean): this;
    /**
     * Set metadata object isDeprecated flag
     *
     * @param isDeprecated - true if deprecated
     * @returns this
     */
    deprecated(isDeprecated: boolean): this;
}

/**
 * This implementation of {@link @gooddata/sdk-backend-spi#IPagedResource} pages over a list of items
 * provided at construction time. The paging is done using pre-configured page limit and starts at particular offset.
 *
 * @internal
 */
export declare class InMemoryPaging<T> implements IPagedResource<T> {
    protected readonly allItems: T[];
    readonly items: T[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    constructor(allItems: T[], limit?: number, offset?: number);
    next(): Promise<IPagedResource<T>>;
    goTo(pageIndex: number): Promise<IPagedResource<T>>;
    all(): Promise<T[]>;
    allSorted(compareFn: (a: T, b: T) => number): Promise<T[]>;
}

/**
 * @internal
 */
export declare interface INormalizerOptions {
    /**
     * If true, things like aliases, titles, etc. are kept in the objects. Defaults to false.
     */
    keepRemovableProperties?: boolean;
}

/**
 * @alpha
 */
export declare class InsightWidgetBuilder extends WidgetBaseBuilder<IInsightWidget> implements IInsightWidgetBuilder {
    protected item: IInsightWidget;
    protected validator?: ((item: Partial<IInsightWidget>) => void) | undefined;
    constructor(item: IInsightWidget, validator?: ((item: Partial<IInsightWidget>) => void) | undefined);
    static for(insightWidget: IInsightWidgetDefinition): InsightWidgetBuilder;
    static forNew(insight: ObjRef): InsightWidgetBuilder;
    drills: (valueOrUpdateCallback: ValueOrUpdateCallback<InsightDrillDefinition[]>) => this;
    insight: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>) => this;
    properties: (valueOrUpdateCallback: ValueOrUpdateCallback<VisualizationProperties | undefined>) => this;
}

/**
 * @internal
 */
export declare type IServerPagingParams = {
    offset: number;
    limit: number;
};

/**
 * @internal
 */
export declare interface IServerPagingResult<T> {
    items: T[];
    totalCount: number;
}

/**
 * Common widget props builder
 *
 * @alpha
 */
export declare interface IWidgetBaseBuilder<T extends IWidget> extends IBuilder<T> {
    title(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
    description(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
    ignoreDashboardFilters(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardFilterReference[]>): this;
    dateDataSet(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef | undefined>): this;
    ref(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>): this;
    id(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
    uri(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
}

/**
 * @alpha
 */
export declare class KpiWidgetBuilder extends WidgetBaseBuilder<IKpiWidget> implements IKpiWidgetBuilder {
    protected item: IKpiWidget;
    protected validator?: ((item: Partial<IKpiWidget>) => void) | undefined;
    constructor(item: IKpiWidget, validator?: ((item: Partial<IKpiWidget>) => void) | undefined);
    static for(kpiWidget: IKpiWidgetDefinition): KpiWidgetBuilder;
    static forNew(measure: ObjRef): KpiWidgetBuilder;
    protected setKpiWidgetProp: <K extends "comparisonType" | "metric" | "comparisonDirection">(prop: K, valueOrUpdateCallback: ValueOrUpdateCallback<IKpi[K]>) => this;
    drills: (valueOrUpdateCallback: ValueOrUpdateCallback<KpiDrillDefinition[]>) => this;
    measure: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>) => this;
    comparisonType: (valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonTypeComparison>) => this;
    comparisonDirection: (valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonDirection | undefined>) => this;
}

/**
 * @beta
 */
export declare type LocalIdMap = {
    [from: string]: string;
};

/**
 * Measure metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class MeasureMetadataObjectBuilder<T extends IMeasureMetadataObject = IMeasureMetadataObject> extends MetadataObjectBuilder<T> {
    expression(maql: string): this;
    format(format: string): this;
    isLocked(isLocked: boolean): this;
    created(createdAt?: string): this;
    createdBy(createdBy?: IUser): this;
    updated(updatedAt?: string): this;
    updatedBy(updatedBy?: IUser): this;
}

/**
 * Metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class MetadataObjectBuilder<T extends IMetadataObject = IMetadataObject> extends Builder<T> implements IMetadataObjectBuilder {
    title(title: string): this;
    description(description: string): this;
    id(identifier: string): this;
    uri(uri: string): this;
    unlisted(value: boolean): this;
    production(isProduction: boolean): this;
    deprecated(isDeprecated: boolean): this;
}

/**
 * Attribute display form metadata object factory
 *
 * @param ref - attribute display form reference
 * @param modifications - attribute diplay form builder modifications to perform
 * @returns created attribute display form metadata object
 * @beta
 */
export declare const newAttributeDisplayFormMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<AttributeDisplayFormMetadataObjectBuilder>) => IAttributeDisplayFormMetadataObject;

/**
 * Attribute metadata object factory
 *
 * @param ref - attribute reference
 * @param modifications - attribute builder modifications to perform
 * @returns created attribute metadata object
 * @beta
 */
export declare const newAttributeMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<AttributeMetadataObjectBuilder>) => IAttributeMetadataObject;

/**
 * Catalog attribute factory
 *
 * @param modifications - catalog attribute builder modifications to perform
 * @returns created catalog attribute
 * @beta
 */
export declare const newCatalogAttribute: (modifications?: BuilderModifications<CatalogAttributeBuilder>) => ICatalogAttribute;

/**
 * Catalog date attribute factory
 *
 * @param modifications - catalog date attribute builder modifications to perform
 * @returns created catalog date attribute
 * @beta
 */
export declare const newCatalogDateAttribute: (modifications?: BuilderModifications<CatalogDateAttributeBuilder>) => ICatalogDateAttribute;

/**
 * Catalog date dataset factory
 *
 * @param modifications - catalog date dataset builder modifications to perform
 * @returns created catalog date dataset
 * @beta
 */
export declare const newCatalogDateDataset: (modifications?: BuilderModifications<CatalogDateDatasetBuilder>) => ICatalogDateDataset;

/**
 * Catalog fact factory
 *
 * @param modifications - catalog fact builder modifications to perform
 * @returns created catalog fact
 * @beta
 */
export declare const newCatalogFact: (modifications?: BuilderModifications<CatalogFactBuilder>) => ICatalogFact;

/**
 * Catalog group factory
 *
 * @param modifications - catalog group builder modifications to perform
 * @returns created catalog group
 * @beta
 */
export declare const newCatalogGroup: (modifications?: BuilderModifications<CatalogGroupBuilder>) => ICatalogGroup;

/**
 * Catalog measure factory
 *
 * @param modifications - catalog measure builder modifications to perform
 * @returns created catalog measure
 * @beta
 */
export declare const newCatalogMeasure: (modifications?: BuilderModifications<CatalogMeasureBuilder>) => ICatalogMeasure;

/**
 * Dashboard metadata object factory
 *
 * @param ref - dashboard reference
 * @param modifications - dashboard builder modifications to perform
 * @returns created dashboard metadata object
 * @beta
 */
export declare const newDashboardMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<DashboardMetadataObjectBuilder>) => IDashboardMetadataObject;

/**
 * DataSet metadata object factory
 *
 * @param ref - dataset reference
 * @param modifications - dataset builder modifications to perform
 * @returns created dataset metadata object
 * @beta
 */
export declare const newDataSetMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<DataSetMetadataObjectBuilder>) => IDataSetMetadataObject;

/**
 * Fact metadata object factory
 *
 * @param ref - fact reference
 * @param modifications - fact builder modifications to perform
 * @returns created fact metadata object
 * @beta
 */
export declare const newFactMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<FactMetadataObjectBuilder>) => IFactMetadataObject;

/**
 * @alpha
 */
export declare const newInsightWidget: (insight: ObjRef, modifications: (builder: InsightWidgetBuilder) => InsightWidgetBuilder) => IInsightWidget;

/**
 * @alpha
 */
export declare const newKpiWidget: (measure: ObjRef, modifications: (builder: KpiWidgetBuilder) => KpiWidgetBuilder) => IKpiWidget;

/**
 * Measure metadata object factory
 *
 * @param ref - measure reference
 * @param modifications - measure builder modifications to perform
 * @returns created measure metadata object
 * @beta
 */
export declare const newMeasureMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<MeasureMetadataObjectBuilder>) => IMeasureMetadataObject;

/**
 * Variable metadata object factory
 *
 * @param ref - variable reference
 * @param modifications - variable builder modifications to perform
 * @returns created variable metadata object
 * @beta
 */
export declare const newVariableMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<VariableMetadataObjectBuilder>) => IVariableMetadataObject;

/**
 * This implementation serves as a Null object for IAuthProviderCallGuard.
 *
 * @internal
 */
export declare class NoopAuthProvider implements IAuthProviderCallGuard {
    authenticate(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(_context: IAuthenticationContext): Promise<void>;
    reset(): void;
}

/**
 * @beta
 */
export declare type NormalizationConfig = {
    /**
     * Specify callback where the normalizing backend will dispatch state of the normalizations being done.
     */
    normalizationStatus?: (normalizationState: NormalizationState) => void;
    /**
     * Specify what should happen if the normalized backend is asked to perform execution by reference.
     *
     * Background:
     *
     * Execution by reference cannot be normalized - strictly because execution by reference executes exactly
     * what is stored somewhere on the backend (this can connect to authorization schemes, ACLs and so on - such as
     * allowing users to execute only insights exactly as they were prepared by someone else)
     *
     * By default, trying to run execute-by-reference using normalizing decorator will fail. It is possible
     * to modify this behavior so that instead there will be fallback to freeform execution. For backends that
     * do not support execute-by-ref this is all good.
     */
    executeByRefMode?: NormalizationWhenExecuteByRef;
};

/**
 * @beta
 */
export declare type NormalizationState = {
    /**
     * Normalized execution definition
     */
    readonly normalized: IExecutionDefinition;
    /**
     * Original execution definition
     */
    readonly original: IExecutionDefinition;
    /**
     * Local ID mapping between normalized and original execution definitions.
     */
    readonly n2oMap: LocalIdMap;
};

/**
 * @beta
 */
export declare type NormalizationWhenExecuteByRef = "prohibit" | "fallback";

/**
 * The normalization of execution definition means stripping away all the detail that is unnecessary for the
 * backend:
 *
 * -  attribute / measure alias
 * -  measure title
 * -  measure format
 * -  custom-crafted local IDs
 *
 * The code does the job by _mutating_ a clone of the original definition. The mutation approach, while not
 * backed by functionality in sdk-model and therefore somewhat hacky, is a simpler one for this task.
 *
 * The main reason behind that is the occurrence of attribute and measure objects in multiple parts of the
 * execution definition: same attributes and measures are referenced from both buckets and the attributes and measures
 * props of the execution definition. Mutating values means that after normalizing values the execution definition
 * is fully normalized.
 *
 * @internal
 */
export declare class Normalizer {
    readonly original: IExecutionDefinition;
    protected readonly options: INormalizerOptions;
    static normalize(def: IExecutionDefinition, options?: INormalizerOptions): NormalizationState;
    readonly normalized: IExecutionDefinition;
    /**
     * original to normalized local id map
     */
    private readonly o2nMap;
    /**
     * normalized to original local id map
     */
    private readonly n2oMap;
    private readonly originalMeasures;
    private readonly alreadyNormalized;
    private constructor();
    /**
     * Creates a new mapping between original local ID and the proposed normalized local ID. This method
     * ensures uniqueness of the normalized local ID. If the proposed normalized local ID is taken, it will
     * append a suffix to make a unique local ID.
     *
     * This can happen if the original execution definition contains same measure / attribute multiple times,
     * each time using different local ID.
     */
    private createUniqueMapping;
    private normalizedLocalId;
    private maybeNormalizedLocalId;
    private normalizeAttributes;
    private normalizeTotal;
    private normalizeTotals;
    /**
     * Simple measure normalization will toss away noop filters. There is nothing else to do.
     */
    private normalizeSimple;
    private normalizePoP;
    private normalizePreviousPeriod;
    private normalizeArithmetic;
    private normalizeMeasure;
    private normalizeMeasureByLocalId;
    private normalizeMeasures;
    private normalizeFilters;
    private normalizeSorts;
    private normalizeDimensions;
    private normalize;
}

/**
 * @alpha
 */
export declare type PreparedExecutionWrapper = (execution: IPreparedExecution) => IPreparedExecution;

/**
 * These are the recommended settings for the backend caching.
 *
 * @remarks
 * For more information on what the options mean see {@link CachingConfiguration}.
 *
 * @public
 */
export declare const RecommendedCachingConfiguration: CachingConfiguration;

/**
 * Calls an update callback when it's a function, otherwise returns the value itself.
 * This is just an utility function to DRY the builder implementation a bit.
 *
 * @alpha
 * @param valueOrUpdateCallback - value to set, or update callback
 * @param valueToUpdate - original value to update
 */
export declare const resolveValueOrUpdateCallback: <TValue>(valueOrUpdateCallback: ValueOrUpdateCallback<TValue>, valueToUpdate: TValue) => TValue;

/**
 * @beta
 */
export declare type ResultFactory = (dimensions: IDimensionDescriptor[], fingerprint: string) => IExecutionResult;

/**
 * @public
 */
export declare type ResultHeaderTransformer = (resultHeader: IResultHeader, postProcessing?: IPostProcessing) => IResultHeader;

/**
 * @beta
 */
export declare type ResultProvider = (context: ResultProviderContext) => Promise<IExecutionResult>;

/**
 * @beta
 */
export declare type ResultProviderContext = CustomCallContext & {
    /**
     * An execution that has been prepared and configured by the client code and describes what do compute
     * and how the results should look like.
     */
    execution: IPreparedExecution;
    /**
     * A factory function to create instances of IExecutionResult.
     *
     * When implementing custom backend, you may opt to use this factory to create a default implementation
     * of execution result which implements all the boilerplate and defers readAll() and readWindow() functions
     * to dataProviders OR create your own implementation of IExecutionResult from scratch.
     *
     */
    resultFactory: ResultFactory;
};

/**
 * @alpha
 */
export declare type SecuritySettingsDecoratorFactory = (securitySettings: ISecuritySettingsService) => ISecuritySettingsService;

/**
 * Common implementation of the {@link @gooddata/sdk-backend-spi#IPagedResource} for the server-side paging.
 *
 * @internal
 */
export declare class ServerPaging<T> implements IPagedResource<T> {
    protected readonly getData: (pagingParams: IServerPagingParams) => Promise<IServerPagingResult<T>>;
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    readonly items: T[];
    static for<TItem>(getData: (pagingParams: IServerPagingParams) => Promise<IServerPagingResult<TItem>>, limit?: number, offset?: number): Promise<IPagedResource<TItem>>;
    constructor(getData: (pagingParams: IServerPagingParams) => Promise<IServerPagingResult<T>>, limit: number, offset: number, totalCount: number, items: T[]);
    next: () => Promise<IPagedResource<T>>;
    goTo: (pageIndex: number) => Promise<IPagedResource<T>>;
    all: () => Promise<T[]>;
    allSorted: (compareFn: (a: T, b: T) => number) => Promise<T[]>;
}

/**
 * Adjusts workspace config
 *
 * @beta
 */
export declare type SettingsWrapper = (settings: IWorkspaceSettings) => IWorkspaceSettings;

/**
 * @beta
 */
export declare type TelemetryData = {
    componentName?: string;
    props?: string[];
};

/**
 * Transforms the result headers in an AFM execution result.
 *
 * @param resultHeaders - Execution result headers to be transformed.
 * @param resultHeaderTransformer - The transformation function to be called to transform each result header.
 * @param postProcessing - Contains any configuration that should be used during transformation.
 * @returns The transformed result headers if resultHeaderTransformer has a value,
 *  or resultHeaders is returned if resultHeaderTransformer does not have any value.
 *
 * @public
 */
export declare function transformResultHeaders(resultHeaders: IResultHeader[][][], resultHeaderTransformer?: ResultHeaderTransformer, postProcessing?: IPostProcessing): IResultHeader[][][];

/**
 * Performs validation of dashboard plugin URL. This is purely client-side and checks that the URL does
 * not contain invalid characters and contains correct protocol.
 *
 * @param url - url to validate
 * @alpha
 */
export declare function validatePluginUrlIsSane(url: string): string | undefined;

/**
 * Represents a callback to update the value, or the value itself.
 * @alpha
 */
export declare type ValueOrUpdateCallback<TValue> = TValue | ((value: TValue) => TValue);

/**
 * Variable metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class VariableMetadataObjectBuilder<T extends IVariableMetadataObject = IVariableMetadataObject> extends MetadataObjectBuilder<T> {
}

/**
 * @alpha
 */
export declare class WidgetBaseBuilder<T extends IWidget> extends Builder<T> implements IWidgetBaseBuilder<T> {
    protected setWidget: (updateCallback: (widget: Partial<T>) => Partial<T>) => this;
    protected setWidgetProp: <K extends keyof T>(prop: K, valueOrUpdateCallback: ValueOrUpdateCallback<T[K]>) => this;
    title: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
    description: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
    ignoreDashboardFilters: (valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardFilterReference[]>) => this;
    dateDataSet: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef | undefined>) => this;
    ref: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>) => this;
    id: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
    uri: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
}

/**
 * Adds caching layer on top of an existing analytical backend instance. It is currently possible to cache
 * results of executions and the workspace LDM catalog.
 *
 * @remarks see {@link CachingConfiguration} properties for more information.
 * @param realBackend - real backend to decorate with caching
 * @param config - caching configuration. {@link RecommendedCachingConfiguration} can be used
 * @public
 */
export declare function withCaching(realBackend: IAnalyticalBackend, config: CachingConfiguration): IAnalyticalBackend;

/**
 * Adjusts workspace configs and current user configs from the real backend.
 *
 * @remarks see {@link WorkspaceSettingsConfiguration} properties for more information.
 * @param realBackend - real backend to decorate with custom workspace settings
 * @param config - workspace configs configuration
 * @beta
 */
export declare function withCustomWorkspaceSettings(realBackend: IAnalyticalBackend, config: WorkspaceSettingsConfiguration): IAnalyticalBackend;

/**
 * This implementation of analytical backend decorates another implementation with support for eventing. Events
 * for significant actions are emitted to defined callback functions (event handlers).
 *
 * @param realBackend - backend supplying the actual implementation of SPI
 * @param callbacks - callbacks to event handlers
 * @beta
 */
export declare function withEventing(realBackend: IAnalyticalBackend, callbacks: AnalyticalBackendCallbacks): IAnalyticalBackend;

/**
 * Decorates backend with logic which transparently normalizes execution definitions before they are dispatched
 * to the underlying backend. The normalization standardizes local identifiers and removes any fields that do not
 * impact the resulting data itself: aliases, title customizations and measure format customizations.
 *
 * All the detail that is stripped on the way to the execution APIs is restored before the results reach the
 * caller code.
 *
 * The normalization is essential to increase cache hits - be it both on client or on the server.
 *
 * @param realBackend - real backend to decorate
 * @param config - Specify configuration of the normalization process, see {@link NormalizationConfig}
 * @returns new instance of backend
 * @beta
 */
export declare function withNormalization(realBackend: IAnalyticalBackend, config?: NormalizationConfig): IAnalyticalBackend;

/**
 * @alpha
 */
export declare type WorkspaceCatalogWrapper = (catalog: IWorkspaceCatalog) => IWorkspaceCatalog;

/**
 * Specifies workspace settings and current user settings to be adjusted by the decorator.
 *
 * @beta
 */
export declare interface WorkspaceSettingsConfiguration {
    /**
     * Transforms both workspace settings and user settings obtained from the real backend. Can add,
     * remove or alter settings or provide a completely new settings.
     * Execution of this wrapper precedes execution of the specific wrappers for user and workspace settings
     */
    commonSettingsWrapper?: CommonSettingsWrapper;
    /**
     * Transforms workspace settings obtained from the real backend. Can add, remove or alter settings
     * or provide a completely new settings
     */
    settingsWrapper?: SettingsWrapper;
    /**
     * Transforms user settings obtained from the real backend. Can add, remove or alter settings
     * or provide a completely new settings
     */
    currentUserSettingsWrapper?: CurrentUserSettingsWrapper;
}

/**
 * @alpha
 */
export declare type WorkspaceSettingsDecoratorFactory = (settings: IWorkspaceSettingsService, workspace: string) => IWorkspaceSettingsService;

export { }
