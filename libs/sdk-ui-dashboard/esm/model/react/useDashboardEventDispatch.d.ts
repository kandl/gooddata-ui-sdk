import { DashboardEventBody, DashboardEvents, ICustomDashboardEvent } from "../events/index.js";
/**
 * Convenience hook for dispatching Dashboard events.
 *
 * @returns function that you can use to dispatch Dashboard events
 * @alpha
 */
export declare const useDashboardEventDispatch: () => (eventBody: DashboardEventBody<DashboardEvents | ICustomDashboardEvent>) => void;
