// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { Bubble, BubbleHoverTrigger } from "../../Bubble/index.js";
import { ShortenedText } from "../../ShortenedText/index.js";
const ICON_TOOLTIP_ALIGN_POINTS = [
    { align: "cr cl", offset: { x: 10, y: 0 } },
    { align: "cl cr", offset: { x: -10, y: 0 } },
];
const TEXT_TOOLTIP_ALIGN_POINTS = [
    { align: "tc bc", offset: { x: 0, y: 0 } },
    { align: "bc tc", offset: { x: 0, y: 0 } },
];
/**
 * @internal
 */
export const DialogListItemBasic = (props) => {
    const { item, className, onClick, onDelete } = props;
    const { id, title, subtitle, isDisabled = false, isClickable = true, isDeletable = true, icon, deleteTooltipText, } = item;
    const rootClassNames = useMemo(() => cx("gd-dialog-list-item-basic", "s-dialog-list-item-basic", `s-dialog-list-item-${stringUtils.simplifyText(id)}`, {
        clickable: !isDisabled && isClickable,
        disabled: isDisabled,
    }, className), [id, isClickable, isDisabled, className]);
    const showDeleteButton = useMemo(() => !isDisabled && isDeletable, [isDisabled, isDeletable]);
    const handleItemClick = useCallback(() => {
        !isDisabled && isClickable && (onClick === null || onClick === void 0 ? void 0 : onClick(item));
    }, [isDisabled, isClickable, item, onClick]);
    const handleItemDelete = useCallback(() => {
        !isDisabled && isDeletable && (onDelete === null || onDelete === void 0 ? void 0 : onDelete(item));
    }, [isDisabled, isDeletable, item, onDelete]);
    return (React.createElement("div", { role: "dialog-list-item", className: rootClassNames },
        showDeleteButton ? (React.createElement("div", { className: "gd-dialog-list-item-delete" },
            React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
                React.createElement("span", { role: "icon-delete", className: "gd-dialog-list-item-delete-icon s-dialog-list-item-delete-icon", onClick: handleItemDelete }),
                deleteTooltipText ? (React.createElement(Bubble, { className: "bubble-primary", alignPoints: ICON_TOOLTIP_ALIGN_POINTS }, deleteTooltipText)) : null))) : null,
        React.createElement("div", { role: "dialog-list-item-content", className: "gd-dialog-list-item-content s-dialog-list-item-content", onClick: handleItemClick },
            icon ? React.createElement("div", { className: "gd-dialog-list-item-icon" }, icon) : null,
            React.createElement("div", { className: "gd-dialog-list-item-text s-dialog-list-item-text" },
                React.createElement("div", { className: "gd-dialog-list-item-title s-dialog-list-item-title" },
                    React.createElement(ShortenedText, { className: "gd-dialog-list-item-shortened-text", tooltipAlignPoints: TEXT_TOOLTIP_ALIGN_POINTS }, title)),
                subtitle ? (React.createElement("div", { className: "gd-dialog-list-item-subtitle s-dialog-list-item-subtitle" },
                    React.createElement(ShortenedText, { className: "gd-dialog-list-item-shortened-text", tooltipAlignPoints: TEXT_TOOLTIP_ALIGN_POINTS }, subtitle))) : null))));
};
//# sourceMappingURL=DialogListItemBasic.js.map