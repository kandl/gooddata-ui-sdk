export type ExpressionTokenType = "text" | "quoted_text" | "number" | "bracket" | "fact" | "metric" | "attribute" | "label" | "dataset" | "comment";
export interface IExpressionToken {
    type: ExpressionTokenType;
    value: string;
}
export declare const tokenizeExpression: (expression: string) => IExpressionToken[];
//# sourceMappingURL=measureExpressionTokens.d.ts.map