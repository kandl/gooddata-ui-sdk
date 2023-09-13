import { ILocale } from "@gooddata/sdk-ui";
import { IDateAndMessageTranslator } from "./Translators.js";
import { DateFilterGranularity } from "@gooddata/sdk-model";
import { DateFilterOption } from "../../interfaces/index.js";
export declare const getTimeRange: (dateFrom: Date, dateTo: Date) => string;
export declare const formatAbsoluteDateRange: (from: Date | string, to: Date | string, dateFormat: string) => string;
export declare const formatRelativeDateRange: (from: number, to: number, granularity: DateFilterGranularity, translator: IDateAndMessageTranslator) => string;
/**
 * Gets the filter title favoring custom name if specified.
 * @returns Representation of the filter (e.g. "My preset", "From 2 weeks ago to 1 week ahead")
 */
export declare const getDateFilterTitle: (filter: DateFilterOption, locale: ILocale, dateFormat?: string) => string;
/**
 * Gets the filter title favoring custom name if specified. This function is only for mock purpose.
 * @returns Representation of the filter (e.g. "My preset", "From 2 weeks ago to 1 week ahead")
 */
export declare const getDateFilterTitleUsingTranslator: (filter: DateFilterOption, translator: IDateAndMessageTranslator, dateFormat?: string) => string;
export declare const getDateFilterRepresentation: (filter: DateFilterOption, locale: ILocale, dateFormat?: string) => string;
