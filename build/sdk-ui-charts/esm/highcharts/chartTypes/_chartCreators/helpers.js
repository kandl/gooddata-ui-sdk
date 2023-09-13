// (C) 2007-2023 GoodData Corporation
import flatten from "lodash/flatten.js";
import pick from "lodash/pick.js";
import map from "lodash/map.js";
import zip from "lodash/zip.js";
import unzip from "lodash/unzip.js";
import initial from "lodash/initial.js";
import tail from "lodash/tail.js";
import isEmpty from "lodash/isEmpty.js";
import maxBy from "lodash/maxBy.js";
import minBy from "lodash/minBy.js";
import min from "lodash/min.js";
import max from "lodash/max.js";
import isNil from "lodash/isNil.js";
import compact from "lodash/compact.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { isInvertedChartType } from "../_util/common.js";
import { BOTTOM, MIDDLE, TOP } from "../../constants/alignments.js";
// https://silentmatt.com/rectangle-intersection/
export const rectanglesAreOverlapping = (r1, r2, padding = 0) => r1.left - padding < r2.right + padding &&
    r1.right + padding > r2.left - padding &&
    r1.top - padding < r2.bottom + padding &&
    r1.bottom + padding > r2.top - padding;
export const isIntersecting = (r1, r2) => r1.x < r2.x + r2.width && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;
export const toNeighbors = (array) => zip(initial(array), tail(array));
export const getVisibleSeries = (chart) => { var _a; return (_a = chart.series) === null || _a === void 0 ? void 0 : _a.filter((s) => s.visible); };
export const getHiddenSeries = (chart) => { var _a; return (_a = chart.series) === null || _a === void 0 ? void 0 : _a.filter((s) => !s.visible); };
export const getDataPoints = (series) => compact(flatten(unzip(map(series, (s) => s.points))));
export const getDataPointsOfVisibleSeries = (chart) => getDataPoints(getVisibleSeries(chart));
export const getChartType = (chart) => { var _a; return (_a = chart.options.chart) === null || _a === void 0 ? void 0 : _a.type; };
export const isStacked = (chart) => {
    var _a, _b, _c, _d, _e;
    const chartType = getChartType(chart);
    const chartTypeOptions = (_b = (_a = chart.userOptions) === null || _a === void 0 ? void 0 : _a.plotOptions) === null || _b === void 0 ? void 0 : _b[chartType];
    const isStackedByChartType = !!(chartTypeOptions === null || chartTypeOptions === void 0 ? void 0 : chartTypeOptions.stacking);
    const isStackedBySeries = !!((_e = (_d = (_c = chart.userOptions) === null || _c === void 0 ? void 0 : _c.plotOptions) === null || _d === void 0 ? void 0 : _d.series) === null || _e === void 0 ? void 0 : _e.stacking);
    const hasStackedAxis = chart.axes.some((axis) => { var _a; return !isEmpty((_a = axis === null || axis === void 0 ? void 0 : axis.stacking) === null || _a === void 0 ? void 0 : _a.stacks); });
    return (isStackedByChartType || isStackedBySeries) && hasStackedAxis;
};
export function getChartProperties(config, type) {
    var _a;
    const isInvertedType = isInvertedChartType(type, (_a = config === null || config === void 0 ? void 0 : config.orientation) === null || _a === void 0 ? void 0 : _a.position);
    const chartProps = {
        xAxisProps: isInvertedType ? Object.assign({}, config.yaxis) : Object.assign({}, config.xaxis),
        yAxisProps: isInvertedType ? Object.assign({}, config.xaxis) : Object.assign({}, config.yaxis),
    };
    const secondaryXAxisProps = isInvertedType
        ? Object.assign({}, config.secondary_yaxis) : Object.assign({}, config.secondary_xaxis);
    const secondaryYAxisProps = isInvertedType
        ? Object.assign({}, config.secondary_xaxis) : Object.assign({}, config.secondary_yaxis);
    if (!isEmpty(secondaryXAxisProps)) {
        chartProps.secondary_xAxisProps = secondaryXAxisProps;
    }
    if (!isEmpty(secondaryYAxisProps)) {
        chartProps.secondary_yAxisProps = secondaryYAxisProps;
    }
    return chartProps;
}
export const getPointPositions = (
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
point) => {
    const { dataLabel, graphic } = point;
    const labelRect = dataLabel.element.getBoundingClientRect();
    const shapeRect = graphic.element.getBoundingClientRect();
    return {
        shape: shapeRect,
        label: labelRect,
        labelPadding: dataLabel.padding,
        show: () => dataLabel.show(),
        hide: () => dataLabel.hide(),
    };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getShapeAttributes(point) {
    const { series, shapeArgs } = point;
    const { plotSizeX, plotSizeY, options } = series.chart;
    if (options.chart.type === VisualizationTypes.BAR) {
        return {
            x: Math.floor(plotSizeY - (shapeArgs.y - series.group.translateX) - shapeArgs.height),
            y: Math.ceil(plotSizeX + series.group.translateY - shapeArgs.x - shapeArgs.width),
            width: shapeArgs.height,
            height: shapeArgs.width,
        };
    }
    else if (options.chart.type === VisualizationTypes.COLUMN ||
        options.chart.type === VisualizationTypes.WATERFALL) {
        return {
            x: shapeArgs.x + series.group.translateX,
            y: shapeArgs.y + series.group.translateY,
            width: shapeArgs.width,
            height: shapeArgs.height,
        };
    }
    return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
}
function getExtremeOnAxis(min, max) {
    const axisMin = min >= 0 ? 0 : min;
    const axisMax = max < 0 ? 0 : max;
    return { axisMin, axisMax };
}
export function shouldFollowPointerForDualAxes(chartOptions) {
    var _a, _b, _c, _d, _e;
    const yAxes = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.yAxes) !== null && _a !== void 0 ? _a : [];
    if (yAxes.length <= 1) {
        return false;
    }
    const hasMinMaxValue = [
        (_b = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.yAxisProps) === null || _b === void 0 ? void 0 : _b.min,
        (_c = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.yAxisProps) === null || _c === void 0 ? void 0 : _c.max,
        (_d = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.secondary_yAxisProps) === null || _d === void 0 ? void 0 : _d.min,
        (_e = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.secondary_yAxisProps) === null || _e === void 0 ? void 0 : _e.max,
    ].some((item) => !isEmpty(item));
    return yAxes.length > 1 && hasMinMaxValue;
}
function isMinMaxLimitData(chartOptions, key) {
    var _a, _b, _c, _d;
    const yMin = parseFloat((_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[key]) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : "");
    const yMax = parseFloat((_d = (_c = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[key]) === null || _c === void 0 ? void 0 : _c.max) !== null && _d !== void 0 ? _d : "");
    if (isNaN(yMin) && isNaN(yMax)) {
        return false;
    }
    const { minDataValue, maxDataValue } = getDataExtremeDataValues(chartOptions);
    const { axisMin, axisMax } = getExtremeOnAxis(minDataValue, maxDataValue);
    return (!isNaN(yMax) && axisMax > yMax) || (!isNaN(yMin) && axisMin < yMin);
}
export function shouldFollowPointer(chartOptions) {
    if (shouldFollowPointerForDualAxes(chartOptions)) {
        return true;
    }
    return (isMinMaxLimitData(chartOptions, "yAxisProps") ||
        isMinMaxLimitData(chartOptions, "secondary_yAxisProps"));
}
function isSerieVisible(serie) {
    return serie.visible === undefined || serie.visible;
}
function getNonStackedMaxValue(series) {
    return series.reduce((maxValue, serie) => {
        if (isSerieVisible(serie)) {
            const maxSerieValue = getSerieMaxDataValue(serie.data);
            return maxValue > maxSerieValue ? maxValue : maxSerieValue;
        }
        return maxValue;
    }, Number.MIN_SAFE_INTEGER);
}
function getNonStackedMinValue(series) {
    return series.reduce((minValue, serie) => {
        if (isSerieVisible(serie)) {
            const minSerieValue = getSerieMinDataValue(serie.data);
            return minValue < minSerieValue ? minValue : minSerieValue;
        }
        return minValue;
    }, Number.MAX_SAFE_INTEGER);
}
function getDataExtremeDataValues(chartOptions) {
    var _a;
    const series = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _a === void 0 ? void 0 : _a.series;
    const maxDataValue = chartOptions.hasStackByAttribute
        ? getStackedMaxValue(series)
        : getNonStackedMaxValue(series);
    const minDataValue = chartOptions.hasStackByAttribute
        ? getStackedMinValue(series)
        : getNonStackedMinValue(series);
    return { minDataValue, maxDataValue };
}
function getSerieMaxDataValue(serieData) {
    const max = maxBy(serieData, (item) => ((item === null || item === void 0 ? void 0 : item.y) ? item.y : null));
    return max ? max.y : Number.MIN_SAFE_INTEGER;
}
function getSerieMinDataValue(serieData) {
    const min = minBy(serieData, (item) => ((item === null || item === void 0 ? void 0 : item.y) ? item.y : null));
    return min ? min.y : Number.MAX_SAFE_INTEGER;
}
export function getStackedMaxValue(series) {
    const maximumPerColumn = getColumnExtremeValue(series, getMaxFromPositiveNegativeStacks);
    const maxValue = max(maximumPerColumn);
    return !isNil(maxValue) ? maxValue : Number.MIN_SAFE_INTEGER;
}
export function getStackedMinValue(series) {
    const minimumPerColumn = getColumnExtremeValue(series, getMinFromPositiveNegativeStacks);
    const minValue = min(minimumPerColumn);
    return !isNil(minValue) ? minValue : Number.MAX_SAFE_INTEGER;
}
function getColumnExtremeValue(series, extremeColumnGetter) {
    const seriesDataPerColumn = zip(...series.filter(isSerieVisible).map((serie) => serie.data));
    const seriesDataYValue = seriesDataPerColumn.map((data) => data.map((x) => x.y));
    return seriesDataYValue.map(extremeColumnGetter);
}
function getMaxFromPositiveNegativeStacks(data) {
    return data.reduce((acc, current) => {
        if (isNil(current)) {
            return acc;
        }
        if (current < 0 || acc < 0) {
            return Math.max(acc, current);
        }
        return acc + current;
    }, Number.MIN_SAFE_INTEGER);
}
function getMinFromPositiveNegativeStacks(data) {
    return data.reduce((acc, current) => {
        if (isNil(current)) {
            return acc;
        }
        if (current > 0 || acc > 0) {
            return Math.min(acc, current);
        }
        return acc + current;
    }, Number.MAX_SAFE_INTEGER);
}
export function shouldStartOnTick(chartOptions, axisPropsKey = "yAxisProps") {
    var _a, _b, _c, _d, _e;
    const min = parseFloat((_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : "");
    const max = parseFloat((_d = (_c = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _c === void 0 ? void 0 : _c.max) !== null && _d !== void 0 ? _d : "");
    if (isNaN(min) && isNaN(max)) {
        return true;
    }
    if (!isNaN(min) && !isNaN(max)) {
        return min > max;
    }
    const series = (_e = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _e === void 0 ? void 0 : _e.series;
    const minDataValue = chartOptions.hasStackByAttribute
        ? getStackedMinValue(series)
        : getNonStackedMinValue(series);
    return !isNaN(max) && max <= minDataValue;
}
export function shouldEndOnTick(chartOptions, axisPropsKey = "yAxisProps") {
    var _a, _b, _c, _d, _e;
    const min = parseFloat((_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : "");
    const max = parseFloat((_d = (_c = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _c === void 0 ? void 0 : _c.max) !== null && _d !== void 0 ? _d : "");
    if (isNaN(min) && isNaN(max)) {
        return true;
    }
    if (!isNaN(min) && !isNaN(max)) {
        return min > max;
    }
    const series = (_e = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _e === void 0 ? void 0 : _e.series;
    const maxDataValue = chartOptions.hasStackByAttribute
        ? getStackedMaxValue(series)
        : getNonStackedMaxValue(series);
    return !isNaN(min) && min >= maxDataValue;
}
export function shouldXAxisStartOnTickOnBubbleScatter(chartOptions) {
    var _a, _b;
    const min = parseFloat((_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.xAxisProps) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : "");
    return isNaN(min) ? true : false;
}
export function shouldYAxisStartOnTickOnBubbleScatter(chartOptions) {
    var _a, _b, _c;
    const min = parseFloat((_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.yAxisProps) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : "");
    const series = (_c = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _c === void 0 ? void 0 : _c.series;
    const maxDataValue = getNonStackedMaxValue(series);
    return isNaN(min) || min > maxDataValue ? true : false;
}
export function getAxisRangeForAxes(chart) {
    const yAxis = chart.yAxis;
    // note: accessing 'opposite' prop which is not part of the public API; min & max is
    return yAxis
        .map((axis) => pick(axis, ["opposite", "min", "max"]))
        .map(({ opposite, min, max }) => ({ axis: opposite ? "second" : "first", min, max }))
        .reduce((result, { axis, min, max }) => {
        result[axis] = {
            minAxisValue: min,
            maxAxisValue: max,
        };
        return result;
    }, {});
}
export function pointInRange(pointValue, axisRange) {
    return axisRange.minAxisValue <= pointValue && pointValue <= axisRange.maxAxisValue;
}
export function alignChart(chart, verticalAlign = "middle") {
    const { container } = chart;
    if (!container) {
        return;
    }
    const { width: chartWidth, height: chartHeight } = container.getBoundingClientRect();
    const margin = chartHeight - chartWidth;
    const isVerticalRectContainer = margin > 0;
    const isAlignedToTop = verticalAlign === TOP;
    const isAlignedToBottom = verticalAlign === BOTTOM;
    const type = getChartType(chart);
    const className = `s-highcharts-${type}-aligned-to-${verticalAlign}`;
    let chartOptions = {};
    if (isVerticalRectContainer && verticalAlign !== MIDDLE) {
        chartOptions = {
            spacingTop: isAlignedToTop ? 0 : undefined,
            spacingBottom: isAlignedToBottom ? 0 : undefined,
            marginTop: isAlignedToBottom ? margin : undefined,
            marginBottom: isAlignedToTop ? margin : undefined,
            className,
        };
    }
    else {
        chartOptions = {
            spacingTop: undefined,
            spacingBottom: undefined,
            marginTop: undefined,
            marginBottom: undefined,
            className,
        };
    }
    chart.update({
        chart: chartOptions,
    }, false, false, false);
}
//# sourceMappingURL=helpers.js.map