// (C) 2020-2022 GoodData Corporation
import React, { useState } from "react";
import { Button, Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import cx from "classnames";
import { AttributeDropdownBody } from "./AttributeDropdownBody.js";
import { injectIntl, FormattedMessage } from "react-intl";
const getItemTitle = (selectedItem, intl) => selectedItem ? selectedItem.title : intl.formatMessage({ id: "rankingFilter.allRecords" });
const getItemIcon = (selectedItem) => {
    if (selectedItem) {
        return selectedItem.type === "DATE" ? "gd-icon-date" : "gd-icon-attribute";
    }
    else {
        return null;
    }
};
const AttributeDropdownComponent = ({ items, selectedItemRef, onSelect, onDropDownItemMouseOver, onDropDownItemMouseOut, customGranularitySelection, intl, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isDisabled = items.length === 1;
    const onButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const onItemSelect = (ref) => {
        onSelect(ref);
        setIsOpen(false);
        onDropDownItemMouseOut === null || onDropDownItemMouseOut === void 0 ? void 0 : onDropDownItemMouseOut();
    };
    const buttonClassNames = cx("gd-button-secondary", "gd-button-small", "button-dropdown", "gd-icon-right", {
        "gd-icon-navigateup": isOpen,
        "gd-icon-navigatedown": !isOpen,
    }, "gd-rf-attribute-dropdown-button", "s-rf-attribute-dropdown-button");
    const selectedAttributeItem = items.find((item) => areObjRefsEqual(item.ref, selectedItemRef));
    const itemTitle = getItemTitle(selectedAttributeItem, intl);
    return isDisabled ? (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
        React.createElement(Button, { className: buttonClassNames, value: itemTitle, disabled: true }),
        React.createElement(Bubble, { className: `bubble-primary gd-rf-tooltip-bubble s-rf-attribute-no-options-bubble`, alignPoints: [{ align: "cr cl" }, { align: "cl cr" }] },
            React.createElement(FormattedMessage, { id: "rankingFilter.attributeDropdown.oneAttributeTooltip" })))) : (React.createElement(React.Fragment, null,
        React.createElement(Button, { className: buttonClassNames, value: itemTitle, onClick: onButtonClick, iconLeft: getItemIcon(selectedAttributeItem) }),
        isOpen ? (React.createElement(AttributeDropdownBody, { items: items, selectedItemRef: selectedItemRef, onSelect: onItemSelect, onClose: () => setIsOpen(false), onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, customGranularitySelection: customGranularitySelection })) : null));
};
export const AttributeDropdown = injectIntl(AttributeDropdownComponent);
//# sourceMappingURL=AttributeDropdown.js.map