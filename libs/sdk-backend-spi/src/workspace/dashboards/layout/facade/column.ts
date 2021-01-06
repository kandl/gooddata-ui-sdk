// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutRow, IFluidLayoutSizeByScreen } from "../fluidLayout";

import { IFluidLayoutColumnMethods, IFluidLayoutFacade, IFluidLayoutRowMethods } from "../fluidLayoutMethods";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export class FluidLayoutColumnMethods<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutColumnMethods<TContent, TColumn, TRow> {
    protected constructor(
        protected _layoutFacade: IFluidLayoutFacade<TContent, TColumn, TRow>,
        protected _rowFacade: IFluidLayoutRowMethods<TContent, TColumn, TRow>,
        protected _column: TColumn,
    ) {}

    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(
        layoutFacade: IFluidLayoutFacade<TContent, TColumn, TRow>,
        rowFacade: IFluidLayoutRowMethods<TContent, TColumn, TRow>,
        column: TColumn,
    ): FluidLayoutColumnMethods<TContent, TColumn, TRow> {
        return new FluidLayoutColumnMethods(layoutFacade, rowFacade, column);
    }

    public raw = (): TColumn => this._column;

    public index = (): number => this._rowFacade.columns().raw().indexOf(this._column);

    public size = (): IFluidLayoutSizeByScreen => this._column.size;

    public style = (): string | undefined => this._column.style;

    public content = (): TContent | undefined => this._column.content;

    public row = (): IFluidLayoutRowMethods<TContent, TColumn, TRow> => this._rowFacade;
}
