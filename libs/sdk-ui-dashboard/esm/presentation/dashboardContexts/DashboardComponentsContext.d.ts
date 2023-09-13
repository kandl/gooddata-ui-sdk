import React from "react";
import { IErrorProps, ILoadingProps } from "@gooddata/sdk-ui";
import { CustomDashboardLayoutComponent, CustomEmptyLayoutDropZoneBodyComponent } from "../layout/types.js";
import { CustomButtonBarComponent, CustomMenuButtonComponent, CustomTitleComponent, CustomTopBarComponent, CustomSaveButtonComponent } from "../topBar/types.js";
import { CustomScheduledEmailDialogComponent, CustomScheduledEmailManagementDialogComponent } from "../scheduledEmail/types.js";
import { CustomFilterBarComponent } from "../filterBar/types.js";
import { CustomSaveAsDialogComponent } from "../saveAs/types.js";
import { CustomShareDialogComponent } from "../shareDialog/types.js";
import { AttributeFilterComponentProvider, DateFilterComponentProvider, InsightBodyComponentProvider, InsightComponentProvider, InsightMenuButtonComponentProvider, InsightMenuComponentProvider, InsightMenuTitleComponentProvider, KpiComponentProvider, WidgetComponentProvider } from "./types.js";
import { CustomSidebarComponent } from "../dashboard/DashboardSidebar/types.js";
import { AttributeFilterComponentSet, InsightWidgetComponentSet, KpiWidgetComponentSet } from "../componentDefinition/types.js";
import { CustomToolbarComponent } from "../toolbar/types.js";
/**
 * @internal
 */
interface IDashboardComponentsContext {
    ErrorComponent: React.ComponentType<IErrorProps>;
    LoadingComponent: React.ComponentType<ILoadingProps>;
    LayoutComponent: CustomDashboardLayoutComponent;
    WidgetComponentProvider: WidgetComponentProvider;
    InsightComponentProvider: InsightComponentProvider;
    InsightBodyComponentProvider: InsightBodyComponentProvider;
    InsightMenuButtonComponentProvider: InsightMenuButtonComponentProvider;
    InsightMenuComponentProvider: InsightMenuComponentProvider;
    InsightMenuTitleComponentProvider: InsightMenuTitleComponentProvider;
    KpiComponentProvider: KpiComponentProvider;
    ButtonBarComponent: CustomButtonBarComponent;
    MenuButtonComponent: CustomMenuButtonComponent;
    TitleComponent: CustomTitleComponent;
    TopBarComponent: CustomTopBarComponent;
    ToolbarComponent: CustomToolbarComponent;
    ScheduledEmailDialogComponent: CustomScheduledEmailDialogComponent;
    ScheduledEmailManagementDialogComponent: CustomScheduledEmailManagementDialogComponent;
    ShareDialogComponent: CustomShareDialogComponent;
    SaveAsDialogComponent: CustomSaveAsDialogComponent;
    DashboardAttributeFilterComponentProvider: AttributeFilterComponentProvider;
    DashboardDateFilterComponentProvider: DateFilterComponentProvider;
    FilterBarComponent: CustomFilterBarComponent;
    SidebarComponent: CustomSidebarComponent;
    InsightWidgetComponentSet: InsightWidgetComponentSet;
    KpiWidgetComponentSet: KpiWidgetComponentSet;
    AttributeFilterComponentSet: AttributeFilterComponentSet;
    EmptyLayoutDropZoneBodyComponent: CustomEmptyLayoutDropZoneBodyComponent;
    SaveButtonComponent: CustomSaveButtonComponent;
}
/**
 * @internal
 */
export declare const useDashboardComponentsContext: (localComponentOverrides?: Partial<IDashboardComponentsContext>) => IDashboardComponentsContext;
/**
 * @internal
 */
export interface IDashboardComponentsProviderProps extends IDashboardComponentsContext {
    children: React.ReactNode;
}
/**
 * @internal
 */
export declare function DashboardComponentsProvider(props: IDashboardComponentsProviderProps): JSX.Element;
export {};
