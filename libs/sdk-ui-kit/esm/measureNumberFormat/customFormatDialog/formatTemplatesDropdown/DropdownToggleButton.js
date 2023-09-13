// (C) 2020 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
const DropdownToggleButton = ({ toggleDropdown, isOpened }) => (React.createElement("div", { className: "gd-measure-format-button gd-measure-format-button-templates s-measure-format-templates-toggle-button", onClick: toggleDropdown },
    React.createElement("span", null,
        React.createElement(FormattedMessage, { id: "measureNumberCustomFormatDialog.template.title" })),
    React.createElement("div", { className: cx("gd-measure-format-button-icon-right", isOpened ? "gd-icon-navigateup" : "gd-icon-navigatedown") })));
export default DropdownToggleButton;
//# sourceMappingURL=DropdownToggleButton.js.map