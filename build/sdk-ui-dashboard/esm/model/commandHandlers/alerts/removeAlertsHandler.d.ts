import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { RemoveAlerts } from "../../commands/alerts.js";
import { DashboardAlertsRemoved } from "../../events/alerts.js";
export declare function removeAlertsHandler(ctx: DashboardContext, cmd: RemoveAlerts): SagaIterator<DashboardAlertsRemoved>;
