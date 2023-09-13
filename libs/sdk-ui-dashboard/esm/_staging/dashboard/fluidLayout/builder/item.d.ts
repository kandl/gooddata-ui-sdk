import { DashboardLayoutItemModifications, IDashboardLayoutItemBuilder, IDashboardLayoutSectionBuilder } from "./interfaces.js";
import { IDashboardLayoutItemFacade } from "../facade/interfaces.js";
import { InsightWidgetBuilder, KpiWidgetBuilder, ValueOrUpdateCallback } from "@gooddata/sdk-backend-base";
import { ObjRef, IDashboardLayoutSection, IDashboardLayoutSizeByScreenSize, IDashboardLayoutItem } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export declare class DashboardLayoutItemBuilder<TWidget> implements IDashboardLayoutItemBuilder<TWidget> {
    protected setSection: (valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutSection<TWidget>>) => void;
    protected getItemFacade: () => IDashboardLayoutItemFacade<TWidget>;
    protected itemIndex: number;
    protected constructor(setSection: (valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutSection<TWidget>>) => void, getItemFacade: () => IDashboardLayoutItemFacade<TWidget>, itemIndex: number);
    /**
     * Creates an instance of DashboardLayoutItemBuilder for particular layout item.
     *
     * @param item - item to modify
     */
    static for<TWidget>(sectionBuilder: IDashboardLayoutSectionBuilder<TWidget>, itemIndex: number): IDashboardLayoutItemBuilder<TWidget>;
    size(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutSizeByScreenSize>): this;
    widget(valueOrUpdateCallback: ValueOrUpdateCallback<TWidget | undefined>): this;
    setItem(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutItem<TWidget>>): this;
    modify(modifications: DashboardLayoutItemModifications<TWidget>): this;
    build(): IDashboardLayoutItem<TWidget>;
    facade(): IDashboardLayoutItemFacade<TWidget>;
    newInsightWidget(insight: ObjRef, create?: (builder: InsightWidgetBuilder) => InsightWidgetBuilder): this;
    modifyInsightWidget(modify: (builder: InsightWidgetBuilder) => InsightWidgetBuilder): this;
    newKpiWidget(measure: ObjRef, create?: (builder: KpiWidgetBuilder) => KpiWidgetBuilder): this;
    modifyKpiWidget(modify: (builder: KpiWidgetBuilder) => KpiWidgetBuilder): this;
}
