import { SDK } from "@gooddata/api-client-bear";
import { IAnalyticalBackendConfig, IAuthenticatedPrincipal, ErrorConverter, IBackendCapabilities, IAnalyticalBackend, IAnalyticalWorkspace, IAuthenticationProvider, IWorkspacesQueryFactory, IUserService, IOrganization, IOrganizations, IEntitlements } from "@gooddata/sdk-backend-spi";
import { IInsight } from "@gooddata/sdk-model";
import { IBootstrapResource, IProfileSetting, IUISettings, IVisualization, IWrappedProjectDashboard, WrappedObject } from "@gooddata/api-model-bear";
import { IAuthProviderCallGuard, AuthenticatedAsyncCall, TelemetryData } from "@gooddata/sdk-backend-base";
import { IDrillableItemsCommandBody } from "@gooddata/sdk-embedding";
/**
 * Client-specific configuration for the bear backend allows to specify additional telemetry information.
 *
 * @public
 */
export type BearBackendConfig = {
    /**
     * Name of frontend package, this will be recorded by backend as initiator of HTTP requests.
     */
    packageName?: string;
    /**
     * Version of the frontend package, this will be recorded by backend as initiator of HTTP requests.
     */
    packageVersion?: string;
};
/**
 * BearBackend-specific legacy functions.
 * Do not use these functions to implement any new functionality! These are here only to support certain
 * legacy cases where migration to proper sdk-backend-spi API is not feasible/wanted.
 */
type BearLegacyFunctions = {
    openAsReport?(workspace: string, insight: IInsight): Promise<string>;
    getBootstrapResource?(options: {
        projectId?: string;
        productId?: string;
        clientId?: string;
        loadAnalyticalDashboards?: boolean;
    }): Promise<IBootstrapResource>;
    ajaxSetup?(setup: any): void;
    log?(uri: string, logMessages: string[]): Promise<any>;
    updateProfileCurrentWorkspace?(workspace: string, profileSetting: IProfileSetting): Promise<void>;
    sanitizeDrillingActivationPostMessageData?(workspace: string, postMessageData: IDrillableItemsCommandBody): Promise<IDrillableItemsCommandBody>;
    getProjectDashboards?(workspace: string): Promise<IWrappedProjectDashboard[]>;
    getUrisFromIdentifiers?(workspace: string, identifiers: string[]): Promise<{
        uri: string;
        identifier: string;
    }[]>;
    getObjectsByUri?(workspace: string, uris: string[]): Promise<WrappedObject[]>;
    getVisualizationObject?(workspace: string, uri: string): Promise<IVisualization>;
    getUISettings?(): Promise<{
        settings: IUISettings;
    }>;
    isDomainAdmin?(domainUri: string): Promise<boolean>;
};
/**
 * Provides a way for the BearBackend to expose some of its backend specific functions.
 */
type LegacyFunctionsSubscription = {
    onLegacyFunctionsReady?(functions: BearLegacyFunctions): void;
};
/**
 * Provides a way to specify legacy settings when creating a new instance.
 */
type LegacySetup = {
    ajaxSettings?: any;
};
/**
 * Provides a way to use custom factory for creating SDK instances.
 */
type FactoryFunction = {
    factory?: (config?: any) => SDK;
};
/**
 * This implementation of analytical backend uses the gooddata-js API client to realize the SPI.
 *
 * The only thing worth noting about this impl is the handling of SDK instance creation and authentication:
 *
 * - New instance of SDK is created for each instance of BearBackend; new instance of BearBackend is created
 *   every time onHostname, withCredentials or withTelemetry methods are called (similar to how we did it
 *   so far with the clone())
 *
 * - Authentication (login) WILL be done every time credentials are provided using the
 *   withCredentials. No other methods in the bear backend lead to login.
 *
 * - Authentication is done at construction time; the constructor MAY receive an instance of deferred authentication -
 *   this is to cater for cases when withCredentials is called, new instance of backend is returned and then
 *   someone calls withTelemetry on this instance ⇒ in that case there is no need to re-initiate login.
 *
 */
export declare class BearBackend implements IAnalyticalBackend {
    readonly capabilities: IBackendCapabilities;
    readonly config: IAnalyticalBackendConfig;
    private readonly telemetry;
    private readonly implConfig;
    private readonly authProvider;
    private readonly sdk;
    private lastAjaxSetupSettings;
    constructor(config?: IAnalyticalBackendConfig, implConfig?: BearBackendConfig & LegacyFunctionsSubscription & FactoryFunction & LegacySetup, telemetry?: TelemetryData, authProvider?: IAuthProviderCallGuard);
    onHostname(hostname: string): IAnalyticalBackend;
    withTelemetry(componentName: string, props: object): IAnalyticalBackend;
    withAuthentication(provider: IAuthenticationProvider): IAnalyticalBackend;
    isAuthenticated: () => Promise<IAuthenticatedPrincipal | null>;
    authenticate: (force: boolean) => Promise<IAuthenticatedPrincipal>;
    deauthenticate(): Promise<void>;
    organization(organizationId: string): IOrganization;
    organizations(): IOrganizations;
    entitlements(): IEntitlements;
    currentUser(): IUserService;
    workspace(id: string): IAnalyticalWorkspace;
    workspaces(): IWorkspacesQueryFactory;
    /**
     * Perform API call that requires authentication. The call will be decorated with error handling
     * such that not authenticated errors will trigger authentication flow AND other errors will be
     * converted using the provided converter and throw.
     *
     * @param call - a call which requires an authenticated session
     * @param errorConverter - converter from rest client errors to analytical backend errors
     */
    authApiCall: <T>(call: AuthenticatedAsyncCall<SDK, T>, errorConverter?: ErrorConverter) => Promise<T>;
    private getAuthenticationContext;
    private triggerAuthentication;
    /**
     * Triggers onNotAuthenticated handler of the the authProvider if the provided error is an instance
     * of {@link @gooddata/sdk-backend-spi#NotAuthenticated}.
     *
     * @param err - error to observe and trigger handler for
     * @returns the original error to facilitate re-throwing
     */
    private handleNotAuthenticated;
    private getAsyncCallContext;
}
export {};
//# sourceMappingURL=index.d.ts.map