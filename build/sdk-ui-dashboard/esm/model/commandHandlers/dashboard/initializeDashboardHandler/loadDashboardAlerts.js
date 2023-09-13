export function loadDashboardAlerts(ctx) {
    const { backend, workspace, dashboardRef } = ctx;
    // no need to load anything if the backend does not support setting the alerts in the first place
    if (!backend.capabilities.supportsKpiWidget) {
        return Promise.resolve([]);
    }
    return backend.workspace(workspace).dashboards().getDashboardWidgetAlertsForCurrentUser(dashboardRef);
}
//# sourceMappingURL=loadDashboardAlerts.js.map