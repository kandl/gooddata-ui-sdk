import { __rest } from "tslib";
// (C) 2007-2022 GoodData Corporation
import React from "react";
import { AttributeFilterBase } from "./AttributeFilterBase.js";
import { AttributeFilterSimpleDropdownButton, AttributeFilterSimpleDropdownButtonWithSelection, } from "./Components/DropdownButton/AttributeFilterSimpleDropdownButton.js";
/**
 * AttributeFilter is a component that renders a simple button and a dropdown populated with attribute values
 * for specified attribute display form.
 *
 * @public
 */
export const AttributeFilter = (props) => {
    var _a;
    const { titleWithSelection } = props, baseProps = __rest(props, ["titleWithSelection"]);
    const DropdownButtonComponent = titleWithSelection
        ? AttributeFilterSimpleDropdownButtonWithSelection
        : AttributeFilterSimpleDropdownButton;
    return (React.createElement(AttributeFilterBase, Object.assign({}, baseProps, { DropdownButtonComponent: (_a = props.DropdownButtonComponent) !== null && _a !== void 0 ? _a : DropdownButtonComponent })));
};
//# sourceMappingURL=AttributeFilter.js.map