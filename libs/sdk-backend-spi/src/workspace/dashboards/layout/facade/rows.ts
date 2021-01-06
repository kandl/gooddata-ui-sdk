// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutRow } from "../fluidLayout";

import { IFluidLayoutRowsMethods, IFluidLayoutFacade, IFluidLayoutRowMethods } from "../fluidLayoutMethods";
import { FluidLayoutRowMethods } from "./row";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export class FluidLayoutRowsMethods<TContent> implements IFluidLayoutRowsMethods<TContent> {
    protected constructor(protected readonly _layoutFacade: IFluidLayoutFacade<TContent>) {}

    public static for<TContent>(
        layoutFacade: IFluidLayoutFacade<TContent>,
    ): FluidLayoutRowsMethods<TContent> {
        return new FluidLayoutRowsMethods(layoutFacade);
    }

    public raw = (): IFluidLayoutRow<TContent>[] => this._layoutFacade.layout().rows;

    public row = (rowIndex: number): IFluidLayoutRowMethods<TContent> | undefined => {
        const rawRow = this._layoutFacade.layout().rows[rowIndex];
        return rawRow ? FluidLayoutRowMethods.for(this._layoutFacade, rawRow) : undefined;
    };

    public map = <TReturn>(callback: (row: IFluidLayoutRowMethods<TContent>) => TReturn): TReturn[] => {
        return this._layoutFacade
            .layout()
            .rows.map((row) => callback(FluidLayoutRowMethods.for(this._layoutFacade, row)));
    };

    public reduce = <TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutRowMethods<TContent>) => TReturn,
        initialValue: TReturn,
    ): TReturn => {
        return this._layoutFacade
            .layout()
            .rows.reduce(
                (acc, row) => callback(acc, FluidLayoutRowMethods.for(this._layoutFacade, row)),
                initialValue,
            );
    };

    public find = (
        pred: (row: IFluidLayoutRowMethods<TContent>) => boolean,
    ): IFluidLayoutRowMethods<TContent> | undefined => {
        const rows = this._layoutFacade
            .layout()
            .rows.map((row) => FluidLayoutRowMethods.for(this._layoutFacade, row));

        return rows.find(pred);
    };
}
