import { selectAllCatalogDisplayFormsMap } from "../store/catalog/catalogSelectors.js";
import { call, select } from "redux-saga/effects";
import { newDisplayFormMap } from "../../_staging/metadata/objRefMap.js";
async function loadDisplayFormsMetadata(ctx, refs) {
    if (!refs.length) {
        return [];
    }
    return ctx.backend.workspace(ctx.workspace).attributes().getAttributeDisplayForms(refs);
}
/**
 * Given a set of display form refs (which may be of any type.. uri or id), this function returns a list of
 * attribute display form metadata objects.
 *
 * @param ctx - dashboard context in which the resolution is done
 * @param refs - ObjRefs of display forms; the type of ObjRef can be either uri or id ref, the function will resolve it regardless
 * @param displayForms - specify mapping of display forms to use for in-memory resolution of refs to metadata objects; if
 *  not specified, the generator will retrieve all catalog display forms from state
 */
export function* resolveDisplayFormMetadata(ctx, refs, displayForms) {
    const catalogDisplayForms = displayForms
        ? displayForms
        : yield select(selectAllCatalogDisplayFormsMap);
    const resolvedDisplayForms = [];
    const tryLoadDisplayForms = [];
    refs.forEach((ref) => {
        const catalogDisplayForm = catalogDisplayForms.get(ref);
        if (catalogDisplayForm) {
            resolvedDisplayForms.push(catalogDisplayForm);
        }
        else {
            tryLoadDisplayForms.push(ref);
        }
    });
    const loadedDisplayForms = yield call(loadDisplayFormsMetadata, ctx, tryLoadDisplayForms);
    const loadedDisplayFormsMap = newDisplayFormMap(loadedDisplayForms);
    const missing = [];
    tryLoadDisplayForms.forEach((ref) => {
        const loadedDisplayForm = loadedDisplayFormsMap.get(ref);
        if (loadedDisplayForm) {
            resolvedDisplayForms.push(loadedDisplayForm);
        }
        else {
            missing.push(ref);
        }
    });
    return {
        resolved: newDisplayFormMap(resolvedDisplayForms),
        missing,
    };
}
//# sourceMappingURL=displayFormResolver.js.map