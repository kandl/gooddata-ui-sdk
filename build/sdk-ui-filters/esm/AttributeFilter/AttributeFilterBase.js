// (C) 2021-2023 GoodData Corporation
import React from "react";
import { useBackendStrict } from "@gooddata/sdk-ui";
import { validateAttributeFilterProps } from "./utils.js";
import { AttributeFilterProviders } from "./AttributeFilterProviders.js";
import { AttributeFilterDropdown } from "./Components/Dropdown/AttributeFilterDropdown.js";
/**
 * @internal
 */
export const AttributeFilterBase = (props) => {
    const backend = useBackendStrict(props.backend, "AttributeFilter");
    validateAttributeFilterProps(Object.assign({ backend }, props));
    return (React.createElement(AttributeFilterProviders, Object.assign({}, props),
        React.createElement(AttributeFilterDropdown, null)));
};
//# sourceMappingURL=AttributeFilterBase.js.map