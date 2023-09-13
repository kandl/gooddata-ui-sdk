// (C) 2020-2023 GoodData Corporation
import { isDashboardPluginsItem, isVisualizationObjectsItem, JsonApiAnalyticalDashboardInTypeEnum, JsonApiDashboardPluginInTypeEnum, JsonApiFilterContextInTypeEnum, jsonApiHeaders, MetadataUtilities, ValidateRelationsHeader, } from "@gooddata/api-client-tiger";
import { NotSupported, UnexpectedError, TimeoutError, } from "@gooddata/sdk-backend-spi";
import { areObjRefsEqual, idRef, isFilterContext, isFilterContextDefinition, isTempFilterContext, isAllTimeDashboardDateFilter, objRefToString, } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import { convertAnalyticalDashboardToListItems, convertDashboard, convertFilterContextFromBackend, getFilterContextFromIncluded, convertDashboardPluginFromBackend, convertDashboardPluginWithLinksFromBackend, } from "../../../convertors/fromBackend/analyticalDashboards/AnalyticalDashboardConverter.js";
import { visualizationObjectsItemToInsight } from "../../../convertors/fromBackend/InsightConverter.js";
import { convertAnalyticalDashboard, convertDashboardPluginToBackend, convertFilterContextToBackend, } from "../../../convertors/toBackend/AnalyticalDashboardConverter.js";
import { objRefsToIdentifiers, objRefToIdentifier } from "../../../utils/api.js";
import { resolveWidgetFilters } from "./widgetFilters.js";
import includes from "lodash/includes.js";
import { buildDashboardPermissions } from "./dashboardPermissions.js";
import { convertExportMetadata as convertToBackendExportMetadata } from "../../../convertors/toBackend/ExportMetadataConverter.js";
import { convertExportMetadata as convertFromBackendExportMetadata } from "../../../convertors/fromBackend/ExportMetadataConverter.js";
import { parseNameFromContentDisposition } from "../../../utils/downloadFile.js";
const DEFAULT_POLL_DELAY = 5000;
const MAX_POLL_ATTEMPTS = 50;
export class TigerWorkspaceDashboards {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        // Public methods
        this.getDashboards = async (options) => {
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData)
                ? { include: ["createdBy", "modifiedBy"] }
                : {};
            const result = await this.authCall((client) => {
                return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesAnalyticalDashboards, Object.assign({ workspaceId: this.workspace, metaInclude: ["accessInfo"] }, includeUser))
                    .then(MetadataUtilities.mergeEntitiesResults)
                    .then(MetadataUtilities.filterValidEntities);
            });
            return convertAnalyticalDashboardToListItems(result);
        };
        this.getDashboard = async (ref, filterContextRef, options) => {
            var _a;
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData) ? ["createdBy", "modifiedBy"] : [];
            const id = await objRefToIdentifier(ref, this.authCall);
            const result = await this.authCall((client) => {
                return client.entities.getEntityAnalyticalDashboards({
                    workspaceId: this.workspace,
                    objectId: id,
                    include: ["filterContexts", ...includeUser],
                    metaInclude: ["accessInfo"],
                }, {
                    headers: jsonApiHeaders,
                });
            });
            const filterContext = await this.prepareFilterContext(options === null || options === void 0 ? void 0 : options.exportId, filterContextRef, (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.included);
            return convertDashboard(result.data, filterContext);
        };
        this.getDashboardWithReferences = async (ref, filterContextRef, options, types = ["insight", "dashboardPlugin"]) => {
            const dashboard = await this.getDashboardWithSideloads(ref, types, options);
            const included = dashboard.included || [];
            const insights = included
                .filter(isVisualizationObjectsItem)
                .map((insight) => visualizationObjectsItemToInsight(insight, included));
            const plugins = included
                .filter(isDashboardPluginsItem)
                .map((plugin) => convertDashboardPluginWithLinksFromBackend(plugin, included));
            const filterContext = await this.prepareFilterContext(options === null || options === void 0 ? void 0 : options.exportId, filterContextRef, included);
            return {
                dashboard: convertDashboard(dashboard, filterContext),
                references: {
                    insights,
                    plugins,
                },
            };
        };
        this.getDashboardReferencedObjects = (dashboard, types = ["insight"]) => {
            return this.getDashboardWithSideloads(dashboard.ref, types).then((result) => {
                const included = result.included || [];
                return {
                    insights: included
                        .filter(isVisualizationObjectsItem)
                        .map((insight) => visualizationObjectsItemToInsight(insight, included)),
                    plugins: included
                        .filter(isDashboardPluginsItem)
                        .map((plugin) => convertDashboardPluginWithLinksFromBackend(plugin, included)),
                };
            });
        };
        this.getFilterContextFromExportId = async (exportId) => {
            const metadata = await this.authCall((client) => {
                return client.export.getMetadata({
                    workspaceId: this.workspace,
                    exportId,
                });
            })
                .then((result) => result.data)
                .catch(() => null);
            if (!metadata) {
                // Error during fetching of export metadata: return null and
                // fallback to default filters later.
                return null;
            }
            const { filters = [] } = convertFromBackendExportMetadata(metadata);
            return {
                filters,
                title: `temp-filter-context-${exportId}`,
                description: "temp-filter-context-description",
                ref: { identifier: `identifier-${exportId}` },
                uri: `uri-${exportId}`,
                identifier: `identifier-${exportId}`,
            };
        };
        this.getDashboardWithSideloads = async (ref, types, options) => {
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData) ? ["createdBy", "modifiedBy"] : [];
            const include = [
                "filterContexts",
                ...includeUser,
            ];
            if (includes(types, "insight")) {
                include.push("visualizationObjects");
            }
            if (includes(types, "dashboardPlugin")) {
                include.push("dashboardPlugins");
            }
            const id = await objRefToIdentifier(ref, this.authCall);
            return this.authCall((client) => {
                return client.entities.getEntityAnalyticalDashboards({
                    workspaceId: this.workspace,
                    objectId: id,
                    include,
                    metaInclude: ["accessInfo"],
                }, {
                    headers: jsonApiHeaders,
                });
            }).then((result) => result.data);
        };
        this.createDashboard = async (dashboard) => {
            let filterContext;
            if (dashboard.filterContext) {
                filterContext = isFilterContextDefinition(dashboard.filterContext)
                    ? await this.createFilterContext(dashboard.filterContext)
                    : dashboard.filterContext;
            }
            const dashboardContent = convertAnalyticalDashboard(dashboard, filterContext === null || filterContext === void 0 ? void 0 : filterContext.ref);
            const result = await this.authCall((client) => {
                return client.entities.createEntityAnalyticalDashboards({
                    workspaceId: this.workspace,
                    jsonApiAnalyticalDashboardPostOptionalIdDocument: {
                        data: {
                            type: JsonApiAnalyticalDashboardInTypeEnum.ANALYTICAL_DASHBOARD,
                            attributes: Object.assign({ content: dashboardContent, title: dashboard.title, description: dashboard.description || "" }, (dashboard.tags ? { tags: dashboard.tags } : {})),
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            // TODO: TNT-1310 Revert back to `return convertDashboard(result.data, filterContext)`
            const { id, type } = result.data.data;
            return this.getDashboard(idRef(id, type));
        };
        this.updateDashboard = async (originalDashboard, updatedDashboard) => {
            if (!areObjRefsEqual(originalDashboard.ref, updatedDashboard.ref)) {
                throw new Error("Cannot update dashboard with different refs!");
            }
            else if (isEqual(originalDashboard, updatedDashboard)) {
                return originalDashboard;
            }
            // Missing refs means that the dashboard is not yet stored, so let's create it
            if (!originalDashboard.ref && !updatedDashboard.ref) {
                return this.createDashboard(updatedDashboard);
            }
            const filterContext = await this.processFilterContextUpdate(originalDashboard.filterContext, updatedDashboard.filterContext);
            const objectId = await objRefToIdentifier(originalDashboard.ref, this.authCall);
            const dashboardContent = convertAnalyticalDashboard(updatedDashboard, filterContext === null || filterContext === void 0 ? void 0 : filterContext.ref);
            const result = await this.authCall((client) => {
                return client.entities.updateEntityAnalyticalDashboards({
                    workspaceId: this.workspace,
                    objectId,
                    jsonApiAnalyticalDashboardInDocument: {
                        data: {
                            id: objectId,
                            type: JsonApiAnalyticalDashboardInTypeEnum.ANALYTICAL_DASHBOARD,
                            attributes: Object.assign({ content: dashboardContent, title: updatedDashboard.title, description: updatedDashboard.description || "" }, (updatedDashboard.tags ? { tags: updatedDashboard.tags } : {})),
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            /**
             * Getting the dashboard again to get the shareStatus of the dashboard
             * When NAS-4822 is completed, we can add `metainclude: ["accessInfo"],` to the payload above
             * and return just `convertDashboard(result.data, filterContext);` below
             */
            const { id, type } = result.data.data;
            return this.getDashboard(idRef(id, type));
        };
        this.deleteDashboard = async (ref) => {
            const id = await objRefToIdentifier(ref, this.authCall);
            await this.authCall((client) => client.entities.deleteEntityAnalyticalDashboards({
                objectId: id,
                workspaceId: this.workspace,
            }, {
                headers: jsonApiHeaders,
            }));
        };
        this.exportDashboardToPdf = async (dashboardRef, filters) => {
            const dashboardId = await objRefToIdentifier(dashboardRef, this.authCall);
            // skip all time date filter from stored filters, when missing, it's correctly
            // restored to All time during the load later
            const withoutAllTime = (filters || []).filter((f) => !isAllTimeDashboardDateFilter(f));
            return this.authCall(async (client) => {
                var _a;
                const dashboardResponse = await client.entities.getEntityAnalyticalDashboards({
                    workspaceId: this.workspace,
                    objectId: dashboardId,
                }, {
                    headers: jsonApiHeaders,
                });
                const { title } = convertDashboard(dashboardResponse.data);
                const pdfExportRequest = {
                    fileName: title,
                    dashboardId,
                    metadata: convertToBackendExportMetadata({ filters: withoutAllTime }),
                };
                const pdfExport = await client.export.createPdfExport({
                    workspaceId: this.workspace,
                    pdfExportRequest,
                });
                return await this.handleExportResultPolling(client, {
                    workspaceId: this.workspace,
                    exportId: (_a = pdfExport === null || pdfExport === void 0 ? void 0 : pdfExport.data) === null || _a === void 0 ? void 0 : _a.exportResult,
                });
            });
        };
        this.createScheduledMail = async () => {
            throw new NotSupported("Tiger backend does not support scheduled emails.");
        };
        this.updateScheduledMail = async () => {
            throw new NotSupported("Tiger backend does not support scheduled emails.");
        };
        this.deleteScheduledMail = async () => {
            throw new NotSupported("Tiger backend does not support scheduled emails.");
        };
        this.getScheduledMailsForDashboard = async () => {
            throw new NotSupported("Tiger backend does not support scheduled emails.");
        };
        this.getScheduledMailsCountForDashboard = async () => {
            // FIXME Not supported
            return 0;
        };
        this.getAllWidgetAlertsForCurrentUser = async () => {
            // FIXME Not supported
            return [];
        };
        this.getDashboardWidgetAlertsForCurrentUser = async () => {
            throw new NotSupported("Tiger backend does not support alerting.");
        };
        this.getWidgetAlertsCountForWidgets = async () => {
            // FIXME Not supported
            return [];
        };
        this.createWidgetAlert = async () => {
            throw new NotSupported("Tiger backend does not support alerting.");
        };
        this.updateWidgetAlert = async () => {
            throw new NotSupported("Tiger backend does not support alerting.");
        };
        this.deleteWidgetAlert = async () => {
            throw new NotSupported("Tiger backend does not support alerting.");
        };
        this.deleteWidgetAlerts = async () => {
            throw new NotSupported("Tiger backend does not support alerting.");
        };
        this.getWidgetReferencedObjects = async () => {
            throw new NotSupported("Tiger backend does not support alerting.");
        };
        this.getResolvedFiltersForWidget = async (widget, filters) => {
            return resolveWidgetFilters(filters, widget.ignoreDashboardFilters, widget.dateDataSet, (refs) => objRefsToIdentifiers(refs, this.authCall));
        };
        this.createDashboardPlugin = async (plugin) => {
            const pluginContent = convertDashboardPluginToBackend(plugin);
            const result = await this.authCall((client) => {
                var _a;
                return client.entities.createEntityDashboardPlugins({
                    workspaceId: this.workspace,
                    jsonApiDashboardPluginPostOptionalIdDocument: {
                        data: {
                            type: JsonApiDashboardPluginInTypeEnum.DASHBOARD_PLUGIN,
                            attributes: {
                                content: pluginContent,
                                title: plugin.name,
                                description: (_a = plugin.description) !== null && _a !== void 0 ? _a : "",
                            },
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            return convertDashboardPluginFromBackend(result.data);
        };
        this.deleteDashboardPlugin = async (ref) => {
            const id = await objRefToIdentifier(ref, this.authCall);
            await this.authCall((client) => client.entities.deleteEntityDashboardPlugins({
                objectId: id,
                workspaceId: this.workspace,
            }, {
                headers: jsonApiHeaders,
            }));
        };
        this.getDashboardPlugin = async (ref, options) => {
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData)
                ? { include: ["createdBy", "modifiedBy"] }
                : {};
            const objectId = await objRefToIdentifier(ref, this.authCall);
            const result = await this.authCall((client) => {
                return client.entities.getEntityDashboardPlugins(Object.assign({ workspaceId: this.workspace, objectId }, includeUser), {
                    headers: jsonApiHeaders,
                });
            });
            return convertDashboardPluginFromBackend(result.data);
        };
        this.getDashboardPlugins = async (options) => {
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData)
                ? { include: ["createdBy", "modifiedBy"] }
                : {};
            const result = await this.authCall((client) => {
                return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesDashboardPlugins, Object.assign({ workspaceId: this.workspace }, includeUser), { headers: ValidateRelationsHeader })
                    .then(MetadataUtilities.mergeEntitiesResults)
                    .then(MetadataUtilities.filterValidEntities);
            });
            return result.data.map((plugin) => convertDashboardPluginWithLinksFromBackend(plugin, result.included));
        };
        this.validateDashboardsExistence = async (dashboardRefs) => {
            const entitiesGraph = await this.authCall((client) => client.actions
                .getDependentEntitiesGraph({
                workspaceId: this.workspace,
            })
                .then((res) => res.data.graph));
            const analyticalDashboards = entitiesGraph.nodes.filter(({ type }) => type === "analyticalDashboard");
            // Refs which are not listed in entities graph are non-existent
            const validDashboardRefs = dashboardRefs.filter((ref) => {
                const dashboardId = objRefToString(ref);
                return analyticalDashboards.some(({ id }) => id === dashboardId);
            });
            return validDashboardRefs.map((ref) => ({
                ref,
                identifier: objRefToString(ref),
                uri: "", // uri is not available in entities graph
            }));
        };
        //
        //
        //
        this.createFilterContext = async (filterContext) => {
            const tigerFilterContext = convertFilterContextToBackend(filterContext);
            const result = await this.authCall((client) => {
                return client.entities.createEntityFilterContexts({
                    workspaceId: this.workspace,
                    jsonApiFilterContextPostOptionalIdDocument: {
                        data: {
                            type: JsonApiFilterContextInTypeEnum.FILTER_CONTEXT,
                            attributes: {
                                content: tigerFilterContext,
                                title: filterContext.title || "",
                                description: filterContext.description || "",
                            },
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            return convertFilterContextFromBackend(result.data);
        };
        this.getDashboardPermissions = async (ref) => {
            var _a, _b;
            try {
                const workspaceWithPermissionsResponse = await this.authCall((client) => {
                    return client.entities.getEntityWorkspaces({
                        id: this.workspace,
                        metaInclude: ["permissions"],
                    });
                });
                // check if the user is admin who has all the permissions
                const workspacePermissions = (_a = workspaceWithPermissionsResponse.data.data.meta.permissions) !== null && _a !== void 0 ? _a : [];
                if (workspacePermissions.indexOf("MANAGE") >= 0) {
                    return buildDashboardPermissions(["EDIT"]);
                }
                const dashboardObjectId = await objRefToIdentifier(ref, this.authCall);
                const dashboardWithPermissionsResponse = await this.authCall((client) => {
                    return client.entities.getEntityAnalyticalDashboards({
                        workspaceId: this.workspace,
                        objectId: dashboardObjectId,
                        metaInclude: ["permissions"],
                    });
                });
                const dashboardPermissions = (_b = dashboardWithPermissionsResponse.data.data.meta.permissions) !== null && _b !== void 0 ? _b : [];
                return buildDashboardPermissions(dashboardPermissions);
            }
            catch (_c) {
                return buildDashboardPermissions([]);
            }
        };
        this.processFilterContextUpdate = async (originalFilterContext, updatedFilterContext) => {
            if (isTempFilterContext(originalFilterContext)) {
                throw new UnexpectedError("Cannot update temp filter context!");
            }
            else if (isFilterContextDefinition(updatedFilterContext)) {
                // Create a new filter context
                return this.createFilterContext(updatedFilterContext);
            }
            else if (isFilterContext(updatedFilterContext)) {
                // Update the current filter context
                const shouldUpdateFilterContext = !isEqual(originalFilterContext, updatedFilterContext);
                if (shouldUpdateFilterContext) {
                    return this.updateFilterContext(updatedFilterContext);
                }
            }
            // No change, return the original filter context
            return originalFilterContext;
        };
        this.updateFilterContext = async (filterContext) => {
            const tigerFilterContext = convertFilterContextToBackend(filterContext);
            const objectId = await objRefToIdentifier(filterContext.ref, this.authCall);
            const result = await this.authCall((client) => {
                return client.entities.updateEntityFilterContexts({
                    workspaceId: this.workspace,
                    objectId,
                    jsonApiFilterContextInDocument: {
                        data: {
                            id: objectId,
                            type: JsonApiFilterContextInTypeEnum.FILTER_CONTEXT,
                            attributes: {
                                content: tigerFilterContext,
                                title: filterContext.title || "",
                                description: filterContext.description || "",
                            },
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            return convertFilterContextFromBackend(result.data);
        };
        this.getFilterContext = async (filterContextRef) => {
            const filterContextId = await objRefToIdentifier(filterContextRef, this.authCall);
            const result = await this.authCall((client) => {
                return client.entities.getEntityFilterContexts({
                    workspaceId: this.workspace,
                    objectId: filterContextId,
                }, {
                    headers: jsonApiHeaders,
                });
            });
            return convertFilterContextFromBackend(result.data);
        };
        // prepare filter context with priority for given filtercontext options
        this.prepareFilterContext = async (exportId, filterContextRef, includedFilterContext = []) => {
            const filterContextByRef = filterContextRef
                ? await this.getFilterContext(filterContextRef)
                : undefined;
            const filterContextByExportId = exportId
                ? await this.getFilterContextFromExportId(exportId)
                : undefined;
            return (filterContextByExportId ||
                filterContextByRef ||
                getFilterContextFromIncluded(includedFilterContext));
        };
    }
    async handleExportResultPolling(client, payload) {
        var _a;
        for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
            const result = await client.export.getExportedFile(payload, {
                transformResponse: (x) => x,
                responseType: "blob",
            });
            if ((result === null || result === void 0 ? void 0 : result.status) === 200) {
                const blob = new Blob([result === null || result === void 0 ? void 0 : result.data], { type: "application/pdf" });
                return {
                    uri: ((_a = result === null || result === void 0 ? void 0 : result.config) === null || _a === void 0 ? void 0 : _a.url) || "",
                    objectUrl: URL.createObjectURL(blob),
                    fileName: parseNameFromContentDisposition(result),
                };
            }
            await new Promise((resolve) => setTimeout(resolve, DEFAULT_POLL_DELAY));
        }
        throw new TimeoutError(`Export timeout for export id "${payload.exportId}" in workspace "${payload.workspaceId}"`);
    }
}
//# sourceMappingURL=index.js.map