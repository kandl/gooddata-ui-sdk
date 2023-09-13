import { IAnalyticalWorkspace, IExecutionFactory, IWorkspaceSettingsService, IWorkspaceStylingService, IWorkspaceCatalogFactory, IWorkspacePermissionsService, IWorkspaceInsightsService, IWorkspaceDatasetsService, IWorkspaceDashboardsService, IWorkspaceUsersQuery, IDateFilterConfigsQuery, IWorkspaceAttributesService, IWorkspaceMeasuresService, IWorkspaceFactsService, IWorkspaceDescriptor, IWorkspaceUserGroupsQuery, IWorkspaceAccessControlService } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
import { DateFormatter } from "../../convertors/fromBackend/dateFormatting/types.js";
export declare class TigerWorkspace implements IAnalyticalWorkspace {
    private readonly authCall;
    readonly workspace: string;
    private readonly dateFormatter;
    private readonly descriptor?;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string, dateFormatter: DateFormatter, descriptor?: IWorkspaceDescriptor | undefined);
    getDescriptor(): Promise<IWorkspaceDescriptor>;
    getParentWorkspace(): Promise<IAnalyticalWorkspace | undefined>;
    attributes(): IWorkspaceAttributesService;
    execution(): IExecutionFactory;
    settings(): IWorkspaceSettingsService;
    insights(): IWorkspaceInsightsService;
    dashboards(): IWorkspaceDashboardsService;
    measures(): IWorkspaceMeasuresService;
    facts(): IWorkspaceFactsService;
    styling(): IWorkspaceStylingService;
    catalog(): IWorkspaceCatalogFactory;
    datasets(): IWorkspaceDatasetsService;
    permissions(): IWorkspacePermissionsService;
    users(): IWorkspaceUsersQuery;
    userGroups(): IWorkspaceUserGroupsQuery;
    accessControl(): IWorkspaceAccessControlService;
    dateFilterConfigs(): IDateFilterConfigsQuery;
}
//# sourceMappingURL=index.d.ts.map