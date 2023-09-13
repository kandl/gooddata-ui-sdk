// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
export const RankingFilterButton = ({ isActive, onClick, title, className, }) => {
    const buttonClassName = cx("gd-button", "gd-button-secondary", "gd-button-small", "button-dropdown", "gd-icon-right", { "gd-icon-navigateup": isActive, "gd-icon-navigatedown": !isActive }, "s-rf-dropdown-button", className);
    return (React.createElement("button", { className: buttonClassName, onClick: onClick }, title));
};
//# sourceMappingURL=RankingFilterButton.js.map