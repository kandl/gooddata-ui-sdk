import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../../types/commonTypes.js";
import { InitializeDashboard } from "../../../commands/dashboard.js";
import { IWorkspacePermissions } from "@gooddata/sdk-model";
export declare function resolvePermissions(ctx: DashboardContext, cmd: InitializeDashboard): SagaIterator<IWorkspacePermissions>;
