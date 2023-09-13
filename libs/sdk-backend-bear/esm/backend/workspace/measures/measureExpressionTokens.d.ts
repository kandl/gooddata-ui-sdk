type ExpressionTokenType = "text" | "quoted_text" | "number" | "bracket" | "identifier" | "uri" | "element_uri" | "comment";
export interface IExpressionToken {
    type: ExpressionTokenType;
    value: string;
}
export declare const getTokenValuesOfType: (tokenType: ExpressionTokenType, tokens: IExpressionToken[]) => string[];
export declare const tokenizeExpression: (expression: string) => IExpressionToken[];
export {};
//# sourceMappingURL=measureExpressionTokens.d.ts.map