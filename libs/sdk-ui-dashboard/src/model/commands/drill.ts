// (C) 2021 GoodData Corporation
import { IDashboardDrillEvent } from "@gooddata/sdk-ui-ext";
import { IDashboardCommand } from "./base";

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
 * Creates the PerformDrill command. Dispatching this command will result into triggering relevant drill events.

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
