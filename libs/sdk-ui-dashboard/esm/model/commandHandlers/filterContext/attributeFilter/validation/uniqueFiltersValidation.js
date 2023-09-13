// (C) 2021-2022 GoodData Corporation
import { areObjRefsEqual } from "@gooddata/sdk-model";
export async function canFilterBeAdded(ctx, addedDisplayFormRef, allFilters) {
    // first filter is always ok, save some useless work upfront
    if (allFilters.length === 0) {
        return true;
    }
    const loadAddedDisplayForm = ctx.backend
        .workspace(ctx.workspace)
        .attributes()
        .getAttributeDisplayForm(addedDisplayFormRef);
    const loadExistingDisplayForms = ctx.backend
        .workspace(ctx.workspace)
        .attributes()
        .getAttributeDisplayForms(allFilters.map((item) => item.attributeFilter.displayForm));
    const [addedDisplayForm, existingDisplayForms] = await Promise.all([
        loadAddedDisplayForm,
        loadExistingDisplayForms,
    ]);
    const attributeFilterRef = addedDisplayForm.attribute;
    const existingAttributes = existingDisplayForms.map((df) => df.attribute);
    // lookup has to be in existing Attributes array since we support only one DF for one Attribute
    return !existingAttributes.some((existing) => areObjRefsEqual(existing, attributeFilterRef));
}
//# sourceMappingURL=uniqueFiltersValidation.js.map