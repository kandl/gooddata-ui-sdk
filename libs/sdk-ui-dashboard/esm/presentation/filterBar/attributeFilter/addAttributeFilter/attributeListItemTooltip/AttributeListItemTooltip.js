// (C) 2023 GoodData Corporation
import React, { useState } from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { useAttributeDataSet } from "../../dashboardDropdownBody/configuration/hooks/useAttributeDataSet.js";
import { useAttributeElements } from "../../dashboardDropdownBody/configuration/hooks/useAttributeElements.js";
import { AttributeListItemTooltipContent } from "./AttributeListItemTooltipContent.js";
const ATTR_ELEMENTS_LIMIT = 5;
const bubbleAlignPoints = [
    { align: "tr tl", offset: { x: 0, y: -50 } },
    { align: "tl tr", offset: { x: -170, y: -80 } },
];
/**
 * @internal
 */
export const AttributeListItemTooltip = ({ item }) => {
    const [isHover, setIsHover] = useState(false);
    const { attributeElements, attributesElementsLoading } = useAttributeElements(item.defaultDisplayForm.ref, ATTR_ELEMENTS_LIMIT, isHover);
    const { attributeDataSet, attributesDataSetLoading } = useAttributeDataSet(item.attribute.ref, isHover);
    return (React.createElement("div", null,
        React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0, eventsOnBubble: true, className: "gd-attribute-item-tooltip-icon" },
            React.createElement("span", { onMouseEnter: () => setIsHover(true), className: "gd-icon-circle-question gd-list-item-tooltip-icon s-attribute-dropdown-list-item-tooltip" }),
            React.createElement(Bubble, { className: "gd-attribute-dropdown-list-item-details s-attribute-filter-details-bubble", alignPoints: bubbleAlignPoints, arrowStyle: { display: "none" } },
                React.createElement(AttributeListItemTooltipContent, { item: item, attributesDataSetLoading: attributesDataSetLoading, attributesElementsLoading: attributesElementsLoading, attributeDataSet: attributeDataSet, attributeElements: attributeElements })))));
};
//# sourceMappingURL=AttributeListItemTooltip.js.map