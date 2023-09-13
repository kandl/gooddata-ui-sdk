// (C) 2019 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const KpiError = (props) => {
    const message = props.message;
    return (React.createElement("span", { className: "gdc-kpi-error", style: {
            whiteSpace: "normal",
            lineHeight: "normal",
            fontSize: "14px",
            fontWeight: 700,
            verticalAlign: "middle",
            color: "#94a1ad",
            fontFamily: "gdcustomfont, avenir, Helvetica Neue, arial, sans-serif",
        } }, message));
};
//# sourceMappingURL=KpiError.js.map