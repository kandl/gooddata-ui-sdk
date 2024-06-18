// (C) 2021-2024 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import { DashboardContext } from "../../types/commonTypes.js";
import {
    IFilterContextDefinition,
    IAutomationMetadataObject,
    IAutomationMetadataObjectDefinition,
} from "@gooddata/sdk-model";
import { PromiseFnReturnType } from "../../types/sagas.js";
import { CreateScheduledEmail } from "../../commands/scheduledEmail.js";
import { DashboardScheduledEmailCreated, scheduledEmailCreated } from "../../events/scheduledEmail.js";

function createScheduledEmail(
    ctx: DashboardContext,
    scheduledEmail: IAutomationMetadataObjectDefinition,
    _filterContext?: IFilterContextDefinition,
): Promise<IAutomationMetadataObject> {
    const { backend, workspace } = ctx;

    return backend.workspace(workspace).automations().createAutomation(
        scheduledEmail,
        // filterContext
    );
}

export function* createScheduledEmailHandler(
    ctx: DashboardContext,
    cmd: CreateScheduledEmail,
): SagaIterator<DashboardScheduledEmailCreated> {
    const scheduledEmail: PromiseFnReturnType<typeof createScheduledEmail> = yield call(
        createScheduledEmail,
        ctx,
        cmd.payload.scheduledEmail,
        cmd.payload.filterContext,
    );

    return scheduledEmailCreated(ctx, scheduledEmail, cmd.correlationId);
}
