// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DashboardLayoutSectionBorderMarker } from "./DashboardLayoutSectionBorderMarker.js";
export const DashboardLayoutSectionBorderLine = (props) => {
    const { position, status } = props;
    return (React.createElement("div", { className: cx("gd-fluidlayout-row-separator", "s-fluidlayout-row-separator", position, status) },
        React.createElement(DashboardLayoutSectionBorderMarker, { className: "gd-fluidlayout-row-separator-icon gd-fluidlayout-row-separator-icon-left", active: props.status === "active" }),
        React.createElement(DashboardLayoutSectionBorderMarker, { className: "gd-fluidlayout-row-separator-icon gd-fluidlayout-row-separator-icon-right", active: props.status === "active" })));
};
//# sourceMappingURL=DashboardLayoutSectionBorderLine.js.map