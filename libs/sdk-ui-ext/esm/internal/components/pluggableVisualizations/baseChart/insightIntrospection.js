// (C) 2019-2020 GoodData Corporation
import { bucketItems, insightBucket } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { isBarChart, isScatterPlot, isBubbleChart, isBulletChart } from "@gooddata/sdk-ui-charts";
export function countBucketItems(insight) {
    if (!insight) {
        return {
            viewByItemCount: 0,
            measureItemCount: 0,
            secondaryMeasureItemCount: 0,
        };
    }
    const viewBucket = insightBucket(insight, BucketNames.VIEW);
    const measureBucket = insightBucket(insight, BucketNames.MEASURES);
    const secondaryMeasureBucket = insightBucket(insight, BucketNames.SECONDARY_MEASURES);
    return {
        viewByItemCount: viewBucket ? bucketItems(viewBucket).length : 0,
        measureItemCount: measureBucket ? bucketItems(measureBucket).length : 0,
        secondaryMeasureItemCount: secondaryMeasureBucket ? bucketItems(secondaryMeasureBucket).length : 0,
    };
}
export function countItemsOnAxes(type, controls, insight) {
    var _a, _b, _c, _d;
    const isBarFamilyChartType = isBarChart(type) || isBulletChart(type);
    const { viewByItemCount, measureItemCount, secondaryMeasureItemCount } = countBucketItems(insight);
    const totalMeasureItemCount = measureItemCount + secondaryMeasureItemCount;
    const secondaryMeasureCountInConfig = (isBarFamilyChartType
        ? (_b = (_a = controls === null || controls === void 0 ? void 0 : controls.secondary_xaxis) === null || _a === void 0 ? void 0 : _a.measures) !== null && _b !== void 0 ? _b : []
        : (_d = (_c = controls === null || controls === void 0 ? void 0 : controls.secondary_yaxis) === null || _c === void 0 ? void 0 : _c.measures) !== null && _d !== void 0 ? _d : []).length;
    if (isBarFamilyChartType) {
        return {
            yaxis: viewByItemCount,
            xaxis: totalMeasureItemCount - secondaryMeasureCountInConfig,
            secondary_xaxis: secondaryMeasureCountInConfig,
        };
    }
    if (isScatterPlot(type) || isBubbleChart(type)) {
        return {
            xaxis: measureItemCount,
            yaxis: secondaryMeasureItemCount,
        };
    }
    return {
        xaxis: viewByItemCount,
        yaxis: totalMeasureItemCount - secondaryMeasureCountInConfig,
        secondary_yaxis: secondaryMeasureCountInConfig,
    };
}
//# sourceMappingURL=insightIntrospection.js.map