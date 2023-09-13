// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
const DropdownButton = ({ isActive, buttonTitle, onClick }) => {
    const className = cx("gd-mvf-dropdown-button", "s-mvf-dropdown-button", "gd-button", "gd-button-secondary", "button-dropdown", "gd-icon-right", { "gd-icon-navigateup": isActive, "gd-icon-navigatedown": !isActive });
    return (React.createElement("button", { className: className, onClick: onClick }, buttonTitle));
};
export default DropdownButton;
//# sourceMappingURL=MeasureValueFilterButton.js.map