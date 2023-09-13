import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
/**
 * Cache control can be used to interact with the caching layer - at the moment to reset the contents of the
 * different top-level caches.
 *
 * @public
 */
export type CacheControl = {
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
export type CachingConfiguration = {
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
 * These are the recommended settings for the backend caching.
 *
 * @remarks
 * For more information on what the options mean see {@link CachingConfiguration}.
 *
 * @public
 */
export declare const RecommendedCachingConfiguration: CachingConfiguration;
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
//# sourceMappingURL=index.d.ts.map