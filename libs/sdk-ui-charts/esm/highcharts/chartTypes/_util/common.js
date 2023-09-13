// (C) 2007-2023 GoodData Corporation
import clone from "lodash/clone.js";
import includes from "lodash/includes.js";
import isNil from "lodash/isNil.js";
import setWith from "lodash/setWith.js";
import { ClientFormatterFacade } from "@gooddata/number-formatter";
import escape from "lodash/escape.js";
import isEqual from "lodash/fp/isEqual.js";
import unescape from "lodash/unescape.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { DEFAULT_DECIMAL_SEPARATOR } from "../../constants/format.js";
export function parseValue(value) {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue;
}
export const immutableSet = (dataSet, path, newValue) => setWith(Object.assign({}, dataSet), path, newValue, clone);
export const repeatItemsNTimes = (array, n) => new Array(n).fill(null).reduce((result) => {
    result.push(...array);
    return result;
}, []);
export const unEscapeAngleBrackets = (str) => str === null || str === void 0 ? void 0 : str.replace(/&lt;|&#60;/g, "<").replace(/&gt;|&#62;/g, ">");
export function isRotationInRange(rotation, min, max) {
    return rotation >= min && rotation <= max;
}
/**
 * @internal
 */
export const isColumnChart = isEqual(VisualizationTypes.COLUMN);
/**
 * @internal
 */
export const isBarChart = isEqual(VisualizationTypes.BAR);
/**
 * @internal
 */
export const isBulletChart = isEqual(VisualizationTypes.BULLET);
/**
 * @internal
 */
export const isLineChart = isEqual(VisualizationTypes.LINE);
/**
 * @internal
 */
export const isScatterPlot = isEqual(VisualizationTypes.SCATTER);
/**
 * @internal
 */
export const isPieChart = isEqual(VisualizationTypes.PIE);
/**
 * @internal
 */
export const isDonutChart = isEqual(VisualizationTypes.DONUT);
/**
 * @internal
 */
export const isPieOrDonutChart = (type) => isPieChart(type) || isDonutChart(type);
/**
 * @internal
 */
export const isAreaChart = isEqual(VisualizationTypes.AREA);
/**
 * @internal
 */
export const isBubbleChart = isEqual(VisualizationTypes.BUBBLE);
/**
 * @internal
 */
export const isComboChart = (type) => isEqual(type, VisualizationTypes.COMBO) || isEqual(type, VisualizationTypes.COMBO2);
/**
 * @internal
 */
export const isTreemap = isEqual(VisualizationTypes.TREEMAP);
/**
 * @internal
 */
export const isHeatmap = isEqual(VisualizationTypes.HEATMAP);
/**
 * @internal
 */
export const isFunnel = isEqual(VisualizationTypes.FUNNEL);
/**
 * @internal
 */
export const isPyramid = isEqual(VisualizationTypes.PYRAMID);
/**
 * @internal
 */
export const isSankey = isEqual(VisualizationTypes.SANKEY);
/**
 * @internal
 */
export const isDependencyWheel = isEqual(VisualizationTypes.DEPENDENCY_WHEEL);
/**
 * @internal
 */
export const isSankeyOrDependencyWheel = (type) => isSankey(type) || isDependencyWheel(type);
/**
 * @internal
 */
export const isWaterfall = isEqual(VisualizationTypes.WATERFALL);
/**
 * @internal
 */
export const isSupportingJoinedAttributeAxisName = (type) => isBarChart(type) || isColumnChart(type) || isBulletChart(type);
/**
 * @internal
 */
export const isInvertedChartType = (type, orientationPosition) => isBarChart(type) || isBulletChart(type) || (isWaterfall(type) && orientationPosition === "vertical");
export const isChartSupported = (type) => includes(VisualizationTypes, type);
export const isOneOfTypes = (type, types) => includes(types, type);
export const stringifyChartTypes = () => Object.keys(VisualizationTypes)
    .reduce((acc, type) => {
    acc.push(VisualizationTypes[type]);
    return acc;
}, [])
    .join(", ");
export function formatLegendLabel(value, format, diff, numericSymbols) {
    if (format === null || format === void 0 ? void 0 : format.includes("%")) {
        return ClientFormatterFacade.formatValue(value, "#,#0%", undefined).formattedValue;
    }
    const sign = Math.sign(value) === -1 ? "-" : "";
    const positiveValue = Math.abs(value);
    let formattingString = "";
    if (diff < 10) {
        formattingString += "[<1]0.00;[<10]#.#;[<100]#.#;";
    }
    const k = diff < 10000
        ? "[<999500]0;"
        : `[<1000]0;[<10000]#.#,${numericSymbols[0]};[<999500]#,${numericSymbols[0]};`;
    const m = `[<10000000]#.#,,${numericSymbols[1]};[<999500000]#,,${numericSymbols[1]};`;
    const b = `[<10000000000]#.#,,,${numericSymbols[2]};[<999500000000]#,,,${numericSymbols[2]};`;
    const t = `[<10000000000000]#.#,,,${numericSymbols[3]};[>=10000000000000]#,,,${numericSymbols[3]}`;
    formattingString += k + m + b + t;
    const formatted = ClientFormatterFacade.formatValue(positiveValue, formattingString, undefined).formattedValue;
    return sign + formatted;
}
export const getPrimaryChartType = (chartOptions) => {
    var _a, _b, _c;
    const series = (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _a === void 0 ? void 0 : _a.series) !== null && _b !== void 0 ? _b : [];
    const targetSeries = series.find((item) => item.yAxis === 0);
    return (_c = targetSeries === null || targetSeries === void 0 ? void 0 : targetSeries.type) !== null && _c !== void 0 ? _c : chartOptions.type;
};
export const unwrap = (wrappedObject) => {
    return wrappedObject[Object.keys(wrappedObject)[0]];
};
const getNumberWithGivenDecimals = (value, decimalNumbers) => decimalNumbers === 0 ? `${Math.round(value)}%` : `${parseFloat(value.toFixed(decimalNumbers))}%`;
// it calculates number of decimals from default format that contains ',' and '.' as separators
const getNumberOfDecimalsFromDefaultFormat = (format) => {
    const splittedFormat = format.split(DEFAULT_DECIMAL_SEPARATOR);
    if (splittedFormat.length !== 2) {
        return 0;
    }
    return Array.from(splittedFormat[1]).reduce((numberOfDecimals, letter) => (letter === "0" ? numberOfDecimals + 1 : numberOfDecimals), 0);
};
export function percentFormatter(value, format) {
    if (isNil(value)) {
        return "";
    }
    const isPercentageFormat = format && format.trim().slice(-1) === "%";
    const numberOfDecimals = isPercentageFormat ? getNumberOfDecimalsFromDefaultFormat(format) : 2;
    return getNumberWithGivenDecimals(value, numberOfDecimals);
}
export const isCssMultiLineTruncationSupported = () => {
    // support -webkit-line-clamp
    return "webkitLineClamp" in document.body.style;
};
export const customEscape = (str) => str && escape(unescape(str));
export const getAxesCounts = (config) => {
    var _a, _b, _c, _d;
    const hasSecondaryXAxis = config.secondary_xaxis && ((_b = (_a = config.secondary_xaxis) === null || _a === void 0 ? void 0 : _a.measures) === null || _b === void 0 ? void 0 : _b.length) !== 0;
    const hasSecondaryYAxis = config.secondary_yaxis && ((_d = (_c = config.secondary_yaxis) === null || _c === void 0 ? void 0 : _c.measures) === null || _d === void 0 ? void 0 : _d.length) !== 0;
    return [hasSecondaryXAxis ? 2 : 1, hasSecondaryYAxis ? 2 : 1];
};
//# sourceMappingURL=common.js.map