import { IWidget, IWidgetDefinition, IDashboardLayout, IDashboardLayoutItem, IDashboardLayoutSection, IDashboardWidget } from "@gooddata/sdk-model";
/**
 * Has dashboard layout only empty sections and widgets?
 * @alpha
 */
export declare const isDashboardLayoutEmpty: (layout: IDashboardLayout<any>) => boolean;
/**
 * Represents nested path in layout
 * It's useful to track the layout location of the widget
 * Example: ["sections", 0, "items", 2, "widget"] points to the third item widget in first section
 * @alpha
 */
export type LayoutPath = Array<string | number>;
/**
 * Walk dashboard layout
 * This is useful to collect widgets from the layout or perform transforms on the layout
 *
 * @alpha
 * @param layout - dashboard layout
 * @param callbacks - walk callbacks
 * @returns void
 */
export declare function walkLayout<TWidget extends IDashboardWidget>(layout: IDashboardLayout<TWidget>, { sectionCallback, itemCallback, widgetCallback, }: {
    sectionCallback?: (section: IDashboardLayoutSection<TWidget>, sectionPath: LayoutPath) => void;
    itemCallback?: (item: IDashboardLayoutItem<TWidget>, widgetPath: LayoutPath) => void;
    widgetCallback?: (widget: TWidget, widgetPath: LayoutPath) => void;
}, path?: LayoutPath): void;
/**
 * Widget with it's layout path
 * @alpha
 */
export interface IWidgetWithLayoutPath<TWidget = IDashboardWidget> {
    path: LayoutPath;
    widget: TWidget;
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
export declare function layoutWidgetsWithPaths<TWidget extends IDashboardWidget>(layout: IDashboardLayout<TWidget>): IWidgetWithLayoutPath<TWidget>[];
/**
 * @alpha
 */
export declare function layoutWidgets<TWidget extends IDashboardWidget>(layout: IDashboardLayout<TWidget>): Array<IWidgetDefinition | IWidget>;
//# sourceMappingURL=utils.d.ts.map