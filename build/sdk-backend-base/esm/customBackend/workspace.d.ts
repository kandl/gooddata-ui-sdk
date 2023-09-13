import { IAnalyticalWorkspace, IExecutionFactory, IWorkspaceCatalogFactory, IWorkspaceDashboardsService, IWorkspaceDatasetsService, IWorkspaceInsightsService, IWorkspaceAttributesService, IWorkspaceMeasuresService, IWorkspaceFactsService, IWorkspacePermissionsService, IWorkspaceSettingsService, IWorkspaceStylingService, IWorkspaceUsersQuery, IDateFilterConfigsQuery, IWorkspaceDescriptor, IWorkspaceUserGroupsQuery, IWorkspaceAccessControlService } from "@gooddata/sdk-backend-spi";
import { CustomBackendConfig, CustomBackendState } from "./config.js";
/**
 * @internal
 */
export declare class CustomWorkspace implements IAnalyticalWorkspace {
    readonly workspace: string;
    private readonly config;
    private readonly state;
    constructor(workspace: string, config: CustomBackendConfig, state: CustomBackendState);
    getDescriptor(): Promise<IWorkspaceDescriptor>;
    getParentWorkspace(): Promise<IAnalyticalWorkspace | undefined>;
    execution(): IExecutionFactory;
    attributes(): IWorkspaceAttributesService;
    settings(): IWorkspaceSettingsService;
    styling(): IWorkspaceStylingService;
    permissions(): IWorkspacePermissionsService;
    catalog(): IWorkspaceCatalogFactory;
    measures(): IWorkspaceMeasuresService;
    facts(): IWorkspaceFactsService;
    datasets(): IWorkspaceDatasetsService;
    insights(): IWorkspaceInsightsService;
    dashboards(): IWorkspaceDashboardsService;
    users(): IWorkspaceUsersQuery;
    dateFilterConfigs(): IDateFilterConfigsQuery;
    userGroups(): IWorkspaceUserGroupsQuery;
    accessControl(): IWorkspaceAccessControlService;
}
//# sourceMappingURL=workspace.d.ts.map