// (C) 2020-2023 GoodData Corporation
import { areObjRefsEqual } from "@gooddata/sdk-model";
import uniqWith from "lodash/uniqWith.js";
import { invariant } from "ts-invariant";
import { selectAllCatalogAttributesMap, selectAllCatalogDisplayFormsMap, selectSelectedWidgetRef, useDashboardSelector, } from "../../../../../model/index.js";
function areAttributesWithDisplayFormsEqual(a, b) {
    return areObjRefsEqual(a.displayForm.ref, b.displayForm.ref);
}
export function useAttributesWithDisplayForms(attributes) {
    const widgetRef = useDashboardSelector(selectSelectedWidgetRef);
    invariant(widgetRef, "must have selected widget");
    const allAttributes = useDashboardSelector(selectAllCatalogAttributesMap);
    const allDisplayForms = useDashboardSelector(selectAllCatalogDisplayFormsMap);
    const incomingDisplayFormRefs = attributes.map((a) => a.attributeHeader.ref);
    const result = incomingDisplayFormRefs.reduce((result, ref) => {
        const displayForm = allDisplayForms.get(ref);
        if (!displayForm) {
            return result;
        }
        const attribute = allAttributes.get(displayForm.attribute);
        if (!attribute) {
            return result;
        }
        const linkDisplayForms = attribute.attribute.displayForms.filter((df) => df.displayFormType === "GDC.link");
        result.linkDisplayForms.push(...linkDisplayForms.map((df) => ({
            attribute: attribute.attribute,
            attributeDisplayFormRef: ref,
            displayForm: df,
        })));
        result.allDisplayForms.push(...attribute.attribute.displayForms.map((df) => ({
            attribute: attribute.attribute,
            attributeDisplayFormRef: ref,
            displayForm: df,
        })));
        return result;
    }, {
        linkDisplayForms: [],
        allDisplayForms: [],
    });
    return {
        allDisplayForms: uniqWith(result.allDisplayForms, areAttributesWithDisplayFormsEqual),
        linkDisplayForms: uniqWith(result.linkDisplayForms, areAttributesWithDisplayFormsEqual),
    };
}
//# sourceMappingURL=useAttributesWithDisplayForms.js.map