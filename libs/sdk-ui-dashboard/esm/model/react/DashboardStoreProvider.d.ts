import React from "react";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import { DashboardState } from "../store/index.js";
import { IDashboardStoreProviderProps } from "./types.js";
/**
 * @alpha
 */
export declare const ReactDashboardContext: any;
/**
 * @alpha
 */
export declare const useDashboardDispatch: () => Dispatch<AnyAction>;
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
export declare const useDashboardSelector: TypedUseSelectorHook<DashboardState>;
/**
 * @internal
 */
export declare const DashboardStoreProvider: React.FC<IDashboardStoreProviderProps>;
