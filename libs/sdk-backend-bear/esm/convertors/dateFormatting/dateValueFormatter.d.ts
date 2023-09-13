import { DateFormatter } from "./types.js";
/**
 * Creates a function that takes a string date attribute value and a targetDateFormat and returns a formatted date string in the target date format.
 * @param dateFormatter - function to use to format Date values to a string
 * @public
 */
export declare function createDateValueFormatter(dateFormatter: DateFormatter): (value: string) => string;
//# sourceMappingURL=dateValueFormatter.d.ts.map