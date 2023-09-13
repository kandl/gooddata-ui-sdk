// (C) 2022 GoodData Corporation
import React from "react";
import { useWidgetSelection } from "../../../model/index.js";
import { CreationPanel } from "./CreationPanel.js";
/**
 * @internal
 */
export const SidebarConfigurationPanel = (props) => {
    const { configurationPanelClassName, WrapCreatePanelItemWithDragComponent, WrapInsightListItemWithDragComponent, KpiWidgetComponentSet, AttributeFilterComponentSet, InsightWidgetComponentSet, } = props;
    const { deselectWidgets } = useWidgetSelection();
    const DeleteDropZoneComponent = props.DeleteDropZoneComponent;
    return (React.createElement("div", { className: "col gd-flex-item gd-sidebar-container", onClick: deselectWidgets },
        React.createElement("div", { className: "flex-panel-full-height" },
            React.createElement(CreationPanel, { className: configurationPanelClassName, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent, WrapInsightListItemWithDragComponent: WrapInsightListItemWithDragComponent, KpiWidgetComponentSet: KpiWidgetComponentSet, AttributeFilterComponentSet: AttributeFilterComponentSet, InsightWidgetComponentSet: InsightWidgetComponentSet })),
        React.createElement(DeleteDropZoneComponent, null)));
};
//# sourceMappingURL=SidebarConfigurationPanel.js.map