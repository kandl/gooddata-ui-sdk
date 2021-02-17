// (C) 2019-2021 GoodData Corporation
import invariant from "ts-invariant";
import { IFluidLayout, IFluidLayoutSize, isFluidLayout } from "../fluidLayout";

import { IFluidLayoutFacade, IFluidLayoutRowsFacade } from "./interfaces";
import { FluidLayoutRowsFacade } from "./rows";

/**
 * @alpha
 */
export class FluidLayoutFacade<TContent> implements IFluidLayoutFacade<TContent> {
    protected constructor(protected layout: IFluidLayout<TContent>) {}

    /**
     * Creates an instance of FluidLayoutFacade
     * @param layout - layout to wrap
     */
    public static for<TContent>(layout: IFluidLayout<TContent>): IFluidLayoutFacade<TContent> {
        invariant(isFluidLayout(layout), "Provided data must be IFluidLayout!");
        return new FluidLayoutFacade(layout);
    }

    public rows(): IFluidLayoutRowsFacade<TContent> {
        return FluidLayoutRowsFacade.for(this, this.layout.rows);
    }

    public size(): IFluidLayoutSize | undefined {
        return this.layout.size;
    }

    public raw(): IFluidLayout<TContent> {
        return this.layout;
    }
}
