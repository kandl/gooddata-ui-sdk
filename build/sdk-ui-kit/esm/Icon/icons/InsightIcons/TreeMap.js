// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const TreeMap = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 26 26", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { fillOpacity: ".4", d: "M0 0h26v10H0z" }),
            React.createElement("path", { fillOpacity: ".6", d: "M0 12h15v14H0z" }),
            React.createElement("path", { d: "M17 12h9v14h-9z" }))));
};
//# sourceMappingURL=TreeMap.js.map