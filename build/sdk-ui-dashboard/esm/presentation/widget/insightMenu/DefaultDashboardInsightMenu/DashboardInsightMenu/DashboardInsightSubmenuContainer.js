// (C) 2021-2022 GoodData Corporation
import React from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import { DashboardInsightSubmenuHeader } from "./DashboardInsightSubmenuHeader.js";
const screenWrapperStyle = { width: "100%" };
export const DashboardInsightSubmenuContainer = (props) => {
    return (React.createElement("div", { className: "configuration-panel" },
        React.createElement("div", { className: "configuration-panel-header" },
            React.createElement(DashboardInsightSubmenuHeader, { title: props.title, onHeaderClick: props.onBack }),
            React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-icon-cross configuration-panel-header-close-button s-configuration-panel-header-close-button", onClick: props.onClose })),
        React.createElement("div", { className: "configuration-panel-screen", style: screenWrapperStyle }, props.children)));
};
//# sourceMappingURL=DashboardInsightSubmenuContainer.js.map