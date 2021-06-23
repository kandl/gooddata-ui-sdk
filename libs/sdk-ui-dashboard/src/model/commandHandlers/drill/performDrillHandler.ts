// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { dispatchDashboardEvent } from "../../eventEmitter/eventDispatcher";
import { DashboardContext } from "../../types/commonTypes";
import { internalErrorOccurred } from "../../events/general";
import { PerformDrill } from "../../commands/drill";
import { drillPerformed } from "../../events/drill";

export function* performDrillHandler(ctx: DashboardContext, cmd: PerformDrill): SagaIterator<void> {
    // eslint-disable-next-line no-console
    console.debug("handling perform drill", cmd, "in context", ctx);

    try {
        yield dispatchDashboardEvent(drillPerformed(ctx, cmd.payload.drillEvent, cmd.correlationId));
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
