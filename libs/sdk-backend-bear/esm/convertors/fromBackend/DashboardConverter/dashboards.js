// (C) 2019-2022 GoodData Corporation
import { isWrappedKpi, isWrappedFilterContext, isWrappedTempFilterContext, isWrappedVisualizationWidget, isVisualization, } from "@gooddata/api-model-bear";
import { uriRef, isWidget, } from "@gooddata/sdk-model";
import keyBy from "lodash/keyBy.js";
import { sanitizeExportFilterContext, convertFilterContext, convertTempFilterContext, } from "./filterContext.js";
import { convertLayout, createImplicitDashboardLayout } from "./layout.js";
import { convertVisualizationWidget, convertKpi } from "./widget.js";
export const convertListedDashboard = (dashboardLink, availability, userMap) => {
    var _a, _b, _c;
    const isUnderStrictControlProp = ((_a = dashboardLink.flags) === null || _a === void 0 ? void 0 : _a.some((flag) => flag === "strictAccessControl"))
        ? {
            isUnderStrictControl: true,
        }
        : {};
    return Object.assign({ ref: uriRef(dashboardLink.link), identifier: dashboardLink.identifier, uri: dashboardLink.link, title: dashboardLink.title, description: dashboardLink.summary, updated: dashboardLink.updated, updatedBy: dashboardLink.contributor ? userMap === null || userMap === void 0 ? void 0 : userMap.get(dashboardLink.contributor) : undefined, created: dashboardLink.created, createdBy: dashboardLink.author ? userMap === null || userMap === void 0 ? void 0 : userMap.get(dashboardLink.author) : undefined, 
        // filter takes care of multiple spaces and also the base scenario ("" ~> [])
        tags: (_c = (_b = dashboardLink.tags) === null || _b === void 0 ? void 0 : _b.split(" ").filter(Boolean)) !== null && _c !== void 0 ? _c : [], isLocked: !!dashboardLink.locked, shareStatus: getShareStatus(!!dashboardLink.unlisted, !!dashboardLink.sharedWithSomeone), availability }, isUnderStrictControlProp);
};
const convertDateFilterConfigAddedPresets = (addPresets) => {
    const { absolutePresets = [], relativePresets = [] } = addPresets;
    return {
        absolutePresets: absolutePresets.map((preset) => (Object.assign(Object.assign({}, preset), { type: "absolutePreset" }))),
        relativePresets: relativePresets.map((preset) => (Object.assign(Object.assign({}, preset), { type: "relativePreset" }))),
    };
};
/**
 * @internal
 */
export const convertDashboardDateFilterConfig = (dateFilterConfig) => {
    const { filterName, mode, addPresets, hideGranularities, hideOptions } = dateFilterConfig;
    return {
        filterName,
        mode,
        addPresets: addPresets && convertDateFilterConfigAddedPresets(addPresets),
        hideGranularities,
        hideOptions,
    };
};
const convertPluginLink = (link) => {
    const { type, parameters } = link;
    return {
        type: "IDashboardPluginLink",
        plugin: uriRef(type),
        parameters,
    };
};
const getShareStatus = (unlisted, sharedWithSomeone) => {
    if (unlisted && !sharedWithSomeone) {
        return "private";
    }
    else if (unlisted && sharedWithSomeone) {
        return "shared";
    }
    else {
        return "public";
    }
};
export const convertDashboard = (dashboard, dependencies, visualizationClasses = [], exportFilterContextUri, userMap) => {
    var _a;
    const { meta: { summary, created, author, updated, contributor, identifier, uri, title, locked, tags, unlisted, sharedWithSomeone, flags, }, content: { layout, filterContext, dateFilterConfig, widgets: widgetsUris, plugins }, } = dashboard.analyticalDashboard;
    const sdkDependencies = dependencies
        // Filter out visualization objects - we only need them to create implicit layout
        .filter((d) => !isVisualization(d))
        .map(convertDashboardDependency);
    const unsortedWidgets = sdkDependencies.filter(isWidget);
    // To preserve the logic of createImplicitDashboardLayout, we must preserve the order of the widgets
    const widgetByUri = keyBy(unsortedWidgets, "uri");
    const widgets = widgetsUris.map((widgetUri) => widgetByUri[widgetUri]);
    const filterContextOrExportFilterContext = sdkDependencies.find((dep) => exportFilterContextUri ? dep.uri === exportFilterContextUri : dep.uri === filterContext);
    const isUnderStrictControlProp = (flags === null || flags === void 0 ? void 0 : flags.some((flag) => flag === "strictAccessControl"))
        ? {
            isUnderStrictControl: true,
        }
        : {};
    return Object.assign(Object.assign({ type: "IDashboard", title, description: summary, identifier: identifier, uri: uri, ref: uriRef(uri), created: created, createdBy: author ? userMap === null || userMap === void 0 ? void 0 : userMap.get(author) : undefined, updated: updated, updatedBy: contributor ? userMap === null || userMap === void 0 ? void 0 : userMap.get(contributor) : undefined, isLocked: !!locked, shareStatus: getShareStatus(!!unlisted, !!sharedWithSomeone) }, isUnderStrictControlProp), { dateFilterConfig: dateFilterConfig && convertDashboardDateFilterConfig(dateFilterConfig), filterContext: exportFilterContextUri && filterContextOrExportFilterContext
            ? sanitizeExportFilterContext(filterContextOrExportFilterContext)
            : filterContextOrExportFilterContext, layout: layout
            ? convertLayout(layout, widgets)
            : createImplicitDashboardLayout(widgets, dependencies, visualizationClasses), plugins: plugins === null || plugins === void 0 ? void 0 : plugins.map(convertPluginLink), 
        // filter takes care of multiple spaces and also the base scenario ("" ~> [])
        tags: (_a = tags === null || tags === void 0 ? void 0 : tags.split(" ").filter((t) => t)) !== null && _a !== void 0 ? _a : [] });
};
const convertDashboardDependency = (dependency) => {
    if (isWrappedVisualizationWidget(dependency)) {
        return convertVisualizationWidget(dependency);
    }
    else if (isWrappedKpi(dependency)) {
        return convertKpi(dependency);
    }
    else if (isWrappedFilterContext(dependency)) {
        return convertFilterContext(dependency);
    }
    else if (isWrappedTempFilterContext(dependency)) {
        return convertTempFilterContext(dependency);
    }
    throw new Error(`No converter for the dashboard dependency!`);
};
//# sourceMappingURL=dashboards.js.map