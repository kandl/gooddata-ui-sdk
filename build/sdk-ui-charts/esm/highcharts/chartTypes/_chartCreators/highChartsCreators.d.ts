import { IDrillConfig } from "@gooddata/sdk-ui";
import { IChartLimits, IChartConfig } from "../../../interfaces/index.js";
import { IExecutionDefinition, ITheme } from "@gooddata/sdk-model";
import { IChartOptions } from "../../typings/unsafe.js";
import { IntlShape } from "react-intl";
import { HighchartsOptions } from "../../lib/index.js";
export declare function getHighchartsOptions(chartOptions: IChartOptions, drillConfig: IDrillConfig, config?: IChartConfig, definition?: IExecutionDefinition, intl?: IntlShape, theme?: ITheme): HighchartsOptions;
export declare function isDataOfReasonableSize(chartData: any, limits: IChartLimits, isViewByTwoAttributes?: boolean): boolean;
//# sourceMappingURL=highChartsCreators.d.ts.map