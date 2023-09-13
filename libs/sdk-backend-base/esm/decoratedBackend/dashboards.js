/**
 * @alpha
 */
export class DecoratedWorkspaceDashboardsService {
    constructor(decorated, workspace) {
        this.decorated = decorated;
        this.workspace = workspace;
    }
    getDashboards(options) {
        return this.decorated.getDashboards(options);
    }
    getDashboard(ref, filterContextRef, options) {
        return this.decorated.getDashboard(ref, filterContextRef, options);
    }
    getDashboardWithReferences(ref, filterContextRef, options, types) {
        return this.decorated.getDashboardWithReferences(ref, filterContextRef, options, types);
    }
    getDashboardReferencedObjects(dashboard, types) {
        return this.decorated.getDashboardReferencedObjects(dashboard, types);
    }
    createDashboard(dashboard) {
        return this.decorated.createDashboard(dashboard);
    }
    updateDashboard(dashboard, updatedDashboard) {
        return this.decorated.updateDashboard(dashboard, updatedDashboard);
    }
    deleteDashboard(ref) {
        return this.decorated.deleteDashboard(ref);
    }
    exportDashboardToPdf(ref, filters) {
        return this.decorated.exportDashboardToPdf(ref, filters);
    }
    createScheduledMail(scheduledMail, exportFilterContext) {
        return this.decorated.createScheduledMail(scheduledMail, exportFilterContext);
    }
    updateScheduledMail(ref, scheduledMailDefinition, filterContextRef) {
        return this.decorated.updateScheduledMail(ref, scheduledMailDefinition, filterContextRef);
    }
    deleteScheduledMail(ref) {
        return this.decorated.deleteScheduledMail(ref);
    }
    getScheduledMailsForDashboard(ref, options) {
        return this.decorated.getScheduledMailsForDashboard(ref, options);
    }
    getScheduledMailsCountForDashboard(ref) {
        return this.decorated.getScheduledMailsCountForDashboard(ref);
    }
    getAllWidgetAlertsForCurrentUser() {
        return this.decorated.getAllWidgetAlertsForCurrentUser();
    }
    getDashboardWidgetAlertsForCurrentUser(ref) {
        return this.decorated.getDashboardWidgetAlertsForCurrentUser(ref);
    }
    getWidgetAlertsCountForWidgets(refs) {
        return this.decorated.getWidgetAlertsCountForWidgets(refs);
    }
    createWidgetAlert(alert) {
        return this.decorated.createWidgetAlert(alert);
    }
    updateWidgetAlert(alert) {
        return this.decorated.updateWidgetAlert(alert);
    }
    deleteWidgetAlert(ref) {
        return this.decorated.deleteWidgetAlert(ref);
    }
    deleteWidgetAlerts(refs) {
        return this.decorated.deleteWidgetAlerts(refs);
    }
    getWidgetReferencedObjects(widget, types) {
        return this.decorated.getWidgetReferencedObjects(widget, types);
    }
    getResolvedFiltersForWidget(widget, filters) {
        return this.decorated.getResolvedFiltersForWidget(widget, filters);
    }
    getDashboardPlugins(options) {
        return this.decorated.getDashboardPlugins(options);
    }
    getDashboardPlugin(ref, options) {
        return this.decorated.getDashboardPlugin(ref, options);
    }
    createDashboardPlugin(plugin) {
        return this.decorated.createDashboardPlugin(plugin);
    }
    deleteDashboardPlugin(ref) {
        return this.decorated.deleteDashboardPlugin(ref);
    }
    getDashboardPermissions(ref) {
        return this.decorated.getDashboardPermissions(ref);
    }
    validateDashboardsExistence(dashboardRefs) {
        return this.decorated.validateDashboardsExistence(dashboardRefs);
    }
}
//# sourceMappingURL=dashboards.js.map