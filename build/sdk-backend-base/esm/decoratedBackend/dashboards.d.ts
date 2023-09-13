import { IWorkspaceDashboardsService, IGetDashboardOptions, IGetScheduledMailOptions, SupportedDashboardReferenceTypes, IDashboardWithReferences, IDashboardReferences, IWidgetAlertCount, SupportedWidgetReferenceTypes, IWidgetReferences, IExportResult, IGetDashboardPluginOptions } from "@gooddata/sdk-backend-spi";
import { IFilter, ObjRef, FilterContextItem, IFilterContextDefinition, IWidgetAlert, IWidgetAlertDefinition, IWidget, IScheduledMail, IScheduledMailDefinition, IDashboard, IDashboardDefinition, IListedDashboard, IDashboardPlugin, IDashboardPluginDefinition, IDashboardPermissions, IExistingDashboard } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceDashboardsService implements IWorkspaceDashboardsService {
    protected decorated: IWorkspaceDashboardsService;
    workspace: string;
    protected constructor(decorated: IWorkspaceDashboardsService, workspace: string);
    getDashboards(options?: IGetDashboardOptions): Promise<IListedDashboard[]>;
    getDashboard(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions): Promise<IDashboard>;
    getDashboardWithReferences(ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardWithReferences>;
    getDashboardReferencedObjects(dashboard: IDashboard, types?: SupportedDashboardReferenceTypes[]): Promise<IDashboardReferences>;
    createDashboard(dashboard: IDashboardDefinition): Promise<IDashboard>;
    updateDashboard(dashboard: IDashboard, updatedDashboard: IDashboardDefinition): Promise<IDashboard>;
    deleteDashboard(ref: ObjRef): Promise<void>;
    exportDashboardToPdf(ref: ObjRef, filters?: FilterContextItem[]): Promise<IExportResult>;
    createScheduledMail(scheduledMail: IScheduledMailDefinition, exportFilterContext?: IFilterContextDefinition): Promise<IScheduledMail>;
    updateScheduledMail(ref: ObjRef, scheduledMailDefinition: IScheduledMailDefinition, filterContextRef?: ObjRef): Promise<void>;
    deleteScheduledMail(ref: ObjRef): Promise<void>;
    getScheduledMailsForDashboard(ref: ObjRef, options?: IGetScheduledMailOptions): Promise<IScheduledMail[]>;
    getScheduledMailsCountForDashboard(ref: ObjRef): Promise<number>;
    getAllWidgetAlertsForCurrentUser(): Promise<IWidgetAlert[]>;
    getDashboardWidgetAlertsForCurrentUser(ref: ObjRef): Promise<IWidgetAlert[]>;
    getWidgetAlertsCountForWidgets(refs: ObjRef[]): Promise<IWidgetAlertCount[]>;
    createWidgetAlert(alert: IWidgetAlertDefinition): Promise<IWidgetAlert>;
    updateWidgetAlert(alert: IWidgetAlert | IWidgetAlertDefinition): Promise<IWidgetAlert>;
    deleteWidgetAlert(ref: ObjRef): Promise<void>;
    deleteWidgetAlerts(refs: ObjRef[]): Promise<void>;
    getWidgetReferencedObjects(widget: IWidget, types?: SupportedWidgetReferenceTypes[]): Promise<IWidgetReferences>;
    getResolvedFiltersForWidget(widget: IWidget, filters: IFilter[]): Promise<IFilter[]>;
    getDashboardPlugins(options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin[]>;
    getDashboardPlugin(ref: ObjRef, options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin>;
    createDashboardPlugin(plugin: IDashboardPluginDefinition): Promise<IDashboardPlugin>;
    deleteDashboardPlugin(ref: ObjRef): Promise<void>;
    getDashboardPermissions(ref: ObjRef): Promise<IDashboardPermissions>;
    validateDashboardsExistence(dashboardRefs: ObjRef[]): Promise<IExistingDashboard[]>;
}
//# sourceMappingURL=dashboards.d.ts.map