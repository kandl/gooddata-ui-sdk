import { __rest } from "tslib";
// (C) 2019-2023 GoodData Corporation
import React, { createContext, useContext } from "react";
import { ErrorComponent, LoadingComponent, UnexpectedSdkError, } from "@gooddata/sdk-ui";
const ThrowMissingComponentError = (componentName) => () => {
    throw new UnexpectedSdkError(`Component: ${componentName} is missing in the DashboardComponentsProvider.`);
};
/**
 * @internal
 */
const DashboardComponentsContext = createContext({
    ErrorComponent: ErrorComponent,
    LoadingComponent: LoadingComponent,
    LayoutComponent: ThrowMissingComponentError("LayoutComponent"),
    InsightComponentProvider: ThrowMissingComponentError("InsightComponent"),
    InsightBodyComponentProvider: ThrowMissingComponentError("InsightBodyComponent"),
    InsightMenuButtonComponentProvider: ThrowMissingComponentError("InsightMenuButtonComponent"),
    InsightMenuComponentProvider: ThrowMissingComponentError("InsightMenuComponent"),
    InsightMenuTitleComponentProvider: ThrowMissingComponentError("InsightMenuTitleComponent"),
    KpiComponentProvider: ThrowMissingComponentError("KpiComponent"),
    WidgetComponentProvider: ThrowMissingComponentError("WidgetComponent"),
    ButtonBarComponent: ThrowMissingComponentError("ButtonBarComponent"),
    MenuButtonComponent: ThrowMissingComponentError("MenuButtonComponent"),
    TitleComponent: ThrowMissingComponentError("TitleComponent"),
    TopBarComponent: ThrowMissingComponentError("TopBarComponent"),
    ToolbarComponent: ThrowMissingComponentError("ToolbarComponent"),
    ScheduledEmailDialogComponent: ThrowMissingComponentError("ScheduledEmailDialogComponent"),
    ScheduledEmailManagementDialogComponent: ThrowMissingComponentError("ScheduledEmailManagementDialogComponent"),
    ShareDialogComponent: ThrowMissingComponentError("ShareDialogComponent"),
    SaveAsDialogComponent: ThrowMissingComponentError("SaveAsDialogComponent"),
    DashboardAttributeFilterComponentProvider: ThrowMissingComponentError("DashboardAttributeFilterComponentProvider"),
    DashboardDateFilterComponentProvider: ThrowMissingComponentError("DashboardDateFilterComponentProvider"),
    FilterBarComponent: ThrowMissingComponentError("FilterBarComponent"),
    SidebarComponent: ThrowMissingComponentError("SidebarComponent"),
    InsightWidgetComponentSet: null,
    KpiWidgetComponentSet: null,
    AttributeFilterComponentSet: null,
    EmptyLayoutDropZoneBodyComponent: ThrowMissingComponentError("EmptyLayoutDropZoneBodyComponent"),
    SaveButtonComponent: ThrowMissingComponentError("SaveButtonComponent"),
});
DashboardComponentsContext.displayName = "DashboardComponentsContext";
/**
 * @internal
 */
export const useDashboardComponentsContext = (localComponentOverrides) => {
    const globalComponents = useContext(DashboardComponentsContext);
    // cannot just spread here, we only want to use overrides that are not undefined
    return Object.keys(globalComponents).reduce((acc, key) => {
        var _a;
        acc[key] = (_a = localComponentOverrides === null || localComponentOverrides === void 0 ? void 0 : localComponentOverrides[key]) !== null && _a !== void 0 ? _a : globalComponents[key];
        return acc;
    }, {});
};
/**
 * @internal
 */
export function DashboardComponentsProvider(props) {
    const { children } = props, components = __rest(props, ["children"]);
    return (React.createElement(DashboardComponentsContext.Provider, { value: components }, children));
}
//# sourceMappingURL=DashboardComponentsContext.js.map