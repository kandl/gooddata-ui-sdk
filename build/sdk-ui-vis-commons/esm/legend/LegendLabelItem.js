// (C) 2007-2020 GoodData Corporation
import React from "react";
export const LegendLabelItem = (props) => {
    const { label } = props;
    if (!label) {
        return null;
    }
    return (React.createElement("div", { className: "series-item" },
        React.createElement("div", { className: "series-name" }, `${label}:`)));
};
//# sourceMappingURL=LegendLabelItem.js.map