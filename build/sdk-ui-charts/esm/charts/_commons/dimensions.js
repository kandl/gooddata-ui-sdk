// (C) 2019-2023 GoodData Corporation
import compact from "lodash/compact.js";
import { bucketAttribute, bucketAttributes, bucketIsEmpty, bucketsAttributes, bucketsFind, MeasureGroupIdentifier, newTwoDimensional, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
function isStackedChart(buckets, stackBucketName) {
    const stackBucket = bucketsFind(buckets, stackBucketName);
    return stackBucket && !bucketIsEmpty(stackBucket);
}
function stackedDimensions(buckets, viewBucketName, stackBucketName) {
    const viewBucket = bucketsFind(buckets, viewBucketName);
    const viewByAttributes = viewBucket ? bucketAttributes(viewBucket) : [];
    const stackBucket = bucketsFind(buckets, stackBucketName);
    const stackByAttribute = stackBucket && bucketAttribute(stackBucket);
    return newTwoDimensional(compact([stackByAttribute]), [...viewByAttributes, MeasureGroupIdentifier]);
}
export function defaultDimensions(def) {
    return newTwoDimensional([MeasureGroupIdentifier], bucketsAttributes(def.buckets));
}
export function stackedChartDimensions(def, viewBucketName = BucketNames.VIEW, stackBucketName = BucketNames.STACK) {
    const { buckets } = def;
    return isStackedChart(buckets, stackBucketName)
        ? stackedDimensions(buckets, viewBucketName, stackBucketName)
        : defaultDimensions(def);
}
export function pointyChartDimensions(def) {
    return newTwoDimensional(bucketsAttributes(def.buckets), [MeasureGroupIdentifier]);
}
export function roundChartDimensions(def) {
    const attributes = bucketsAttributes(def.buckets);
    return attributes.length
        ? newTwoDimensional([MeasureGroupIdentifier], attributes)
        : newTwoDimensional([], [MeasureGroupIdentifier]);
}
export function heatmapDimensions(def) {
    const viewBucket = bucketsFind(def.buckets, BucketNames.VIEW);
    const viewByAttributes = viewBucket ? bucketAttributes(viewBucket) : [];
    const stackBucket = bucketsFind(def.buckets, BucketNames.STACK);
    const stackByAttribute = stackBucket ? bucketAttributes(stackBucket) : [];
    return newTwoDimensional(viewByAttributes, compact([...stackByAttribute, MeasureGroupIdentifier]));
}
export function treemapDimensions(def) {
    const attributes = bucketsAttributes(def.buckets);
    return attributes.length === 1
        ? newTwoDimensional([MeasureGroupIdentifier], attributes)
        : newTwoDimensional(attributes, [MeasureGroupIdentifier]);
}
export function sankeyDimensions(def) {
    const attributeFromBucket = bucketsFind(def.buckets, BucketNames.ATTRIBUTE_FROM);
    const attributeFromByAttributes = attributeFromBucket ? bucketAttributes(attributeFromBucket) : [];
    const attributeToBucket = bucketsFind(def.buckets, BucketNames.ATTRIBUTE_TO);
    const attributeToByAttributes = attributeToBucket ? bucketAttributes(attributeToBucket) : [];
    return newTwoDimensional([MeasureGroupIdentifier], compact([...attributeFromByAttributes, ...attributeToByAttributes]));
}
export function dependencyWheelDimensions(def) {
    return sankeyDimensions(def);
}
//# sourceMappingURL=dimensions.js.map