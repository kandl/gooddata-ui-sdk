// (C) 2019-2021 GoodData Corporation
import flatMap from "lodash/flatMap";
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
    private static Cache: WeakMap<IFluidLayoutColumn<any>[], FluidLayoutColumnsMethods<any>> = new WeakMap<
        IFluidLayoutColumn<any>[],
        FluidLayoutColumnsMethods<any>
    >();

    protected constructor(
        protected readonly _layoutFacade: IFluidLayoutFacade<TContent>,
        protected readonly _rowFacade: IFluidLayoutRowMethods<TContent>,
        protected readonly _rawColumns: IFluidLayoutColumn<TContent>[],
    ) {
        this._columns = _rawColumns.map((column, index) =>
            FluidLayoutColumnMethods.for(_layoutFacade, _rowFacade, column, index),
        );
    }

    private readonly _columns: IFluidLayoutColumnMethods<TContent>[] = [];

    public static for<TContent>(
        layoutFacade: IFluidLayoutFacade<TContent>,
        rowFacade: IFluidLayoutRowMethods<TContent>,
        columns: IFluidLayoutColumn<TContent>[],
    ): FluidLayoutColumnsMethods<TContent> {
        if (!FluidLayoutColumnsMethods.Cache.has(columns)) {
            FluidLayoutColumnsMethods.Cache.set(
                columns,
                new FluidLayoutColumnsMethods(layoutFacade, rowFacade, columns),
            );
        }

        return FluidLayoutColumnsMethods.Cache.get(columns)!;
    }

    public raw = (): IFluidLayoutColumn<TContent>[] => this._rawColumns;

    public column = (columnIndex: number): IFluidLayoutColumnMethods<TContent> | undefined =>
        this._columns[columnIndex];

    public map = <TReturn>(callback: (column: IFluidLayoutColumnMethods<TContent>) => TReturn): TReturn[] =>
        this._columns.map(callback);

    public flatMap = <TReturn>(
        callback: (column: IFluidLayoutColumnMethods<TContent>) => TReturn[],
    ): TReturn[] => flatMap(this._columns, callback);

    public reduce = <TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutColumnMethods<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn => this._columns.reduce(callback, initialValue);

    public find = (
        pred: (row: IFluidLayoutColumnMethods<TContent>) => boolean,
    ): IFluidLayoutColumnMethods<TContent> | undefined => this._columns.find(pred);

    public every = (pred: (row: IFluidLayoutColumnMethods<TContent>) => boolean): boolean =>
        this._columns.every(pred);

    public some = (pred: (row: IFluidLayoutColumnMethods<TContent>) => boolean): boolean =>
        this._columns.some(pred);

    public filter = (
        pred: (row: IFluidLayoutColumnMethods<TContent>) => boolean,
    ): IFluidLayoutColumnMethods<TContent>[] => this._columns.filter(pred);

    public all = (): IFluidLayoutColumnMethods<TContent>[] => this._columns;
}
