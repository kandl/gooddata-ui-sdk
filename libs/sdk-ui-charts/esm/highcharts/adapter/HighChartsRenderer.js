// (C) 2007-2023 GoodData Corporation
import React from "react";
import { v4 } from "uuid";
import set from "lodash/set.js";
import isEqual from "lodash/isEqual.js";
import noop from "lodash/noop.js";
import partial from "lodash/partial.js";
import throttle from "lodash/throttle.js";
import isNil from "lodash/isNil.js";
import cx from "classnames";
import { Chart } from "./Chart.js";
import { isFunnel, isPieOrDonutChart, isOneOfTypes, isHeatmap, isSankeyOrDependencyWheel, isWaterfall, } from "../chartTypes/_util/common.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { alignChart } from "../chartTypes/_chartCreators/helpers.js";
import { Legend, getLegendDetails, } from "@gooddata/sdk-ui-vis-commons";
import { Bubble, BubbleHoverTrigger, Icon } from "@gooddata/sdk-ui-kit";
import { BOTTOM, LEFT, RIGHT, TOP } from "../typings/mess.js";
/**
 * @internal
 */
export const FLUID_LEGEND_THRESHOLD = 768;
export function renderChart(props) {
    return React.createElement(Chart, Object.assign({}, props));
}
export function renderLegend(props) {
    return React.createElement(Legend, Object.assign({}, props));
}
class HighChartsRenderer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.highchartsRendererRef = React.createRef(); // whole component = legend + chart
        this.containerId = `visualization-${v4()}`;
        this.onWindowResize = () => {
            this.setState({
                showFluidLegend: this.shouldShowFluid(),
            });
            this.realignPieOrDonutChart();
        };
        this.throttledOnWindowResize = throttle(this.onWindowResize, 100);
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.onLegendItemClick = (item) => {
            this.setState({
                legendItemsEnabled: set([...this.state.legendItemsEnabled], item.legendIndex, !this.state.legendItemsEnabled[item.legendIndex]),
            });
        };
        this.setChartRef = (chartRef) => {
            this.chartRef = chartRef;
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.onChartSelection = (event) => {
            const chartWrapper = event.target.renderTo.parentElement;
            const resetZoomButton = chartWrapper.closest(".visualization").querySelector(".viz-zoom-out");
            if (event.resetSelection) {
                resetZoomButton.style.display = "none";
            }
            else {
                resetZoomButton.style.display = "grid";
            }
            return undefined;
        };
        this.onZoomOutButtonClick = () => {
            this.chartRef.getChart().zoomOut();
        };
        this.state = {
            legendItemsEnabled: [],
            showFluidLegend: this.shouldShowFluid(),
        };
    }
    shouldShowFluid() {
        const { documentObj, legend } = this.props;
        return (documentObj.documentElement.clientWidth < FLUID_LEGEND_THRESHOLD &&
            (legend === null || legend === void 0 ? void 0 : legend.responsive) !== "autoPositionWithPopup");
    }
    UNSAFE_componentWillMount() {
        this.resetLegendState(this.props);
    }
    componentDidMount() {
        // http://stackoverflow.com/questions/18240254/highcharts-width-exceeds-container-div-on-first-load
        setTimeout(() => {
            var _a;
            if (this.chartRef) {
                const chart = this.chartRef.getChart();
                if ((_a = chart.container) === null || _a === void 0 ? void 0 : _a.style) {
                    chart.container.style.height = (this.props.height && String(this.props.height)) || "100%";
                    chart.container.style.position = this.props.height ? "relative" : "absolute";
                    chart.reflow();
                }
            }
        }, 0);
        this.props.onLegendReady({
            legendItems: this.getItems(this.props.legend.items),
        });
        window.addEventListener("resize", this.throttledOnWindowResize);
    }
    componentWillUnmount() {
        this.throttledOnWindowResize.cancel();
        window.removeEventListener("resize", this.throttledOnWindowResize);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a, _b, _c, _d;
        const thisLegendItems = (_b = (_a = this.props.legend) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
        const nextLegendItems = (_d = (_c = nextProps.legend) === null || _c === void 0 ? void 0 : _c.items) !== null && _d !== void 0 ? _d : [];
        const hasLegendChanged = !isEqual(thisLegendItems, nextLegendItems);
        if (hasLegendChanged) {
            this.resetLegendState(nextProps);
        }
        if (!isEqual(this.props.legend.items, nextProps.legend.items)) {
            this.props.onLegendReady({
                legendItems: this.getItems(nextProps.legend.items),
            });
        }
    }
    getFlexDirection(position) {
        if (position === TOP || position === BOTTOM) {
            return "column";
        }
        return "row";
    }
    getItems(items) {
        return items.map((i) => {
            return {
                name: i.name,
                color: i.color,
                onClick: partial(this.onLegendItemClick, i),
            };
        });
    }
    resetLegendState(props) {
        var _a, _b, _c;
        const legendItemsCount = (_c = (_b = (_a = props.legend) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        this.setState({
            legendItemsEnabled: new Array(legendItemsCount).fill(true),
        });
    }
    skipLeadingZeros(values) {
        var _a;
        const result = [...values];
        while (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.y) === 0) {
            result.shift();
        }
        return result;
    }
    createChartConfig(chartConfig, legendItemsEnabled) {
        var _a, _b;
        const { series, chart, xAxis, yAxis } = chartConfig;
        const selectionEvent = chart.zoomType
            ? {
                selection: this.onChartSelection,
            }
            : {};
        const firstSeriesTypes = [
            VisualizationTypes.PIE,
            VisualizationTypes.DONUT,
            VisualizationTypes.TREEMAP,
            VisualizationTypes.FUNNEL,
            VisualizationTypes.PYRAMID,
        ];
        const multipleSeries = isOneOfTypes(chart.type, firstSeriesTypes);
        let items = isOneOfTypes(chart.type, firstSeriesTypes) ? (_a = series === null || series === void 0 ? void 0 : series[0]) === null || _a === void 0 ? void 0 : _a.data : series;
        if (isFunnel(chart.type)) {
            items = this.skipLeadingZeros(items).filter((i) => !isNil(i.y));
        }
        const updatedItems = items.map((item, itemIndex) => {
            const visible = legendItemsEnabled[itemIndex] !== undefined ? legendItemsEnabled[itemIndex] : true;
            return Object.assign(Object.assign({}, item), { visible: isNil(item.visible) ? visible : item.visible });
        });
        let updatedSeries = updatedItems;
        if (multipleSeries) {
            updatedSeries = [
                Object.assign(Object.assign({}, series === null || series === void 0 ? void 0 : series[0]), { data: updatedItems }),
                ...series.slice(1),
            ];
        }
        return Object.assign(Object.assign({}, chartConfig), { chart: Object.assign(Object.assign({}, chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.chart), { events: Object.assign(Object.assign({}, (_b = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.chart) === null || _b === void 0 ? void 0 : _b.events), selectionEvent) }), series: updatedSeries, yAxis: yAxis.map((ax) => {
                var _a;
                return (Object.assign(Object.assign({}, ax), { title: Object.assign(Object.assign({}, ax === null || ax === void 0 ? void 0 : ax.title), { style: Object.assign(Object.assign({}, (_a = ax === null || ax === void 0 ? void 0 : ax.title) === null || _a === void 0 ? void 0 : _a.style), { textOverflow: "ellipsis", overflow: "hidden" }) }) }));
            }), 
            // perform a shallow copy of axis
            // (otherwise there's a highcharts internal error on smallest responsive charts)
            xAxis: xAxis.map((ax) => (Object.assign({}, ax))) });
    }
    renderLegend(legendDetails, contentRect, containerId) {
        const { chartOptions, legend, height, legendRenderer, locale } = this.props;
        const { items, format } = legend;
        const { showFluidLegend } = this.state;
        if (!legend.enabled) {
            return null;
        }
        let { type } = chartOptions;
        if (isPieOrDonutChart(type)) {
            type = VisualizationTypes.PIE;
        }
        const onItemClick = isSankeyOrDependencyWheel(type) || isWaterfall(type) ? noop : this.onLegendItemClick;
        const legendProps = {
            responsive: legend.responsive,
            enableBorderRadius: legend.enableBorderRadius,
            seriesMapper: legend.seriesMapper,
            series: items,
            onItemClick,
            legendItemsEnabled: this.state.legendItemsEnabled,
            heatmapLegend: isHeatmap(type),
            height,
            legendLabel: legendDetails === null || legendDetails === void 0 ? void 0 : legendDetails.name,
            maximumRows: legendDetails === null || legendDetails === void 0 ? void 0 : legendDetails.maxRows,
            position: legendDetails.position,
            format,
            locale,
            showFluidLegend,
            validateOverHeight: noop,
            contentDimensions: contentRect === null || contentRect === void 0 ? void 0 : contentRect.client,
            containerId,
        };
        return legendRenderer(legendProps);
    }
    renderHighcharts() {
        // shrink chart to give space to legend items
        const style = { flex: "1 1 auto", position: "relative", overflow: "hidden" };
        const config = this.createChartConfig(this.props.hcOptions, this.state.legendItemsEnabled);
        const chartProps = {
            domProps: { className: "viz-react-highchart-wrap gd-viz-highchart-wrap", style },
            ref: this.setChartRef,
            config,
            callback: this.props.afterRender,
        };
        return this.props.chartRenderer(chartProps);
    }
    renderZoomOutButton() {
        var _a, _b;
        const { hcOptions: { chart }, theme, resetZoomButtonTooltip, } = this.props;
        if (chart === null || chart === void 0 ? void 0 : chart.zoomType) {
            return (React.createElement(BubbleHoverTrigger, { tagName: "abbr", hideDelay: 100, showDelay: 100, className: "gd-bubble-trigger-zoom-out" },
                React.createElement("button", { className: "viz-zoom-out s-zoom-out", onClick: this.onZoomOutButtonClick, style: { display: "none" } },
                    React.createElement(Icon.Undo, { width: 20, height: 20, color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c7 })),
                React.createElement(Bubble, { alignPoints: [{ align: "cr cl" }, { align: "cl cr" }] }, resetZoomButtonTooltip)));
        }
        return null;
    }
    renderVisualization() {
        const { legend, chartOptions, contentRect } = this.props;
        const legendDetailOptions = {
            showFluidLegend: this.state.showFluidLegend,
            contentRect,
            isHeatmap: isHeatmap(chartOptions.type),
            legendLabel: chartOptions.legendLabel,
        };
        const legendDetails = getLegendDetails(legend.position, legend.responsive, legendDetailOptions);
        if (!legendDetails) {
            return null;
        }
        const classes = cx("viz-line-family-chart-wrap", "s-viz-line-family-chart-wrap", legend.responsive === true ? "responsive-legend" : "non-responsive-legend", {
            [`flex-direction-${this.getFlexDirection(legendDetails.position)}`]: true,
            "legend-position-bottom": legendDetails.position === BOTTOM,
        }, this.containerId);
        const legendPosition = legendDetails.position;
        const isLegendRenderedFirst = legendPosition === TOP || legendPosition === LEFT || this.state.showFluidLegend;
        return (React.createElement("div", { className: classes, ref: this.highchartsRendererRef },
            this.renderZoomOutButton(),
            isLegendRenderedFirst
                ? this.renderLegend(legendDetails, contentRect, this.containerId)
                : null,
            this.renderHighcharts(),
            !isLegendRenderedFirst
                ? this.renderLegend(legendDetails, contentRect, this.containerId)
                : null));
    }
    render() {
        return this.renderVisualization();
    }
    realignPieOrDonutChart() {
        const { chartOptions: { type, verticalAlign }, } = this.props;
        const { chartRef } = this;
        if (isPieOrDonutChart(type) && chartRef) {
            alignChart(chartRef.getChart(), verticalAlign);
        }
    }
}
HighChartsRenderer.defaultProps = {
    afterRender: noop,
    height: null,
    legend: {
        enabled: true,
        responsive: false,
        position: RIGHT,
    },
    chartRenderer: renderChart,
    legendRenderer: renderLegend,
    onLegendReady: noop,
    documentObj: document,
};
export { HighChartsRenderer };
//# sourceMappingURL=HighChartsRenderer.js.map