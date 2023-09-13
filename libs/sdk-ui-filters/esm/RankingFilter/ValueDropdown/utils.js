const MAX_VALUE = 99999;
const DEFAULT_ITEMS = [3, 5, 10, 15, 20, 25, 50, 100].map((value) => ({
    type: "option",
    value,
    label: `${value}`,
}));
const trimInput = (input) => input === null || input === void 0 ? void 0 : input.trim();
const matchNumericValues = (input) => /^[^-\d]*(-?\d+)(?:\s|$)/.exec(input);
const sanitizeNumericValue = (value, intl) => {
    if (value < 1) {
        return [{ type: "error", label: intl.formatMessage({ id: "rankingFilter.valueTooSmall" }) }];
    }
    else if (value > MAX_VALUE) {
        return [{ type: "error", label: intl.formatMessage({ id: "rankingFilter.valueTooLarge" }) }];
    }
    return DEFAULT_ITEMS.filter((item) => item.label.toLowerCase().includes(value.toString()));
};
export const sanitizeCustomInput = (input) => input && matchNumericValues(input) && Number(input) > 0 && Number(input) <= MAX_VALUE;
export const sanitizeInput = (input, intl) => {
    if (!input) {
        return DEFAULT_ITEMS;
    }
    const trimmedInput = trimInput(input);
    const numericMatch = matchNumericValues(trimmedInput);
    if (numericMatch) {
        const numericText = numericMatch[1];
        const numericValue = Number.parseInt(numericText, 10);
        return sanitizeNumericValue(numericValue, intl);
    }
    return [{ type: "error", label: intl.formatMessage({ id: "rankingFilter.valueTooSmall" }) }];
};
//# sourceMappingURL=utils.js.map