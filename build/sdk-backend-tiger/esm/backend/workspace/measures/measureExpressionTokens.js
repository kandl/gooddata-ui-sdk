const REMOVE_BRACKETS_REGEXP = /[[\]{}]/g;
const TOKEN_TYPE_REGEXP_PAIRS = [
    ["text", /^[^#{}[\]"()0-9.]+/],
    ["quoted_text", /^"(?:[^"\\]|\\"|\\'|\\\\.)*"/],
    ["number", /^[+-]?((\d+(\.\d*)?)|(\.\d+))/],
    ["bracket", /^[()]+/],
    ["fact", /^\{fact\/[^}]*\}/],
    ["metric", /^\{metric\/[^}]*\}/],
    ["label", /^\{label\/[^}]*\}/],
    ["attribute", /^\{attribute\/[^}]*\}/],
    ["dataset", /^\{dataset\/[^}]*\}/],
    ["comment", /#[^\n]*/],
];
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