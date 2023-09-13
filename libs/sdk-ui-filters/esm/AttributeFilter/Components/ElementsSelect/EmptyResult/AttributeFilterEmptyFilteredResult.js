// (C) 2021-2022 GoodData Corporation
import React from "react";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
const ALIGN_POINTS = [{ align: "cr cl" }];
const ARROW_OFFSETS = { "cr cl": [10, 0] };
/**
 * Component that display message that all elements are filtered out by parent filers.
 * @beta
 */
export const AttributeFilterAllValuesFilteredResult = (props) => {
    const { parentFilterTitles } = props;
    return (React.createElement("div", { className: "gd-attribute-filter-empty-filtered-result__next s-attribute-filter-dropdown-all-items-filtered" },
        React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
            React.createElement("div", { className: "gd-filtered-message__next" },
                React.createElement(FormattedMessage, { id: "attributesDropdown.allItemsFiltered" }),
                React.createElement("span", { className: "gd-icon-circle-question" })),
            React.createElement(Bubble, { className: `bubble-primary gd-attribute-filter-dropdown-bubble__next s-attribute-filter-dropdown-bubble`, alignPoints: ALIGN_POINTS, arrowOffsets: ARROW_OFFSETS },
                React.createElement(FormattedMessage, { id: "attributesDropdown.itemsFiltered.tooltip", values: {
                        filters: parentFilterTitles.join(", "),
                        strong: (chunks) => React.createElement("strong", null, chunks),
                    } })))));
};
//# sourceMappingURL=AttributeFilterEmptyFilteredResult.js.map