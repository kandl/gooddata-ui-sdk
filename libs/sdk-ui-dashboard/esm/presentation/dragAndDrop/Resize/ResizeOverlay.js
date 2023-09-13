// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage, defineMessages } from "react-intl";
const messages = defineMessages({
    minHeight: { id: "layout.widget.height.min" },
    maxHeight: { id: "layout.widget.height.max" },
    minWidth: { id: "layout.widget.width.min" },
    maxWidth: { id: "layout.widget.width.max" },
});
var ResizeOverlayStatus;
(function (ResizeOverlayStatus) {
    ResizeOverlayStatus[ResizeOverlayStatus["None"] = 0] = "None";
    ResizeOverlayStatus[ResizeOverlayStatus["Grey"] = 1] = "Grey";
    ResizeOverlayStatus[ResizeOverlayStatus["Active"] = 2] = "Active";
    ResizeOverlayStatus[ResizeOverlayStatus["Error"] = 3] = "Error";
})(ResizeOverlayStatus || (ResizeOverlayStatus = {}));
function getMessage({ reachedHeightLimit, reachedWidthLimit, }) {
    if (reachedHeightLimit === "min") {
        return messages.minHeight;
    }
    if (reachedHeightLimit === "max") {
        return messages.maxHeight;
    }
    if (reachedWidthLimit === "min") {
        return messages.minWidth;
    }
    if (reachedWidthLimit === "max") {
        return messages.maxWidth;
    }
}
function getStatus({ isResizingColumnOrRow, isActive, reachedWidthLimit, reachedHeightLimit, }) {
    let status = ResizeOverlayStatus.None;
    if (isResizingColumnOrRow) {
        status = ResizeOverlayStatus.Grey;
        if (isActive) {
            status = ResizeOverlayStatus.Active;
            if (reachedWidthLimit !== "none" || reachedHeightLimit !== "none") {
                status = ResizeOverlayStatus.Error;
            }
        }
    }
    return status;
}
export function ResizeOverlay(props) {
    const status = getStatus(props);
    if (status === ResizeOverlayStatus.None) {
        return null;
    }
    const isInError = status === ResizeOverlayStatus.Error;
    const isActive = status === ResizeOverlayStatus.Active;
    const classes = cx("gd-resize-overlay", {
        active: isActive,
        error: isInError,
    });
    const message = getMessage({
        reachedHeightLimit: props.reachedHeightLimit,
        reachedWidthLimit: props.reachedWidthLimit,
    });
    const errorText = (React.createElement("div", { className: "gd-resize-overlay-text" },
        React.createElement(FormattedMessage, Object.assign({}, message))));
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { role: "resize-overlay", className: classes }),
        isInError ? errorText : null));
}
//# sourceMappingURL=ResizeOverlay.js.map