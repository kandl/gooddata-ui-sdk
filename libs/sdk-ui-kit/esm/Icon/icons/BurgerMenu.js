// (C) 2021 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const BurgerMenu = ({ color, className, width, height }) => {
    return (React.createElement("svg", { className: className, width: width !== null && width !== void 0 ? width : 16, height: height !== null && height !== void 0 ? height : 16, viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { transform: "translate(4 3)" },
            React.createElement("path", { d: "M0 0h8v2H0V0zm0 4h8v2H0V4zm0 4h8v2H0V8z", fill: color !== null && color !== void 0 ? color : "currentColor" }))));
};
//# sourceMappingURL=BurgerMenu.js.map