import { __rest } from "tslib";
// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
export const TabsWrapper = (_a) => {
    var { className, children } = _a, restProps = __rest(_a, ["className", "children"]);
    return (React.createElement("div", Object.assign({ className: cx("gd-tabs small is-condensed", className) }, restProps), children));
};
export const Tab = (_a) => {
    var { selected, className, children } = _a, restProps = __rest(_a, ["selected", "className", "children"]);
    return (React.createElement("div", Object.assign({ className: cx(selected && "is-active", "gd-tab", className) }, restProps), children));
};
//# sourceMappingURL=Tabs.js.map