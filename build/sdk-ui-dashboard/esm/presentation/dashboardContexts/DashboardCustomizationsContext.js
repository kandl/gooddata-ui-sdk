import { __rest } from "tslib";
// (C) 2019-2022 GoodData Corporation
import React, { createContext, useContext } from "react";
/**
 * @internal
 */
const DashboardCustomizationsContext = createContext({});
DashboardCustomizationsContext.displayName = "DashboardCustomizationsContext";
/**
 * @internal
 */
export const useDashboardCustomizationsContext = (localCustomizationOverrides) => {
    const globalCustomizations = useContext(DashboardCustomizationsContext);
    return Object.assign(Object.assign({}, globalCustomizations), localCustomizationOverrides);
};
/**
 * @internal
 */
export function DashboardCustomizationsProvider(props) {
    const { children } = props, components = __rest(props, ["children"]);
    return (React.createElement(DashboardCustomizationsContext.Provider, { value: components }, children));
}
//# sourceMappingURL=DashboardCustomizationsContext.js.map