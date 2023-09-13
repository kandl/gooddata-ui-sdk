// (C) 2022 GoodData Corporation
import * as React from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger, Dropdown, Button } from "@gooddata/sdk-ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { DEFAULT_DROPDOWN_ALIGN_POINTS, DEFAULT_DROPDOWN_ZINDEX } from "../../constants.js";
const ALIGN_POINTS = [
    { align: "bc tc", offset: { x: 0, y: 0 } },
    { align: "tc bc", offset: { x: 0, y: 0 } },
];
export const ScheduleDropdown = (props) => {
    const { title, applyDisabled, onApply, onCancel, iconComponent, contentComponent, buttonClassName, bodyClassName, buttonDisabled, } = props;
    const intl = useIntl();
    const renderBody = (closeDropdown) => {
        return (React.createElement("div", { className: "gd-dropdown overlay" },
            React.createElement("div", { className: cx("gd-schedule-dropdown-body", bodyClassName) },
                renderBodyHeader(),
                renderBodyContentWrapper(),
                renderBodyFooter(closeDropdown))));
    };
    const renderBodyHeader = () => {
        return (React.createElement("div", { className: "gd-schedule-dropdown-header" },
            React.createElement("span", null, title)));
    };
    const renderBodyContentWrapper = () => {
        return React.createElement("div", { className: "gd-schedule-dropdown-content" }, contentComponent);
    };
    const renderBodyFooter = (closeDropdown) => {
        const cancelText = intl.formatMessage({ id: "gs.list.cancel" });
        const applyText = intl.formatMessage({ id: "gs.list.apply" });
        return (React.createElement("div", { className: "gd-schedule-dropdown-footer" },
            React.createElement(Button, { className: "gd-button-secondary gd-button-small", value: cancelText, onClick: () => {
                    onCancel === null || onCancel === void 0 ? void 0 : onCancel();
                    closeDropdown();
                } }),
            React.createElement(Button, { className: "gd-button-action gd-button-small", disabled: applyDisabled, value: applyText, onClick: () => {
                    onApply === null || onApply === void 0 ? void 0 : onApply();
                    closeDropdown();
                } })));
    };
    return (React.createElement(Dropdown, { overlayPositionType: "sameAsTarget", alignPoints: DEFAULT_DROPDOWN_ALIGN_POINTS, overlayZIndex: DEFAULT_DROPDOWN_ZINDEX, ignoreClicksOnByClass: [".schedule-dropdown-ignore-click"], renderButton: ({ toggleDropdown }) => (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
            React.createElement("a", { className: cx("gd-schedule-dropdown-button", buttonClassName, {
                    "gd-schedule-dropdown-button-disabled": !!buttonDisabled,
                }), target: "_blank", rel: "noopener noreferrer", onClick: () => {
                    !buttonDisabled && toggleDropdown();
                } },
                iconComponent ? (React.createElement("div", { className: "gd-schedule-dropdown-button-icon" }, iconComponent)) : null,
                title),
            buttonDisabled ? (React.createElement(Bubble, { className: "bubble-primary", alignPoints: ALIGN_POINTS },
                React.createElement(FormattedMessage, { id: "dialogs.schedule.email.attachment.select.disabled.message" }))) : null)), renderBody: ({ closeDropdown }) => renderBody(closeDropdown) }));
};
//# sourceMappingURL=ScheduleDropdown.js.map