// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Bubble = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "11 11 26 26", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { d: "M11 11h2v26h-2zm2 24h24v2H13z", fillOpacity: ".45" }),
            React.createElement("circle", { cx: "23", cy: "16.5", r: "4.5" }),
            React.createElement("circle", { cx: "34", cy: "24", r: "3" }),
            React.createElement("circle", { cx: "19", cy: "30", r: "2" }))));
};
//# sourceMappingURL=Bubble.js.map