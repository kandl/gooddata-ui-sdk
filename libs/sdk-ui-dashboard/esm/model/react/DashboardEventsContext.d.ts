import React from "react";
import { DashboardEventHandler } from "../eventHandlers/eventHandler.js";
/**
 * @alpha
 */
export interface IDashboardEventsContext {
    registerHandler: (handler: DashboardEventHandler) => void;
    unregisterHandler: (handler: DashboardEventHandler) => void;
}
/**
 * @alpha
 */
export declare const useDashboardEventsContext: () => IDashboardEventsContext;
/**
 * @internal
 */
export interface IDashboardEventsProvider extends IDashboardEventsContext {
    children: React.ReactNode;
}
/**
 * @internal
 */
export declare function DashboardEventsProvider(props: IDashboardEventsProvider): JSX.Element;
