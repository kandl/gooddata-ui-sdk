import { ContentRect } from "react-measure";
import { PositionType } from "../types.js";
/**
 * @internal
 */
export interface ILegendDetails {
    name?: string;
    position: PositionType;
    maxRows?: number;
    renderPopUp?: boolean;
}
/**
 * @internal
 */
export interface ILegendDetailOptions {
    contentRect?: ContentRect;
    showFluidLegend?: boolean;
    isHeatmap?: boolean;
    legendLabel?: string;
}
/**
 * @internal
 */
export declare function getLegendDetails(legendPosition: PositionType, responsive: boolean | "autoPositionWithPopup", options: ILegendDetailOptions): ILegendDetails | null;
//# sourceMappingURL=helpers.d.ts.map