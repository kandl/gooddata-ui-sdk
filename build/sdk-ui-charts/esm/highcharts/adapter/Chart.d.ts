import React from "react";
import Highcharts, { HighchartsOptions } from "../lib/index.js";
import defaultHighchartsMore from "highcharts/highcharts-more.js";
import defaultDrillmodule from "highcharts/modules/drilldown.js";
import defaultTreemapModule from "highcharts/modules/treemap.js";
import defaultBulletModule from "highcharts/modules/bullet.js";
import defaultFunnelModule from "highcharts/modules/funnel.js";
import defaultHeatmap from "highcharts/modules/heatmap.js";
import defaultPatternFill from "highcharts/modules/pattern-fill.js";
import defaultSankeyModule from "highcharts/modules/sankey.js";
import defaultDependencyWheelModule from "highcharts/modules/dependency-wheel.js";
export declare const drillmodule: typeof defaultDrillmodule.factory;
export declare const treemapModule: typeof defaultTreemapModule.factory;
export declare const bulletModule: typeof defaultBulletModule.factory;
export declare const funnelModule: typeof defaultFunnelModule.factory;
export declare const sankeyModule: typeof defaultSankeyModule.factory;
export declare const dependencyWheelModule: typeof defaultDependencyWheelModule.factory;
export declare const heatmap: typeof defaultHeatmap.factory;
export declare const HighchartsMore: typeof defaultHighchartsMore.factory;
export declare const patternFill: typeof defaultPatternFill.factory;
/**
 * @internal
 */
export interface IChartProps {
    config: HighchartsOptions;
    domProps: any;
    callback(): void;
}
/**
 * @internal
 */
export declare class Chart extends React.Component<IChartProps> {
    static defaultProps: Pick<IChartProps, "callback" | "domProps">;
    private chart;
    private chartRef;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IChartProps): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getHighchartRef(): HTMLElement;
    setChartRef: (ref: HTMLElement) => void;
    getChart(): Highcharts.Chart;
    createChart(config: HighchartsOptions): void;
    render(): JSX.Element;
}
//# sourceMappingURL=Chart.d.ts.map