import { IAuthenticatedPrincipal, IBackendCapabilities, IAnalyticalBackend, IAnalyticalWorkspace, IAuthenticationProvider, IUserService, IWorkspacesQueryFactory, IOrganization, IOrganizations, IEntitlements } from "@gooddata/sdk-backend-spi";
import { TelemetryData } from "../toolkit/backend.js";
import { IAuthProviderCallGuard } from "../toolkit/auth.js";
import { CustomBackendConfig } from "./config.js";
/**
 * @internal
 */
export declare class CustomBackend implements IAnalyticalBackend {
    private readonly telemetryData?;
    readonly capabilities: IBackendCapabilities;
    readonly config: CustomBackendConfig;
    private readonly authProvider;
    constructor(config: CustomBackendConfig, authProvider?: IAuthProviderCallGuard, telemetryData?: TelemetryData | undefined);
    onHostname: (hostname: string) => IAnalyticalBackend;
    withAuthentication: (provider: IAuthenticationProvider) => IAnalyticalBackend;
    authenticate: (force?: boolean) => Promise<IAuthenticatedPrincipal>;
    deauthenticate: () => Promise<void>;
    isAuthenticated: () => Promise<IAuthenticatedPrincipal | null>;
    withTelemetry: (componentName: string, props: object) => IAnalyticalBackend;
    workspace: (id: string) => IAnalyticalWorkspace;
    workspaces: () => IWorkspacesQueryFactory;
    currentUser: () => IUserService;
    organization: (_organizationId: string) => IOrganization;
    organizations: () => IOrganizations;
    entitlements: () => IEntitlements;
    private getAuthenticationContext;
    private authApiCall;
    private triggerAuthentication;
    private getAsyncCallContext;
}
/**
 * Creates an instance of backend which uses custom functions to calculate results. See {@link CustomBackendConfig}
 * to learn more on what and how should be customized.
 *
 * ---
 *
 * Authentication is handled according to the specification described in the IAnalyticalBackend SPI. The custom backend
 * can be set up with authentication provider which will realize the desired authentication mechanism.
 *
 * Unless explicitly told via forced authentication (see {@link IAnalyticalBackend#authenticate}), the custom backend
 * will defer authentication until it is actually needed. In order for the custom backend to recognize that authentication
 * is needed, the different providers must throw the `NotAuthenticated` error.
 *
 * @beta
 */
export declare function customBackend(config: CustomBackendConfig): IAnalyticalBackend;
//# sourceMappingURL=index.d.ts.map