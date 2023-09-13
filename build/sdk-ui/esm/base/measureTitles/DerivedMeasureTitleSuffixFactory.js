// (C) 2007-2023 GoodData Corporation
import { getTranslation } from "../localization/IntlStore.js";
import { OverTimeComparisonTypes } from "../interfaces/OverTimeComparison.js";
import { messages } from "../../locales.js";
/**
 * Factory that builds formatted localized suffix string for derived measure based on the over time comparison type.
 * The suffix is used during AFM execution and for bucket item titles.
 *
 * @internal
 */
export class DerivedMeasureTitleSuffixFactory {
    /**
     * Create a new instance of the class.
     * @param locale - The locale used for translation.
     */
    constructor(locale) {
        this.locale = locale;
    }
    /**
     * Returns formatted localized suffix string for derived measure based on the over time comparison type.
     * In case when unsupported over time comparison type is provided the empty string is returned.
     *
     * @param overTimeComparisonType - The over time comparison type for which the
     *      suffix must be obtained.
     * @returns localized suffix
     */
    getSuffix(overTimeComparisonType) {
        const localizationKey = this.getSuffixLocalizationKey(overTimeComparisonType);
        return localizationKey === null ? "" : ` - ${this.translateKey(localizationKey)}`;
    }
    getSuffixLocalizationKey(overTimeComparisonType) {
        switch (overTimeComparisonType) {
            case OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR:
                return messages.samePeriodYearAgo;
            case OverTimeComparisonTypes.PREVIOUS_PERIOD:
                return messages.previousPeriod;
            default:
                return null;
        }
    }
    translateKey(localizationKey) {
        return getTranslation(localizationKey, this.locale);
    }
}
//# sourceMappingURL=DerivedMeasureTitleSuffixFactory.js.map