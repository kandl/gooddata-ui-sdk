import { ITheme, IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
import { IPointData } from "../../typings/unsafe.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
export declare function getSeriesItemData(seriesItem: string[], seriesIndex: number, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], viewByAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, type: string, colorStrategy: IColorStrategy, emptyHeaderTitle: string): IPointData[];
export declare function getSeries(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], viewByAttribute: IUnwrappedAttributeHeadersWithItems, viewByParentAttribute: IUnwrappedAttributeHeadersWithItems, stackByAttribute: IUnwrappedAttributeHeadersWithItems, type: string, colorStrategy: IColorStrategy, emptyHeaderTitle: string, theme?: ITheme): any;
//# sourceMappingURL=chartSeries.d.ts.map