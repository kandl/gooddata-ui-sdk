// (C) 2019-2021 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import { IFluidLayout, IFluidLayoutColumn, IFluidLayoutRow, isFluidLayout } from "../fluidLayout";
import invariant from "ts-invariant";

import { IFluidLayoutMethods, IFluidLayoutRowsMethods } from "../fluidLayoutMethods";
import { FluidLayoutRowsFacade } from "./rows";

/**
 *
 * @alpha
 */
export class FluidLayoutFacade<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> implements IFluidLayoutMethods<TContent, TColumn, TRow> {
    protected constructor(protected _layout: IFluidLayout<TContent, TColumn, TRow>) {}

    /**
     * Creates an instance of FluidLayoutFacade
     * @param layout - layout to wrap
     */
    public static for<
        TContent,
        TColumn extends IFluidLayoutColumn<TContent>,
        TRow extends IFluidLayoutRow<TContent, TColumn>
    >(layout: IFluidLayout<TContent, TColumn, TRow>): IFluidLayoutMethods<TContent, TColumn, TRow> {
        invariant(isFluidLayout(layout), "Provided data must be IFluidLayout!");
        return new FluidLayoutFacade<TContent, TColumn, TRow>(cloneDeep(layout));
    }

    public rows = (): IFluidLayoutRowsMethods<TContent, TColumn, TRow> => {
        return FluidLayoutRowsFacade.for(this);
    };

    /**
     * Returns transformed layout
     */
    public layout = (): IFluidLayout<TContent, TColumn, TRow> => {
        return this._layout;
    };
}
