import { IWorkspaceSettings } from "@gooddata/sdk-backend-spi";
/**
 * @beta
 */
export declare const pickCorrectInsightWording: (translations: Record<string, string>, settings?: IWorkspaceSettings) => Record<string, string>;
/**
 * The function to pick correct wording 'measure' or 'metric'
 * @beta
 */
export declare const pickCorrectMetricWording: (translations: Record<string, string>, settings?: IWorkspaceSettings) => Record<string, string>;
/**
 * @beta
 */
export declare const pickCorrectWording: (translations: Record<string, string>, settings?: IWorkspaceSettings) => Record<string, string>;
/**
 * @beta
 */
export declare const removeAllInsightToReportTranslations: (translations: Record<string, string>) => Record<string, string>;
/**
 * The function to remove all translation keys that contain special suffixes "|report", "|insight", "._measure" or "._metric"
 * @beta
 */
export declare const removeAllWordingTranslationsWithSpecialSuffix: (translations: Record<string, string>) => Record<string, string>;
//# sourceMappingURL=utils.d.ts.map