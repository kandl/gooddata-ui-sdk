// (C) 2019-2023 GoodData Corporation
import { isNotAuthenticated, NotAuthenticated, NotSupported, } from "@gooddata/sdk-backend-spi";
import { AnonymousAuthProvider, AuthProviderCallGuard, } from "../toolkit/auth.js";
import { CustomWorkspace } from "./workspace.js";
//
//
//
/**
 * @internal
 */
export class CustomBackend {
    constructor(config, authProvider, telemetryData) {
        this.telemetryData = telemetryData;
        this.onHostname = (hostname) => {
            const newConfig = Object.assign(Object.assign({}, this.config), { hostname });
            return new CustomBackend(newConfig);
        };
        this.withAuthentication = (provider) => {
            const guardedAuthProvider = new AuthProviderCallGuard(provider);
            return new CustomBackend(this.config, guardedAuthProvider);
        };
        this.authenticate = (force) => {
            if (!this.authProvider) {
                return Promise.reject(new NotAuthenticated("Backend is not set up with authentication provider."));
            }
            if (force) {
                this.authProvider.reset();
            }
            return this.authProvider.authenticate(this.getAuthenticationContext());
        };
        this.deauthenticate = () => {
            return this.authProvider.deauthenticate(this.getAuthenticationContext());
        };
        this.isAuthenticated = () => {
            return this.authProvider.getCurrentPrincipal(this.getAuthenticationContext());
        };
        this.withTelemetry = (componentName, props) => {
            return new CustomBackend(this.config, this.authProvider, {
                componentName,
                props: Object.keys(props),
            });
        };
        this.workspace = (id) => {
            return new CustomWorkspace(id, this.config, {
                telemetry: this.telemetryData,
                authApiCall: this.authApiCall,
            });
        };
        this.workspaces = () => {
            throw new NotSupported("workspace listing is not supported");
        };
        this.currentUser = () => {
            throw new NotSupported("user service is not supported");
        };
        this.organization = (_organizationId) => {
            throw new NotSupported("organization is not supported");
        };
        this.organizations = () => {
            throw new NotSupported("organizations is not supported");
        };
        this.entitlements = () => {
            throw new NotSupported("entitlements are not supported");
        };
        this.getAuthenticationContext = (useClient) => {
            return {
                client: useClient || this.config.clientProvider(this.config),
                backend: this,
            };
        };
        this.authApiCall = async (call) => {
            // first, try it "normally"
            let result;
            const client = this.config.clientProvider(this.config);
            try {
                result = await call(client, await this.getAsyncCallContext(client));
            }
            catch (err) {
                if (!isNotAuthenticated(err)) {
                    throw err;
                }
                // in case there was a NotAuthenticated error, trigger auth and try once again
                try {
                    await this.triggerAuthentication(true, client);
                    result = await call(client, await this.getAsyncCallContext(client));
                }
                catch (err) {
                    if (!isNotAuthenticated(err)) {
                        throw err;
                    }
                    throw new NotAuthenticated("Current session is not authenticated.", err);
                }
            }
            return result;
        };
        this.triggerAuthentication = (reset = false, useClient) => {
            if (!this.authProvider) {
                return Promise.reject(new NotAuthenticated("Backend is not set up with authentication provider."));
            }
            if (reset) {
                this.authProvider.reset();
            }
            return this.authProvider.authenticate(this.getAuthenticationContext(useClient));
        };
        this.getAsyncCallContext = async (client) => {
            const getPrincipal = async () => {
                if (!this.authProvider) {
                    throw new NotAuthenticated("Cannot obtain principal without an authProvider.");
                }
                const principal = await this.authProvider.getCurrentPrincipal({ client, backend: this });
                if (principal) {
                    return principal;
                }
                return this.authProvider.authenticate(this.getAuthenticationContext(client));
            };
            return {
                getPrincipal,
            };
        };
        this.config = config;
        this.capabilities = {};
        this.authProvider = authProvider || new AnonymousAuthProvider();
    }
}
//
//
//
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
export function customBackend(config) {
    return new CustomBackend(config);
}
//# sourceMappingURL=index.js.map