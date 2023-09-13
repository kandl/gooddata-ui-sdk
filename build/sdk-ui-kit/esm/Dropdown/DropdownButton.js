// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Button } from "../Button/Button.js";
/**
 * @internal
 */
export const DropdownButton = ({ id, className, value, title = value, disabled, isOpen, isSmall = true, iconLeft, onClick, }) => {
    const buttonClasses = cx("gd-button-primary", "button-dropdown", "dropdown-button", {
        "gd-button-small": isSmall,
        "is-dropdown-open": isOpen,
        "is-active": isOpen,
    }, className);
    return (React.createElement(Button, { id: id, title: title && typeof title === "string" ? title : undefined, className: buttonClasses, value: value, iconLeft: iconLeft, iconRight: isOpen ? "gd-icon-navigateup" : "gd-icon-navigatedown", disabled: disabled, onClick: onClick }));
};
//# sourceMappingURL=DropdownButton.js.map