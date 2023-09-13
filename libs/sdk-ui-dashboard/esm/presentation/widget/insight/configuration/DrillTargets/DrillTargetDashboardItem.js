// (C) 2020-2023 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { selectAccessibleDashboards, selectInaccessibleDashboards, useDashboardSelector, } from "../../../../../model/index.js";
import { DashboardList } from "../../../../dashboardList/index.js";
const buildDashboardItems = (dashboards, forbiddenDashboards, intl, selected) => {
    const isAvailableDashboardSelected = dashboards.some((dashboard) => areObjRefsEqual(dashboard.ref, selected));
    if (!selected || isAvailableDashboardSelected) {
        return dashboards;
    }
    const selectedForbiddenItem = forbiddenDashboards.find(({ ref }) => areObjRefsEqual(ref, selected));
    if (selectedForbiddenItem === undefined) {
        return dashboards;
    }
    const { title, accessibilityLimitation } = selectedForbiddenItem;
    const forbiddenItem = Object.assign(Object.assign({}, selectedForbiddenItem), { title: accessibilityLimitation === "forbidden"
            ? intl.formatMessage({ id: "configurationPanel.drillConfig.forbiddenDashboard" })
            : title });
    return [forbiddenItem, ...dashboards];
};
export const DrillTargetDashboardItem = (props) => {
    const { onSelect, selected } = props;
    const intl = useIntl();
    const dashboards = useDashboardSelector(selectAccessibleDashboards);
    const inaccessibleDashboards = useDashboardSelector(selectInaccessibleDashboards);
    const dashboardItems = useMemo(() => {
        return buildDashboardItems(dashboards, inaccessibleDashboards, intl, selected);
    }, [dashboards, inaccessibleDashboards, intl, selected]);
    return React.createElement(DashboardList, { onSelect: onSelect, dashboards: dashboardItems, selected: selected });
};
//# sourceMappingURL=DrillTargetDashboardItem.js.map