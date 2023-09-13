import { IAuthenticatedPrincipal, IAuthenticationContext, ErrorConverter, IAuthenticationProvider, NotAuthenticated } from "@gooddata/sdk-backend-spi";
/**
 * Authenticated async call context
 *
 * @beta
 */
export interface IAuthenticatedAsyncCallContext {
    /**
     * Returns the currently authenticated principal.
     * Calling this function MAY trigger the authentication flow in case the current session
     * is not yet authenticated and the principal is unknown.
     * If the authentication flow fails, the NotAuthenticated error is thrown.
     */
    getPrincipal(): Promise<IAuthenticatedPrincipal>;
}
/**
 * Authenticated async call
 *
 * @beta
 */
export type AuthenticatedAsyncCall<TSdk, TReturn> = (sdk: TSdk, context: IAuthenticatedAsyncCallContext) => Promise<TReturn>;
/**
 * Authenticated call guard
 *
 * @beta
 */
export type AuthenticatedCallGuard<TSdk = any> = <TReturn>(call: AuthenticatedAsyncCall<TSdk, TReturn>, errorConverter?: ErrorConverter) => Promise<TReturn>;
/**
 * see AuthProviderCallGuard
 * @public
 */
export interface IAuthProviderCallGuard extends IAuthenticationProvider {
    reset(): void;
}
/**
 * This implementation of auth provider ensures, that the auth provider is called exactly once in the happy path
 * execution where provider successfully authenticates a principal.
 *
 * If underlying provider fails, subsequent calls that need authentication will land in the provider.
 *
 * This class encapsulates the stateful nature of interaction of the provider across multiple different instances
 * of the bear backend, all of which are set with the same provider. All instances of the backend should be
 * subject to the same authentication flow AND the call to the authentication provider should be synchronized
 * through this scoped instance.
 *
 * @internal
 */
export declare class AuthProviderCallGuard implements IAuthProviderCallGuard {
    private readonly realProvider;
    private inflightRequest;
    private principal;
    constructor(realProvider: IAuthenticationProvider);
    reset: () => void;
    initializeClient: (client: any) => void;
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate: (context: IAuthenticationContext) => Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(context: IAuthenticationContext): Promise<void>;
}
/**
 * This implementation serves as a Null object for IAuthProviderCallGuard.
 *
 * @internal
 */
export declare class NoopAuthProvider implements IAuthProviderCallGuard {
    authenticate(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(_context: IAuthenticationContext): Promise<void>;
    reset(): void;
}
export declare const AnonymousUser: IAuthenticatedPrincipal;
/**
 * This is a noop implementation of authentication provider - it does nothing and assumes anonymous user.
 *
 * @public
 */
export declare class AnonymousAuthProvider implements IAuthProviderCallGuard {
    authenticate(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(_context: IAuthenticationContext): Promise<void>;
    reset(): void;
}
//# sourceMappingURL=auth.d.ts.map