export function loadDashboardPermissions(ctx) {
    const { backend, workspace, dashboardRef } = ctx;
    return backend.workspace(workspace).dashboards().getDashboardPermissions(dashboardRef);
}
//# sourceMappingURL=loadDashboardPermissions.js.map