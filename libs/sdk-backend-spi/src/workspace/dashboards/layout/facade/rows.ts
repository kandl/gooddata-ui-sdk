// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutRow } from "../fluidLayout";

import { IFluidLayoutRowsMethods, IFluidLayoutMethods, IFluidLayoutRowMethods } from "../fluidLayoutMethods";
import { FluidLayoutRowFacade } from "./row";

/**
 * @alpha
 */
export class FluidLayoutRowsFacade<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutRowsMethods<TContent, TColumn, TRow> {
    protected constructor(protected readonly _layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>) {}

    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(
        layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
    ): FluidLayoutRowsFacade<TContent, TColumn, TRow> {
        return new FluidLayoutRowsFacade(layoutFacade);
    }

    public raw = (): TRow[] => this._layoutFacade.layout().rows;

    public row = (rowIndex: number): IFluidLayoutRowMethods<TContent, TColumn, TRow> | undefined => {
        const rawRow = this._layoutFacade.layout().rows[rowIndex];
        return rawRow ? FluidLayoutRowFacade.for(this._layoutFacade, rawRow) : undefined;
    };

    public map = <TReturn>(
        callback: (row: IFluidLayoutRowMethods<TContent, TColumn, TRow>) => TReturn,
    ): TReturn[] => {
        return this._layoutFacade
            .layout()
            .rows.map((row) => callback(FluidLayoutRowFacade.for(this._layoutFacade, row)));
    };

    public reduce = <TReturn>(
        callback: (acc: TReturn, row: IFluidLayoutRowMethods<TContent, TColumn, TRow>) => TReturn,
        initialValue: TReturn,
    ): TReturn => {
        return this._layoutFacade
            .layout()
            .rows.reduce(
                (acc, row) => callback(acc, FluidLayoutRowFacade.for(this._layoutFacade, row)),
                initialValue,
            );
    };

    public find = (
        pred: (row: IFluidLayoutRowMethods<TContent, TColumn, TRow>) => boolean,
    ): IFluidLayoutRowMethods<TContent, TColumn, TRow> | undefined => {
        const rows = this._layoutFacade
            .layout()
            .rows.map((row) => FluidLayoutRowFacade.for(this._layoutFacade, row));

        return rows.find(pred);
    };
}
