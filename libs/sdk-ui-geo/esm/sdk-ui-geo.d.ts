/**
 * This package provides the components that you can use to visualize location-based data.
 *
 * @remarks
 * Currently, only the GeoPushpinChart component is available. Use this component to visualize data bound
 * to a single location (not an area).
 *
 * @packageDocumentation
 */

/// <reference types="mapbox-gl" />
/// <reference types="react" />

import { AttributeMeasureOrPlaceholder } from '@gooddata/sdk-ui';
import { AttributeOrPlaceholder } from '@gooddata/sdk-ui';
import { ContentRect } from 'react-measure';
import { getColorMappingPredicate } from '@gooddata/sdk-ui-vis-commons';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttribute } from '@gooddata/sdk-model';
import { IColorMapping } from '@gooddata/sdk-ui-vis-commons';
import { IColorPalette } from '@gooddata/sdk-model';
import { IColorStrategy } from '@gooddata/sdk-ui-vis-commons';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { IDataVisualizationProps } from '@gooddata/sdk-ui';
import { IDimension } from '@gooddata/sdk-model';
import { IDrillConfig } from '@gooddata/sdk-ui';
import { IExecutionConfig } from '@gooddata/sdk-model';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IHeaderPredicate } from '@gooddata/sdk-ui';
import { ILoadingInjectedProps } from '@gooddata/sdk-ui';
import { IPushpinCategoryLegendItem } from '@gooddata/sdk-ui-vis-commons';
import { ISeparators } from '@gooddata/sdk-ui';
import { ITheme } from '@gooddata/sdk-model';
import { IVisualizationCallbacks } from '@gooddata/sdk-ui';
import { IVisualizationProps } from '@gooddata/sdk-ui';
import { NullableFiltersOrPlaceholders } from '@gooddata/sdk-ui';
import { OnError } from '@gooddata/sdk-ui';
import { PositionType } from '@gooddata/sdk-ui-vis-commons';
import { default as React_2 } from 'react';
import { SortsOrPlaceholders } from '@gooddata/sdk-ui';
import { WrappedComponentProps } from 'react-intl';

/**
 * @public
 */
export declare type CenterPositionChangedCallback = (center: IGeoLngLat) => void;

/**
 * @internal
 */
export declare const CoreGeoChart: React_2.FC<ICoreGeoChartProps & WrappedComponentProps>;

/**
 * @internal
 */
export declare function enrichMapboxToken<T>(config?: T & {
    mapboxToken?: string;
}, mapboxToken?: string): (T & {
    mapboxToken?: string;
}) | undefined;

/**
 * @public
 */
export declare const GeoPushpinChart: (props: IGeoPushpinChartProps | IGeoPushpinChartLatitudeLongitudeProps) => JSX.Element;

export { getColorMappingPredicate }

/**
 * @internal
 */
export declare function getGeoChartDimensions(def: IExecutionDefinition): IDimension[];

/**
 * @internal
 */
export declare interface ICoreGeoChartProps extends IDataVisualizationProps {
    config?: IGeoConfig;
    height?: number;
    documentObj?: Document;
    chartRenderer?: (props: IGeoChartRendererProps) => React_2.ReactElement;
    legendRenderer?: (props: IGeoChartLegendRendererProps) => React_2.ReactElement;
    onCenterPositionChanged?: (center: IGeoLngLat) => void;
    onZoomChanged?: (zoom: number) => void;
    geoChartOptions?: IGeoChartInnerOptions;
    theme?: ITheme;
}

/**
 * @public
 */
export declare interface IGeoAttributeItem extends IGeoDataItem {
    data: string[];
}

/**
 * @internal
 */
export declare interface IGeoChartInnerOptions {
    geoData: IGeoData;
    categoryItems: IPushpinCategoryLegendItem[];
    colorStrategy: IColorStrategy;
    colorPalette: IColorPalette;
}

/**
 * @internal
 */
export declare type IGeoChartInnerProps = ICoreGeoChartProps & ILoadingInjectedProps & WrappedComponentProps;

/**
 * @internal
 */
export declare interface IGeoChartLegendRendererProps {
    categoryItems?: IPushpinCategoryLegendItem[];
    format?: string;
    geoData?: IGeoData;
    height?: number;
    locale?: string;
    colorLegendValue: string;
    position?: PositionType;
    responsive?: boolean | "autoPositionWithPopup";
    isFluidLegend?: boolean;
    numericSymbols?: string[];
    onItemClick?: (item: IPushpinCategoryLegendItem) => void;
    contentRect?: ContentRect;
    maxRows?: number;
    name?: string;
    renderPopUp?: boolean;
    containerId?: string;
}

/**
 * @internal
 */
export declare interface IGeoChartRendererProps extends WrappedComponentProps {
    config: IGeoConfig;
    drillableItems: IHeaderPredicate[];
    drillConfig: IDrillConfig;
    dataView: IDataView;
    geoData: IGeoData;
    colorStrategy: IColorStrategy;
    afterRender(): void;
    onCenterPositionChanged(center: IGeoLngLat): void;
    onZoomChanged(zoom: number): void;
    onError?: OnError;
}

/**
 * @public
 */
export declare interface IGeoConfig {
    center?: IGeoLngLat;
    isExportMode?: boolean;
    legend?: IGeoLegendConfig;
    limit?: number;
    selectedSegmentItems?: string[];
    tooltipText?: IAttribute;
    zoom?: number;
    mapboxToken: string;
    separators?: ISeparators;
    viewport?: IGeoConfigViewport;
    points?: IGeoPointsConfig;
    colors?: string[];
    colorPalette?: IColorPalette;
    colorMapping?: IColorMapping[];
    showLabels?: boolean;
    cooperativeGestures?: boolean;
}

/**
 * @public
 */
export declare interface IGeoConfigViewport {
    area?: IGeoConfigViewportArea;
    frozen?: boolean;
}

/**
 * @public
 */
export declare type IGeoConfigViewportArea = "auto" | "continent_af" | "continent_as" | "continent_au" | "continent_eu" | "continent_na" | "continent_sa" | "world";

/**
 * @public
 */
export declare interface IGeoData {
    location?: IGeoLocationItem;
    size?: IGeoMeasureItem;
    color?: IGeoMeasureItem;
    segment?: IGeoSegmentItem;
    tooltipText?: IGeoAttributeItem;
}

/**
 * @public
 */
export declare interface IGeoDataItem {
    name: string;
    index: number;
}

/**
 * @public
 */
export declare interface IGeoLegendConfig {
    /**
     * Indicates whether legend should be rendered or not.
     */
    enabled?: boolean;
    /**
     * Where, relative to the chart, should the legend appear.
     */
    position?: PositionType;
    /**
     * Turns on responsive behavior.
     *
     * @remarks
     * Legend items will be rendered horizontally on screens smaller than 767px.
     * For the popup legend must be a flag set to `autoPositionWithPopup`
     */
    responsive?: boolean | "autoPositionWithPopup";
}

/**
 * @public
 */
export declare interface IGeoLngLat {
    lat: number;
    lng: number;
}

/**
 * @public
 */
export declare interface IGeoLocationItem extends IGeoDataItem {
    data: IGeoLngLat[];
}

/**
 * @public
 */
export declare interface IGeoMeasureItem extends IGeoDataItem {
    format: string;
    data: number[];
}

/**
 * @public
 */
export declare interface IGeoPointsConfig {
    minSize?: PushpinSizeOption;
    maxSize?: PushpinSizeOption;
    groupNearbyPoints?: boolean;
}

/**
 * @public
 */
export declare interface IGeoPushpinChartBaseProps extends IVisualizationProps, IVisualizationCallbacks {
    /**
     * Analytical backend, from which the chart will obtain data to visualize
     *
     * @remarks
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the chart will obtain data to visualize.
     *
     * @remarks
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;
    size?: AttributeMeasureOrPlaceholder;
    color?: AttributeMeasureOrPlaceholder;
    segmentBy?: AttributeOrPlaceholder;
    filters?: NullableFiltersOrPlaceholders;
    sortBy?: SortsOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
    config?: IGeoConfig;
    /**
     * Execution configuration, will provide the execution with necessary config before initiating execution.
     */
    execConfig?: IExecutionConfig;
    /**
     * Specify function to call back when center position of the map changes.
     */
    onCenterPositionChanged?: CenterPositionChangedCallback;
    /**
     * Specify function to call back when map zoom changes.
     */
    onZoomChanged?: ZoomChangedCallback;
}

/**
 * @public
 */
export declare interface IGeoPushpinChartLatitudeLongitudeProps extends IGeoPushpinChartBaseProps {
    /**
     * The attribute definition or placeholder that determines the latitude of the pins.
     * Values expected in string format representing coordinate.
     */
    latitude: AttributeOrPlaceholder;
    /**
     * The attribute definition or placeholder that determines the longitude of the pins.
     * Values expected in string format representing coordinate.
     */
    longitude: AttributeOrPlaceholder;
}

/**
 * @public
 */
export declare interface IGeoPushpinChartProps extends IGeoPushpinChartBaseProps {
    /**
     * The attribute definition or placeholder that determines the longitude and latitude of the pins.
     * Values expected in format lat;long.
     */
    location: AttributeOrPlaceholder;
}

/**
 * @public
 */
export declare interface IGeoSegmentItem extends IGeoAttributeItem {
    uris: string[];
}

/**
 * @alpha
 */
export declare const MapboxTokenProvider: React_2.FC<{
    token: string;
    children?: React_2.ReactNode;
}>;

/**
 * @public
 */
export declare type PushpinSizeOption = "0.5x" | "0.75x" | "normal" | "1.25x" | "1.5x" | "default";

/**
 * @alpha
 */
export declare function useMapboxToken(mapboxToken?: string): string | undefined;

/**
 * @alpha
 */
export declare function useMapboxTokenStrict(mapboxToken?: string): string;

/**
 * @internal
 */
export declare function withMapboxToken<T extends {
    config?: IGeoConfig;
}>(InnerComponent: React_2.ComponentType<T>): React_2.ComponentType<T>;

/**
 * @public
 */
export declare type ZoomChangedCallback = (zoom: number) => void;

export { }
