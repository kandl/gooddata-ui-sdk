// (C) 2019-2021 GoodData Corporation
import flatMap from "lodash/flatMap";
import { IFluidLayoutRow } from "../fluidLayout";
import {
    IFluidLayoutRowsFacade,
    IFluidLayoutRowFacade,
    IFluidLayoutRowsFacadeImpl,
    IFluidLayoutFacadeImpl,
    IFluidLayoutFacade,
} from "./interfaces";
import { FluidLayoutRowFacade } from "./row";

/**
 * @alpha
 */
export class FluidLayoutRowsFacade<TContent> implements IFluidLayoutRowsFacade<TContent> {
    protected constructor(
        protected readonly layoutFacade: IFluidLayoutFacade<TContent>,
        protected readonly rowFacades: IFluidLayoutRowFacade<TContent>[],
    ) {}

    public static for<TContent>(
        layoutFacade: IFluidLayoutFacadeImpl<TContent>,
        rows: IFluidLayoutRow<TContent>[],
    ): IFluidLayoutRowsFacadeImpl<TContent> {
        const rowFacades = rows.map((row, index) => FluidLayoutRowFacade.for(layoutFacade, row, index));
        return new FluidLayoutRowsFacade(layoutFacade, rowFacades);
    }

    public raw(): IFluidLayoutRow<TContent>[] {
        return this.rowFacades.map((row) => row.raw());
    }

    public row(rowIndex: number): IFluidLayoutRowFacade<TContent> | undefined {
        return this.rowFacades[rowIndex];
    }

    public map<TReturn>(callback: (row: IFluidLayoutRowFacade<TContent>) => TReturn): TReturn[] {
        return this.rowFacades.map(callback);
    }

    public flatMap<TReturn>(callback: (row: IFluidLayoutRowFacade<TContent>) => TReturn[]): TReturn[] {
        return flatMap(this.rowFacades, callback);
    }

    public reduce<TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutRowFacade<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn {
        return this.rowFacades.reduce(callback, initialValue);
    }

    public find(
        pred: (row: IFluidLayoutRowFacade<TContent>) => boolean,
    ): IFluidLayoutRowFacade<TContent> | undefined {
        return this.rowFacades.find(pred);
    }

    public every(pred: (row: IFluidLayoutRowFacade<TContent>) => boolean): boolean {
        return this.rowFacades.every(pred);
    }

    public some(pred: (row: IFluidLayoutRowFacade<TContent>) => boolean): boolean {
        return this.rowFacades.some(pred);
    }

    public filter(
        pred: (row: IFluidLayoutRowFacade<TContent>) => boolean,
    ): IFluidLayoutRowFacade<TContent>[] {
        return this.rowFacades.filter(pred);
    }

    public all(): IFluidLayoutRowFacade<TContent>[] {
        return this.rowFacades;
    }

    public count(): number {
        return this.rowFacades.length;
    }
}
