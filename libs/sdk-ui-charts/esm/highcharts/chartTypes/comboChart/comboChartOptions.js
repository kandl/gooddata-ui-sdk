// (C) 2007-2023 GoodData Corporation
import set from "lodash/set.js";
import cloneDeep from "lodash/cloneDeep.js";
import { isMeasure, measureLocalId, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { isLineChart } from "../_util/common.js";
export const CHART_ORDER = {
    [VisualizationTypes.AREA]: 1,
    [VisualizationTypes.COLUMN]: 2,
    [VisualizationTypes.LINE]: 3,
};
/**
 * @internal
 */
export const COMBO_SUPPORTED_CHARTS = [
    VisualizationTypes.COLUMN,
    VisualizationTypes.LINE,
    VisualizationTypes.AREA,
];
const DEFAULT_COMBO_CHART_TYPES = [VisualizationTypes.COLUMN, VisualizationTypes.LINE];
function getMeasureIndices(bucketItems, measureGroupIdentifiers) {
    return bucketItems.reduce((result, item) => {
        const localIdentifier = isMeasure(item) ? measureLocalId(item) : "";
        if (localIdentifier) {
            const metricIndex = measureGroupIdentifiers.indexOf(localIdentifier);
            result.push(metricIndex);
        }
        return result;
    }, []);
}
export function getComboChartSeries(config, measureGroup, series, dv) {
    const updatedSeries = cloneDeep(series);
    const measureBuckets = {};
    const types = [config.primaryChartType, config.secondaryChartType];
    const measureGroupIdentifiers = measureGroup.items.map((item) => { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.measureHeaderItem) === null || _a === void 0 ? void 0 : _a.localIdentifier) !== null && _b !== void 0 ? _b : ""; });
    dv.def()
        .buckets()
        .forEach((bucket) => {
        const bucketItems = bucket.items || [];
        measureBuckets[bucket.localIdentifier] = getMeasureIndices(bucketItems, measureGroupIdentifiers);
    });
    [BucketNames.MEASURES, BucketNames.SECONDARY_MEASURES].forEach((name, index) => {
        (measureBuckets[name] || []).forEach((measureIndex) => {
            const chartType = CHART_ORDER[types[index]]
                ? types[index]
                : DEFAULT_COMBO_CHART_TYPES[index];
            set(updatedSeries, [measureIndex, "type"], chartType);
            set(updatedSeries, [measureIndex, "zIndex"], CHART_ORDER[chartType]);
        });
    });
    return updatedSeries;
}
function isAllSeriesOnLeftAxis(series = []) {
    return series.every((item) => item.yAxis === 0);
}
function isSomeSeriesWithLineChart(series = []) {
    return series.some((item) => isLineChart(item.type));
}
export function canComboChartBeStackedInPercent(series) {
    const isAllSeriesOnLeft = isAllSeriesOnLeftAxis(series);
    const hasLineChartType = isSomeSeriesWithLineChart(series);
    return !(isAllSeriesOnLeft && hasLineChartType);
}
export function getComboChartStackingConfig(config, series, defaultStacking) {
    const { stackMeasures } = config;
    const canStackInPercent = canComboChartBeStackedInPercent(series);
    if (canStackInPercent) {
        return defaultStacking;
    }
    return stackMeasures ? "normal" : null;
}
//# sourceMappingURL=comboChartOptions.js.map