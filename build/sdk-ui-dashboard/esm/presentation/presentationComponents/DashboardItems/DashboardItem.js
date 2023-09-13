import { __rest } from "tslib";
// (C) 2020-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
// done like this instead of a template string so that the code is greppable for the individual classes
const screenClasses = {
    xs: "layout-xs",
    sm: "layout-sm",
    md: "layout-md",
    lg: "layout-lg",
    xl: "layout-xl",
};
export const DashboardItem = (_a) => {
    var { className, screen } = _a, props = __rest(_a, ["className", "screen"]);
    return React.createElement("div", Object.assign({}, props, { className: cx(className, "dash-item", "s-dash-item", screenClasses[screen]) }));
};
//# sourceMappingURL=DashboardItem.js.map