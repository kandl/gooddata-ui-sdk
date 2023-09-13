// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Button } from "@gooddata/sdk-ui-kit";
export const AttributeDisplayFormDropdownButton = ({ title, isOpened, toggleDropdown, }) => {
    const buttonClassNames = cx("gd-button-primary", "gd-button-small", "button-dropdown", "dropdown-button", "attribute-display-form-button", "s-attribute-display-form-button", {
        "is-active": isOpened,
    });
    const iconRight = isOpened ? "gd-icon-navigateup" : "gd-icon-navigatedown";
    return (React.createElement(Button, { className: buttonClassNames, title: title, value: title, onClick: toggleDropdown, iconRight: iconRight }));
};
//# sourceMappingURL=AttributeDisplayFormDropdownButton.js.map