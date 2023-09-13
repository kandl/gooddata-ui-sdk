import React from "react";
import { InsightMenuItemsProvider } from "./types.js";
/**
 * @internal
 */
interface IDashboardCustomizationsContext {
    insightMenuItemsProvider?: InsightMenuItemsProvider;
}
/**
 * @internal
 */
export declare const useDashboardCustomizationsContext: (localCustomizationOverrides?: Partial<IDashboardCustomizationsContext>) => IDashboardCustomizationsContext;
/**
 * @internal
 */
export interface IDashboardCustomizationsProviderProps extends IDashboardCustomizationsContext {
    children: React.ReactNode;
}
/**
 * @internal
 */
export declare function DashboardCustomizationsProvider(props: IDashboardCustomizationsProviderProps): JSX.Element;
export {};
