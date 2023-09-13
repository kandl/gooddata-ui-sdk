// (C) 2022-2023 GoodData Corporation
import cx from "classnames";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import React from "react";
const ARROW_OFFSETS = { "cr cl": [20, 0], "cl cr": [-10, 0] };
const ALIGN_POINTS = [{ align: "cr cl" }, { align: "cl cr" }];
export const SelectionModeItem = (props) => {
    const { item, itemTitle, selected, disabled, disabledTooltip, onClick } = props;
    const className = cx("gd-list-item", {
        "is-selected": selected,
    }, {
        "is-disabled": disabled,
    }, "s-selection-mode-dropdown-item", `s-selection-mode-dropdown-item-${item}`);
    return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
        React.createElement("div", { className: className, onClick: () => !disabled && onClick() }, itemTitle),
        Boolean(disabled) && (React.createElement(Bubble, { arrowOffsets: ARROW_OFFSETS, alignPoints: ALIGN_POINTS },
            React.createElement("div", null, disabledTooltip)))));
};
//# sourceMappingURL=SelectionModeItem.js.map