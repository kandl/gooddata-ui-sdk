// (C) 2020 GoodData Corporation
import React from "react";
import { isWarningMessage } from "./typings.js";
import cx from "classnames";
const getSeverityClassName = (warningMessage) => {
    if (typeof warningMessage === "string") {
        return "gd-mvf-warning-message-low s-mvf-warning-message-low";
    }
    switch (warningMessage.severity) {
        case "low":
            return "gd-mvf-warning-message-low s-mvf-warning-message-low";
        case "medium":
            return "gd-mvf-warning-message-medium s-mvf-warning-message-medium";
        case "high":
            return "gd-mvf-warning-message-high s-mvf-warning-message-high";
    }
};
export const WarningMessageComponent = ({ warningMessage, className }) => {
    const messageClassName = cx("gd-mvf-warning-message", getSeverityClassName(warningMessage), className, "s-mvf-warning-message");
    return (React.createElement("div", { className: messageClassName }, isWarningMessage(warningMessage) ? warningMessage.text : warningMessage));
};
//# sourceMappingURL=WarningMessage.js.map