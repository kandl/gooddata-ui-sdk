import React from "react";
import { ICoreChartProps, OnLegendReady } from "../../interfaces/index.js";
import { ChartType } from "@gooddata/sdk-ui";
import { ITheme } from "@gooddata/sdk-model";
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disappear.
 *
 * @internal
 */
export interface IBaseChartProps extends ICoreChartProps {
    type: ChartType;
    onLegendReady?: OnLegendReady;
    theme?: ITheme;
}
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disappear.
 *
 * @internal
 */
export declare const BaseChart: React.ComponentClass<IBaseChartProps, any>;
//# sourceMappingURL=BaseChart.d.ts.map