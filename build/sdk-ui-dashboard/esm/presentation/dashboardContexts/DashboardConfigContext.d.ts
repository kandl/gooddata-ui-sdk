import React from "react";
import { IMenuButtonConfiguration } from "../topBar/types.js";
interface IDashboardConfigContext {
    menuButtonConfig: IMenuButtonConfiguration | undefined;
    children?: React.ReactNode;
}
/**
 * Context for all the dashboard level configuration of the presentation components.
 * @alpha
 */
export declare const useDashboardConfigContext: () => IDashboardConfigContext;
/**
 * @internal
 */
export declare const DashboardConfigProvider: React.FC<IDashboardConfigContext>;
export {};
