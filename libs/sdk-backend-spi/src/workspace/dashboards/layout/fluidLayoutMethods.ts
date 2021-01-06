// (C) 2019-2021 GoodData Corporation
import { IFluidLayout, IFluidLayoutColumn, IFluidLayoutRow } from "./fluidLayout";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutColumnMethods<TContent> {
    raw(): IFluidLayoutColumn<TContent>;
    index(): number;
    size(): IFluidLayoutColumn<TContent>["size"];
    style(): IFluidLayoutColumn<TContent>["style"];
    content(): TContent | undefined;
    row(): IFluidLayoutRowMethods<TContent>;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutColumnsMethods<TContent> {
    raw(): IFluidLayoutColumn<TContent>[];
    column(columnIndex: number): IFluidLayoutColumnMethods<TContent> | undefined;
    find(
        pred: (row: IFluidLayoutColumnMethods<TContent>) => boolean,
    ): IFluidLayoutColumnMethods<TContent> | undefined;
    map<TReturn>(callback: (row: IFluidLayoutColumnMethods<TContent>) => TReturn): TReturn[];
    reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutColumnMethods<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutRowMethods<TContent> {
    raw(): IFluidLayoutRow<TContent>;
    index(): number;
    header(): IFluidLayoutRow<TContent>["header"];
    style(): IFluidLayoutRow<TContent>["style"];
    columns(): IFluidLayoutColumnsMethods<TContent>;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutRowsMethods<TContent> {
    raw(): IFluidLayoutRow<TContent>[];
    row(rowIndex: number): IFluidLayoutRowMethods<TContent> | undefined;
    find(
        pred: (row: IFluidLayoutRowMethods<TContent>) => boolean,
    ): IFluidLayoutRowMethods<TContent> | undefined;
    map<TReturn>(callback: (row: IFluidLayoutRowMethods<TContent>) => TReturn): TReturn[];
    reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutRowMethods<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutFacade<TContent> {
    rows(): IFluidLayoutRowsMethods<TContent>;
    layout(): IFluidLayout<TContent>;
}
