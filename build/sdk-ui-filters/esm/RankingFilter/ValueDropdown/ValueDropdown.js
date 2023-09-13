// (C) 2020 GoodData Corporation
import React from "react";
import { DynamicSelect } from "../../DateFilter/DynamicSelect/DynamicSelect.js";
import { injectIntl } from "react-intl";
import { sanitizeCustomInput, sanitizeInput } from "./utils.js";
const ValueDropdownComponent = ({ selectedValue, onSelect, intl }) => {
    const getDropdownItems = (value) => sanitizeInput(value, intl);
    return (React.createElement(DynamicSelect, { getItems: getDropdownItems, onChange: onSelect, value: selectedValue, className: "gd-rf-value-dropdown-button s-rf-value-dropdown-button", optionClassName: "s-rf-value-dropdown-item", customValueValidator: sanitizeCustomInput }));
};
export const ValueDropdown = injectIntl(ValueDropdownComponent);
//# sourceMappingURL=ValueDropdown.js.map