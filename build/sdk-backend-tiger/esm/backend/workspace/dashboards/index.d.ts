import { IDashboardReferences, IDashboardWithReferences, IGetDashboardOptions, IWorkspaceDashboardsService, SupportedDashboardReferenceTypes, IExportResult, IGetDashboardPluginOptions } from "@gooddata/sdk-backend-spi";
import { IFilter, ObjRef, IWidget, IDashboard, IDashboardDefinition, IListedDashboard, IDashboardPlugin, IDashboardPluginDefinition, IDashboardPermissions, FilterContextItem } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceDashboards implements IWorkspaceDashboardsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getDashboards: (options?: IGetDashboardOptions) => Promise<IListedDashboard[]>;
    getDashboard: (ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions) => Promise<IDashboard>;
    getDashboardWithReferences: (ref: ObjRef, filterContextRef?: ObjRef, options?: IGetDashboardOptions, types?: SupportedDashboardReferenceTypes[]) => Promise<IDashboardWithReferences>;
    getDashboardReferencedObjects: (dashboard: IDashboard, types?: SupportedDashboardReferenceTypes[]) => Promise<IDashboardReferences>;
    private getFilterContextFromExportId;
    private getDashboardWithSideloads;
    createDashboard: (dashboard: IDashboardDefinition) => Promise<IDashboard>;
    updateDashboard: (originalDashboard: IDashboard, updatedDashboard: IDashboardDefinition) => Promise<IDashboard>;
    deleteDashboard: (ref: ObjRef) => Promise<void>;
    exportDashboardToPdf: (dashboardRef: ObjRef, filters?: FilterContextItem[]) => Promise<IExportResult>;
    private handleExportResultPolling;
    createScheduledMail: () => Promise<never>;
    updateScheduledMail: () => Promise<never>;
    deleteScheduledMail: () => Promise<never>;
    getScheduledMailsForDashboard: () => Promise<never>;
    getScheduledMailsCountForDashboard: () => Promise<number>;
    getAllWidgetAlertsForCurrentUser: () => Promise<never[]>;
    getDashboardWidgetAlertsForCurrentUser: () => Promise<never>;
    getWidgetAlertsCountForWidgets: () => Promise<never[]>;
    createWidgetAlert: () => Promise<never>;
    updateWidgetAlert: () => Promise<never>;
    deleteWidgetAlert: () => Promise<never>;
    deleteWidgetAlerts: () => Promise<never>;
    getWidgetReferencedObjects: () => Promise<never>;
    getResolvedFiltersForWidget: (widget: IWidget, filters: IFilter[]) => Promise<IFilter[]>;
    createDashboardPlugin: (plugin: IDashboardPluginDefinition) => Promise<IDashboardPlugin>;
    deleteDashboardPlugin: (ref: ObjRef) => Promise<void>;
    getDashboardPlugin: (ref: ObjRef, options?: IGetDashboardPluginOptions) => Promise<IDashboardPlugin>;
    getDashboardPlugins: (options?: IGetDashboardPluginOptions) => Promise<IDashboardPlugin[]>;
    validateDashboardsExistence: (dashboardRefs: ObjRef[]) => Promise<{
        ref: ObjRef;
        identifier: string;
        uri: string;
    }[]>;
    private createFilterContext;
    getDashboardPermissions: (ref: ObjRef) => Promise<IDashboardPermissions>;
    private processFilterContextUpdate;
    private updateFilterContext;
    private getFilterContext;
    private prepareFilterContext;
}
//# sourceMappingURL=index.d.ts.map