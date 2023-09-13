// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { stringUtils } from "@gooddata/util";
import PreviewRows from "../shared/PreviewRows.js";
import { Bubble } from "../../../Bubble/index.js";
import { Typography } from "../../../Typography/index.js";
function templateDropdownItemId(template) {
    return `gd-format-preset-template-${template.localIdentifier}`;
}
export default class DropdownItem extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            displayHelp: false,
        };
        this.onClick = () => {
            this.props.onClick(this.props.template);
        };
        this.toggleHelp = () => {
            this.setState((state) => ({ displayHelp: !state.displayHelp }));
        };
    }
    render() {
        const { template, separators } = this.props;
        const { displayHelp } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: templateDropdownItemId(template), className: `gd-list-item gd-format-preset gd-format-template s-measure-format-template-${stringUtils.simplifyText(template.name)}`, onClick: this.onClick },
                React.createElement("span", { title: template.name, className: "gd-format-preset-name gd-list-item-shortened" }, template.name),
                React.createElement("div", { className: "gd-format-template-help gd-icon-circle-question s-measure-format-template-help-toggle-icon", onMouseEnter: this.toggleHelp, onMouseLeave: this.toggleHelp })),
            displayHelp ? (React.createElement(Bubble, { alignTo: `#${templateDropdownItemId(template)}`, className: `gd-measure-format-template-preview-bubble bubble-light s-measure-format-template-help-bubble-${stringUtils.simplifyText(template.name)}`, alignPoints: [{ align: "cr cl" }, { align: "cr bl" }, { align: "cr tl" }] },
                React.createElement(Typography, { className: "gd-measure-format-template-preview-bubble-title", tagName: "h3" }, template.name),
                React.createElement("div", { className: `gd-measure-format-template-preview-bubble-subtitle s-measure-format-template-help-preview-${stringUtils.simplifyText(template.name)}` },
                    React.createElement(FormattedMessage, { id: "measureNumberCustomFormatDialog.template.preview.title" })),
                React.createElement(PreviewRows, { previewNumbers: [
                        -1234567.891, -1234.567, -1.234, 0, 1.234, 1234.567, 1234567.891,
                    ], format: template.format, separators: separators }))) : null));
    }
}
//# sourceMappingURL=DropdownItem.js.map