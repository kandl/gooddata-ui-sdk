import { IAnalyticalBackendConfig, IBackendCapabilities, IAnalyticalBackend, IAnalyticalWorkspace, IAuthenticationProvider, IAuthenticatedPrincipal, IWorkspacesQueryFactory, IUserService, IOrganization, IOrganizations, IEntitlements } from "@gooddata/sdk-backend-spi";
import { TelemetryData, IAuthProviderCallGuard } from "@gooddata/sdk-backend-base";
import { DateFormatter } from "../convertors/fromBackend/dateFormatting/types.js";
import { TigerSpecificFunctions } from "./tigerSpecificFunctions.js";
/**
 * Client-specific configuration for the tiger backend allows to specify additional telemetry information.
 *
 * @public
 */
export type TigerBackendConfig = {
    /**
     * Name of frontend package, this will be recorded by backend as initiator of HTTP requests.
     */
    packageName?: string;
    /**
     * Version of the frontend package, this will be recorded by backend as initiator of HTTP requests.
     */
    packageVersion?: string;
    /**
     * Function used to format date values for a given granularity. It is given a parsed Date value and an appropriate granularity.
     * If not specified, a default date formatted will be used.
     */
    dateFormatter?: DateFormatter;
};
/**
 * Provides a way for the TigerBackend to expose some of its backend specific functions.
 */
type TigerSpecificFunctionsSubscription = {
    onTigerSpecificFunctionsReady?: (functions: TigerSpecificFunctions) => void;
    onContractExpired?: (tier: string) => void;
};
/**
 * An implementation of analytical backend for GoodData CloudNative (codename tiger).
 */
export declare class TigerBackend implements IAnalyticalBackend {
    readonly capabilities: IBackendCapabilities;
    readonly config: IAnalyticalBackendConfig;
    private readonly telemetry;
    private readonly implConfig;
    private readonly client;
    private readonly authProvider;
    private readonly dateFormatter;
    constructor(config?: IAnalyticalBackendConfig, implConfig?: TigerBackendConfig & TigerSpecificFunctionsSubscription, telemetry?: TelemetryData, authProvider?: IAuthProviderCallGuard);
    onHostname(hostname: string): IAnalyticalBackend;
    withTelemetry(componentName: string, props: object): IAnalyticalBackend;
    withAuthentication(provider: IAuthenticationProvider): IAnalyticalBackend;
    deauthenticate(): Promise<void>;
    organization(organizationId: string): IOrganization;
    organizations(): IOrganizations;
    entitlements(): IEntitlements;
    currentUser(): IUserService;
    workspace(id: string): IAnalyticalWorkspace;
    workspaces(): IWorkspacesQueryFactory;
    isAuthenticated: () => Promise<IAuthenticatedPrincipal | null>;
    authenticate: (force: boolean) => Promise<IAuthenticatedPrincipal>;
    /**
     * Perform API call that requires authentication. The call will be decorated with error handling
     * such that not authenticated errors will trigger authentication flow AND other errors will be
     * converted using the provided converter and throw.
     *
     * @param call - a call which requires an authenticated session
     * @param errorConverter - converter from rest client errors to analytical backend errors
     */
    private authApiCall;
    /**
     * Triggers relevant handler if the provided error is an instance of
     * {@link @gooddata/sdk-backend-spi#NotAuthenticated} or {@link @gooddata/sdk-backend-spi#ContractExpired}.
     *
     * @param err - error to observe and trigger handler for
     * @returns the original error to facilitate re-throwing
     */
    private handleAnalyticalBackendError;
    private getAuthenticationContext;
    private getAsyncCallContext;
    private triggerAuthentication;
}
export {};
//# sourceMappingURL=index.d.ts.map