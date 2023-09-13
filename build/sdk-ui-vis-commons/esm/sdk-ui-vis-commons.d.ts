/**
 * This package provides functions commonly used when building visualizations.
 *
 * @remarks
 * This package is mainly used internally by other `@gooddata/sdk-ui-*` packages, and we do not recommend using
 * it directly outside of GoodData because its API can change at any time.
 *
 * @packageDocumentation
 */

import { ContentRect } from 'react-measure';
import { DataViewFacade } from '@gooddata/sdk-ui';
import { IColor } from '@gooddata/sdk-model';
import { IColorAssignment } from '@gooddata/sdk-ui';
import { IColorPalette } from '@gooddata/sdk-model';
import { IColorPaletteItem } from '@gooddata/sdk-model';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { IHeaderPredicate } from '@gooddata/sdk-ui';
import { IMappingHeader } from '@gooddata/sdk-ui';
import { IRgbColorValue } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { default as React_2 } from 'react';
import { Rect } from 'react-measure';

/**
 * @internal
 */
export declare class AttributeColorStrategy extends ColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}

/**
 * @internal
 */
export declare type ButtonsOrientationType = "upDown" | "leftRight";

/**
 * @internal
 * Calculate widget height and font size for Kpi's and Headlines
 * when enableCompactSize is set to true.
 */
export declare function calculateHeadlineHeightFontSize(secondaryItem?: boolean, clientHeight?: number): {
    height: number | undefined;
    fontSize: number | undefined;
};

/**
 * @internal
 */
export declare const ColorLegend: React_2.ComponentType<Omit<IColorLegendProps, "theme" | "themeIsLoading">>;

/**
 * @internal
 */
export declare abstract class ColorStrategy implements IColorStrategy {
    protected palette: string[];
    protected fullColorAssignment: IColorAssignment[];
    protected outputColorAssignment: IColorAssignment[];
    protected theme?: ITheme;
    constructor(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade, theme?: ITheme);
    getColorByIndex(index: number): string;
    getColorAssignment(): IColorAssignment[];
    getFullColorAssignment(): IColorAssignment[];
    protected createPalette(colorPalette: IColorPalette, colorAssignment: IColorAssignment[], _viewByAttribute: any, _stackByAttribute: any): string[];
    protected abstract createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}

/**
 * @internal
 */
export declare const ColorUtils: {
    getColorByGuid: typeof getColorByGuid;
    getColorMappingPredicate: typeof getColorMappingPredicate;
};

/**
 * @internal
 */
export declare const DEFAULT_LEGEND_CONFIG: {
    enabled: boolean;
    position: PositionType;
};

/**
 * This function will mutate the incoming data view and replace headers with empty name with a fallback
 * string. This is so that we can show "(empty)" or similar strings in the UI.
 *
 * @param dataView - view to mutate
 * @param emptyHeaderString - value to use for empty strings
 * @deprecated try to avoid using this function and handle empty headers when displaying them
 * @public
 */
export declare function fixEmptyHeaderItems(dataView: IDataView, emptyHeaderString: string): void;

/**
 * @internal
 */
export declare const FLUID_LEGEND_THRESHOLD = 768;

/**
 * @internal
 */
export declare class FluidLegend extends React_2.PureComponent<IFluidLegendProps> {
    state: {
        showAll: boolean;
    };
    toggleShowAll: () => void;
    renderSeries: (itemWidth: number, visibleItemsCount: number) => React_2.ReactNode;
    renderPaging: () => React_2.ReactNode;
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare function formatLegendLabel(value: number, format: string | undefined, diff: number, numericSymbols: string[]): string;

/**
 * @internal
 */
export declare function getAttributeColorAssignment(attribute: any, colorPalette: IColorPalette, colorMapping: IColorMapping[], dv: DataViewFacade): IColorAssignment[];

/**
 * @internal
 */
export declare function getColorByGuid(colorPalette: IColorPalette, guid: string, index: number): IRgbColorValue;

/**
 * @internal
 */
export declare function getColorFromMapping(mappingHeader: IMappingHeader, colorMapping: IColorMapping[], dv: DataViewFacade): IColor | undefined;

/**
 * Creates new predicate for mapping colors to chart entities:
 *
 * -  if attribute header, URI is expected to match testValue
 * -  otherwise (attr or measure descriptor) expecting local identifier match
 *
 * @param testValue - right hand side to test against
 * @public
 */
export declare function getColorMappingPredicate(testValue: string): IHeaderPredicate;

/**
 * @internal
 */
export declare function getColorPaletteFromColors(colors: string[]): IColorPalette;

/**
 * @internal
 * Provides responsive class for headline/kpi component based on its width and state of secondary item
 */
export declare const getHeadlineResponsiveClassName: (width: number | undefined, isShortened?: boolean) => string;

/**
 * @internal
 */
export declare function getLegendDetails(legendPosition: PositionType, responsive: boolean | "autoPositionWithPopup", options: ILegendDetailOptions): ILegendDetails | null;

/**
 * Source:
 *     http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @internal
 */
export declare function getLighterColor(color: string, percent: number): string;

/**
 * @internal
 */
export declare function getLighterColorFromRGB(color: IRgbColorValue, percent: number): IRgbColorValue;

/**
 * @internal
 */
export declare function getRgbString(color: IColorPaletteItem): string;

/**
 * @internal
 */
export declare function getRgbStringFromRGB(color: IRgbColorValue): string;

/**
 * Applies color properties preferences. If palette is specified and non-empty, it is returned. Otherwise
 * non-empty colors are transformed into a palette and returned. If all else fails, default color palette
 * is returned
 *
 * @internal
 */
export declare function getValidColorPalette(colors?: string[], colorPalette?: IColorPalette): IColorPalette;

/**
 * @internal
 */
export declare const HeadlinePagination: React_2.FC<IHeadlinePaginationProps>;

/**
 * @internal
 */
export declare class HeatmapLegend extends React_2.PureComponent<IHeatmapLegendProps> {
    render(): JSX.Element;
}

/**
 * @internal
 */
export declare interface IBaseLegendItem {
    name: string;
    color: string;
    legendIndex: number;
    yAxis: number;
}

/**
 * @internal
 */
export declare interface IColorLegendItem {
    range: IRange;
    color: string;
}

/**
 * @internal
 */
export declare interface IColorLegendProps {
    data: IColorLegendItem[];
    numericSymbols: string[];
    position: string;
    size?: IColorLegendSize;
    format?: string;
    theme?: ITheme;
    title?: string;
}

/**
 * @internal
 */
export declare type IColorLegendSize = "large" | "medium" | "small";

/**
 * @public
 */
export declare interface IColorMapping {
    /**
     * Predicate function which will be called for each entity that will be charted.
     *
     * @remarks
     * If matched, the `color` will assigned to that entity when it is rendered (be it as a bar, column, point, slice etc)
     */
    predicate: IHeaderPredicate;
    /**
     * Color to assign.
     *
     * @remarks
     * It is possible to assign color from colorPalette or provide custom color as RGB code.
     */
    color: IColor;
}

/**
 * @internal
 */
export declare interface IColorStrategy {
    getColorByIndex(index: number): string;
    getColorAssignment(): IColorAssignment[];
    getFullColorAssignment(): IColorAssignment[];
}

/**
 * @internal
 */
export declare interface ICreateColorAssignmentReturnValue {
    fullColorAssignment: IColorAssignment[];
    outputColorAssignment?: IColorAssignment[];
}

/**
 * @internal
 */
export declare interface IFluidLegendProps {
    containerWidth: number;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
}

/**
 * @internal
 */
export declare interface IGeoChartLegendData {
    colorData?: IColorLegendItem[];
    sizeData?: number[];
}

/**
 * @internal
 */
export declare interface IHeadlinePaginationProps {
    renderSecondaryItem: () => JSX.Element;
    renderTertiaryItem: () => JSX.Element;
}

/**
 * @internal
 */
export declare interface IHeatmapLegendItem {
    range: IRange;
    isVisible?: boolean;
    color: string;
    legendIndex: number;
}

/**
 * @internal
 */
export declare interface IHeatmapLegendProps {
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
export declare interface ILegendDetailOptions {
    contentRect?: ContentRect;
    showFluidLegend?: boolean;
    isHeatmap?: boolean;
    legendLabel?: string;
}

/**
 * @internal
 */
export declare interface ILegendDetails {
    name?: string;
    position: PositionType;
    maxRows?: number;
    renderPopUp?: boolean;
}

/**
 * @internal
 */
export declare interface ILegendOptions {
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
export declare interface ILegendProps {
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
export declare interface IPagingProps {
    page: number;
    pagesCount: number;
    showNextPage(): void;
    showPrevPage(): void;
    buttonsOrientation?: ButtonsOrientationType;
}

/**
 * @internal
 */
export declare interface IPopUpLegendProps {
    series: IPushpinCategoryLegendItem[];
    onLegendItemClick: (item: IPushpinCategoryLegendItem) => void;
    name?: string;
    maxRows?: number;
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    containerId: string;
    customComponent?: JSX.Element | null;
    customComponentName?: string;
}

/**
 * @internal
 */
export declare interface IPushpinCategoryLegendItem {
    name: string;
    uri: string;
    color?: string;
    legendIndex: number;
    isVisible?: boolean;
}

/**
 * @internal
 */
export declare interface IRange {
    from: number;
    to: number;
}

/**
 * @internal
 */
export declare function isCustomPalette(palette: IColorPalette): boolean;

/**
 * @internal
 */
export declare interface IStaticLegendProps {
    containerHeight: number;
    position: string;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    shouldFillAvailableSpace?: boolean;
    label?: string;
    buttonOrientation?: ButtonsOrientationType;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
    paginationHeight?: number;
    customComponent?: JSX.Element | null;
    onPageChanged?: (page: number) => void;
}

/**
 * @internal
 */
export declare function isValidMappedColor(colorItem: IColor, colorPalette: IColorPalette): boolean;

/**
 * @internal
 */
export declare type ItemBorderRadiusPredicate = (item: any) => boolean;

/**
 * @internal
 */
export declare class Legend extends React_2.PureComponent<ILegendProps> {
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
    renderPopUpLegend: () => React_2.ReactNode;
    renderFluid: () => React_2.ReactNode;
    renderStatic: () => React_2.ReactNode;
    render(): React_2.ReactNode;
    private renderHeatmapLegend;
}

/**
 * @internal
 */
export declare type LegendOptionsItemType = IBaseLegendItem | IHeatmapLegendItem;

/**
 * @internal
 */
export declare const LegendPosition: {
    [name: string]: PositionType;
};

/**
 * @internal
 */
export declare function normalizeColorToRGB(color: string): string;

/**
 * @internal
 */
export declare const Paging: (props: IPagingProps) => React_2.ReactElement;

/**
 * @internal
 */
export declare function parseRGBColorCode(color: string): {
    R: number;
    G: number;
    B: number;
};

/**
 * @internal
 */
export declare function parseRGBString(color: string): IRgbColorValue | null;

/**
 * @internal
 */
export declare const PopUpLegend: React_2.FC<IPopUpLegendProps>;

/**
 * TODO: rename
 * @internal
 */
export declare type PositionType = "left" | "right" | "top" | "bottom" | "auto";

/**
 * @internal
 * Check if Kpi's and Headlines should display pagination according to widget height.
 */
export declare const shouldRenderPagination: (enableCompactSize: boolean, width: number, height: number) => boolean;

/**
 * @internal
 */
export declare function shouldShowFluid(documentObj: Document): boolean;

/**
 * @internal
 */
export declare class StaticLegend extends React_2.PureComponent<IStaticLegendProps> {
    static defaultProps: Pick<IStaticLegendProps, "buttonOrientation" | "paginationHeight" | "onPageChanged">;
    state: {
        page: number;
    };
    showNextPage: () => void;
    showPrevPage: () => void;
    renderPaging: (pagesCount: number) => React_2.ReactNode;
    render(): JSX.Element;
    private getPagesCount;
    private hasCustomComponent;
}

/**
 * @internal
 */
export declare const SupportedLegendPositions: PositionType[];

/**
 * Returns the value if it is non-empty or a fallback text.
 *
 * @param value - value to handle
 * @param emptyValueText - text to display if value is empty
 * @internal
 */
export declare function valueWithEmptyHandling(value: string | undefined | null, emptyValueText: string): string;

export { }
