import { messages } from "../../locales.js";
export const getOperatorTranslationKey = (operator) => {
    return messages[operator].id;
};
export const getOperatorIcon = (operator) => {
    const iconNamesDictionary = {
        ALL: "all",
        GREATER_THAN: "greater-than",
        GREATER_THAN_OR_EQUAL_TO: "greater-than-equal-to",
        LESS_THAN: "less-than",
        LESS_THAN_OR_EQUAL_TO: "less-than-equal-to",
        EQUAL_TO: "equal-to",
        NOT_EQUAL_TO: "not-equal-to",
        BETWEEN: "between",
        NOT_BETWEEN: "not-between",
    };
    return iconNamesDictionary[operator];
};
//# sourceMappingURL=measureValueFilterOperator.js.map