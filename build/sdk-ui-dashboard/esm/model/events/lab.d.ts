import { DashboardEventBody, IDashboardEvent } from "./base.js";
/**
 * This event is emitted when the create button is clicked.
 *
 * @internal
 */
export interface CreateInsightRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.CREATE_INSIGHT_REQUESTED";
}
/**
 * Create {@link CreateInsightRequested} event
 *
 * @internal
 */
export declare function createInsightRequested(correlationId?: string): DashboardEventBody<CreateInsightRequested>;
/**
 * Tests whether the provided object is an instance of {@link CreateInsightRequested}.
 *
 * @param obj - object to test
 * @internal
 */
export declare const isCreateInsightRequested: (obj: unknown) => obj is CreateInsightRequested;
