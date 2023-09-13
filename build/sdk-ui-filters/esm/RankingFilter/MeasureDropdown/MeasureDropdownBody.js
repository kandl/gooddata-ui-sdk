// (C) 2020-2022 GoodData Corporation
import React from "react";
import { objRefToString, areObjRefsEqual } from "@gooddata/sdk-model";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { MeasureDropdownItem } from "./MeasureDropdownItem.js";
export const MeasureDropdownBody = ({ items, selectedItemRef, onSelect, onClose, onDropDownItemMouseOver, onDropDownItemMouseOut, enableRenamingMeasureToMetric, }) => {
    return (React.createElement(Overlay, { closeOnOutsideClick: true, alignTo: ".gd-rf-measure-dropdown-button", alignPoints: [{ align: "bl tl" }, { align: "tl bl" }], onClose: onClose },
        React.createElement("div", { className: "gd-dropdown overlay gd-rf-inner-overlay-dropdown gd-rf-measure-dropdown-body s-rf-measure-dropdown-body" }, items.map((item) => {
            const { ref } = item;
            return (React.createElement(MeasureDropdownItem, { key: objRefToString(ref), item: item, isSelected: areObjRefsEqual(ref, selectedItemRef), onSelect: onSelect, onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric }));
        }))));
};
//# sourceMappingURL=MeasureDropdownBody.js.map