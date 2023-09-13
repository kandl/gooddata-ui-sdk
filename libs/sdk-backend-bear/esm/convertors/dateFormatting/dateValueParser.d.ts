export declare const dateFormats: readonly ["MM/dd/yyyy", "dd/MM/yyyy", "dd-MM-yyyy", "yyyy-MM-dd", "M/d/yy", "dd.MM.yyyy"];
export type DateFormat = typeof dateFormats[number];
export declare const DEFAULT_DATE_FORMAT: DateFormat;
/**
 * Parses a string representation of a date of a given date format to a Date object.
 * @param value - value to parse.
 * @param dateFormat - dateFormat to assume when parsing the value.
 * @internal
 */
export declare const parseDateValue: (value: string | null, dateFormat?: DateFormat) => Date;
//# sourceMappingURL=dateValueParser.d.ts.map