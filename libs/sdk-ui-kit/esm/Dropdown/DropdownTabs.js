// (C) 2007-2020 GoodData Corporation
import React from "react";
import { Tabs } from "../Tabs/index.js";
/**
 * @internal
 */
export const DropdownTabs = ({ tabs, selectedTabId, onTabSelect }) => {
    return (React.createElement(Tabs, { tabs: tabs, className: "gd-dropdown-tabs", selectedTabId: selectedTabId, onTabSelect: onTabSelect }));
};
//# sourceMappingURL=DropdownTabs.js.map