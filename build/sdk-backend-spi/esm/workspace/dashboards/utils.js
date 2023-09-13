// (C) 2019-2022 GoodData Corporation
import { isWidget, isWidgetDefinition, isDashboardLayout, } from "@gooddata/sdk-model";
import noop from "lodash/noop.js";
/**
 * Has dashboard layout only empty sections and widgets?
 * @alpha
 */
export const isDashboardLayoutEmpty = (layout) => {
    return layout.sections.every((section) => section.items.length === 0);
};
/**
 * Walk dashboard layout
 * This is useful to collect widgets from the layout or perform transforms on the layout
 *
 * @alpha
 * @param layout - dashboard layout
 * @param callbacks - walk callbacks
 * @returns void
 */
export function walkLayout(layout, { sectionCallback = noop, itemCallback = noop, widgetCallback = noop, }, path = ["sections"]) {
    layout.sections.forEach((section, sectionIndex) => {
        const sectionPath = [...path, sectionIndex];
        sectionCallback(section, sectionPath);
        section.items.forEach((item, widgetIndex) => {
            const itemPath = [...sectionPath, "items", widgetIndex];
            itemCallback(item, itemPath);
            if (isWidget(item.widget) || isWidgetDefinition(item.widget)) {
                const widgetPath = [...itemPath, "widget"];
                widgetCallback(item.widget, widgetPath);
            }
            else if (isDashboardLayout(item.widget)) {
                // is another layout
                walkLayout(item.widget, {
                    sectionCallback,
                    itemCallback,
                    widgetCallback,
                }, [...itemPath, "widget", "sections"]);
            }
        });
    });
}
/**
 * Get all dashboard widgets
 * (layout does not only specify rendering, but also all used widgets)
 *
 * @alpha
 * @param layout - dashboard layout
 * @param collectedWidgets - bag for collecting widgets recursively from the layout
 * @returns - widgets with layout paths
 */
export function layoutWidgetsWithPaths(layout) {
    const collectedWidgets = [];
    walkLayout(layout, {
        widgetCallback: (widget, path) => collectedWidgets.push({
            widget,
            path,
        }),
    });
    return collectedWidgets;
}
/**
 * Get all dashboard widgets
 * (layout does not only specify rendering, but also all used widgets)
 *
 * @alpha
 * @param layout - dashboard layout
 * @returns - widgets
 */
export function layoutWidgets(layout) {
    const collectedWidgets = [];
    walkLayout(layout, {
        widgetCallback: (widget) => collectedWidgets.push(widget),
    });
    return collectedWidgets;
}
//# sourceMappingURL=utils.js.map