import { IDashboardLayoutSection } from "@gooddata/sdk-model";
import { IDashboardLayoutSectionsFacade, IDashboardLayoutSectionFacade, IDashboardLayoutFacade } from "./interfaces.js";
/**
 * @alpha
 */
export declare class DashboardLayoutSectionsFacade<TWidget> implements IDashboardLayoutSectionsFacade<TWidget> {
    protected readonly layoutFacade: IDashboardLayoutFacade<TWidget>;
    protected readonly sectionFacades: IDashboardLayoutSectionFacade<TWidget>[];
    protected constructor(layoutFacade: IDashboardLayoutFacade<TWidget>, sectionFacades: IDashboardLayoutSectionFacade<TWidget>[]);
    static for<TWidget>(layoutFacade: IDashboardLayoutFacade<TWidget>, sections: IDashboardLayoutSection<TWidget>[]): IDashboardLayoutSectionsFacade<TWidget>;
    raw(): IDashboardLayoutSection<TWidget>[];
    all(): IDashboardLayoutSectionFacade<TWidget>[];
    section(index: number): IDashboardLayoutSectionFacade<TWidget> | undefined;
    flatMap<TReturn>(callback: (section: IDashboardLayoutSectionFacade<TWidget>) => TReturn[]): TReturn[];
    count(): number;
    map<TReturn>(callback: (section: IDashboardLayoutSectionFacade<TWidget>) => TReturn): TReturn[];
    reduce<TReturn>(callback: (acc: TReturn, section: IDashboardLayoutSectionFacade<TWidget>) => TReturn, initialValue: TReturn): TReturn;
    every<TReturn extends IDashboardLayoutSectionFacade<TWidget>>(pred: (section: IDashboardLayoutSectionFacade<TWidget>) => section is TReturn): boolean;
    some<TReturn extends IDashboardLayoutSectionFacade<TWidget>>(pred: (section: IDashboardLayoutSectionFacade<TWidget>) => section is TReturn): boolean;
    find<TReturn extends IDashboardLayoutSectionFacade<TWidget>>(pred: (section: IDashboardLayoutSectionFacade<TWidget>) => section is TReturn): TReturn | undefined;
    filter<TReturn extends IDashboardLayoutSectionFacade<TWidget>>(pred: (section: IDashboardLayoutSectionFacade<TWidget>) => section is TReturn): TReturn[];
}
