// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const HeatMap = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "11 11 26 26", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { fillOpacity: ".6", d: "M29 11h8v3h-8z" }),
            React.createElement("path", { d: "M20 11h8v3h-8z" }),
            React.createElement("path", { fillOpacity: ".6", d: "M11 11h8v3h-8z" }),
            React.createElement("path", { fillOpacity: ".4", d: "M20 15h8v3h-8z" }),
            React.createElement("path", { d: "M29 15h8v3h-8z" }),
            React.createElement("path", { fillOpacity: ".6", d: "M11 15h8v3h-8z" }),
            React.createElement("path", { d: "M20 19h8v3h-8zm9 0h8v3h-8z" }),
            React.createElement("path", { fillOpacity: ".4", d: "M11 19h8v3h-8z" }),
            React.createElement("path", { d: "M20 23h8v3h-8z" }),
            React.createElement("path", { fillOpacity: ".4", d: "M29 23h8v3h-8zm-18 0h8v3h-8z" }),
            React.createElement("path", { d: "M20 27h8v3h-8zm9 0h8v3h-8z" }),
            React.createElement("path", { fillOpacity: ".4", d: "M11 27h8v3h-8zm9 4h8v3h-8z" }),
            React.createElement("path", { d: "M20 35h8v2h-8z" }),
            React.createElement("path", { fillOpacity: ".4", d: "M29 31h8v3h-8zm0 4h8v2h-8z" }),
            React.createElement("path", { fillOpacity: ".6", d: "M11 31h8v3h-8zm0 4h8v2h-8z" }))));
};
//# sourceMappingURL=HeatMap.js.map