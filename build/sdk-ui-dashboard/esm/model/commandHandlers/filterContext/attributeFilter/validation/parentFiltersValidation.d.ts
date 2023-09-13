import { IDashboardAttributeFilter, IDashboardAttributeFilterParent, IAttributeDisplayFormMetadataObject } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../../types/commonTypes.js";
import { ObjRefMap } from "../../../../../_staging/metadata/objRefMap.js";
export type AttributeFilterParentsValidationResult = "VALID" | "EXTRANEOUS_PARENT" | "INVALID_CONNECTION" | "INVALID_METADATA";
export declare function validateAttributeFilterParents(ctx: DashboardContext, dashboardFilter: IDashboardAttributeFilter, parents: IDashboardAttributeFilterParent[], allFilters: IDashboardAttributeFilter[], displayFormsMap: ObjRefMap<IAttributeDisplayFormMetadataObject>): Promise<AttributeFilterParentsValidationResult>;
