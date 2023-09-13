import { DateFormatter, DateParseFormatter } from "./types.js";
/**
 * Creates a function that takes a string date attribute value, granularity, locale and formatting pattern
 * and returns a formatted date string.
 * @param dateFormatter - function to use to format Date values to a string
 * @public
 */
export declare function createDateValueFormatter(dateFormatter: DateFormatter): DateParseFormatter;
//# sourceMappingURL=dateValueFormatter.d.ts.map