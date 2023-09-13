import React from "react";
import { CodeLanguageType } from "../types.js";
/**
 * @internal
 */
export interface ICodeLanguageSelectProps {
    selectedLanguage: CodeLanguageType;
    onLanguageChanged: (language: CodeLanguageType) => void;
}
/**
 * @internal
 */
export declare const CodeLanguageSelect: React.VFC<ICodeLanguageSelectProps>;
//# sourceMappingURL=CodeLanguageSelect.d.ts.map