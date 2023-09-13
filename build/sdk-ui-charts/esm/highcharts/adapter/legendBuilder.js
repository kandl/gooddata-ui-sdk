import pick from "lodash/pick.js";
import set from "lodash/set.js";
import { isAreaChart, isBubbleChart, isComboChart, isHeatmap, isLineChart, isOneOfTypes, isSankeyOrDependencyWheel, isScatterPlot, isTreemap, isWaterfall, } from "../chartTypes/_util/common.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { isStackedChart, getComboChartSeries, createDualAxesSeriesMapper, createWaterfallLegendItems, } from "./legendHelpers.js";
import { supportedDualAxesChartTypes } from "../chartTypes/_chartOptions/chartCapabilities.js";
import { DEFAULT_LEGEND_CONFIG, } from "@gooddata/sdk-ui-vis-commons";
function isHeatmapWithMultipleValues(chartOptions) {
    var _a, _b;
    const { type } = chartOptions;
    const dataClasses = (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.colorAxis) === null || _a === void 0 ? void 0 : _a.dataClasses) !== null && _b !== void 0 ? _b : [];
    return isHeatmap(type) && dataClasses.length > 1;
}
export function shouldLegendBeEnabled(chartOptions) {
    var _a, _b;
    const seriesLength = (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.data) === null || _a === void 0 ? void 0 : _a.series) === null || _b === void 0 ? void 0 : _b.length;
    const { type, hasStackByAttribute, hasViewByAttribute } = chartOptions;
    const hasMoreThanOneSeries = seriesLength > 1;
    const isLineChartStacked = isLineChart(type) && hasStackByAttribute;
    const isStacked = isStackedChart(chartOptions);
    const sliceTypes = [
        VisualizationTypes.PIE,
        VisualizationTypes.DONUT,
        VisualizationTypes.PYRAMID,
        VisualizationTypes.FUNNEL,
        VisualizationTypes.SANKEY,
        VisualizationTypes.DEPENDENCY_WHEEL,
    ];
    const isSliceChartWithViewByAttributeOrMultipleMeasures = isOneOfTypes(type, sliceTypes) && (hasViewByAttribute || chartOptions.data.series[0].data.length > 1);
    const isBubbleWithViewByAttribute = isBubbleChart(type) && hasViewByAttribute;
    const isScatterPlotWithAttribute = isScatterPlot(type) && chartOptions.data.series[0].name;
    const isTreemapWithViewByAttribute = isTreemap(type) && hasViewByAttribute;
    const isTreemapWithManyCategories = isTreemap(type) && chartOptions.data.categories.length > 1;
    const isSankeyChart = isSankeyOrDependencyWheel(type);
    const isWaterfallChart = isWaterfall(type);
    return (hasMoreThanOneSeries ||
        isSliceChartWithViewByAttributeOrMultipleMeasures ||
        isStacked ||
        isLineChartStacked ||
        isScatterPlotWithAttribute ||
        isTreemapWithViewByAttribute ||
        isBubbleWithViewByAttribute ||
        isTreemapWithManyCategories ||
        isSankeyChart ||
        isWaterfallChart ||
        isHeatmapWithMultipleValues(chartOptions));
}
export function getLegendItems(chartOptions, intl) {
    var _a, _b;
    const { type } = chartOptions;
    const firstSeriesDataTypes = [
        VisualizationTypes.PIE,
        VisualizationTypes.DONUT,
        VisualizationTypes.TREEMAP,
        VisualizationTypes.FUNNEL,
        VisualizationTypes.PYRAMID,
        VisualizationTypes.SCATTER,
    ];
    if (isHeatmap(type)) {
        const dataClasses = (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.colorAxis) === null || _a === void 0 ? void 0 : _a.dataClasses) !== null && _b !== void 0 ? _b : [];
        return dataClasses.map((dataClass, index) => {
            const { from, to } = dataClass;
            const color = dataClass.color; // wa are not using Gradient
            const range = {
                from,
                to,
            };
            return {
                range,
                color,
                legendIndex: index,
            };
        });
    }
    if (isSankeyOrDependencyWheel(type)) {
        return chartOptions.data.series[0].nodes.map((it, index) => {
            return {
                name: it.id,
                color: it.color,
                legendIndex: index,
            };
        });
    }
    if (isWaterfall(type)) {
        return createWaterfallLegendItems(chartOptions, intl);
    }
    const legendDataSource = isOneOfTypes(type, firstSeriesDataTypes)
        ? chartOptions.data.series[0].data
        : chartOptions.data.series;
    let pickedProps = ["name", "color", "legendIndex"];
    if (isOneOfTypes(type, supportedDualAxesChartTypes)) {
        // 'yAxis' helps to distinguish primary and secondary axes
        pickedProps = [...pickedProps, "yAxis"];
    }
    if (isComboChart(type)) {
        pickedProps = [...pickedProps, "type"];
    }
    return legendDataSource
        .filter((legendDataSourceItem) => legendDataSourceItem.showInLegend !== false)
        .map((legendDataSourceItem) => pick(legendDataSourceItem, pickedProps));
}
export default function buildLegendOptions(legendConfig = {}, chartOptions, intl) {
    var _a, _b;
    const defaultLegendConfigByType = {};
    const rightLegendCharts = [
        VisualizationTypes.SCATTER,
        VisualizationTypes.TREEMAP,
        VisualizationTypes.BUBBLE,
        VisualizationTypes.HEATMAP,
        VisualizationTypes.FUNNEL,
        VisualizationTypes.PYRAMID,
        VisualizationTypes.SANKEY,
        VisualizationTypes.DEPENDENCY_WHEEL,
    ];
    const defaultTopLegendCharts = [
        VisualizationTypes.COLUMN,
        VisualizationTypes.BAR,
        VisualizationTypes.BULLET,
        VisualizationTypes.LINE,
        VisualizationTypes.AREA,
        VisualizationTypes.PIE,
        VisualizationTypes.DONUT,
        VisualizationTypes.WATERFALL,
    ];
    const defaultHideLegendCharts = [
        VisualizationTypes.SANKEY,
        VisualizationTypes.DEPENDENCY_WHEEL,
        VisualizationTypes.WATERFALL,
    ];
    if (legendConfig.position === "auto" || !legendConfig.position) {
        if (isOneOfTypes(chartOptions.type, rightLegendCharts)) {
            set(defaultLegendConfigByType, "position", "right");
        }
        if (isOneOfTypes(chartOptions.type, defaultTopLegendCharts) && !chartOptions.hasStackByAttribute) {
            set(defaultLegendConfigByType, "position", "top");
        }
    }
    if ((legendConfig.enabled === undefined || legendConfig.enabled === null) &&
        isOneOfTypes(chartOptions.type, defaultHideLegendCharts)) {
        set(defaultLegendConfigByType, "enabled", false);
    }
    const baseConfig = Object.assign(Object.assign(Object.assign({}, DEFAULT_LEGEND_CONFIG), legendConfig), defaultLegendConfigByType);
    const isLegendEnabled = shouldLegendBeEnabled(chartOptions);
    return Object.assign(Object.assign({}, baseConfig), { enabled: baseConfig.enabled && isLegendEnabled, toggleEnabled: isLegendEnabled, format: (_b = (_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.title) === null || _a === void 0 ? void 0 : _a.format) !== null && _b !== void 0 ? _b : "", items: getLegendItems(chartOptions, intl), enableBorderRadius: createItemBorderRadiusPredicate(chartOptions.type), seriesMapper: createSeriesMapper(chartOptions.type) });
}
/**
 * Given chart type, this creates predicate to turn legend item border radius on or off. The border
 * radius is set to make legend item indicators appear as circles instead of squares.
 *
 * The predicate is crafted so that line and area charts have indicators as circles. This also stands for
 * combo chart - line or area items within combo must use circles.
 *
 * @param chartType - top-level chart type (combo chart will have legend items of different types)
 */
function createItemBorderRadiusPredicate(chartType) {
    if (isLineChart(chartType) || isAreaChart(chartType)) {
        /*
         * It is clear that all items are of same type and should have indicators as circles.
         */
        return true;
    }
    else if (isComboChart(chartType)) {
        /*
         * For combo chart, determine item-by-item
         */
        return (item) => {
            return isLineChart(item.type) || isAreaChart(item.type);
        };
    }
    return false;
}
/**
 * Given chart type, this function creates a series mapper which will alter previously created legend
 * items. This code was previously insight the legend implementation. It is extracted here to make legends
 * visualization agnostic.
 *
 * The big question is - why is this mapper even needed, why not creating the legend items correctly the first time?
 * It is likely that the code was glued-in while implementing combo and dual axes charts. Perhaps better way is to
 * refactor the legend builders (which can be chart-specific) to create the legend items correctly.
 */
function createSeriesMapper(chartType) {
    if (isComboChart(chartType)) {
        return getComboChartSeries;
    }
    return createDualAxesSeriesMapper(chartType);
}
//# sourceMappingURL=legendBuilder.js.map