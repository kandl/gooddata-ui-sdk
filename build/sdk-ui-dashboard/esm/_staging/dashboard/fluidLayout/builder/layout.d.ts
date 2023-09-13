import { IDashboardLayout, IDashboardLayoutSection, IDashboardLayoutSize } from "@gooddata/sdk-model";
import { DashboardLayoutModifications, DashboardLayoutSectionModifications, DashboardLayoutSectionsSelector, IDashboardLayoutBuilder } from "./interfaces.js";
import { IDashboardLayoutFacade } from "../facade/interfaces.js";
import { ValueOrUpdateCallback } from "@gooddata/sdk-backend-base";
/**
 * @alpha
 */
export declare class DashboardLayoutBuilder<TWidget> implements IDashboardLayoutBuilder<TWidget> {
    protected layoutFacade: IDashboardLayoutFacade<TWidget>;
    protected layoutFacadeConstructor: (layout: IDashboardLayout<TWidget>) => IDashboardLayoutFacade<TWidget>;
    protected constructor(layoutFacade: IDashboardLayoutFacade<TWidget>, layoutFacadeConstructor: (layout: IDashboardLayout<TWidget>) => IDashboardLayoutFacade<TWidget>);
    /**
     * Creates an instance of DashboardLayoutBuilder for particular layout.
     *
     * @param layout - layout to modify
     */
    static for<TWidget>(layout: IDashboardLayout<TWidget>): IDashboardLayoutBuilder<TWidget>;
    /**
     * Creates an instance of DashboardLayoutBuilder with empty layout.
     */
    static forNewLayout<TWidget>(): IDashboardLayoutBuilder<TWidget>;
    size(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayoutSize | undefined>): this;
    createSection(create?: DashboardLayoutSectionModifications<TWidget>, index?: number): this;
    addSection(section: IDashboardLayoutSection<TWidget>, index?: number): this;
    modifySection(index: number, modify: DashboardLayoutSectionModifications<TWidget>): this;
    removeSection(index: number): this;
    moveSection(fromIndex: number, toIndex: number): this;
    removeSections(selector?: DashboardLayoutSectionsSelector<TWidget>): this;
    removeEmptySections(): this;
    modifySections(modify: DashboardLayoutSectionModifications<TWidget>, selector?: DashboardLayoutSectionsSelector<TWidget>): this;
    setLayout(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardLayout<TWidget>>): this;
    facade(): IDashboardLayoutFacade<TWidget>;
    modify(modifications: DashboardLayoutModifications<TWidget>): this;
    build(): IDashboardLayout<TWidget>;
}
