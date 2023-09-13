import { SagaIterator } from "redux-saga";
import { InitializeDashboard } from "../../../commands/dashboard.js";
import { DashboardInitialized } from "../../../events/dashboard.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function initializeDashboardHandler(ctx: DashboardContext, cmd: InitializeDashboard): SagaIterator<DashboardInitialized>;
