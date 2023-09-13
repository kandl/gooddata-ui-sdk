export function loadDashboardList(ctx) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().getDashboards();
}
//# sourceMappingURL=loadDashboardList.js.map