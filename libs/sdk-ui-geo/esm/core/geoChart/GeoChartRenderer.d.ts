import React from "react";
import { IGeoConfig, IGeoData, IGeoLngLat } from "../../GeoChart.js";
import { IDrillConfig, IHeaderPredicate, OnError } from "@gooddata/sdk-ui";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
import { IDataView } from "@gooddata/sdk-backend-spi";
import { WrappedComponentProps } from "react-intl";
/**
 * @internal
 */
export interface IGeoChartRendererProps extends WrappedComponentProps {
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
declare class GeoChartRenderer extends React.Component<IGeoChartRendererProps> {
    static defaultProps: Pick<IGeoChartRendererProps, "config" | "afterRender" | "onZoomChanged" | "onCenterPositionChanged">;
    private chart;
    private tooltip;
    private navigationControlButton;
    private chartRef;
    constructor(props: IGeoChartRendererProps);
    componentDidUpdate(prevProps: IGeoChartRendererProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setChartRef: (ref: HTMLElement | null) => void;
    private fullMapInit;
    private generateLocale;
    createMap: () => void;
    render(): JSX.Element;
    private updateMapWithConfig;
    private resetMap;
    private shouldResetMap;
    private isViewportFrozen;
    private createMapControls;
    private removeMapControls;
    private addMapControls;
    private toggleMapControls;
    private toggleInteractionEvents;
    private updatePanAndZoom;
    private updateViewport;
    private setFilterMap;
    private handleMapEvent;
    private handleMapIdle;
    private setupMap;
    private adjustChartHeight;
    private handleLayerLoaded;
    private createTooltip;
    private cleanupMap;
    private removeLayer;
    private removeMap;
    private handlePushpinMoveEnd;
    private handlePushpinZoomEnd;
    private handleMapboxError;
    private handleMapClick;
    private handlePushpinMouseEnter;
    private handlePushpinMouseLeave;
}
export default GeoChartRenderer;
//# sourceMappingURL=GeoChartRenderer.d.ts.map