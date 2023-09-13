// (C) 2019-2022 GoodData Corporation
import React from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
import { DashboardLayoutSectionHeaderDescription } from "./DashboardLayoutSectionHeaderDescription.js";
export const DashboardLayoutSectionHeader = (props) => {
    const { title, description, renderBeforeHeader, renderHeader } = props;
    return (React.createElement("div", { className: "gd-fluid-layout-row-header s-fluid-layout-row-header" },
        renderBeforeHeader,
        React.createElement("div", { className: "gd-fluid-layout-row-header-container" }, renderHeader !== null && renderHeader !== void 0 ? renderHeader : (React.createElement("div", { className: "gd-row-header-view" },
            title ? (React.createElement("div", { className: "gd-row-header-title-wrapper" },
                React.createElement("span", { className: "title" },
                    React.createElement(Typography, { tagName: "h2", className: "s-fluid-layout-row-title" }, title)))) : null,
            description ? (React.createElement(DashboardLayoutSectionHeaderDescription, { description: description })) : null)))));
};
//# sourceMappingURL=DashboardLayoutSectionHeader.js.map