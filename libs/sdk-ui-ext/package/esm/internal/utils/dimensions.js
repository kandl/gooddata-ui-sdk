// (C) 2007-2022 GoodData Corporation
import compact from "lodash/compact";
import { bucketAttributes, bucketIsEmpty, insightAttributes, insightBucket, insightTotals, MeasureGroupIdentifier, newDimension, newTwoDimensional, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
function safeBucketAttributes(insight, idOrFun) {
    const matchingBucket = insightBucket(insight, idOrFun);
    return matchingBucket ? bucketAttributes(matchingBucket) : [];
}
export function getPivotTableDimensions(insight) {
    const measures = insightBucket(insight, BucketNames.MEASURES);
    const measuresItemIdentifiers = measures && !bucketIsEmpty(measures) ? [MeasureGroupIdentifier] : [];
    const rowAttributes = safeBucketAttributes(insight, BucketNames.ATTRIBUTE);
    const columnAttributes = safeBucketAttributes(insight, BucketNames.COLUMNS);
    return newTwoDimensional([...rowAttributes, ...insightTotals(insight)], [...columnAttributes, ...measuresItemIdentifiers]);
}
function getPieDonutFunnelDimensions(insight) {
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
/**
 * Generates dimensions based on buckets and visualization objects.
 *
 * @param insight - insight being visualized
 * @param type - visualization type string
 * @internal
 */
export function generateDimensions(insight, type) {
    switch (type) {
        case VisualizationTypes.TABLE:
            return getPivotTableDimensions(insight);
        case VisualizationTypes.PIE:
        case VisualizationTypes.DONUT:
        case VisualizationTypes.FUNNEL:
            return getPieDonutFunnelDimensions(insight);
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