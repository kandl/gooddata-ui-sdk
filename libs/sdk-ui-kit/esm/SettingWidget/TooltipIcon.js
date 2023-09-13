// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
import { ALIGN_POINTS, ARROW_OFFSETS } from "./constants.js";
/**
 * @internal
 */
export const TooltipIcon = (props) => {
    const { text, iconClass, arrowOffsets = ARROW_OFFSETS, alignPoints = ALIGN_POINTS } = props;
    return (React.createElement("span", null,
        React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
            React.createElement("span", { className: cx("gd-tooltip-icon", iconClass) }),
            React.createElement(Bubble, { arrowOffsets: arrowOffsets, alignPoints: alignPoints }, text))));
};
//# sourceMappingURL=TooltipIcon.js.map