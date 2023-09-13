import { ILocale } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export type EmbedType = "react" | "webComponents";
/**
 * @internal
 */
export type InsightCodeType = "definition" | "reference";
/**
 * @internal
 */
export type InsightComponentType = "programmatic" | "referential";
/**
 * @internal
 */
export type CodeLanguageType = "js" | "ts";
/**
 * @internal
 */
export type UnitsType = "px" | "%" | "rem" | "em";
/**
 * @internal
 */
export declare const UNITS: UnitsType[];
/**
 * @internal
 */
export declare const LOCALES: ILocale[];
export declare const DEFAULT_LOCALE = "en-US";
/**
 * @internal
 */
export type UnitMap = {
    [key in UnitsType]: string;
};
/**
 * @internal
 */
export declare const DEFAULT_UNIT: UnitsType;
/**
 * @internal
 */
export declare const DEFAULT_HEIGHT: UnitMap;
/**
 * @internal
 */
export type CopyCodeOriginType = "keyboard" | "button";
/**
 * @internal
 */
export interface IReactOptions {
    type: "react";
    componentType: InsightCodeType;
    codeType: CodeLanguageType;
    displayConfiguration: boolean;
    customHeight: boolean;
    height?: string;
    unit?: UnitsType;
}
/**
 * @internal
 */
export interface IWebComponentsOptions {
    type: "webComponents";
    displayTitle: boolean;
    customTitle: boolean;
    allowLocale: boolean;
    locale?: ILocale;
    customHeight: boolean;
    height?: string;
    unit?: UnitsType;
}
/**
 * @internal
 */
export type EmbedOptionsType = IReactOptions | IWebComponentsOptions;
//# sourceMappingURL=types.d.ts.map