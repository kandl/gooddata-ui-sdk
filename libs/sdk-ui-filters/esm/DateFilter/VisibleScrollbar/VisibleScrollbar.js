import { __rest } from "tslib";
// (C) 2019 GoodData Corporation
import React from "react";
import cx from "classnames";
export const VisibleScrollbar = (_a) => {
    var { className, children } = _a, restProps = __rest(_a, ["className", "children"]);
    return (React.createElement("div", Object.assign({ className: cx("gd-visible-scrollbar", className) }, restProps), children));
};
//# sourceMappingURL=VisibleScrollbar.js.map