// (C) 2023 GoodData Corporation
import React from "react";
import PrimarySectionContent from "./PrimarySectionContent.js";
import PrimarySectionCompactContent from "./PrimarySectionCompactContent.js";
import { useBaseHeadline } from "./BaseHeadlineContext.js";
const PrimarySection = ({ primaryItem, isOnlyPrimaryItem }) => {
    const { config } = useBaseHeadline();
    return (React.createElement("div", { className: "gd-flex-container primary-section s-primary-section" }, config.enableCompactSize ? (React.createElement(PrimarySectionCompactContent, { primaryItem: primaryItem, isOnlyPrimaryItem: isOnlyPrimaryItem })) : (React.createElement(PrimarySectionContent, { primaryItem: primaryItem }))));
};
export default PrimarySection;
//# sourceMappingURL=PrimarySection.js.map