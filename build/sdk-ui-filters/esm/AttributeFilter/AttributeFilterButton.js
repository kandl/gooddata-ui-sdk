// (C) 2021-2022 GoodData Corporation
import React from "react";
import { AttributeFilterBase } from "./AttributeFilterBase.js";
import { AttributeFilterDropdownButton } from "./Components/DropdownButton/AttributeFilterDropdownButton.js";
/**
 * AttributeFilterButton is a component that renders a rich button and a dropdown populated with attribute values
 * for specified attribute display form.
 * @public
 */
export const AttributeFilterButton = (props) => {
    var _a;
    return (React.createElement(AttributeFilterBase, Object.assign({}, props, { DropdownButtonComponent: (_a = props.DropdownButtonComponent) !== null && _a !== void 0 ? _a : AttributeFilterDropdownButton })));
};
//# sourceMappingURL=AttributeFilterButton.js.map