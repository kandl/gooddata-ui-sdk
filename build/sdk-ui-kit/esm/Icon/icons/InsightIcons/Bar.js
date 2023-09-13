// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Bar = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 22 21", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { d: "M0 0h22v5H0zM0 8h15v5H0zM0 16h7v5H0z" }))));
};
//# sourceMappingURL=Bar.js.map