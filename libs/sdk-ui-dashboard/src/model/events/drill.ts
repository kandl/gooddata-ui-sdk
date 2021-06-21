// (C) 2021 GoodData Corporation
import { IDashboardDrillEvent } from "@gooddata/sdk-ui-ext";
import { DashboardContext } from "../types/commonTypes";
import { IDashboardEvent } from "./base";

/**
 * This event is emitted after the drill is performed
 *
 * @internal
 */
export interface DashboardDrillPerformed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.PERFORMED";
    readonly payload: {
        readonly drillEvent: IDashboardDrillEvent;
    };
}

export function drillPerformed(
    ctx: DashboardContext,
    drillEvent: IDashboardDrillEvent,
    correlationId?: string,
): DashboardDrillPerformed {
    return {
        type: "GDC.DASH/EVT.DRILL.PERFORMED",
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
