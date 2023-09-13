// (C) 2007-2022 GoodData Corporation
import { granularityIntlCodes } from "./constants/i18n.js";
import { defaultDateFilterOptions } from "./constants/config.js";
import { validateFilterOption } from "./validation/OptionValidation.js";
import { mapOptionToAfm } from "./utils/AFMConversions.js";
import { applyExcludeCurrentPeriod, canExcludeCurrentPeriod } from "./utils/PeriodExclusion.js";
import { filterVisibleDateFilterOptions } from "./utils/OptionUtils.js";
import { getDateFilterTitle, getDateFilterRepresentation, getDateFilterTitleUsingTranslator, formatAbsoluteDateRange, formatRelativeDateRange, } from "./utils/Translations/DateFilterTitle.js";
import { DateFilter, } from "./DateFilter.js";
/**
 * @beta
 */
const DateFilterHelpers = {
    validateFilterOption,
    getDateFilterTitle,
    getDateFilterTitleUsingTranslator,
    getDateFilterRepresentation,
    granularityIntlCodes,
    applyExcludeCurrentPeriod,
    defaultDateFilterOptions,
    canExcludeCurrentPeriod,
    mapOptionToAfm,
    formatAbsoluteDateRange,
    formatRelativeDateRange,
    filterVisibleDateFilterOptions,
};
// This is 1:1 reexported by root index.ts and is part of SDK's public API
export { DateFilter, DateFilterHelpers, filterVisibleDateFilterOptions, };
export { isAbsoluteDateFilterOption, isRelativeDateFilterOption, isUiRelativeDateFilterForm, } from "./interfaces/index.js";
export { defaultDateFilterOptions } from "./constants/config.js";
export { getLocalizedIcuDateFormatPattern } from "./utils/FormattingUtils.js";
//# sourceMappingURL=index.js.map