import { IDashboardLayoutItemFacade, IDashboardLayoutItemsFacade, IDashboardLayoutFacade, IDashboardLayoutSectionFacade } from "./interfaces.js";
import { IDashboardLayoutSection, IDashboardLayoutSectionHeader } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export declare class DashboardLayoutSectionFacade<TContent> implements IDashboardLayoutSectionFacade<TContent> {
    protected readonly layoutFacade: IDashboardLayoutFacade<TContent>;
    protected readonly section: IDashboardLayoutSection<TContent>;
    protected readonly sectionIndex: number;
    protected constructor(layoutFacade: IDashboardLayoutFacade<TContent>, section: IDashboardLayoutSection<TContent>, sectionIndex: number);
    static for<TContent>(layoutFacade: IDashboardLayoutFacade<TContent>, section: IDashboardLayoutSection<TContent>, index: number): IDashboardLayoutSectionFacade<TContent>;
    raw(): IDashboardLayoutSection<TContent>;
    header(): IDashboardLayoutSectionHeader | undefined;
    title(): string | undefined;
    description(): string | undefined;
    index(): number;
    isFirst(): boolean;
    isLast(): boolean;
    testRaw(pred: (section: IDashboardLayoutSection<TContent>) => boolean): boolean;
    test(pred: (section: IDashboardLayoutSectionFacade<TContent>) => boolean): boolean;
    indexIs(index: number): boolean;
    headerEquals(header: IDashboardLayoutSectionHeader): boolean;
    hasHeader(): boolean;
    hasTitle(): boolean;
    hasDescription(): boolean;
    titleEquals(title: string): boolean;
    descriptionEquals(description: string): boolean;
    isEmpty(): boolean;
    items(): IDashboardLayoutItemsFacade<TContent>;
    item(index: number): IDashboardLayoutItemFacade<TContent> | undefined;
    layout(): IDashboardLayoutFacade<TContent>;
}
