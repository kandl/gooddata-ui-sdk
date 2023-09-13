// (C) 2020-2022 GoodData Corporation
import React from "react";
import { DashboardKpiCore } from "./DashboardKpiCore.js";
import { useKpiDrill } from "../common/useKpiDrill.js";
/**
 * @internal
 */
export const DefaultDashboardKpiWithDrills = (props) => {
    const { kpiWidget } = props;
    const onDrill = useKpiDrill(kpiWidget);
    return React.createElement(DashboardKpiCore, Object.assign({}, props, { onDrill: onDrill }));
};
//# sourceMappingURL=DefaultDashboardKpiWithDrills.js.map