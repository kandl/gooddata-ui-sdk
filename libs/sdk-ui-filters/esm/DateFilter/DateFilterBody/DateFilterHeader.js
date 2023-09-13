import { __rest } from "tslib";
// (C) 2019 GoodData Corporation
import React from "react";
export const DateFilterHeader = (_a) => {
    var { children, changeRoute } = _a, otherProps = __rest(_a, ["children", "changeRoute"]);
    return (React.createElement("button", Object.assign({ className: "gd-extended-date-filter-header s-do-not-close-dropdown-on-click", onClick: (e) => {
            e.preventDefault();
            changeRoute(null);
        } }, otherProps),
        React.createElement("span", { className: "gd-icon-navigateleft" }),
        "\u2003",
        children));
};
//# sourceMappingURL=DateFilterHeader.js.map