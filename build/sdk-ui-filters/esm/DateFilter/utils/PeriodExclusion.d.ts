import { DateFilterOption } from "../interfaces/index.js";
/**
 * Returns the date filter option with excludeCurrentPeriod applied if applicable.
 */
export declare const applyExcludeCurrentPeriod: (dateFilterOption: DateFilterOption | undefined, excludeCurrentPeriod: boolean) => DateFilterOption;
export declare const canExcludeCurrentPeriod: (dateFilterOption: DateFilterOption) => boolean;
