import { IChartConfig } from "../../../interfaces/index.js";
import { IChartOptions } from "../../typings/unsafe.js";
import { HighchartsOptions } from "../../lib/index.js";
import { SeriesAreaOptions } from "highcharts";
export declare function getContinuousLineConfiguration(chartOptions: IChartOptions, config: HighchartsOptions, chartConfig?: IChartConfig): {
    plotOptions?: undefined;
    series?: undefined;
} | {
    plotOptions: {
        series: {
            connectNulls: true;
        };
    };
    series: SeriesAreaOptions[];
};
//# sourceMappingURL=getContinuousLineConfiguration.d.ts.map