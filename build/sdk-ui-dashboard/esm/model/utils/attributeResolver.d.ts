import { ObjRef, IAttributeMetadataObject } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../types/commonTypes.js";
import { ObjRefMap } from "../../_staging/metadata/objRefMap.js";
export interface AttributeResolutionResult {
    resolved: ObjRefMap<IAttributeMetadataObject>;
    missing: ObjRef[];
}
/**
 * Given a set of attribute refs (which may be of any type.. uri or id), this function returns a list of
 * attribute metadata objects.
 *
 * @param ctx - dashboard context in which the resolution is done
 * @param refs - ObjRefs of display forms; the type of ObjRef can be either uri or id ref, the function will resolve it regardless
 * @param attributes - specify mapping of attributes to use for in-memory resolution of refs to metadata objects; if
 *  not specified, the generator will retrieve all catalog attributes from state
 */
export declare function resolveAttributeMetadata(ctx: DashboardContext, refs: ObjRef[], attributes?: ObjRefMap<IAttributeMetadataObject>): SagaIterator<AttributeResolutionResult>;
