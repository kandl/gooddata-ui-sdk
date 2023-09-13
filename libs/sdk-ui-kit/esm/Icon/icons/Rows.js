// (C) 2021-2023 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Rows = ({ colorPalette, className, width, height }) => {
    var _a, _b;
    const normalRow = (_a = colorPalette === null || colorPalette === void 0 ? void 0 : colorPalette.normalRow) !== null && _a !== void 0 ? _a : "#CCD8E2";
    const totalRow = (_b = colorPalette === null || colorPalette === void 0 ? void 0 : colorPalette.totalRow) !== null && _b !== void 0 ? _b : "#94A1AD";
    return (React.createElement("svg", { className: className, width: width !== null && width !== void 0 ? width : 16, height: height !== null && height !== void 0 ? height : 16, viewBox: "0 0 13 13", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M0 1H13V3H0V1Z", fill: normalRow }),
        React.createElement("path", { d: "M0 5H13V7H0V5Z", fill: normalRow }),
        React.createElement("rect", { y: "9", width: "13", height: "2", fill: totalRow })));
};
//# sourceMappingURL=Rows.js.map