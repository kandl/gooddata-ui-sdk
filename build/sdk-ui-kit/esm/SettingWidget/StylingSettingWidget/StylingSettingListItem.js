// (C) 2022 GoodData Corporation
import React, { useState } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { ShortenedText } from "../../ShortenedText/index.js";
import { ColorPreview } from "../../Dialog/index.js";
import { Menu } from "../../Menu/index.js";
import { Item, ItemsWrapper, Separator } from "../../List/index.js";
import { Button } from "../../Button/index.js";
import { Bubble, BubbleHoverTrigger } from "../../Bubble/index.js";
import noop from "lodash/noop.js";
const TEXT_TOOLTIP_ALIGN_POINTS = [
    { align: "tc bc", offset: { x: 0, y: 0 } },
    { align: "bc tc", offset: { x: 0, y: 0 } },
];
export const StylingSettingListItem = ({ item, itemToColorPreview, isSelected, isDeletable, onClick, onEdit, onDelete, onMenuToggle = noop, }) => {
    const intl = useIntl();
    const { name, ref, content } = item;
    const colorsPreview = itemToColorPreview(content);
    const [opened, setOpened] = useState(false);
    const onOpenedChange = ({ opened }) => setOpened(opened);
    const toggleMenu = () => {
        onMenuToggle(ref);
        setOpened(!opened);
    };
    const isMenuVisible = onEdit || onDelete;
    return (React.createElement("div", { className: cx("gd-styling-picker-list-item", "s-styling-picker-list-item", `s-styling-picker-list-item-${stringUtils.simplifyText(name)}`, {
            "is-selected": isSelected,
        }) },
        React.createElement("label", { className: "input-radio-label gd-styling-picker-list-item-content" },
            React.createElement("input", { "aria-label": stringUtils.simplifyText(name), type: "radio", className: "input-radio", readOnly: true, checked: isSelected, onClick: () => onClick(ref) }),
            React.createElement(ColorPreview, { className: "gd-styling-picker-list-item-colors", colors: colorsPreview }),
            React.createElement("span", { className: "input-label-text gd-styling-picker-list-item-text" },
                React.createElement(ShortenedText, { className: "gd-styling-picker-list-item-text-shortened", tooltipAlignPoints: TEXT_TOOLTIP_ALIGN_POINTS }, name))),
        isMenuVisible ? (React.createElement(Menu, { toggler: React.createElement(Button, { value: "...", className: "gd-button-link-dimmed gd-styling-item-menu s-menu-toggle", onClick: toggleMenu }), opened: opened, openAction: "click", closeOnScroll: true, onOpenedChange: onOpenedChange },
            React.createElement(ItemsWrapper, { className: "s-styling-item-menu-items", smallItemsSpacing: true },
                React.createElement(Item, { className: "s-styling-item-menu-item-edit", onClick: () => onEdit === null || onEdit === void 0 ? void 0 : onEdit(item) }, intl.formatMessage({ id: "stylingPicker.item.edit" })),
                React.createElement(Separator, null),
                React.createElement(Item, { className: "s-styling-item-menu-item-delete", onClick: () => isDeletable && (onDelete === null || onDelete === void 0 ? void 0 : onDelete(ref)), disabled: !isDeletable },
                    React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
                        intl.formatMessage({ id: "stylingPicker.item.delete" }),
                        !isDeletable ? (React.createElement(Bubble, { className: "bubble-primary" }, intl.formatMessage({ id: "stylingPicker.item.delete.tooltip" }))) : null))))) : null));
};
//# sourceMappingURL=StylingSettingListItem.js.map