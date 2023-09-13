// (C) 2023 GoodData Corporation
import React from "react";
import { DropdownButton } from "@gooddata/sdk-ui-kit";
const NumberFormatToggleButton = ({ disabled, isOpened, selectedPreset, toggleDropdown, }) => {
    return (React.createElement("div", { className: "adi-bucket-dropdown number-format-toggle-button s-number-format-toggle-button" },
        React.createElement(DropdownButton, { title: selectedPreset.name, value: selectedPreset.name, onClick: toggleDropdown, isOpen: isOpened, disabled: disabled })));
};
export default NumberFormatToggleButton;
//# sourceMappingURL=NumberFormatToggleButton.js.map