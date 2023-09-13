import { DateFilterOption, IDateFilterOptionsByType } from "../interfaces/index.js";
import { DateFilterGranularity } from "@gooddata/sdk-model";
export declare function getDateFilterOptionGranularity(dateFilterOption: DateFilterOption): DateFilterGranularity;
/**
 * Returns dateFilterOptions with only items that have visible set to true.
 *
 * @param dateFilterOptions - options to filter
 * @public
 */
export declare function filterVisibleDateFilterOptions(dateFilterOptions: IDateFilterOptionsByType): IDateFilterOptionsByType;
/**
 * Returns dateFilterOptions with all the presets sanitized, i.e. having `from <= to`.
 * @param dateFilterOptions - options to sanitize
 */
export declare function sanitizePresetIntervals(dateFilterOptions: IDateFilterOptionsByType): IDateFilterOptionsByType;
