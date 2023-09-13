import { IPointData } from "../../typings/unsafe.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { ITheme, IMeasureGroupDescriptor } from "@gooddata/sdk-model";
export declare function getHeatmapSeries(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], theme?: ITheme): {
    name: string;
    data: IPointData[];
    turboThreshold: number;
    yAxis: number;
    dataLabels: {
        formatGD: any;
    };
    legendIndex: number;
    seriesIndex: number;
}[];
//# sourceMappingURL=heatmapChartSeries.d.ts.map