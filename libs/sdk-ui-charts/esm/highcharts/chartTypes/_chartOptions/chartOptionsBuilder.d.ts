import { IDataView } from "@gooddata/sdk-backend-spi";
import { ITheme } from "@gooddata/sdk-model";
import { DataViewFacade, IHeaderPredicate } from "@gooddata/sdk-ui";
import { IChartConfig } from "../../../interfaces/index.js";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
import Highcharts from "../../lib/index.js";
import { IChartOptions } from "../../typings/unsafe.js";
export declare const HEAT_MAP_CATEGORIES_COUNT = 7;
export declare const HIGHCHARTS_PRECISION = 15;
export declare const DEFAULT_HEATMAP_COLOR_INDEX = 1;
export declare function getHeatmapDataClasses(series: any, colorStrategy: IColorStrategy): Highcharts.ColorAxisDataClassesOptions[];
export declare function getDefaultTreemapAttributes(dv: DataViewFacade): ChartedAttributes;
export declare function getTreemapAttributes(dv: DataViewFacade): ChartedAttributes;
type ChartedAttributes = {
    viewByAttribute?: IUnwrappedAttributeHeadersWithItems;
    viewByParentAttribute?: IUnwrappedAttributeHeadersWithItems;
    stackByAttribute?: IUnwrappedAttributeHeadersWithItems;
    isViewByTwoAttributes?: boolean;
};
export declare function getChartOptions(dataView: IDataView, chartConfig: IChartConfig, drillableItems: IHeaderPredicate[], emptyHeaderTitle: string, theme?: ITheme, totalColumnTitle?: string): IChartOptions;
export {};
//# sourceMappingURL=chartOptionsBuilder.d.ts.map