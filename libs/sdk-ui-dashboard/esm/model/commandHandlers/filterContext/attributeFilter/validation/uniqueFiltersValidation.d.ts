import { ObjRef, IDashboardAttributeFilter } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../../types/commonTypes.js";
export declare function canFilterBeAdded(ctx: DashboardContext, addedDisplayFormRef: ObjRef, allFilters: IDashboardAttributeFilter[]): Promise<boolean>;
