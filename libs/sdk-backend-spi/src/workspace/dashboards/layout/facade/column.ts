// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutColumn, IFluidLayoutSizeByScreen } from "../fluidLayout";

import { IFluidLayoutColumnMethods, IFluidLayoutFacade, IFluidLayoutRowMethods } from "../fluidLayoutMethods";

/**
 * TODO: RAIL-2869 add docs
 * @alpha
 */
export class FluidLayoutColumnMethods<TContent> implements IFluidLayoutColumnMethods<TContent> {
    protected constructor(
        protected _layoutFacade: IFluidLayoutFacade<TContent>,
        protected _rowFacade: IFluidLayoutRowMethods<TContent>,
        protected _column: IFluidLayoutColumn<TContent>,
    ) {}

    public static for<TContent>(
        layoutFacade: IFluidLayoutFacade<TContent>,
        rowFacade: IFluidLayoutRowMethods<TContent>,
        column: IFluidLayoutColumn<TContent>,
    ): FluidLayoutColumnMethods<TContent> {
        return new FluidLayoutColumnMethods(layoutFacade, rowFacade, column);
    }

    public raw = (): IFluidLayoutColumn<TContent> => this._column;

    public index = (): number => this._rowFacade.columns().raw().indexOf(this._column);

    public size = (): IFluidLayoutSizeByScreen => this._column.size;

    public style = (): string | undefined => this._column.style;

    public content = (): TContent | undefined => this._column.content;

    public row = (): IFluidLayoutRowMethods<TContent> => this._rowFacade;
}
