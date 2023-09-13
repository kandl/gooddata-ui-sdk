import { ISeriesItemConfig } from "../../typings/unsafe.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export declare function getBubbleChartSeries(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], stackByAttribute: any, colorStrategy: IColorStrategy, emptyHeaderTitle: string): ISeriesItemConfig[];
//# sourceMappingURL=bubbleChartSeries.d.ts.map