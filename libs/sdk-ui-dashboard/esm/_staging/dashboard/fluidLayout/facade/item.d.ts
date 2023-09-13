import { ObjRef, IKpiWidget, IKpiWidgetDefinition, IInsightWidget, IInsightWidgetDefinition, IWidget, IWidgetDefinition, IDashboardLayout, IDashboardWidget, IDashboardLayoutSize, IDashboardLayoutSizeByScreenSize, IDashboardLayoutItem, ScreenSize } from "@gooddata/sdk-model";
import { IDashboardLayoutItemFacade, IDashboardLayoutSectionFacade } from "./interfaces.js";
/**
 * @alpha
 */
export declare class DashboardLayoutItemFacade<TWidget> implements IDashboardLayoutItemFacade<TWidget> {
    protected readonly sectionFacade: IDashboardLayoutSectionFacade<TWidget>;
    protected readonly item: IDashboardLayoutItem<TWidget>;
    protected readonly itemIndex: number;
    protected constructor(sectionFacade: IDashboardLayoutSectionFacade<TWidget>, item: IDashboardLayoutItem<TWidget>, itemIndex: number);
    static for<TWidget>(sectionFacade: IDashboardLayoutSectionFacade<TWidget>, item: IDashboardLayoutItem<TWidget>, index: number): IDashboardLayoutItemFacade<TWidget>;
    raw(): IDashboardLayoutItem<TWidget>;
    section(): IDashboardLayoutSectionFacade<TWidget>;
    index(): number;
    indexIs(index: number): boolean;
    isFirst(): boolean;
    isLast(): boolean;
    widget(): TWidget | undefined;
    ref(): ObjRef | undefined;
    widgetEquals(widget: TWidget | undefined): boolean;
    widgetIs(widget: TWidget): boolean;
    isEmpty(): boolean;
    size(): IDashboardLayoutSizeByScreenSize;
    sizeForScreen(screen: ScreenSize): IDashboardLayoutSize | undefined;
    hasSizeForScreen(screen: ScreenSize): boolean;
    testRaw(pred: (column: IDashboardLayoutItem<TWidget>) => boolean): boolean;
    test(pred: (column: IDashboardLayoutItemFacade<TWidget>) => boolean): boolean;
    isWidgetItem(): this is DashboardLayoutItemFacade<IWidget>;
    isWidgetDefinitionItem(): this is DashboardLayoutItemFacade<IWidgetDefinition>;
    isKpiWidgetItem(): this is DashboardLayoutItemFacade<IKpiWidget>;
    isKpiWidgetDefinitionItem(): this is DashboardLayoutItemFacade<IKpiWidgetDefinition>;
    isInsightWidgetItem(): this is DashboardLayoutItemFacade<IInsightWidget>;
    isInsightWidgetDefinitionItem(): this is DashboardLayoutItemFacade<IInsightWidgetDefinition>;
    isLayoutItem(): this is DashboardLayoutItemFacade<IDashboardLayout<TWidget>>;
    isCustomItem(): this is DashboardLayoutItemFacade<Exclude<TWidget, IDashboardWidget>>;
    isWidgetItemWithRef(ref: ObjRef): boolean;
    isWidgetItemWithInsightRef(ref: ObjRef): boolean;
    isWidgetItemWithKpiRef(ref: ObjRef): boolean;
}
