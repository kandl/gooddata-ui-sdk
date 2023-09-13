import { IWidgetAlert } from "@gooddata/sdk-model";
import { DashboardContext } from "../types/commonTypes.js";
import { IDashboardEvent } from "./base.js";
/**
 * Payload of the {@link DashboardAlertCreated} event.
 * @beta
 */
export interface DashboardAlertCreatedPayload {
    /**
     * The alert created.
     */
    readonly alert: IWidgetAlert;
}
/**
 * This event is emitted after the Kpi alert is successfully saved.
 *
 * @beta
 */
export interface DashboardAlertCreated extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.ALERT.CREATED";
    readonly payload: DashboardAlertCreatedPayload;
}
export declare function alertCreated(ctx: DashboardContext, alert: IWidgetAlert, correlationId?: string): DashboardAlertCreated;
/**
 * Tests whether the provided object is an instance of {@link DashboardAlertCreated}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAlertCreated: (obj: unknown) => obj is DashboardAlertCreated;
/**
 * Payload of the {@link DashboardAlertsRemoved} event.
 * @beta
 */
export interface DashboardAlertsRemovedPayload {
    /**
     * The alerts removed.
     */
    readonly alerts: IWidgetAlert[];
}
/**
 * This event is emitted after the Kpi alerts are successfully removed.
 *
 * @beta
 */
export interface DashboardAlertsRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.ALERTS.REMOVED";
    readonly payload: DashboardAlertsRemovedPayload;
}
export declare function alertsRemoved(ctx: DashboardContext, alerts: IWidgetAlert[], correlationId?: string): DashboardAlertsRemoved;
/**
 * Tests whether the provided object is an instance of {@link DashboardAlertsRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAlertsRemoved: (obj: unknown) => obj is DashboardAlertsRemoved;
/**
 * Payload of the {@link DashboardAlertUpdated} event.
 * @beta
 */
export interface DashboardAlertUpdatedPayload {
    /**
     * The alert updated.
     */
    readonly updated: IWidgetAlert;
}
/**
 * This event is emitted after the Kpi alert is updated.
 *
 * @beta
 */
export interface DashboardAlertUpdated extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.ALERT.UPDATED";
    readonly payload: DashboardAlertUpdatedPayload;
}
export declare function alertUpdated(ctx: DashboardContext, updated: IWidgetAlert, correlationId?: string): DashboardAlertUpdated;
/**
 * Tests whether the provided object is an instance of {@link DashboardAlertUpdated}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAlertUpdated: (obj: unknown) => obj is DashboardAlertUpdated;
