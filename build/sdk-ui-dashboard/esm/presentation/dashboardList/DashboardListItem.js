// (C) 2021-2022 GoodData Corporation
import React from "react";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
import { useIntl } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
const tooltipAlignPoints = [
    { align: "cl cr", offset: { x: 0, y: -2 } },
    { align: "cr cl", offset: { x: 0, y: 10 } },
];
export const getTooltip = (intl, accessibilityLimitation) => {
    switch (accessibilityLimitation) {
        case "forbidden":
            return intl.formatMessage({ id: "configurationPanel.drillConfig.forbiddenDashboard.tooltip" });
        case "notShared":
            return intl.formatMessage({ id: "configurationPanel.drillConfig.notSharedDashboard.tooltip" });
        default:
            return undefined;
    }
};
const DropdownItem = (props) => {
    const { onClick, accessibilityLimitation, title, isSelected = false } = props;
    const icon = accessibilityLimitation === undefined ? undefined : "gd-icon-circle-exclamation";
    const generatedTestClass = `s-dashboard-item s-${stringUtils.simplifyText(title)}`;
    const classNames = cx("gd-list-item gd-drill-dashboard-item", generatedTestClass, {
        "is-selected": isSelected,
    });
    return (React.createElement("div", { className: classNames, onClick: onClick, title: title },
        icon ? React.createElement("span", { className: cx("gd-list-icon", icon) }) : null,
        React.createElement("span", null, title)));
};
export const DashboardListItem = (props) => {
    const { accessibilityLimitation } = props;
    const intl = useIntl();
    const tooltip = getTooltip(intl, accessibilityLimitation);
    if (!tooltip) {
        return React.createElement(DropdownItem, Object.assign({}, props));
    }
    return (React.createElement(BubbleHoverTrigger, { tagName: "div", showDelay: 200, hideDelay: 0 },
        React.createElement(DropdownItem, Object.assign({}, props)),
        React.createElement(Bubble, { className: "bubble-primary", alignPoints: tooltipAlignPoints }, tooltip)));
};
//# sourceMappingURL=DashboardListItem.js.map