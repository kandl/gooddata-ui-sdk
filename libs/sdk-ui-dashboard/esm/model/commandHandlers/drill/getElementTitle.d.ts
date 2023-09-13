import { ObjRef } from "@gooddata/sdk-model";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function getElementTitle(projectId: string, dfRef: ObjRef, attrElementUriOrPrimaryLabel: string, ctx: DashboardContext): Promise<string | null>;
