// (C) 2021-2022 GoodData Corporation
import React, { useState, useRef } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import cx from "classnames";
import isEmpty from "lodash/isEmpty.js";
import { Overlay } from "../Overlay/index.js";
export const CoreHeaderHelp = ({ className, items, helpMenuDropdownAlignPoints, onMenuItemClick, disableDropdown, onHelpClicked, helpRedirectUrl, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const helpMenuRef = useRef(null);
    const classNames = cx({
        "gd-header-help": true,
        "gd-icon-header-help": true,
        "is-open": isOpen && !helpRedirectUrl,
        "anchor-tag-header-help": !isEmpty(helpRedirectUrl),
        [className]: !!className,
    });
    const menuItems = items.map((item) => {
        return (React.createElement("a", { key: item.key, href: item.href, target: item.target, rel: item.target === "_blank" ? "noreferrer noopener" : undefined, onClick: () => {
                menuItemClicked(item);
            }, className: cx("gd-list-item gd-list-help-menu-item", { [item.className]: !!item.className }) },
            item.iconName ? React.createElement("i", { className: cx(item.iconName, "gd-icon") }) : null,
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: item.key }))));
    });
    const toggleHelpMenu = (isMenuOpen = !isOpen) => {
        onHelpClicked === null || onHelpClicked === void 0 ? void 0 : onHelpClicked(isMenuOpen);
        setIsOpen(isMenuOpen);
    };
    const menuItemClicked = (...args) => {
        toggleHelpMenu(false);
        onMenuItemClick(...args);
    };
    /**
     * Menu dropdown content is long enough to make it max-width (240px),
     * so it should just switch alignment to bottom right corner of the Help button.
     */
    const getHelpDropdownAlignPoints = () => {
        const defaultAlignPoints = [
            {
                align: "br tr",
            },
        ];
        const helpMenuCurrentRef = helpMenuRef === null || helpMenuRef === void 0 ? void 0 : helpMenuRef.current;
        if (!helpMenuCurrentRef ||
            !helpMenuDropdownAlignPoints ||
            helpMenuDropdownAlignPoints === "br tr" ||
            window.innerWidth - helpMenuCurrentRef.offsetLeft < 240) {
            return defaultAlignPoints;
        }
        return [
            {
                align: helpMenuDropdownAlignPoints,
            },
        ];
    };
    const renderHelpMenu = () => {
        return isOpen ? (React.createElement(Overlay, { alignTo: ".gd-header-help", alignPoints: getHelpDropdownAlignPoints(), closeOnOutsideClick: true, closeOnMouseDrag: true, closeOnParentScroll: true, onClose: () => {
                toggleHelpMenu(false);
            } }, !disableDropdown ? (React.createElement("div", { className: "gd-dialog gd-dropdown overlay gd-header-help-dropdown" },
            React.createElement("div", { className: "gd-list small" }, menuItems))) : null)) : (false);
    };
    return helpRedirectUrl ? (React.createElement("a", { className: classNames, href: helpRedirectUrl, target: "_blank", rel: "noreferrer noopener" },
        React.createElement(FormattedMessage, { id: "gs.header.help" }))) : (React.createElement("div", { className: classNames, onClick: () => toggleHelpMenu(), ref: helpMenuRef },
        React.createElement(FormattedMessage, { id: "gs.header.help" }),
        renderHelpMenu()));
};
export const HeaderHelp = injectIntl(CoreHeaderHelp);
//# sourceMappingURL=HeaderHelp.js.map