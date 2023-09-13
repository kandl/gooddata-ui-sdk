// (C) 2019-2022 GoodData Corporation
import { BucketNames } from "@gooddata/sdk-ui";
import { bucketIsEmpty, bucketsFind } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import { getResponsiveInfo } from "./responsive.js";
export function getGeoAttributeHeaderItems(dv, geoData) {
    const { color, size } = geoData;
    const hasColorMeasure = color !== undefined;
    const hasSizeMeasure = size !== undefined;
    const attrHeaderItemIndex = hasColorMeasure || hasSizeMeasure ? 1 : 0;
    return dv.meta().allHeaders()[attrHeaderItemIndex];
}
export function isDataOfReasonableSize(dv, geoData, limit) {
    const { location } = geoData;
    const attributeHeaderItems = getGeoAttributeHeaderItems(dv, geoData);
    const locationData = location !== undefined ? attributeHeaderItems[location.index] : [];
    return locationData.length <= limit;
}
const isBucketWithItem = (bucket) => bucket !== undefined && !bucketIsEmpty(bucket);
export function isLocationSet(buckets) {
    const locationBucket = bucketsFind(buckets, BucketNames.LOCATION);
    const latitudeBucket = bucketsFind(buckets, BucketNames.LATITUDE);
    const longitudeBucket = bucketsFind(buckets, BucketNames.LONGITUDE);
    return (isBucketWithItem(locationBucket) ||
        (isBucketWithItem(latitudeBucket) && isBucketWithItem(longitudeBucket)));
}
export function calculateAverage(values = []) {
    if (!values.length) {
        return 0;
    }
    return values.reduce((a, b) => a + b, 0) / values.length;
}
export function getFormatFromExecutionResponse(dv, indexMeasure) {
    const measureDescriptors = dv.meta().measureDescriptors();
    return measureDescriptors[indexMeasure].measureHeaderItem.format;
}
// show clusters when there is location attribute only
export function isClusteringAllowed(geoData, groupNearbyPoints = true) {
    const { color, location, segment, size } = geoData;
    return Boolean(groupNearbyPoints && location && !(color || segment || size));
}
export function isPointsConfigChanged(prevPointsConfig, pointsConfig) {
    return !isEqual(prevPointsConfig, pointsConfig);
}
/**
 * Get min/max values in number array and ignore NaN values
 */
export function getMinMax(data) {
    return data.reduce((result, value) => {
        if (!isFinite(value)) {
            return result;
        }
        const min = result.min && isFinite(result.min) ? Math.min(value, result.min) : value;
        const max = result.max && isFinite(result.max) ? Math.max(value, result.max) : value;
        return {
            min,
            max,
        };
    }, {
        min: undefined,
        max: undefined,
    });
}
export function dataValueAsFloat(value) {
    if (value === null) {
        return NaN;
    }
    const parsedNumber = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(parsedNumber)) {
        console.warn(`SDK: utils - stringToFloat: ${value} is not a number`);
    }
    return parsedNumber;
}
export function isFluidLegendEnabled(responsive, showFluidLegend) {
    return getResponsiveInfo(responsive) === true && showFluidLegend;
}
export function isColorAssignmentItemChanged(prevColorAssignment, colorAssignment) {
    return !isEqual(prevColorAssignment, colorAssignment);
}
//# sourceMappingURL=common.js.map