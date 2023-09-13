// (C) 2019-2022 GoodData Corporation
import React from "react";
import { InsightDropdown } from "./InsightDropdown.js";
export const DrillTargetInsightItem = ({ insight, onSelect, }) => {
    return React.createElement(InsightDropdown, { insightConfig: insight, onSelect: onSelect });
};
//# sourceMappingURL=DrillTargetInsightItem.js.map