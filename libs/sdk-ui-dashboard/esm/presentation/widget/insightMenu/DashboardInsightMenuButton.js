// (C) 2020 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const DashboardInsightMenuButton = (props) => {
    const { insight, widget } = props;
    const { InsightMenuButtonComponentProvider } = useDashboardComponentsContext();
    const InsightMenuButtonComponent = useMemo(() => InsightMenuButtonComponentProvider(insight, widget), [InsightMenuButtonComponentProvider, insight, widget]);
    return React.createElement(InsightMenuButtonComponent, Object.assign({}, props));
};
//# sourceMappingURL=DashboardInsightMenuButton.js.map