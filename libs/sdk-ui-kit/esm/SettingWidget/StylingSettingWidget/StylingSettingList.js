// (C) 2022 GoodData Corporation
import React from "react";
import { StylingSettingListItem } from "./StylingSettingListItem.js";
import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import { DialogListEmpty } from "../../Dialog/DialogList/DialogListEmpty.js";
export const StylingSettingList = ({ items, itemToColorPreview, emptyMessageElement, onItemClick, onItemEdit, onItemDelete, initiallySelectedItemRef, selectedItemRef, onItemMenuToggle, }) => {
    if (items.length === 0) {
        return React.createElement(DialogListEmpty, { message: emptyMessageElement, className: "gd-styling-picker-list-empty" });
    }
    return (React.createElement("div", { className: "gd-styling-picker-list s-styling-picker-list" }, items.map((item) => (React.createElement(StylingSettingListItem, { key: objRefToString(item.ref), item: item, itemToColorPreview: itemToColorPreview, isSelected: areObjRefsEqual(item.ref, selectedItemRef), isDeletable: !areObjRefsEqual(item.ref, initiallySelectedItemRef), onClick: onItemClick, onDelete: onItemDelete, onEdit: onItemEdit, onMenuToggle: onItemMenuToggle })))));
};
//# sourceMappingURL=StylingSettingList.js.map