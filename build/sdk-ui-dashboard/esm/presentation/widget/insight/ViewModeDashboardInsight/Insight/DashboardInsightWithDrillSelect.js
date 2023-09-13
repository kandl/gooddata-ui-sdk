// (C) 2020 GoodData Corporation
import React from "react";
import { WithDrillSelect } from "../../../../drill/index.js";
import { DashboardInsight } from "./DashboardInsight.js";
/**
 * @internal
 */
export const DashboardInsightWithDrillSelect = (props) => {
    const { widget, onDrillDown, onDrillToInsight, onDrillToAttributeUrl, onDrillToCustomUrl, onDrillToDashboard, } = props;
    return (React.createElement(WithDrillSelect, { widgetRef: widget.ref, insight: props.insight, onDrillDownSuccess: onDrillDown, onDrillToInsightSuccess: onDrillToInsight, onDrillToAttributeUrlSuccess: onDrillToAttributeUrl, onDrillToCustomUrlSuccess: onDrillToCustomUrl, onDrillToDashboardSuccess: onDrillToDashboard }, ({ onDrill }) => {
        return React.createElement(DashboardInsight, Object.assign({}, props, { onDrill: onDrill }));
    }));
};
//# sourceMappingURL=DashboardInsightWithDrillSelect.js.map