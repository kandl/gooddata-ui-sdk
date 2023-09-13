// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { FormatTemplatesDropdown } from "./formatTemplatesDropdown/FormatTemplatesDropdown.js";
import { SyntaxHighlightingInput } from "../../syntaxHighlightingInput/SyntaxHighlightingInput.js";
const formattingRules = {
    start: [
        { regex: /"(?:[^\\]|\\.)*?"/, token: "string" },
        { regex: /(?:black|blue|cyan|green|magenta|red|yellow|white)\b/i, token: "keyword" },
        {
            regex: /(backgroundColor|color)(=)([a-f0-9]{6}|[a-f0-9]{3})/i,
            token: ["variable-4", null, "keyword"],
        },
        {
            // disabling for legibility
            // eslint-disable-next-line regexp/prefer-character-class
            regex: /(<|>|=|>=|<=)(-?)(\d*(\.|,)?\d+|Null)/i,
            token: ["variable-5", "variable-5", "variable-5"],
        },
        { regex: /\/\/.*/, token: "comment" },
        { regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3" },
        { regex: /\/\*/, token: "comment", next: "comment" },
        { regex: /[{[(]/, indent: true, token: "variable-brackets" },
        { regex: /[}\])]/, dedent: true, token: "variable-brackets" },
        { regex: /[a-z$][\w$]*/, token: "variable" },
        { regex: /<</, token: "meta", mode: { spec: "xml", end: />>/ } },
    ],
    comment: [
        { regex: /.*?\*\//, token: "comment", next: "start" },
        { regex: /.*/, token: "comment" },
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//",
    },
};
class FormatInput extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleInputChange = (value) => {
            this.props.onFormatChange(value);
        };
    }
    render() {
        const { format, onFormatChange, separators, templates, intl } = this.props;
        return (React.createElement("div", { className: "gd-measure-custom-format-dialog-section" },
            React.createElement("div", { className: "gd-measure-custom-format-dialog-section-title" },
                React.createElement("span", null, intl.formatMessage({ id: "measureNumberCustomFormatDialog.definition" })),
                templates ? (React.createElement(FormatTemplatesDropdown, { onChange: onFormatChange, separators: separators, templates: templates })) : null),
            React.createElement(SyntaxHighlightingInput, { value: format, formatting: formattingRules, onChange: this.handleInputChange, className: "s-custom-format-input" })));
    }
}
const FormatInputWithIntl = injectIntl(FormatInput);
export default FormatInputWithIntl;
//# sourceMappingURL=FormatInput.js.map