// (C) 2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { Icon } from "../Icon/index.js";
// do not use empty string returned when white-labeling is not enabled, otherwise default color is not applied
const sanitizeColor = (color) => (color === "" ? undefined : color);
export const HeaderInvite = ({ onInviteItemClick, textColor }) => {
    const intl = useIntl();
    return (React.createElement("div", { className: "gd-header-invite", onClick: onInviteItemClick },
        React.createElement(Icon.Invite, { color: sanitizeColor(textColor), className: "gd-header-invite-icon" }),
        React.createElement("span", { className: "gd-header-invite-text" }, intl.formatMessage({ id: "gs.header.invite" }))));
};
//# sourceMappingURL=HeaderInvite.js.map