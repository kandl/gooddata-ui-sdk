// (C) 2022-2023 GoodData Corporation
import React, { useMemo } from "react";
import { isAttributeMetadataObject, objRefToString } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { selectAllCatalogAttributesMap, selectAttributeFilterDisplayFormsMap, selectFilterContextAttributeFilters, useDashboardSelector, } from "../../../../model/index.js";
import { AttributeFilterConfigurationItem } from "./AttributeFilterConfigurationItem.js";
import { getAttributeByDisplayForm } from "./utils.js";
import { useAttributes } from "../../../../_staging/sharedHooks/useAttributes.js";
export const AttributeFilterConfiguration = (props) => {
    const { widget } = props;
    const attributeFilters = useDashboardSelector(selectFilterContextAttributeFilters);
    const dfMap = useDashboardSelector(selectAttributeFilterDisplayFormsMap);
    const attrMap = useDashboardSelector(selectAllCatalogAttributesMap);
    const displayForms = useMemo(() => {
        return attributeFilters.map((filter) => filter.attributeFilter.displayForm);
    }, [attributeFilters]);
    const { attributes, attributesLoading } = useAttributes(displayForms);
    if (attributesLoading) {
        return React.createElement("span", { className: "gd-spinner small s-attribute-filter-configuration-loading" });
    }
    if (!attributes) {
        return null;
    }
    return (React.createElement("div", { className: "s-attribute-filter-configuration" }, attributeFilters.map((filter) => {
        var _a;
        const displayForm = dfMap.get(filter.attributeFilter.displayForm);
        invariant(displayForm, "Inconsistent state in AttributeFilterConfiguration");
        const attributeByDisplayForm = getAttributeByDisplayForm(attributes, displayForm.attribute);
        const attribute = attrMap.get(displayForm.attribute) || attributeByDisplayForm;
        invariant(attribute, "Inconsistent state in AttributeFilterConfiguration");
        const attributeTitle = isAttributeMetadataObject(attribute)
            ? attribute.title
            : attribute.attribute.title;
        return (React.createElement(AttributeFilterConfigurationItem, { key: objRefToString(displayForm.ref), displayFormRef: displayForm.ref, title: (_a = filter.attributeFilter.title) !== null && _a !== void 0 ? _a : attributeTitle, widget: widget }));
    })));
};
//# sourceMappingURL=AttributeFilterConfiguration.js.map