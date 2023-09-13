// (C) 2007-2023 GoodData Corporation
import compact from "lodash/compact.js";
import { bucketAttributes, insightAttributes, insightBucket, MeasureGroupIdentifier, newDimension, newTwoDimensional, insightProperties, insightBuckets, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { getMeasureGroupDimensionFromProperties } from "./propertiesHelper.js";
import { getPivotTableDimensions as getPivotTableDimensionsShared, } from "@gooddata/sdk-ui-pivot";
const COLUMNS = "columns";
const ROWS = "rows";
function safeBucketAttributes(insight, idOrFun) {
    const matchingBucket = insightBucket(insight, idOrFun);
    return matchingBucket ? bucketAttributes(matchingBucket) : [];
}
function isTransposed(insight, customVisualizationConfig) {
    var _a;
    if (customVisualizationConfig === null || customVisualizationConfig === void 0 ? void 0 : customVisualizationConfig.measureGroupDimension) {
        return (customVisualizationConfig === null || customVisualizationConfig === void 0 ? void 0 : customVisualizationConfig.measureGroupDimension) === ROWS;
    }
    const measureGroupDimension = (_a = getMeasureGroupDimensionFromProperties(insightProperties(insight))) !== null && _a !== void 0 ? _a : COLUMNS;
    return measureGroupDimension === ROWS;
}
export function getPivotTableDimensions(insight, customVisualizationConfig) {
    const buckets = insightBuckets(insight);
    const transposed = isTransposed(insight, customVisualizationConfig);
    return getPivotTableDimensionsShared(buckets, transposed);
}
function getPieDonutFunnelWaterfallDimensions(insight) {
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.VIEW);
    return viewByAttributes.length
        ? newTwoDimensional([MeasureGroupIdentifier], viewByAttributes)
        : newTwoDimensional([], [MeasureGroupIdentifier]);
}
function getBarColumnDimensions(insight) {
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.VIEW);
    const stackByAttributes = safeBucketAttributes(insight, BucketNames.STACK);
    return stackByAttributes.length
        ? newTwoDimensional(stackByAttributes, [...viewByAttributes, MeasureGroupIdentifier])
        : newTwoDimensional([MeasureGroupIdentifier], viewByAttributes);
}
function getAreaDimensions(insight) {
    var _a;
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.VIEW);
    const stackByAttributes = safeBucketAttributes(insight, BucketNames.STACK);
    const seriesAttribute = viewByAttributes[0];
    const sliceAttribute = (_a = stackByAttributes[0]) !== null && _a !== void 0 ? _a : viewByAttributes[1];
    return sliceAttribute
        ? newTwoDimensional([sliceAttribute], compact([seriesAttribute, MeasureGroupIdentifier]))
        : newTwoDimensional([MeasureGroupIdentifier], compact([seriesAttribute]));
}
function getLineDimensions(insight) {
    const trendAttributes = safeBucketAttributes(insight, BucketNames.TREND);
    const segmentAttributes = safeBucketAttributes(insight, BucketNames.SEGMENT);
    return segmentAttributes.length
        ? newTwoDimensional(segmentAttributes, [...trendAttributes, MeasureGroupIdentifier])
        : newTwoDimensional([MeasureGroupIdentifier], trendAttributes);
}
export function getHeadlinesDimensions() {
    return [newDimension([MeasureGroupIdentifier])];
}
function getScatterDimensions(insight) {
    const attributes = safeBucketAttributes(insight, BucketNames.ATTRIBUTE);
    return newTwoDimensional(attributes, [MeasureGroupIdentifier]);
}
function getHeatmapDimensions(insight) {
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.VIEW);
    const stackByAttributes = safeBucketAttributes(insight, BucketNames.STACK);
    return newTwoDimensional(viewByAttributes, [...stackByAttributes, MeasureGroupIdentifier]);
}
function getBulletComboDimensions(insight) {
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.VIEW);
    return newTwoDimensional([MeasureGroupIdentifier], viewByAttributes);
}
function getBubbleDimensions(insight) {
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.VIEW);
    return newTwoDimensional(viewByAttributes, [MeasureGroupIdentifier]);
}
function getSankeyDimensions(insight) {
    const fromAttributes = safeBucketAttributes(insight, BucketNames.ATTRIBUTE_FROM);
    const toAttributes = safeBucketAttributes(insight, BucketNames.ATTRIBUTE_TO);
    return newTwoDimensional([MeasureGroupIdentifier], compact([...fromAttributes, ...toAttributes]));
}
/**
 * Generates dimensions based on buckets and visualization objects.
 *
 * @param insight - insight being visualized
 * @param type - visualization type string
 * @internal
 */
export function generateDimensions(insight, type, customVisualizationConfig) {
    switch (type) {
        case VisualizationTypes.TABLE:
            return getPivotTableDimensions(insight, customVisualizationConfig);
        case VisualizationTypes.PIE:
        case VisualizationTypes.DONUT:
        case VisualizationTypes.FUNNEL:
        case VisualizationTypes.WATERFALL:
        case VisualizationTypes.PYRAMID:
            return getPieDonutFunnelWaterfallDimensions(insight);
        case VisualizationTypes.TREEMAP:
            return getTreemapDimensions(insight);
        case VisualizationTypes.LINE:
            return getLineDimensions(insight);
        case VisualizationTypes.AREA:
            return getAreaDimensions(insight);
        case VisualizationTypes.BAR:
        case VisualizationTypes.COLUMN:
            return getBarColumnDimensions(insight);
        case VisualizationTypes.BULLET:
        case VisualizationTypes.COMBO:
        case VisualizationTypes.COMBO2:
            return getBulletComboDimensions(insight);
        case VisualizationTypes.HEADLINE:
            return getHeadlinesDimensions();
        case VisualizationTypes.SCATTER:
            return getScatterDimensions(insight);
        case VisualizationTypes.HEATMAP:
            return getHeatmapDimensions(insight);
        case VisualizationTypes.BUBBLE:
            return getBubbleDimensions(insight);
        case VisualizationTypes.SANKEY:
        case VisualizationTypes.DEPENDENCY_WHEEL:
            return getSankeyDimensions(insight);
    }
    return [];
}
export function generateStackedDimensions(insight) {
    const viewByAttributes = safeBucketAttributes(insight, BucketNames.ATTRIBUTE);
    const stackByAttributes = safeBucketAttributes(insight, BucketNames.STACK);
    return newTwoDimensional(stackByAttributes, [...viewByAttributes, MeasureGroupIdentifier]);
}
function getTreemapDimensions(insight) {
    const attributes = insightAttributes(insight);
    return attributes.length === 1
        ? newTwoDimensional([MeasureGroupIdentifier], attributes)
        : newTwoDimensional(attributes, [MeasureGroupIdentifier]);
}
//# sourceMappingURL=dimensions.js.map