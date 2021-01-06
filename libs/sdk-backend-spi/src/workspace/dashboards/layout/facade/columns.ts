// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutRow } from "../fluidLayout";
import {
    IFluidLayoutColumnMethods,
    IFluidLayoutColumnsMethods,
    IFluidLayoutMethods,
    IFluidLayoutRowMethods,
} from "../fluidLayoutMethods";
import { FluidLayoutColumnFacade } from "./column";

/**
 * @alpha
 */
export class FluidLayoutColumnsFacade<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutColumnsMethods<TContent, TColumn, TRow> {
    protected constructor(
        protected readonly _layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
        protected readonly _rowFacade: IFluidLayoutRowMethods<TContent, TColumn, TRow>,
    ) {}

    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(
        layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
        rowFacade: IFluidLayoutRowMethods<TContent, TColumn, TRow>,
    ): FluidLayoutColumnsFacade<TContent, TColumn, TRow> {
        return new FluidLayoutColumnsFacade(layoutFacade, rowFacade);
    }

    public raw = (): TColumn[] => this._rowFacade.raw().columns;

    public column = (columnIndex: number): IFluidLayoutColumnMethods<TContent, TColumn, TRow> | undefined =>
        FluidLayoutColumnFacade.for(
            this._layoutFacade,
            this._rowFacade,
            this._rowFacade.raw().columns[columnIndex],
        );

    public map = <TReturn>(
        callback: (column: IFluidLayoutColumnMethods<TContent, TColumn, TRow>) => TReturn,
    ): TReturn[] => {
        return this.raw().map((column) =>
            callback(FluidLayoutColumnFacade.for(this._layoutFacade, this._rowFacade, column)),
        );
    };

    public reduce = <TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutColumnMethods<TContent, TColumn, TRow>) => TReturn,
        initialValue: TReturn,
    ): TReturn => {
        return this.raw().reduce(
            (acc, column) =>
                callback(acc, FluidLayoutColumnFacade.for(this._layoutFacade, this._rowFacade, column)),
            initialValue,
        );
    };

    public find = (
        pred: (row: IFluidLayoutColumnMethods<TContent, TColumn, TRow>) => boolean,
    ): IFluidLayoutColumnMethods<TContent, TColumn, TRow> | undefined => {
        const columns = this.raw().map((column) =>
            FluidLayoutColumnFacade.for(this._layoutFacade, this._rowFacade, column),
        );
        return columns.find(pred);
    };
}
