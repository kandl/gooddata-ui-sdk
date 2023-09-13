/**
 * @internal
 */
export declare const LegendPosition: {
    [name: string]: PositionType;
};
/**
 * @internal
 */
export declare const SupportedLegendPositions: PositionType[];
/**
 * @internal
 */
export interface ILegendOptions {
    enabled: boolean;
    toggleEnabled: boolean;
    position: PositionType;
    format: string;
    items: LegendOptionsItemType[];
    responsive?: boolean | "autoPositionWithPopup";
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    seriesMapper?: (visibleSeries: any) => any;
}
/**
 * @internal
 */
export type LegendOptionsItemType = IBaseLegendItem | IHeatmapLegendItem;
/**
 * @internal
 */
export interface IBaseLegendItem {
    name: string;
    color: string;
    legendIndex: number;
    yAxis: number;
}
/**
 * @internal
 */
export interface IHeatmapLegendItem {
    range: IRange;
    isVisible?: boolean;
    color: string;
    legendIndex: number;
}
/**
 * @internal
 */
export interface IColorLegendItem {
    range: IRange;
    color: string;
}
/**
 * @internal
 */
export interface IGeoChartLegendData {
    colorData?: IColorLegendItem[];
    sizeData?: number[];
}
/**
 * @internal
 */
export interface IRange {
    from: number;
    to: number;
}
/**
 * @internal
 */
export declare const DEFAULT_LEGEND_CONFIG: {
    enabled: boolean;
    position: PositionType;
};
/**
 * @internal
 */
export interface IPushpinCategoryLegendItem {
    name: string;
    uri: string;
    color?: string;
    legendIndex: number;
    isVisible?: boolean;
}
/**
 * TODO: rename
 * @internal
 */
export type PositionType = "left" | "right" | "top" | "bottom" | "auto";
/**
 * @internal
 */
export type ItemBorderRadiusPredicate = (item: any) => boolean;
/**
 * @internal
 */
export type IColorLegendSize = "large" | "medium" | "small";
//# sourceMappingURL=types.d.ts.map