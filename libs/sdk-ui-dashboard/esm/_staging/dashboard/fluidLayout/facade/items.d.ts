import { IDashboardLayoutItem, ScreenSize } from "@gooddata/sdk-model";
import { IDashboardLayoutItemFacade, IDashboardLayoutItemsFacade, IDashboardLayoutSectionFacade } from "./interfaces.js";
/**
 * @alpha
 */
export declare class DashboardLayoutItemsFacade<TWidget> implements IDashboardLayoutItemsFacade<TWidget> {
    protected readonly itemFacades: IDashboardLayoutItemFacade<TWidget>[];
    protected constructor(itemFacades: IDashboardLayoutItemFacade<TWidget>[]);
    static for<TWidget>(sectionFacade: IDashboardLayoutSectionFacade<TWidget>, items: IDashboardLayoutItem<TWidget>[]): IDashboardLayoutItemsFacade<TWidget>;
    raw(): IDashboardLayoutItem<TWidget>[];
    item(index: number): IDashboardLayoutItemFacade<TWidget> | undefined;
    all(): IDashboardLayoutItemFacade<TWidget>[];
    asGridRows(screen: ScreenSize): IDashboardLayoutItemFacade<TWidget>[][];
    flatMap<TResult>(callback: (column: IDashboardLayoutItemFacade<TWidget>) => TResult[]): TResult[];
    count(): number;
    map<TReturn>(callback: (section: IDashboardLayoutItemFacade<TWidget>) => TReturn): TReturn[];
    reduce<TReturn>(callback: (acc: TReturn, section: IDashboardLayoutItemFacade<TWidget>) => TReturn, initialValue: TReturn): TReturn;
    every<TReturn extends IDashboardLayoutItemFacade<TWidget>>(pred: (section: IDashboardLayoutItemFacade<TWidget>) => section is TReturn): boolean;
    some<TReturn extends IDashboardLayoutItemFacade<TWidget>>(pred: (section: IDashboardLayoutItemFacade<TWidget>) => section is TReturn): boolean;
    find<TReturn extends IDashboardLayoutItemFacade<TWidget>>(pred: (section: IDashboardLayoutItemFacade<TWidget>) => section is TReturn): TReturn | undefined;
    filter<TReturn extends IDashboardLayoutItemFacade<TWidget>>(pred: (section: IDashboardLayoutItemFacade<TWidget>) => section is TReturn): TReturn[];
}
