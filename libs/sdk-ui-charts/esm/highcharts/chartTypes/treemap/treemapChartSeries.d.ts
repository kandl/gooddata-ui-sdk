import { DataViewFacade } from "@gooddata/sdk-ui";
import { IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export declare function getTreemapStackedSeriesDataWithViewBy(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], viewByAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, colorStrategy: IColorStrategy, emptyHeaderTitle: string): any[];
export declare function getTreemapStackedSeriesDataWithMeasures(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], stackByAttribute: any, colorStrategy: IColorStrategy, emptyHeaderTitle: string): any[];
export declare function getTreemapStackedSeries(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], viewByAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, colorStrategy: IColorStrategy, emptyHeaderTitle: string): {
    name: string;
    legendType: string;
    showInLegend: boolean;
    data: any[];
    turboThreshold: number;
    seriesIndex: number;
}[];
//# sourceMappingURL=treemapChartSeries.d.ts.map