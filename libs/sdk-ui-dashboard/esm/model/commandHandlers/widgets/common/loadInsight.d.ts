import { IInsight, ObjRef } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function loadInsight(ctx: DashboardContext, insightRef: ObjRef): Promise<IInsight>;
