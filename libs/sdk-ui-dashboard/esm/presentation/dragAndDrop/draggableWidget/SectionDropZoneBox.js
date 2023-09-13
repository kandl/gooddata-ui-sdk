// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
import { DashboardLayoutSectionBorder } from "./DashboardLayoutSectionBorder/index.js";
export const SectionDropZoneBox = (props) => {
    const { isOver } = props;
    return (React.createElement("div", { className: "new-row-dropzone" },
        React.createElement(DashboardLayoutSectionBorder, { status: isOver ? "active" : "muted" },
            React.createElement("div", { className: cx("drag-info-placeholder", "widget-dropzone-box", "s-last-drop-position", "type-kpi") },
                React.createElement("div", { className: cx("drag-info-placeholder-inner", "can-drop", { "is-over": isOver }) },
                    React.createElement("div", { className: "drag-info-placeholder-drop-target" },
                        React.createElement("div", { className: "drop-target-inner" },
                            React.createElement(Typography, { tagName: "p", className: "drop-target-message kpi-drop-target" },
                                React.createElement(FormattedMessage, { id: "dropzone.new.row.desc", values: {
                                        b: (chunks) => React.createElement("b", null, chunks),
                                        nbsp: React.createElement(React.Fragment, null, "\u00A0"),
                                    } })))))))));
};
//# sourceMappingURL=SectionDropZoneBox.js.map