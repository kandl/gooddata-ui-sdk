// (C) 2021-2022 GoodData Corporation
import React, { useMemo } from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
const ALIGN_POINTS = [{ align: "cr cl" }];
const ARROW_OFFSETS = { "cr cl": [10, 0] };
/**
 * It displays list of parent filters
 * @beta
 */
export const AttributeFilterFilteredStatus = (props) => {
    const { parentFilterTitles } = props;
    const tooltipText = useMemo(() => {
        return parentFilterTitles ? parentFilterTitles.join(", ") : "";
    }, [parentFilterTitles]);
    return (React.createElement("div", { className: "gd-attribute-filter-filtered-status__next s-attribute-filter-dropdown-items-filtered" },
        React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
            React.createElement("div", { className: "gd-filtered-message__next" },
                "\u00A0",
                React.createElement(FormattedMessage, { id: "attributesDropdown.itemsFiltered" }),
                React.createElement("span", { className: "gd-icon-circle-question" })),
            React.createElement(Bubble, { className: `bubble-primary gd-attribute-filter-dropdown-bubble__next s-attribute-filter-dropdown-bubble`, alignPoints: ALIGN_POINTS, arrowOffsets: ARROW_OFFSETS },
                React.createElement(FormattedMessage, { id: "attributesDropdown.itemsFiltered.tooltip", values: {
                        filters: tooltipText,
                        strong: (chunks) => React.createElement("strong", null, chunks),
                    } })))));
};
//# sourceMappingURL=AttributeFilterFilteredStatus.js.map