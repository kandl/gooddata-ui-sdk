// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const InsightBody = (props) => {
    const { insight, widget } = props;
    const { InsightBodyComponentProvider } = useDashboardComponentsContext();
    const RendererComponent = useMemo(() => InsightBodyComponentProvider(insight, widget), [InsightBodyComponentProvider, insight, widget]);
    return React.createElement(RendererComponent, Object.assign({}, props));
};
//# sourceMappingURL=InsightBody.js.map