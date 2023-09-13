import { VisualizationTypes } from "@gooddata/sdk-ui";
import { DEFAULT_CATEGORIES_LIMIT, DEFAULT_DATA_POINTS_LIMIT, DEFAULT_SERIES_LIMIT, } from "../_chartCreators/commonConfiguration.js";
import { HEATMAP_DATA_POINTS_LIMIT, PIE_CHART_LIMIT, SANKEY_CHART_DATA_POINT_LIMIT, SANKEY_CHART_NODE_LIMIT, WATERFALL_CHART_DATA_POINT_LIMIT, } from "../../constants/limits.js";
import { isOneOfTypes, isTreemap } from "../_util/common.js";
import { unsupportedNegativeValuesTypes } from "./chartCapabilities.js";
import { isDataOfReasonableSize } from "../_chartCreators/highChartsCreators.js";
export function isNegativeValueIncluded(series) {
    return series.some((seriesItem) => (seriesItem.data || []).some(({ y, value, weight }) => y < 0 || value < 0 || weight < 0));
}
function getChartLimits(type) {
    switch (type) {
        case VisualizationTypes.SCATTER:
            return {
                series: DEFAULT_SERIES_LIMIT,
                categories: DEFAULT_SERIES_LIMIT,
            };
        case VisualizationTypes.PIE:
        case VisualizationTypes.DONUT:
        case VisualizationTypes.FUNNEL:
        case VisualizationTypes.PYRAMID:
            return {
                series: 1,
                categories: PIE_CHART_LIMIT,
            };
        case VisualizationTypes.TREEMAP:
            return {
                series: DEFAULT_SERIES_LIMIT,
                categories: DEFAULT_DATA_POINTS_LIMIT,
                dataPoints: DEFAULT_DATA_POINTS_LIMIT,
            };
        case VisualizationTypes.HEATMAP:
            return {
                series: DEFAULT_SERIES_LIMIT,
                categories: DEFAULT_CATEGORIES_LIMIT,
                dataPoints: HEATMAP_DATA_POINTS_LIMIT,
            };
        case VisualizationTypes.SANKEY:
        case VisualizationTypes.DEPENDENCY_WHEEL:
            return {
                series: 1,
                nodes: SANKEY_CHART_NODE_LIMIT,
                dataPoints: SANKEY_CHART_DATA_POINT_LIMIT,
            };
        case VisualizationTypes.WATERFALL:
            return {
                series: 1,
                categories: WATERFALL_CHART_DATA_POINT_LIMIT,
                dataPoints: WATERFALL_CHART_DATA_POINT_LIMIT,
            };
        default:
            return {
                series: DEFAULT_SERIES_LIMIT,
                categories: DEFAULT_CATEGORIES_LIMIT,
            };
    }
}
export function cannotShowNegativeValues(type) {
    return isOneOfTypes(type, unsupportedNegativeValuesTypes);
}
function getTreemapDataForValidation(data) {
    // filter out root nodes
    return Object.assign(Object.assign({}, data), { series: data.series.map((serie) => (Object.assign(Object.assign({}, serie), { data: serie.data.filter((dataItem) => dataItem.id === undefined) }))) });
}
export function validateData(limits, chartOptions) {
    const { type, isViewByTwoAttributes } = chartOptions;
    const finalLimits = limits || getChartLimits(type);
    let dataToValidate = chartOptions.data;
    if (isTreemap(type)) {
        dataToValidate = getTreemapDataForValidation(chartOptions.data);
    }
    return {
        dataTooLarge: !isDataOfReasonableSize(dataToValidate, finalLimits, isViewByTwoAttributes),
        hasNegativeValue: cannotShowNegativeValues(type) && isNegativeValueIncluded(chartOptions.data.series),
    };
}
/**
 * Creates a message for onDataTooLarge error, which contains the limits which were exceeded.
 */
export function getDataTooLargeErrorMessage(limits, chartOptions) {
    const { type, isViewByTwoAttributes } = chartOptions;
    const { series: seriesLimit, categories: categoriesLimit, nodes: nodesLimit, dataPoints: dataPointsLimit, } = limits || getChartLimits(type);
    const dataToValidate = isTreemap(type)
        ? getTreemapDataForValidation(chartOptions.data)
        : chartOptions.data;
    const limitLog = (name, limit, actual) => {
        return actual > limit ? `${name} limit: ${limit} actual: ${actual}.` : "";
    };
    const result = [];
    if (seriesLimit !== undefined) {
        result.push(limitLog("Series", seriesLimit, dataToValidate.series.length));
    }
    if (categoriesLimit !== undefined) {
        if (isViewByTwoAttributes) {
            const categoriesLength = dataToValidate.categories.reduce((result, category) => {
                return result + category.categories.length;
            }, 0);
            result.push(limitLog("Categories", categoriesLimit, categoriesLength));
        }
        else {
            result.push(limitLog("Categories", categoriesLimit, dataToValidate.categories.length));
        }
    }
    if (nodesLimit !== undefined && Array.isArray(dataToValidate === null || dataToValidate === void 0 ? void 0 : dataToValidate.series)) {
        const nodesMax = Math.max(...dataToValidate.series.map((serie) => {
            return Array.isArray(serie === null || serie === void 0 ? void 0 : serie.nodes) ? serie.nodes.length : 0;
        }));
        result.push(limitLog("NodesMax", nodesLimit, nodesMax));
    }
    if (dataPointsLimit !== undefined && Array.isArray(dataToValidate === null || dataToValidate === void 0 ? void 0 : dataToValidate.series)) {
        const dataPointsMax = Math.max(...dataToValidate.series.map((serie) => {
            return Array.isArray(serie === null || serie === void 0 ? void 0 : serie.data) ? serie.data.length : 0;
        }));
        result.push(limitLog("DataPointsMax", dataPointsLimit, dataPointsMax));
    }
    return result
        .filter((el) => el !== "")
        .join(" ")
        .trim();
}
//# sourceMappingURL=chartLimits.js.map