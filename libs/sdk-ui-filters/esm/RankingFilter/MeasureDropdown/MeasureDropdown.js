// (C) 2020-2022 GoodData Corporation
import React, { useState } from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import cx from "classnames";
import { MeasureDropdownBody } from "./MeasureDropdownBody.js";
export const MeasureDropdown = ({ items, selectedItemRef, onSelect, onDropDownItemMouseOver, onDropDownItemMouseOut, enableRenamingMeasureToMetric, }) => {
    const [isOpen, setIsOpen] = useState(false);
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
    }, "gd-rf-measure-dropdown-button", "s-rf-measure-dropdown-button");
    const selectedItem = items.find((item) => areObjRefsEqual(item.ref, selectedItemRef));
    const title = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.title;
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { className: buttonClassNames, value: title, onClick: onButtonClick, iconLeft: enableRenamingMeasureToMetric ? "gd-icon-metric" : "gd-icon-measure" }),
        isOpen ? (React.createElement(MeasureDropdownBody, { items: items, selectedItemRef: selectedItemRef, onSelect: onItemSelect, onClose: () => setIsOpen(false), onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric })) : null));
};
//# sourceMappingURL=MeasureDropdown.js.map