import { IDashboardLayout, IDashboardLayoutSection, IDashboardLayoutSectionHeader, IDashboardLayoutSize, IDashboardLayoutItem } from "@gooddata/sdk-model";
import { ValueOrUpdateCallback } from "@gooddata/sdk-backend-base";
import { DashboardLayoutItemModifications, DashboardLayoutItemsSelector, DashboardLayoutSectionModifications, IDashboardLayoutBuilder, IDashboardLayoutItemBuilder, IDashboardLayoutSectionBuilder } from "./interfaces.js";
import { IDashboardLayoutSectionFacade } from "../facade/interfaces.js";
/**
 * @alpha
 */
export declare class DashboardLayoutSectionBuilder<TContent> implements IDashboardLayoutSectionBuilder<TContent> {
    protected sectionIndex: number;
    protected getSectionFacade: () => IDashboardLayoutSectionFacade<TContent>;
    protected setLayout: (valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayout<TContent>>) => void;
    protected constructor(sectionIndex: number, getSectionFacade: () => IDashboardLayoutSectionFacade<TContent>, setLayout: (valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayout<TContent>>) => void);
    /**
     * Creates an instance of DashboardLayoutSectionBuilder for particular layout item.
     */
    static for<TContent>(layoutBuilder: IDashboardLayoutBuilder<TContent>, sectionIndex: number): IDashboardLayoutSectionBuilder<TContent>;
    header(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutSectionHeader | undefined>): this;
    createItem(xlSize: IDashboardLayoutSize, create?: (builder: IDashboardLayoutItemBuilder<TContent>) => IDashboardLayoutItemBuilder<TContent>, index?: number): this;
    addItem(item: IDashboardLayoutItem<TContent>, index?: number): this;
    modifyItem(index: number, modify: DashboardLayoutItemModifications<TContent>): this;
    removeItem(index: number): this;
    moveItem(fromIndex: number, toIndex: number): this;
    removeItems(selector?: DashboardLayoutItemsSelector<TContent>): this;
    removeEmptyItems: () => this;
    modifyItems(modify: DashboardLayoutItemModifications<TContent>, selector?: DashboardLayoutItemsSelector<TContent>): this;
    setSection(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutSection<TContent>>): this;
    facade(): IDashboardLayoutSectionFacade<TContent>;
    modify(modifications: DashboardLayoutSectionModifications<TContent>): this;
    build(): IDashboardLayoutSection<TContent>;
}
