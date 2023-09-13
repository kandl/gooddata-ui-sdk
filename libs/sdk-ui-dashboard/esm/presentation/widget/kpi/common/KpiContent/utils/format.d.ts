import { ISeparators } from "@gooddata/sdk-model";
export declare const HYPHEN = "\u2013";
export declare function formatMetric(number: string | number | null | undefined, format?: string, separators?: ISeparators): string;
export declare function isValueUnhandledNull(value: string | number | null | undefined, format: string): boolean;
