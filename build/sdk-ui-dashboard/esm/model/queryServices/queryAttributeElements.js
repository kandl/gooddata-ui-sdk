// (C) 2022-2023 GoodData Corporation
import { serializeObjRef } from "@gooddata/sdk-model";
import { createCachedQueryService } from "../store/_infra/queryService.js";
import { call } from "redux-saga/effects";
import { invalidQueryArguments } from "../events/general.js";
export const QueryAttributeElementsService = createCachedQueryService("GDC.DASH/QUERY.ELEMENTS.ATTRIBUTE", queryService, (query) => {
    const { payload: { displayForm }, } = query;
    return serializeObjRef(displayForm);
});
async function loadAttributeElements(ctx, displayFormRef, limit) {
    const { backend, workspace } = ctx;
    let loader = backend.workspace(workspace).attributes().elements().forDisplayForm(displayFormRef);
    if (limit) {
        loader = loader.withLimit(limit);
    }
    return loader.query();
}
function* queryService(ctx, query) {
    const { payload: { displayForm, limit }, correlationId, } = query;
    const attributeElements = yield call(loadAttributeElements, ctx, displayForm, limit);
    if (!attributeElements) {
        throw invalidQueryArguments(ctx, `Cannot find attribute elements for given displayForm`, correlationId);
    }
    return {
        elements: attributeElements.items,
        totalCount: attributeElements.totalCount,
    };
}
//# sourceMappingURL=queryAttributeElements.js.map