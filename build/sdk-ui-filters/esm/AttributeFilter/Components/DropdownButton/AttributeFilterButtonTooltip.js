// (C) 2023 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
const bubbleAlignPoints = [{ align: "cr cl", offset: { x: 0, y: 50 } }];
/**
 * Tooltip details for the AttributeFilterDropdownButton.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton tooltip details in the GoodData look and feel.
 * It displays the default title, custom title and data set title of the related attribute filter.
 *
 * @beta
 */
export const AttributeFilterButtonToolip = ({ children }) => {
    return (React.createElement("span", { className: "gd-list-item-tooltip" },
        React.createElement(BubbleHoverTrigger, null,
            React.createElement("span", { className: "gd-icon-circle-question gd-list-item-tooltip-icon s-attribute-filter-tooltip-icon" }),
            React.createElement(Bubble, { className: "gd-attribute-filter-details s-attribute-filter-details-bubble", alignPoints: bubbleAlignPoints, arrowStyle: { display: "none" } }, children))));
};
//# sourceMappingURL=AttributeFilterButtonTooltip.js.map