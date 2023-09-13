import { IAnalyticalWorkspace, IExecutionFactory, IWorkspaceSettingsService, IWorkspaceStylingService, IWorkspaceCatalogFactory, IWorkspaceDatasetsService, IWorkspacePermissionsService, IWorkspaceInsightsService, IWorkspaceDashboardsService, IWorkspaceUsersQuery, IDateFilterConfigsQuery, IWorkspaceAttributesService, IWorkspaceMeasuresService, IWorkspaceFactsService, IWorkspaceDescriptor, IWorkspaceUserGroupsQuery, IWorkspaceAccessControlService } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../types/auth.js";
export declare class BearWorkspace implements IAnalyticalWorkspace {
    private readonly authCall;
    readonly workspace: string;
    private readonly descriptor?;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string, descriptor?: IWorkspaceDescriptor | undefined);
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
    dateFilterConfigs(): IDateFilterConfigsQuery;
    userGroups(): IWorkspaceUserGroupsQuery;
    accessControl(): IWorkspaceAccessControlService;
}
//# sourceMappingURL=index.d.ts.map