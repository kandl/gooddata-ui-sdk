// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
const BUBBLE_OFFSET_X = 16;
export const AllRecordsItem = ({ isSelected, onSelect }) => {
    const className = cx("gd-list-item", "gd-list-item-shortened", {
        "is-selected": isSelected,
    }, "gd-button-link", "s-rf-attribute-all-records");
    return (React.createElement("button", { className: className, onClick: () => onSelect() },
        React.createElement(FormattedMessage, { id: "rankingFilter.allRecords" }),
        React.createElement("div", null,
            React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
                React.createElement("span", { className: "gd-icon-circle-question gd-rf-attribute-all-records-icon s-rf-attribute-all-records-icon" }),
                React.createElement(Bubble, { className: `bubble-primary gd-rf-tooltip-bubble s-rf-attribute-all-records-bubble`, arrowOffsets: { "cr cl": [BUBBLE_OFFSET_X, 0], "cl cr": [-BUBBLE_OFFSET_X, 0] }, alignPoints: [{ align: "cr cl" }, { align: "cl cr" }] },
                    React.createElement(FormattedMessage, { id: "rankingFilter.allRecords.tooltip" }))))));
};
//# sourceMappingURL=AllRecordsItem.js.map