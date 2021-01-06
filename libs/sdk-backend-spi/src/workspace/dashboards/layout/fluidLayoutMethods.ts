// (C) 2019-2021 GoodData Corporation
import { IFluidLayout, IFluidLayoutColumn, IFluidLayoutRow } from "./fluidLayout";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutColumnMethods<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    raw(): TColumn;
    index(): number;
    size(): TColumn["size"];
    style(): TColumn["style"];
    content(): TContent | undefined;
    row(): IFluidLayoutRowMethods<TContent, TColumn, TRow>;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutColumnsMethods<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    raw(): TColumn[];
    column(columnIndex: number): IFluidLayoutColumnMethods<TContent, TColumn, TRow> | undefined;
    find(
        pred: (row: IFluidLayoutColumnMethods<TContent, TColumn, TRow>) => boolean,
    ): IFluidLayoutColumnMethods<TContent, TColumn, TRow> | undefined;
    map<TReturn>(callback: (row: IFluidLayoutColumnMethods<TContent, TColumn, TRow>) => TReturn): TReturn[];
    reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutColumnMethods<TContent, TColumn, TRow>) => TReturn,
        initialValue: TReturn,
    ): TReturn;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutRowMethods<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    raw(): TRow;
    index(): number;
    header(): TRow["header"];
    style(): TRow["style"];
    columns(): IFluidLayoutColumnsMethods<TContent, TColumn, TRow>;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutRowsMethods<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    raw(): TRow[];
    row(rowIndex: number): IFluidLayoutRowMethods<TContent, TColumn, TRow> | undefined;
    find(
        pred: (row: IFluidLayoutRowMethods<TContent, TColumn, TRow>) => boolean,
    ): IFluidLayoutRowMethods<TContent, TColumn, TRow> | undefined;
    map<TReturn>(callback: (row: IFluidLayoutRowMethods<TContent, TColumn, TRow>) => TReturn): TReturn[];
    reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutRowMethods<TContent, TColumn, TRow>) => TReturn,
        initialValue: TReturn,
    ): TReturn;
}

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export interface IFluidLayoutFacade<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    rows(): IFluidLayoutRowsMethods<TContent, TColumn, TRow>;
    layout(): IFluidLayout<TContent, TColumn, TRow>;
}
