// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const ScatterPlot = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "11 11 26 26", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { fillOpacity: ".45", d: "M11 11h2v26h-2zm2 24h24v2H13z" }),
            React.createElement("path", { d: "M16 21h6v6h-6zm9-10h6v6h-6zm6 16h6v6h-6z" }))));
};
//# sourceMappingURL=ScatterPlot.js.map