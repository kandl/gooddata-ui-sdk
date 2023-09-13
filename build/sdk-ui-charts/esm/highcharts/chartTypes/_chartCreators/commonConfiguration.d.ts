import { IDrillConfig, ChartType } from "@gooddata/sdk-ui";
import { IChartOptions } from "../../typings/unsafe.js";
import { ITheme } from "@gooddata/sdk-model";
export declare const DEFAULT_SERIES_LIMIT = 1000;
export declare const DEFAULT_CATEGORIES_LIMIT = 3000;
export declare const DEFAULT_DATA_POINTS_LIMIT = 2000;
export declare const MAX_POINT_WIDTH = 100;
export declare const HOVER_BRIGHTNESS = 0.1;
export declare const MINIMUM_HC_SAFE_BRIGHTNESS: number;
export declare function handleChartLoad(chartType: ChartType): () => void;
export declare function getCommonConfiguration(chartOptions: IChartOptions, drillConfig: IDrillConfig, theme?: ITheme): any;
//# sourceMappingURL=commonConfiguration.d.ts.map