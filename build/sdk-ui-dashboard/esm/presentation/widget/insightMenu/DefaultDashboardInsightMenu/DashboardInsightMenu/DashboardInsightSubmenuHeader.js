// (C) 2022 GoodData Corporation
import React from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
export const DashboardInsightSubmenuHeader = ({ title, onHeaderClick, }) => {
    return (React.createElement(Typography, { tagName: "h3", className: "configuration-panel-header-title clickable", onClick: onHeaderClick },
        React.createElement("i", { className: "gd-icon-navigateleft" }),
        title));
};
//# sourceMappingURL=DashboardInsightSubmenuHeader.js.map