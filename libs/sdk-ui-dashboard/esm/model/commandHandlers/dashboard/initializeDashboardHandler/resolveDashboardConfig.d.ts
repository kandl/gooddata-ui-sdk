import { SagaIterator } from "redux-saga";
import { InitializeDashboard } from "../../../commands/index.js";
import { DashboardContext, ResolvedDashboardConfig } from "../../../types/commonTypes.js";
/**
 * Loads all essential dashboard configuration from the backend if needed. The load command may specify their
 * own inline config - if that is the case the config is bounced back immediately. Otherwise, the necessary
 * backend queries and post-processing is done.
 */
export declare function resolveDashboardConfig(ctx: DashboardContext, cmd: InitializeDashboard): SagaIterator<ResolvedDashboardConfig>;
