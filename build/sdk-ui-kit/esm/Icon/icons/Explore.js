// (C) 2021 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Explore = ({ color, className, width, height }) => {
    return (React.createElement("svg", { className: className, width: width !== null && width !== void 0 ? width : 16, height: height !== null && height !== void 0 ? height : 16, viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { stroke: color !== null && color !== void 0 ? color : "#B1BECA", fill: "none", fillRule: "evenodd" },
            React.createElement("path", { strokeWidth: "2", strokeLinecap: "square", d: "M10.5 10V6.667M4.5 10V7.75M7.5 10V3.7" }),
            React.createElement("circle", { cx: "7.5", cy: "7.5", r: "7" }),
            React.createElement("path", { strokeLinecap: "round", d: "M15.5 15.5l-3-3" }))));
};
//# sourceMappingURL=Explore.js.map