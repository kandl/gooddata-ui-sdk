// (C) 2022 GoodData Corporation
import { serializeObjRef } from "@gooddata/sdk-model";
import { call, select } from "redux-saga/effects";
import compact from "lodash/compact.js";
import { selectAttributeFilterDisplayFormsMap } from "../store/index.js";
import { createCachedQueryService } from "../store/_infra/queryService.js";
import { invalidQueryArguments } from "../events/general.js";
export const QueryConnectingAttributesService = createCachedQueryService("GDC.DASH/QUERY.CONNECTING.ATTRIBUTES", queryService, (query) => {
    const { payload: { refs }, } = query;
    const serializedRefs = refs.flatMap((refs) => refs).map(serializeObjRef);
    return serializedRefs.join("&");
});
async function loadConnectingAttributes(ctx, attributeRefs) {
    const { backend, workspace } = ctx;
    return await backend.workspace(workspace).attributes().getCommonAttributesBatch(attributeRefs);
}
async function loadConnectingAttributesMeta(ctx, connectingAttributeRefs) {
    const { backend, workspace } = ctx;
    const attributeMetaObjects = await Promise.all(connectingAttributeRefs.map((refsEntry) => Promise.all(refsEntry.map((ref) => backend.workspace(workspace).attributes().getAttribute(ref)))));
    return attributeMetaObjects.map((entry) => {
        return entry.map((attributeMeta) => {
            return {
                title: attributeMeta.title,
                ref: attributeMeta.ref,
            };
        });
    });
}
function* mapDisplayFormsToAttributes(refs) {
    const attributeDisplayFormsMap = yield select(selectAttributeFilterDisplayFormsMap);
    return refs.map((displayFormRefsEntry) => displayFormRefsEntry.map((displayFormRef) => { var _a; return (_a = attributeDisplayFormsMap.get(displayFormRef)) === null || _a === void 0 ? void 0 : _a.attribute; }));
}
function* queryService(ctx, query) {
    const { payload: { refs }, correlationId, } = query;
    const attributeRefs = yield call(mapDisplayFormsToAttributes, refs);
    const nonEmptyAttributesRef = compact(attributeRefs.map((refsEntry) => compact(refsEntry)));
    if (refs.length !== nonEmptyAttributesRef.length) {
        throw invalidQueryArguments(ctx, `Cannot find attributes for given displayForms`, correlationId);
    }
    const connectingAttributesRefs = yield call(loadConnectingAttributes, ctx, nonEmptyAttributesRef);
    const connectingAttributes = yield call(loadConnectingAttributesMeta, ctx, connectingAttributesRefs);
    return connectingAttributes;
}
//# sourceMappingURL=queryConnectingAttributes.js.map