// (C) 2020-2022 GoodData Corporation
import { parseValue, unwrap } from "../_util/common.js";
import { MAX_POINT_WIDTH } from "../_chartCreators/commonConfiguration.js";
import { bucketIsEmpty } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import isEmpty from "lodash/isEmpty.js";
const SUPPORTED_MEASURE_BUCKETS = [
    BucketNames.MEASURES,
    BucketNames.SECONDARY_MEASURES,
    BucketNames.TERTIARY_MEASURES,
];
const PRIMARY_VS_COMPARATIVE_MEASURE_HEIGHT_RATIO = 0.75;
const isComparativeMeasurePresent = (bucketLocalIdentifiers) => bucketLocalIdentifiers.includes(BucketNames.TERTIARY_MEASURES);
const isTargetMeasurePresent = (bucketLocalIdentifiers) => bucketLocalIdentifiers.includes(BucketNames.SECONDARY_MEASURES);
const getValue = (value, isTarget) => isTarget
    ? {
        target: value === null ? 0 : value,
        y: 0,
    }
    : {
        y: value,
    };
const getSeriesItemData = (seriesItem, measureGroup, seriesIndex, measureBucketsLocalIdentifiers) => seriesItem.map((pointValue) => {
    const value = parseValue(pointValue);
    const isTarget = isTargetSeries(seriesIndex, measureBucketsLocalIdentifiers);
    const nullValueProps = isTarget && value === null ? { isNullTarget: true, className: "hidden-empty-series" } : {};
    return Object.assign(Object.assign(Object.assign({}, nullValueProps), getValue(value, isTarget)), { format: unwrap(measureGroup.items[seriesIndex]).format, marker: {
            enabled: pointValue !== null,
        }, name: unwrap(measureGroup.items[seriesIndex]).name });
});
const getPrimarySeriesMaxPointWidth = (onlyPrimaryMeasure) => {
    if (!onlyPrimaryMeasure) {
        return MAX_POINT_WIDTH * PRIMARY_VS_COMPARATIVE_MEASURE_HEIGHT_RATIO;
    }
    return MAX_POINT_WIDTH;
};
const getPrimarySeries = (seriesItemConfig, onlyPrimaryMeasure) => (Object.assign(Object.assign({}, seriesItemConfig), { pointPadding: onlyPrimaryMeasure ? 0.1 : 0.2, maxPointWidth: getPrimarySeriesMaxPointWidth(onlyPrimaryMeasure), zIndex: 1, bulletChartMeasureType: "primary" }));
const getTargetSeries = (seriesItemConfig) => (Object.assign(Object.assign({}, seriesItemConfig), { type: "bullet", pointPadding: 0, targetOptions: {
        width: "100%",
    }, zIndex: 2, bulletChartMeasureType: "target" }));
const getComparativeSeries = (seriesItemConfig) => (Object.assign(Object.assign({}, seriesItemConfig), { pointPadding: 0, zIndex: 0, bulletChartMeasureType: "comparative" }));
export const isPrimarySeries = (seriesIndex, bucketsLocalIdentifiers) => seriesIndex === bucketsLocalIdentifiers.indexOf(BucketNames.MEASURES);
export const isTargetSeries = (seriesIndex, bucketsLocalIdentifiers) => seriesIndex === bucketsLocalIdentifiers.indexOf(BucketNames.SECONDARY_MEASURES);
export const isComparativeSeries = (seriesIndex, bucketsLocalIdentifiers) => seriesIndex === bucketsLocalIdentifiers.indexOf(BucketNames.TERTIARY_MEASURES);
const getSeries = (seriesIndex, seriesItemConfig, measureBucketsLocalIdentifiers) => {
    if (isTargetSeries(seriesIndex, measureBucketsLocalIdentifiers)) {
        return getTargetSeries(seriesItemConfig);
    }
    else if (isComparativeSeries(seriesIndex, measureBucketsLocalIdentifiers)) {
        return getComparativeSeries(seriesItemConfig);
    }
    const onlyPrimaryMeasure = !isComparativeMeasurePresent(measureBucketsLocalIdentifiers) &&
        !isTargetMeasurePresent(measureBucketsLocalIdentifiers);
    return getPrimarySeries(seriesItemConfig, onlyPrimaryMeasure);
};
export function getBulletChartSeries(dv, measureGroup, colorStrategy) {
    const occupiedMeasureBucketsLocalIdentifiers = getOccupiedMeasureBucketsLocalIdentifiers(dv);
    const executionResultData = dv.rawData().twoDimData();
    return executionResultData.map((seriesItem, seriesIndex) => {
        const seriesItemData = getSeriesItemData(seriesItem, measureGroup, seriesIndex, occupiedMeasureBucketsLocalIdentifiers);
        const seriesItemConfig = {
            legendIndex: seriesIndex,
            data: seriesItemData,
            name: measureGroup.items[seriesIndex].measureHeaderItem.name,
            color: colorStrategy.getColorByIndex(seriesIndex),
            seriesIndex,
        };
        return getSeries(seriesIndex, seriesItemConfig, occupiedMeasureBucketsLocalIdentifiers);
    });
}
export function getOccupiedMeasureBucketsLocalIdentifiers(dv) {
    const buckets = dv.def().buckets();
    const executionResultData = dv.rawData().twoDimData();
    const availableMeasureBucketsLocalIdentifiers = SUPPORTED_MEASURE_BUCKETS;
    const notEmptyMeasureBucketsLocalIdentifiers = buckets
        .filter((b) => !bucketIsEmpty(b) && availableMeasureBucketsLocalIdentifiers.indexOf(b.localIdentifier) >= 0)
        .map((b) => b.localIdentifier);
    return !isEmpty(notEmptyMeasureBucketsLocalIdentifiers)
        ? notEmptyMeasureBucketsLocalIdentifiers
        : availableMeasureBucketsLocalIdentifiers.slice(0, executionResultData.length);
}
//# sourceMappingURL=bulletChartSeries.js.map