// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const DashboardInsightMenuTitle = (props) => {
    const { insight, widget } = props;
    const { InsightMenuTitleComponentProvider } = useDashboardComponentsContext();
    const InsightMenuTitleComponent = useMemo(() => InsightMenuTitleComponentProvider(insight, widget), [InsightMenuTitleComponentProvider, insight, widget]);
    return React.createElement(InsightMenuTitleComponent, Object.assign({}, props));
};
//# sourceMappingURL=DashboardInsightMenuTitle.js.map