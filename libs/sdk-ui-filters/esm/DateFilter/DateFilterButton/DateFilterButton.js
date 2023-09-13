// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
export const DateFilterButton = ({ isOpen, isMobile, title, children, disabled, }) => {
    return (React.createElement("div", { className: cx("s-date-filter-button", "gd-date-filter-button", "dropdown-button", isMobile && "gd-date-filter-button-mobile", isOpen && "is-active", disabled && "disabled") },
        React.createElement("div", { className: "button-content" },
            React.createElement("div", { className: "s-date-filter-title button-title" }, title),
            React.createElement("div", { className: "button-subtitle" }, children))));
};
//# sourceMappingURL=DateFilterButton.js.map