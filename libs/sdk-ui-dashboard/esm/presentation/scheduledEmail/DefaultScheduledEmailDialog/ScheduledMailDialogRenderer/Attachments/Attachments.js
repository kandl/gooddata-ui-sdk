// (C) 2019-2022 GoodData Corporation
import * as React from "react";
import { FormattedMessage } from "react-intl";
import identity from "lodash/identity.js";
import { objRefToString } from "@gooddata/sdk-model";
import { AttachmentsSelectionDropdown } from "./AttachmentsSelectionDropdown.js";
import { FormatOptionsDropdown } from "./FormatOptionsDropdown.js";
const AttachmentItem = ({ format, children }) => (React.createElement("div", { "aria-label": "dashboard-attachment", className: "gd-dashboard-attachment s-gd-dashboard-attachment" },
    React.createElement("span", { className: "gd-dashboard-attachment-format" }, format),
    React.createElement("span", { className: "gd-dashboard-attachment-name" }, children)));
export const Attachments = (props) => {
    const { dashboardTitle, dashboardSelected, widgetsSelected, insightWidgets = [], configuration, canExportTabular, onAttachmentsSelectionChanged, onAttachmentsConfigurationChanged, } = props;
    const isSomeWidgetSelected = Object.values(widgetsSelected).some(identity);
    const selectedWidgetsTitles = insightWidgets
        .filter((widget) => widgetsSelected[objRefToString(widget)])
        .map((widget) => widget.title);
    return (React.createElement("div", { className: "gd-input-component gd-schedule-email-attachments s-schedule-email-attachments" },
        React.createElement("label", { className: "gd-label" },
            React.createElement(FormattedMessage, { id: "dialogs.schedule.email.attachments.label" })),
        React.createElement("div", { className: "gd-dashboard-attachment-list" },
            React.createElement("div", { className: "gd-dashboard-attachment-list-content" },
                dashboardSelected ? (React.createElement(AttachmentItem, { format: "pdf" },
                    React.createElement("span", { className: "shortened-name" }, dashboardTitle))) : null,
                selectedWidgetsTitles.length !== 0 ? (React.createElement(AttachmentItem, { format: configuration.format },
                    React.createElement("span", { className: "shortened-name", title: selectedWidgetsTitles.join(",\n") }, selectedWidgetsTitles.join(", ")),
                    selectedWidgetsTitles.length > 1 ? (React.createElement("span", null, `(${selectedWidgetsTitles.length})`)) : null)) : null),
            canExportTabular ? (React.createElement("div", { className: "gd-schedule-email-dialog-attachments" },
                React.createElement(AttachmentsSelectionDropdown, { dashboardTitle: dashboardTitle, dashboardSelected: dashboardSelected, insightWidgets: insightWidgets, widgetsSelected: widgetsSelected, onApply: onAttachmentsSelectionChanged }),
                isSomeWidgetSelected ? (React.createElement(FormatOptionsDropdown, { format: configuration.format, mergeHeaders: configuration.mergeHeaders, includeFilters: configuration.includeFilters, onApply: onAttachmentsConfigurationChanged })) : null)) : null)));
};
//# sourceMappingURL=Attachments.js.map