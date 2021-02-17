// (C) 2019-2021 GoodData Corporation
import {
    IFluidLayout,
    IFluidLayoutColumn,
    IFluidLayoutRow,
    IFluidLayoutSectionHeader,
    IFluidLayoutSize,
    IFluidLayoutSizeByScreen,
    ResponsiveScreenType,
} from "../fluidLayout";

/**
 * @alpha
 */
export interface IFluidLayoutColumnFacade<TContent> {
    raw(): IFluidLayoutColumn<TContent>;

    testRaw(pred: (column: IFluidLayoutColumn<TContent>) => boolean): boolean;
    test(pred: (column: this) => boolean): boolean;

    index(): number;
    indexIs(index: number): boolean;

    size(): IFluidLayoutSizeByScreen;
    sizeForScreen(screen: ResponsiveScreenType): IFluidLayoutSize | undefined;
    hasSizeForScreen(screen: ResponsiveScreenType): boolean;

    content(): TContent | undefined;
    hasContent(): boolean;
    contentEquals(content: TContent): boolean;
    contentIs(content: TContent): boolean;

    isFirstInRow(): boolean;
    isLastInRow(): boolean;

    isEmpty(): boolean;

    // override
    row(): IFluidLayoutRowFacade<TContent>;
}

/**
 * @alpha
 */
export interface IFluidLayoutColumnsFacade<TContent> {
    raw(): IFluidLayoutColumn<TContent>[];
    column(columnIndex: number): IFluidLayoutColumnFacade<TContent> | undefined;
    map<TReturn>(callback: (column: IFluidLayoutColumnFacade<TContent>) => TReturn): TReturn[];
    flatMap<TReturn>(callback: (row: IFluidLayoutColumnFacade<TContent>) => TReturn[]): TReturn[];
    reduce<TReturn>(
        callback: (acc: TReturn, column: IFluidLayoutColumnFacade<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn;
    find(
        pred: (column: IFluidLayoutColumnFacade<TContent>) => boolean,
    ): IFluidLayoutColumnFacade<TContent> | undefined;
    every(pred: (column: IFluidLayoutColumnFacade<TContent>) => boolean): boolean;
    some(pred: (column: IFluidLayoutColumnFacade<TContent>) => boolean): boolean;
    filter(pred: (row: IFluidLayoutColumnFacade<TContent>) => boolean): IFluidLayoutColumnFacade<TContent>[];
    all(): IFluidLayoutColumnFacade<TContent>[];
    count(): number;
}

/**
 * @alpha
 */
export interface IFluidLayoutRowFacade<TContent> {
    raw(): IFluidLayoutRow<TContent>;

    testRaw(pred: (column: IFluidLayoutRow<TContent>) => boolean): boolean;
    test(pred: (column: this) => boolean): boolean;

    index(): number;
    indexIs(index: number): boolean;

    header(): IFluidLayoutSectionHeader | undefined;
    title(): string | undefined;
    description(): string | undefined;
    headerEquals(header: IFluidLayoutSectionHeader): boolean;
    hasHeader(): boolean;
    hasTitle(): boolean;
    hasDescription(): boolean;
    titleEquals(title: string): boolean;
    descriptionEquals(title: string): boolean;

    isFirst(): boolean;
    isLast(): boolean;
    isEmpty(): boolean;

    // overrides
    columns(): IFluidLayoutColumnsFacade<TContent>;
    layout(): IFluidLayoutFacade<TContent>;
}

/**
 * @alpha
 */
export interface IFluidLayoutRowsFacade<TContent> {
    raw(): IFluidLayoutRow<TContent>[];
    row(rowIndex: number): IFluidLayoutRowFacade<TContent> | undefined;
    map<TReturn>(callback: (row: IFluidLayoutRowFacade<TContent>) => TReturn): TReturn[];
    flatMap<TReturn>(callback: (row: IFluidLayoutRowFacade<TContent>) => TReturn[]): TReturn[];
    reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutRowFacade<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn;
    find(
        pred: (row: IFluidLayoutRowFacade<TContent>) => boolean,
    ): IFluidLayoutRowFacade<TContent> | undefined;
    every(pred: (row: IFluidLayoutRowFacade<TContent>) => boolean): boolean;
    some(pred: (row: IFluidLayoutRowFacade<TContent>) => boolean): boolean;
    filter(pred: (row: IFluidLayoutRowFacade<TContent>) => boolean): IFluidLayoutRowFacade<TContent>[];
    all(): IFluidLayoutRowFacade<TContent>[];
    count(): number;
}

/**
 * @alpha
 */
export interface IFluidLayoutFacade<TContent> {
    size(): IFluidLayoutSize | undefined;
    rows(): IFluidLayoutRowsFacade<TContent>;
    raw(): IFluidLayout<TContent>;
}
