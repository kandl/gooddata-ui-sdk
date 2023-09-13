import { __rest } from "tslib";
// (C) 2007-2020 GoodData Corporation
import React from "react";
import classnames from "classnames";
/**
 * @internal
 */
export const ItemsWrapper = ({ smallItemsSpacing, className, children, style, }) => (React.createElement("div", { className: classnames({
        "gd-menu-wrapper": true,
        "gd-menu-wrapper-small-spacing": smallItemsSpacing,
    }, className), style: style }, children));
ItemsWrapper.defaultProps = {
    smallItemsSpacing: false,
};
/**
 * @internal
 */
export const Separator = (props) => (React.createElement("div", Object.assign({ className: "gd-list-item gd-list-item-separator" }, props)));
/**
 * @internal
 */
export const Header = (_a) => {
    var { children } = _a, restProps = __rest(_a, ["children"]);
    return (React.createElement("div", Object.assign({ className: "gd-list-item gd-list-item-header" }, restProps), children));
};
/**
 * @internal
 */
export const Item = ({ checked, subMenu, disabled, className, children, style, onClick, }) => (React.createElement("div", { className: classnames({
        "gd-list-item": true,
        "gd-menu-item": true,
        "is-checked": checked,
        "is-submenu": subMenu,
        "is-disabled": disabled,
    }, className), style: style, onClick: onClick }, children));
Item.defaultProps = {
    checked: false,
    subMenu: false,
    disabled: false,
};
//# sourceMappingURL=MenuList.js.map