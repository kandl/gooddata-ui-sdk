// (C) 2022 GoodData Corporation
import { useCallback, useMemo } from "react";
import { idRef } from "@gooddata/sdk-model";
import { useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { useThemeIsLoading } from "@gooddata/sdk-ui-theme-provider";
import { DefaultDashboardAttributeFilter, DefaultDashboardDateFilter, DefaultDashboardAttributeFilterComponentSetFactory, } from "../../filterBar/index.js";
import { DefaultDashboardWidget, DefaultDashboardInsightMenuButton, LegacyDashboardInsightMenuButton, DefaultDashboardInsightMenu, LegacyDashboardInsightMenu, DefaultInsightBody, DefaultDashboardInsight, DefaultDashboardKpi, DefaultDashboardInsightComponentSetFactory, DefaultDashboardKpiComponentSetFactory, DefaultDashboardInsightMenuTitle, } from "../../widget/index.js";
export const useDashboard = (props) => {
    const { dashboard, DashboardAttributeFilterComponentProvider, DashboardDateFilterComponentProvider, WidgetComponentProvider, InsightComponentProvider, InsightBodyComponentProvider, InsightMenuButtonComponentProvider, insightMenuItemsProvider, InsightMenuComponentProvider, InsightMenuTitleComponentProvider, InsightComponentSetProvider, KpiComponentProvider, } = props;
    const backend = useBackendStrict(props.backend);
    const workspace = useWorkspaceStrict(props.workspace);
    const attributeFilterProvider = useCallback((filter) => {
        const userSpecified = DashboardAttributeFilterComponentProvider === null || DashboardAttributeFilterComponentProvider === void 0 ? void 0 : DashboardAttributeFilterComponentProvider(filter);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultDashboardAttributeFilter;
    }, [DashboardAttributeFilterComponentProvider]);
    const dateFilterProvider = useCallback((filter) => {
        const userSpecified = DashboardDateFilterComponentProvider === null || DashboardDateFilterComponentProvider === void 0 ? void 0 : DashboardDateFilterComponentProvider(filter);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultDashboardDateFilter;
    }, [DashboardDateFilterComponentProvider]);
    const widgetProvider = useCallback((widget) => {
        const userSpecified = WidgetComponentProvider === null || WidgetComponentProvider === void 0 ? void 0 : WidgetComponentProvider(widget);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultDashboardWidget;
    }, [WidgetComponentProvider]);
    const insightProvider = useCallback((insight, widget) => {
        const userSpecified = InsightComponentProvider === null || InsightComponentProvider === void 0 ? void 0 : InsightComponentProvider(insight, widget);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultDashboardInsight;
    }, [InsightComponentProvider]);
    const insightBodyProvider = useCallback((insight, widget) => {
        const userSpecified = InsightBodyComponentProvider === null || InsightBodyComponentProvider === void 0 ? void 0 : InsightBodyComponentProvider(insight, widget);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultInsightBody;
    }, [InsightBodyComponentProvider]);
    const insightMenuButtonProvider = useCallback((insight, widget) => {
        const userSpecified = InsightMenuButtonComponentProvider === null || InsightMenuButtonComponentProvider === void 0 ? void 0 : InsightMenuButtonComponentProvider(insight, widget);
        // if user customizes the items, always use the "new" default menu button
        const FallbackDashboardInsightMenuButtonInner = insightMenuItemsProvider
            ? DefaultDashboardInsightMenuButton
            : LegacyDashboardInsightMenuButton;
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : FallbackDashboardInsightMenuButtonInner;
    }, [InsightMenuButtonComponentProvider]);
    const insightMenuProvider = useCallback((insight, widget) => {
        const userSpecified = InsightMenuComponentProvider === null || InsightMenuComponentProvider === void 0 ? void 0 : InsightMenuComponentProvider(insight, widget);
        // if user customizes the items, always use the "new" default menu
        const FallbackDashboardInsightMenuInner = insightMenuItemsProvider
            ? DefaultDashboardInsightMenu
            : LegacyDashboardInsightMenu;
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : FallbackDashboardInsightMenuInner;
    }, [InsightMenuComponentProvider]);
    const insightMenuTitleProvider = useCallback((insight, widget) => {
        const userSpecified = InsightMenuTitleComponentProvider === null || InsightMenuTitleComponentProvider === void 0 ? void 0 : InsightMenuTitleComponentProvider(insight, widget);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultDashboardInsightMenuTitle;
    }, [InsightMenuTitleComponentProvider]);
    const kpiProvider = useCallback((kpi, widget) => {
        const userSpecified = KpiComponentProvider === null || KpiComponentProvider === void 0 ? void 0 : KpiComponentProvider(kpi, widget);
        return userSpecified !== null && userSpecified !== void 0 ? userSpecified : DefaultDashboardKpi;
    }, [KpiComponentProvider]);
    const dashboardOrRef = useMemo(() => {
        return typeof dashboard === "string" ? idRef(dashboard) : dashboard;
    }, [dashboard]);
    const insightWidgetComponentSet = useMemo(() => {
        const defaultComponentSet = DefaultDashboardInsightComponentSetFactory(insightProvider);
        return InsightComponentSetProvider
            ? InsightComponentSetProvider(defaultComponentSet)
            : defaultComponentSet;
    }, [InsightComponentSetProvider, insightProvider]);
    const kpiWidgetComponentSet = useMemo(() => {
        return DefaultDashboardKpiComponentSetFactory(kpiProvider);
    }, [kpiProvider]);
    const attributeFilterComponentSet = useMemo(() => {
        return DefaultDashboardAttributeFilterComponentSetFactory(attributeFilterProvider);
    }, [attributeFilterProvider]);
    const isThemeLoading = useThemeIsLoading();
    const hasThemeProvider = isThemeLoading !== undefined;
    return {
        backend,
        workspace,
        hasThemeProvider,
        dashboardOrRef,
        attributeFilterProvider,
        dateFilterProvider,
        widgetProvider,
        insightProvider,
        insightBodyProvider,
        insightMenuButtonProvider,
        insightMenuProvider,
        insightMenuTitleProvider,
        kpiProvider,
        insightWidgetComponentSet,
        kpiWidgetComponentSet,
        attributeFilterComponentSet,
    };
};
//# sourceMappingURL=useDashboard.js.map