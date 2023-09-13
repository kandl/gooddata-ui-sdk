// (C) 2023 GoodData Corporation
import React from "react";
import CalculationListItemInfoSection from "./CalculationListItemInfoSection.js";
const CalculationListItemInfo = ({ title, calculationType }) => {
    return (React.createElement("div", { className: "calculation-item-info" },
        React.createElement("h3", { className: "calculation-item-info-header" }, title),
        React.createElement(CalculationListItemInfoSection, { calculationType: calculationType, section: "useIn" }),
        React.createElement(CalculationListItemInfoSection, { calculationType: calculationType, section: "formula" }),
        React.createElement(CalculationListItemInfoSection, { calculationType: calculationType, section: "example" })));
};
export default CalculationListItemInfo;
//# sourceMappingURL=CalculationListItemInfo.js.map