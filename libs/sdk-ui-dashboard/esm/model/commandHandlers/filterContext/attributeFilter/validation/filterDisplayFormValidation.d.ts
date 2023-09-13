import { ObjRef } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../../types/commonTypes.js";
export type AttributeFilterDisplayFormValidationResult = "VALID" | "INVALID_FILTER_ATTRIBUTE" | "INVALID_ATTRIBUTE_DISPLAY_FORM";
export declare function validateFilterDisplayForm(ctx: DashboardContext, filterAttribute: ObjRef | undefined, displayForm: ObjRef): Promise<AttributeFilterDisplayFormValidationResult>;
