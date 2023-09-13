import { IInsightToPropConversion, PropMeta } from "../../../utils/embeddingCodeGenerator/index.js";
import { IBucket, IMeasure } from "@gooddata/sdk-model";
import { IEmbeddingCodeContext } from "../../../interfaces/VisualizationDescriptor.js";
export declare function singleSecondaryMeasureBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IMeasure>;
export declare function multipleSecondaryMeasuresBucketConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IMeasure[]>;
export declare function bucketConversion<TProps extends object, TPropKey extends keyof TProps, TReturnType = TProps[TPropKey]>(propName: TPropKey, propType: PropMeta, bucketName: string, isSettingEnabled: (ctx: IEmbeddingCodeContext) => boolean, bucketItemAccessor: (bucket: IBucket) => TReturnType): IInsightToPropConversion<TProps, TPropKey, TReturnType>;
//# sourceMappingURL=headlineBucketConversion.d.ts.map