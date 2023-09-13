export function loadAccessibleDashboardList(ctx) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().getDashboards({ includeAvailableViaLink: true });
}
//# sourceMappingURL=loadAccessibleDashboardList.js.map