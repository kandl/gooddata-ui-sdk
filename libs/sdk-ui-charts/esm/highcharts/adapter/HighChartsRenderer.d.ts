import React from "react";
import { ContentRect } from "react-measure";
import { OnLegendReady } from "../../interfaces/index.js";
import { IChartProps } from "./Chart.js";
import Highcharts, { HighchartsOptions } from "../lib/index.js";
import { ILegendProps, ILegendOptions, PositionType } from "@gooddata/sdk-ui-vis-commons";
import { ITheme } from "@gooddata/sdk-model";
import { IChartOptions } from "../typings/unsafe.js";
/**
 * @internal
 */
export declare const FLUID_LEGEND_THRESHOLD = 768;
export interface IChartHTMLElement extends HTMLElement {
    getChart(): Highcharts.Chart;
    getHighchartRef(): HTMLElement;
}
/**
 * @internal
 */
export interface IHighChartsRendererProps {
    chartOptions: IChartOptions;
    hcOptions: HighchartsOptions;
    documentObj?: Document;
    height: number;
    width: number;
    legend: ILegendOptions;
    locale: string;
    theme?: ITheme;
    onLegendReady: OnLegendReady;
    legendRenderer(legendProps: ILegendProps): any;
    chartRenderer(chartProps: IChartProps): any;
    afterRender(): void;
    resetZoomButtonTooltip?: string;
    contentRect?: ContentRect;
}
export interface IHighChartsRendererState {
    legendItemsEnabled: boolean[];
    showFluidLegend: boolean;
}
export interface ILegendDetails {
    name?: string;
    position: PositionType;
    maxRows?: number;
    renderPopUp?: boolean;
}
export declare function renderChart(props: IChartProps): JSX.Element;
export declare function renderLegend(props: ILegendProps): JSX.Element;
export declare class HighChartsRenderer extends React.PureComponent<IHighChartsRendererProps, IHighChartsRendererState> {
    static defaultProps: {
        afterRender: (...args: any[]) => void;
        height: number;
        legend: {
            enabled: boolean;
            responsive: boolean;
            position: string;
        };
        chartRenderer: typeof renderChart;
        legendRenderer: typeof renderLegend;
        onLegendReady: (...args: any[]) => void;
        documentObj: Document;
    };
    private highchartsRendererRef;
    private chartRef;
    private containerId;
    constructor(props: IHighChartsRendererProps);
    onWindowResize: () => void;
    private throttledOnWindowResize;
    shouldShowFluid(): boolean;
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IHighChartsRendererProps): void;
    onLegendItemClick: (item: any) => void;
    setChartRef: (chartRef: IChartHTMLElement) => void;
    getFlexDirection(position: string): React.CSSProperties["flexDirection"];
    getItems(items: any[]): any[];
    resetLegendState(props: IHighChartsRendererProps): void;
    private onChartSelection;
    private skipLeadingZeros;
    private createChartConfig;
    renderLegend(legendDetails: ILegendDetails, contentRect: ContentRect, containerId: string): React.ReactNode;
    renderHighcharts(): React.ReactNode;
    private onZoomOutButtonClick;
    private renderZoomOutButton;
    private renderVisualization;
    render(): JSX.Element;
    private realignPieOrDonutChart;
}
//# sourceMappingURL=HighChartsRenderer.d.ts.map