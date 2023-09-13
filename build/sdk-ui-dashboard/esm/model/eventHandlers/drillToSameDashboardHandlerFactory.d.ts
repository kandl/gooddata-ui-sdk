import { ObjRef } from "@gooddata/sdk-model";
import { DashboardEventHandler } from "./eventHandler.js";
import { DashboardDrillToDashboardResolved } from "../events/index.js";
/**
 * Event handler with the default implementation for drill to the same dashboard.
 *
 * When {@link DashboardDrillToDashboardResolved} event is fired and contains dashboard ref that matches the provided dashboard ref,
 * or dashboard ref in the event is missing, it sets relevant drill intersection filters to the current dashboard.
 *
 * Note that only filters that are already stored in the dashboard filter context will be applied
 * (attribute filters that are not visible in the filter bar will not be applied).
 *
 * @alpha
 * @param dashboardRef - reference to the current dashboard
 * @returns event handler
 */
export declare const newDrillToSameDashboardHandler: (dashboardRef: ObjRef) => DashboardEventHandler<DashboardDrillToDashboardResolved>;
