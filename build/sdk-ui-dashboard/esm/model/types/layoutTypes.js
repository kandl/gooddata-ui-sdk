// (C) 2021-2023 GoodData Corporation
import { idRef, isWidget, } from "@gooddata/sdk-model";
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * Creates a new custom widget.
 *
 * @param identifier - identifier for custom widget; once added onto a dashboard, widget will be referencable using this identifier
 * @param customType - custom widget type
 * @param extras - provide extra data to include on the custom widget; the content of this argument can be an
 *  arbitrary plain object. note: the factory will make a copy of all the extra data. at this moment it is not possible
 *  to modify the data once the widget is added onto a dashboard.
 * @public
 */
export function newCustomWidget(identifier, customType, extras) {
    const extrasCopy = extras ? cloneDeep(extras) : {};
    return Object.assign({ type: "customWidget", customType,
        identifier, uri: `_custom_widget_uri/${identifier}`, ref: idRef(identifier) }, extrasCopy);
}
/**
 * Type-guard that tests whether an object is an instance of {@link ICustomWidget}.
 *
 * @param obj - object to test
 * @public
 */
export function isCustomWidget(obj) {
    const w = obj;
    return !isEmpty(w) && w.type === "customWidget" && w.customType !== undefined && w.ref !== undefined;
}
/**
 * Type-guard that tests whether an object is an instance of {@link ICustomWidgetDefinition}.
 *
 * @param obj - object to test
 * @public
 */
export function isCustomWidgetDefinition(obj) {
    const w = obj;
    return !isEmpty(w) && w.type === "customWidget" && w.customType !== undefined && w.ref === undefined;
}
/**
 * Type-guard that tests whether an object is an instance of {@link ICustomWidgetBase}.
 *
 * @param obj - object to test
 * @public
 */
export function isCustomWidgetBase(obj) {
    const w = obj;
    return !isEmpty(w) && w.type === "customWidget" && w.customType !== undefined;
}
/**
 * Dumps debug information about a widget into a string.
 *
 * @param widget - widget to dump info from
 * @internal
 */
export function extendedWidgetDebugStr(widget) {
    const widgetId = `${widget.identifier}`;
    let widgetType = "unknown widget type";
    if (isWidget(widget)) {
        widgetType = widget.type;
    }
    else if (isCustomWidget(widget)) {
        widgetType = `${widget.type}/${widget.customType}`;
    }
    return `${widgetId}(${widgetType})`;
}
/**
 * Creates a new dashboard item containing the provided custom widget.
 *
 * @param widget - custom widget to include
 * @param sizeOrColSize - item size specification; for convenience you can specify the size as number which will be
 *  interpreted as number of columns in a 12-col grid that the item should use when rendered on an XL screen.
 * @public
 */
export function newDashboardItem(widget, sizeOrColSize) {
    const size = typeof sizeOrColSize === "number" ? { xl: { gridWidth: sizeOrColSize } } : sizeOrColSize;
    return {
        type: "IDashboardLayoutItem",
        size,
        widget: cloneDeep(widget),
    };
}
function getOrCreateSectionHeader(titleOrHeader) {
    if (!titleOrHeader) {
        return undefined;
    }
    if (typeof titleOrHeader === "string") {
        if (isEmpty(titleOrHeader)) {
            return undefined;
        }
        return {
            title: titleOrHeader,
        };
    }
    return titleOrHeader;
}
/**
 * Creates a new dashboard section.
 *
 * @param titleOrHeader - header to use for this section (if any); for convenience, you may provide just string containing the title instead
 * of specifying full header. if you specify empty string for title, then there will be no header.
 * @param items - dashboard items to include in the section; note: a deep copy of each item will be used on the new section
 *
 * @public
 */
export function newDashboardSection(titleOrHeader, ...items) {
    const header = getOrCreateSectionHeader(titleOrHeader);
    const itemsClone = cloneDeep(items);
    return {
        type: "IDashboardLayoutSection",
        items: itemsClone,
        header,
    };
}
/**
 * Tests whether object is an instance of {@link StashedDashboardItemsId};
 *
 * @param obj - object to test
 * @alpha
 */
export function isStashedDashboardItemsId(obj) {
    return typeof obj === "string";
}
//# sourceMappingURL=layoutTypes.js.map