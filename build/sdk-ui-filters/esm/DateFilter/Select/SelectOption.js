import { __rest } from "tslib";
// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
export const SelectOption = (_a) => {
    var { isFocused, isSelected, className, children } = _a, restProps = __rest(_a, ["isFocused", "isSelected", "className", "children"]);
    return (React.createElement("div", Object.assign({ className: cx("gd-list-item", "gd-select-option", isSelected && "gd-select-option-is-selected", isFocused && "gd-select-option-is-focused s-select-item-focused", className) }, restProps), children));
};
//# sourceMappingURL=SelectOption.js.map