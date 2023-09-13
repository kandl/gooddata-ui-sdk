import { __rest } from "tslib";
// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
export const ListItemTooltip = (_a) => {
    var { children, className, bubbleAlignPoints } = _a, restProps = __rest(_a, ["children", "className", "bubbleAlignPoints"]);
    return (React.createElement("span", Object.assign({ className: cx("gd-list-item-tooltip", className) }, restProps),
        React.createElement(BubbleHoverTrigger, null,
            React.createElement("span", { className: "gd-icon-circle-question gd-list-item-tooltip-icon" }),
            React.createElement(Bubble, { alignPoints: bubbleAlignPoints }, children))));
};
//# sourceMappingURL=ListItemTooltip.js.map