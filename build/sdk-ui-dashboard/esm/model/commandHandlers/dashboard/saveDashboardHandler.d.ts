import { DashboardContext } from "../../types/commonTypes.js";
import { SaveDashboard } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { IDashboardDefinition } from "@gooddata/sdk-model";
import { DashboardSaved } from "../../events/dashboard.js";
export declare function getDashboardWithSharing(dashboard: IDashboardDefinition, sharingEnabled: boolean | undefined, sharingSupported: boolean | undefined, isNewDashboard: boolean): IDashboardDefinition;
export declare function saveDashboardHandler(ctx: DashboardContext, cmd: SaveDashboard): SagaIterator<DashboardSaved>;
