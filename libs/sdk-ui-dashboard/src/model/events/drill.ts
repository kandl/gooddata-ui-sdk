// (C) 2021 GoodData Corporation
import { IDashboardDrillEvent } from "@gooddata/sdk-ui-ext";
import { DashboardContext } from "../types/commonTypes";
import { IDashboardEvent } from "./base";

/**
 * This event is emitted after the drill is triggered.
 *
 * @internal
 */
export interface DashboardDrillTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//

/**
 * This event is emitted after the drill down is triggered.
 *
 * @internal
 */
export interface DashboardDrillDownTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillDownTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillDownTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//

/**
 * This event is emitted after the drill to insight is triggered.
 *
 * @internal
 */
export interface DashboardDrillToInsightTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillToInsightTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillToInsightTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//

/**
 * This event is emitted after the drill to dashboard is triggered.
 *
 * @internal
 */
export interface DashboardDrillToDashboardTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillToDashboardTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillToDashboardTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//

/**
 * This event is emitted after the drill to attribute url is triggered.
 *
 * @internal
 */
export interface DashboardDrillToAttributeUrlTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillToAttributeUrlTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillToAttributeUrlTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//

/**
 * This event is emitted after the drill to custom url is triggered.
 *
 * @internal
 */
export interface DashboardDrillToCustomUrlTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillToCustomUrlTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillToCustomUrlTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//

/**
 * This event is emitted after the drill to legacy dashboard is triggered.
 *
 * @internal
 */
export interface DashboardDrillToLegacyDashboardTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.TRIGGERED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillToLegacyDashboardTriggered(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillToLegacyDashboardTriggered {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.TRIGGERED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
        },
    };
}

//
//
//
