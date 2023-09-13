// (C) 2023 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Columns = ({ colorPalette, className, width, height }) => {
    var _a, _b;
    const normalColumn = (_a = colorPalette === null || colorPalette === void 0 ? void 0 : colorPalette.normalColumn) !== null && _a !== void 0 ? _a : "#CCD8E2";
    const totalColumn = (_b = colorPalette === null || colorPalette === void 0 ? void 0 : colorPalette.totalColumn) !== null && _b !== void 0 ? _b : "#94A1AD";
    return (React.createElement("svg", { className: className, width: width !== null && width !== void 0 ? width : 16, height: height !== null && height !== void 0 ? height : 16, viewBox: "0 0 13 13", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { clipPath: "url(#clip0_405_2499)" },
            React.createElement("path", { d: "M1 13L1 1.03318e-07L3 0L3 13H1Z", fill: normalColumn }),
            React.createElement("path", { d: "M5 13L5 1.03318e-07L7 0L7 13H5Z", fill: normalColumn }),
            React.createElement("rect", { x: "9", y: "13", width: "13", height: "2", transform: "rotate(-90 9 13)", fill: totalColumn })),
        React.createElement("defs", null,
            React.createElement("clipPath", { id: "clip0_405_2499" },
                React.createElement("rect", { width: "13", height: "13", fill: "white", transform: "translate(0 13) rotate(-90)" })))));
};
//# sourceMappingURL=Columns.js.map