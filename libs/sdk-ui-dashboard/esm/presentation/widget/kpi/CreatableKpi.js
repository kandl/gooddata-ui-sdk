// (C) 2022 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
import { useDashboardSelector, selectHasCatalogMeasures, selectIsWhiteLabeled, } from "../../../model/index.js";
import { AddKpiWidgetButton, DraggableKpiCreatePanelItem } from "../../dragAndDrop/index.js";
const bubbleAlignPoints = [{ align: "cr cl", offset: { x: -20, y: 0 } }];
/**
 * @internal
 */
export const CreatableKpi = (props) => {
    const { WrapCreatePanelItemWithDragComponent } = props;
    const hasMeasures = useDashboardSelector(selectHasCatalogMeasures);
    const isWhiteLabeled = useDashboardSelector(selectIsWhiteLabeled);
    const disabled = !hasMeasures;
    const tooltip = disabled && (React.createElement("div", null,
        React.createElement(FormattedMessage, { id: "addPanel.kpi.tooltip.no_measures" }),
        "\u00A0",
        !isWhiteLabeled && (React.createElement("a", { href: "https://help.gooddata.com/pages/viewpage.action?pageId=86794662#DataCataloginAnalyticalDesigner-AdditemstoDataCatalog", rel: "noopener noreferrer", target: "_blank", className: "s-add-kpi-tooltip-link" },
            React.createElement(FormattedMessage, { id: "addPanel.kpi.tooltip.no_measures.link" })))));
    return (React.createElement(BubbleHoverTrigger, { eventsOnBubble: true, className: "s-add-kpi-bubble-trigger" },
        React.createElement(DraggableKpiCreatePanelItem, { CreatePanelItemComponent: AddKpiWidgetButton, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent, disabled: disabled }),
        tooltip ? React.createElement(Bubble, { alignPoints: bubbleAlignPoints }, tooltip) : null));
};
//# sourceMappingURL=CreatableKpi.js.map