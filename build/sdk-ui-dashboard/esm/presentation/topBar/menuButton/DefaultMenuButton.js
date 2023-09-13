// (C) 2021-2022 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger, Button, ItemsWrapper, Overlay, SingleSelectListItem, } from "@gooddata/sdk-ui-kit";
const overlayAlignPoints = [{ align: "br tr" }];
const bubbleAlignPoints = [{ align: "cl tr" }];
/**
 * @alpha
 */
export const DefaultMenuButton = (props) => {
    const { menuItems } = props;
    const [isOpen, setIsOpen] = useState(false);
    const onMenuButtonClick = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);
    const visibleMenuItems = useMemo(() => menuItems.filter((item) => item.visible !== false), [menuItems]);
    if (!visibleMenuItems.length) {
        if (!menuItems.length) {
            // only warn if the items were really empty before filtering
            console.warn("DefaultMenuButton rendered without menu items. Make sure you are passing some items there.");
        }
        return null;
    }
    const renderMenuItems = () => {
        return (React.createElement(Overlay, { key: "topBarMenuButton", alignTo: ".s-header-options-button", alignPoints: overlayAlignPoints, className: "gd-header-menu-overlay", closeOnMouseDrag: true, closeOnOutsideClick: true, onClose: onMenuButtonClick },
            React.createElement(ItemsWrapper, { smallItemsSpacing: true }, visibleMenuItems.map((menuItem) => {
                if (menuItem.type === "separator") {
                    return (React.createElement(SingleSelectListItem, { key: menuItem.itemId, type: menuItem.type, className: menuItem.className }));
                }
                if (menuItem.type === "header") {
                    return (React.createElement(SingleSelectListItem, { key: menuItem.itemId, type: menuItem.type, title: menuItem.itemName, className: menuItem.className }));
                }
                const selectorClassName = `gd-menu-item-${menuItem.itemId}`;
                const body = (React.createElement(SingleSelectListItem, { className: cx("gd-menu-item", menuItem.className, `s-${menuItem.itemId}`, {
                        [selectorClassName]: menuItem.tooltip,
                        "is-disabled": menuItem.disabled,
                    }), key: menuItem.itemId, title: menuItem.itemName, onClick: menuItem.disabled
                        ? undefined
                        : () => {
                            var _a;
                            (_a = menuItem.onClick) === null || _a === void 0 ? void 0 : _a.call(menuItem);
                            setIsOpen(false);
                        } }));
                if (!menuItem.tooltip) {
                    return body;
                }
                return (React.createElement(BubbleHoverTrigger, { key: menuItem.itemId },
                    body,
                    React.createElement(Bubble, { alignTo: `.${selectorClassName}`, alignPoints: bubbleAlignPoints },
                        React.createElement("span", null, menuItem.tooltip))));
            }))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: onMenuButtonClick, value: "\u22EF", className: "gd-button-primary dash-header-options-button s-header-options-button gd-button" }),
        isOpen ? renderMenuItems() : null));
};
//# sourceMappingURL=DefaultMenuButton.js.map