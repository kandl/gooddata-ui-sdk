import { IChartConfig } from "../../../interfaces/index.js";
import { IUnsafeHighchartsTooltipPoint, ITooltipFactory } from "../../typings/unsafe.js";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
import { IMeasureDescriptor } from "@gooddata/sdk-model";
export declare function buildTooltipFactory(viewByAttribute: IUnwrappedAttributeHeadersWithItems, type: string, config?: IChartConfig, isDualAxis?: boolean, measure?: IMeasureDescriptor, stackByAttribute?: IUnwrappedAttributeHeadersWithItems): ITooltipFactory;
export declare function buildTooltipForTwoAttributesFactory(viewByAttribute: IUnwrappedAttributeHeadersWithItems, viewByParentAttribute: IUnwrappedAttributeHeadersWithItems, config?: IChartConfig, isDualAxis?: boolean, measure?: IMeasureDescriptor, stackByAttribute?: IUnwrappedAttributeHeadersWithItems): ITooltipFactory;
export declare function generateTooltipXYFn(measures: IMeasureDescriptor[], stackByAttribute: IUnwrappedAttributeHeadersWithItems, config?: IChartConfig): ITooltipFactory;
export declare function generateTooltipHeatmapFn(viewByAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, emptyHeaderTitle: string, config?: IChartConfig): ITooltipFactory;
export declare function buildTooltipTreemapFactory(viewByAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, emptyHeaderTitle: string, config?: IChartConfig): ITooltipFactory;
export declare function generateTooltipSankeyChartFn(viewByAttribute: IUnwrappedAttributeHeadersWithItems, viewByParentAttribute: IUnwrappedAttributeHeadersWithItems, measure: IMeasureDescriptor, config?: IChartConfig): ITooltipFactory;
export declare function getTooltipWaterfallChart(viewByAttribute: IUnwrappedAttributeHeadersWithItems, config?: IChartConfig): (point: IUnsafeHighchartsTooltipPoint, maxTooltipContentWidth: number, percentageValue?: number) => string;
export declare function getTooltipFactory(isViewByTwoAttributes: boolean, viewByAttribute: IUnwrappedAttributeHeadersWithItems, viewByParentAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, measure: IMeasureDescriptor, emptyHeaderTitle: string, config?: IChartConfig, isDualAxis?: boolean): ITooltipFactory;
//# sourceMappingURL=chartTooltips.d.ts.map