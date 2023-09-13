// (C) 2019-2023 GoodData Corporation
import { layoutWidgetsWithPaths, layoutWidgets, UnexpectedError, } from "@gooddata/sdk-backend-spi";
import { areObjRefsEqual, objRefToString, uriRef, isFilterContext, isFilterContextDefinition, isTempFilterContext, isWidget, isWidgetDefinition, widgetType, } from "@gooddata/sdk-model";
import { convertVisualization } from "../../../convertors/fromBackend/VisualizationConverter.js";
import * as fromSdkModel from "../../../convertors/toBackend/DashboardConverter.js";
import * as toSdkModel from "../../../convertors/fromBackend/DashboardConverter/index.js";
import clone from "lodash/clone.js";
import compact from "lodash/compact.js";
import flatMap from "lodash/flatMap.js";
import flatten from "lodash/flatten.js";
import isEqual from "lodash/isEqual.js";
import set from "lodash/set.js";
import { getObjectIdFromUri, objRefsToUris, objRefToUri, updateUserMap, userUriFromAuthenticatedPrincipalWithAnonymous, } from "../../../utils/api.js";
import keyBy from "lodash/keyBy.js";
import { BearWorkspaceInsights } from "../insights/index.js";
import { WidgetReferencesQuery } from "./widgetReferences.js";
import { invariant } from "ts-invariant";
import { resolveWidgetFilters } from "./widgetFilters.js";
import { sanitizeFilterContext } from "./filterContexts.js";
import { getAnalyticalDashboardUserUris, getDashboardPluginUserUris } from "../../../utils/metadata.js";
import isEmpty from "lodash/isEmpty.js";
import includes from "lodash/includes.js";
import remove from "lodash/remove.js";
import { convertUser } from "../../../convertors/fromBackend/UsersConverter.js";
import { BearWorkspacePermissionsFactory } from "../permissions/permissions.js";
import { isDashboardPlugin, isVisualization, } from "@gooddata/api-model-bear";
/**
 * Lists types of those metadata object that are essentially components of the dashboard object. Every time
 * when dashboard is loaded all related objects of these types must be loaded as well as their
 * content is integral part of the dashboard itself.
 */
const DashboardComponentTypes = ["kpi", "visualizationWidget", "filterContext"];
// TODO: refactor impl into bunch of smaller classes + delegates
export class BearWorkspaceDashboards {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        // Public methods
        this.getDashboards = async (options = {}) => {
            const explicitlySharedDashboardsObjectLinks = await this.authCall((sdk) => sdk.md.getAnalyticalDashboards(this.workspace));
            const accessibleDashboardsObjectLinks = await this.getAccessibleDashboards(explicitlySharedDashboardsObjectLinks, !!options.includeAvailableViaLink);
            const userMap = options.loadUserData
                ? await updateUserMap(new Map(), compact(flatMap(accessibleDashboardsObjectLinks, (link) => [link.author, link.contributor])), this.authCall)
                : new Map();
            return accessibleDashboardsObjectLinks.map((link) => {
                const availability = this.isExplicitlyShared(link, explicitlySharedDashboardsObjectLinks)
                    ? "full"
                    : "viaLink";
                return toSdkModel.convertListedDashboard(link, availability, userMap);
            });
        };
        this.getDashboard = async (dashboardRef, exportFilterContextRef, options = {}) => {
            const dashboardUri = await objRefToUri(dashboardRef, this.workspace, this.authCall);
            const exportFilterContextUri = exportFilterContextRef
                ? await objRefToUri(exportFilterContextRef, this.workspace, this.authCall)
                : undefined;
            const bearDashboard = await this.getBearDashboard(dashboardUri);
            const dependenciesToGet = [...DashboardComponentTypes];
            const bearVisualizationClasses = [];
            if (!bearDashboard.analyticalDashboard.content.layout) {
                // when dashboard has no layout and only list of widgets, the conversion will build an
                // implicit layout. in order to set sizes correctly in that layout, the code needs to have
                // visualization objects & info about visualization classes
                dependenciesToGet.push("visualizationObject");
                bearVisualizationClasses.push(...(await this.getBearVisualizationClasses()));
            }
            const [bearDependencies, bearExportFilterContext] = await Promise.all([
                this.getBearDashboardDependencies(dashboardUri, dependenciesToGet),
                this.getBearExportFilterContext(exportFilterContextRef),
            ]);
            if (bearExportFilterContext) {
                bearDashboard.analyticalDashboard.content.filterContext = exportFilterContextUri;
                bearDependencies.push(bearExportFilterContext);
            }
            const userMap = options.loadUserData
                ? await updateUserMap(new Map(), getAnalyticalDashboardUserUris(bearDashboard), this.authCall)
                : new Map();
            return toSdkModel.convertDashboard(bearDashboard, bearDependencies, bearVisualizationClasses, exportFilterContextUri, userMap);
        };
        this.createDashboard = async (dashboard) => {
            const emptyDashboard = {
                type: "IDashboard",
                description: "",
                filterContext: undefined,
                title: "",
                shareStatus: "private",
                isUnderStrictControl: false,
            };
            return this.updateDashboard(emptyDashboard, dashboard);
        };
        this.updateDashboard = async (originalDashboard, updatedDashboard) => {
            if (!areObjRefsEqual(originalDashboard.ref, updatedDashboard.ref)) {
                throw new Error("Cannot update dashboard with different refs!");
            }
            if (isEqual(originalDashboard, updatedDashboard)) {
                return originalDashboard;
            }
            // for convenience allow clients to pass plugin links also with idRefs
            const sanitizedPlugins = updatedDashboard.plugins
                ? await this.ensureDashboardPluginLinksHaveUris(updatedDashboard.plugins)
                : undefined;
            const sanitizedDashboard = Object.assign(Object.assign({}, updatedDashboard), { plugins: sanitizedPlugins });
            const [filterContext, layout] = await Promise.all([
                this.updateFilterContext(originalDashboard.filterContext, sanitizedDashboard.filterContext),
                this.updateLayoutAndWidgets(originalDashboard.layout, sanitizedDashboard.layout),
            ]);
            // Missing refs means that the dashboard is not yet stored, so let's create it
            if (!originalDashboard.ref && !sanitizedDashboard.ref) {
                const createdDashboardWithSavedDependencies = Object.assign(Object.assign({}, sanitizedDashboard), { filterContext,
                    layout });
                return this.createBearDashboard(createdDashboardWithSavedDependencies);
            }
            const { created, updated, ref, uri, identifier } = originalDashboard;
            const updatedDashboardWithSavedDependencies = Object.assign(Object.assign({}, sanitizedDashboard), { created,
                updated,
                ref,
                uri,
                identifier,
                filterContext,
                layout });
            // First we need to delete any alerts referenced by the deleted widgets
            const deletedWidgets = this.collectDeletedWidgets(originalDashboard.layout, sanitizedDashboard.layout);
            const alertsToDelete = flatten(await Promise.all(deletedWidgets.map((widget) => this.getBearWidgetAlertsForWidget(widget))));
            if (alertsToDelete.length) {
                await this.deleteWidgetAlerts(alertsToDelete);
            }
            // Then update the dashboard itself
            await this.updateBearDashboard(updatedDashboardWithSavedDependencies);
            // And finally delete the now orphaned widgets
            await this.deleteBearWidgets(deletedWidgets);
            return updatedDashboardWithSavedDependencies;
        };
        this.deleteDashboard = async (dashboardRef) => {
            await this.deleteBearMetadataObject(dashboardRef);
        };
        this.exportDashboardToPdf = async (dashboardRef, filters) => {
            const dashboardUri = await objRefToUri(dashboardRef, this.workspace, this.authCall);
            const convertedFilters = filters === null || filters === void 0 ? void 0 : filters.map(fromSdkModel.convertFilterContextItem);
            return this.authCall((sdk) => sdk.dashboard.exportToPdf(this.workspace, dashboardUri, convertedFilters).then((res) => res));
        };
        this.createScheduledMail = async (scheduledMailDefinition, exportFilterContextDefinition) => {
            const filterContext = exportFilterContextDefinition &&
                (await this.createBearFilterContext(exportFilterContextDefinition));
            const scheduledMailWithFilterContext = filterContext
                ? Object.assign(Object.assign({}, scheduledMailDefinition), { attachments: scheduledMailDefinition.attachments.map((attachment) => (Object.assign(Object.assign({}, attachment), { filterContext: filterContext.ref }))) }) : scheduledMailDefinition;
            const convertedScheduledMail = fromSdkModel.convertScheduledMail(scheduledMailWithFilterContext);
            const createdBearScheduledMail = await this.authCall((sdk) => sdk.md.createObject(this.workspace, convertedScheduledMail));
            return toSdkModel.convertScheduledMail(createdBearScheduledMail);
        };
        this.updateScheduledMail = async (ref, scheduledMailDefinition, filterContextRef) => {
            const scheduledMailWithFilterContext = Object.assign(Object.assign({}, scheduledMailDefinition), { attachments: scheduledMailDefinition.attachments.map((attachment) => (Object.assign(Object.assign({}, attachment), { filterContext: filterContextRef }))) });
            const convertedScheduledMail = fromSdkModel.convertScheduledMail(scheduledMailWithFilterContext);
            await this.updateBearMetadataObject(ref, convertedScheduledMail);
        };
        this.deleteScheduledMail = async (scheduledMailRef) => {
            await this.deleteBearMetadataObject(scheduledMailRef);
        };
        this.getScheduledMailsForDashboard = async (dashboardRef, options = {}) => {
            const { createdByCurrentUser } = options;
            const scheduledMailObjectLinks = createdByCurrentUser
                ? await this.getScheduledMailObjectLinksForDashboardAndCurrentUser(dashboardRef)
                : await this.getScheduledMailObjectLinksForDashboard(dashboardRef);
            let userMap = new Map();
            if (options.loadUserData) {
                userMap = await updateUserMap(userMap, compact(flatMap(scheduledMailObjectLinks, (link) => [link.author, link.contributor])), this.authCall);
                // if listing users is not allowed add at least the current user
                if (userMap.values.length === 0) {
                    await this.authCall(async (sdk) => {
                        var _a, _b;
                        const profile = await sdk.user.getCurrentProfile();
                        const user = convertUser(profile);
                        if ((_a = profile.links) === null || _a === void 0 ? void 0 : _a.self) {
                            userMap.set((_b = profile.links) === null || _b === void 0 ? void 0 : _b.self, user);
                        }
                    });
                }
            }
            const wrappedScheduledMails = await this.authCall(async (sdk) => {
                return sdk.md.getObjects(this.workspace, scheduledMailObjectLinks.map(({ link }) => link));
            });
            return wrappedScheduledMails.map((scheduledMail) => toSdkModel.convertScheduledMail(scheduledMail, userMap));
        };
        this.getScheduledMailsCountForDashboard = async (dashboardRef) => {
            const objectLinks = await this.getScheduledMailObjectLinksForDashboard(dashboardRef);
            return objectLinks.length;
        };
        this.getAllWidgetAlertsForCurrentUser = async () => {
            const alerts = await this.getAllBearKpiAlertsForCurrentUser();
            return this.getConvertedAlerts(alerts);
        };
        this.getDashboardWidgetAlertsForCurrentUser = async (ref) => {
            const alerts = await this.getDashboardBearKpiAlertsForCurrentUser(ref);
            return this.getConvertedAlerts(alerts);
        };
        this.getWidgetAlertsCountForWidgets = async (refs) => {
            const widgetUris = await Promise.all(refs.map((ref) => objRefToUri(ref, this.workspace, this.authCall)));
            const result = await this.authCall((sdk) => sdk.md.getObjectsUsedByMany(this.workspace, widgetUris, {
                types: ["kpiAlert"],
                nearest: true,
            }));
            return result.map((entry) => {
                return {
                    ref: uriRef(entry.uri),
                    alertCount: entry.entries.length,
                };
            });
        };
        this.createWidgetAlert = async (alert) => {
            const [savedFilterContext, dashboardUri] = await Promise.all([
                this.createOrUpdateWidgetAlertFilterContext(alert),
                objRefToUri(alert.dashboard, this.workspace, this.authCall),
            ]);
            const alertWithSavedFilterContext = Object.assign(Object.assign({}, alert), { dashboard: uriRef(dashboardUri), filterContext: savedFilterContext });
            return this.createBearWidgetAlert(alertWithSavedFilterContext);
        };
        this.updateWidgetAlert = async (updatedAlert) => {
            const savedFilterContext = await this.createOrUpdateWidgetAlertFilterContext(updatedAlert);
            const alertWithSavedFilterContext = Object.assign(Object.assign({}, updatedAlert), { filterContext: savedFilterContext });
            return this.updateBearWidgetAlert(alertWithSavedFilterContext);
        };
        this.deleteWidgetAlert = async (ref) => {
            await this.deleteBearMetadataObject(ref);
        };
        this.deleteWidgetAlerts = async (refs) => {
            const uris = await Promise.all(refs.map((ref) => objRefToUri(ref, this.workspace, this.authCall)));
            return this.authCall((sdk) => sdk.md.bulkDeleteObjects(this.workspace, uris, "cascade"));
        };
        this.getWidgetReferencedObjects = async (widget, types = ["measure"]) => {
            invariant(widgetType(widget) === "kpi", "getWidgetReferencedObjects is currently supported for kpi widgets only");
            return new WidgetReferencesQuery(this.authCall, this.workspace, widget, types).run();
        };
        this.getResolvedFiltersForWidget = async (widget, filters) => {
            return resolveWidgetFilters(filters, widget.ignoreDashboardFilters, widget.dateDataSet, (refs) => objRefsToUris(refs, this.workspace, this.authCall));
        };
        // Alerts
        this.createBearWidgetAlert = async (alert) => {
            // make sure the alert has a non-empty title, otherwise the backend will throw
            // the default is taken form the existing convention set by KPI Dashboards
            const alertWithSanitizedName = Object.assign(Object.assign({}, alert), { title: alert.title || "kpi alert" });
            const bearAlert = fromSdkModel.convertWidgetAlert(alertWithSanitizedName);
            const createdBearAlert = await this.authCall((sdk) => sdk.md.createObject(this.workspace, bearAlert));
            const convertedAlertFilterContext = fromSdkModel.convertFilterContext(alertWithSanitizedName.filterContext);
            return toSdkModel.convertAlert(createdBearAlert, convertedAlertFilterContext);
        };
        this.updateBearWidgetAlert = async (alert) => {
            const bearAlert = fromSdkModel.convertWidgetAlert(alert);
            await this.updateBearMetadataObject(alert.ref, bearAlert);
            return alert;
        };
        this.createOrUpdateWidgetAlertFilterContext = async (alert) => {
            const { filterContext } = alert;
            const emptyFilterContextDefinition = {
                title: `Filter context for ${objRefToString(alert.widget)}`,
                description: "",
                filters: [],
            };
            return isFilterContext(filterContext)
                ? this.updateBearFilterContext(filterContext)
                : // Create a new filter context, or create implicit filter context, when not provided
                    this.createBearFilterContext(filterContext || emptyFilterContextDefinition);
        };
        this.getBearWidgetAlertsForWidget = async (widget) => {
            const objectLinks = await this.authCall((sdk) => sdk.md.getObjectUsedBy(this.workspace, widget.uri, {
                types: ["kpiAlert"],
                // limit ourselves to nearest only, otherwise, other alerts on the dashboard would be deleted, too
                nearest: true,
            }));
            return objectLinks.map((link) => uriRef(link.link));
        };
        // Dashboards
        this.getBearDashboard = async (uri) => {
            return this.authCall((sdk) => sdk.md.getObjectDetails(uri));
        };
        this.createBearDashboard = async (dashboard) => {
            const bearDashboard = fromSdkModel.convertDashboard(dashboard);
            const createdBearDashboard = await this.authCall((sdk) => sdk.md.createObject(this.workspace, bearDashboard));
            const createdDashboardDependencies = await this.getBearDashboardDependencies(createdBearDashboard.analyticalDashboard.meta.uri, DashboardComponentTypes);
            return toSdkModel.convertDashboard(createdBearDashboard, createdDashboardDependencies);
        };
        this.updateBearDashboard = async (dashboard) => {
            const bearDashboard = fromSdkModel.convertDashboard(dashboard);
            await this.updateBearMetadataObject(dashboard.ref, bearDashboard);
            return dashboard;
        };
        this.getAccessibleDashboards = async (explicitlySharedDashboardsObjectLinks, includeAvailableViaLink) => {
            if (!includeAvailableViaLink) {
                return explicitlySharedDashboardsObjectLinks;
            }
            const allDashboardsObjectLinks = await this.authCall((sdk) => sdk.md.getAnalyticalDashboards(this.workspace, true));
            return allDashboardsObjectLinks.filter((dashboard) => {
                var _a;
                return (this.isExplicitlyShared(dashboard, explicitlySharedDashboardsObjectLinks) ||
                    !((_a = dashboard === null || dashboard === void 0 ? void 0 : dashboard.flags) === null || _a === void 0 ? void 0 : _a.includes("strictAccessControl")));
            });
        };
        // Layout
        this.updateLayoutAndWidgets = async (originalLayout, updatedLayout) => {
            if (!updatedLayout) {
                return;
            }
            // Layout is now source of the truth, so collect relevant widgets and their layout paths
            // from both original and updated layout
            const createdWidgetsWithLayoutPaths = this.collectCreatedWidgetsWithLayoutPaths(updatedLayout);
            const updatedWidgetsWithLayoutPaths = this.collectUpdatedWidgetsWithLayoutPaths(originalLayout, updatedLayout);
            // Perform relevant operation (create/update) on each widget,
            // and replace widget definitions with saved widgets
            const createdAndUpdatedWidgetsWithLayoutPaths = await Promise.all([
                ...createdWidgetsWithLayoutPaths.map((widgetWithpath) => this.createBearWidget(widgetWithpath.widget).then((widget) => (Object.assign(Object.assign({}, widgetWithpath), { widget })))),
                ...updatedWidgetsWithLayoutPaths.map((widgetWithpath) => this.updateBearWidget(widgetWithpath.widget).then((widget) => (Object.assign(Object.assign({}, widgetWithpath), { widget })))),
            ]);
            // Update relevant parts of the layout with saved widgets
            return createdAndUpdatedWidgetsWithLayoutPaths.reduce((acc, widgetWithPath) => {
                return set(acc, widgetWithPath.path, widgetWithPath.widget);
            }, clone(updatedLayout));
        };
        // Filter context
        this.updateFilterContext = async (originalFilterContext, updatedFilterContext) => {
            if (isTempFilterContext(originalFilterContext)) {
                throw new UnexpectedError("Cannot update temp filter context!");
            }
            else if (isFilterContextDefinition(updatedFilterContext)) {
                // Create a new filter context
                return this.createBearFilterContext(updatedFilterContext);
            }
            else if (isFilterContext(updatedFilterContext)) {
                // Update the current filter context
                const shouldUpdateFilterContext = !isEqual(originalFilterContext, updatedFilterContext);
                if (shouldUpdateFilterContext) {
                    return this.updateBearFilterContext(updatedFilterContext);
                }
            }
            // No change, return the original filter context
            return originalFilterContext;
        };
        this.getBearExportFilterContext = async (exportFilterContextRef) => {
            if (!exportFilterContextRef) {
                return;
            }
            const exportFilterContextUri = await objRefToUri(exportFilterContextRef, this.workspace, this.authCall);
            return this.authCall(async (sdk) => {
                var _a;
                let result;
                try {
                    result = await sdk.md.getObjectDetails(exportFilterContextUri);
                }
                catch (err) {
                    if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                        // Export filter context has expired
                        result = undefined;
                    }
                    // let other errors propagate correctly
                    throw err;
                }
                return result;
            });
        };
        this.createBearFilterContext = async (filterContext) => {
            const sanitizedFilterContext = await this.sanitizeFilterContext(filterContext);
            const bearFilterContext = fromSdkModel.convertFilterContext(sanitizedFilterContext);
            const savedBearFilterContext = await this.authCall((sdk) => sdk.md.createObject(this.workspace, bearFilterContext));
            const savedFilterContext = toSdkModel.convertFilterContext(savedBearFilterContext);
            return savedFilterContext;
        };
        this.updateBearFilterContext = async (filterContext) => {
            const sanitizedFilterContext = await this.sanitizeFilterContext(filterContext);
            const bearFilterContext = fromSdkModel.convertFilterContext(sanitizedFilterContext);
            await this.updateBearMetadataObject(filterContext.ref, bearFilterContext);
            return filterContext;
        };
        this.sanitizeFilterContext = (filterContext) => {
            return sanitizeFilterContext(filterContext, (refs) => objRefsToUris(refs, this.workspace, this.authCall));
        };
        // Widgets
        this.createBearWidget = async (widget) => {
            const bearWidget = fromSdkModel.convertWidget(widget);
            const savedBearWidget = await this.authCall((sdk) => sdk.md.createObject(this.workspace, bearWidget));
            return toSdkModel.convertWidget(savedBearWidget);
        };
        this.updateBearWidget = async (widget) => {
            const bearWidget = fromSdkModel.convertWidget(widget);
            await this.updateBearMetadataObject(widget.ref, bearWidget);
            return widget;
        };
        this.deleteBearWidgets = async (widgets) => {
            await Promise.all(widgets.map((widget) => this.deleteBearMetadataObject(widget.ref)));
        };
        this.collectCreatedWidgetsWithLayoutPaths = (updatedLayout) => {
            const widgetsWithPath = updatedLayout ? layoutWidgetsWithPaths(updatedLayout) : [];
            return widgetsWithPath.filter((widgetWithPath) => isWidgetDefinition(widgetWithPath.widget));
        };
        this.collectUpdatedWidgetsWithLayoutPaths = (originalLayout, updatedLayout) => {
            const originalLayoutWidgetsWithPath = originalLayout ? layoutWidgetsWithPaths(originalLayout) : [];
            const updatedLayoutWidgetsWithPath = updatedLayout ? layoutWidgetsWithPaths(updatedLayout) : [];
            return updatedLayoutWidgetsWithPath.filter(({ widget }) => {
                return (isWidget(widget) &&
                    originalLayoutWidgetsWithPath.some((w) => isWidget(w.widget) &&
                        areObjRefsEqual(widget.ref, w.widget.ref) &&
                        !isEqual(widget, w.widget)));
            });
        };
        this.collectDeletedWidgets = (originalLayout, updatedLayout) => {
            const originalLayoutWidgets = originalLayout ? layoutWidgets(originalLayout) : [];
            const updatedLayoutWidgets = updatedLayout ? layoutWidgets(updatedLayout) : [];
            const deletedWidgets = originalLayoutWidgets.filter((widget) => {
                return (isWidget(widget) &&
                    updatedLayoutWidgets.every((w) => isWidget(w) && !areObjRefsEqual(widget.ref, w.ref)));
            });
            return deletedWidgets;
        };
        // Alerts
        this.getAllBearKpiAlertsForCurrentUser = async () => {
            return this.authCall(async (sdk, context) => {
                const author = await userUriFromAuthenticatedPrincipalWithAnonymous(context.getPrincipal);
                if (!author) {
                    return [];
                }
                return sdk.md.getObjectsByQuery(this.workspace, {
                    category: "kpiAlert",
                    author,
                });
            });
        };
        this.getDashboardBearKpiAlertsForCurrentUser = async (dashboardRef) => {
            const allAlerts = await this.getAllBearKpiAlertsForCurrentUser();
            if (allAlerts.length === 0) {
                return [];
            }
            const dashboardUri = await objRefToUri(dashboardRef, this.workspace, this.authCall);
            return allAlerts.filter((alert) => alert.kpiAlert.content.dashboard === dashboardUri);
        };
        this.getConvertedAlerts = async (alerts) => {
            const filterContexts = await this.getBearKpiAlertsFilterContexts(alerts);
            const filterContextByUri = keyBy(filterContexts, (filterContext) => filterContext.filterContext.meta.uri);
            return alerts.map((alert) => {
                const alertFilterContext = filterContextByUri[alert.kpiAlert.content.filterContext];
                return toSdkModel.convertAlert(alert, alertFilterContext);
            });
        };
        this.getBearKpiAlertsFilterContexts = async (kpiAlerts) => {
            const filterContextUris = kpiAlerts
                .map((alert) => alert.kpiAlert.content.filterContext)
                .filter((a) => !!a);
            return this.authCall((sdk) => sdk.md.getObjects(this.workspace, filterContextUris));
        };
        // Scheduled mail
        this.getScheduledMailObjectLinksForDashboard = async (dashboardRef) => {
            const dashboardUri = await objRefToUri(dashboardRef, this.workspace, this.authCall);
            return this.authCall((sdk) => sdk.md.getObjectUsedBy(this.workspace, dashboardUri, {
                nearest: true,
                types: ["scheduledMail"],
            }));
        };
        this.getScheduledMailObjectLinksForDashboardAndCurrentUser = async (dashboardRef) => {
            return this.authCall(async (_sdk, context) => {
                const user = await userUriFromAuthenticatedPrincipalWithAnonymous(context.getPrincipal);
                if (!user) {
                    return [];
                }
                const objectLinks = await this.getScheduledMailObjectLinksForDashboard(dashboardRef);
                return objectLinks.filter(({ author }) => author === user);
            });
        };
        // Metadata
        this.updateBearMetadataObject = async (ref, bearMetadataObject) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            const metadataObjectId = getObjectIdFromUri(uri);
            await this.authCall((sdk) => sdk.md.updateObject(this.workspace, metadataObjectId, bearMetadataObject));
        };
        this.deleteBearMetadataObject = async (ref) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            return this.authCall((sdk) => sdk.md.deleteObject(uri));
        };
        this.getBearVisualizationClasses = async () => {
            return this.authCall((sdk) => sdk.md.getObjectsByQuery(this.workspace, {
                category: "visualizationClass",
            }));
        };
        this.getBearDashboardDependencies = async (uri, types) => {
            const dependenciesObjectLinks = await this.authCall((sdk) => sdk.md.getObjectUsing(this.workspace, uri, {
                types,
                nearest: false,
            }));
            const dependenciesUris = dependenciesObjectLinks.map((objectLink) => objectLink.link);
            return this.authCall((sdk) => sdk.md.getObjects(this.workspace, dependenciesUris));
        };
        this.getBearDashboardReferences = async (uri, types) => {
            const objectTypes = compact(types.map(mapDashboardReferenceTypes));
            if (isEmpty(objectTypes)) {
                return {
                    dependencies: [],
                    visClassMapping: {},
                };
            }
            if (includes(types, "insight")) {
                return Promise.all([
                    this.getBearDashboardDependencies(uri, objectTypes),
                    this.insights.getVisualizationClassesByVisualizationClassUri({ includeDeprecated: true }),
                ]).then(([dependencies, visClassMapping]) => {
                    return {
                        dependencies,
                        visClassMapping,
                    };
                });
            }
            return this.getBearDashboardDependencies(uri, objectTypes).then((dependencies) => {
                return {
                    dependencies,
                    visClassMapping: {},
                };
            });
        };
        this.getDashboardReferencedObjects = async (dashboard, types = ["insight", "dashboardPlugin"]) => {
            const typesToGet = [...types];
            // if there are no plugins linked to the dashboard then do not ask for related plugin info
            if (isEmpty(dashboard.plugins)) {
                remove(typesToGet, (item) => item === "dashboardPlugin");
            }
            // bail out if there is nothing to get (e.g. user asked for referenced plugins but the dashboard has none)
            if (isEmpty(typesToGet)) {
                return {
                    plugins: [],
                    insights: [],
                };
            }
            const { dependencies, visClassMapping } = await this.getBearDashboardReferences(dashboard.uri, typesToGet);
            const insights = [];
            const plugins = [];
            dependencies.forEach((dep) => {
                if (isVisualization(dep)) {
                    insights.push(convertVisualization(dep, visClassMapping[dep.visualizationObject.content.visualizationClass.uri]));
                }
                else if (isDashboardPlugin(dep)) {
                    plugins.push(toSdkModel.convertDashboardPlugin(dep));
                }
            });
            return {
                insights,
                plugins,
            };
        };
        this.createDashboardPlugin = async (plugin) => {
            const convertedPlugin = fromSdkModel.convertDashboardPlugin(plugin);
            const savedPlugin = await this.authCall((sdk) => {
                return sdk.md.createObject(this.workspace, convertedPlugin);
            });
            if (plugin.identifier !== undefined) {
                // when server creates a new object, it will automatically assign identifier & ignore identifier
                // in the POST payload. Code must do another update to hammer in the desired identifier.
                const pluginObjectId = getObjectIdFromUri(savedPlugin.dashboardPlugin.meta.uri);
                savedPlugin.dashboardPlugin.meta.identifier = plugin.identifier;
                await this.authCall((sdk) => {
                    return sdk.md.updateObject(this.workspace, pluginObjectId, savedPlugin);
                });
            }
            return toSdkModel.convertDashboardPlugin(savedPlugin);
        };
        this.deleteDashboardPlugin = async (ref) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            return this.authCall((sdk) => {
                return sdk.md.deleteObject(uri);
            });
        };
        this.getDashboardPlugin = async (ref, options) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            const wrappedPlugin = await this.authCall((sdk) => {
                return sdk.md.getObjectDetails(uri);
            });
            const userMap = (options === null || options === void 0 ? void 0 : options.loadUserData)
                ? await updateUserMap(new Map(), getDashboardPluginUserUris(wrappedPlugin), this.authCall)
                : new Map();
            return toSdkModel.convertDashboardPlugin(wrappedPlugin, userMap);
        };
        this.getDashboardPlugins = async (options) => {
            const pluginLinks = await this.authCall((sdk) => sdk.md.getDashboardPlugins(this.workspace));
            const pluginUris = pluginLinks.map((link) => link.link);
            const wrappedPlugins = await this.authCall((sdk) => {
                return sdk.md.getObjects(this.workspace, pluginUris);
            });
            const userMap = (options === null || options === void 0 ? void 0 : options.loadUserData)
                ? await updateUserMap(new Map(), compact(flatMap(wrappedPlugins, getDashboardPluginUserUris)), this.authCall)
                : new Map();
            return wrappedPlugins.map((value) => toSdkModel.convertDashboardPlugin(value, userMap));
        };
        /**
         * Get user's dashboard-level permissions
         *
         * @remarks
         * On bear the dashboard permissions are derived from dashboard accessibility
         * and user's workspace-level permissions
         *
         * @param ref - dashboard reference
         */
        this.getDashboardPermissions = async (ref) => {
            try {
                const uri = await objRefToUri(ref, this.workspace, this.authCall);
                await this.authCall((sdk) => sdk.md.getObjectDetails(uri));
                const workspacePermissions = await this.authCall(() => this.permissions.getPermissionsForCurrentUser());
                const canEditDashboard = workspacePermissions.canManageAnalyticalDashboard;
                const canShareDashboard = workspacePermissions.canManageACL;
                const canManageLockedDashboard = canEditDashboard && workspacePermissions.canManageProject;
                return {
                    canEditDashboard,
                    canEditLockedDashboard: canManageLockedDashboard,
                    canShareDashboard,
                    canShareLockedDashboard: canManageLockedDashboard,
                    canViewDashboard: true,
                };
            }
            catch (_e) {
                return {
                    canEditDashboard: false,
                    canEditLockedDashboard: false,
                    canShareDashboard: false,
                    canShareLockedDashboard: false,
                    canViewDashboard: false,
                };
            }
        };
        this.ensureDashboardPluginLinksHaveUris = async (pluginLinks) => {
            const resolvedUris = await objRefsToUris(pluginLinks.map((p) => p.plugin), this.workspace, this.authCall, true);
            return pluginLinks.map((p, idx) => {
                return Object.assign(Object.assign({}, p), { plugin: uriRef(resolvedUris[idx]) });
            });
        };
        this.validateDashboardsExistence = async (dashboardRefs) => {
            const validDashboards = await Promise.all(dashboardRefs.map(async (ref) => {
                try {
                    const { title, identifier, isUnderStrictControl, uri } = await this.getDashboard(ref);
                    // Dashboard is not shared with current user (but does not have strict mode enabled).
                    // For admin, backend returns object without 403 even if it is under strict control, therefore we
                    // need to remove title of the dashboard to simulate forbidden dashboard without title to have
                    // consistent behavior for both editor and admin.
                    return {
                        ref,
                        title: isUnderStrictControl ? undefined : title,
                        identifier,
                        uri,
                    };
                }
                catch (error) {
                    if (error.httpStatus === 403) {
                        // forbidden
                        return {
                            ref,
                            identifier: objRefToString(ref),
                            uri: "", // not needed for forbidden dashboard
                        };
                    }
                    else {
                        // non-existent
                        return undefined;
                    }
                }
            }));
            return compact(validDashboards);
        };
        this.insights = new BearWorkspaceInsights(this.authCall, this.workspace);
        this.permissions = new BearWorkspacePermissionsFactory(this.authCall, this.workspace);
    }
    isExplicitlyShared(dashboard, explicitlySharedDashboards) {
        return explicitlySharedDashboards.some(({ link }) => link === dashboard.link);
    }
    async getDashboardWithReferences(ref, filterContextRef, options = {}, types = ["insight"]) {
        const dashboard = await this.getDashboard(ref, filterContextRef, options);
        const references = await this.getDashboardReferencedObjects(dashboard, types);
        return {
            dashboard,
            references,
        };
    }
}
function mapDashboardReferenceTypes(type) {
    const mapping = {
        insight: "visualizationObject",
        dashboardPlugin: "dashboardPlugin",
    };
    return mapping[type];
}
//# sourceMappingURL=index.js.map