// (C) 2019-2021 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
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
export class AuthProviderCallGuard {
    constructor(realProvider) {
        this.realProvider = realProvider;
        this.reset = () => {
            this.principal = undefined;
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.initializeClient = (client) => {
            var _a, _b;
            (_b = (_a = this.realProvider).initializeClient) === null || _b === void 0 ? void 0 : _b.call(_a, client);
        };
        this.onNotAuthenticated = (context, error) => {
            var _a, _b;
            (_b = (_a = this.realProvider).onNotAuthenticated) === null || _b === void 0 ? void 0 : _b.call(_a, context, error);
        };
        this.authenticate = (context) => {
            if (this.principal) {
                return Promise.resolve(this.principal);
            }
            if (this.inflightRequest) {
                return this.inflightRequest;
            }
            this.inflightRequest = this.realProvider
                .authenticate(context)
                .then((res) => {
                this.principal = res;
                this.inflightRequest = undefined;
                return res;
            })
                .catch((err) => {
                this.inflightRequest = undefined;
                throw err;
            });
            return this.inflightRequest;
        };
    }
    getCurrentPrincipal(context) {
        return this.realProvider.getCurrentPrincipal(context);
    }
    async deauthenticate(context) {
        return this.realProvider.deauthenticate(context);
    }
}
/**
 * This implementation serves as a Null object for IAuthProviderCallGuard.
 *
 * @internal
 */
export class NoopAuthProvider {
    authenticate(_context) {
        throw new NotSupported("NoopAuthProvider does not support authenticate");
    }
    getCurrentPrincipal(_context) {
        throw new NotSupported("NoopAuthProvider does not support getCurrentPrincipal");
    }
    deauthenticate(_context) {
        throw new NotSupported("NoopAuthProvider does not support deauthenticate");
    }
    reset() {
        throw new NotSupported("NoopAuthProvider does not support reset");
    }
}
export const AnonymousUser = {
    userId: "anonymous",
};
/**
 * This is a noop implementation of authentication provider - it does nothing and assumes anonymous user.
 *
 * @public
 */
export class AnonymousAuthProvider {
    authenticate(_context) {
        return Promise.resolve(AnonymousUser);
    }
    getCurrentPrincipal(_context) {
        return Promise.resolve(AnonymousUser);
    }
    deauthenticate(_context) {
        return Promise.resolve();
    }
    reset() {
        return;
    }
}
//# sourceMappingURL=auth.js.map