import { IWorkspaceDashboardsService, IWidgetAlertCount, SupportedWidgetReferenceTypes, IWidgetReferences, IDashboardWithReferences, IGetDashboardOptions, SupportedDashboardReferenceTypes, IDashboardReferences, IGetScheduledMailOptions, IExportResult, IGetDashboardPluginOptions } from "@gooddata/sdk-backend-spi";
import { IFilter, ObjRef, FilterContextItem, IFilterContextDefinition, IWidgetAlert, IWidgetAlertDefinition, IWidget, IScheduledMail, IScheduledMailDefinition, IDashboard, IDashboardDefinition, IListedDashboard, IDashboardPlugin, IDashboardPluginDefinition, IDashboardPermissions } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceDashboards implements IWorkspaceDashboardsService {
    private readonly authCall;
    readonly workspace: string;
    private insights;
    private permissions;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getDashboards: (options?: IGetDashboardOptions) => Promise<IListedDashboard[]>;
    getDashboard: (dashboardRef: ObjRef, exportFilterContextRef?: ObjRef, options?: IGetDashboardOptions) => Promise<IDashboard>;
    createDashboard: (dashboard: IDashboardDefinition) => Promise<IDashboard>;
    updateDashboard: (originalDashboard: IDashboard, updatedDashboard: IDashboard | IDashboardDefinition) => Promise<IDashboard>;
    deleteDashboard: (dashboardRef: ObjRef) => Promise<void>;
    exportDashboardToPdf: (dashboardRef: ObjRef, filters?: FilterContextItem[]) => Promise<IExportResult>;
    createScheduledMail: (scheduledMailDefinition: IScheduledMailDefinition, exportFilterContextDefinition?: IFilterContextDefinition) => Promise<IScheduledMail>;
    updateScheduledMail: (ref: ObjRef, scheduledMailDefinition: IScheduledMailDefinition, filterContextRef?: ObjRef) => Promise<void>;
    deleteScheduledMail: (scheduledMailRef: ObjRef) => Promise<void>;
    getScheduledMailsForDashboard: (dashboardRef: ObjRef, options?: IGetScheduledMailOptions) => Promise<IScheduledMail[]>;
    getScheduledMailsCountForDashboard: (dashboardRef: ObjRef) => Promise<number>;
    getAllWidgetAlertsForCurrentUser: () => Promise<IWidgetAlert[]>;
    getDashboardWidgetAlertsForCurrentUser: (ref: ObjRef) => Promise<IWidgetAlert[]>;
    getWidgetAlertsCountForWidgets: (refs: ObjRef[]) => Promise<IWidgetAlertCount[]>;
    createWidgetAlert: (alert: IWidgetAlertDefinition) => Promise<IWidgetAlert>;
    updateWidgetAlert: (updatedAlert: IWidgetAlert) => Promise<IWidgetAlert>;
    deleteWidgetAlert: (ref: ObjRef) => Promise<void>;
    deleteWidgetAlerts: (refs: ObjRef[]) => Promise<void>;
    getWidgetReferencedObjects: (widget: IWidget, types?: SupportedWidgetReferenceTypes[]) => Promise<IWidgetReferences>;
    getResolvedFiltersForWidget: (widget: IWidget, filters: IFilter[]) => Promise<IFilter[]>;
    private createBearWidgetAlert;
    private updateBearWidgetAlert;
    private createOrUpdateWidgetAlertFilterContext;
    private getBearWidgetAlertsForWidget;
    private getBearDashboard;
    private createBearDashboard;
    private updateBearDashboard;
    private getAccessibleDashboards;
    private isExplicitlyShared;
    private updateLayoutAndWidgets;
    private updateFilterContext;
    private getBearExportFilterContext;
    private createBearFilterContext;
    private updateBearFilterContext;
    private sanitizeFilterContext;
    private createBearWidget;
    private updateBearWidget;
    private deleteBearWidgets;
    private collectCreatedWidgetsWithLayoutPaths;
    private collectUpdatedWidgetsWithLayoutPaths;
    private collectDeletedWidgets;
    private getAllBearKpiAlertsForCurrentUser;
    private getDashboardBearKpiAlertsForCurrentUser;
    private getConvertedAlerts;
    private getBearKpiAlertsFilterContexts;
    private getScheduledMailObjectLinksForDashboard;
    private getScheduledMailObjectLinksForDashboardAndCurrentUser;
    private updateBearMetadataObject;
    private deleteBearMetadataObject;
    private getBearVisualizationClasses;
    private getBearDashboardDependencies;
    private getBearDashboardReferences;
    getDashboardWithReferences(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardWithReferences>;
    getDashboardReferencedObjects: (dashboard: IDashboard, types?: SupportedDashboardReferenceTypes[]) => Promise<IDashboardReferences>;
    createDashboardPlugin: (plugin: IDashboardPluginDefinition) => Promise<IDashboardPlugin>;
    deleteDashboardPlugin: (ref: ObjRef) => Promise<void>;
    getDashboardPlugin: (ref: ObjRef, options?: IGetDashboardPluginOptions) => Promise<IDashboardPlugin>;
    getDashboardPlugins: (options?: IGetDashboardPluginOptions) => Promise<IDashboardPlugin[]>;
    /**
     * Get user's dashboard-level permissions
     *
     * @remarks
     * On bear the dashboard permissions are derived from dashboard accessibility
     * and user's workspace-level permissions
     *
     * @param ref - dashboard reference
     */
    getDashboardPermissions: (ref: ObjRef) => Promise<IDashboardPermissions>;
    private ensureDashboardPluginLinksHaveUris;
    validateDashboardsExistence: (dashboardRefs: ObjRef[]) => Promise<({
        ref: ObjRef;
        title: string | undefined;
        identifier: string;
        uri: string;
    } | {
        ref: ObjRef;
        identifier: string;
        uri: string;
        title?: undefined;
    })[]>;
}
//# sourceMappingURL=index.d.ts.map