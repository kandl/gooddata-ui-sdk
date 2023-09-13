// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
/**
 * @internal
 */
export const CodeLanguageSelect = (props) => {
    const { selectedLanguage, onLanguageChanged } = props;
    const onCheck = useCallback((e) => {
        const value = e.target.value;
        onLanguageChanged(value);
    }, [onLanguageChanged]);
    return (React.createElement("div", { className: "embed-insight-dialog-lang-selector" },
        React.createElement("strong", { className: "bottom-space" },
            React.createElement(FormattedMessage, { id: "embedInsightDialog.code.language.codeAs" })),
        React.createElement("label", { className: "input-radio-label bottom-space s-language-ts" },
            React.createElement("input", { type: "radio", className: "input-radio", value: "ts", checked: selectedLanguage === "ts", onChange: onCheck }),
            React.createElement("span", { className: "input-label-text" }, "TypeScript")),
        React.createElement("label", { className: "input-radio-label bottom-space s-language-js" },
            React.createElement("input", { type: "radio", className: "input-radio", value: "js", checked: selectedLanguage === "js", onChange: onCheck }),
            React.createElement("span", { className: "input-label-text" }, "JavaScript"))));
};
//# sourceMappingURL=CodeLanguageSelect.js.map