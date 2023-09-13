import { __rest } from "tslib";
// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
export const ListHeading = (_a) => {
    var { children, className } = _a, otherProps = __rest(_a, ["children", "className"]);
    return (React.createElement("div", Object.assign({ className: cx("gd-list-item gd-list-item-header gd-filter-list-heading", className) }, otherProps), children));
};
//# sourceMappingURL=ListHeading.js.map