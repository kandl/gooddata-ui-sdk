// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn } from "../fluidLayout";
import {
    IFluidLayoutColumnMethods,
    IFluidLayoutColumnsMethods,
    IFluidLayoutFacade,
    IFluidLayoutRowMethods,
} from "../fluidLayoutMethods";
import { FluidLayoutColumnMethods } from "./column";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export class FluidLayoutColumnsMethods<TContent> implements IFluidLayoutColumnsMethods<TContent> {
    protected constructor(
        protected readonly _layoutFacade: IFluidLayoutFacade<TContent>,
        protected readonly _rowFacade: IFluidLayoutRowMethods<TContent>,
    ) {}

    public static for<TContent>(
        layoutFacade: IFluidLayoutFacade<TContent>,
        rowFacade: IFluidLayoutRowMethods<TContent>,
    ): FluidLayoutColumnsMethods<TContent> {
        return new FluidLayoutColumnsMethods(layoutFacade, rowFacade);
    }

    public raw = (): IFluidLayoutColumn<TContent>[] => this._rowFacade.raw().columns;

    public column = (columnIndex: number): IFluidLayoutColumnMethods<TContent> | undefined =>
        FluidLayoutColumnMethods.for(
            this._layoutFacade,
            this._rowFacade,
            this._rowFacade.raw().columns[columnIndex],
        );

    public map = <TReturn>(callback: (column: IFluidLayoutColumnMethods<TContent>) => TReturn): TReturn[] => {
        return this.raw().map((column) =>
            callback(FluidLayoutColumnMethods.for(this._layoutFacade, this._rowFacade, column)),
        );
    };

    public reduce = <TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutColumnMethods<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn => {
        return this.raw().reduce(
            (acc, column) =>
                callback(acc, FluidLayoutColumnMethods.for(this._layoutFacade, this._rowFacade, column)),
            initialValue,
        );
    };

    public find = (
        pred: (row: IFluidLayoutColumnMethods<TContent>) => boolean,
    ): IFluidLayoutColumnMethods<TContent> | undefined => {
        const columns = this.raw().map((column) =>
            FluidLayoutColumnMethods.for(this._layoutFacade, this._rowFacade, column),
        );
        return columns.find(pred);
    };
}
