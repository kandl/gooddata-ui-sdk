import React from "react";
import { Rect } from "react-measure";
import { IPushpinCategoryLegendItem, ItemBorderRadiusPredicate } from "./types.js";
/**
 * @internal
 */
export interface ILegendProps {
    legendLabel?: string;
    maximumRows?: number;
    responsive?: boolean | "autoPositionWithPopup";
    legendItemsEnabled?: any[];
    height?: number;
    position: string;
    heatmapLegend?: boolean;
    series: any;
    seriesMapper?: (visibleSeries: any) => any;
    format?: string;
    locale?: string;
    showFluidLegend?: boolean;
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    onItemClick(item: any): void;
    validateOverHeight(legendClient: Rect): void;
    contentDimensions: {
        width: number;
        height: number;
    };
    containerId?: string;
}
/**
 * @internal
 */
export declare class Legend extends React.PureComponent<ILegendProps> {
    static defaultProps: {
        responsive: boolean;
        legendItemsEnabled: any;
        height: number;
        showFluidLegend: boolean;
        isLegendOverHeight: boolean;
        enableBorderRadius: boolean;
    };
    onItemClick: (item: IPushpinCategoryLegendItem) => void;
    getSeries: () => any;
    renderPopUpLegend: () => React.ReactNode;
    renderFluid: () => React.ReactNode;
    renderStatic: () => React.ReactNode;
    render(): React.ReactNode;
    private renderHeatmapLegend;
}
//# sourceMappingURL=Legend.d.ts.map