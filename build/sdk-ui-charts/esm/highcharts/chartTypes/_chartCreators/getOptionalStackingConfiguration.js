// (C) 2007-2023 GoodData Corporation
import partial from "lodash/partial.js";
import merge from "lodash/merge.js";
import includes from "lodash/includes.js";
import isNil from "lodash/isNil.js";
import set from "lodash/set.js";
import isArray from "lodash/isArray.js";
import { formatAsPercent, getLabelStyle, getTotalsVisibilityConfig } from "./dataLabelsHelpers.js";
import { getPrimaryChartType, isInvertedChartType, isColumnChart, isComboChart, isLineChart, isBarChart, } from "../_util/common.js";
import { canComboChartBeStackedInPercent } from "../comboChart/comboChartOptions.js";
import { isPrimaryYAxis } from "./isPrimaryYAxis.js";
import { supportedStackingAttributesChartTypes } from "../_chartOptions/chartCapabilities.js";
/**
 * Set 'normal' stacking config to single series which will overwrite config in 'plotOptions.series'
 */
function handleStackMeasure(stackMeasures, seriesItem) {
    return stackMeasures
        ? Object.assign(Object.assign({}, seriesItem), { stacking: "normal", stack: seriesItem.yAxis }) : seriesItem;
}
/**
 * Set 'percent' stacking config to single series which will overwrite config in 'plotOptions.series'
 */
function handleStackMeasuresToPercent(stackMeasuresToPercent, seriesItem) {
    return stackMeasuresToPercent
        ? Object.assign(Object.assign({}, seriesItem), { stacking: "percent", stack: seriesItem.yAxis }) : seriesItem;
}
function getStackingValue(chartOptions, seriesItem) {
    const { yAxes, type } = chartOptions;
    const { stacking, yAxis } = seriesItem;
    const seriesChartType = seriesItem.type || type;
    const defaultStackingValue = isComboChart(type) ? null : "normal";
    return isPrimaryYAxis(yAxes[yAxis]) && !isLineChart(seriesChartType) ? stacking : defaultStackingValue;
}
function handleDualAxis(chartOptions, seriesItem) {
    const { yAxes, type } = chartOptions;
    const isDualAxis = yAxes.length === 2;
    if (!isDualAxis && !isComboChart(type)) {
        return seriesItem;
    }
    const { stacking } = seriesItem;
    // highcharts stack config
    // percent stack is only applied to primary Y axis
    const hcStackingConfig = stacking ? { stacking: getStackingValue(chartOptions, seriesItem) } : {};
    return Object.assign(Object.assign({}, seriesItem), hcStackingConfig);
}
function handleLabelStyle(chartOptions, seriesItem) {
    if (!isComboChart(chartOptions.type)) {
        return seriesItem;
    }
    const { type, stacking } = seriesItem;
    return Object.assign(Object.assign({}, seriesItem), { dataLabels: {
            style: getLabelStyle(type, stacking),
        } });
}
function countMeasuresInSeries(series) {
    return series.reduce((result, seriesItem) => {
        result[seriesItem.yAxis] += 1;
        return result;
    }, [0, 0]);
}
/**
 * For y axis having one series, this series should be removed stacking config
 */
export function getSanitizedStackingForSeries(series) {
    const [primaryMeasuresNum, secondaryMeasuresNum] = countMeasuresInSeries(series);
    /**
     * stackMeasures is applied for both measures in each axis
     * stackMeasuresToPercent is applied for
     * - [measures on primary   y-axis only] or
     * - [measures on secondary y-axis only] or
     * - [applied for measures on primary y-axis + ignore for measures on secondary y-axis]
     */
    // has measures on both [primary y-axis] and [secondary y-axis]
    if (primaryMeasuresNum > 0 && secondaryMeasuresNum > 0) {
        return series.map((seriesItem) => {
            // seriesItem is on [secondary y-axis]
            if (seriesItem.yAxis === 1) {
                return Object.assign(Object.assign({}, seriesItem), { stack: null, 
                    // reset stackMeasuresToPercent in this case (stacking: PERCENT_STACK)
                    stacking: seriesItem.stacking ? "normal" : null });
            }
            else {
                return seriesItem;
            }
        });
    }
    // has [measures on primary y-axis only] or [measures on secondary y-axis only]
    return series;
}
function getSeriesConfiguration(chartOptions, config, stackMeasures, stackMeasuresToPercent) {
    const { series } = config;
    const handlers = [
        partial(handleStackMeasure, stackMeasures),
        partial(handleStackMeasuresToPercent, stackMeasuresToPercent),
        partial(handleDualAxis, chartOptions),
        partial(handleLabelStyle, chartOptions),
    ];
    // get series with stacking config
    const seriesWithStackingConfig = series.map((seriesItem) => handlers.reduce((result, handler) => handler(result), seriesItem));
    return {
        series: getSanitizedStackingForSeries(seriesWithStackingConfig),
    };
}
export function getYAxisConfiguration(chartOptions, config, chartConfig) {
    const type = getPrimaryChartType(chartOptions);
    let yAxis;
    yAxis = config.yAxis;
    if (!isArray(yAxis)) {
        yAxis = [yAxis];
    }
    const { stackMeasuresToPercent = false } = chartConfig;
    // only supports column & bar charts
    if (!isColumnChart(type) && !isBarChart(type)) {
        return {};
    }
    const { enabled: stackingDataLabelEnabled } = getTotalsVisibilityConfig(type, chartConfig);
    const yAxisWithStackLabel = yAxis.map((axis, index) => {
        // disable stack labels for primary Y axis when there is 'Stack to 100%' on
        const stackLabelEnabled = (index !== 0 || !stackMeasuresToPercent) && !!stackingDataLabelEnabled;
        return Object.assign(Object.assign({}, axis), { stackLabels: {
                enabled: stackLabelEnabled,
            } });
    });
    return { yAxis: yAxisWithStackLabel };
}
/**
 * Set config to highchart for 'Stack Measures' and 'Stack to 100%'
 */
export function getStackMeasuresConfiguration(chartOptions, config, chartConfig) {
    var _a, _b;
    const { stackMeasures = false, stackMeasuresToPercent = false } = chartConfig;
    const canStackInPercent = canComboChartBeStackedInPercent((_b = (_a = chartOptions.data) === null || _a === void 0 ? void 0 : _a.series) !== null && _b !== void 0 ? _b : []);
    if (!stackMeasures && !stackMeasuresToPercent) {
        return {};
    }
    return Object.assign(Object.assign({}, getSeriesConfiguration(chartOptions, config, stackMeasures, stackMeasuresToPercent && canStackInPercent)), getYAxisConfiguration(chartOptions, config, chartConfig));
}
/**
 * Add style to X axis in case of 'grouped-categories'
 */
export function getParentAttributeConfiguration(chartOptions, config, chartConfig) {
    var _a;
    const { type } = chartOptions;
    const { xAxis } = config;
    if (!isArray(xAxis)) {
        throw new Error("Wrong chart configuration. Expected axis as an array in case of grouped categories.");
    }
    const xAxisItem = xAxis[0];
    // parent attribute in X axis
    const parentAttributeOptions = {};
    // only apply font-weight to parent label
    set(parentAttributeOptions, "style", {
        fontWeight: "bold",
    });
    if (isInvertedChartType(type, (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.orientation) === null || _a === void 0 ? void 0 : _a.position)) {
        // distance more 5px for two groups of attributes for bar chart
        set(parentAttributeOptions, "x", -5);
    }
    // 'groupedOptions' is custom property in 'grouped-categories' plugin
    set(xAxisItem, "labels.groupedOptions", [parentAttributeOptions]);
    return { xAxis: [xAxisItem] };
}
export function setDrillConfigToXAxis(drillConfig) {
    return { xAxis: [{ drillConfig }] };
}
/**
 * Format labels in Y axis from '0 - 100' to '0% - 100%'
 * Only applied when measure/series in Y axis more than one
 */
export function getShowInPercentConfiguration(chartOptions = {}, chartConfig, _config = {}) {
    var _a;
    const { stackMeasuresToPercent = false, primaryChartType } = chartConfig;
    const canStackInPercent = canComboChartBeStackedInPercent((_a = chartOptions.data) === null || _a === void 0 ? void 0 : _a.series);
    if (!canStackInPercent || !stackMeasuresToPercent || isLineChart(primaryChartType)) {
        return {};
    }
    const { yAxes = [], type } = chartOptions;
    const percentageFormatter = partial(formatAsPercent, 1);
    // suppose that max number of y axes is 2
    // percentage format only supports primary axis
    const yAxis = yAxes.map((axis, index) => {
        if (index !== 0 || (isComboChart(type) && !isPrimaryYAxis(axis))) {
            return {};
        }
        return {
            labels: {
                formatter: percentageFormatter,
            },
        };
    });
    return { yAxis };
}
/**
 * Convert [0, 1] to [0, 100], it's needed by highchart
 * Only applied to primary Y axis
 */
export function convertMinMaxFromPercentToNumber(_chartOptions, config, chartConfig) {
    const { stackMeasuresToPercent = false } = chartConfig;
    if (!stackMeasuresToPercent) {
        return {};
    }
    let yAxes;
    yAxes = config.yAxis;
    if (!isArray(yAxes)) {
        yAxes = [yAxes];
    }
    const yAxis = yAxes.map((axis, _, axes) => {
        const { min, max } = axis;
        const newAxis = {};
        if (!isNil(min)) {
            set(newAxis, "min", min * 100);
        }
        if (!isNil(max)) {
            set(newAxis, "max", max * 100);
        }
        const numberOfAxes = axes.length;
        if (numberOfAxes === 1) {
            return newAxis;
        }
        const { opposite = false } = axis;
        return opposite ? {} : newAxis;
    });
    return { yAxis };
}
export default function getOptionalStackingConfiguration(chartOptions, config, chartConfig = {}, drillConfig) {
    const { type } = chartOptions;
    return includes(supportedStackingAttributesChartTypes, type)
        ? merge({}, setDrillConfigToXAxis(drillConfig), getParentAttributeConfiguration(chartOptions, config, chartConfig), getStackMeasuresConfiguration(chartOptions, config, chartConfig), getShowInPercentConfiguration(chartOptions, chartConfig, config), convertMinMaxFromPercentToNumber(chartOptions, config, chartConfig))
        : {};
}
//# sourceMappingURL=getOptionalStackingConfiguration.js.map