// (C) 2022 GoodData Corporation
import React from "react";
import { useDashboardSelector, selectInsightsMap } from "../../../../model/index.js";
// Sometimes this component is rendered even before insights are ready, which blows up.
// Since the behavior is nearly impossible to replicate reliably, let's be defensive here and not render
// anything until the insights "catch up".
export const DashboardWidgetInsightGuard = (props) => {
    const { widget, Component } = props;
    const insights = useDashboardSelector(selectInsightsMap);
    const insight = insights.get(widget.insight);
    if (!insight) {
        // eslint-disable-next-line no-console
        console.debug("DefaultDashboardInsightWidget rendered before the insights were ready, skipping render.");
        return null;
    }
    return React.createElement(Component, Object.assign({}, props, { insight: insight }));
};
//# sourceMappingURL=DashboardWidgetInsightGuard.js.map