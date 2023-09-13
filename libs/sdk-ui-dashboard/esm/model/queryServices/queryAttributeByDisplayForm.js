// (C) 2022 GoodData Corporation
import { areObjRefsEqual, serializeObjRef, } from "@gooddata/sdk-model";
import { createCachedQueryService } from "../store/_infra/queryService.js";
import { call, select } from "redux-saga/effects";
import { invalidQueryArguments } from "../events/general.js";
import { selectCatalogAttributes } from "../store/index.js";
export const QueryAttributeByDisplayFormService = createCachedQueryService("GDC.DASH/QUERY.DISPLAY.FORM.ATTRIBUTE", queryService, (query) => {
    const { payload: { displayForms }, } = query;
    return displayForms.map((df) => serializeObjRef(df)).join();
});
/**
 * Loads the attribute metadata for given display form. Primarily the metadata are loaded
 * from the catalog attributes. If the required attribute is not listed in the catalog
 * (e.g. deprecated attributes), the attribute metadata are fetched from the backend.
 */
async function loadAttributeByDisplayForm(ctx, catalogAttributes, displayForm) {
    const { backend, workspace } = ctx;
    const attribute = catalogAttributes.find((catalogAttribute) => catalogAttribute.displayForms.some((df) => areObjRefsEqual(df, displayForm)));
    if (attribute) {
        return attribute.attribute;
    }
    return backend.workspace(workspace).attributes().getAttributeByDisplayForm(displayForm);
}
async function loadAttributes(ctx, catalogAttributes, displayForms) {
    return Promise.all(displayForms.map((df) => loadAttributeByDisplayForm(ctx, catalogAttributes, df)));
}
function* queryService(ctx, query) {
    const { payload: { displayForms }, correlationId, } = query;
    const catalogAttributes = yield select(selectCatalogAttributes);
    const attributes = yield call(loadAttributes, ctx, catalogAttributes, displayForms);
    if (!attributes) {
        throw invalidQueryArguments(ctx, `Cannot find attribute for given displayForm`, correlationId);
    }
    return attributes;
}
//# sourceMappingURL=queryAttributeByDisplayForm.js.map