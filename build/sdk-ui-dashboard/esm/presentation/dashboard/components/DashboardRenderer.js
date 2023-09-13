// (C) 2022 GoodData Corporation
import { BackendProvider, WorkspaceProvider, ErrorComponent as DefaultError, LoadingComponent as DefaultLoading, } from "@gooddata/sdk-ui";
import { OverlayControllerProvider, OverlayController, ToastMessageContextProvider, } from "@gooddata/sdk-ui-kit";
import { ThemeProvider } from "@gooddata/sdk-ui-theme-provider";
import React from "react";
import { DashboardStoreProvider } from "../../../model/index.js";
import { ExportDialogContextProvider, DashboardCustomizationsProvider, DashboardComponentsProvider, DashboardConfigProvider, } from "../../dashboardContexts/index.js";
import { DefaultFilterBar } from "../../filterBar/index.js";
import { DefaultDashboardLayout } from "../../layout/index.js";
import { DefaultSaveAsDialog } from "../../saveAs/index.js";
import { DefaultScheduledEmailDialog, DefaultScheduledEmailManagementDialog, } from "../../scheduledEmail/index.js";
import { DefaultShareDialog } from "../../shareDialog/index.js";
import { DefaultButtonBar, DefaultMenuButton, DefaultSaveButton, DefaultTopBar, RenderModeAwareTitle, } from "../../topBar/index.js";
import { HiddenToolbar } from "../../toolbar/index.js";
import { defaultDashboardThemeModifier } from "../defaultDashboardThemeModifier.js";
import { useDashboard } from "../hooks/useDashboard.js";
import { DashboardLoading } from "./DashboardLoading.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DefaultEmptyLayoutDropZoneBody, LayoutResizeStateProvider } from "../../dragAndDrop/index.js";
import { RenderModeAwareDashboardSidebar } from "../DashboardSidebar/RenderModeAwareDashboardSidebar.js";
import { DASHBOARD_OVERLAYS_Z_INDEX } from "../../constants/index.js";
const overlayController = OverlayController.getInstance(DASHBOARD_OVERLAYS_Z_INDEX);
/**
 * @internal
 */
export const DashboardRenderer = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const { backend, workspace, hasThemeProvider, dashboardOrRef, attributeFilterProvider, dateFilterProvider, widgetProvider, insightProvider, insightBodyProvider, insightMenuButtonProvider, insightMenuProvider, insightMenuTitleProvider, kpiProvider, insightWidgetComponentSet, kpiWidgetComponentSet, attributeFilterComponentSet, } = useDashboard(props);
    const dashboardRender = (React.createElement(BackendProvider, { backend: backend },
        React.createElement(WorkspaceProvider, { workspace: workspace },
            React.createElement(OverlayControllerProvider, { overlayController: overlayController },
                React.createElement(DashboardStoreProvider, { backend: props.backend, workspace: props.workspace, dashboard: dashboardOrRef, persistedDashboard: props.persistedDashboard, filterContextRef: props.filterContextRef, eventHandlers: props.eventHandlers, config: props.config, permissions: props.permissions, onStateChange: props.onStateChange, onEventingInitialized: props.onEventingInitialized, additionalReduxContext: props.additionalReduxContext, customizationFns: props.customizationFns, widgetsOverlayFn: props.widgetsOverlayFn },
                    React.createElement(ToastMessageContextProvider, null,
                        React.createElement(ExportDialogContextProvider, null,
                            React.createElement(DashboardCustomizationsProvider, { insightMenuItemsProvider: props.insightMenuItemsProvider },
                                React.createElement(DashboardComponentsProvider, { ErrorComponent: (_a = props.ErrorComponent) !== null && _a !== void 0 ? _a : DefaultError, LoadingComponent: (_b = props.LoadingComponent) !== null && _b !== void 0 ? _b : DefaultLoading, LayoutComponent: (_c = props.LayoutComponent) !== null && _c !== void 0 ? _c : DefaultDashboardLayout, InsightComponentProvider: insightProvider, InsightBodyComponentProvider: insightBodyProvider, InsightMenuButtonComponentProvider: insightMenuButtonProvider, InsightMenuTitleComponentProvider: insightMenuTitleProvider, InsightMenuComponentProvider: insightMenuProvider, KpiComponentProvider: kpiProvider, WidgetComponentProvider: widgetProvider, ButtonBarComponent: (_d = props.ButtonBarComponent) !== null && _d !== void 0 ? _d : DefaultButtonBar, MenuButtonComponent: (_e = props.MenuButtonComponent) !== null && _e !== void 0 ? _e : DefaultMenuButton, TopBarComponent: (_f = props.TopBarComponent) !== null && _f !== void 0 ? _f : DefaultTopBar, ToolbarComponent: (_g = props.ToolbarComponent) !== null && _g !== void 0 ? _g : HiddenToolbar, TitleComponent: (_h = props.TitleComponent) !== null && _h !== void 0 ? _h : RenderModeAwareTitle, ScheduledEmailDialogComponent: (_j = props.ScheduledEmailDialogComponent) !== null && _j !== void 0 ? _j : DefaultScheduledEmailDialog, ScheduledEmailManagementDialogComponent: (_k = props.ScheduledEmailManagementDialogComponent) !== null && _k !== void 0 ? _k : DefaultScheduledEmailManagementDialog, ShareDialogComponent: (_l = props.ShareDialogComponent) !== null && _l !== void 0 ? _l : DefaultShareDialog, SaveAsDialogComponent: (_m = props.SaveAsDialogComponent) !== null && _m !== void 0 ? _m : DefaultSaveAsDialog, DashboardAttributeFilterComponentProvider: attributeFilterProvider, DashboardDateFilterComponentProvider: dateFilterProvider, FilterBarComponent: (_o = props.FilterBarComponent) !== null && _o !== void 0 ? _o : DefaultFilterBar, SidebarComponent: (_p = props.SidebarComponent) !== null && _p !== void 0 ? _p : RenderModeAwareDashboardSidebar, InsightWidgetComponentSet: insightWidgetComponentSet, KpiWidgetComponentSet: kpiWidgetComponentSet, AttributeFilterComponentSet: attributeFilterComponentSet, EmptyLayoutDropZoneBodyComponent: (_q = props.EmptyLayoutDropZoneBodyComponent) !== null && _q !== void 0 ? _q : DefaultEmptyLayoutDropZoneBody, SaveButtonComponent: (_r = props.SaveButtonComponent) !== null && _r !== void 0 ? _r : DefaultSaveButton },
                                    React.createElement(DashboardConfigProvider, { menuButtonConfig: props.menuButtonConfig },
                                        React.createElement(DndProvider, { backend: HTML5Backend },
                                            React.createElement(LayoutResizeStateProvider, null,
                                                React.createElement(DashboardLoading, Object.assign({}, props))))))))))))));
    if (props.theme || (!hasThemeProvider && !props.disableThemeLoading)) {
        return (React.createElement(ThemeProvider, { theme: props.theme, modifier: (_s = props.themeModifier) !== null && _s !== void 0 ? _s : defaultDashboardThemeModifier, backend: backend, workspace: workspace, 
            // Do not remove global theme styles on unmount, if the theme is provided as a prop,
            // and the theme loading is disabled.
            // This avoids flickering of the theme, when switching between the dashboard plugin engine and the default engine.
            removeGlobalStylesOnUnmout: !props.disableThemeLoading }, dashboardRender));
    }
    return dashboardRender;
};
//# sourceMappingURL=DashboardRenderer.js.map