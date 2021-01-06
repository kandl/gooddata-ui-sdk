// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutRow, IFluidLayoutSizeByScreen } from "../fluidLayout";

import {
    IFluidLayoutColumnMethods,
    IFluidLayoutMethods,
    IFluidLayoutRowMethods,
} from "../fluidLayoutMethods";

/**
 * @alpha
 */
export class FluidLayoutColumnFacade<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutColumnMethods<TContent, TColumn, TRow> {
    protected constructor(
        protected _layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
        protected _rowFacade: IFluidLayoutRowMethods<TContent, TColumn, TRow>,
        protected _column: TColumn,
    ) {}

    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(
        layoutFacade: IFluidLayoutMethods<TContent, TColumn, TRow>,
        rowFacade: IFluidLayoutRowMethods<TContent, TColumn, TRow>,
        column: TColumn,
    ): FluidLayoutColumnFacade<TContent, TColumn, TRow> {
        return new FluidLayoutColumnFacade(layoutFacade, rowFacade, column);
    }

    public raw = (): TColumn => this._column;

    public index = (): number => this._rowFacade.columns().raw().indexOf(this._column);

    public size = (): IFluidLayoutSizeByScreen => this._column.size;

    public style = (): string | undefined => this._column.style;

    public content = (): TContent | undefined => this._column.content;

    public row = (): IFluidLayoutRowMethods<TContent, TColumn, TRow> => this._rowFacade;
}
