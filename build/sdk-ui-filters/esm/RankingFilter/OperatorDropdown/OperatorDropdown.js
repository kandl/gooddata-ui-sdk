// (C) 2020-2022 GoodData Corporation
import React, { useState } from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import { OperatorDropdownBody } from "./OperatorDropdownBody.js";
import { injectIntl } from "react-intl";
import { messages } from "../../locales.js";
const operatorItems = [
    { value: "TOP", translationId: messages.top.id },
    { value: "BOTTOM", translationId: messages.bottom.id },
];
const getOperatorItemTranslation = (operator) => {
    return operatorItems.find(({ value }) => value === operator).translationId;
};
const OperatorDropdownComponent = ({ selectedValue, onSelect, intl, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const onItemSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };
    const buttonClassNames = cx("gd-button-secondary", "gd-button-small", "button-dropdown", "gd-icon-right", {
        "gd-icon-navigateup": isOpen,
        "gd-icon-navigatedown": !isOpen,
    }, "gd-rf-operator-dropdown-button", "s-rf-operator-dropdown-button");
    const title = intl.formatMessage({ id: getOperatorItemTranslation(selectedValue) });
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { className: buttonClassNames, value: title, onClick: onButtonClick }),
        isOpen ? (React.createElement(OperatorDropdownBody, { items: operatorItems, selectedValue: selectedValue, onSelect: onItemSelect, onClose: () => setIsOpen(false) })) : null));
};
export const OperatorDropdown = injectIntl(OperatorDropdownComponent);
//# sourceMappingURL=OperatorDropdown.js.map