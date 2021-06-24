// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { dispatchDashboardEvent } from "../../eventEmitter/eventDispatcher";
import { DashboardContext } from "../../types/commonTypes";
import { internalErrorOccurred } from "../../events/general";
import { Drill } from "../../commands/drill";
import { drillTriggered } from "../../events/drill";

export function* performDrillHandler(ctx: DashboardContext, cmd: Drill): SagaIterator<void> {
    // eslint-disable-next-line no-console
    console.debug("handling perform drill", cmd, "in context", ctx);

    try {
        yield dispatchDashboardEvent(drillTriggered(ctx, cmd.payload.drillEvent, cmd.correlationId));
    } catch (e) {
        yield dispatchDashboardEvent(
            internalErrorOccurred(
                ctx,
                "An unexpected error has occurred while creating alert",
                e,
                cmd.correlationId,
            ),
        );
    }
}
