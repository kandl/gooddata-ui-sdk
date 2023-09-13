// (C) 2023 GoodData Corporation
import { bucketMeasure, bucketMeasures, bucketsFind } from "@gooddata/sdk-model";
import MultiMeasuresProvider from "./internal/providers/MultiMeasuresProvider.js";
import ComparisonProvider from "./internal/providers/ComparisonProvider.js";
import { BucketNames } from "@gooddata/sdk-ui";
import isEmpty from "lodash/isEmpty.js";
import LegacyProvider from "./internal/providers/LegacyProvider.js";
var HeadlineType;
(function (HeadlineType) {
    HeadlineType[HeadlineType["MULTI_MEASURES"] = 0] = "MULTI_MEASURES";
    HeadlineType[HeadlineType["COMPARISON"] = 1] = "COMPARISON";
})(HeadlineType || (HeadlineType = {}));
/**
 * Factory method to create a specific HeadlineProvider based on the provided buckets and chart configuration.
 *
 * @returns An instance of the IHeadlineProvider interface that corresponds headline business.
 *
 * @internal
 */
const createHeadlineProvider = (buckets, config, enableNewHeadline) => {
    if (!enableNewHeadline) {
        return new LegacyProvider();
    }
    const headlineType = getHeadlineType(buckets, config);
    if (headlineType === HeadlineType.COMPARISON) {
        return new ComparisonProvider(config === null || config === void 0 ? void 0 : config.comparison);
    }
    return new MultiMeasuresProvider();
};
const getHeadlineType = (buckets, config) => {
    const measureBucket = bucketsFind(buckets, BucketNames.MEASURES);
    const primaryMeasure = measureBucket && bucketMeasure(measureBucket);
    const secondaryBucket = bucketsFind(buckets, BucketNames.SECONDARY_MEASURES);
    const secondaryMeasures = !isEmpty(secondaryBucket) ? bucketMeasures(secondaryBucket) : [];
    if (isComparisonType(primaryMeasure, secondaryMeasures, config === null || config === void 0 ? void 0 : config.comparison)) {
        return HeadlineType.COMPARISON;
    }
    return HeadlineType.MULTI_MEASURES;
};
const isComparisonType = (primaryMeasure, secondaryMeasures, comparison) => {
    var _a;
    const isComparisonEnabled = (_a = comparison === null || comparison === void 0 ? void 0 : comparison.enabled) !== null && _a !== void 0 ? _a : true;
    return primaryMeasure && (secondaryMeasures === null || secondaryMeasures === void 0 ? void 0 : secondaryMeasures.length) === 1 && isComparisonEnabled;
};
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 */
export { createHeadlineProvider };
//# sourceMappingURL=HeadlineProviderFactory.js.map