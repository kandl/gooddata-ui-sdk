import { IDashboardReferences, IDashboardWithReferences, IExportResult, IGetDashboardOptions, IGetScheduledMailOptions, IWidgetAlertCount, IWidgetReferences, IWorkspaceDashboardsService, IWorkspaceInsightsService, SupportedDashboardReferenceTypes, SupportedWidgetReferenceTypes, IGetDashboardPluginOptions } from "@gooddata/sdk-backend-spi";
import { IFilter, ObjRef, FilterContextItem, IFilterContextDefinition, IWidgetAlert, IWidgetAlertDefinition, IWidget, IScheduledMail, IScheduledMailDefinition, IDashboard, IDashboardDefinition, IListedDashboard, IDashboardPlugin, IDashboardPluginDefinition, IDashboardPermissions, IExistingDashboard } from "@gooddata/sdk-model";
import { RecordingIndex } from "./types.js";
export declare class RecordedDashboards implements IWorkspaceDashboardsService {
    readonly workspace: string;
    private readonly insights;
    private readonly recordings;
    private localDashboards;
    constructor(workspace: string, insights: IWorkspaceInsightsService, recordings: RecordingIndex);
    private findRecordingOrLocalDashboard;
    private addOrUpdateLocalDashboard;
    getDashboards: () => Promise<IListedDashboard[]>;
    getDashboard: (ref: ObjRef, filterContextRef?: ObjRef) => Promise<IDashboard>;
    getDashboardWidgetAlertsForCurrentUser: (ref: ObjRef) => Promise<IWidgetAlert[]>;
    getDashboardWithReferences: (ref: ObjRef, filterContextRef?: ObjRef, _options?: IGetDashboardOptions, types?: SupportedDashboardReferenceTypes[]) => Promise<IDashboardWithReferences>;
    getDashboardReferencedObjects: (dashboard: IDashboard, types?: SupportedDashboardReferenceTypes[]) => Promise<IDashboardReferences>;
    createDashboard: (dashboard: IDashboardDefinition) => Promise<IDashboard>;
    updateDashboard: (dashboard: IDashboard, updatedDashboard: IDashboardDefinition) => Promise<IDashboard>;
    deleteDashboard(_ref: ObjRef): Promise<void>;
    getWidgetAlertsCountForWidgets(_refs: ObjRef[]): Promise<IWidgetAlertCount[]>;
    getWidgetReferencedObjects(_widget: IWidget, _types?: SupportedWidgetReferenceTypes[]): Promise<IWidgetReferences>;
    getAllWidgetAlertsForCurrentUser(): Promise<IWidgetAlert[]>;
    getResolvedFiltersForWidget(_widget: IWidget, _filters: IFilter[]): Promise<IFilter[]>;
    getScheduledMailsForDashboard(_ref: ObjRef, _options?: IGetScheduledMailOptions): Promise<IScheduledMail[]>;
    getScheduledMailsCountForDashboard(_ref: ObjRef): Promise<number>;
    exportDashboardToPdf(_ref: ObjRef, _filters?: FilterContextItem[]): Promise<IExportResult>;
    createScheduledMail(_scheduledMail: IScheduledMailDefinition, _exportFilterContext?: IFilterContextDefinition): Promise<IScheduledMail>;
    updateScheduledMail(_ref: ObjRef): Promise<void>;
    deleteScheduledMail(_ref: ObjRef): Promise<void>;
    createWidgetAlert(_alert: IWidgetAlertDefinition): Promise<IWidgetAlert>;
    deleteWidgetAlert(_ref: ObjRef): Promise<void>;
    deleteWidgetAlerts(_refs: ObjRef[]): Promise<void>;
    updateWidgetAlert(_alert: IWidgetAlert | IWidgetAlertDefinition): Promise<IWidgetAlert>;
    createDashboardPlugin(_plugin: IDashboardPluginDefinition): Promise<IDashboardPlugin>;
    deleteDashboardPlugin(_ref: ObjRef): Promise<void>;
    getDashboardPlugin(_ref: ObjRef, _options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin>;
    getDashboardPlugins(_options?: IGetDashboardPluginOptions): Promise<IDashboardPlugin[]>;
    getDashboardPermissions(): Promise<IDashboardPermissions>;
    validateDashboardsExistence(_dashboardRefs: ObjRef[]): Promise<IExistingDashboard[]>;
}
//# sourceMappingURL=dashboards.d.ts.map