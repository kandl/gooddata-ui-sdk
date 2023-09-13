import { IWidget } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../types/commonTypes.js";
import { IInaccessibleDashboard } from "../../../types/inaccessibleDashboardTypes.js";
export declare function loadInaccessibleDashboards(ctx: DashboardContext, widgets: IWidget[]): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<import("@gooddata/sdk-model").IExistingDashboard[]> | import("redux-saga/effects").PutEffect<{
    payload: Record<import("@reduxjs/toolkit").EntityId, IInaccessibleDashboard> | readonly IInaccessibleDashboard[];
    type: "inaccessibleDashboards/addInaccessibleDashboards";
}>, void, import("../../../../index.js").ObjRefMap<import("@gooddata/sdk-model").IListedDashboard> & import("@gooddata/sdk-model").IExistingDashboard[]>;
