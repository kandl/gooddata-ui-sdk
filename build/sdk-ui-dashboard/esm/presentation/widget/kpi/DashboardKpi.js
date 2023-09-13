// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const DashboardKpi = (props) => {
    const { KpiWidgetComponentSet } = useDashboardComponentsContext();
    const { kpiWidget } = props;
    const KpiComponent = useMemo(() => KpiWidgetComponentSet.MainComponentProvider(kpiWidget.kpi, kpiWidget), [KpiWidgetComponentSet, kpiWidget]);
    return React.createElement(KpiComponent, Object.assign({}, props));
};
//# sourceMappingURL=DashboardKpi.js.map