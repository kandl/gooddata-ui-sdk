// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const DashboardInsight = (props) => {
    const { insight, widget } = props;
    const { InsightWidgetComponentSet } = useDashboardComponentsContext();
    const InsightComponent = useMemo(() => InsightWidgetComponentSet.MainComponentProvider(insight, widget), [InsightWidgetComponentSet, insight, widget]);
    return React.createElement(InsightComponent, Object.assign({}, props));
};
//# sourceMappingURL=DashboardInsight.js.map