// (C) 2019-2021 GoodData Corporation
import flatMap from "lodash/flatMap";
import { IFluidLayoutColumn } from "../fluidLayout";
import { IFluidLayoutColumnFacade, IFluidLayoutColumnsFacade, IFluidLayoutRowFacade } from "./interfaces";
import { FluidLayoutColumnFacade } from "./column";

/**
 * @alpha
 */
export class FluidLayoutColumnsFacade<TContent> implements IFluidLayoutColumnsFacade<TContent> {
    protected constructor(protected readonly columnFacades: IFluidLayoutColumnFacade<TContent>[]) {}

    public static for<TContent>(
        rowFacade: IFluidLayoutRowFacade<TContent>,
        columns: IFluidLayoutColumn<TContent>[],
    ): IFluidLayoutColumnsFacade<TContent> {
        const columnFacades = columns.map((column, index) =>
            FluidLayoutColumnFacade.for(rowFacade, column, index),
        );
        return new FluidLayoutColumnsFacade(columnFacades);
    }

    public raw(): IFluidLayoutColumn<TContent>[] {
        return this.columnFacades.map((columnFacade) => columnFacade.raw());
    }

    public column(columnIndex: number): IFluidLayoutColumnFacade<TContent> | undefined {
        return this.columnFacades[columnIndex];
    }

    public map<TReturn>(callback: (column: IFluidLayoutColumnFacade<TContent>) => TReturn): TReturn[] {
        return this.columnFacades.map(callback);
    }

    public flatMap<TReturn>(callback: (column: IFluidLayoutColumnFacade<TContent>) => TReturn[]): TReturn[] {
        return flatMap(this.columnFacades, callback);
    }

    public reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutColumnFacade<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn {
        return this.columnFacades.reduce(callback, initialValue);
    }

    public find(
        pred: (row: IFluidLayoutColumnFacade<TContent>) => boolean,
    ): IFluidLayoutColumnFacade<TContent> | undefined {
        return this.columnFacades.find(pred);
    }

    public every(pred: (row: IFluidLayoutColumnFacade<TContent>) => boolean): boolean {
        return this.columnFacades.every(pred);
    }

    public some(pred: (row: IFluidLayoutColumnFacade<TContent>) => boolean): boolean {
        return this.columnFacades.some(pred);
    }

    public filter(
        pred: (row: IFluidLayoutColumnFacade<TContent>) => boolean,
    ): IFluidLayoutColumnFacade<TContent>[] {
        return this.columnFacades.filter(pred);
    }

    public all(): IFluidLayoutColumnFacade<TContent>[] {
        return this.columnFacades;
    }

    public count(): number {
        return this.columnFacades.length;
    }
}
