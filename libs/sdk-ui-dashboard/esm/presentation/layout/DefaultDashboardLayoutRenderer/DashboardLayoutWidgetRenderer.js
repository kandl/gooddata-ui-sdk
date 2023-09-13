// (C) 2007-2022 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
export function DashboardLayoutWidgetRenderer(props) {
    const { item, screen, debug, className, contentRef, isResizedByLayoutSizingStrategy, minHeight, height, allowOverflow, children, } = props;
    const { heightAsRatio, gridHeight } = item.size()[screen];
    const style = useMemo(() => {
        const computedStyle = {
            minHeight,
            height,
        };
        if (allowOverflow) {
            computedStyle.overflowX = "hidden";
            computedStyle.overflowY = "auto";
        }
        if (debug) {
            if (!heightAsRatio) {
                computedStyle.outline = "solid 1px yellow";
            }
            else {
                computedStyle.border = isResizedByLayoutSizingStrategy
                    ? "dashed 1px #d6d6d6"
                    : "solid 1px green";
            }
        }
        return computedStyle;
    }, [minHeight, height, allowOverflow, debug, heightAsRatio, isResizedByLayoutSizingStrategy]);
    return (React.createElement("div", { ref: contentRef, className: cx("gd-fluidlayout-column-container", className, {
            "custom-height": !!gridHeight,
        }), style: style }, children));
}
//# sourceMappingURL=DashboardLayoutWidgetRenderer.js.map