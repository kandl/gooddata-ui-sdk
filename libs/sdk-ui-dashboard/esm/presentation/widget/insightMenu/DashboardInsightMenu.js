// (C) 2020 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const DashboardInsightMenu = (props) => {
    const { insight, widget } = props;
    const { InsightMenuComponentProvider } = useDashboardComponentsContext();
    const InsightMenuComponent = useMemo(() => InsightMenuComponentProvider(insight, widget), [InsightMenuComponentProvider, insight, widget]);
    return React.createElement(InsightMenuComponent, Object.assign({}, props));
};
//# sourceMappingURL=DashboardInsightMenu.js.map