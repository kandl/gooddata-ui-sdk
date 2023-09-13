// (C) 2007-2023 GoodData Corporation
import invoke from "lodash/invoke.js";
import isEmpty from "lodash/isEmpty.js";
import set from "lodash/set.js";
import { styleVariables } from "./styles/variables.js";
import { isOneOfTypes } from "../_util/common.js";
import { chartClick } from "./drilldownEventing.js";
import { setupDrilldown } from "./setupDrilldownToParentAttribute.js";
import Highcharts from "../../lib/index.js";
import { supportedDualAxesChartTypes } from "../_chartOptions/chartCapabilities.js";
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const HIGHCHART_PLOT_LIMITED_RANGE = 1e5;
export const DEFAULT_SERIES_LIMIT = 1000;
export const DEFAULT_CATEGORIES_LIMIT = 3000;
export const DEFAULT_DATA_POINTS_LIMIT = 2000;
export const MAX_POINT_WIDTH = 100;
export const HOVER_BRIGHTNESS = 0.1;
export const MINIMUM_HC_SAFE_BRIGHTNESS = Number.MIN_VALUE;
function handleTooltipOffScreen(renderTo) {
    // allow tooltip over the container wrapper
    Highcharts.css(renderTo, { overflow: "visible" });
}
function fixNumericalAxisOutOfMinMaxRange(axis) {
    const range = axis.max - axis.min;
    if (range < 0) {
        // all data points is outside
        axis.translationSlope = axis.transA = HIGHCHART_PLOT_LIMITED_RANGE;
    }
}
let previousChart = null;
function getThemedConfiguration(theme) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    // This way it is possible to rewrite css variables in the limited scope.
    const themedBackground = `var(--gd-chart-backgroundColor, var(--gd-palette-complementary-0, ${styleVariables.gdColorBackground}))`;
    const backgroundColor = theme ? themedBackground : styleVariables.gdColorBackground;
    const axisLineColor = (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _a === void 0 ? void 0 : _a.axisColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c4) !== null && _e !== void 0 ? _e : styleVariables.gdColorAxisLine;
    return {
        credits: {
            enabled: false,
        },
        title: {
            // setting title to empty string prevents it from being shown
            text: "",
        },
        series: [],
        legend: {
            enabled: false,
        },
        drilldown: {
            activeDataLabelStyle: {
                color: (_h = (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.complementary) === null || _g === void 0 ? void 0 : _g.c9) !== null && _h !== void 0 ? _h : "#000",
                textDecoration: "none",
            },
            activeAxisLabelStyle: {
                color: (_l = (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.complementary) === null || _k === void 0 ? void 0 : _k.c8) !== null && _l !== void 0 ? _l : styleVariables.gdColorText,
                textDecoration: "none",
            },
            drillUpButton: {
                theme: {
                    style: {
                        // https://forum.highcharts.com/highcharts-usage/empty-checkbox-
                        // after-drilldown-with-x-axis-label-t33414/
                        display: "none",
                    },
                },
            },
        },
        plotOptions: {
            series: {
                animation: false,
                enableMouseTracking: true,
                turboThreshold: DEFAULT_CATEGORIES_LIMIT,
                borderColor: backgroundColor,
                dataLabels: {
                    style: {
                        textOutline: "none",
                    },
                },
                events: {
                    legendItemClick() {
                        if (this.visible) {
                            this.points.forEach((point) => { var _a; return (_a = point.dataLabel) === null || _a === void 0 ? void 0 : _a.hide(); });
                        }
                    },
                },
                point: {
                    events: {
                        click() {
                            var _a, _b;
                            if (isTouchDevice) {
                                // Close opened tooltip on previous clicked chart
                                // (click between multiple charts on dashboards)
                                const currentChart = this.series.chart;
                                const currentId = (_a = currentChart === null || currentChart === void 0 ? void 0 : currentChart.container) === null || _a === void 0 ? void 0 : _a.id;
                                const prevId = (_b = previousChart === null || previousChart === void 0 ? void 0 : previousChart.container) === null || _b === void 0 ? void 0 : _b.id;
                                const previousChartDisconnected = isEmpty(previousChart);
                                if (previousChart && !previousChartDisconnected && prevId !== currentId) {
                                    // Remove line chart point bubble
                                    invoke(previousChart, "hoverSeries.onMouseOut");
                                    previousChart.tooltip.hide();
                                }
                                if (!previousChart || prevId !== currentId) {
                                    previousChart = currentChart;
                                }
                            }
                        },
                    },
                },
            },
        },
        chart: {
            animation: false,
            backgroundColor,
            style: {
                fontFamily: 'gdcustomfont, Avenir, "Helvetica Neue", Arial, sans-serif',
            },
            events: {
                afterGetContainer() {
                    handleTooltipOffScreen(this.renderTo);
                },
            },
        },
        xAxis: [
            {
                lineColor: axisLineColor,
                events: {
                    afterSetAxisTranslation() {
                        fixNumericalAxisOutOfMinMaxRange(this);
                    },
                },
            },
        ],
        yAxis: [
            {
                lineColor: axisLineColor,
            },
        ],
    };
}
function registerDrilldownHandler(configuration, chartOptions, drillConfig) {
    set(configuration, "chart.events.drilldown", function chartDrilldownHandler(event) {
        chartClick(drillConfig, event, this.container, chartOptions.type);
    });
    return configuration;
}
export function handleChartLoad(chartType) {
    return function () {
        if (!this.hasLoaded) {
            // setup drill on initial render
            setupDrilldown(this, chartType);
        }
    };
}
function registerRenderHandler(configuration, chartOptions) {
    if (isOneOfTypes(chartOptions.type, supportedDualAxesChartTypes)) {
        set(configuration, "chart.events.render", handleChartLoad(chartOptions.type));
    }
    return configuration;
}
export function getCommonConfiguration(chartOptions, drillConfig, theme) {
    const commonConfiguration = getThemedConfiguration(theme);
    const handlers = [registerDrilldownHandler, registerRenderHandler];
    return handlers.reduce((configuration, handler) => handler(configuration, chartOptions, drillConfig), commonConfiguration);
}
//# sourceMappingURL=commonConfiguration.js.map