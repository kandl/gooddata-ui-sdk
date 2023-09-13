import { IScheduledMail } from "@gooddata/sdk-model";
import { DashboardContext } from "../types/commonTypes.js";
import { IDashboardEvent } from "./base.js";
/**
 * Payload of the {@link DashboardScheduledEmailCreated} event.
 * @beta
 */
export interface DashboardScheduledEmailCreatedPayload {
    /**
     * The scheduled email created.
     */
    readonly scheduledEmail: IScheduledMail;
}
/**
 * This event is emitted after the scheduled email is successfully created.
 *
 * @beta
 */
export interface DashboardScheduledEmailCreated extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED";
    readonly payload: DashboardScheduledEmailCreatedPayload;
}
export declare function scheduledEmailCreated(ctx: DashboardContext, scheduledEmail: IScheduledMail, correlationId?: string): DashboardScheduledEmailCreated;
/**
 * Tests whether the provided object is an instance of {@link DashboardScheduledEmailCreated}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardScheduledEmailCreated: (obj: unknown) => obj is DashboardScheduledEmailCreated;
/**
 * This event is emitted after the scheduled email is successfully saved.
 *
 * @beta
 */
export interface DashboardScheduledEmailSaved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED";
}
export declare function scheduledEmailSaved(ctx: DashboardContext, correlationId?: string): DashboardScheduledEmailSaved;
/**
 * Tests whether the provided object is an instance of {@link DashboardScheduledEmailSaved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardScheduledEmailSaved: (obj: unknown) => obj is DashboardScheduledEmailSaved;
