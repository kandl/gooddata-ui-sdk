// (C) 2022 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
export const DashboardSidebar = (props) => {
    const { WrapCreatePanelItemWithDragComponent, WrapInsightListItemWithDragComponent, DeleteDropZoneComponent, } = props;
    const { SidebarComponent, KpiWidgetComponentSet, AttributeFilterComponentSet, InsightWidgetComponentSet, } = useDashboardComponentsContext();
    return (React.createElement(SidebarComponent, Object.assign({}, props, { KpiWidgetComponentSet: KpiWidgetComponentSet, AttributeFilterComponentSet: AttributeFilterComponentSet, InsightWidgetComponentSet: InsightWidgetComponentSet, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent, WrapInsightListItemWithDragComponent: WrapInsightListItemWithDragComponent, DeleteDropZoneComponent: DeleteDropZoneComponent })));
};
//# sourceMappingURL=DashboardSidebar.js.map