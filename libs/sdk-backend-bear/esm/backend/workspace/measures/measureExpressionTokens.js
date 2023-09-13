// (C) 2019-2023 GoodData Corporation
import flow from "lodash/flow.js";
import filter from "lodash/fp/filter.js";
import map from "lodash/fp/map.js";
import uniq from "lodash/fp/uniq.js";
const REMOVE_BRACKETS_REGEXP = /[[\]{}]/g;
const TOKEN_TYPE_REGEXP_PAIRS = [
    ["text", /^[^#{}[\]"()0-9.]+/],
    ["quoted_text", /^"(?:[^"\\]|\\"|\\'|\\\\.)*"/],
    ["number", /^[+-]?((\d+(\.\d*)?)|(\.\d+))/],
    ["bracket", /^[()]+/],
    ["identifier", /^\{[^}]+\}/],
    ["element_uri", /^\[[a-zA-Z0-9\\/]+elements\?id=\d+\]/],
    ["uri", /^\[[a-zA-Z0-9\\/]+\]/],
    ["comment", /#[^\n]*/],
];
export const getTokenValuesOfType = (tokenType, tokens) => flow(filter((token) => token.type === tokenType), map((token) => token.value), uniq)(tokens);
export const tokenizeExpression = (expression) => {
    const tokens = [];
    let _expression = expression;
    while (_expression.length) {
        let match;
        for (const [type, regExp] of TOKEN_TYPE_REGEXP_PAIRS) {
            match = _expression.match(regExp);
            if (match) {
                const [value] = match;
                tokens.push({ type, value });
                _expression = _expression.substr(value.length);
                break;
            }
        }
        if (!match) {
            throw new Error(`Unable to match token, rest of output is: "${_expression}"`);
        }
    }
    return tokens.map((token) => (Object.assign(Object.assign({}, token), { value: token.type === "comment" ? token.value : token.value.replace(REMOVE_BRACKETS_REGEXP, "") })));
};
//# sourceMappingURL=measureExpressionTokens.js.map