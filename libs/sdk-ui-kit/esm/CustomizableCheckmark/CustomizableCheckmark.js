// (C) 2020 GoodData Corporation
import React from "react";
import { GD_COLOR_HIGHLIGHT } from "../utils/constants.js";
/**
 * @internal
 */
export const CustomizableCheckmark = ({ className, width, height, }) => {
    const backgroundColor = `var(--gd-palette-primary-base, ${GD_COLOR_HIGHLIGHT})`;
    return (React.createElement("svg", { width: width, height: height, xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", className: `gd-customizable-checkmark ${className}` },
        React.createElement("g", { fill: "none" },
            React.createElement("g", { transform: "translate(-294.000000, -314.000000)", fill: "#14b2e2" },
                React.createElement("g", { transform: "translate(0.000000, 234.000000)" },
                    React.createElement("path", { d: "M298.166667,89.75 L294,85.6875 L295.666667,84.0625 L298.166667,86.5 L304.833333,80 L306.5,81.625 L298.166667,89.75 Z", fill: backgroundColor }))))));
};
CustomizableCheckmark.defaultProps = {
    width: 13,
    height: 10,
};
//# sourceMappingURL=CustomizableCheckmark.js.map