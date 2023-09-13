import { IAttribute, IAttributeOrMeasure, IExecutionConfig, IFilter, IMeasure, ISortItem, ITotal } from "@gooddata/sdk-model";
import { PropMeta } from "../types";
import { IInsightToPropConversion } from "./convertor";
export declare const sdkModelPropMetas: {
    Measure: {
        Single: PropMeta;
        Multiple: PropMeta;
    };
    Attribute: {
        Single: PropMeta;
        Multiple: PropMeta;
    };
    AttributeOrMeasure: {
        Single: PropMeta;
        Multiple: PropMeta;
    };
    Filter: {
        Single: PropMeta;
        Multiple: PropMeta;
    };
    SortItem: {
        Single: PropMeta;
        Multiple: PropMeta;
    };
    Total: {
        Single: PropMeta;
        Multiple: PropMeta;
    };
};
/**
 * Utility function for creating bucket conversion for a single {@link @gooddata/sdk-model#IAttribute} item.
 */
export declare function singleAttributeBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IAttribute>;
/**
 * Utility function for creating bucket conversion for multiple {@link @gooddata/sdk-model#IAttribute} items.
 */
export declare function multipleAttributesBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IAttribute[]>;
/**
 * Utility function for creating bucket conversion for a single {@link @gooddata/sdk-model#IMeasure} item.
 */
export declare function singleMeasureBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IMeasure>;
/**
 * Utility function for creating bucket conversion for multiple {@link @gooddata/sdk-model#IMeasure} items.
 */
export declare function multipleMeasuresBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IMeasure[]>;
/**
 * Utility function for creating bucket conversion for a single {@link @gooddata/sdk-model#IAttributeOrMeasure} item.
 */
export declare function singleAttributeOrMeasureBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IAttributeOrMeasure>;
/**
 * Utility function for creating bucket conversion for multiple {@link @gooddata/sdk-model#IAttributeOrMeasure} items.
 */
export declare function multipleAttributesOrMeasuresBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IAttributeOrMeasure[]>;
/**
 * Utility function for creating insight conversion for multiple {@link @gooddata/sdk-model#IFilter} items.
 */
export declare function filtersInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey): IInsightToPropConversion<TProps, TPropKey, IFilter[]>;
/**
 * Utility function for creating insight conversion for multiple {@link @gooddata/sdk-model#ISortItem} items.
 */
export declare function sortsInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey): IInsightToPropConversion<TProps, TPropKey, ISortItem[]>;
/**
 * Utility function for creating insight conversion for multiple {@link @gooddata/sdk-model#ITotal} items.
 */
export declare function totalsInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey): IInsightToPropConversion<TProps, TPropKey, ITotal[]>;
/**
 * Utility function for creating insight conversion for single {@link @gooddata/sdk-ui#ILocale} item.
 */
export declare function localeInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey): IInsightToPropConversion<TProps, TPropKey, string | undefined>;
/**
 * Utility function for creating insight conversion for single {@link @gooddata/sdk-ui#IExecutionConfig} item.
 */
export declare function executionConfigInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey): IInsightToPropConversion<TProps, TPropKey, IExecutionConfig | undefined>;
//# sourceMappingURL=convenience.d.ts.map