import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { UpdateAlert } from "../../commands/alerts.js";
import { DashboardAlertUpdated } from "../../events/alerts.js";
export declare function updateAlertHandler(ctx: DashboardContext, cmd: UpdateAlert): SagaIterator<DashboardAlertUpdated>;
