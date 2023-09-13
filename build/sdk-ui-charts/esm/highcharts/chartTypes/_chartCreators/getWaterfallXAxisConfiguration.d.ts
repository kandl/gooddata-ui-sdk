import { IChartConfig } from "../../../interfaces/index.js";
import { HighchartsOptions } from "../../lib/index.js";
import { IChartOptions } from "../../typings/unsafe.js";
export declare function getWaterfallXAxisConfiguration(chartOptions: IChartOptions, _config: HighchartsOptions, chartConfig?: IChartConfig): {
    xAxis?: undefined;
} | {
    xAxis: {
        categories: string[][];
        type: string;
    }[];
};
//# sourceMappingURL=getWaterfallXAxisConfiguration.d.ts.map