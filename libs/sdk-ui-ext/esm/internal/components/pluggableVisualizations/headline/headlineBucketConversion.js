// (C) 2023 GoodData Corporation
import { sdkModelPropMetas, } from "../../../utils/embeddingCodeGenerator/index.js";
import { bucketMeasure, bucketMeasures, insightBucket } from "@gooddata/sdk-model";
export function singleSecondaryMeasureBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.Measure.Single, bucketName, (ctx) => { var _a; return !((_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.enableNewHeadline); }, bucketMeasure);
}
export function multipleSecondaryMeasuresBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.Measure.Multiple, bucketName, (ctx) => { var _a; return (_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.enableNewHeadline; }, bucketMeasures);
}
export function bucketConversion(propName, propType, bucketName, isSettingEnabled, bucketItemAccessor) {
    return {
        propName,
        propType,
        itemAccessor(insight, ctx) {
            const bucket = insightBucket(insight, bucketName);
            return isSettingEnabled(ctx) && bucket && bucketItemAccessor(bucket);
        },
    };
}
//# sourceMappingURL=headlineBucketConversion.js.map