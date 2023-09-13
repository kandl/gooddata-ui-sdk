// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
export const ConnectingAttributeItem = ({ title, icon, selected, onClick, }) => {
    const handleOnClick = (e) => {
        onClick();
        e.preventDefault();
    };
    const className = cx("gd-list-item", `s-${stringUtils.simplifyText(title)}`, {
        "is-selected": selected,
    });
    return (React.createElement("div", { className: className, onClick: handleOnClick },
        React.createElement("span", { className: cx("gd-list-icon", icon) }),
        React.createElement("span", null, title)));
};
//# sourceMappingURL=ConnectingAttributeItem.js.map