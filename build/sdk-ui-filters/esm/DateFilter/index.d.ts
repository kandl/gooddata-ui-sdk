import { filterVisibleDateFilterOptions } from "./utils/OptionUtils.js";
export { IDateAndMessageTranslator, IDateTranslator, IMessageTranslator, } from "./utils/Translations/Translators.js";
import { DateFilter, IDateFilterCallbackProps, IDateFilterOwnProps, IDateFilterProps, IDateFilterState, IDateFilterStatePropsIntersection } from "./DateFilter.js";
/**
 * @beta
 */
declare const DateFilterHelpers: {
    validateFilterOption: (filterOption: import("./interfaces/index.js").DateFilterOption) => import("./interfaces/index.js").IExtendedDateFilterErrors;
    getDateFilterTitle: (filter: import("./interfaces/index.js").DateFilterOption, locale: import("@gooddata/sdk-ui").ILocale, dateFormat?: string) => string;
    getDateFilterTitleUsingTranslator: (filter: import("./interfaces/index.js").DateFilterOption, translator: import("./utils/Translations/Translators.js").IDateAndMessageTranslator, dateFormat?: string) => string;
    getDateFilterRepresentation: (filter: import("./interfaces/index.js").DateFilterOption, locale: import("@gooddata/sdk-ui").ILocale, dateFormat?: string) => string;
    granularityIntlCodes: {
        "GDC.time.year": import("./constants/i18n.js").GranularityIntlKey;
        "GDC.time.week_us": import("./constants/i18n.js").GranularityIntlKey;
        "GDC.time.quarter": import("./constants/i18n.js").GranularityIntlKey;
        "GDC.time.month": import("./constants/i18n.js").GranularityIntlKey;
        "GDC.time.date": import("./constants/i18n.js").GranularityIntlKey;
        "GDC.time.hour": import("./constants/i18n.js").GranularityIntlKey;
        "GDC.time.minute": import("./constants/i18n.js").GranularityIntlKey;
    };
    applyExcludeCurrentPeriod: (dateFilterOption: import("./interfaces/index.js").DateFilterOption, excludeCurrentPeriod: boolean) => import("./interfaces/index.js").DateFilterOption;
    defaultDateFilterOptions: import("./interfaces/index.js").IDateFilterOptionsByType;
    canExcludeCurrentPeriod: (dateFilterOption: import("./interfaces/index.js").DateFilterOption) => boolean;
    mapOptionToAfm: (value: import("./interfaces/index.js").DateFilterOption, dateDataSet: import("@gooddata/sdk-model").ObjRef, excludeCurrentPeriod: boolean) => import("@gooddata/sdk-model").IDateFilter;
    formatAbsoluteDateRange: (from: string | Date, to: string | Date, dateFormat: string) => string;
    formatRelativeDateRange: (from: number, to: number, granularity: import("@gooddata/sdk-model").DateFilterGranularity, translator: import("./utils/Translations/Translators.js").IDateAndMessageTranslator) => string;
    filterVisibleDateFilterOptions: typeof filterVisibleDateFilterOptions;
};
export { DateFilter, IDateFilterCallbackProps, IDateFilterOwnProps, IDateFilterProps, IDateFilterState, DateFilterHelpers, IDateFilterStatePropsIntersection, filterVisibleDateFilterOptions, };
export { AbsoluteDateFilterOption, DateFilterOption, DateFilterRelativeOptionGroup, IDateFilterOptionsByType, IExtendedDateFilterErrors, IDateFilterAbsoluteFormErrors, IDateFilterRelativeFormErrors, RelativeDateFilterOption, isAbsoluteDateFilterOption, isRelativeDateFilterOption, IUiAbsoluteDateFilterForm, IUiRelativeDateFilterForm, isUiRelativeDateFilterForm, } from "./interfaces/index.js";
export { defaultDateFilterOptions } from "./constants/config.js";
export { GranularityIntlKey } from "./constants/i18n.js";
export { getLocalizedIcuDateFormatPattern } from "./utils/FormattingUtils.js";
