import { IAuthenticationContext, IAuthenticatedPrincipal, IAuthenticationProvider, NotAuthenticated, NotAuthenticatedHandler } from "@gooddata/sdk-backend-spi";
/**
 * Base for other IAuthenticationProvider implementations.
 *
 * @public
 */
export declare abstract class BearAuthProviderBase implements IAuthenticationProvider {
    protected principal: IAuthenticatedPrincipal | undefined;
    abstract authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    deauthenticate(context: IAuthenticationContext): Promise<void>;
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    protected obtainCurrentPrincipal(context: IAuthenticationContext): Promise<void>;
}
/**
 * This implementation of authentication provider does login with fixed username and password.
 *
 * @public
 */
export declare class FixedLoginAndPasswordAuthProvider extends BearAuthProviderBase implements IAuthenticationProvider {
    private readonly username;
    private readonly password;
    constructor(username: string, password: string);
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
}
/**
 * This implementation of authentication provider defers the responsibility for performing authentication
 * to the context in which it exists.
 *
 * @remarks
 * In other words it expects that the application will take care of driving
 * the authentication and creating a correct session in which the Bear backend can make authenticated calls.
 *
 * You may use the provider's ability to use passed `NotAuthenticatedHandler` function. This will be called
 * every time a NotAuthenticated error is raised by the backend. Your application can pass a custom handler of
 * this event - typically something that will start driving the authentication from a single place.
 *
 * Note: the not authenticated handler MAY be called many times in succession so you may want to wrap it in a
 * call guard or in a debounce.
 *
 * @public
 */
export declare class ContextDeferredAuthProvider extends BearAuthProviderBase implements IAuthenticationProvider {
    private readonly notAuthenticatedHandler?;
    constructor(notAuthenticatedHandler?: NotAuthenticatedHandler | undefined);
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
}
/**
 * This is a noop implementation of bear authentication provider - it does nothing and assumes anonymous user.
 *
 * @public
 */
export declare class AnonymousAuthProvider implements IAuthenticationProvider {
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(_context: IAuthenticationContext): Promise<void>;
    reset(): void;
}
//# sourceMappingURL=auth.d.ts.map