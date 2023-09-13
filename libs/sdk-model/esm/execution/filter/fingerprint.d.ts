import { IFilter } from "./index.js";
/**
 * Determines if a filter has a semantic effect and thus must be taken into account when computing fingerprints.
 *
 * Irrelevant filters are:
 *
 * -  Measure Value filter with no condition specified
 * -  Negative attribute filter with empty 'notIn' field
 *
 * Note: the ALL_TIME date filter is not treated this way on purpose.
 *
 * @internal
 */
export declare function isFilterRelevantForFingerprinting(filter: IFilter): boolean;
/**
 * Calculates filter fingerprint; ensures that filters that have semantically no effect result in no fingerprint.
 *
 * @remarks see {@link isFilterRelevantForFingerprinting} for information on which filters are considered irrelevant.
 *
 * @internal
 */
export declare function filterFingerprint(filter: IFilter): string | undefined;
//# sourceMappingURL=fingerprint.d.ts.map