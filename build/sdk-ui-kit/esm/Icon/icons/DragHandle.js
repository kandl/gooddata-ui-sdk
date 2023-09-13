// (C) 2021 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const DragHandle = ({ className, color, width, height }) => {
    return (React.createElement("svg", { className: className, width: width !== null && width !== void 0 ? width : 16, height: height !== null && height !== void 0 ? height : 16, viewBox: "0 0 7 26", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M0 4h2v2H0V4zm0-4h2v2H0V0zm5 4h2v2H5V4zm0-4h2v2H5V0zm0 8h2v2H5V8zM0 8h2v2H0V8zm0 4h2v2H0v-2zm5 4h2v2H5v-2zm-5 0h2v2H0v-2zm5 4h2v2H5v-2zm-5 0h2v2H0v-2zm5 4h2v2H5v-2zm-5 0h2v2H0v-2zm5-12h2v2H5v-2z", fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" })));
};
//# sourceMappingURL=DragHandle.js.map