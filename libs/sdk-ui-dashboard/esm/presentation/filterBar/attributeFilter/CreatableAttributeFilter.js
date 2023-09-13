// (C) 2007-2022 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
import { DraggableAttributeFilterCreatePanelItem } from "../../dragAndDrop/index.js";
import { AddAttributeFilterPlaceholder } from "./addAttributeFilter/index.js";
import { useDashboardSelector, selectHasCatalogAttributes, selectIsWhiteLabeled, selectCanAddMoreAttributeFilters, } from "../../../model/index.js";
/**
 * @internal
 */
export function CreatableAttributeFilter(props) {
    const { WrapCreatePanelItemWithDragComponent } = props;
    const hasAttributes = useDashboardSelector(selectHasCatalogAttributes);
    const canAddMoreAttributeFilters = useDashboardSelector(selectCanAddMoreAttributeFilters);
    const isWhiteLabeled = useDashboardSelector(selectIsWhiteLabeled);
    const disabled = !hasAttributes || !canAddMoreAttributeFilters;
    const tooltip = disabled && !hasAttributes ? (React.createElement("div", null,
        React.createElement(FormattedMessage, { id: "addPanel.attributeFilter.tooltip.no_attributes" }),
        "\u00A0",
        !isWhiteLabeled ? (React.createElement("a", { href: "https://help.gooddata.com/display/doc/Attributes+in+Logical+Data+Models", rel: "noopener noreferrer", target: "_blank", className: "s-add-attribute-filter-tooltip-link" },
            React.createElement(FormattedMessage, { id: "addPanel.attributeFilter.tooltip.no_attributes.link" }))) : null)) : undefined;
    return (React.createElement(BubbleHoverTrigger, { eventsOnBubble: true, className: "s-add-attribute-filter-bubble-trigger" },
        React.createElement(DraggableAttributeFilterCreatePanelItem, { CreatePanelItemComponent: AddAttributeFilterPlaceholder, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent, disabled: disabled }),
        tooltip ? (React.createElement(Bubble, { alignPoints: [{ align: "cr cl", offset: { x: -20, y: 0 } }] }, tooltip)) : null));
}
//# sourceMappingURL=CreatableAttributeFilter.js.map