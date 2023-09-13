// (C) 2019 GoodData Corporation
import React, { createContext, useContext, useMemo } from "react";
import noop from "lodash/noop.js";
/**
 * @alpha
 */
const DashboardEventsContext = createContext({
    registerHandler: noop,
    unregisterHandler: noop,
});
DashboardEventsContext.displayName = "DashboardEventsContext";
/**
 * @alpha
 */
export const useDashboardEventsContext = () => useContext(DashboardEventsContext);
/**
 * @internal
 */
export function DashboardEventsProvider(props) {
    const { children, registerHandler, unregisterHandler } = props;
    const value = useMemo(() => {
        return {
            registerHandler,
            unregisterHandler,
        };
    }, [registerHandler, unregisterHandler]);
    return React.createElement(DashboardEventsContext.Provider, { value: value }, children);
}
//# sourceMappingURL=DashboardEventsContext.js.map