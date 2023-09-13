// (C) 2007-2019 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { DateFilterButton } from "../DateFilterButton/DateFilterButton.js";
import { DateFilterTextLocalized } from "../DateFilterTextLocalized/DateFilterTextLocalized.js";
export const DateFilterButtonLocalized = ({ dateFilterOption, dateFormat, isOpen = false, isMobile = true, customFilterName, disabled, }) => {
    return (React.createElement(DateFilterButton, { title: customFilterName || React.createElement(FormattedMessage, { id: "dateFilterDropdown.title" }), isOpen: isOpen, isMobile: isMobile, disabled: disabled },
        React.createElement("span", { className: "s-button-text" },
            React.createElement(DateFilterTextLocalized, { filter: dateFilterOption, dateFormat: dateFormat }))));
};
//# sourceMappingURL=DateFilterButtonLocalized.js.map