// (C) 2022-2023 GoodData Corporation
import { serializeObjRef } from "@gooddata/sdk-model";
import { createCachedQueryService } from "../store/_infra/queryService.js";
import { call } from "redux-saga/effects";
import { invalidQueryArguments } from "../events/general.js";
export const QueryAttributeDataSetService = createCachedQueryService("GDC.DASH/QUERY.DATA.SET.ATTRIBUTE", queryService, (query) => {
    const { payload: { displayForm }, } = query;
    return serializeObjRef(displayForm);
});
async function loadAttributeDataSetMeta(ctx, displayFormRef) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).attributes().getAttributeDatasetMeta(displayFormRef);
}
function* queryService(ctx, query) {
    const { payload: { displayForm }, correlationId, } = query;
    const attributeDataSet = yield call(loadAttributeDataSetMeta, ctx, displayForm);
    if (!attributeDataSet) {
        throw invalidQueryArguments(ctx, `Cannot find attribute data set for given displayForm`, correlationId);
    }
    return attributeDataSet;
}
//# sourceMappingURL=queryAttributeDataset.js.map