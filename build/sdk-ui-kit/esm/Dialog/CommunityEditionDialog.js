// (C) 2021 GoodData Corporation
import React from "react";
import { Dialog } from "./Dialog.js";
import { Message } from "../Messages/index.js";
import { Button } from "../Button/index.js";
/**
 * @internal
 */
export const CommunityEditionDialog = ({ headerText, infoText, copyrightText, links, onClose, closeButtonText, }) => {
    return (React.createElement(Dialog, { onClose: onClose, displayCloseButton: true, className: "gd-community-dialog" },
        React.createElement("h3", { className: "gd-community-dialog-header" }, headerText),
        React.createElement(Message, { type: "progress", className: "gd-community-dialog-info" }, infoText),
        React.createElement("div", { className: "gd-community-dialog-copyright" }, copyrightText),
        links.length > 0 ? (React.createElement("ul", { className: "gd-community-dialog-links" }, links.map((link) => (React.createElement("li", { key: link.uri },
            React.createElement("a", { href: link.uri, target: "_blank", rel: "noreferrer noopener" }, link.text)))))) : null,
        React.createElement("div", { className: "gd-dialog-footer" },
            React.createElement(Button, { className: "gd-community-button gd-button-secondary", onClick: onClose, value: closeButtonText, title: closeButtonText }))));
};
//# sourceMappingURL=CommunityEditionDialog.js.map