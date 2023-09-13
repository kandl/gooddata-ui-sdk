import { DataViewFacade } from "@gooddata/sdk-ui";
import { IChartConfig } from "../../../interfaces/index.js";
import { IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { IAxis, ISeriesItem } from "../../typings/unsafe.js";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
export declare function getXAxes(dv: DataViewFacade, config: IChartConfig, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], viewByAttribute: IUnwrappedAttributeHeadersWithItems, viewByParentAttribute: IUnwrappedAttributeHeadersWithItems): IAxis[];
export declare function getYAxes(dv: DataViewFacade, config: IChartConfig, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], stackByAttribute: IUnwrappedAttributeHeadersWithItems): IAxis[];
export declare function assignYAxes(series: ISeriesItem[], yAxes: IAxis[]): ISeriesItem[];
//# sourceMappingURL=chartAxes.d.ts.map