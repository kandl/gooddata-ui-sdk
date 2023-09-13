// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
import { isObjRef } from "../objRef/index.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetDefinition}.
 * @alpha
 */
export function isWidgetDefinition(obj) {
    return hasWidgetProps(obj) && !isObjRef(obj.ref);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidget}.
 * @alpha
 */
export function isWidget(obj) {
    return hasWidgetProps(obj) && isObjRef(obj.ref);
}
/**
 * @internal
 */
function hasWidgetProps(obj) {
    return (!isEmpty(obj) &&
        (obj.type === "kpi" || obj.type === "insight"));
}
/**
 * Gets the widget identifier
 *
 * @param widget - widget to get identifier of
 * @returns the widget identifier
 * @alpha
 */
export function widgetId(widget) {
    invariant(widget, "widget to get identifier of must be specified");
    return widget.identifier;
}
/**
 * Gets the widget uri
 *
 * @param widget - widget to get uri of
 * @returns the widget uri
 * @alpha
 */
export function widgetUri(widget) {
    invariant(widget, "widget to get uri of must be specified");
    return widget.uri;
}
/**
 * Gets the widget ref
 *
 * @param widget - widget to get ref of
 * @returns the widget ref
 * @alpha
 */
export function widgetRef(widget) {
    invariant(widget, "widget to get ref of must be specified");
    return widget.ref;
}
/**
 * Gets the widget type
 *
 * @param widget - widget to get type of
 * @returns the widget type
 * @alpha
 */
export function widgetType(widget) {
    invariant(widget, "widget to get type of must be specified");
    return widget.type;
}
/**
 * Gets the widget title
 *
 * @param widget - widget to get title of
 * @returns the widget title
 * @alpha
 */
export function widgetTitle(widget) {
    invariant(widget, "widget to get title of must be specified");
    return widget.title;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidget}.
 * @alpha
 */
export function isInsightWidget(obj) {
    return isWidget(obj) && obj.type === "insight";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidgetDefinition}.
 * @alpha
 */
export function isInsightWidgetDefinition(obj) {
    return isWidgetDefinition(obj) && obj.type === "insight";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @alpha
 */
export function isKpiWidget(obj) {
    return isWidget(obj) && obj.type === "kpi";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @alpha
 */
export function isKpiWidgetDefinition(obj) {
    return isWidgetDefinition(obj) && obj.type === "kpi";
}
//# sourceMappingURL=widget.js.map