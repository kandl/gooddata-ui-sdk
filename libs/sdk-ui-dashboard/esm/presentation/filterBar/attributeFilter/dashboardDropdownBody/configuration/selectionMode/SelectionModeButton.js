// (C) 2022-2023 GoodData Corporation
import cx from "classnames";
import { Button } from "@gooddata/sdk-ui-kit";
import React from "react";
export const SelectionModeButton = (props) => {
    const { title, isOpen, toggleDropdown } = props;
    const buttonClassNames = cx("gd-button-primary", "gd-button-small", "button-dropdown", "dropdown-button", "selection-mode-dropdown-button", "s-selection-mode-dropdown-button", {
        "is-active": isOpen,
    });
    const iconRight = isOpen ? "gd-icon-navigateup" : "gd-icon-navigatedown";
    return (React.createElement(Button, { className: buttonClassNames, title: title, value: title, onClick: toggleDropdown, iconRight: iconRight }));
};
//# sourceMappingURL=SelectionModeButton.js.map