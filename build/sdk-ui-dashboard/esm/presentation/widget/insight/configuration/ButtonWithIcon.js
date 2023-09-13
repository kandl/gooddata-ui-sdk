// (C) 2020-2022 GoodData Corporation
import React from "react";
import { DropdownButton } from "@gooddata/sdk-ui-kit";
export const ButtonWithIcon = (props) => {
    return (React.createElement(DropdownButton, { value: props.value, isSmall: false, className: `gd-button-small ${props.className}`, iconLeft: props.icon, isOpen: props.isOpen, onClick: props.onClick }));
};
//# sourceMappingURL=ButtonWithIcon.js.map