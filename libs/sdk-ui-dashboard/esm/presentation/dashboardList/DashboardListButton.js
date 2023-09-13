// (C) 2021-2022 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger, DropdownButton } from "@gooddata/sdk-ui-kit";
import { getTooltip } from "./DashboardListItem.js";
import { useIntl } from "react-intl";
const tooltipAlignPoints = [
    { align: "cl cr", offset: { x: 0, y: -2 } },
    { align: "cr cl", offset: { x: 0, y: 10 } },
];
const Button = (props) => {
    const { accessibilityLimitation, toggleDropdown, isOpen, label } = props;
    const icon = accessibilityLimitation === undefined ? undefined : "gd-icon-circle-exclamation";
    return (React.createElement(DropdownButton, { className: "dashboard-dropdown-button s-dashboards-dropdown-button", value: label, isOpen: isOpen, onClick: toggleDropdown, iconLeft: icon }));
};
export const DashboardListButton = (props) => {
    const { accessibilityLimitation } = props;
    const intl = useIntl();
    const tooltip = getTooltip(intl, accessibilityLimitation);
    if (!tooltip) {
        return React.createElement(Button, Object.assign({}, props));
    }
    return (React.createElement(BubbleHoverTrigger, { tagName: "div", showDelay: 200, hideDelay: 0 },
        React.createElement(Button, Object.assign({}, props)),
        React.createElement(Bubble, { className: "bubble-primary", alignPoints: tooltipAlignPoints, arrowOffsets: { "cr cl": [15, 0] } }, tooltip)));
};
//# sourceMappingURL=DashboardListButton.js.map