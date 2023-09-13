// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const DefaultDashboardToolbarGroup = (props) => {
    const { children, title } = props;
    return (React.createElement("div", { className: "gd-toolbar-group" },
        React.createElement("span", { className: "gd-toolbar-group-title" }, title),
        children));
};
//# sourceMappingURL=DefaultDashboardToolbarGroup.js.map