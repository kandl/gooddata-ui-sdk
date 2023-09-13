import { ObjRefMap } from "../../_staging/metadata/objRefMap.js";
import { FilterContextItem, IAttributeDisplayFormMetadataObject } from "@gooddata/sdk-model";
import { DashboardContext } from "../types/commonTypes.js";
import { SagaIterator } from "redux-saga";
/**
 * This generator function resolves display form metadata objects for all attribute filters in the provided `filters`
 * parameter. The resolver will first check in-memory `displayForms` mapping; if some used display forms are not
 * found, it will consult the backend.
 *
 * @param ctx - dashboard context where the resolution is being done
 * @param filters - list of dashboard filters; resolver will extract just the attribute filters from here
 * @param displayForms - in-memory mapping of known display forms to use during the initial lookup; if not specified, the
 *  code will obtain all catalog display forms; note: this parameter is really only useful during the dashboard initialization
 *  where the catalog is not yet set. once the dashboard is initialized, the parameter is not needed
 */
export declare function resolveFilterDisplayForms(ctx: DashboardContext, filters: FilterContextItem[], displayForms?: ObjRefMap<IAttributeDisplayFormMetadataObject>): SagaIterator<IAttributeDisplayFormMetadataObject[]>;
