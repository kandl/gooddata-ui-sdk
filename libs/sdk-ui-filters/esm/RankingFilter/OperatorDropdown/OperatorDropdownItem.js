// (C) 2020 GoodData Corporation
import React from "react";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
export const OperatorDropdownItem = ({ title, value, isSelected, onSelect, }) => {
    const className = cx("gd-list-item", "gd-list-item-shortened", {
        "is-selected": isSelected,
    }, "gd-button-link", `s-rf-operator-${stringUtils.simplifyText(title)}`);
    return (React.createElement("button", { className: className, onClick: () => onSelect(value) },
        React.createElement("span", null, title)));
};
//# sourceMappingURL=OperatorDropdownItem.js.map