// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { useRightInScrollable } from "./hooks/useRightInScrollable.js";
import { useScrollEvent } from "./hooks/useScrollEvent.js";
import { useGradientColor } from "./hooks/useGradientColor.js";
/**
 * @internal
 */
export const ScrollGradient = ({ backgroundColor = "#FFFFFF", size = 20, className, contentClassName, onScroll, children, }) => {
    const { right, content, setContent } = useRightInScrollable();
    const { top, bottom, onScrollHandler } = useScrollEvent(content, size / 2, onScroll);
    const { topBackground, bottomBackground } = useGradientColor(backgroundColor);
    return (React.createElement("div", { className: cx("gd-gradient-wrapper", className) },
        React.createElement("div", { className: cx("gd-gradient-top"), style: { right, opacity: top, height: size, background: topBackground } }),
        React.createElement("div", { className: cx("gd-gradient-content", contentClassName), onScroll: onScrollHandler, ref: setContent }, children),
        React.createElement("div", { className: cx("gd-gradient-bottom"), style: { right, opacity: bottom, height: size, background: bottomBackground } })));
};
//# sourceMappingURL=ScrollGradient.js.map