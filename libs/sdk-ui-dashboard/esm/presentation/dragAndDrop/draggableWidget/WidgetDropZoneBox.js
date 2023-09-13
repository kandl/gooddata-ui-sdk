// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
export const WidgetDropZoneBox = (props) => {
    const { isLast } = props;
    return (React.createElement("div", { className: cx("drag-info-placeholder", "widget-dropzone-box", "s-last-drop-position", "type-kpi") },
        React.createElement("div", { className: cx("drag-info-placeholder-inner", "can-drop", "is-over") },
            React.createElement("div", { className: "drag-info-placeholder-drop-target" },
                React.createElement("div", { className: "drop-target-inner" },
                    React.createElement(Typography, { tagName: "p", className: "drop-target-message kpi-drop-target" }, isLast ? (React.createElement(FormattedMessage, { id: "dropzone.widget.last.in.row.desc", values: { b: (chunks) => React.createElement("b", null, chunks) } })) : (React.createElement(FormattedMessage, { id: "dropzone.widget.desc", values: { b: (chunks) => React.createElement("b", null, chunks) } }))))))));
};
//# sourceMappingURL=WidgetDropZoneBox.js.map