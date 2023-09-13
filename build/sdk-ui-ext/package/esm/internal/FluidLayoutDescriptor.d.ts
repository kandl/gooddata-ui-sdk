import { IFluidLayoutDescriptor } from "./interfaces/LayoutDescriptor";
/**
 * @alpha
 */
export declare class FluidLayoutDescriptor implements IFluidLayoutDescriptor {
    type: "fluid";
    gridColumnsCount: number;
    gridRowHeight: number;
    toGridHeight(heightPx: number): number;
    toHeightInPx(height: number): number;
}
/**
 * @alpha
 */
export declare const fluidLayoutDescriptor: FluidLayoutDescriptor;
//# sourceMappingURL=FluidLayoutDescriptor.d.ts.map