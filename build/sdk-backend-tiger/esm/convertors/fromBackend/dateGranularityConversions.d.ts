import { JsonApiAttributeOutAttributesGranularityEnum, RelativeDateFilterRelativeDateFilterGranularityEnum } from "@gooddata/api-client-tiger";
import { DateAttributeGranularity } from "@gooddata/sdk-model";
/**
 * Converts supported tiger backend granularities to values recognized by the SDK.
 *
 * @param granularity - tiger granularity
 */
export declare function toSdkGranularity(granularity: JsonApiAttributeOutAttributesGranularityEnum): DateAttributeGranularity;
/**
 * Converts granularity values recognized by the SDK into granularities known by tiger. Note that
 * SDK granularities are superset of those supported by tiger.
 *
 * @throws NotSupport if the input granularity is not supported by tiger
 */
export declare function toTigerGranularity(granularity: DateAttributeGranularity): RelativeDateFilterRelativeDateFilterGranularityEnum;
//# sourceMappingURL=dateGranularityConversions.d.ts.map