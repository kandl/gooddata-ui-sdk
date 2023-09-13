import { IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
import { IPointData } from "../../typings/unsafe.js";
export declare function getColorOrLegendIndex(yValue: number, isTotal?: boolean): 0 | 1 | 2;
export declare function getWaterfallChartSeries(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], viewByAttribute: IUnwrappedAttributeHeadersWithItems, colorStrategy: IColorStrategy, emptyHeaderTitle: string): {
    upColor: string;
    color: string;
    legendIndex: number;
    data: IPointData[];
    seriesIndex: number;
    name: string;
    connectNulls: boolean;
}[];
//# sourceMappingURL=waterfallChartsSeries.d.ts.map