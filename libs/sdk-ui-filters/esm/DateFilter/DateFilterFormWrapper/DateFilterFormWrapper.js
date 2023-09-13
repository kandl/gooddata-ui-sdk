import { __rest } from "tslib";
// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
export const DateFilterFormWrapper = (_a) => {
    var { children, isMobile, className } = _a, restProps = __rest(_a, ["children", "isMobile", "className"]);
    return (React.createElement("div", Object.assign({ className: cx(className, "gd-date-filter-form-wrapper", !isMobile && "gd-date-filter-form-wrapper-desktop") }, restProps),
        React.createElement("div", { className: "gd-date-filter-form-wrapper-inner" }, children)));
};
//# sourceMappingURL=DateFilterFormWrapper.js.map