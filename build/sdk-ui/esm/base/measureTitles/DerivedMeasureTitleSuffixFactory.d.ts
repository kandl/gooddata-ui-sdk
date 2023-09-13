import { OverTimeComparisonType } from "../interfaces/OverTimeComparison.js";
import { ILocale } from "../localization/Locale.js";
/**
 * Factory that builds formatted localized suffix string for derived measure based on the over time comparison type.
 * The suffix is used during AFM execution and for bucket item titles.
 *
 * @internal
 */
export declare class DerivedMeasureTitleSuffixFactory {
    private readonly locale;
    /**
     * Create a new instance of the class.
     * @param locale - The locale used for translation.
     */
    constructor(locale: ILocale);
    /**
     * Returns formatted localized suffix string for derived measure based on the over time comparison type.
     * In case when unsupported over time comparison type is provided the empty string is returned.
     *
     * @param overTimeComparisonType - The over time comparison type for which the
     *      suffix must be obtained.
     * @returns localized suffix
     */
    getSuffix(overTimeComparisonType: OverTimeComparisonType): string;
    private getSuffixLocalizationKey;
    private translateKey;
}
//# sourceMappingURL=DerivedMeasureTitleSuffixFactory.d.ts.map