import React from "react";
import "codemirror/addon/mode/simple.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/display/placeholder.js";
/**
 * @internal
 */
export interface ISyntaxHighlightingInputProps {
    value: string;
    onChange: (value: string) => void;
    onCursor?: (from: number, to: number) => void;
    formatting?: any;
    customOptions?: any;
    className?: string;
}
/**
 * @internal
 */
export declare const SyntaxHighlightingInput: React.FC<ISyntaxHighlightingInputProps>;
//# sourceMappingURL=SyntaxHighlightingInput.d.ts.map