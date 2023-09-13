// (C) 2007-2023 GoodData Corporation
import noop from "lodash/noop.js";
import isString from "lodash/isString.js";
import merge from "lodash/merge.js";
import map from "lodash/map.js";
import partial from "lodash/partial.js";
import isEmpty from "lodash/isEmpty.js";
import compact from "lodash/compact.js";
import every from "lodash/every.js";
import isNil from "lodash/isNil.js";
import pickBy from "lodash/pickBy.js";
import cx from "classnames";
import { ClientFormatterFacade } from "@gooddata/number-formatter";
import { styleVariables } from "./styles/variables.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { formatAsPercent, getLabelStyle, getLabelsVisibilityConfig, getTotalsVisibilityConfig, getTotalsVisibility, } from "./dataLabelsHelpers.js";
import { HOVER_BRIGHTNESS, MINIMUM_HC_SAFE_BRIGHTNESS } from "./commonConfiguration.js";
import { getLighterColor } from "@gooddata/sdk-ui-vis-commons";
import { isAreaChart, isBarChart, isBubbleChart, isBulletChart, isColumnChart, isComboChart, isHeatmap, isInvertedChartType, isOneOfTypes, isRotationInRange, isScatterPlot, isSupportingJoinedAttributeAxisName, percentFormatter, } from "../_util/common.js";
import { shouldEndOnTick, shouldFollowPointer, shouldStartOnTick, shouldXAxisStartOnTickOnBubbleScatter, shouldYAxisStartOnTickOnBubbleScatter, } from "./helpers.js";
import getOptionalStackingConfiguration from "./getOptionalStackingConfiguration.js";
import { getZeroAlignConfiguration } from "./getZeroAlignConfiguration.js";
import { canComboChartBeStackedInPercent } from "../comboChart/comboChartOptions.js";
import { getAxisNameConfiguration } from "./getAxisNameConfiguration.js";
import { getAxisLabelConfigurationForDualBarChart } from "./getAxisLabelConfigurationForDualBarChart.js";
import { supportedDualAxesChartTypes, supportedTooltipFollowPointerChartTypes, } from "../_chartOptions/chartCapabilities.js";
import { AXIS_LINE_COLOR } from "../_util/color.js";
import { isMeasureFormatInPercent } from "@gooddata/sdk-model";
import { getContinuousLineConfiguration } from "./getContinuousLineConfiguration.js";
import { getWaterfallXAxisConfiguration } from "./getWaterfallXAxisConfiguration.js";
import { getChartOrientationConfiguration } from "./getChartOrientationConfiguration.js";
const EMPTY_DATA = { categories: [], series: [] };
const ALIGN_LEFT = "left";
const ALIGN_RIGHT = "right";
const ALIGN_CENTER = "center";
const TOOLTIP_ARROW_OFFSET = 23;
const TOOLTIP_MAX_WIDTH = 320;
const TOOLTIP_INVERTED_CHART_VERTICAL_OFFSET = 5;
const TOOLTIP_VERTICAL_OFFSET = 14;
const BAR_COLUMN_TOOLTIP_TOP_OFFSET = 8;
const BAR_COLUMN_TOOLTIP_LEFT_OFFSET = 5;
const HIGHCHARTS_TOOLTIP_TOP_LEFT_OFFSET = 16;
const MIN_RANGE = 2;
// custom limit to hide data labels to improve performance
const HEATMAP_DATA_LABELS_LIMIT = 150;
// in viewport <= 480, tooltip width is equal to chart container width
const TOOLTIP_FULLSCREEN_THRESHOLD = 480;
export const TOOLTIP_PADDING = 24; // padding of tooltip container - defined by CSS
export const TOOLTIP_VIEWPORT_MARGIN_TOP = 20;
const BAR_WIDTH_WHEN_TOTAL_LABELS_AVAILABLE = "90%";
const escapeAngleBrackets = (str) => {
    var _a;
    return (_a = str === null || str === void 0 ? void 0 : str.replace(/</g, "&lt;")) === null || _a === void 0 ? void 0 : _a.replace(/>/g, "&gt;");
};
function getAxisTitleConfiguration(axis) {
    var _a;
    return (axis
        ? {
            title: {
                text: escapeAngleBrackets((_a = axis === null || axis === void 0 ? void 0 : axis.label) !== null && _a !== void 0 ? _a : ""),
            },
        }
        : {});
}
function getTitleConfiguration(chartOptions) {
    const { yAxes = [], xAxes = [] } = chartOptions;
    const yAxis = yAxes.map((axis) => getAxisTitleConfiguration(axis));
    const xAxis = xAxes.map((axis) => getAxisTitleConfiguration(axis));
    return {
        yAxis,
        xAxis,
    };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function formatOverlappingForParentAttribute(category) {
    var _a, _b, _c, _d, _e;
    // category is passed from 'grouped-categories' which is highcharts plug-in
    if (!category) {
        return formatOverlapping.call(this);
    }
    const categoriesCount = ((_b = (_a = this.axis) === null || _a === void 0 ? void 0 : _a.categoriesTree) !== null && _b !== void 0 ? _b : []).length;
    if (categoriesCount === 1) {
        // Let the width be auto to make sure "this.value" is displayed on screen
        return `<div style="overflow: hidden; text-overflow: ellipsis">${this.value}</div>`;
    }
    const chartHeight = (_e = (_d = (_c = this.axis) === null || _c === void 0 ? void 0 : _c.chart) === null || _d === void 0 ? void 0 : _d.chartHeight) !== null && _e !== void 0 ? _e : 1;
    const width = Math.floor(chartHeight / categoriesCount);
    const pixelOffset = 40; // parent attribute should have more space than its children
    const finalWidth = Math.max(0, width - pixelOffset);
    return `<div style="width: ${finalWidth}px; overflow: hidden; text-overflow: ellipsis">${this.value}</div>`;
}
export function formatOverlapping() {
    var _a, _b, _c, _d;
    const categoriesCount = ((_b = (_a = this.axis) === null || _a === void 0 ? void 0 : _a.categories) !== null && _b !== void 0 ? _b : []).length;
    if (categoriesCount === 1) {
        // Let the width be auto to make sure "this.value" is displayed on screen
        return `<div align="center" style="overflow: hidden; text-overflow: ellipsis">${this.value}</div>`;
    }
    const chartHeight = (_d = (_c = this.chart) === null || _c === void 0 ? void 0 : _c.chartHeight) !== null && _d !== void 0 ? _d : 1;
    const width = Math.floor(chartHeight / categoriesCount);
    const pixelOffset = 20;
    const finalWidth = Math.max(0, width - pixelOffset);
    return (`<div align="center" style="width: ${finalWidth}px; overflow: hidden; text-overflow: ellipsis">` +
        this.value +
        "</div>");
}
function hideOverlappedLabels(chartOptions, _config, chartConfig) {
    var _a, _b, _c;
    const rotation = Number((_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.xAxisProps) === null || _a === void 0 ? void 0 : _a.rotation) !== null && _b !== void 0 ? _b : "0");
    // rotate labels for charts that are horizontal (bar, bullet, waterfall with vertical orientation config)
    const isInvertedChart = isInvertedChartType(chartOptions.type, (_c = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.orientation) === null || _c === void 0 ? void 0 : _c.position);
    if (isInvertedChart && isRotationInRange(rotation, 75, 105)) {
        const { xAxes = [], isViewByTwoAttributes } = chartOptions;
        return {
            xAxis: xAxes.map((axis) => axis
                ? {
                    labels: {
                        useHTML: true,
                        formatter: isViewByTwoAttributes
                            ? formatOverlappingForParentAttribute
                            : formatOverlapping,
                    },
                }
                : {}),
        };
    }
    return {};
}
function getArrowAlignment(arrowPosition, chartWidth) {
    const minX = -TOOLTIP_ARROW_OFFSET;
    const maxX = chartWidth + TOOLTIP_ARROW_OFFSET;
    if (arrowPosition + TOOLTIP_MAX_WIDTH / 2 > maxX && arrowPosition - TOOLTIP_MAX_WIDTH / 2 > minX) {
        return ALIGN_RIGHT;
    }
    if (arrowPosition - TOOLTIP_MAX_WIDTH / 2 < minX && arrowPosition + TOOLTIP_MAX_WIDTH / 2 < maxX) {
        return ALIGN_LEFT;
    }
    return ALIGN_CENTER;
}
const getTooltipHorizontalStartingPosition = (arrowPosition, chartWidth, tooltipWidth) => {
    switch (getArrowAlignment(arrowPosition, chartWidth)) {
        case ALIGN_RIGHT:
            return arrowPosition - tooltipWidth + TOOLTIP_ARROW_OFFSET;
        case ALIGN_LEFT:
            return arrowPosition - TOOLTIP_ARROW_OFFSET;
        default:
            return arrowPosition - tooltipWidth / 2;
    }
};
function getArrowHorizontalPosition(chartType, stacking, dataPointEnd, dataPointHeight) {
    if (isBarChart(chartType) && stacking) {
        return dataPointEnd - dataPointHeight / 2;
    }
    return dataPointEnd;
}
function getDataPointEnd(chartType, isNegative, endPoint, height, stacking) {
    return isBarChart(chartType) && isNegative && stacking ? endPoint + height : endPoint;
}
function getDataPointStart(chartType, isNegative, endPoint, height, stacking) {
    return isColumnChart(chartType) && isNegative && stacking ? endPoint - height : endPoint;
}
function getTooltipVerticalOffset(chartType, stacking, point) {
    if (isColumnChart(chartType) && (stacking || point.negative)) {
        return 0;
    }
    if (isInvertedChartType(chartType)) {
        return TOOLTIP_INVERTED_CHART_VERTICAL_OFFSET;
    }
    return TOOLTIP_VERTICAL_OFFSET;
}
export function getTooltipPositionInChartContainer(chartType, stacking, labelWidth, labelHeight, point) {
    const dataPointEnd = getDataPointEnd(chartType, point.negative, point.plotX, point.h, stacking);
    const arrowPosition = getArrowHorizontalPosition(chartType, stacking, dataPointEnd, point.h);
    const chartWidth = this.chart.plotWidth;
    const tooltipHorizontalStartingPosition = getTooltipHorizontalStartingPosition(arrowPosition, chartWidth, labelWidth);
    const verticalOffset = getTooltipVerticalOffset(chartType, stacking, point);
    const dataPointStart = getDataPointStart(chartType, point.negative, point.plotY, point.h, stacking);
    return {
        x: this.chart.plotLeft + tooltipHorizontalStartingPosition,
        y: this.chart.plotTop + dataPointStart - (labelHeight + verticalOffset),
    };
}
function getHighchartTooltipTopOffset(chartType) {
    if (isBarChart(chartType) ||
        isBulletChart(chartType) ||
        isColumnChart(chartType) ||
        isComboChart(chartType)) {
        return BAR_COLUMN_TOOLTIP_TOP_OFFSET;
    }
    return HIGHCHARTS_TOOLTIP_TOP_LEFT_OFFSET;
}
function getHighchartTooltipLeftOffset(chartType) {
    if (isBarChart(chartType) ||
        isBulletChart(chartType) ||
        isColumnChart(chartType) ||
        isComboChart(chartType)) {
        return BAR_COLUMN_TOOLTIP_LEFT_OFFSET;
    }
    return HIGHCHARTS_TOOLTIP_TOP_LEFT_OFFSET;
}
export function getTooltipPositionInViewPort(chartType, stacking, labelWidth, labelHeight, point) {
    const { x, y } = getTooltipPositionInChartContainer.call(this, chartType, stacking, labelWidth, labelHeight, point);
    const { top: containerTop, left: containerLeft } = this.chart.container.getBoundingClientRect();
    const leftOffset = pageXOffset + containerLeft - getHighchartTooltipLeftOffset(chartType);
    const topOffset = pageYOffset + containerTop - getHighchartTooltipTopOffset(chartType);
    const posX = isTooltipShownInFullScreen() ? leftOffset : leftOffset + x;
    const posY = topOffset + y;
    const minPosY = TOOLTIP_VIEWPORT_MARGIN_TOP - TOOLTIP_PADDING + pageYOffset;
    const posYLimited = posY < minPosY ? minPosY : posY;
    return {
        x: posX,
        y: posYLimited,
    };
}
const isTooltipShownInFullScreen = () => {
    return document.documentElement.clientWidth <= TOOLTIP_FULLSCREEN_THRESHOLD;
};
function formatTooltip(tooltipCallback, intl) {
    const { chart } = this.series;
    const { color: pointColor } = this.point;
    const chartWidth = chart.spacingBox.width;
    const isFullScreenTooltip = isTooltipShownInFullScreen();
    const maxTooltipContentWidth = isFullScreenTooltip ? chartWidth : Math.min(chartWidth, TOOLTIP_MAX_WIDTH);
    const isDrillable = this.point.drilldown;
    // when brushing, do not show tooltip
    if (chart.mouseIsDown) {
        return false;
    }
    const strokeStyle = pointColor ? `border-top-color: ${pointColor};` : "";
    const tooltipStyle = isFullScreenTooltip ? `width: ${maxTooltipContentWidth}px;` : "";
    // null disables whole tooltip
    const tooltipContent = tooltipCallback(this.point, maxTooltipContentWidth, this.percentage);
    const interactionMessage = getInteractionMessage(isDrillable, intl);
    return tooltipContent !== null
        ? `<div class="hc-tooltip gd-viz-tooltip" style="${tooltipStyle}">
            <span class="gd-viz-tooltip-stroke" style="${strokeStyle}"></span>
            <div class="gd-viz-tooltip-content" style="max-width: ${maxTooltipContentWidth}px;">
                ${tooltipContent}
                ${interactionMessage}
            </div>
        </div>`
        : null;
}
function getInteractionMessage(isDrillable, intl) {
    const message = intl ? intl.formatMessage({ id: "visualization.tooltip.interaction" }) : null;
    return isDrillable && intl ? `<div class="gd-viz-tooltip-interaction">${message}</div>` : "";
}
function formatLabel(value, format, config = {}) {
    // no labels for missing values
    if (isNil(value)) {
        return null;
    }
    const { separators } = config;
    const parsedNumber = value === null || undefined ? null : typeof value === "string" ? parseFloat(value) : value;
    // Based on the tests, when a format is not provided, we should refrain from formatting the value using the formatter, as the default format "#,##0.00" will be used.
    // Additionally, the test necessitates that the value should remain unformatted.
    if (!isEmpty(format)) {
        const formatted = ClientFormatterFacade.formatValue(parsedNumber, format, separators);
        return escapeAngleBrackets(formatted.formattedValue);
    }
    return parsedNumber.toString();
}
function labelFormatter(config) {
    var _a;
    return formatLabel(this.y, (_a = this.point) === null || _a === void 0 ? void 0 : _a.format, config);
}
function axisLabelFormatter(config, format) {
    return this.value === 0 ? 0 : formatLabel(this.value, format, config);
}
export function percentageDataLabelFormatter(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // suppose that chart has one Y axis by default
    const isSingleAxis = ((_d = (_c = (_b = (_a = this.series) === null || _a === void 0 ? void 0 : _a.chart) === null || _b === void 0 ? void 0 : _b.yAxis) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 1) === 1;
    const isPrimaryAxis = !((_g = (_f = (_e = this.series) === null || _e === void 0 ? void 0 : _e.yAxis) === null || _f === void 0 ? void 0 : _f.opposite) !== null && _g !== void 0 ? _g : false);
    // only format data labels to percentage for
    //  * left or right axis on single axis chart, or
    //  * primary axis on dual axis chart
    if (this.percentage && (isSingleAxis || isPrimaryAxis)) {
        return percentFormatter(this.percentage, ((_j = (_h = this.series) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.length) > 0 && this.series.data[0].format);
    }
    return labelFormatter.call(this, config);
}
export function firstValuePercentageLabelFormatter(config) {
    var _a, _b, _c;
    const firstValue = (_c = (_b = (_a = this.series) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.y;
    const formatted = labelFormatter.call(this, config);
    const percentageOfFirstValue = (this.y / firstValue) * 100;
    const percFormatted = Math.round(percentageOfFirstValue);
    return `${formatted} (${percFormatted}%)`;
}
function labelFormatterHeatmap(options) {
    return formatLabel(this.point.value, options.formatGD, options.config);
}
function level1LabelsFormatter(config) {
    var _a, _b, _c, _d;
    return `${(_a = this.point) === null || _a === void 0 ? void 0 : _a.name} (${formatLabel((_c = (_b = this.point) === null || _b === void 0 ? void 0 : _b.node) === null || _c === void 0 ? void 0 : _c.val, (_d = this.point) === null || _d === void 0 ? void 0 : _d.format, config)})`;
}
function level2LabelsFormatter(config) {
    var _a, _b, _c;
    return `${(_a = this.point) === null || _a === void 0 ? void 0 : _a.name} (${formatLabel((_b = this.point) === null || _b === void 0 ? void 0 : _b.value, (_c = this.point) === null || _c === void 0 ? void 0 : _c.format, config)})`;
}
function labelFormatterBubble(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const value = (_a = this.point) === null || _a === void 0 ? void 0 : _a.z;
    if (isNil(value) || isNaN(value)) {
        return null;
    }
    const xAxisMin = (_c = (_b = this.series) === null || _b === void 0 ? void 0 : _b.xAxis) === null || _c === void 0 ? void 0 : _c.min;
    const xAxisMax = (_e = (_d = this.series) === null || _d === void 0 ? void 0 : _d.xAxis) === null || _e === void 0 ? void 0 : _e.max;
    const yAxisMin = (_g = (_f = this.series) === null || _f === void 0 ? void 0 : _f.yAxis) === null || _g === void 0 ? void 0 : _g.min;
    const yAxisMax = (_j = (_h = this.series) === null || _h === void 0 ? void 0 : _h.yAxis) === null || _j === void 0 ? void 0 : _j.max;
    if ((!isNil(xAxisMax) && this.x > xAxisMax) ||
        (!isNil(xAxisMin) && this.x < xAxisMin) ||
        (!isNil(yAxisMax) && this.y > yAxisMax) ||
        (!isNil(yAxisMin) && this.y < yAxisMin)) {
        return null;
    }
    else {
        return formatLabel(value, (_k = this.point) === null || _k === void 0 ? void 0 : _k.format, config);
    }
}
function labelFormatterScatter() {
    var _a;
    const name = (_a = this.point) === null || _a === void 0 ? void 0 : _a.name;
    if (name) {
        return escapeAngleBrackets(name);
    }
    return null;
}
// check whether series contains only positive values, not consider nulls
function hasOnlyPositiveValues(series, x) {
    return every(series, (seriesItem) => {
        const dataPoint = seriesItem.yData[x];
        return dataPoint !== null && dataPoint >= 0;
    });
}
function stackLabelFormatter(config) {
    var _a, _b;
    // show labels: always for negative,
    // without negative values or with non-zero total for positive
    const showStackLabel = this.isNegative || hasOnlyPositiveValues(this.axis.series, this.x) || this.total !== 0;
    return showStackLabel ? formatLabel(this.total, (_b = (_a = this.axis) === null || _a === void 0 ? void 0 : _a.userOptions) === null || _b === void 0 ? void 0 : _b.defaultFormat, config) : null;
}
function getTooltipConfiguration(chartOptions, _config, _chartConfig, _drillConfig, intl) {
    var _a, _b, _c;
    const tooltipAction = (_a = chartOptions.actions) === null || _a === void 0 ? void 0 : _a.tooltip;
    const chartType = chartOptions.type;
    const { stacking } = chartOptions;
    const followPointer = isOneOfTypes(chartType, supportedTooltipFollowPointerChartTypes)
        ? { followPointer: shouldFollowPointer(chartOptions) }
        : {};
    return tooltipAction
        ? {
            tooltip: Object.assign({ borderWidth: 0, borderRadius: 0, shadow: false, useHTML: true, outside: true, positioner: partial(getTooltipPositionInViewPort, chartType, stacking), formatter: partial(formatTooltip, tooltipAction, intl), enabled: (_c = (_b = _chartConfig === null || _chartConfig === void 0 ? void 0 : _chartConfig.tooltip) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : true }, followPointer),
        }
        : {};
}
function getTreemapLabelsConfiguration(isMultiLevel, style, config, labelsConfig) {
    const smallLabelInCenter = {
        dataLabels: Object.assign({ enabled: true, padding: 2, formatter: partial(level2LabelsFormatter, config), allowOverlap: false, style }, labelsConfig),
    };
    if (isMultiLevel) {
        return {
            dataLabels: Object.assign({}, labelsConfig),
            levels: [
                {
                    level: 1,
                    dataLabels: Object.assign({ enabled: true, align: "left", verticalAlign: "top", padding: 5, style: Object.assign(Object.assign({}, style), { fontSize: "14px", fontFamily: "gdcustomfont, Avenir, 'Helvetica Neue', Arial, sans-serif" }), formatter: partial(level1LabelsFormatter, config), allowOverlap: false }, labelsConfig),
                },
                Object.assign({ level: 2 }, smallLabelInCenter),
            ],
        };
    }
    else {
        return {
            dataLabels: Object.assign({}, labelsConfig),
            levels: [
                Object.assign({ level: 1 }, smallLabelInCenter),
            ],
        };
    }
}
function shouldDisableHeatmapDataLabels(series) {
    return series.some((item) => { var _a; return ((_a = item.data) === null || _a === void 0 ? void 0 : _a.length) >= HEATMAP_DATA_LABELS_LIMIT; });
}
function getLabelsConfiguration(chartOptions, _config, chartConfig) {
    var _a, _b, _c, _d;
    const { stacking, yAxes = [], type } = chartOptions;
    const { stackMeasuresToPercent = false, enableSeparateTotalLabels = false } = chartConfig || {};
    const labelsVisible = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _a === void 0 ? void 0 : _a.visible;
    // handling of existing behaviour
    const totalsVisible = isBarChart(type) && !enableSeparateTotalLabels ? false : getTotalsVisibility(chartConfig);
    const labelsConfig = getLabelsVisibilityConfig(labelsVisible);
    const style = getLabelStyle(type, stacking);
    const yAxis = yAxes.map((axis) => ({
        defaultFormat: axis === null || axis === void 0 ? void 0 : axis.format,
    }));
    const series = (_c = (_b = chartOptions.data) === null || _b === void 0 ? void 0 : _b.series) !== null && _c !== void 0 ? _c : [];
    const canStackInPercent = canComboChartBeStackedInPercent(series);
    // only applied to bar, column, dual axis and area chart
    const dataLabelFormatter = stackMeasuresToPercent && canStackInPercent ? percentageDataLabelFormatter : labelFormatter;
    // only applied to funnel if configured (default=true)
    const funnelFormatter = ((_d = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _d === void 0 ? void 0 : _d.percentsVisible) !== false
        ? firstValuePercentageLabelFormatter
        : labelFormatter;
    const DEFAULT_LABELS_CONFIG = Object.assign({ formatter: partial(labelFormatter, chartConfig), style, allowOverlap: false }, labelsConfig);
    // workaround for missing data labels on last stacked measure with limited axis
    // see https://github.com/highcharts/highcharts/issues/15145
    const dataLabelsBugWorkaround = stackMeasuresToPercent && canStackInPercent ? { inside: true } : {};
    // only applied to heatmap chart
    const areHeatmapDataLabelsDisabled = shouldDisableHeatmapDataLabels(series);
    const heatmapLabelsConfig = areHeatmapDataLabelsDisabled ? { enabled: false } : labelsConfig;
    return {
        plotOptions: {
            gdcOptions: {
                dataLabels: {
                    visible: labelsVisible,
                    totalsVisible: totalsVisible,
                },
            },
            bar: {
                dataLabels: Object.assign(Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: partial(dataLabelFormatter, chartConfig) }), dataLabelsBugWorkaround),
            },
            column: {
                dataLabels: Object.assign(Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: partial(dataLabelFormatter, chartConfig) }), dataLabelsBugWorkaround),
            },
            heatmap: {
                dataLabels: Object.assign({ formatter: labelFormatterHeatmap, config: chartConfig }, heatmapLabelsConfig),
            },
            treemap: Object.assign({}, getTreemapLabelsConfiguration(!!stacking, style, chartConfig, labelsConfig)),
            line: {
                dataLabels: DEFAULT_LABELS_CONFIG,
            },
            area: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: partial(dataLabelFormatter, chartConfig) }),
            },
            scatter: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: partial(labelFormatterScatter, chartConfig) }),
            },
            bubble: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: partial(labelFormatterBubble, chartConfig) }),
            },
            pie: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { verticalAlign: "middle" }),
            },
            waterfall: {
                dataLabels: Object.assign({}, DEFAULT_LABELS_CONFIG),
            },
            pyramid: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { inside: "true" }),
            },
            funnel: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: partial(funnelFormatter, chartConfig), inside: "true" }),
            },
            sankey: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: noop }),
            },
            dependencywheel: {
                dataLabels: Object.assign(Object.assign({}, DEFAULT_LABELS_CONFIG), { formatter: noop }),
            },
        },
        yAxis,
    };
}
function getDataPointsConfiguration(_chartOptions, _config, chartConfig) {
    var _a, _b;
    const dataPointsVisible = (_b = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataPoints) === null || _a === void 0 ? void 0 : _a.visible) !== null && _b !== void 0 ? _b : true;
    const dataPointsConfig = {
        marker: {
            enabled: dataPointsVisible === "auto" ? undefined : dataPointsVisible,
        },
    };
    return {
        plotOptions: {
            line: dataPointsConfig,
            area: dataPointsConfig,
        },
    };
}
function isNonStackingConfiguration(chartOptions, chartConfig) {
    var _a, _b;
    const { type, data } = chartOptions;
    if (((_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.continuousLine) === null || _a === void 0 ? void 0 : _a.enabled) && !(chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.stackMeasures)) {
        return ((isAreaChart(type) && ((_b = data === null || data === void 0 ? void 0 : data.series) === null || _b === void 0 ? void 0 : _b.length) === 1) ||
            (isComboChart(type) && !isAreaChart(chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.primaryChartType)));
    }
    return false;
}
function getStackingConfiguration(chartOptions, _config, chartConfig) {
    var _a, _b, _c;
    const { stacking, yAxes = [], type } = chartOptions;
    if (!stacking) {
        return {};
    }
    const totalLabelsConfig = getTotalsVisibilityConfig(type, chartConfig);
    const yAxis = yAxes.map(() => ({
        stackLabels: Object.assign(Object.assign({}, totalLabelsConfig), { formatter: partial(stackLabelFormatter, chartConfig) }),
    }));
    const connectNulls = isAreaChart(type) ? { connectNulls: true } : {};
    const nonStacking = isNonStackingConfiguration(chartOptions, chartConfig);
    // extra space allocation for total labels if available
    const totalsVisibleByLabelsConfig = isNil((_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _a === void 0 ? void 0 : _a.totalsVisible) && !!((_b = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _b === void 0 ? void 0 : _b.visible);
    const totalLabelsExtention = isBarChart(type) &&
        (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.enableSeparateTotalLabels) &&
        (!!((_c = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _c === void 0 ? void 0 : _c.totalsVisible) || totalsVisibleByLabelsConfig) &&
        !chartConfig.stackMeasuresToPercent
        ? {
            chart: { marginRight: 0 },
            yAxis: yAxis.map((element) => {
                return Object.assign(Object.assign({}, element), { width: BAR_WIDTH_WHEN_TOTAL_LABELS_AVAILABLE });
            }),
        }
        : {};
    return Object.assign({ plotOptions: {
            series: Object.assign({ stacking: nonStacking ? undefined : stacking }, connectNulls),
        }, yAxis }, totalLabelsExtention);
}
function getSeries(series) {
    return series.map((seriesItem) => {
        var _a;
        return Object.assign(Object.assign({}, seriesItem), { 
            // Escaping is handled by highcharts so we don't want to provide escaped input.
            // With one exception, though. Highcharts supports defining styles via
            // for example <b>...</b> and parses that from series name.
            // So to avoid this parsing, escape only < and > to &lt; and &gt;
            // which is understood by highcharts correctly
            name: (seriesItem === null || seriesItem === void 0 ? void 0 : seriesItem.name) && escapeAngleBrackets(seriesItem === null || seriesItem === void 0 ? void 0 : seriesItem.name), 
            // Escape data items for pie chart
            data: (_a = seriesItem === null || seriesItem === void 0 ? void 0 : seriesItem.data) === null || _a === void 0 ? void 0 : _a.map((dataItem) => {
                if (!dataItem) {
                    return dataItem;
                }
                return Object.assign(Object.assign({}, dataItem), { name: escapeAngleBrackets(dataItem.name) });
            }) });
    });
}
function getHeatmapDataConfiguration(chartOptions) {
    var _a, _b;
    const data = chartOptions.data || EMPTY_DATA;
    const series = data.series;
    const categories = data.categories;
    return {
        series,
        xAxis: [
            {
                categories: categories[0] || [],
            },
        ],
        yAxis: [
            {
                categories: categories[1] || [],
            },
        ],
        colorAxis: {
            dataClasses: (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.colorAxis) === null || _a === void 0 ? void 0 : _a.dataClasses) !== null && _b !== void 0 ? _b : [],
        },
    };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function escapeCategories(dataCategories) {
    return map(dataCategories, (category) => {
        return isString(category)
            ? escapeAngleBrackets(category)
            : {
                name: escapeAngleBrackets(category.name),
                categories: map(category.categories, escapeAngleBrackets),
            };
    });
}
function getDataConfiguration(chartOptions) {
    const data = chartOptions.data || EMPTY_DATA;
    const series = getSeries(data.series);
    const { type } = chartOptions;
    switch (type) {
        case VisualizationTypes.SCATTER:
        case VisualizationTypes.BUBBLE:
        case VisualizationTypes.WATERFALL:
            return {
                series,
            };
        case VisualizationTypes.HEATMAP:
            return getHeatmapDataConfiguration(chartOptions);
    }
    const categories = escapeCategories(data.categories);
    return {
        series,
        xAxis: [
            {
                categories,
            },
        ],
    };
}
function lineSeriesMapFn(seriesOrig) {
    var _a, _b, _c, _d, _e, _f;
    if (seriesOrig.isDrillable) {
        return Object.assign(Object.assign({}, seriesOrig), { marker: Object.assign(Object.assign({}, seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.marker), { states: Object.assign(Object.assign({}, (_a = seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.marker) === null || _a === void 0 ? void 0 : _a.states), { hover: Object.assign(Object.assign({}, (_c = (_b = seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.marker) === null || _b === void 0 ? void 0 : _b.states) === null || _c === void 0 ? void 0 : _c.hover), { fillColor: getLighterColor(seriesOrig.color, HOVER_BRIGHTNESS) }) }) }) });
    }
    return Object.assign(Object.assign({}, seriesOrig), { states: Object.assign(Object.assign({}, seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.states), { hover: Object.assign(Object.assign({}, (_d = seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.states) === null || _d === void 0 ? void 0 : _d.hover), { halo: Object.assign(Object.assign({}, (_f = (_e = seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.states) === null || _e === void 0 ? void 0 : _e.hover) === null || _f === void 0 ? void 0 : _f.halo), { size: 0 }) }) }) });
}
function barSeriesMapFn(seriesOrig) {
    var _a;
    return Object.assign(Object.assign({}, seriesOrig), { states: Object.assign(Object.assign({}, seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.states), { hover: Object.assign(Object.assign({}, (_a = seriesOrig === null || seriesOrig === void 0 ? void 0 : seriesOrig.states) === null || _a === void 0 ? void 0 : _a.hover), { brightness: HOVER_BRIGHTNESS, enabled: seriesOrig.isDrillable }) }) });
}
function getHeatMapHoverColor(config) {
    var _a, _b;
    const dataClasses = (_b = (_a = config === null || config === void 0 ? void 0 : config.colorAxis) === null || _a === void 0 ? void 0 : _a.dataClasses) !== null && _b !== void 0 ? _b : null;
    let resultColor = "rgb(210,210,210)";
    if (dataClasses) {
        if (dataClasses.length === 1) {
            resultColor = dataClasses[0].color;
        }
        else if (dataClasses.length > 1) {
            resultColor = dataClasses[1].color;
        }
    }
    return getLighterColor(resultColor, 0.2);
}
function getHoverStyles({ type }, config) {
    let seriesMapFn = noop;
    switch (type) {
        case VisualizationTypes.LINE:
        case VisualizationTypes.SCATTER:
        case VisualizationTypes.AREA:
        case VisualizationTypes.BUBBLE:
            seriesMapFn = lineSeriesMapFn;
            break;
        case VisualizationTypes.BAR:
        case VisualizationTypes.COLUMN:
        case VisualizationTypes.BULLET:
            seriesMapFn = barSeriesMapFn;
            break;
        case VisualizationTypes.HEATMAP:
            seriesMapFn = (series, config) => {
                var _a;
                const color = getHeatMapHoverColor(config);
                return Object.assign(Object.assign({}, series), { states: Object.assign(Object.assign({}, series === null || series === void 0 ? void 0 : series.states), { hover: Object.assign(Object.assign({}, (_a = series === null || series === void 0 ? void 0 : series.states) === null || _a === void 0 ? void 0 : _a.hover), { color, enabled: series.isDrillable }) }) });
            };
            break;
        case VisualizationTypes.COMBO:
        case VisualizationTypes.COMBO2:
            seriesMapFn = (seriesOrig) => {
                const { type } = seriesOrig;
                if (type === "line" || type === "area") {
                    return lineSeriesMapFn(seriesOrig);
                }
                return barSeriesMapFn(seriesOrig);
            };
            break;
        case VisualizationTypes.PIE:
        case VisualizationTypes.DONUT:
        case VisualizationTypes.TREEMAP:
        case VisualizationTypes.WATERFALL:
        case VisualizationTypes.FUNNEL:
        case VisualizationTypes.PYRAMID:
        case VisualizationTypes.SANKEY:
        case VisualizationTypes.DEPENDENCY_WHEEL:
            seriesMapFn = (series) => {
                return Object.assign(Object.assign({}, series), { data: series.data.map((dataItemOrig) => {
                        var _a;
                        const drilldown = dataItemOrig === null || dataItemOrig === void 0 ? void 0 : dataItemOrig.drilldown;
                        const pointHalo = !drilldown
                            ? {
                                // see plugins/pointHalo.js
                                halo: Object.assign(Object.assign({}, dataItemOrig === null || dataItemOrig === void 0 ? void 0 : dataItemOrig.halo), { size: 0 }),
                            }
                            : {};
                        return Object.assign(Object.assign(Object.assign({}, dataItemOrig), { states: Object.assign(Object.assign({}, dataItemOrig === null || dataItemOrig === void 0 ? void 0 : dataItemOrig.states), { hover: Object.assign(Object.assign({}, (_a = dataItemOrig === null || dataItemOrig === void 0 ? void 0 : dataItemOrig.states) === null || _a === void 0 ? void 0 : _a.hover), { brightness: drilldown ? HOVER_BRIGHTNESS : MINIMUM_HC_SAFE_BRIGHTNESS }) }) }), pointHalo);
                    }) });
            };
            break;
        default:
            throw new Error(`Undefined chart type "${type}".`);
    }
    return {
        series: config.series.map((item) => seriesMapFn(item, config)),
    };
}
function getGridConfiguration(chartOptions, _config, _chartConfig, _drillConfig, _intl, theme) {
    var _a, _b, _c, _d, _e, _f, _g;
    const gridEnabled = (_b = (_a = chartOptions.grid) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true;
    const { yAxes = [], xAxes = [] } = chartOptions;
    const gridColor = (_g = (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _c === void 0 ? void 0 : _c.gridColor) !== null && _d !== void 0 ? _d : (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.complementary) === null || _f === void 0 ? void 0 : _f.c3) !== null && _g !== void 0 ? _g : styleVariables.gdColorGrid;
    const config = gridEnabled ? { gridLineWidth: 1, gridLineColor: gridColor } : { gridLineWidth: 0 };
    const yAxis = yAxes.map(() => config);
    const bothAxesGridlineCharts = [VisualizationTypes.BUBBLE, VisualizationTypes.SCATTER];
    let xAxis = {};
    if (isOneOfTypes(chartOptions.type, bothAxesGridlineCharts)) {
        xAxis = xAxes.map(() => config);
    }
    return {
        yAxis,
        xAxis,
    };
}
export function areAxisLabelsEnabled(chartOptions, axisPropsName, shouldCheckForEmptyCategories) {
    var _a, _b;
    const data = chartOptions.data || EMPTY_DATA;
    const { type } = chartOptions;
    const categories = isHeatmap(type) ? data.categories : escapeCategories(data.categories);
    const categoriesFlag = shouldCheckForEmptyCategories ? !isEmpty(compact(categories)) : true;
    const axisOptions = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsName];
    const visible = (_a = axisOptions === null || axisOptions === void 0 ? void 0 : axisOptions.visible) !== null && _a !== void 0 ? _a : true;
    const labelsEnabled = (_b = axisOptions === null || axisOptions === void 0 ? void 0 : axisOptions.labelsEnabled) !== null && _b !== void 0 ? _b : true;
    return {
        enabled: categoriesFlag && visible && labelsEnabled,
    };
}
function shouldExpandYAxis(chartOptions) {
    var _a, _b, _c, _d;
    const min = (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.xAxisProps) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : "";
    const max = (_d = (_c = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.xAxisProps) === null || _c === void 0 ? void 0 : _c.max) !== null && _d !== void 0 ? _d : "";
    return min === "" && max === "" ? {} : { getExtremesFromAll: true };
}
function getAxisLineConfiguration(chartType, isAxisVisible) {
    let lineWidth;
    if (isAxisVisible === false) {
        lineWidth = 0;
    }
    else {
        lineWidth = isScatterPlot(chartType) || isBubbleChart(chartType) ? 1 : undefined;
    }
    return pickBy({ AXIS_LINE_COLOR, lineWidth }, (item) => item !== undefined);
}
function getXAxisTickConfiguration(chartOptions) {
    const { type } = chartOptions;
    if (isBubbleChart(type) || isScatterPlot(type)) {
        return {
            startOnTick: shouldXAxisStartOnTickOnBubbleScatter(chartOptions),
            endOnTick: false,
        };
    }
    return {};
}
function getYAxisTickConfiguration(chartOptions, axisPropsKey) {
    const { type, yAxes } = chartOptions;
    if (isBubbleChart(type) || isScatterPlot(type)) {
        return {
            startOnTick: shouldYAxisStartOnTickOnBubbleScatter(chartOptions),
        };
    }
    if (isOneOfTypes(type, supportedDualAxesChartTypes) && yAxes.length > 1) {
        // disable { startOnTick, endOnTick } to make gridline sync in both axes
        return {};
    }
    return {
        startOnTick: shouldStartOnTick(chartOptions, axisPropsKey),
        endOnTick: shouldEndOnTick(chartOptions, axisPropsKey),
    };
}
export const getFormatterProperty = (chartOptions, axisPropsKey, chartConfig, axisFormat) => {
    var _a, _b;
    if (isMeasureFormatInPercent(axisFormat)) {
        return { formatter: partial(formatAsPercent, 100) };
    }
    const useCustomFormat = (_b = ((_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _a === void 0 ? void 0 : _a.format) === "inherit") !== null && _b !== void 0 ? _b : false;
    if (useCustomFormat) {
        return { formatter: partial(axisLabelFormatter, chartConfig, axisFormat) };
    }
    return {};
};
const getYAxisConfiguration = (chartOptions, chartConfig, axisValueColor, axisLabelColor) => {
    const { forceDisableDrillOnAxes = false } = chartOptions;
    const type = chartOptions.type;
    const yAxes = chartOptions.yAxes || [];
    return yAxes.map((axis) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (!axis) {
            return {
                visible: false,
            };
        }
        const opposite = (_a = axis.opposite) !== null && _a !== void 0 ? _a : false;
        const axisType = opposite ? "secondary" : "primary";
        const className = cx(`s-highcharts-${axisType}-yaxis`, {
            "gd-axis-label-drilling-disabled": forceDisableDrillOnAxes,
        });
        const axisPropsKey = opposite ? "secondary_yAxisProps" : "yAxisProps";
        // For bar chart take x axis options
        const min = (_c = (_b = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _b === void 0 ? void 0 : _b.min) !== null && _c !== void 0 ? _c : "";
        const max = (_e = (_d = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _d === void 0 ? void 0 : _d.max) !== null && _e !== void 0 ? _e : "";
        const visible = (_g = (_f = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _f === void 0 ? void 0 : _f.visible) !== null && _g !== void 0 ? _g : true;
        const maxProp = max ? { max: Number(max) } : {};
        const minProp = min ? { min: Number(min) } : {};
        const rotation = (_j = (_h = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _h === void 0 ? void 0 : _h.rotation) !== null && _j !== void 0 ? _j : "auto";
        const rotationProp = rotation !== "auto" ? { rotation: -Number(rotation) } : {};
        const shouldCheckForEmptyCategories = isHeatmap(type) ? true : false;
        const labelsEnabled = areAxisLabelsEnabled(chartOptions, axisPropsKey, shouldCheckForEmptyCategories);
        const formatter = getFormatterProperty(chartOptions, axisPropsKey, chartConfig, axis.format);
        const tickConfiguration = getYAxisTickConfiguration(chartOptions, axisPropsKey);
        const titleTextProp = visible ? {} : { text: null }; // new way how to hide title instead of deprecated 'enabled'
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getAxisLineConfiguration(type, visible)), { labels: Object.assign(Object.assign(Object.assign(Object.assign({}, labelsEnabled), { style: {
                    color: axisValueColor,
                    font: '12px gdcustomfont, Avenir, "Helvetica Neue", Arial, sans-serif',
                } }), formatter), rotationProp), title: Object.assign(Object.assign({}, titleTextProp), { margin: 15, style: {
                    color: axisLabelColor,
                    font: '14px gdcustomfont, Avenir, "Helvetica Neue", Arial, sans-serif',
                } }), opposite,
            className }), maxProp), minProp), tickConfiguration);
    });
};
const getXAxisConfiguration = (chartOptions, chartConfig, axisValueColor, axisLabelColor) => {
    const { forceDisableDrillOnAxes = false } = chartOptions;
    const type = chartOptions.type;
    const xAxes = chartOptions.xAxes || [];
    return xAxes.map((axis) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (!axis) {
            return {
                visible: false,
            };
        }
        const opposite = (_a = axis.opposite) !== null && _a !== void 0 ? _a : false;
        const axisPropsKey = opposite ? "secondary_xAxisProps" : "xAxisProps";
        const className = cx({
            "gd-axis-label-drilling-disabled": forceDisableDrillOnAxes,
        });
        const min = (_c = (_b = chartOptions[axisPropsKey]) === null || _b === void 0 ? void 0 : _b.min) !== null && _c !== void 0 ? _c : "";
        const max = (_e = (_d = chartOptions[axisPropsKey]) === null || _d === void 0 ? void 0 : _d.max) !== null && _e !== void 0 ? _e : "";
        const maxProp = max ? { max: Number(max) } : {};
        const minProp = min ? { min: Number(min) } : {};
        const isViewByTwoAttributes = (_f = chartOptions.isViewByTwoAttributes) !== null && _f !== void 0 ? _f : false;
        const isInvertedChart = isInvertedChartType(chartOptions.type, (_g = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.orientation) === null || _g === void 0 ? void 0 : _g.position);
        const visible = (_j = (_h = chartOptions[axisPropsKey]) === null || _h === void 0 ? void 0 : _h.visible) !== null && _j !== void 0 ? _j : true;
        const rotation = (_l = (_k = chartOptions[axisPropsKey]) === null || _k === void 0 ? void 0 : _k.rotation) !== null && _l !== void 0 ? _l : "auto";
        const rotationProp = rotation !== "auto" ? { rotation: -Number(rotation) } : {};
        const shouldCheckForEmptyCategories = isScatterPlot(type) || isBubbleChart(type) ? false : true;
        const labelsEnabled = areAxisLabelsEnabled(chartOptions, axisPropsKey, shouldCheckForEmptyCategories);
        const formatter = getFormatterProperty(chartOptions, axisPropsKey, chartConfig, axis.format);
        const tickConfiguration = getXAxisTickConfiguration(chartOptions);
        // for minimum zoom level value
        const minRange = ((_m = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.zoomInsight) !== null && _m !== void 0 ? _m : false) && ((_p = (_o = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _o === void 0 ? void 0 : _o.categories) !== null && _p !== void 0 ? _p : []).length > 2
            ? MIN_RANGE
            : undefined;
        const joinedAttributeAxisName = (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.enableJoinedAttributeAxisName) && isSupportingJoinedAttributeAxisName(type);
        const titleTextProp = visible && (!isViewByTwoAttributes || joinedAttributeAxisName) ? {} : { text: null }; // new way how to hide title instead of deprecated 'enabled'
        // for bar chart take y axis options
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getAxisLineConfiguration(type, visible)), { 
            // hide ticks on x axis
            minorTickLength: 0, tickLength: 0, 
            // padding of maximum value
            maxPadding: 0.05, minRange, labels: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, labelsEnabled), { style: {
                    color: axisValueColor,
                    font: '12px gdcustomfont, Avenir, "Helvetica Neue", Arial, sans-serif',
                }, autoRotation: [-90] }), formatter), rotationProp), { 
                // Due to a bug in Highcharts & grouped-categories the autoRotation is working only with useHtml
                // See: https://github.com/blacklabel/grouped_categories/issues/137
                useHTML: !isInvertedChart && isViewByTwoAttributes }), title: Object.assign(Object.assign({}, titleTextProp), { margin: 10, style: {
                    textOverflow: "ellipsis",
                    color: axisLabelColor,
                    font: '14px gdcustomfont, Avenir, "Helvetica Neue", Arial, sans-serif',
                } }), className }), maxProp), minProp), tickConfiguration);
    });
};
function getAxesConfiguration(chartOptions, _config, chartConfig, _drillConfig, _intl, theme) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const axisValueColor = (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _a === void 0 ? void 0 : _a.axisValueColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c6) !== null && _e !== void 0 ? _e : styleVariables.gdColorStateBlank;
    const axisLabelColor = (_k = (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _f === void 0 ? void 0 : _f.axisLabelColor) !== null && _g !== void 0 ? _g : (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.complementary) === null || _j === void 0 ? void 0 : _j.c7) !== null && _k !== void 0 ? _k : styleVariables.gdColorLink;
    return {
        plotOptions: {
            series: Object.assign({}, shouldExpandYAxis(chartOptions)),
        },
        yAxis: getYAxisConfiguration(chartOptions, chartConfig, axisValueColor, axisLabelColor),
        xAxis: getXAxisConfiguration(chartOptions, chartConfig, axisValueColor, axisLabelColor),
    };
}
function getTargetCursorConfigurationForBulletChart(chartOptions) {
    const { type, data } = chartOptions;
    if (!isBulletChart(type)) {
        return {};
    }
    const isTargetDrillable = data.series.some((series) => series.type === "bullet" && series.isDrillable);
    return isTargetDrillable ? { plotOptions: { bullet: { cursor: "pointer" } } } : {};
}
function getZoomingAndPanningConfiguration(_chartOptions, _config, chartConfig) {
    return (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.zoomInsight)
        ? {
            chart: {
                animation: true,
                zoomType: "x",
                panKey: "shift",
                panning: {
                    enabled: true,
                },
                resetZoomButton: {
                    theme: {
                        style: {
                            display: "none",
                        },
                    },
                },
            },
        }
        : undefined;
}
function getReversedStacking(chartOptions, _config, chartConfig) {
    const { yAxes = [] } = chartOptions;
    const hasAnyStackOptionSelected = (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.stackMeasures) ||
        (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.stackMeasuresToPercent) ||
        (chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.hasStackByAttribute);
    const shouldReverseStacking = isBarChart(chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.type) && (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.enableReversedStacking) && hasAnyStackOptionSelected;
    return {
        yAxis: yAxes.map((axis) => axis
            ? {
                reversedStacks: shouldReverseStacking ? false : true,
            }
            : {}),
    };
}
export function getCustomizedConfiguration(chartOptions, chartConfig, drillConfig, intl, theme) {
    const configurators = [
        getTitleConfiguration,
        getAxesConfiguration,
        getStackingConfiguration,
        hideOverlappedLabels,
        getDataConfiguration,
        getTooltipConfiguration,
        getHoverStyles,
        getGridConfiguration,
        getLabelsConfiguration,
        getDataPointsConfiguration,
        // should be after 'getDataConfiguration' to modify 'series'
        // and should be after 'getStackingConfiguration' to get stackLabels config
        getOptionalStackingConfiguration,
        getZeroAlignConfiguration,
        getAxisNameConfiguration,
        getAxisLabelConfigurationForDualBarChart,
        getTargetCursorConfigurationForBulletChart,
        getZoomingAndPanningConfiguration,
        getReversedStacking,
        getContinuousLineConfiguration,
        getWaterfallXAxisConfiguration,
        getChartOrientationConfiguration,
    ];
    const commonData = configurators.reduce((config, configurator) => {
        return merge(config, configurator(chartOptions, config, chartConfig, drillConfig, intl, theme));
    }, {});
    return merge({}, commonData);
}
//# sourceMappingURL=customConfiguration.js.map