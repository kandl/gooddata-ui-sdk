import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { CreateAlert } from "../../commands/alerts.js";
import { DashboardAlertCreated } from "../../events/alerts.js";
export declare function createAlertHandler(ctx: DashboardContext, cmd: CreateAlert): SagaIterator<DashboardAlertCreated>;
