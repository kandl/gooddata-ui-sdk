import { AuthenticationFlow, IAnalyticalBackend, IAuthenticatedPrincipal, IAuthenticationContext, IAuthenticationProvider, NotAuthenticated, NotAuthenticatedHandler } from "@gooddata/sdk-backend-spi";
import { ITigerClient } from "@gooddata/api-client-tiger";
/**
 * Base for other IAuthenticationProvider implementations.
 *
 * @public
 */
export declare abstract class TigerAuthProviderBase implements IAuthenticationProvider {
    protected principal: IAuthenticatedPrincipal | undefined;
    abstract authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    deauthenticate(context: IAuthenticationContext): Promise<void>;
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    protected obtainCurrentPrincipal(context: IAuthenticationContext): Promise<void>;
    private loadProfile;
}
/**
 * This implementation of authentication provider uses an API Token as bearer of authentication.
 *
 * @remarks
 * You can provide token at construction time and it will be passed on all calls to Tiger APIs
 *
 * This is a go-to authentication provider for command-line applications. While nothing stops you from using
 * this provider in UI applications, keep in mind that this is discouraged due to security holes it leads to; having
 * the token hardcoded in a UI application means anyone can find it and use it for themselves.
 *
 * @public
 */
export declare class TigerTokenAuthProvider extends TigerAuthProviderBase {
    private apiToken;
    private readonly notAuthenticatedHandler?;
    private clients;
    constructor(apiToken: string, notAuthenticatedHandler?: NotAuthenticatedHandler | undefined);
    initializeClient(client: ITigerClient): void;
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    updateApiToken: (apiToken: string) => void;
}
/**
 * Callback that is used to set the new JWT value before original token expires.
 *
 * Optionally, the callback accepts the number of seconds before the token expiration in which
 * JwtIsAboutToExpireHandler will be called the next time. Expiration reminder will not be called
 * when value is not provided or it is not greater than zero.
 *
 * @alpha
 */
export type SetJwtCallback = (jwt: string, secondsBeforeTokenExpirationToCallReminder?: number) => void;
/**
 * Handler that will be called by a JWT authentication provider before the JWT
 * is about to expire. The handler will receive a method that can be used to set a new JWT value.
 *
 * The method throws an exception when the provided JWT is not for the same subject as the previously set
 * JWT (if such token was already set).
 *
 * @alpha
 */
export type JwtIsAboutToExpireHandler = (setJwt: SetJwtCallback) => void;
/**
 * The implementation of authentication provider uses an JWT (JSON Web Token) as bearer of authentication.
 *
 * @remarks
 * You can provide token at construction time, and it will be passed on all calls to Tiger APIs.
 *
 * Keep in mind that this authentication provider can lead to security holes; having
 * the token available as JavaScript variable in an UI application means anyone can find it and use it for
 * themselves while the token is valid. UI applications should prefer {@link ContextDeferredAuthProvider}
 * instead.
 *
 * @alpha
 */
export declare class TigerJwtAuthProvider extends TigerTokenAuthProvider {
    private jwt;
    private readonly tokenIsAboutToExpireHandler?;
    private secondsBeforeTokenExpirationToCallReminder;
    private expirationReminderId;
    /**
     * Create a new instance of TigerJwtAuthProvider
     *
     * @param jwt - The JSON Web Token value.
     * @param notAuthenticatedHandler - Optional handler called when auth provider encounters
     *  "non-authenticated" error (for example when session is no longer valid due to expired JWT).
     * @param tokenIsAboutToExpireHandler - Optional handler called when JWT is about to expire. The handler
     *  will receive function that can be used to set the new JWT to continue the current session.
     * @param secondsBeforeTokenExpirationToCallReminder - The number of seconds before token expiration to
     *  call tokenIsAboutToExpireHandler handler. The handler is called only when the value is positive number
     *  greater than zero and tokenIsAboutToExpireHandler handler value is provided.
     */
    constructor(jwt: string, notAuthenticatedHandler?: NotAuthenticatedHandler, tokenIsAboutToExpireHandler?: JwtIsAboutToExpireHandler | undefined, secondsBeforeTokenExpirationToCallReminder?: number);
    initializeClient(client: ITigerClient): void;
    /**
     * Update JWT value of the API client
     *
     * @param jwt - new JWT value
     * will receive function that can be used to set the new JWT to continue the current session.
     * @param secondsBeforeTokenExpirationToCallReminder - The number of seconds before token expiration to
     *  call tokenIsAboutToExpireHandler handler. The handler is called only when the value is positive number
     *  greater than zero and tokenIsAboutToExpireHandler handler value was provided during provider
     *  construction.
     *
     * @throws error is thrown when the method is called before client was initialized, if JWT is empty,
     *  or if JWT is not valid (if "sub" claim does not match the sub of the previous JWT).
     */
    updateJwt: (jwt: string, secondsBeforeTokenExpirationToCallReminder?: number) => void;
    private startReminder;
}
/**
 * This implementation of authentication provider defers the responsibility for performing authentication
 * to the context in which it exists.
 *
 * @remarks
 * In other words it expects that the application will take care of driving
 * the authentication and creating a correct session in which the Tiger backend can make authenticated calls.
 *
 * This is a go-to authentication provider for UI applications. The entire flow is as follows:
 *
 * -  The application that uses backend configured with this provider must expect that some of the backend
 *    calls with result in NotAuthenticated exception.
 *
 * -  The exception will contain `loginUrl` set to the URL on the current origin - this is location of the login page.
 *
 * -  The application must redirect the entire window to this URL appended with `redirectTo` query parameter.
 *
 * -  The value of this parameter is the application's URL that will be used as a return location.
 *
 * -  The login page will start and drive the OIDC authentication flow. Once the flow finishes and session
 *    is set up, the login page will redirect back to the application.
 *
 * You may use the provider's ability to use passed `NotAuthenticatedHandler` function. This will be called
 * every time a NotAuthenticated error is raised by the backend. Your application can pass a custom handler of
 * this event - typically something that will start driving the authentication from a single place.
 *
 * Note: the not authenticated handler MAY be called many times in succession so you may want to wrap it in a
 * call guard or in a debounce.
 *
 * See {@link redirectToTigerAuthentication} for implementation of the NotAuthenticated handler which
 * you may use with this provider.
 * @public
 */
export declare class ContextDeferredAuthProvider extends TigerAuthProviderBase {
    private readonly notAuthenticatedHandler?;
    constructor(notAuthenticatedHandler?: NotAuthenticatedHandler | undefined);
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
}
/**
 * Given tiger backend, authentication flow details and current location, this function creates URL where the
 * browser should redirect to start authentication flow with correct return address.
 *
 * @remarks
 * The current location is essential to determine whether the return redirect should contain absolute or
 * related return path:
 *
 * -  When running on same origin, then use relative path
 *
 * -  When running on different origin, then use absolute path
 *
 * @param backend - an instance of analytical backend
 * @param authenticationFlow - details about the tiger authentication flow
 * @param location - current location
 * @public
 */
export declare function createTigerAuthenticationUrl(backend: IAnalyticalBackend, authenticationFlow: AuthenticationFlow, location: Location): string;
/**
 * Given tiger backend and current location, this function creates URL where the
 * browser should redirect to start deauthentication (logout) flow.
 *
 * @remarks
 * The current location is essential to determine the URL should point:
 *
 * -  When running on same origin, then use relative path
 *
 * -  When running on different origin, then use absolute path to the proper origin
 *
 * @param backend - an instance of analytical backend
 * @param location - current location
 * @public
 */
export declare function createTigerDeauthenticationUrl(backend: IAnalyticalBackend, location: Location): string;
/**
 * Given authentication context and the authentication error, this implementation of `NotAuthenticatedHandler`
 * will redirect current window to location where Tiger authentication flow will start.
 *
 * @remarks
 * The location will be setup with correct return address so that when the flow finishes successfully, the
 * browser window will be redirected from whence it came.
 *
 * See also {@link createTigerAuthenticationUrl}; this function is used to construct the URL. You may use
 *  it when build your own handler.
 *
 * @param context - authentication context
 * @param error - not authenticated error, must contain the `authenticationFlow` information otherwise the
 *  handler just logs an error and does nothing
 * @public
 */
export declare function redirectToTigerAuthentication(context: IAuthenticationContext, error: NotAuthenticated): void;
//# sourceMappingURL=auth.d.ts.map