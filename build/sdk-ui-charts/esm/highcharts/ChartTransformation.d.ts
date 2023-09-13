import { IDataView } from "@gooddata/sdk-backend-spi";
import { ITheme } from "@gooddata/sdk-model";
import React from "react";
import { OnFiredDrillEvent, ExplicitDrill } from "@gooddata/sdk-ui";
import { IChartConfig, OnLegendReady } from "../interfaces/index.js";
import { IHighChartsRendererProps } from "./adapter/HighChartsRenderer.js";
import { WrappedComponentProps } from "react-intl";
export declare function renderHighCharts(props: IHighChartsRendererProps): JSX.Element;
/**
 * @internal
 */
export interface IChartTransformationProps extends WrappedComponentProps {
    height: number;
    width: number;
    config: IChartConfig;
    drillableItems: ExplicitDrill[];
    locale: string;
    dataView: IDataView;
    onDrill: OnFiredDrillEvent;
    onLegendReady: OnLegendReady;
    afterRender(): void;
    onDataTooLarge(chartOptions: any, errorMessage?: string): void;
    onNegativeValues(chartOptions: any): void;
    numericSymbols?: string[];
    theme?: ITheme;
    pushData?(data: any): void;
    renderer?(arg: IHighChartsRendererProps): JSX.Element;
}
export declare const ChartTransformation: React.NamedExoticComponent<import("react-intl").WithIntlProps<Omit<IChartTransformationProps, "theme" | "themeIsLoading">>>;
//# sourceMappingURL=ChartTransformation.d.ts.map