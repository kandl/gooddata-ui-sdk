import { IAnalyticalBackend, IExecutionFactory, IWorkspaceCatalogFactory, IWorkspaceAttributesService, IWorkspaceSettingsService, IWorkspaceDashboardsService, ISecuritySettingsService } from "@gooddata/sdk-backend-spi";
/**
 * @alpha
 */
export type ExecutionDecoratorFactory = (executionFactory: IExecutionFactory) => IExecutionFactory;
/**
 * @alpha
 */
export type CatalogDecoratorFactory = (catalog: IWorkspaceCatalogFactory) => IWorkspaceCatalogFactory;
/**
 * @alpha
 */
export type SecuritySettingsDecoratorFactory = (securitySettings: ISecuritySettingsService) => ISecuritySettingsService;
/**
 * @alpha
 */
export type WorkspaceSettingsDecoratorFactory = (settings: IWorkspaceSettingsService, workspace: string) => IWorkspaceSettingsService;
/**
 * @alpha
 */
export type AttributesDecoratorFactory = (attributes: IWorkspaceAttributesService, workspace: string) => IWorkspaceAttributesService;
/**
 * @alpha
 */
export type DashboardsDecoratorFactory = (dashboards: IWorkspaceDashboardsService, workspace: string) => IWorkspaceDashboardsService;
/**
 * Provides factory functions for the different decorators (currently only supports execution
 * decorator). Input to each factory function is the original implementation from the wrapped backend, output
 * is whatever decorateur sees fit.
 *
 * @alpha
 */
export type DecoratorFactories = {
    execution?: ExecutionDecoratorFactory;
    catalog?: CatalogDecoratorFactory;
    securitySettings?: SecuritySettingsDecoratorFactory;
    workspaceSettings?: WorkspaceSettingsDecoratorFactory;
    attributes?: AttributesDecoratorFactory;
    dashboards?: DashboardsDecoratorFactory;
};
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
export declare function decoratedBackend(backend: IAnalyticalBackend, decorators: DecoratorFactories): IAnalyticalBackend;
//# sourceMappingURL=index.d.ts.map