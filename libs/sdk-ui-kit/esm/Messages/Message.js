// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
/**
 * @internal
 */
export const Message = ({ onClose, type, children, className, contrast, intensive, }) => {
    const classes = cx("gd-message", "s-message", className, {
        success: type === "success",
        progress: type === "progress",
        error: type === "error",
        warning: type === "warning",
        contrast,
        intensive,
    });
    return (React.createElement("div", { className: classes },
        React.createElement("div", { className: "gd-message-text" },
            children,
            onClose ? (React.createElement("div", { className: "gd-message-dismiss-container" },
                React.createElement("a", { "aria-label": "dismiss", className: "gd-message-dismiss gd-icon-cross", onClick: onClose }))) : null)));
};
//# sourceMappingURL=Message.js.map