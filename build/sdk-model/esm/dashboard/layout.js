// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isArray from "lodash/isArray.js";
import { isWidget, isWidgetDefinition } from "./widget.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardWidget}.
 * @alpha
 */
export const isDashboardWidget = (obj) => [isDashboardLayout, isWidget, isWidgetDefinition].some((guard) => guard(obj));
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardLayoutItem}.
 * @alpha
 */
export function isDashboardLayoutItem(obj) {
    var _a, _b;
    return !isEmpty(obj) && typeof ((_b = (_a = obj.size) === null || _a === void 0 ? void 0 : _a.xl) === null || _b === void 0 ? void 0 : _b.gridWidth) === "number";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardLayout}.
 * @alpha
 */
export function isDashboardLayout(obj) {
    return !isEmpty(obj) && obj.type === "IDashboardLayout";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardLayoutSection}.
 * @alpha
 */
export function isDashboardLayoutSection(obj) {
    return !isEmpty(obj) && isArray(obj.items);
}
//# sourceMappingURL=layout.js.map