import { invariant } from "ts-invariant";
import { NotAuthenticated, } from "@gooddata/sdk-backend-spi";
/**
 * Base for other IAuthenticationProvider implementations.
 *
 * @public
 */
export class BearAuthProviderBase {
    async deauthenticate(context) {
        const sdk = context.client;
        // we do not return the promise to logout as we do not want to return the response
        await sdk.user.logout();
    }
    async getCurrentPrincipal(context) {
        if (!this.principal) {
            await this.obtainCurrentPrincipal(context);
        }
        return this.principal || null;
    }
    async obtainCurrentPrincipal(context) {
        const sdk = context.client;
        const currentProfile = await sdk.user.getCurrentProfile();
        this.principal = {
            userId: currentProfile.login,
            userMeta: currentProfile,
        };
    }
}
/**
 * This implementation of authentication provider does login with fixed username and password.
 *
 * @public
 */
export class FixedLoginAndPasswordAuthProvider extends BearAuthProviderBase {
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }
    async authenticate(context) {
        const sdk = context.client;
        await sdk.user.login(this.username, this.password);
        await this.obtainCurrentPrincipal(context);
        invariant(this.principal, "Principal must be obtainable after login");
        return this.principal;
    }
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
export class ContextDeferredAuthProvider extends BearAuthProviderBase {
    constructor(notAuthenticatedHandler) {
        super();
        this.notAuthenticatedHandler = notAuthenticatedHandler;
        this.onNotAuthenticated = (context, error) => {
            var _a;
            (_a = this.notAuthenticatedHandler) === null || _a === void 0 ? void 0 : _a.call(this, context, error);
        };
    }
    async authenticate(context) {
        const sdk = context.client;
        // check if the user is logged in, implicitly triggering token renewal in case it is needed
        const isLoggedIn = await sdk.user.isLoggedIn();
        if (!isLoggedIn) {
            throw new NotAuthenticated("Please make sure the context is already authenticated when using ContextDeferredAuthProvider");
        }
        await this.obtainCurrentPrincipal(context);
        invariant(this.principal, "Principal must be obtainable after login");
        return this.principal;
    }
}
const AnonymousUser = {
    userId: "anonymous",
};
/**
 * This is a noop implementation of bear authentication provider - it does nothing and assumes anonymous user.
 *
 * @public
 */
export class AnonymousAuthProvider {
    async authenticate(context) {
        var _a;
        const user = await context.client.user.getCurrentProfile();
        return Promise.resolve(Object.assign(Object.assign({}, AnonymousUser), { userMeta: {
                links: {
                    // we need the actual self link of the user from the proxy, this is needed by some of the API calls
                    self: (_a = user.links) === null || _a === void 0 ? void 0 : _a.self,
                },
            } }));
    }
    getCurrentPrincipal(_context) {
        return Promise.resolve(null);
    }
    deauthenticate(_context) {
        return Promise.resolve();
    }
    reset() {
        return;
    }
}
//# sourceMappingURL=auth.js.map