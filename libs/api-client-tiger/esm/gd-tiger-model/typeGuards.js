// (C) 2019-2022 GoodData Corporation
import { JsonApiDashboardPluginOutWithLinksTypeEnum, JsonApiFilterContextInTypeEnum, JsonApiVisualizationObjectOutWithLinksTypeEnum, } from "../generated/metadata-json-api/index.js";
/**
 * @public
 */
export function isAttributeHeader(header) {
    return header && header.attributeHeader !== undefined;
}
/**
 * @public
 */
export const isAfmObjectIdentifier = (value) => {
    var _a, _b;
    return !!(((_a = value === null || value === void 0 ? void 0 : value.identifier) === null || _a === void 0 ? void 0 : _a.id) &&
        ((_b = value === null || value === void 0 ? void 0 : value.identifier) === null || _b === void 0 ? void 0 : _b.type));
};
/**
 * @public
 */
export function isResultAttributeHeader(header) {
    return header.attributeHeader !== undefined;
}
/**
 * @public
 */
export function isResultMeasureHeader(header) {
    return header.measureHeader !== undefined;
}
/**
 * @public
 */
export function isResultTotalHeader(header) {
    return header.totalHeader !== undefined;
}
/**
 * @public
 */
export function isVisualizationObjectsItem(visualizationObject) {
    return (visualizationObject.type ===
        JsonApiVisualizationObjectOutWithLinksTypeEnum.VISUALIZATION_OBJECT);
}
/**
 * @public
 */
export function isFilterContextData(filterContext) {
    return filterContext.type === JsonApiFilterContextInTypeEnum.FILTER_CONTEXT;
}
/**
 * @public
 */
export function isDashboardPluginsItem(dashboardPlugin) {
    return (dashboardPlugin.type ===
        JsonApiDashboardPluginOutWithLinksTypeEnum.DASHBOARD_PLUGIN);
}
//# sourceMappingURL=typeGuards.js.map