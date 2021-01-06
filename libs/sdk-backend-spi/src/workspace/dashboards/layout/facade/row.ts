// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutRow, IFluidLayoutSectionHeader } from "../fluidLayout";

import {
    IFluidLayoutColumnsMethods,
    IFluidLayoutRowMethods,
    IFluidLayoutFacade,
} from "../fluidLayoutMethods";
import { FluidLayoutColumnsMethods } from "./columns";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export class FluidLayoutRowMethods<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutRowMethods<TContent, TColumn, TRow> {
    protected constructor(
        protected readonly _layoutFacade: IFluidLayoutFacade<TContent, TColumn, TRow>,
        protected readonly _row: TRow,
    ) {}

    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(
        layoutFacade: IFluidLayoutFacade<TContent, TColumn, TRow>,
        row: TRow,
    ): FluidLayoutRowMethods<TContent, TColumn, TRow> {
        return new FluidLayoutRowMethods(layoutFacade, row);
    }

    public raw = (): TRow => this._row;

    public header = (): IFluidLayoutSectionHeader | undefined => this._row.header;

    public style = (): string | undefined => this._row.style;

    public index = (): number => this._layoutFacade.rows().raw().indexOf(this._row);

    public columns = (): IFluidLayoutColumnsMethods<TContent, TColumn, TRow> =>
        FluidLayoutColumnsMethods.for(this._layoutFacade, this);
}
