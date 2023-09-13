// (C) 2020-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import PreviewRows from "../shared/PreviewRows.js";
export class ExtendedPreview extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            expanded: false,
        };
        this.openExtendedPreview = () => {
            this.setState({ expanded: true });
        };
    }
    render() {
        const { expanded } = this.state;
        const { format, separators } = this.props;
        return (React.createElement("div", { className: "gd-measure-format-extended-preview s-custom-format-dialog-extended-preview" },
            React.createElement("div", { className: cx("s-custom-format-dialog-extended-preview-button gd-measure-format-button", {
                    hidden: expanded,
                }), onClick: this.openExtendedPreview },
                React.createElement("div", { className: "gd-icon-navigateright gd-measure-format-button-icon-left" }),
                React.createElement("span", null,
                    React.createElement(FormattedMessage, { id: "measureNumberCustomFormatDialog.extendedPreview.button" }))),
            expanded ? React.createElement(PreviewRows, { format: format, separators: separators }) : null));
    }
}
//# sourceMappingURL=ExtendedPreview.js.map