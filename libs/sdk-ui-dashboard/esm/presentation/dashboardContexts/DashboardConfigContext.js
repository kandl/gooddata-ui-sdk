import { __rest } from "tslib";
// (C) 2021 GoodData Corporation
import React, { createContext, useContext } from "react";
const DashboardConfigContext = createContext({
    menuButtonConfig: {},
});
DashboardConfigContext.displayName = "DashboardConfigContext";
/**
 * Context for all the dashboard level configuration of the presentation components.
 * @alpha
 */
export const useDashboardConfigContext = () => {
    return useContext(DashboardConfigContext);
};
/**
 * @internal
 */
export const DashboardConfigProvider = (props) => {
    const { children } = props, components = __rest(props, ["children"]);
    return React.createElement(DashboardConfigContext.Provider, { value: components }, children);
};
//# sourceMappingURL=DashboardConfigContext.js.map