import { __rest } from "tslib";
// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Separator } from "../Separator/Separator.js";
export const SelectSeparator = (_a) => {
    var { className } = _a, otherProps = __rest(_a, ["className"]);
    return (React.createElement("div", Object.assign({ className: cx("gd-select-separator", className) }, otherProps),
        React.createElement(Separator, null)));
};
//# sourceMappingURL=SelectSeparator.js.map