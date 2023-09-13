// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
class BackendWithDecoratedServices {
    constructor(backend, factories = {}) {
        this.decorated = backend;
        this.factories = factories;
        this.capabilities = backend.capabilities;
        this.config = backend.config;
    }
    authenticate(force) {
        return this.decorated.authenticate(force);
    }
    deauthenticate() {
        return this.decorated.deauthenticate();
    }
    isAuthenticated() {
        return this.decorated.isAuthenticated();
    }
    onHostname(hostname) {
        return new BackendWithDecoratedServices(this.decorated.onHostname(hostname), this.factories);
    }
    withAuthentication(provider) {
        return new BackendWithDecoratedServices(this.decorated.withAuthentication(provider), this.factories);
    }
    withTelemetry(componentName, props) {
        return new BackendWithDecoratedServices(this.decorated.withTelemetry(componentName, props), this.factories);
    }
    organization(organizationId) {
        return new OrganizationDecorator(this.decorated.organization(organizationId), this.factories);
    }
    organizations() {
        return new OrganizationsDecorator(this.decorated.organizations(), this.factories);
    }
    currentUser() {
        return this.decorated.currentUser();
    }
    workspace(id) {
        return new AnalyticalWorkspaceDecorator(this.decorated.workspace(id), this.factories);
    }
    entitlements() {
        return this.decorated.entitlements();
    }
    workspaces() {
        return this.decorated.workspaces();
    }
}
class AnalyticalWorkspaceDecorator {
    constructor(decorated, factories) {
        this.decorated = decorated;
        this.factories = factories;
        this.workspace = decorated.workspace;
    }
    getDescriptor() {
        return this.decorated.getDescriptor();
    }
    getParentWorkspace() {
        return this.decorated.getParentWorkspace();
    }
    attributes() {
        const { attributes } = this.factories;
        if (attributes) {
            return attributes(this.decorated.attributes(), this.workspace);
        }
        return this.decorated.attributes();
    }
    execution() {
        const { execution } = this.factories;
        if (execution) {
            return execution(this.decorated.execution());
        }
        return this.decorated.execution();
    }
    catalog() {
        const { catalog } = this.factories;
        if (catalog) {
            return catalog(this.decorated.catalog());
        }
        return this.decorated.catalog();
    }
    measures() {
        return this.decorated.measures();
    }
    facts() {
        return this.decorated.facts();
    }
    insights() {
        return this.decorated.insights();
    }
    dashboards() {
        const { dashboards } = this.factories;
        if (dashboards) {
            return dashboards(this.decorated.dashboards(), this.workspace);
        }
        return this.decorated.dashboards();
    }
    settings() {
        const { workspaceSettings } = this.factories;
        if (workspaceSettings) {
            return workspaceSettings(this.decorated.settings(), this.workspace);
        }
        return this.decorated.settings();
    }
    styling() {
        return this.decorated.styling();
    }
    datasets() {
        return this.decorated.datasets();
    }
    permissions() {
        return this.decorated.permissions();
    }
    users() {
        return this.decorated.users();
    }
    dateFilterConfigs() {
        return this.decorated.dateFilterConfigs();
    }
    userGroups() {
        return this.decorated.userGroups();
    }
    accessControl() {
        return this.decorated.accessControl();
    }
}
class OrganizationDecorator {
    constructor(decorated, factories) {
        this.decorated = decorated;
        this.factories = factories;
        this.organizationId = decorated.organizationId;
    }
    getDescriptor() {
        return this.decorated.getDescriptor();
    }
    securitySettings() {
        const { securitySettings } = this.factories;
        if (securitySettings) {
            return securitySettings(this.decorated.securitySettings());
        }
        return this.decorated.securitySettings();
    }
    styling() {
        return this.decorated.styling();
    }
    settings() {
        return this.decorated.settings();
    }
}
class OrganizationsDecorator {
    constructor(decorated, factories) {
        this.decorated = decorated;
        this.factories = factories;
    }
    async getCurrentOrganization() {
        const fromDecorated = await this.decorated.getCurrentOrganization();
        return new OrganizationDecorator(fromDecorated, this.factories);
    }
}
/**
 * Decorated backend is a wrapper of any other backend implementations that can be used to enrich
 * functionality of the services that the wrapped backend normally provides.
 *
 * It can be for instance used to decorate execution factories and in conjunction with {@link DecoratedPreparedExecution}
 * also create decorated prepared executions.
 *
 * @param backend - instance of backend to decorate
 * @param decorators - configuration for the decorations
 * @returns new decorated backend
 * @alpha
 */
export function decoratedBackend(backend, decorators) {
    if (isEmpty(decorators)) {
        return backend;
    }
    return new BackendWithDecoratedServices(backend, decorators);
}
//# sourceMappingURL=index.js.map