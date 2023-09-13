// (C) 2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Message } from "../../../Messages/index.js";
export const AdminInformationMessage = ({ isVisible, onClose }) => {
    if (!isVisible) {
        return null;
    }
    return (React.createElement(Message, { type: "progress", className: "gd-granular-permissions-admin-information s-granular-permissions-admin-information", onClose: onClose },
        React.createElement("span", { "aria-label": "Share dialog admin information message" },
            React.createElement(FormattedMessage, { id: "shareDialog.share.granular.administrator.info", values: { b: (chunks) => React.createElement("strong", null, chunks) } }))));
};
//# sourceMappingURL=AdminInformationMessage.js.map