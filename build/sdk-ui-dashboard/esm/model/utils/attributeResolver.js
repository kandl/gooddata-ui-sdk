import { selectAllCatalogAttributesMap } from "../store/catalog/catalogSelectors.js";
import { call, select } from "redux-saga/effects";
import { newAttributeMap } from "../../_staging/metadata/objRefMap.js";
async function loadAttributesMetadata(ctx, refs) {
    if (!refs.length) {
        return [];
    }
    return ctx.backend.workspace(ctx.workspace).attributes().getAttributes(refs);
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
export function* resolveAttributeMetadata(ctx, refs, attributes) {
    const catalogAttributes = attributes
        ? attributes
        : yield select(selectAllCatalogAttributesMap);
    const resolvedAttributes = [];
    const tryLoadAttributes = [];
    refs.forEach((ref) => {
        const catalogAttribute = catalogAttributes.get(ref);
        if (catalogAttribute) {
            resolvedAttributes.push(catalogAttribute.attribute);
        }
        else {
            tryLoadAttributes.push(ref);
        }
    });
    const loadedAttributes = yield call(loadAttributesMetadata, ctx, tryLoadAttributes);
    const loadedAttributesMap = newAttributeMap(loadedAttributes);
    const missing = [];
    tryLoadAttributes.forEach((ref) => {
        const loadedAttribute = loadedAttributesMap.get(ref);
        if (loadedAttribute) {
            resolvedAttributes.push(loadedAttribute);
        }
        else {
            missing.push(ref);
        }
    });
    return {
        resolved: newAttributeMap(resolvedAttributes),
        missing,
    };
}
//# sourceMappingURL=attributeResolver.js.map