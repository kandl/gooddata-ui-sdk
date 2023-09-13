import { isAreaChart, isComboChart } from "../_util/common.js";
const removeStacking = (series) => series.map((seriesItem) => seriesItem.type && !isAreaChart(seriesItem.type)
    ? seriesItem
    : Object.assign(Object.assign({}, seriesItem), { stack: null, stacking: null }));
export function getContinuousLineConfiguration(chartOptions, config, chartConfig) {
    var _a, _b;
    const isContinuousLineEnabled = (_b = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.continuousLine) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : false;
    if (!isContinuousLineEnabled || (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.stackMeasures)) {
        return {};
    }
    const { type } = chartOptions;
    const series = config === null || config === void 0 ? void 0 : config.series;
    // remove the stack configuration for the Combo|Area chart
    const sanitizedSeries = isComboChart(type) || isAreaChart(type) ? removeStacking(series) : series;
    return {
        plotOptions: {
            series: {
                connectNulls: isContinuousLineEnabled,
            },
        },
        series: sanitizedSeries,
    };
}
//# sourceMappingURL=getContinuousLineConfiguration.js.map