// (C) 2021-2022 GoodData Corporation
import React from "react";
import { Button, ItemsWrapper } from "@gooddata/sdk-ui-kit";
import { DashboardInsightMenuTitle } from "../../DashboardInsightMenuTitle.js";
const itemsWrapperStyle = { width: "100%" };
export const DashboardInsightMenuContainer = (props) => {
    return (React.createElement("div", { className: "insight-configuration" },
        React.createElement("div", { className: "insight-configuration-panel-header" },
            React.createElement(DashboardInsightMenuTitle, { widget: props.widget, insight: props.insight, renderMode: props.renderMode }),
            React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-icon-cross configuration-panel-header-close-button s-configuration-panel-header-close-button", onClick: props.onClose })),
        React.createElement(ItemsWrapper, { smallItemsSpacing: true, style: itemsWrapperStyle }, props.children)));
};
//# sourceMappingURL=DashboardInsightMenuContainer.js.map