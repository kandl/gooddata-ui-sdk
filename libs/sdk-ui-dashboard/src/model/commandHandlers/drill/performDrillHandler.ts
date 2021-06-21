// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
// import { delay } from "redux-saga/effects";
// import { isDrillDownDefinition } from "@gooddata/sdk-ui-ext/esm/internal";
// import { isDrillToDashboard,
// isDrillToInsight,
// isDrillToCustomUrl,
// isDrillToAttributeUrl,
// isDrillToLegacyDashboard,
// IDrillToDashboard,
// IDrillToDashboard,
// IDrillToInsight,
// "@gooddata/sdk-backend-spi";
import { dispatchDashboardEvent } from "../../eventEmitter/eventDispatcher";
import { DashboardContext } from "../../types/commonTypes";
import { internalErrorOccurred } from "../../events/general";
import { PerformDrill } from "../../commands/drill";
import { drillPerformed } from "../../events/drill";
// import { selectDashboardRef } from '../../state/meta/metaSelectors';
// import { areObjRefsEqual } from "@gooddata/sdk-model";

export function* performDrillHandler(ctx: DashboardContext, cmd: PerformDrill): SagaIterator<void> {
    // eslint-disable-next-line no-console
    console.debug("handling perform drill", cmd, "in context", ctx);

    try {
        console.debug("perform drillss", ctx, cmd);
        // for (const drillDefinition of cmd.payload.drillEvent.drillDefinitions ?? []) {
        //     if (isDrillToDashboard(drillDefinition)) {
        //         yield call(performDrillToDashboardHandler, ctx, drillDefinition);
        //     } else if (isDrillToInsight(drillDefinition)) {
        //         yield call(performDrillToInsightHandler, ctx, cmd);
        //     } else if (isDrillToCustomUrl(drillDefinition)) {
        //         yield call(performDrillToCustomUrlHandler, ctx, cmd);
        //     } else if (isDrillToAttributeUrl(drillDefinition)) {
        //         yield call(performDrillToAttributeUrlHandler, ctx, cmd);
        //     } else if (isDrillToLegacyDashboard(drillDefinition)) {
        //         yield call(performDrillToPixelPerfectDashboardHandler, ctx, cmd);
        //         // Is KPI
        //     } else if (isDrillDownDefinition(drillDefinition)) {
        //         // Is implicit drill down
        //         yield call(performDrillDownHandler, ctx, cmd);
        //     }
        // }

        yield dispatchDashboardEvent(drillPerformed(ctx, cmd.payload.drillEvent, cmd.correlationId));
        console.debug("drills performed", ctx, cmd);
    } catch (e) {
        console.debug("drills error", ctx, cmd, e);
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

// export function* performDrillToDashboardHandler(
//     ctx: DashboardContext,
//     drillToDashboard: IDrillToDashboard,
// ): SagaIterator<void> {
//     // eslint-disable-next-line no-console
//     console.debug("handling perform drill to dashboard", drillToDashboard, "in context", ctx);
//     // const dashboardRef: ReturnType<typeof selectDashboardRef> = yield select(selectDashboardRef);
//     // const isDrillToSameDashboard = areObjRefsEqual(drillToDashboard.target, dashboardRef);

//     yield delay(100);
//     return undefined;
// }

// export function* performDrillToInsightHandler(ctx: DashboardContext, cmd: PerformDrill): SagaIterator<void> {
//     // eslint-disable-next-line no-console
//     console.debug("handling perform drill to insight", cmd, "in context", ctx);
//     yield delay(100);
//     return undefined;
// }

// export function* performDrillToCustomUrlHandler(
//     ctx: DashboardContext,
//     cmd: PerformDrill,
// ): SagaIterator<void> {
//     // eslint-disable-next-line no-console
//     console.debug("handling perform drill to insight", cmd, "in context", ctx);
//     yield delay(100);
//     return undefined;
// }

// export function* performDrillToAttributeUrlHandler(
//     ctx: DashboardContext,
//     cmd: PerformDrill,
// ): SagaIterator<void> {
//     // eslint-disable-next-line no-console
//     console.debug("handling perform drill to insight", cmd, "in context", ctx);
//     yield delay(100);
//     return undefined;
// }

// export function* performDrillToPixelPerfectDashboardHandler(
//     ctx: DashboardContext,
//     cmd: PerformDrill,
// ): SagaIterator<void> {
//     // eslint-disable-next-line no-console
//     console.debug("handling perform drill to insight", cmd, "in context", ctx);
//     yield delay(100);
//     return undefined;
// }

// export function* performDrillDownHandler(ctx: DashboardContext, cmd: PerformDrill): SagaIterator<void> {
//     // eslint-disable-next-line no-console
//     console.debug("handling perform drill to insight", cmd, "in context", ctx);
//     yield delay(100);
//     return undefined;
// }
