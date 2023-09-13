import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IGeoConfig, IGeoData, IGeoLngLat } from "../../GeoChart.js";
import { IGeoChartRendererProps } from "./GeoChartRenderer.js";
import { IGeoChartLegendRendererProps } from "./GeoChartLegendRenderer.js";
import { IColorAssignment, ILoadingInjectedProps, IDataVisualizationProps } from "@gooddata/sdk-ui";
import { IColorStrategy, IPushpinCategoryLegendItem } from "@gooddata/sdk-ui-vis-commons";
import { IColorPalette, ITheme } from "@gooddata/sdk-model";
export { IGeoChartRendererProps, IGeoChartLegendRendererProps };
/**
 * @internal
 */
export interface ICoreGeoChartProps extends IDataVisualizationProps {
    config?: IGeoConfig;
    height?: number;
    documentObj?: Document;
    chartRenderer?: (props: IGeoChartRendererProps) => React.ReactElement;
    legendRenderer?: (props: IGeoChartLegendRendererProps) => React.ReactElement;
    onCenterPositionChanged?: (center: IGeoLngLat) => void;
    onZoomChanged?: (zoom: number) => void;
    geoChartOptions?: IGeoChartInnerOptions;
    theme?: ITheme;
}
/**
 * @internal
 */
export type IGeoChartInnerProps = ICoreGeoChartProps & ILoadingInjectedProps & WrappedComponentProps;
export interface IGeoChartInnerState {
    enabledLegendItems: boolean[];
    showFluidLegend: boolean;
    colorAssignmentItem: IColorAssignment[];
}
/**
 * @internal
 */
export interface IGeoChartInnerOptions {
    geoData: IGeoData;
    categoryItems: IPushpinCategoryLegendItem[];
    colorStrategy: IColorStrategy;
    colorPalette: IColorPalette;
}
/**
 * Geo Chart react component
 */
export declare class GeoChartInner extends React.PureComponent<IGeoChartInnerProps, IGeoChartInnerState> {
    static getDerivedStateFromProps(nextProps: IGeoChartInnerProps, prevState: IGeoChartInnerState): Partial<IGeoChartInnerState> | null;
    private readonly throttledOnWindowResize;
    private readonly containerId;
    constructor(props: IGeoChartInnerProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement;
    private renderVisualizationContent;
    private syncWithLegendItemStates;
    private getContainerClassName;
    private getFlexDirection;
    private isFluidLegend;
    private onLegendItemClick;
    private getLegendPosition;
    private getLegendDetails;
    private getLegendProps;
    private getChartProps;
    private renderChart;
    private renderLegend;
    private onWindowResize;
    private updateConfigurationPanel;
}
//# sourceMappingURL=GeoChartInner.d.ts.map