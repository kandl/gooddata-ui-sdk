// (C) 2022 GoodData Corporation
import React from "react";
import { AttributeDisplayFormDropdown } from "./AttributeDisplayFormDropdown.js";
import { useAttributeFilterContext } from "../../../Context/AttributeFilterContext.js";
/**
 * Component that render Attribute display forms selector as dropdown.
 * @internal
 */
export const AttributeDisplayFormSelect = (props) => {
    const { onSelect, alignPoints } = props;
    const { displayForms, currentDisplayFormRef } = useAttributeFilterContext();
    return (React.createElement(AttributeDisplayFormDropdown, { displayForms: displayForms, selectedDisplayForm: currentDisplayFormRef, alignPoints: alignPoints, onSelect: onSelect }));
};
//# sourceMappingURL=AttributeDisplayFormSelect.js.map