import { IColorLegendItem, IColorLegendSize } from "./types.js";
import { ITheme } from "@gooddata/sdk-model";
export declare const RESPONSIVE_ITEM_MIN_WIDTH = 200;
export declare const RESPONSIVE_VISIBLE_ROWS = 2;
export declare const FLUID_PAGING_WIDTH = 30;
export declare const LEGEND_PADDING = 12;
export declare const ITEM_HEIGHT = 20;
export declare const SKIPPED_LABEL_TEXT = "...";
export declare const UTF_NON_BREAKING_SPACE = "\u00A0";
export declare const STATIC_PAGING_HEIGHT = 44;
export interface IColorLegendBox {
    class: string | null;
    key: string;
    style?: {
        backgroundColor: string;
        border: string;
    };
}
interface IColorLabelConfigItem {
    type: string;
    labelIndex?: number;
    style?: {
        width?: number;
        height?: number;
        lineHeight?: string;
        textAlign?: string;
    };
}
export interface IHeatmapLegendLabel {
    class?: string;
    key: string;
    label: string;
    style: object;
}
export interface IColorLegendConfig {
    boxes: IColorLegendBox[];
    classes: string[];
    labels: IHeatmapLegendLabel[];
    position: string;
}
export declare const verticalHeatmapConfig: IColorLabelConfigItem[];
export declare const heatmapLegendConfigMatrix: IColorLabelConfigItem[][];
export declare const heatmapSmallLegendConfigMatrix: IColorLabelConfigItem[][];
export declare const colorSmallLegendConfigMatrix: IColorLabelConfigItem[][];
export declare const heatmapMediumLegendConfigMatrix: IColorLabelConfigItem[][];
export declare function buildColorLabelsConfig(labels: string[], config: any[]): any[];
export declare function calculateFluidLegend(seriesCount: number, containerWidth: number): {
    hasPaging: boolean;
    itemWidth: number;
    visibleItemsCount: number;
};
export declare function calculateStaticLegend(seriesCount: number, containerHeight: number, columnsNumber?: number, paginationHeight?: number): {
    hasPaging: boolean;
    visibleItemsCount: number;
};
export declare function getColorLegendConfiguration(series: IColorLegendItem[], format: string | undefined, numericSymbols: string[], size: IColorLegendSize, position: string, theme?: ITheme): IColorLegendConfig;
export declare const LEGEND_AXIS_INDICATOR = "legendAxisIndicator";
export declare const LEGEND_SEPARATOR = "legendSeparator";
/**
 * @internal
 */
export declare function formatLegendLabel(value: number, format: string | undefined, diff: number, numericSymbols: string[]): string;
/**
 * @internal
 */
export declare const FLUID_LEGEND_THRESHOLD = 768;
/**
 * @internal
 */
export declare function shouldShowFluid(documentObj: Document): boolean;
export {};
//# sourceMappingURL=helpers.d.ts.map