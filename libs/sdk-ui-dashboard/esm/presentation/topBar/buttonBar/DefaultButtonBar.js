// (C) 2021-2023 GoodData Corporation
import React from "react";
import { CancelButton, EditButton, SaveAsNewButton, SaveButton, ShareButton } from "./button/index.js";
/**
 * @alpha
 */
export const DefaultButtonBar = (props) => {
    const { children, cancelButtonProps, saveButtonProps, editButtonProps, saveAsNewButtonProps, shareButtonProps, childContentPosition = "left", } = props;
    // TODO INE allow customization of buttons via getter from props
    return (React.createElement("div", { className: "dash-control-buttons" },
        childContentPosition === "left" && children,
        React.createElement(CancelButton, Object.assign({}, cancelButtonProps)),
        React.createElement(SaveButton, Object.assign({}, saveButtonProps)),
        React.createElement(EditButton, Object.assign({}, editButtonProps)),
        React.createElement(SaveAsNewButton, Object.assign({}, saveAsNewButtonProps)),
        React.createElement(ShareButton, Object.assign({}, shareButtonProps)),
        childContentPosition === "right" && children));
};
//# sourceMappingURL=DefaultButtonBar.js.map