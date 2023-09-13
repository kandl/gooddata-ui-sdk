import { IntlShape } from "react-intl";
import { IChartOptions } from "../typings/unsafe.js";
import { LegendOptionsItemType, ILegendOptions } from "@gooddata/sdk-ui-vis-commons";
export declare function shouldLegendBeEnabled(chartOptions: IChartOptions): boolean;
export declare function getLegendItems(chartOptions: IChartOptions, intl?: IntlShape): LegendOptionsItemType[];
export default function buildLegendOptions(legendConfig: any, chartOptions: IChartOptions, intl?: IntlShape): ILegendOptions;
//# sourceMappingURL=legendBuilder.d.ts.map