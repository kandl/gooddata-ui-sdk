// (C) 2007-2023 GoodData Corporation
import isEqual from "lodash/isEqual.js";
import noop from "lodash/noop.js";
import React from "react";
import { initChartPlugins } from "./chartPlugins.js";
import Highcharts from "../lib/index.js";
import { defaultImport } from "default-import";
import defaultHighchartsMore from "highcharts/highcharts-more.js";
import defaultDrillmodule from "highcharts/modules/drilldown.js";
import defaultTreemapModule from "highcharts/modules/treemap.js";
import defaultBulletModule from "highcharts/modules/bullet.js";
import defaultFunnelModule from "highcharts/modules/funnel.js";
import defaultHeatmap from "highcharts/modules/heatmap.js";
import defaultPatternFill from "highcharts/modules/pattern-fill.js";
import defaultSankeyModule from "highcharts/modules/sankey.js";
import defaultDependencyWheelModule from "highcharts/modules/dependency-wheel.js";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
export const drillmodule = defaultImport(defaultDrillmodule);
export const treemapModule = defaultImport(defaultTreemapModule);
export const bulletModule = defaultImport(defaultBulletModule);
export const funnelModule = defaultImport(defaultFunnelModule);
export const sankeyModule = defaultImport(defaultSankeyModule);
export const dependencyWheelModule = defaultImport(defaultDependencyWheelModule);
export const heatmap = defaultImport(defaultHeatmap);
export const HighchartsMore = defaultImport(defaultHighchartsMore);
export const patternFill = defaultImport(defaultPatternFill);
drillmodule(Highcharts);
treemapModule(Highcharts);
bulletModule(Highcharts);
funnelModule(Highcharts);
sankeyModule(Highcharts);
dependencyWheelModule(Highcharts);
heatmap(Highcharts);
HighchartsMore(Highcharts);
patternFill(Highcharts);
initChartPlugins(Highcharts);
/**
 * @internal
 */
class Chart extends React.Component {
    constructor() {
        super(...arguments);
        this.setChartRef = (ref) => {
            this.chartRef = ref;
        };
    }
    componentDidMount() {
        this.createChart(this.props.config);
    }
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props.config, nextProps.config);
    }
    componentDidUpdate() {
        this.createChart(this.props.config);
    }
    componentWillUnmount() {
        this.chart.destroy();
    }
    getHighchartRef() {
        return this.chartRef;
    }
    getChart() {
        if (!this.chart) {
            throw new Error("getChart() should not be called before the component is mounted");
        }
        return this.chart;
    }
    createChart(config) {
        const chartConfig = config.chart;
        this.chart = new Highcharts.Chart(Object.assign(Object.assign({}, config), { chart: Object.assign(Object.assign({}, chartConfig), { renderTo: this.chartRef }) }), this.props.callback);
    }
    render() {
        return React.createElement("div", Object.assign({}, this.props.domProps, { ref: this.setChartRef }));
    }
}
Chart.defaultProps = {
    callback: noop,
    domProps: {},
};
export { Chart };
//# sourceMappingURL=Chart.js.map