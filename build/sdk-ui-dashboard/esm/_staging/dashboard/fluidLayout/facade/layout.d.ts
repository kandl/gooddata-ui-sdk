import { IDashboardLayout, IDashboardLayoutSize } from "@gooddata/sdk-model";
import { IDashboardLayoutFacade, IDashboardLayoutSectionFacade, IDashboardLayoutSectionsFacade } from "./interfaces.js";
/**
 * @alpha
 */
export declare class DashboardLayoutFacade<TWidget> implements IDashboardLayoutFacade<TWidget> {
    protected layout: IDashboardLayout<TWidget>;
    private sectionsCache;
    protected constructor(layout: IDashboardLayout<TWidget>);
    /**
     * Creates an instance of DashboardLayoutFacade
     * @param layout - layout to wrap
     */
    static for<TWidget>(layout: IDashboardLayout<TWidget>): IDashboardLayoutFacade<TWidget>;
    sections(): IDashboardLayoutSectionsFacade<TWidget>;
    section(rowIndex: number): IDashboardLayoutSectionFacade<TWidget> | undefined;
    size(): IDashboardLayoutSize | undefined;
    raw(): IDashboardLayout<TWidget>;
}
