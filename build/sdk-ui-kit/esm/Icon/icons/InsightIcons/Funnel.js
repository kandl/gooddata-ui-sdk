// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Funnel = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { d: "M5.25002 15H14.75L16.85 9H3.15002L5.25002 15Z", fillOpacity: "0.6" }),
            React.createElement("path", { d: "M5.6001 16L7.0001 20H13.0001L14.4001 16H5.6001Z", fillOpacity: "0.4" }),
            React.createElement("path", { d: "M2.8 8H17.2L20 0H0L2.8 8Z" }))));
};
//# sourceMappingURL=Funnel.js.map