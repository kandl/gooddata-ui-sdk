// (C) 2022 GoodData Corporation
import * as React from "react";
import { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import identity from "lodash/identity.js";
import { Icon, InsightIcon, Typography } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { objRefToString } from "@gooddata/sdk-model";
import { ScheduleDropdown } from "./ScheduleDropdown.js";
export const AttachmentsSelectionDropdown = (props) => {
    var _a, _b;
    const { dashboardTitle, insightWidgets = [], onApply } = props;
    const intl = useIntl();
    const theme = useTheme();
    const ICON_COLOR = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c5;
    const ICON_SIZE_BUTTON = 18;
    const ICON_PROPS = { color: ICON_COLOR, height: 19, width: 26 };
    const [dashboardSelected, setDashboardSelected] = useState(props.dashboardSelected);
    const [widgetsSelected, setWidgetsSelected] = useState(props.widgetsSelected);
    const handleWidgetSelectedChange = useCallback((widgetRef) => {
        const widgetRefKey = objRefToString(widgetRef);
        setWidgetsSelected(Object.assign(Object.assign({}, widgetsSelected), { [widgetRefKey]: !widgetsSelected[widgetRefKey] }));
    }, [widgetsSelected]);
    const handleOnApply = useCallback(() => {
        onApply(dashboardSelected, widgetsSelected);
    }, [onApply, dashboardSelected, widgetsSelected]);
    const handleOnCancel = useCallback(() => {
        setDashboardSelected(props.dashboardSelected);
        setWidgetsSelected(props.widgetsSelected);
    }, [props.dashboardSelected, props.widgetsSelected]);
    const canApply = (dashboardSelected || Object.values(widgetsSelected).some(identity)) &&
        (dashboardSelected != props.dashboardSelected ||
            JSON.stringify(widgetsSelected) !== JSON.stringify(props.widgetsSelected));
    return (React.createElement(ScheduleDropdown, { title: intl.formatMessage({ id: "dialogs.schedule.email.attachment.select" }), applyDisabled: !canApply, onApply: handleOnApply, onCancel: handleOnCancel, buttonClassName: "s-schedule-select-attachments-button", bodyClassName: "s-schedule-select-attachments-body", buttonDisabled: insightWidgets.length === 0, iconComponent: React.createElement(Icon.AttachmentClip, { color: ICON_COLOR, width: ICON_SIZE_BUTTON, height: ICON_SIZE_BUTTON }), contentComponent: React.createElement("div", { className: "gd-attachments-selection-dropdown" },
            React.createElement(Typography, { tagName: "h3" },
                React.createElement(FormattedMessage, { id: "dialogs.schedule.email.attachment.select.dashboard.header" })),
            React.createElement("div", null,
                React.createElement("label", { className: "input-checkbox-label s-schedule-dashboard-attachment-label" },
                    React.createElement("input", { type: "checkbox", className: "input-checkbox", checked: dashboardSelected, onChange: (event) => setDashboardSelected(event.target.checked) }),
                    React.createElement(Icon.Dashboard, Object.assign({}, ICON_PROPS)),
                    React.createElement("span", { title: dashboardTitle, className: "input-label-text" }, dashboardTitle))),
            React.createElement(Typography, { tagName: "h3" },
                React.createElement(FormattedMessage, { id: "dialogs.schedule.email.attachment.select.widgets.header" })),
            insightWidgets.map((widget) => (React.createElement("div", { key: objRefToString(widget) },
                React.createElement("label", { className: "input-checkbox-label s-schedule-widget-attachment-label" },
                    React.createElement("input", { type: "checkbox", className: "input-checkbox", checked: widgetsSelected[objRefToString(widget)], onChange: () => handleWidgetSelectedChange(widget) }),
                    React.createElement(InsightIcon, { visualizationUrl: widget.visualizationUrl, iconProps: ICON_PROPS }),
                    React.createElement("span", { title: widget.title, className: "input-label-text" }, widget.title)))))) }));
};
//# sourceMappingURL=AttachmentsSelectionDropdown.js.map