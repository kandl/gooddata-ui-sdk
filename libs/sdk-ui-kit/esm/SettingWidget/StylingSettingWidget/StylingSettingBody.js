// (C) 2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { DialogListHeader } from "../../Dialog/index.js";
import { DialogListLoading } from "../../Dialog/DialogList/DialogListLoading.js";
import { StylingSettingList } from "./StylingSettingList.js";
import { StylingSettingListItem } from "./StylingSettingListItem.js";
export const StylingSettingBody = ({ isMobile, defaultItem, customItems, itemToColorPreview, emptyMessage, isLoading, onListActionClick, initiallySelectedItemRef, selectedItemRef, onItemClick, onItemEdit, onItemDelete, onItemMenuToggle, }) => {
    const intl = useIntl();
    return (React.createElement("div", { className: "gd-styling-picker-body" }, isLoading ? (React.createElement(DialogListLoading, { className: "gd-styling-picker-body-loading s-styling-picker-body-loading" })) : (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement(DialogListHeader, { className: "gd-styling-picker-list-header", title: intl.formatMessage({ id: "stylingPicker.title.basic" }) }),
            React.createElement(StylingSettingListItem, { item: defaultItem, itemToColorPreview: itemToColorPreview, isSelected: !selectedItemRef, onClick: () => onItemClick(null) })),
        React.createElement("div", { className: "gd-styling-picker-list-wrapper" },
            React.createElement(DialogListHeader, { title: intl.formatMessage({ id: "stylingPicker.title.custom" }), buttonTitle: isMobile
                    ? undefined
                    : intl.formatMessage({ id: "stylingPicker.title.create" }), onButtonClick: onListActionClick, className: "gd-styling-picker-list-header s-styling-picker-list-header" }),
            React.createElement(StylingSettingList, { items: customItems, itemToColorPreview: itemToColorPreview, emptyMessageElement: emptyMessage(), onItemClick: onItemClick, onItemEdit: isMobile ? undefined : onItemEdit, onItemDelete: isMobile ? undefined : onItemDelete, initiallySelectedItemRef: initiallySelectedItemRef, selectedItemRef: selectedItemRef, onItemMenuToggle: onItemMenuToggle }))))));
};
//# sourceMappingURL=StylingSettingBody.js.map