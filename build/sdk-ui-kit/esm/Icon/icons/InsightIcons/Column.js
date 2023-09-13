// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Column = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 24 19", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { d: "M0 13h6v6H0zM9 0h6v19H9zM18 15h6v4h-6z" }))));
};
//# sourceMappingURL=Column.js.map