import { walkLayout } from "@gooddata/sdk-backend-spi";
import { idRef, } from "@gooddata/sdk-model";
import updateWith from "lodash/updateWith.js";
import { cloneWithSanitizedIds } from "../../IdSanitization.js";
import { isInheritedObject } from "../../ObjectInheritance.js";
import { fixWidgetLegacyElementUris } from "../../fixLegacyElementUris.js";
import { convertDrillToCustomUrlInLayoutFromBackend } from "../DrillToCustomUrlConverter.js";
import { getShareStatus, stripQueryParams } from "../../utils.js";
import { sanitizeSelectionMode } from "../common/singleSelectionFilter.js";
import { convertUserIdentifier } from "../../UsersConverter.js";
function setWidgetRefsInLayout(layout) {
    if (!layout) {
        return;
    }
    const widgetsPaths = [];
    walkLayout(layout, {
        widgetCallback: (_, widgetPath) => widgetsPaths.push(widgetPath),
    });
    return widgetsPaths.reduce((layout, widgetPath, index) => {
        return updateWith(layout, widgetPath, (widget) => {
            const temporaryWidgetId = widget.insight.identifier + "_widget-" + index;
            const convertedWidget = Object.assign(Object.assign({}, widget), { ref: idRef(temporaryWidgetId), uri: temporaryWidgetId, identifier: temporaryWidgetId });
            return fixWidgetLegacyElementUris(convertedWidget);
        });
    }, layout);
}
function convertDashboardPluginLink(pluginLink) {
    return {
        type: "IDashboardPluginLink",
        plugin: cloneWithSanitizedIds(pluginLink.plugin),
        parameters: pluginLink.parameters,
    };
}
function getConvertedAnalyticalDashboardContent(analyticalDashboard) {
    var _a;
    return {
        dateFilterConfig: cloneWithSanitizedIds(analyticalDashboard.dateFilterConfig),
        layout: convertDrillToCustomUrlInLayoutFromBackend(setWidgetRefsInLayout(cloneWithSanitizedIds(analyticalDashboard.layout))),
        plugins: (_a = analyticalDashboard.plugins) === null || _a === void 0 ? void 0 : _a.map(convertDashboardPluginLink),
    };
}
export function convertDashboard(analyticalDashboard, filterContext) {
    var _a, _b, _c;
    const { data, links, included } = analyticalDashboard;
    const { id, attributes = {}, meta = {}, relationships = {} } = data;
    const { createdBy, modifiedBy } = relationships;
    const { title = "", description = "", content, createdAt = "", modifiedAt = "" } = attributes;
    const isPrivate = (_b = (_a = meta.accessInfo) === null || _a === void 0 ? void 0 : _a.private) !== null && _b !== void 0 ? _b : false;
    const { dateFilterConfig, layout, plugins } = getConvertedAnalyticalDashboardContent(content);
    return {
        type: "IDashboard",
        ref: idRef(id, "analyticalDashboard"),
        identifier: id,
        uri: stripQueryParams(links.self),
        title,
        description,
        created: createdAt,
        createdBy: convertUserIdentifier(createdBy, included),
        updated: modifiedAt,
        updatedBy: convertUserIdentifier(modifiedBy, included),
        // TODO: TIGER-HACK: inherited objects must be locked; they are read-only for all
        isLocked: isInheritedObject(data),
        shareStatus: getShareStatus(isPrivate),
        isUnderStrictControl: true,
        tags: (_c = attributes.tags) !== null && _c !== void 0 ? _c : [],
        filterContext,
        dateFilterConfig,
        layout,
        plugins,
    };
}
export function convertFilterContextFromBackend(filterContext) {
    const { id, type, attributes } = filterContext.data;
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
export function convertFilterContextFilters(content) {
    return sanitizeSelectionMode(cloneWithSanitizedIds(content.filters));
}
export function convertDashboardPlugin(plugin) {
    const { data, links, included } = plugin;
    const { id, type, attributes, relationships = {} } = data;
    const { createdBy, modifiedBy } = relationships;
    const { title = "", description = "", content, tags, createdAt = "", modifiedAt = "" } = attributes;
    const { url } = content;
    return {
        ref: idRef(id, type),
        identifier: id,
        uri: links.self,
        name: title,
        description,
        tags: tags !== null && tags !== void 0 ? tags : [],
        type: "IDashboardPlugin",
        url,
        created: createdAt,
        createdBy: convertUserIdentifier(createdBy, included),
        updated: modifiedAt,
        updatedBy: convertUserIdentifier(modifiedBy, included),
    };
}
export function convertDashboardPluginWithLinks(plugin, included = []) {
    const { id, type, attributes, relationships = {} } = plugin;
    const { createdBy, modifiedBy } = relationships;
    const { title = "", description = "", content, tags, createdAt, modifiedAt } = attributes;
    const { url } = content;
    return {
        ref: idRef(id, type),
        identifier: id,
        uri: plugin.links.self,
        name: title,
        description,
        tags: tags !== null && tags !== void 0 ? tags : [],
        type: "IDashboardPlugin",
        url,
        created: createdAt,
        createdBy: convertUserIdentifier(createdBy, included),
        updated: modifiedAt,
        updatedBy: convertUserIdentifier(modifiedBy, included),
    };
}
//# sourceMappingURL=AnalyticalDashboardConverter.js.map