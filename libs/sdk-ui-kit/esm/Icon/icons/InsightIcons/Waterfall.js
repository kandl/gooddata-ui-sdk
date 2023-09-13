// (C) 2023 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Waterfall = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("rect", { y: "9", width: "3.00022", height: "6.00044", fill: color !== null && color !== void 0 ? color : "#B0BECA" }),
        React.createElement("rect", { x: "4", y: "5", width: "3", height: "4", fill: color !== null && color !== void 0 ? color : "#B0BECA" }),
        React.createElement("rect", { x: "8", width: "3", height: "5", fill: color !== null && color !== void 0 ? color : "#B0BECA" }),
        React.createElement("rect", { x: "12", width: "3", height: "15", fill: color !== null && color !== void 0 ? color : "#B0BECA" })));
};
//# sourceMappingURL=Waterfall.js.map