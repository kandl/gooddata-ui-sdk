// (C) 2021 GoodData Corporation
import { IDashboardCommand } from "./base";
import { IDashboardDrillEvent, IDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import {
    IDrillToAttributeUrl,
    IDrillToCustomUrl,
    IDrillToDashboard,
    IDrillToInsight,
    IDrillToLegacyDashboard,
} from "@gooddata/sdk-backend-spi";

/**
 * Performs drill.
 *
 * @internal
 */
export interface PerformDrill extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrill command.
 * Dispatching this command will result into triggering relevant drill events.
 *
 * @internal
 */
export function performDrill(drillEvent: IDashboardDrillEvent, correlationId?: string): PerformDrill {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM",
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
 * Performs drill to insight.
 *
 * @internal
 */
export interface PerformDrillToInsight extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_INSIGHT";
    readonly payload: {
        readonly drillDefinition: IDrillToInsight;
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrillToInsight command.
 * Dispatching this command will result into loading additional data and then triggering relevant drill events.
 *
 * @internal
 */
export function performDrillToInsight(
    drillDefinition: IDrillToInsight,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): PerformDrillToInsight {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_INSIGHT",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}

//
//
//

/**
 * Performs drill to dashboard.
 *
 * @internal
 */
export interface PerformDrillToDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_DASHBOARD";
    readonly payload: {
        readonly drillDefinition: IDrillToDashboard;
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrillToDashboard command.
 * Dispatching this command will result into loading additional data and then triggering relevant drill events.
 *
 * @internal
 */
export function performDrillToDashboard(
    drillDefinition: IDrillToDashboard,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): PerformDrillToDashboard {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_DASHBOARD",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}

//
//
//

/**
 * Performs drill to custom url.
 *
 * @internal
 */
export interface PerformDrillToCustomUrl extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_CUSTOM_URL";
    readonly payload: {
        readonly drillDefinition: IDrillToCustomUrl;
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrillToCustomUrl command.
 * Dispatching this command will result into loading additional data and then triggering relevant drill events.
 *
 * @internal
 */
export function performDrillToCustomUrl(
    drillDefinition: IDrillToCustomUrl,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): PerformDrillToCustomUrl {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_CUSTOM_URL",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}

//
//
//

/**
 * Performs drill to attribute url.
 *
 * @internal
 */
export interface PerformDrillToAttributeUrl extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_ATTRIBUTE_URL";
    readonly payload: {
        readonly drillDefinition: IDrillToAttributeUrl;
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrillToAttributeUrl command.
 * Dispatching this command will result into loading additional data and then triggering relevant drill events.
 *
 * @internal
 */
export function performDrillToAttributeUrl(
    drillDefinition: IDrillToAttributeUrl,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): PerformDrillToAttributeUrl {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_ATTRIBUTE_URL",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}

//
//
//

/**
 * Performs drill down.
 *
 * @internal
 */
export interface PerformDrillDown extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_DOWN";
    readonly payload: {
        readonly drillDefinition: IDrillDownDefinition;
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrillDown command.
 * Dispatching this command will result into loading additional data and then triggering relevant drill events.
 *
 * @internal
 */
export function performDrillDown(
    drillDefinition: IDrillDownDefinition,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): PerformDrillDown {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_DOWN",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}

//
//
//

/**
 * Performs drill to legacy dashboard.
 *
 * @internal
 */
export interface PerformDrillToLegacyDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_LEGACY_DASHBOARD";
    readonly payload: {
        readonly drillDefinition: IDrillToLegacyDashboard;
        readonly drillEvent: IDashboardDrillEvent;
    };
}

/**
 * Creates the PerformDrillToLegacyDashboard command.
 * Dispatching this command will result into loading additional data and then triggering relevant drill events.
 *
 * @internal
 */
export function performDrillToLegacyDashboard(
    drillDefinition: IDrillToLegacyDashboard,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): PerformDrillToLegacyDashboard {
    return {
        type: "GDC.DASH/CMD.DRILL.PERFORM.DRILL_TO_LEGACY_DASHBOARD",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
