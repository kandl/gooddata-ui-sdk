// (C) 2020-2022 GoodData Corporation
import React from "react";
import { DrillSelectList } from "./DrillSelectList.js";
export const DrillSelectListBody = (props) => {
    const { items, onSelect } = props;
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (React.createElement("div", { className: "gd-drill-modal-picker-dropdown s-drill-item-selector-dropdown", onScroll: stopPropagation },
        React.createElement("div", { className: "gd-drill-modal-picker-body" },
            React.createElement(DrillSelectList, { items: items, onSelect: onSelect }))));
};
//# sourceMappingURL=DrillSelectListBody.js.map