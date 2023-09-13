// (C) 2023 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
const bubbleAlignPoints = [{ align: "bc tc" }];
/**
 * Tooltip details for the AttributeFilterDropdownButton.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton tooltip details in the GoodData look and feel.
 * It displays the default title, custom title and data set title of the related attribute filter.
 *
 * @beta
 */
export const AttributeFilterButtonErrorTooltip = ({ children, errorMessage }) => {
    return errorMessage ? (React.createElement("div", { className: "gd-attribute-filter-button-wrapper" },
        React.createElement(BubbleHoverTrigger, null,
            children,
            React.createElement(Bubble, { className: "bubble-negative gd-attribute-filter-button-error s-attribute-filter-error-bubble", alignPoints: bubbleAlignPoints },
                React.createElement("span", null,
                    React.createElement(FormattedMessage, { id: "gs.filter.error.tooltip" })))))) : (React.createElement(React.Fragment, null, children));
};
//# sourceMappingURL=AttributeFilterButtonErrorTooltip.js.map