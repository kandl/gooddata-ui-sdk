// (C) 2022 GoodData Corporation
import { widgetRef } from "@gooddata/sdk-model";
import cx from "classnames";
import React from "react";
import { DashboardItem } from "../../presentationComponents/index.js";
import { DashboardKpi } from "../kpi/index.js";
import { selectAlertByWidgetRef, useDashboardSelector, useWidgetSelection } from "../../../model/index.js";
export const DefaultDashboardKpiWidget = (props) => {
    const { kpiWidget, onError, onFiltersChange, screen, dashboardItemClasses } = props;
    const { isSelected } = useWidgetSelection(widgetRef(kpiWidget));
    const alertSelector = selectAlertByWidgetRef(widgetRef(kpiWidget));
    const alert = useDashboardSelector(alertSelector);
    return (React.createElement(DashboardItem, { className: cx("type-kpi", dashboardItemClasses, { "is-selected": isSelected }), screen: screen },
        React.createElement(DashboardKpi, { kpiWidget: kpiWidget, alert: alert, onFiltersChange: onFiltersChange, onError: onError })));
};
//# sourceMappingURL=DefaultDashboardKpiWidget.js.map