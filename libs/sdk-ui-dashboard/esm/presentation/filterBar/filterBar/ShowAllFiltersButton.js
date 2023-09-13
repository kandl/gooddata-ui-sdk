// (C) 2021-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
export const ShowAllFiltersButton = ({ isVisible, isFilterBarExpanded, onToggle, }) => {
    if (!isVisible) {
        return null;
    }
    const icon = isFilterBarExpanded ? "gd-icon-chevron-up" : "gd-icon-chevron-down";
    return (React.createElement("div", { className: "show-all" },
        React.createElement("button", { className: "button-filter-bar-show-all", tabIndex: -1, onClick: () => onToggle(!isFilterBarExpanded) },
            React.createElement("span", { className: "gd-button-text gd-label" },
                isFilterBarExpanded ? (React.createElement(FormattedMessage, { id: "filterBar.showLess" })) : (React.createElement(FormattedMessage, { id: "filterBar.showAll" })),
                React.createElement("i", { className: `gd-button-icon gd-icon ${icon}` })))));
};
//# sourceMappingURL=ShowAllFiltersButton.js.map