// (C) 2022-2023 GoodData Corporation
import { bucketAttribute, bucketAttributes, bucketItems, bucketMeasure, bucketMeasures, insightFilters, insightProperties, insightTotals, insightVisualizationUrl, isRelativeDateFilter, relativeDateFilterValues, } from "@gooddata/sdk-model";
import { DefaultLocale } from "@gooddata/sdk-ui";
import isNil from "lodash/isNil";
import { removeUseless } from "../../removeUseless";
import { createSorts } from "../../sort";
import { bucketConversion, insightConversion } from "./convertor";
function namedSdkModelPropMetaFor(name, propType) {
    return {
        cardinality: propType,
        typeImport: {
            name,
            importType: "named",
            package: "@gooddata/sdk-model",
        },
    };
}
function namedSdkModelPropGroupMetaFor(name) {
    return {
        Single: namedSdkModelPropMetaFor(name, "scalar"),
        Multiple: namedSdkModelPropMetaFor(name, "array"),
    };
}
export const sdkModelPropMetas = {
    Measure: namedSdkModelPropGroupMetaFor("IMeasure"),
    Attribute: namedSdkModelPropGroupMetaFor("IAttribute"),
    AttributeOrMeasure: namedSdkModelPropGroupMetaFor("IAttributeOrMeasure"),
    Filter: namedSdkModelPropGroupMetaFor("IFilter"),
    SortItem: namedSdkModelPropGroupMetaFor("ISortItem"),
    Total: namedSdkModelPropGroupMetaFor("ITotal"),
};
function firstBucketItem(bucket) {
    var _a;
    return (_a = bucketItems(bucket)) === null || _a === void 0 ? void 0 : _a[0];
}
/**
 * Utility function for creating bucket conversion for a single {@link @gooddata/sdk-model#IAttribute} item.
 */
export function singleAttributeBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.Attribute.Single, bucketName, bucketAttribute);
}
/**
 * Utility function for creating bucket conversion for multiple {@link @gooddata/sdk-model#IAttribute} items.
 */
export function multipleAttributesBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.Attribute.Multiple, bucketName, bucketAttributes);
}
/**
 * Utility function for creating bucket conversion for a single {@link @gooddata/sdk-model#IMeasure} item.
 */
export function singleMeasureBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.Measure.Single, bucketName, bucketMeasure);
}
/**
 * Utility function for creating bucket conversion for multiple {@link @gooddata/sdk-model#IMeasure} items.
 */
export function multipleMeasuresBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.Measure.Multiple, bucketName, bucketMeasures);
}
/**
 * Utility function for creating bucket conversion for a single {@link @gooddata/sdk-model#IAttributeOrMeasure} item.
 */
export function singleAttributeOrMeasureBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.AttributeOrMeasure.Single, bucketName, firstBucketItem);
}
/**
 * Utility function for creating bucket conversion for multiple {@link @gooddata/sdk-model#IAttributeOrMeasure} items.
 */
export function multipleAttributesOrMeasuresBucketConversion(propName, bucketName) {
    return bucketConversion(propName, sdkModelPropMetas.AttributeOrMeasure.Multiple, bucketName, bucketItems);
}
/**
 * Utility function for creating insight conversion for multiple {@link @gooddata/sdk-model#IFilter} items.
 */
export function filtersInsightConversion(propName) {
    return insightConversion(propName, sdkModelPropMetas.Filter.Multiple, (insight) => {
        var _a;
        const filters = (_a = insightFilters(insight)) !== null && _a !== void 0 ? _a : [];
        return filters.filter((f) => {
            // get rid of the filters AD creates as All time: relative filter without boundaries
            if (isRelativeDateFilter(f)) {
                const { from, to } = relativeDateFilterValues(f);
                return !(isNil(from) || isNil(to));
            }
            return true;
        });
    });
}
/**
 * Utility function for creating insight conversion for multiple {@link @gooddata/sdk-model#ISortItem} items.
 */
export function sortsInsightConversion(propName) {
    return insightConversion(propName, sdkModelPropMetas.SortItem.Multiple, (insight, ctx) => {
        var _a, _b, _c;
        const type = insightVisualizationUrl(insight).split(":")[1];
        return createSorts(type, insight, (_b = (_a = insightProperties(insight)) === null || _a === void 0 ? void 0 : _a.controls) !== null && _b !== void 0 ? _b : {}, (_c = ctx.settings) !== null && _c !== void 0 ? _c : {});
    });
}
/**
 * Utility function for creating insight conversion for multiple {@link @gooddata/sdk-model#ITotal} items.
 */
export function totalsInsightConversion(propName) {
    return insightConversion(propName, sdkModelPropMetas.Total.Multiple, insightTotals);
}
/**
 * Utility function for creating insight conversion for single {@link @gooddata/sdk-ui#ILocale} item.
 */
export function localeInsightConversion(propName) {
    return insightConversion(propName, { cardinality: "scalar" }, (_, ctx) => {
        var _a;
        const val = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.locale;
        return val && val !== DefaultLocale ? val : undefined;
    });
}
/**
 * Utility function for creating insight conversion for single {@link @gooddata/sdk-ui#IExecutionConfig} item.
 */
export function executionConfigInsightConversion(propName) {
    return insightConversion(propName, {
        cardinality: "scalar",
        typeImport: {
            importType: "named",
            name: "IExecutionConfig",
            package: "@gooddata/sdk-model",
        },
    }, (_, ctx) => {
        return (ctx === null || ctx === void 0 ? void 0 : ctx.executionConfig) && removeUseless(ctx.executionConfig);
    });
}
//# sourceMappingURL=convenience.js.map