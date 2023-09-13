import { DateFilterGranularity } from "@gooddata/sdk-model";
/**
 * @beta
 */
export type GranularityIntlKey = "day" | "minute" | "hour" | "week" | "month" | "quarter" | "year";
export declare const granularityIntlCodes: {
    [key in DateFilterGranularity]: GranularityIntlKey;
};
