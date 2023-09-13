// (C) 2020-2023 GoodData Corporation
import { invariant } from "ts-invariant";
import { AnalyticalDashboardModelV1, AnalyticalDashboardModelV2, isFilterContextData, } from "@gooddata/api-client-tiger";
import { convertDashboard as convertDashboardV1, convertFilterContextFilters as convertFilterContextFiltersV1, convertFilterContextFromBackend as convertFilterContextFromBackendV1, } from "./v1/AnalyticalDashboardConverter.js";
import { convertDashboard as convertDashboardV2, convertFilterContextFilters as convertFilterContextFiltersV2, convertFilterContextFromBackend as convertFilterContextFromBackendV2, convertDashboardPlugin as convertDashboardPluginV2, convertDashboardPluginWithLinks as convertDashboardPluginWithLinksV2, } from "./v2/AnalyticalDashboardConverter.js";
import { idRef, } from "@gooddata/sdk-model";
import { isInheritedObject } from "../ObjectInheritance.js";
import { getShareStatus } from "../utils.js";
import { convertUserIdentifier } from "../UsersConverter.js";
export const convertAnalyticalDashboard = (analyticalDashboard, included) => {
    var _a, _b, _c, _d, _e;
    const { id, links, attributes = {}, meta, relationships = {} } = analyticalDashboard;
    const { createdBy, modifiedBy } = relationships;
    const { createdAt, modifiedAt } = attributes;
    const isPrivate = (_b = (_a = meta === null || meta === void 0 ? void 0 : meta.accessInfo) === null || _a === void 0 ? void 0 : _a.private) !== null && _b !== void 0 ? _b : false;
    return {
        ref: idRef(id, "analyticalDashboard"),
        uri: links.self,
        identifier: id,
        title: (_c = attributes === null || attributes === void 0 ? void 0 : attributes.title) !== null && _c !== void 0 ? _c : "",
        description: (_d = attributes === null || attributes === void 0 ? void 0 : attributes.description) !== null && _d !== void 0 ? _d : "",
        created: createdAt !== null && createdAt !== void 0 ? createdAt : "",
        createdBy: convertUserIdentifier(createdBy, included),
        updated: modifiedAt !== null && modifiedAt !== void 0 ? modifiedAt : "",
        updatedBy: convertUserIdentifier(modifiedBy, included),
        tags: (_e = attributes === null || attributes === void 0 ? void 0 : attributes.tags) !== null && _e !== void 0 ? _e : [],
        isLocked: isInheritedObject(analyticalDashboard),
        shareStatus: getShareStatus(isPrivate),
        isUnderStrictControl: true,
        availability: "full",
    };
};
export const convertAnalyticalDashboardToListItems = (analyticalDashboards) => {
    return analyticalDashboards.data.map((dashboard) => convertAnalyticalDashboard(dashboard, analyticalDashboards.included));
};
export function convertDashboard(analyticalDashboard, filterContext) {
    const content = analyticalDashboard.data.attributes.content;
    if (AnalyticalDashboardModelV1.isAnalyticalDashboard(content)) {
        return convertDashboardV1(analyticalDashboard, filterContext);
    }
    if (AnalyticalDashboardModelV2.isAnalyticalDashboard(content)) {
        return convertDashboardV2(analyticalDashboard, filterContext);
    }
    invariant(false, "Unknown analytical dashboard version");
}
export function convertFilterContextFromBackend(filterContext) {
    const content = filterContext.data.attributes.content;
    if (AnalyticalDashboardModelV1.isFilterContext(content)) {
        return convertFilterContextFromBackendV1(filterContext);
    }
    if (AnalyticalDashboardModelV2.isFilterContext(content)) {
        return convertFilterContextFromBackendV2(filterContext);
    }
    invariant(false, "Unknown filter context version");
}
export function convertDashboardPluginFromBackend(plugin) {
    const content = plugin.data.attributes.content;
    // V1 does not support plugins
    if (AnalyticalDashboardModelV2.isDashboardPlugin(content)) {
        return convertDashboardPluginV2(plugin);
    }
    invariant(false, "Unknown dashboard plugin version");
}
export function convertDashboardPluginWithLinksFromBackend(plugin, included) {
    const content = plugin.attributes.content;
    // V1 does not support plugins
    if (AnalyticalDashboardModelV2.isDashboardPlugin(content)) {
        return convertDashboardPluginWithLinksV2(plugin, included);
    }
    invariant(false, "Unknown dashboard plugin version");
}
function convertFilterContextFilters(content) {
    if (AnalyticalDashboardModelV1.isFilterContext(content)) {
        return convertFilterContextFiltersV1(content);
    }
    if (AnalyticalDashboardModelV2.isFilterContext(content)) {
        return convertFilterContextFiltersV2(content);
    }
    invariant(false, "Unknown filter context version");
}
export function getFilterContextFromIncluded(included) {
    const filterContext = included === null || included === void 0 ? void 0 : included.find(isFilterContextData);
    if (!filterContext) {
        return;
    }
    const { id, type, attributes } = filterContext;
    const { title = "", description = "", content } = attributes;
    return {
        ref: idRef(id, type),
        identifier: id,
        uri: filterContext.links.self,
        title,
        description,
        filters: convertFilterContextFilters(content),
    };
}
//# sourceMappingURL=AnalyticalDashboardConverter.js.map