// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutRow, IFluidLayoutSectionHeader } from "../fluidLayout";

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
export class FluidLayoutRowMethods<TContent> implements IFluidLayoutRowMethods<TContent> {
    protected constructor(
        protected readonly _layoutFacade: IFluidLayoutFacade<TContent>,
        protected readonly _row: IFluidLayoutRow<TContent>,
    ) {}

    public static for<TContent>(
        layoutFacade: IFluidLayoutFacade<TContent>,
        row: IFluidLayoutRow<TContent>,
    ): FluidLayoutRowMethods<TContent> {
        return new FluidLayoutRowMethods(layoutFacade, row);
    }

    public raw = (): IFluidLayoutRow<TContent> => this._row;

    public header = (): IFluidLayoutSectionHeader | undefined => this._row.header;

    public style = (): string | undefined => this._row.style;

    public index = (): number => this._layoutFacade.rows().raw().indexOf(this._row);

    public columns = (): IFluidLayoutColumnsMethods<TContent> =>
        FluidLayoutColumnsMethods.for(this._layoutFacade, this);
}
