// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Table = ({ color, className, width, height }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 25 19", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { d: "M6 0h9v4H6zM16 0h9v4h-9z" }),
            React.createElement("path", { fillOpacity: ".45", d: "M6 5h9v4H6zM16 5h9v4h-9zM6 10h9v4H6zM16 10h9v4h-9zM6 15h9v4H6zM16 15h9v4h-9z" }),
            React.createElement("path", { d: "M0 0h5v4H0zM0 5h5v4H0zM0 10h5v4H0zM0 15h5v4H0z" }))));
};
//# sourceMappingURL=Table.js.map