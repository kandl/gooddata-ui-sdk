// (C) 2021-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "../../../Bubble/index.js";
import { useComponentLabelsContext } from "./ComponentLabelsContext.js";
const alignPoints = [{ align: "cr cl" }];
export const GranteeUserIcon = () => {
    return (React.createElement("div", { className: "gd-grantee-item-icon-left-background" },
        React.createElement("span", { className: "gd-grantee-item-icon gd-grantee-icon-user gd-grantee-item-icon-left" })));
};
export const GranteeUserInactiveIcon = () => {
    return (React.createElement("div", { className: "gd-grantee-item-icon-left-background" },
        React.createElement("span", { className: "gd-grantee-item-icon-inactive gd-grantee-icon-user gd-grantee-item-icon-left" })));
};
export const GranteeGroupIcon = () => {
    return (React.createElement("div", { className: "gd-grantee-item-icon-left-background" },
        React.createElement("span", { className: "gd-grantee-item-icon gd-grantee-icon-group gd-grantee-item-icon-left" })));
};
export const GranteeRemoveIcon = (props) => {
    const { onClick, mode } = props;
    const labels = useComponentLabelsContext();
    return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0, className: "gd-grantee-item-delete" },
        React.createElement("span", { className: "gd-grantee-item-icon gd-grantee-icon-trash gd-grantee-item-icon-right s-gd-grantee-item-delete", onClick: onClick, "aria-label": "Share dialog grantee delete" }),
        React.createElement(Bubble, { className: "bubble-primary", alignPoints: alignPoints }, mode === "ShareGrantee" ? (React.createElement(React.Fragment, null,
            " ",
            labels.removeAccessGranteeTooltip,
            " ")) : (React.createElement(FormattedMessage, { id: "shareDialog.share.grantee.item.remove.selection" })))));
};
export const GranteeOwnerRemoveIcon = () => {
    const labels = useComponentLabelsContext();
    return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0, className: "gd-grantee-item-delete-owner" },
        React.createElement("span", { className: "gd-grantee-item-icon gd-grantee-item-icon-owner gd-grantee-item-icon-right" },
            React.createElement(FormattedMessage, { id: "shareDialog.share.grantee.item.creator" })),
        React.createElement(Bubble, { className: "bubble-primary", alignPoints: alignPoints }, labels.removeAccessCreatorTooltip)));
};
//# sourceMappingURL=GranteeIcons.js.map