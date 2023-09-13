import { ObjRef } from "@gooddata/sdk-model";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
import { DashboardContext } from "../types/commonTypes.js";
import { IDashboardEvent } from "./base.js";
/**
 * Payload of the {@link DrillTargetsAdded} event.
 * @alpha
 */
export interface DrillTargetsAddedPayload {
    /**
     * Reference to Insight Widget
     */
    readonly ref: ObjRef;
    readonly availableDrillTargets: IAvailableDrillTargets;
}
/**
 * Widget drill targets added event
 *
 * @alpha
 */
export interface DrillTargetsAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL_TARGETS.ADDED";
    readonly payload: DrillTargetsAddedPayload;
}
/**
 * Create DrillTargetsAdded {@link DrillTargetsAdded} event.
 *
 * @param ref - Unique widget ref
 * @param availableDrillTargets - Available widget drill targets {@link @gooddata/sdk-ui#IAvailableDrillTargets}
 * @param correlationId - correlationId
 * @returns - DrillTargetsAdded command
 *
 * @alpha
 */
export declare function drillTargetsAdded(ctx: DashboardContext, ref: ObjRef, availableDrillTargets: IAvailableDrillTargets, correlationId?: string): DrillTargetsAdded;
/**
 * Tests whether the provided object is an instance of {@link DrillTargetsAdded}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDrillTargetsAdded: (obj: unknown) => obj is DrillTargetsAdded;
