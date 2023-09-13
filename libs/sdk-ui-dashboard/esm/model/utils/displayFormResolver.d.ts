import { ObjRef, IAttributeDisplayFormMetadataObject } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../types/commonTypes.js";
import { ObjRefMap } from "../../_staging/metadata/objRefMap.js";
export type DisplayFormResolutionResult = {
    resolved: ObjRefMap<IAttributeDisplayFormMetadataObject>;
    missing: ObjRef[];
};
/**
 * Given a set of display form refs (which may be of any type.. uri or id), this function returns a list of
 * attribute display form metadata objects.
 *
 * @param ctx - dashboard context in which the resolution is done
 * @param refs - ObjRefs of display forms; the type of ObjRef can be either uri or id ref, the function will resolve it regardless
 * @param displayForms - specify mapping of display forms to use for in-memory resolution of refs to metadata objects; if
 *  not specified, the generator will retrieve all catalog display forms from state
 */
export declare function resolveDisplayFormMetadata(ctx: DashboardContext, refs: ObjRef[], displayForms?: ObjRefMap<IAttributeDisplayFormMetadataObject>): SagaIterator<DisplayFormResolutionResult>;
