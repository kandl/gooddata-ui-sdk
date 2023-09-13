// (C) 2007-2018 GoodData Corporation
import React from "react";
import ReactMeasure from "react-measure";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(ReactMeasure);
const MEASURED_ELEMENT_STYLE = { width: "100%", height: "100%" };
export function HighChartsMeasuredRenderer(props) {
    return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
        return (React.createElement("div", { className: "visualization-container-measure-wrap", style: MEASURED_ELEMENT_STYLE, ref: measureRef }, props.childrenRenderer(contentRect)));
    }));
}
//# sourceMappingURL=HighChartsMeasuredRenderer.js.map