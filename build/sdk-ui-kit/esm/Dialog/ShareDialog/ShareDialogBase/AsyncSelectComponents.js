// (C) 2021-2023 GoodData Corporation
import React from "react";
import { components as ReactSelectComponents, } from "react-select";
import { Typography } from "../../../Typography/index.js";
import { LoadingMask } from "../../../LoadingMask/index.js";
import { isGranteeItem, isGranteeUser, isSelectErrorOption, } from "./types.js";
import { getGranteeItemTestId } from "./utils.js";
export const EmptyRenderer = () => {
    return null;
};
export const LoadingMessageRenderer = () => {
    return (React.createElement("div", { className: "gd-share-dialog-loading-mask-container" },
        React.createElement(LoadingMask, { size: "small" })));
};
export const NoOptionsMessageRenderer = (props) => {
    return (React.createElement("div", { className: "s-gd-share-dialog-no-option", "aria-label": "Share dialog no match" },
        React.createElement(ReactSelectComponents.NoOptionsMessage, Object.assign({}, props))));
};
export const MenuListRendered = (props) => {
    return (React.createElement(ReactSelectComponents.MenuList, Object.assign({}, props),
        React.createElement("div", { className: "s-gd-share-dialog-menu", "aria-label": "Share dialog menu list" }, props.children)));
};
export const InputRendered = (props) => {
    return (React.createElement("div", { className: "gd-share-dialog-input s-gd-share-dialog-input" },
        React.createElement(ReactSelectComponents.Input, Object.assign({}, props))));
};
const OptionContentRenderer = (item) => {
    if (isGranteeUser(item.value)) {
        return (React.createElement(React.Fragment, null,
            item.label,
            " ",
            React.createElement("span", { className: "option-email" }, item.value.email)));
    }
    return React.createElement(React.Fragment, null,
        " ",
        item.label,
        " ");
};
export const ErrorOptionRenderer = (errorOption) => {
    return (React.createElement("div", { className: `gd-share-dialog-option-error s-gd-share-dialog-option-error`, "aria-label": "Share dialog error" },
        React.createElement("span", { className: "gd-share-dialog-option-error-content" }, errorOption.label)));
};
export const OptionRenderer = (props) => {
    const { className, cx, isFocused, innerRef, innerProps, data } = props;
    if (isSelectErrorOption(data)) {
        return ErrorOptionRenderer(data);
    }
    let sTestStyle = "";
    if (isGranteeItem(data.value)) {
        sTestStyle = getGranteeItemTestId(data.value, "option");
    }
    const componentStyle = cx({
        option: true,
        "option--is-focused": isFocused,
    }, className);
    return (React.createElement("div", Object.assign({ ref: innerRef, className: `${componentStyle} ${sTestStyle}` }, innerProps),
        React.createElement("div", { className: "option-content" }, OptionContentRenderer(data))));
};
export const GroupHeadingRenderer = (props) => {
    const { label } = props.data;
    return (React.createElement("div", { className: "gd-share-dialog-select-group-heading" },
        React.createElement(Typography, { tagName: "h3" }, label)));
};
//# sourceMappingURL=AsyncSelectComponents.js.map