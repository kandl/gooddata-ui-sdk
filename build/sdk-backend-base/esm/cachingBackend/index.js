import { decoratedBackend, } from "../decoratedBackend/index.js";
import { LRUCache } from "lru-cache";
import { DecoratedSecuritySettingsService } from "../decoratedBackend/securitySettings.js";
import { DecoratedDataView, DecoratedExecutionFactory, DecoratedExecutionResult, DecoratedPreparedExecution, } from "../decoratedBackend/execution.js";
import { DecoratedWorkspaceCatalogFactory } from "../decoratedBackend/catalog.js";
import { DecoratedElementsQuery, DecoratedElementsQueryFactory } from "../decoratedBackend/elements.js";
import stringify from "json-stable-stringify";
import compact from "lodash/compact.js";
import first from "lodash/first.js";
import flow from "lodash/flow.js";
import identity from "lodash/identity.js";
import { invariant } from "ts-invariant";
import partition from "lodash/partition.js";
import SparkMD5 from "spark-md5";
import { areObjRefsEqual, idRef, isIdentifierRef, isUriRef, uriRef, objRefToString, } from "@gooddata/sdk-model";
import { DecoratedWorkspaceAttributesService } from "../decoratedBackend/attributes.js";
import { DecoratedWorkspaceSettingsService } from "../decoratedBackend/workspaceSettings.js";
//
// Execution caching
//
class WithExecutionCaching extends DecoratedPreparedExecution {
    constructor(decorated, ctx) {
        super(decorated);
        this.ctx = ctx;
        this.execute = async () => {
            const cacheKey = this.fingerprint();
            const cache = this.ctx.caches.execution;
            let cacheEntry = cache.get(cacheKey);
            if (!cacheEntry) {
                const result = super
                    .execute()
                    .then((res) => {
                    return new WithExecutionResultCaching(res, this.createNew, this.ctx);
                })
                    .catch((e) => {
                    cache.delete(cacheKey);
                    throw e;
                });
                cacheEntry = { result };
                cache.set(cacheKey, cacheEntry);
            }
            return new DefinitionSanitizingExecutionResult(await cacheEntry.result, this.createNew, this.definition);
        };
        this.createNew = (decorated) => {
            return new WithExecutionCaching(decorated, this.ctx);
        };
    }
}
/**
 * This DataView decorator makes sure that definition used in it is the same as the definition in the result.
 *
 * See the usage of this class in {@link DefinitionSanitizingExecutionResult} for more.
 */
class DefinitionSanitizingDataView extends DecoratedDataView {
    constructor(decorated, result) {
        super(decorated, result);
        this.definition = result.definition;
    }
}
/**
 * This ExecutionResult decorator makes sure that definitions used throughout the result are set
 * to the definitionOverride provided. This is useful with caching because different definitions may yield
 * the same cache key, but having the proper definition in the returned execution result is critical:
 * the definitions in the result must match the one which was used to request it.
 * This however is not always the case when using cached results, so we need to ensure it explicitly.
 *
 * See the usage of this class in {@link WithExecutionCaching} for more.
 */
class DefinitionSanitizingExecutionResult extends DecoratedExecutionResult {
    constructor(decorated, wrapper, definitionOverride) {
        super(decorated, wrapper);
        this.readAll = async () => {
            return this.withSanitizedDefinition(await super.readAll());
        };
        this.readWindow = async (offset, size) => {
            return this.withSanitizedDefinition(await super.readWindow(offset, size));
        };
        this.withSanitizedDefinition = (original) => {
            return new DefinitionSanitizingDataView(original, this);
        };
        this.definition = definitionOverride;
    }
}
function windowKey(offset, size) {
    return `o(${offset.join(",")})_s(${size.join(",")})`;
}
class WithExecutionResultCaching extends DecoratedExecutionResult {
    constructor(decorated, wrapper, ctx) {
        super(decorated, wrapper);
        this.ctx = ctx;
        this.readAll = () => {
            if (!this.allData) {
                this.allData = super.readAll().catch((e) => {
                    this.allData = undefined;
                    throw e;
                });
            }
            return this.allData;
        };
        this.readWindow = (offset, size) => {
            if (!this.windows) {
                return super.readWindow(offset, size);
            }
            const cacheKey = windowKey(offset, size);
            let window = this.windows.get(cacheKey);
            if (!window) {
                window = super.readWindow(offset, size).catch((e) => {
                    if (this.windows) {
                        this.windows.delete(cacheKey);
                    }
                    throw e;
                });
                this.windows.set(cacheKey, window);
            }
            return window;
        };
        if (cachingEnabled(this.ctx.config.maxResultWindows)) {
            this.windows = new LRUCache({ max: this.ctx.config.maxResultWindows });
        }
    }
}
//
// Catalog caching
//
function optionsKey(options) {
    return stringify(options);
}
class WithCatalogCaching extends DecoratedWorkspaceCatalogFactory {
    constructor(decorated, ctx) {
        super(decorated);
        this.ctx = ctx;
        this.load = () => {
            const cache = this.getOrCreateWorkspaceEntry(this.workspace).catalogForOptions;
            const cacheKey = optionsKey(this.options);
            let catalog = cache.get(cacheKey);
            if (!catalog) {
                catalog = super.load().catch((e) => {
                    cache.delete(cacheKey);
                    throw e;
                });
                cache.set(cacheKey, catalog);
            }
            return catalog;
        };
        this.createNew = (decorated) => {
            return new WithCatalogCaching(decorated, this.ctx);
        };
        this.getOrCreateWorkspaceEntry = (workspace) => {
            const cache = this.ctx.caches.workspaceCatalogs;
            let cacheEntry = cache.get(workspace);
            if (!cacheEntry) {
                cacheEntry = {
                    catalogForOptions: new LRUCache({
                        max: this.ctx.config.maxCatalogOptions,
                    }),
                };
                cache.set(workspace, cacheEntry);
            }
            return cacheEntry;
        };
    }
}
//
// Organization security settings caching
//
function validUrlInContextKey(url, context) {
    return `${context}_${stringify(url)}`;
}
class WithSecuritySettingsCaching extends DecoratedSecuritySettingsService {
    constructor(decorated, ctx) {
        super(decorated);
        this.ctx = ctx;
        this.isUrlValid = (url, context) => {
            const cache = this.getOrCreateSecuritySettingsEntry(this.scope).valid;
            const cacheKey = validUrlInContextKey(url, context);
            let result = cache.get(cacheKey);
            if (!result) {
                result = super.isUrlValid(url, context).catch((e) => {
                    cache.delete(cacheKey);
                    throw e;
                });
                cache.set(cacheKey, result);
            }
            return result;
        };
        this.isDashboardPluginUrlValid = (url, workspace) => {
            const scope = `plugins_${workspace}`;
            const cache = this.getOrCreateSecuritySettingsEntry(scope).valid;
            let result = cache.get(url);
            if (!result) {
                result = super.isDashboardPluginUrlValid(url, workspace).catch((e) => {
                    cache.delete(url);
                    throw e;
                });
                cache.set(url, result);
            }
            return result;
        };
        this.getOrCreateSecuritySettingsEntry = (scope) => {
            const cache = this.ctx.caches.securitySettings;
            let cacheEntry = cache.get(scope);
            if (!cacheEntry) {
                cacheEntry = {
                    valid: new LRUCache({
                        max: this.ctx.config.maxSecuritySettingsOrgUrls,
                        ttl: this.ctx.config.maxSecuritySettingsOrgUrlsAge,
                    }),
                };
                cache.set(scope, cacheEntry);
            }
            return cacheEntry;
        };
    }
}
class WithWorkspaceSettingsCaching extends DecoratedWorkspaceSettingsService {
    constructor(decorated, ctx, workspace) {
        super(decorated);
        this.ctx = ctx;
        this.workspace = workspace;
        this.getSettings = () => {
            const cache = this.getOrCreateWorkspaceEntry(this.workspace).workspaceSettings;
            const cacheKey = this.workspace;
            let workspaceSettings = cache.get(cacheKey);
            if (!workspaceSettings) {
                workspaceSettings = super.getSettings().catch((e) => {
                    cache.delete(cacheKey);
                    throw e;
                });
                cache.set(cacheKey, workspaceSettings);
            }
            return workspaceSettings;
        };
        this.getOrCreateWorkspaceEntry = (workspace) => {
            const cache = this.ctx.caches.workspaceSettings;
            let cacheEntry = cache.get(workspace);
            if (!cacheEntry) {
                cacheEntry = {
                    userWorkspaceSettings: new LRUCache({
                        max: this.ctx.config.maxWorkspaceSettings,
                    }),
                    workspaceSettings: new LRUCache({
                        max: this.ctx.config.maxWorkspaceSettings,
                    }),
                };
                cache.set(workspace, cacheEntry);
            }
            return cacheEntry;
        };
    }
    getSettingsForCurrentUser() {
        const cache = this.getOrCreateWorkspaceEntry(this.workspace).userWorkspaceSettings;
        const cacheKey = this.workspace; // we assume that the current user does not change over the life span of the backend instance
        let userWorkspaceSettings = cache.get(cacheKey);
        if (!userWorkspaceSettings) {
            userWorkspaceSettings = super.getSettingsForCurrentUser().catch((e) => {
                cache.delete(cacheKey);
                throw e;
            });
            cache.set(cacheKey, userWorkspaceSettings);
        }
        return userWorkspaceSettings;
    }
    async setLocale(locale) {
        return super.setLocale(locale);
    }
}
//
// Attributes caching
//
function refMatchesMdObject(ref, mdObject, type) {
    return (areObjRefsEqual(ref, mdObject.ref) ||
        areObjRefsEqual(ref, idRef(mdObject.id, type)) ||
        areObjRefsEqual(ref, uriRef(mdObject.uri)));
}
const firstDefined = flow(compact, first);
function elementsCacheKey(ref, settings) {
    return new SparkMD5().append(objRefToString(ref)).append(stringify(settings)).end();
}
function getOrCreateAttributeCache(ctx, workspace) {
    const cache = ctx.caches.workspaceAttributes;
    let cacheEntry = cache.get(workspace);
    if (!cacheEntry) {
        cacheEntry = {
            displayForms: new LRUCache({
                max: ctx.config.maxAttributeDisplayFormsPerWorkspace,
            }),
            attributesByDisplayForms: new LRUCache({
                max: ctx.config.maxAttributesPerWorkspace,
            }),
            attributeElementResults: cachingEnabled(ctx.config.maxAttributeElementResultsPerWorkspace)
                ? new LRUCache({
                    max: ctx.config.maxAttributeElementResultsPerWorkspace,
                })
                : undefined,
        };
        cache.set(workspace, cacheEntry);
    }
    return cacheEntry;
}
class CachedElementsQuery extends DecoratedElementsQuery {
    constructor(decorated, ctx, workspace, ref, settings = {}) {
        super(decorated, settings);
        this.ctx = ctx;
        this.workspace = workspace;
        this.ref = ref;
        this.query = async () => {
            var _a;
            const canCache = !((_a = this.settings.options) === null || _a === void 0 ? void 0 : _a.filter);
            if (!canCache) {
                return super.query();
            }
            const cache = getOrCreateAttributeCache(this.ctx, this.workspace).attributeElementResults;
            invariant(cache, "inconsistent attribute element cache config");
            const cacheKey = elementsCacheKey(this.ref, this.settings);
            let result = cache.get(cacheKey);
            if (!result) {
                result = super.query().catch((e) => {
                    cache.delete(cacheKey);
                    throw e;
                });
                cache.set(cacheKey, result);
            }
            return result;
        };
    }
    createNew(decorated, settings) {
        return new CachedElementsQuery(decorated, this.ctx, this.workspace, this.ref, settings);
    }
}
class CachedElementsQueryFactory extends DecoratedElementsQueryFactory {
    constructor(decorated, ctx, workspace) {
        super(decorated);
        this.ctx = ctx;
        this.workspace = workspace;
    }
    forDisplayForm(ref) {
        const decorated = this.decorated.forDisplayForm(ref);
        return new CachedElementsQuery(decorated, this.ctx, this.workspace, ref);
    }
}
class WithAttributesCaching extends DecoratedWorkspaceAttributesService {
    constructor(decorated, ctx, workspace) {
        super(decorated);
        this.ctx = ctx;
        this.workspace = workspace;
        this.getAttributeDisplayForm = (ref) => {
            const cache = getOrCreateAttributeCache(this.ctx, this.workspace).displayForms;
            const idCacheKey = isIdentifierRef(ref) ? ref.identifier : undefined;
            const uriCacheKey = isUriRef(ref) ? ref.uri : undefined;
            let cacheItem = firstDefined([idCacheKey, uriCacheKey].map((key) => key && cache.get(key)));
            if (!cacheItem) {
                cacheItem = super.getAttributeDisplayForm(ref).catch((e) => {
                    if (idCacheKey) {
                        cache.delete(idCacheKey);
                    }
                    if (uriCacheKey) {
                        cache.delete(uriCacheKey);
                    }
                    throw e;
                });
                if (idCacheKey) {
                    cache.set(idCacheKey, cacheItem);
                }
                if (uriCacheKey) {
                    cache.set(uriCacheKey, cacheItem);
                }
            }
            return cacheItem;
        };
        this.getAttributeDisplayForms = async (refs) => {
            const cache = getOrCreateAttributeCache(this.ctx, this.workspace).displayForms;
            // grab a reference to the cache results as soon as possible in case they would get evicted while loading the ones with missing data in cache
            // then would might not be able to call cache.get again and be guaranteed to get the data
            const refsWithCacheResults = refs.map((ref) => {
                const idCacheKey = isIdentifierRef(ref) ? ref.identifier : undefined;
                const uriCacheKey = isUriRef(ref) ? ref.uri : undefined;
                const cacheHit = firstDefined([idCacheKey, uriCacheKey].map((key) => key && cache.get(key)));
                return { ref, cacheHit };
            });
            const [withCacheHits, withoutCacheHits] = partition(refsWithCacheResults, ({ cacheHit }) => !!cacheHit);
            const refsToLoad = withoutCacheHits.map((item) => item.ref);
            const [alreadyInCache, loadedFromServer] = await Promise.all([
                // await the stuff from cache, we need the data available (we cannot just return the promises)
                Promise.all(withCacheHits.map((item) => item.cacheHit)),
                // load items not in cache using the bulk operation
                this.decorated.getAttributeDisplayForms(refsToLoad),
            ]);
            // save newly loaded to cache for future reference
            loadedFromServer.forEach((loaded) => {
                const promisifiedResult = Promise.resolve(loaded);
                // save the cache item for both types of refs
                cache.set(loaded.id, promisifiedResult);
                cache.set(loaded.uri, promisifiedResult);
            });
            const loadedRefs = loadedFromServer.map((item) => item.ref);
            const outputRefs = this.ctx.capabilities.allowsInconsistentRelations
                ? skipMissingReferences(refs, refsToLoad, loadedRefs)
                : refs;
            // reconstruct the original ordering
            const candidates = [...loadedFromServer, ...alreadyInCache];
            return outputRefs.map((ref) => {
                const match = candidates.find((item) => refMatchesMdObject(ref, item, "displayForm"));
                // if this bombs, some data got lost in the process
                invariant(match);
                return match;
            });
        };
        this.getAttributeByDisplayForm = async (ref) => {
            const cache = getOrCreateAttributeCache(this.ctx, this.workspace).attributesByDisplayForms;
            const idCacheKey = isIdentifierRef(ref) ? ref.identifier : undefined;
            const uriCacheKey = isUriRef(ref) ? ref.uri : undefined;
            let cacheItem = firstDefined([idCacheKey, uriCacheKey].map((key) => key && cache.get(key)));
            if (!cacheItem) {
                // eslint-disable-next-line sonarjs/no-identical-functions
                cacheItem = super.getAttributeByDisplayForm(ref).catch((e) => {
                    if (idCacheKey) {
                        cache.delete(idCacheKey);
                    }
                    if (uriCacheKey) {
                        cache.delete(uriCacheKey);
                    }
                    throw e;
                });
                if (idCacheKey) {
                    cache.set(idCacheKey, cacheItem);
                }
                if (uriCacheKey) {
                    cache.set(uriCacheKey, cacheItem);
                }
            }
            return cacheItem;
        };
    }
    elements() {
        const decorated = this.decorated.elements();
        return cachingEnabled(this.ctx.config.maxAttributeElementResultsPerWorkspace)
            ? new CachedElementsQueryFactory(decorated, this.ctx, this.workspace)
            : decorated;
    }
}
//
//
//
function cachedExecutions(ctx) {
    return (original) => new DecoratedExecutionFactory(original, (execution) => new WithExecutionCaching(execution, ctx));
}
function cachedCatalog(ctx) {
    return (original) => new WithCatalogCaching(original, ctx);
}
function cachedSecuritySettings(ctx) {
    return (original) => new WithSecuritySettingsCaching(original, ctx);
}
function cachedWorkspaceSettings(ctx) {
    return (original, workspace) => new WithWorkspaceSettingsCaching(original, ctx, workspace);
}
function cachedAttributes(ctx) {
    return (original, workspace) => new WithAttributesCaching(original, ctx, workspace);
}
function cachingEnabled(desiredSize) {
    return desiredSize !== undefined && desiredSize > 0;
}
function cacheControl(ctx) {
    const control = {
        resetExecutions: () => {
            var _a;
            (_a = ctx.caches.execution) === null || _a === void 0 ? void 0 : _a.clear();
        },
        resetCatalogs: () => {
            var _a;
            (_a = ctx.caches.workspaceCatalogs) === null || _a === void 0 ? void 0 : _a.clear();
        },
        resetSecuritySettings: () => {
            var _a;
            (_a = ctx.caches.securitySettings) === null || _a === void 0 ? void 0 : _a.clear();
        },
        resetAttributes: () => {
            var _a;
            (_a = ctx.caches.workspaceAttributes) === null || _a === void 0 ? void 0 : _a.clear();
        },
        resetWorkspaceSettings: () => {
            var _a;
            (_a = ctx.caches.workspaceSettings) === null || _a === void 0 ? void 0 : _a.clear();
        },
        resetAll: () => {
            control.resetExecutions();
            control.resetCatalogs();
            control.resetSecuritySettings();
            control.resetAttributes();
            control.resetWorkspaceSettings();
        },
    };
    return control;
}
function assertPositiveOrUndefined(value, valueName) {
    invariant(value === undefined || value > 0, `${valueName} to cache must be positive or undefined, got: ${value}`);
}
/**
 * These are the recommended settings for the backend caching.
 *
 * @remarks
 * For more information on what the options mean see {@link CachingConfiguration}.
 *
 * @public
 */
export const RecommendedCachingConfiguration = {
    maxExecutions: 10,
    maxResultWindows: 5,
    maxCatalogs: 1,
    maxCatalogOptions: 50,
    maxSecuritySettingsOrgs: 3,
    maxSecuritySettingsOrgUrls: 100,
    maxSecuritySettingsOrgUrlsAge: 300000,
    maxAttributeWorkspaces: 1,
    maxAttributeDisplayFormsPerWorkspace: 100,
    maxAttributesPerWorkspace: 100,
    maxAttributeElementResultsPerWorkspace: 100,
    maxWorkspaceSettings: 1,
};
/**
 * Adds caching layer on top of an existing analytical backend instance. It is currently possible to cache
 * results of executions and the workspace LDM catalog.
 *
 * @remarks see {@link CachingConfiguration} properties for more information.
 * @param realBackend - real backend to decorate with caching
 * @param config - caching configuration. {@link RecommendedCachingConfiguration} can be used
 * @public
 */
export function withCaching(realBackend, config) {
    assertPositiveOrUndefined(config.maxCatalogOptions, "maxCatalogOptions");
    assertPositiveOrUndefined(config.maxSecuritySettingsOrgUrls, "maxSecuritySettingsOrgUrls");
    assertPositiveOrUndefined(config.maxSecuritySettingsOrgUrlsAge, "maxSecuritySettingsOrgUrlsAge");
    const execCaching = cachingEnabled(config.maxExecutions);
    const catalogCaching = cachingEnabled(config.maxCatalogs);
    const securitySettingsCaching = cachingEnabled(config.maxSecuritySettingsOrgs);
    const attributeCaching = cachingEnabled(config.maxAttributeWorkspaces);
    const workspaceSettingsCaching = cachingEnabled(config.maxWorkspaceSettings);
    const ctx = {
        caches: {
            execution: execCaching ? new LRUCache({ max: config.maxExecutions }) : undefined,
            workspaceCatalogs: catalogCaching ? new LRUCache({ max: config.maxCatalogs }) : undefined,
            securitySettings: securitySettingsCaching
                ? new LRUCache({ max: config.maxSecuritySettingsOrgs })
                : undefined,
            workspaceAttributes: attributeCaching
                ? new LRUCache({ max: config.maxAttributeWorkspaces })
                : undefined,
            workspaceSettings: workspaceSettingsCaching
                ? new LRUCache({ max: config.maxWorkspaceSettings })
                : undefined,
        },
        config,
        capabilities: realBackend.capabilities,
    };
    const execution = execCaching ? cachedExecutions(ctx) : identity;
    const catalog = catalogCaching ? cachedCatalog(ctx) : identity;
    const securitySettings = securitySettingsCaching ? cachedSecuritySettings(ctx) : identity;
    const attributes = attributeCaching ? cachedAttributes(ctx) : identity;
    const workspaceSettings = workspaceSettingsCaching ? cachedWorkspaceSettings(ctx) : identity;
    if (config.onCacheReady) {
        config.onCacheReady(cacheControl(ctx));
    }
    return decoratedBackend(realBackend, {
        execution,
        catalog,
        securitySettings,
        attributes,
        workspaceSettings,
    });
}
function skipMissingReferences(requestedRefs, refsToLoad, refsLoadedFromServer) {
    const missingRefs = refsToLoad.filter((ref) => !refsLoadedFromServer.some((loadedRef) => areObjRefsEqual(loadedRef, ref)));
    return requestedRefs.filter((inputRef) => !missingRefs.some((missingRef) => areObjRefsEqual(missingRef, inputRef)));
}
//# sourceMappingURL=index.js.map