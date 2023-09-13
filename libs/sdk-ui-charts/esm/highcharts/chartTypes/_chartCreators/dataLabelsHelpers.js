// (C) 2007-2023 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import isNil from "lodash/isNil.js";
import isArray from "lodash/isArray.js";
import { isStacked, isIntersecting, pointInRange, } from "./helpers.js";
import { isAreaChart, isBarChart, isColumnChart, isDependencyWheel, isOneOfTypes } from "../_util/common.js";
import { BLACK_LABEL, DATA_LABEL_C6, WHITE_LABEL, whiteDataLabelTypes } from "../../constants/label.js";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isLabelOverlappingItsShape(point) {
    const { dataLabel, shapeArgs } = point;
    if (dataLabel && shapeArgs) {
        // shapeArgs for point hidden by legend is undefined
        if (shapeArgs.width === undefined) {
            return dataLabel.width > shapeArgs.r * 2 || dataLabel.height > shapeArgs.r * 2;
        }
        return dataLabel.width > shapeArgs.width || dataLabel.height > shapeArgs.height;
    }
    return false;
}
export const getDataLabelsGdcVisible = (chart) => { var _a, _b, _c, _d, _e; return (_e = (_d = (_c = (_b = (_a = chart === null || chart === void 0 ? void 0 : chart.options) === null || _a === void 0 ? void 0 : _a.plotOptions) === null || _b === void 0 ? void 0 : _b.gdcOptions) === null || _c === void 0 ? void 0 : _c.dataLabels) === null || _d === void 0 ? void 0 : _d.visible) !== null && _e !== void 0 ? _e : "auto"; };
export const getDataLabelsGdcTotalsVisible = (chart) => { var _a, _b, _c, _d, _e; return (_e = (_d = (_c = (_b = (_a = chart === null || chart === void 0 ? void 0 : chart.options) === null || _a === void 0 ? void 0 : _a.plotOptions) === null || _b === void 0 ? void 0 : _b.gdcOptions) === null || _c === void 0 ? void 0 : _c.dataLabels) === null || _d === void 0 ? void 0 : _d.totalsVisible) !== null && _e !== void 0 ? _e : "auto"; };
const isLabelsStackedFromYAxis = (chart) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const yAxis = (_a = chart === null || chart === void 0 ? void 0 : chart.userOptions) === null || _a === void 0 ? void 0 : _a.yAxis;
    if (yAxis && isArray(yAxis)) {
        return ((_d = (_c = (_b = yAxis[0]) === null || _b === void 0 ? void 0 : _b.stackLabels) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : false) || ((_g = (_f = (_e = yAxis[1]) === null || _e === void 0 ? void 0 : _e.stackLabels) === null || _f === void 0 ? void 0 : _f.enabled) !== null && _g !== void 0 ? _g : false);
    }
    return false;
};
export const areLabelsStacked = (chart) => isLabelsStackedFromYAxis(chart) && isStacked(chart);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hasDataLabel = (point) => !!point.dataLabel;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hasShape = (point) => !!point.shapeArgs;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hasLabelInside = (point) => {
    var _a, _b, _c;
    const verticalAlign = (_c = (_b = (_a = point === null || point === void 0 ? void 0 : point.dataLabel) === null || _a === void 0 ? void 0 : _a.alignOptions) === null || _b === void 0 ? void 0 : _b.verticalAlign) !== null && _c !== void 0 ? _c : "";
    return verticalAlign === "middle";
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const minimizeDataLabel = (point) => {
    const { dataLabel } = point;
    if (dataLabel) {
        dataLabel.width = 0;
        dataLabel.height = 0;
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hideDataLabel = (point) => {
    const { dataLabel } = point;
    if (dataLabel) {
        dataLabel.hide();
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const showDataLabel = (point) => {
    const { dataLabel } = point;
    if (dataLabel) {
        dataLabel.show();
    }
};
export const hideDataLabels = (points) => {
    points.filter(hasDataLabel).forEach(hideDataLabel);
};
export const showDataLabels = (points) => {
    points.filter(hasDataLabel).forEach(showDataLabel);
};
export function showDataLabelInAxisRange(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
point, value, axisRangeForAxes) {
    var _a, _b, _c;
    const isSecondAxis = (_c = (_b = (_a = point === null || point === void 0 ? void 0 : point.series) === null || _a === void 0 ? void 0 : _a.yAxis) === null || _b === void 0 ? void 0 : _b.opposite) !== null && _c !== void 0 ? _c : false;
    const axisRange = axisRangeForAxes[isSecondAxis ? "second" : "first"];
    const isInsideAxisRange = pointInRange(value, axisRange);
    if (!isInsideAxisRange) {
        hideDataLabel(point);
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function showStackLabelInAxisRange(point, axisRangeForAxes) {
    var _a, _b, _c;
    const isSecondAxis = (_c = (_b = (_a = point.series) === null || _a === void 0 ? void 0 : _a.yAxis) === null || _b === void 0 ? void 0 : _b.opposite) !== null && _c !== void 0 ? _c : false;
    const axisRange = axisRangeForAxes[isSecondAxis ? "second" : "first"];
    const end = point.stackY || point.total;
    const start = end - point.y;
    const isWholeUnderMin = start <= axisRange.minAxisValue && end <= axisRange.minAxisValue;
    const isWholeAboveMax = start >= axisRange.maxAxisValue && end >= axisRange.maxAxisValue;
    if (isWholeUnderMin || isWholeAboveMax) {
        hideDataLabel(point);
    }
}
export const hideAllLabels = ({ series }) => hideDataLabels(flatMap(series, (s) => s.points));
export const showAllLabels = ({ series }) => showDataLabels(flatMap(series, (s) => s.points));
export function setStackVisibilityByOpacity(stackTotalGroup, visible) {
    stackTotalGroup.attr({ opacity: visible ? 1 : 0 });
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getDataLabelAttributes(point) {
    var _a, _b, _c;
    const dataLabel = (_a = point === null || point === void 0 ? void 0 : point.dataLabel) !== null && _a !== void 0 ? _a : null;
    const parentGroup = (_c = (_b = point === null || point === void 0 ? void 0 : point.dataLabel) === null || _b === void 0 ? void 0 : _b.parentGroup) !== null && _c !== void 0 ? _c : null;
    const labelSafeOffset = -100; // labels outside axis range have typically -9999, hide them
    const labelVisible = dataLabel && dataLabel.x > labelSafeOffset && dataLabel.y > labelSafeOffset;
    if (dataLabel && parentGroup && labelVisible) {
        return {
            x: dataLabel.x + parentGroup.translateX,
            y: dataLabel.y + parentGroup.translateY,
            width: dataLabel.width,
            height: dataLabel.height,
        };
    }
    return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function intersectsParentLabel(point, points) {
    const pointParent = parseInt(point.parent, 10);
    // Highchart 7 doesn't render dataLabel at points which have null value
    const pointLabelShape = point.dataLabel;
    if (isNaN(pointParent) || !pointLabelShape) {
        return false;
    }
    const parentPoint = points[pointParent];
    const parentLabelShape = parentPoint.dataLabel;
    return isIntersecting(pointLabelShape, parentLabelShape);
}
function isTruncatedByMin(shape, chart) {
    return shape.y + shape.height > chart.clipBox.height;
}
function isTruncatedByMax(shape) {
    return shape.y < 0;
}
// works for both column/bar chart thanks bar's 90deg rotation
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getShapeVisiblePart(shape, chart, wholeSize) {
    if (isTruncatedByMax(shape)) {
        return shape.y + shape.height;
    }
    else if (isTruncatedByMin(shape, chart)) {
        return chart.clipBox.height - shape.y;
    }
    return wholeSize;
}
export function getLabelStyle(type, stacking) {
    if (isAreaChart(type)) {
        return BLACK_LABEL;
    }
    if (isDependencyWheel(type)) {
        return Object.assign(Object.assign({}, DATA_LABEL_C6), { fontWeight: "400" });
    }
    return stacking || isOneOfTypes(type, whiteDataLabelTypes) ? WHITE_LABEL : BLACK_LABEL;
}
/**
 * A callback function to format data label and `this` is required by Highchart
 * Ref: https://api.highcharts.com/highcharts/yAxis.labels.formatter
 */
export function formatAsPercent(unit = 100) {
    const val = parseFloat((this.value * unit).toPrecision(14));
    return `${val}%`;
}
export function isInPercent(format = "") {
    return format.includes("%");
}
// returns totalVisible based on the current conditions
// it returns auto in case of missing chartConfig and not being requested in context of barchart
export function getTotalsVisibility(chartConfig) {
    var _a, _b;
    const totalsVisibility = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _a === void 0 ? void 0 : _a.totalsVisible;
    if (!isNil(totalsVisibility)) {
        return totalsVisibility;
    }
    return (_b = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _b === void 0 ? void 0 : _b.visible;
}
export function getTotalsVisibilityConfig(type, chartConfig) {
    var _a, _b, _c;
    if (!(isColumnChart(type) || isBarChart(type))) {
        return {};
    }
    const totalsVisible = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _a === void 0 ? void 0 : _a.totalsVisible;
    // it configures logic for previous barchart generation without total labels
    if (isBarChart(type) &&
        (!totalsVisible || isNil(totalsVisible)) &&
        !chartConfig.enableSeparateTotalLabels) {
        return { enabled: false };
    }
    const defaultTotalsVisibility = isNil((_b = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _b === void 0 ? void 0 : _b.visible)
        ? "auto"
        : (_c = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.dataLabels) === null || _c === void 0 ? void 0 : _c.visible;
    return getLabelsVisibilityConfig(!isNil(totalsVisible) ? totalsVisible : defaultTotalsVisibility);
}
export function getLabelsVisibilityConfig(visible) {
    switch (visible) {
        case "auto":
            return {
                enabled: true,
                allowOverlap: false,
            };
        case true:
            return {
                enabled: true,
                allowOverlap: true,
            };
        case false:
            return {
                enabled: false,
            };
        default:
            // keep decision on each chart for `undefined`
            return {};
    }
}
//# sourceMappingURL=dataLabelsHelpers.js.map