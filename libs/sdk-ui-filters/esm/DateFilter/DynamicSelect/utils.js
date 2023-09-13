// (C) 2019-2022 GoodData Corporation
import range from "lodash/range.js";
import { granularityIntlCodes } from "../constants/i18n.js";
import { getSelectableItems } from "../Select/utils.js";
import { messages } from "../../locales.js";
export const MINUTE = "GDC.time.minute";
export const HOUR = "GDC.time.hour";
export const DAY = "GDC.time.date";
export const WEEK_US = "GDC.time.week_us";
export const MONTH = "GDC.time.month";
export const QUARTER = "GDC.time.quarter";
export const YEAR = "GDC.time.year";
const emptyInputInfo = {
    inputCategory: "Empty",
};
const tooBigInputInfo = {
    inputCategory: "TooBig",
};
const granularityOffsetLimits = {
    [MINUTE]: 120,
    [HOUR]: 48,
    [DAY]: 365,
    [WEEK_US]: 104,
    [MONTH]: 60,
    [QUARTER]: 20,
    [YEAR]: 20,
};
const offsetMaxValue = 99999;
const getTrimmedInput = (input) => input === null || input === void 0 ? void 0 : input.trim();
const isOffsetReasonablyBig = (offset) => Math.abs(offset) <= offsetMaxValue;
const parseInput = (trimmedInput) => {
    if (!trimmedInput) {
        return emptyInputInfo;
    }
    // matches only integers, we do not want to support floats
    const numericMatch = /^[^-\d]*(-?\d+)(?:\s|$)/.exec(trimmedInput);
    if (numericMatch) {
        const numericText = numericMatch[1];
        const numericValue = Number.parseInt(numericText, 10);
        return isOffsetReasonablyBig(numericValue)
            ? {
                offset: numericValue,
                isOnlyNumber: numericText === trimmedInput,
                inputCategory: "Numeric",
            }
            : tooBigInputInfo;
    }
    return {
        inputCategory: "Textual",
        trimmedValue: trimmedInput,
    };
};
const getOption = (offset, granularity, intl) => {
    const dateCode = granularityIntlCodes[granularity];
    const offsetCode = offset < 0 ? "history" : offset === 0 ? "today" : "future";
    return {
        type: "option",
        value: offset,
        label: intl.formatMessage(messages[`${dateCode}_${offsetCode}`], { offset, n: Math.abs(offset) }),
    };
};
const getOptionsForOffsets = (offsets, granularity, intl) => offsets.map((offset) => getOption(offset, granularity, intl));
const getDefaultOptions = (granularity, intl) => {
    const optionRange = granularityOffsetLimits[granularity];
    const negativeOptions = getOptionsForOffsets(range(-optionRange, 0), granularity, intl);
    const positiveOptions = getOptionsForOffsets(range(1, optionRange + 1), granularity, intl);
    return [
        ...negativeOptions,
        { type: "separator" },
        getOption(0, granularity, intl),
        { type: "separator" },
        ...positiveOptions,
    ];
};
const getTooBigOptions = (intl) => [
    {
        type: "error",
        label: intl.formatMessage({ id: "filters.floatingRange.tooBig" }, { limit: offsetMaxValue }),
    },
];
const getNoMatchOptions = (intl) => [
    {
        type: "error",
        label: intl.formatMessage({ id: "filters.floatingRange.noMatch" }),
    },
];
const getOptionsByNumber = (offset, granularity, intl) => {
    // for positive offsets, show the "ahead" option first
    // to allow power users to use positive numbers for "ahead" and negative for "ago"
    // and doing just -5 -> enter -> 5 -> enter to make the filter from 5 ago to 5 ahead
    const offsets = offset > 0 ? [offset, -offset] : [offset];
    return getOptionsForOffsets(offsets, granularity, intl);
};
const getFullTextOptions = (offset, granularity, intl) => {
    const coreOffsets = [-1, 0, 1];
    const absOffset = Math.abs(offset);
    const offsets = offset !== undefined && absOffset > 1 ? [-absOffset, ...coreOffsets, absOffset] : coreOffsets;
    return getOptionsForOffsets(offsets, granularity, intl);
};
const getFullTextMatches = (trimmedInput, offset, granularity, intl) => {
    const searchString = trimmedInput.toLowerCase();
    const matches = getFullTextOptions(offset, granularity, intl).filter((option) => option.label.toLowerCase().includes(searchString));
    return matches.length > 0 ? matches : getNoMatchOptions(intl);
};
export const findRelativeDateFilterOptionByLabel = (options, input) => {
    const trimmedInput = getTrimmedInput(input);
    return getSelectableItems(options).find((option) => option.label === trimmedInput);
};
export const findRelativeDateFilterOptionByValue = (options, value) => {
    return getSelectableItems(options).find((option) => option.value === value);
};
export function getRelativeDateFilterItems(input = "", granularity = DAY, intl) {
    const trimmedInput = getTrimmedInput(input);
    const inputInfo = parseInput(trimmedInput);
    switch (inputInfo.inputCategory) {
        case "Empty":
            return getDefaultOptions(granularity, intl);
        case "TooBig":
            return getTooBigOptions(intl);
        case "Textual":
            return getFullTextMatches(inputInfo.trimmedValue, undefined, granularity, intl);
        case "Numeric": {
            const { offset, isOnlyNumber } = inputInfo;
            return isOnlyNumber
                ? getOptionsByNumber(offset, granularity, intl)
                : getFullTextMatches(trimmedInput, offset, granularity, intl);
        }
    }
}
//# sourceMappingURL=utils.js.map