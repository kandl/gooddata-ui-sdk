// (C) 2022-2023 GoodData Corporation
import { insightBucket } from "@gooddata/sdk-model";
import toPairs from "lodash/toPairs.js";
/**
 * Conversion based on the whole {@link @gooddata/sdk-model#IInsightDefinition}.
 */
export function insightConversion(propName, propType, insightItemAccessor) {
    return {
        propName,
        propType,
        itemAccessor: insightItemAccessor,
    };
}
/**
 * Conversion based on a single bucket.
 */
export function bucketConversion(propName, propType, bucketName, bucketItemAccessor) {
    return {
        propName,
        propType,
        itemAccessor(insight) {
            const bucket = insightBucket(insight, bucketName);
            return bucket && bucketItemAccessor(bucket);
        },
    };
}
/**
 * Creates an InsightToProps converter.
 *
 * @remarks
 * This makes the conversion as declarative as possible avoiding any explicit logic in the call sites,
 * rather using specialized object to describe parts of the conversion.
 *
 * @param conversionSpec - Specification of the insight to props conversion
 * @returns function that can be used to convert a given insight to props for some visualization type
 */
export function getInsightToPropsConverter(conversionSpec) {
    return (insight, ctx) => {
        return toPairs(conversionSpec).reduce((acc, [propName, conversion]) => {
            const propValue = conversion.itemAccessor(insight, ctx);
            if (propValue) {
                acc[propName] = {
                    value: propValue,
                    meta: conversion.propType,
                };
            }
            return acc;
        }, {});
    };
}
//# sourceMappingURL=convertor.js.map