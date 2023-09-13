export class TigerWorkspacePermissionsFactory {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getPermissionsForCurrentUser() {
        var _a;
        const response = await this.authCall((client) => client.entities.getEntityWorkspaces({ id: this.workspace, metaInclude: ["permissions"] }));
        // NOTE: From tiger backend there are permissions like MANAGE, ANALYZE, VIEW. Keep on mind that
        // NOTE: if user has MANAGE permissions, there will be also ANALYZE and VIEW in permissions array.
        const permissions = (_a = response.data.data.meta.permissions) !== null && _a !== void 0 ? _a : [];
        const { canViewWorkspace, canAnalyzeWorkspace, canManageWorkspace, canExportReport, canExportTabular, canExportPdf, } = getPermission(permissions);
        return {
            //disabled for tiger for now
            canCreateReport: false,
            canUploadNonProductionCSV: false,
            canManageACL: false,
            canManageDomain: false,
            canInviteUserToProject: false,
            canCreateScheduledMail: false,
            canManageScheduledMail: false,
            canListUsersInProject: false,
            //based on group: VIEW
            canAccessWorkbench: canViewWorkspace,
            canExecuteRaw: canViewWorkspace,
            //based on group: ANALYZE
            canCreateVisualization: canAnalyzeWorkspace,
            canManageAnalyticalDashboard: canAnalyzeWorkspace,
            canCreateAnalyticalDashboard: canAnalyzeWorkspace,
            canManageMetric: canAnalyzeWorkspace,
            canManageReport: canAnalyzeWorkspace,
            canRefreshData: canAnalyzeWorkspace,
            //based on group: MANAGE
            canManageProject: canManageWorkspace,
            //NOTE: Data source MANAGE in future
            canInitData: canManageWorkspace,
            //export
            canExportReport,
            canExportTabular: canExportTabular || canExportReport,
            canExportPdf: canExportPdf || canExportReport,
        };
    }
}
function getPermission(permissions) {
    const canViewWorkspace = hasPermission(permissions, "VIEW");
    const canAnalyzeWorkspace = hasPermission(permissions, "ANALYZE");
    const canManageWorkspace = hasPermission(permissions, "MANAGE");
    const canExportReport = hasPermission(permissions, "EXPORT");
    const canExportTabular = hasPermission(permissions, "EXPORT_TABULAR");
    const canExportPdf = hasPermission(permissions, "EXPORT_PDF");
    return {
        canViewWorkspace,
        canAnalyzeWorkspace,
        canManageWorkspace,
        canExportReport,
        canExportTabular,
        canExportPdf,
    };
}
function hasPermission(permissions, need) {
    return permissions.indexOf(need) >= 0;
}
//# sourceMappingURL=index.js.map