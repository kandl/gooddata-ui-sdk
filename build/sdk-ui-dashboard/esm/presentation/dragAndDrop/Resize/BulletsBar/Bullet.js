// (C) 2019-2022 GoodData Corporation
import React from "react";
import classnames from "classnames";
export function Bullet({ isCurrent, isInitial, index }) {
    const bulletStyle = "gd-resize-bullet s-resize-bullet-" + index;
    return (React.createElement("div", { className: bulletStyle },
        React.createElement("svg", { className: "gd-resize-bullet-icon" },
            React.createElement("circle", { cx: "3", cy: "3", r: "3", className: classnames({
                    active: isCurrent,
                    initial: isInitial,
                    passive: !isCurrent && !isInitial,
                }) }))));
}
//# sourceMappingURL=Bullet.js.map