import React from "react";
import { IColorLegendSize, IHeatmapLegendItem } from "./types.js";
/**
 * @internal
 */
export interface IHeatmapLegendProps {
    series: IHeatmapLegendItem[];
    size: IColorLegendSize;
    format?: string;
    numericSymbols: string[];
    position: string;
    title?: string;
}
/**
 * @internal
 */
export declare class HeatmapLegend extends React.PureComponent<IHeatmapLegendProps> {
    render(): JSX.Element;
}
//# sourceMappingURL=HeatmapLegend.d.ts.map