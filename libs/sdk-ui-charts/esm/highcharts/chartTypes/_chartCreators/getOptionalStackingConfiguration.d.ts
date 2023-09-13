import { IChartConfig } from "../../../interfaces/index.js";
import { IDrillConfig } from "@gooddata/sdk-ui";
import { IChartOptions, ISeriesItem, IStackMeasuresConfig, IYAxisConfig } from "../../typings/unsafe.js";
import { HighchartsOptions, XAxisOptions } from "../../lib/index.js";
/**
 * For y axis having one series, this series should be removed stacking config
 */
export declare function getSanitizedStackingForSeries(series: ISeriesItem[]): ISeriesItem[];
export declare function getYAxisConfiguration(chartOptions: IChartOptions, config: HighchartsOptions, chartConfig: IChartConfig): IYAxisConfig;
/**
 * Set config to highchart for 'Stack Measures' and 'Stack to 100%'
 */
export declare function getStackMeasuresConfiguration(chartOptions: IChartOptions, config: HighchartsOptions, chartConfig: IChartConfig): IStackMeasuresConfig;
/**
 * Add style to X axis in case of 'grouped-categories'
 */
export declare function getParentAttributeConfiguration(chartOptions: IChartOptions, config: HighchartsOptions, chartConfig?: IChartConfig): {
    xAxis: XAxisOptions[];
};
export declare function setDrillConfigToXAxis(drillConfig: IDrillConfig): {
    xAxis: {
        drillConfig: IDrillConfig;
    }[];
};
/**
 * Format labels in Y axis from '0 - 100' to '0% - 100%'
 * Only applied when measure/series in Y axis more than one
 */
export declare function getShowInPercentConfiguration(chartOptions: IChartOptions, chartConfig: IChartConfig, _config?: HighchartsOptions): HighchartsOptions;
/**
 * Convert [0, 1] to [0, 100], it's needed by highchart
 * Only applied to primary Y axis
 */
export declare function convertMinMaxFromPercentToNumber(_chartOptions: IChartOptions, config: HighchartsOptions, chartConfig: IChartConfig): HighchartsOptions;
export default function getOptionalStackingConfiguration(chartOptions: IChartOptions, config: HighchartsOptions, chartConfig?: IChartConfig, drillConfig?: IDrillConfig): HighchartsOptions;
//# sourceMappingURL=getOptionalStackingConfiguration.d.ts.map