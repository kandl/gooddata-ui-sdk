// (C) 2007-2021 GoodData Corporation
import React from "react";
const fullHeightWidthStyle = {
    height: "100%",
    width: "100%",
};
export const ErrorContainer = ({ children }) => {
    return (React.createElement("div", { className: "gd-visualization-content", style: fullHeightWidthStyle },
        React.createElement("div", { className: "info-label" },
            React.createElement("div", { style: fullHeightWidthStyle }, children))));
};
//# sourceMappingURL=ErrorContainer.js.map