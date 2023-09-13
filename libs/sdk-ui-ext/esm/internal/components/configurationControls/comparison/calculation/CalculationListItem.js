// (C) 2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
import CalculationListItemInfo from "./CalculationListItemInfo.js";
import { HIDE_DELAY_DEFAULT, SHOW_DELAY_DEFAULT } from "../../../../constants/bubble.js";
const BUBBLE_INFO_ALIGN_POINTS = [{ align: "cr cl" }];
const BUBBLE_INFO_ARROW_OFFSETS = { "cr cl": [15, 0] };
const CalculationListItem = ({ title, icon, info, isSelected, onClick, }) => {
    const classNames = cx(["gd-list-item", "calculation-list-item", "s-calculation-list-item", `s-${title}`], {
        "is-selected": isSelected,
    });
    return (React.createElement("div", { className: classNames, onClick: onClick },
        React.createElement("span", { role: "icon", className: `gd-list-icon ${icon}` }),
        React.createElement("span", null, title),
        React.createElement("div", { role: "item-info", className: "gd-list-item-bubble s-list-item-info" },
            React.createElement(BubbleHoverTrigger, { tagName: "div", showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
                React.createElement("div", { className: "inlineBubbleHelp" }),
                React.createElement(Bubble, { className: "bubble-light adi-arithmetic-measure-operand-bubble calculation-list-item-bubble s-calculation-list-item-bubble", alignPoints: BUBBLE_INFO_ALIGN_POINTS, arrowOffsets: BUBBLE_INFO_ARROW_OFFSETS },
                    React.createElement(CalculationListItemInfo, { title: title, calculationType: info }))))));
};
export default CalculationListItem;
//# sourceMappingURL=CalculationListItem.js.map