// (C) 2007-2023 GoodData Corporation
import merge from "lodash/merge.js";
import { invariant } from "ts-invariant";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { getCommonConfiguration } from "./commonConfiguration.js";
import { stringifyChartTypes } from "../_util/common.js";
import { getLineConfiguration } from "../lineChart/lineConfiguration.js";
import { getBarConfiguration } from "../barChart/barConfiguration.js";
import { getBulletConfiguration } from "../bulletChart/bulletConfiguration.js";
import { getColumnConfiguration } from "../columnChart/columnConfiguration.js";
import { getCustomizedConfiguration } from "./customConfiguration.js";
import { getPieConfiguration } from "../pieChart/pieConfiguration.js";
import { getDonutConfiguration } from "../donutChart/donutConfiguration.js";
import { getAreaConfiguration } from "../areaChart/areaConfiguration.js";
import { getScatterConfiguration } from "../scatterPlot/scatterConfiguration.js";
import { getComboConfiguration } from "../comboChart/comboConfiguration.js";
import { getTreemapConfiguration } from "../treemap/treemapConfiguration.js";
import { getFunnelConfiguration } from "../funnelChart/funnelConfiguration.js";
import { getPyramidConfiguration } from "../pyramidChart/pyramidConfiguration.js";
import { getHeatmapConfiguration } from "../heatmap/heatmapConfiguration.js";
import { getBubbleConfiguration } from "../bubbleChart/bubbleConfiguration.js";
import { getSankeyConfiguration } from "../sankeyChart/sankeyConfiguration.js";
import { getDependencyWheelConfiguration } from "../dependencyWheelChart/dependencyWheelConfiguration.js";
import { getWaterfallConfiguration } from "../waterfallChart/waterfallConfiguration.js";
const chartConfigurationMap = {
    [VisualizationTypes.LINE]: getLineConfiguration,
    [VisualizationTypes.BAR]: getBarConfiguration,
    [VisualizationTypes.BULLET]: getBulletConfiguration,
    [VisualizationTypes.COLUMN]: getColumnConfiguration,
    [VisualizationTypes.PIE]: getPieConfiguration,
    [VisualizationTypes.AREA]: getAreaConfiguration,
    [VisualizationTypes.SCATTER]: getScatterConfiguration,
    [VisualizationTypes.COMBO]: getComboConfiguration,
    [VisualizationTypes.COMBO2]: getComboConfiguration,
    [VisualizationTypes.TREEMAP]: getTreemapConfiguration,
    [VisualizationTypes.DONUT]: getDonutConfiguration,
    [VisualizationTypes.FUNNEL]: getFunnelConfiguration,
    [VisualizationTypes.PYRAMID]: getPyramidConfiguration,
    [VisualizationTypes.HEATMAP]: getHeatmapConfiguration,
    [VisualizationTypes.BUBBLE]: getBubbleConfiguration,
    [VisualizationTypes.SANKEY]: getSankeyConfiguration,
    [VisualizationTypes.DEPENDENCY_WHEEL]: getDependencyWheelConfiguration,
    [VisualizationTypes.WATERFALL]: getWaterfallConfiguration,
};
export function getHighchartsOptions(chartOptions, drillConfig, config, definition, intl, theme) {
    const getConfigurationByType = chartConfigurationMap[chartOptions.type];
    invariant(getConfigurationByType, `visualisation type ${chartOptions.type} is invalid (valid types: ${stringifyChartTypes()}).`);
    return merge({}, getCommonConfiguration(chartOptions, drillConfig, theme), getConfigurationByType.call(null, config, definition, theme), getCustomizedConfiguration(chartOptions, config, drillConfig, intl, theme));
}
export function isDataOfReasonableSize(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
chartData, limits, isViewByTwoAttributes = false) {
    let result = true;
    const seriesLimit = limits === null || limits === void 0 ? void 0 : limits.series;
    if (seriesLimit !== undefined) {
        result = result && chartData.series.length <= seriesLimit;
    }
    const categoriesLimit = limits === null || limits === void 0 ? void 0 : limits.categories;
    if (categoriesLimit !== undefined) {
        if (isViewByTwoAttributes) {
            const categoriesLength = chartData.categories.reduce((result, category) => {
                return result + category.categories.length;
            }, 0);
            result = result && categoriesLength <= categoriesLimit;
        }
        else {
            result = result && chartData.categories.length <= categoriesLimit;
        }
    }
    const nodesLimit = limits.nodes;
    if (nodesLimit !== undefined) {
        result = result && chartData.series.every((serie) => serie.nodes.length <= nodesLimit);
    }
    const dataPointsLimit = limits === null || limits === void 0 ? void 0 : limits.dataPoints;
    if (dataPointsLimit !== undefined) {
        result =
            result && chartData.series.every((serie) => serie.data.length <= dataPointsLimit);
    }
    return result;
}
//# sourceMappingURL=highChartsCreators.js.map