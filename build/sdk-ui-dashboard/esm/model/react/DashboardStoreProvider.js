// (C) 2021-2022 GoodData Corporation
import React from "react";
import { createDispatchHook, createSelectorHook, Provider } from "react-redux";
import { DashboardEventsProvider } from "./DashboardEventsContext.js";
import { useInitializeDashboardStore } from "./useInitializeDashboardStore.js";
/**
 * @alpha
 */
export const ReactDashboardContext = React.createContext(null);
/**
 * @alpha
 */
export const useDashboardDispatch = createDispatchHook(ReactDashboardContext);
/**
 * Hook for retrieving data from the dashboard state.
 *
 * @example
 * Example how to obtain all insights stored on the dashboard:
 *
 * ```tsx
 * import { useDashboardSelector, selectInsights } from "@gooddata/sdk-ui-dashboard";
 *
 * const CustomDashboardWidget = () => {
 *   const insights = useDashboardSelector(selectInsights);
 *
 *   return (
 *      <pre>{JSON.stringify(insights, null, 2)}</pre>
 *   );
 * }
 * ```
 *
 * @public
 */
export const useDashboardSelector = createSelectorHook(ReactDashboardContext);
/**
 * @internal
 */
export const DashboardStoreProvider = (props) => {
    const dashboardStore = useInitializeDashboardStore(props);
    const { additionalReduxContext } = props;
    if (!dashboardStore) {
        return null;
    }
    if (additionalReduxContext != undefined && additionalReduxContext !== ReactDashboardContext) {
        /*
         * Setting store into multiple contexts is essential in environments where a dynamically loaded
         * dashboard engine is integrated into an application that adds additional embedded, local plugins
         * which use Redux hooks (useDashboardSelector, useDashboardDispatch)
         *
         * Such local code is typically built against a local version of the sdk-ui-dashboard and has
         * different redux context providers from those used by dynamically loaded engine bundle.
         *
         * When the local code uses redux hooks, it will explode because they look into a different context
         * where the store is unset.
         */
        return (React.createElement(Provider, { store: dashboardStore.store, context: ReactDashboardContext },
            React.createElement(Provider, { store: dashboardStore.store, context: additionalReduxContext },
                React.createElement(DashboardEventsProvider, { registerHandler: dashboardStore.registerEventHandler, unregisterHandler: dashboardStore.unregisterEventHandler }, props.children))));
    }
    return (React.createElement(Provider, { store: dashboardStore.store, context: ReactDashboardContext },
        React.createElement(DashboardEventsProvider, { registerHandler: dashboardStore.registerEventHandler, unregisterHandler: dashboardStore.unregisterEventHandler }, props.children)));
};
//# sourceMappingURL=DashboardStoreProvider.js.map