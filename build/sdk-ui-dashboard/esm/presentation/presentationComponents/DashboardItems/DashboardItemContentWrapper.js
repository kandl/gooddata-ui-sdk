// (C) 2020 GoodData Corporation
import React from "react";
import DefaultMeasure from "react-measure";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(DefaultMeasure);
export const DashboardItemContentWrapper = ({ children }) => {
    return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
        var _a, _b;
        return (React.createElement("div", { className: "dash-item-content-wrapper", ref: measureRef }, children({
            clientWidth: (_a = contentRect.client) === null || _a === void 0 ? void 0 : _a.width,
            clientHeight: (_b = contentRect.client) === null || _b === void 0 ? void 0 : _b.height,
        })));
    }));
};
//# sourceMappingURL=DashboardItemContentWrapper.js.map