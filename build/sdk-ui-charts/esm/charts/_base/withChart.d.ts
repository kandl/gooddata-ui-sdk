import React from "react";
import { IChartDefinition } from "../_commons/chartDefinition.js";
import { IBucketChartProps, ICoreChartProps } from "../../interfaces/index.js";
/**
 * Common hoc for shared logic between all charts, injects contexts and transforms incoming props to BaseChart props according to chart definition
 * @internal
 */
export declare const withChart: <TBucketProps extends object, TProps extends TBucketProps & IBucketChartProps>(chartDefinition: IChartDefinition<TBucketProps, TProps>) => (Chart: React.ComponentType<ICoreChartProps>) => React.ComponentType<TProps>;
//# sourceMappingURL=withChart.d.ts.map