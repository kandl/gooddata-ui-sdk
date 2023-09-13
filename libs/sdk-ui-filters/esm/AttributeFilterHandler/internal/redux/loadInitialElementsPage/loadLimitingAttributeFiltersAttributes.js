// (C) 2022 GoodData Corporation
import { convertError } from "@gooddata/sdk-ui";
import { filterObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export async function loadLimitingAttributeFiltersAttributes(context, limitingAttributeFilters) {
    const displayFormRefs = limitingAttributeFilters.map((limitingAttributeFilter) => filterObjRef(limitingAttributeFilter.attributeFilter));
    return Promise.all(displayFormRefs.map((displayFormRef) => context.backend
        .workspace(context.workspace)
        .attributes()
        .getAttributeByDisplayForm(displayFormRef))).catch((err) => {
        // Convert from AnalyticalBackendError to GoodDataSdkError
        throw convertError(err);
    });
}
//# sourceMappingURL=loadLimitingAttributeFiltersAttributes.js.map