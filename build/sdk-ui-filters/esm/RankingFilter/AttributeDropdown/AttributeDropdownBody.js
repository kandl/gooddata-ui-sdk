// (C) 2020 GoodData Corporation
import React from "react";
import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { AttributeItem } from "./DropdownItems/AttributeItem.js";
import { AllRecordsItem } from "./DropdownItems/AllRecordsItem.js";
export const AttributeDropdownBody = ({ items, selectedItemRef, onSelect, onClose, onDropDownItemMouseOver, onDropDownItemMouseOut, customGranularitySelection, }) => {
    return (React.createElement(Overlay, { closeOnOutsideClick: true, alignTo: ".gd-rf-attribute-dropdown-button", alignPoints: [{ align: "bl tl" }, { align: "tl bl" }], onClose: onClose },
        React.createElement("div", { className: "gd-dropdown overlay gd-rf-inner-overlay-dropdown gd-rf-attribute-dropdown-body s-rf-attribute-dropdown-body" },
            items.map((item) => {
                const { type, ref } = item;
                return (React.createElement(AttributeItem, { key: objRefToString(ref), iconClass: type === "DATE" ? "gd-icon-date" : "gd-icon-attribute", item: item, isSelected: areObjRefsEqual(ref, selectedItemRef), onSelect: onSelect, onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, customGranularitySelection: customGranularitySelection }));
            }),
            React.createElement("div", { className: "gd-rf-attribute-dropdown-separator" }),
            React.createElement(AllRecordsItem, { isSelected: !selectedItemRef, onSelect: onSelect }))));
};
//# sourceMappingURL=AttributeDropdownBody.js.map