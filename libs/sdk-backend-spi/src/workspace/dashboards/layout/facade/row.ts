// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutRow, IFluidLayoutSectionHeader } from "../fluidLayout";

import {
    IFluidLayoutColumnsMethods,
    IFluidLayoutRowMethods,
    IFluidLayoutMethods,
} from "../fluidLayoutMethods";
import { FluidLayoutColumnsFacade } from "./columns";

/**
 * @alpha
 */
export class FluidLayoutRowFacade<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutRowMethods<TContent, TColumn, TRow> {
    protected constructor(
        protected readonly _layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
        protected readonly _row: TRow,
    ) {}

    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(
        layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
        row: TRow,
    ): FluidLayoutRowFacade<TContent, TColumn, TRow> {
        return new FluidLayoutRowFacade(layoutFacade, row);
    }

    public raw = (): TRow => this._row;

    public header = (): IFluidLayoutSectionHeader | undefined => this._row.header;

    public style = (): string | undefined => this._row.style;

    public index = (): number => this._layoutFacade.rows().raw().indexOf(this._row);

    public columns = (): IFluidLayoutColumnsMethods<TContent, TColumn, TRow> =>
        FluidLayoutColumnsFacade.for(this._layoutFacade, this);
}
