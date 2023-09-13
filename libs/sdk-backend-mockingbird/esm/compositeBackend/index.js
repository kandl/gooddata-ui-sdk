// (C) 2019-2023 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { invariant } from "ts-invariant";
/**
 * Creates a composite backend from one or more other test backends, each serving a test data for different
 * workspace. Composite backend will delegate all workspace services to the instance of backend which declares
 * that it has data for that workspace. If no backend is found during lookup, composite backend will fall-back to
 * the first backend on the list and whatever happens, happens (NO_DATA etc).
 *
 * For all other services available on the top-level backend API, the composite backend delegates to the first backend
 * on the list.
 *
 * Note on backend capabilities: the composite backend will inherit capabilities from the first backend component. It
 * will not do any other processing in regards to capabilities. This can potentially be limiting and breaking in
 * situations when the backend is composed from multiple different implementations, each with different capabilities.
 *
 * @param components - backends to compose from, must contain at least one backend
 * @internal
 */
export function compositeBackend(...components) {
    invariant(components.length > 0, "composite backend can be created from at least one other backend");
    const primaryBackend = components[0].backend;
    const config = primaryBackend.config;
    const backend = {
        capabilities: primaryBackend.capabilities,
        config,
        onHostname(_hostname) {
            return backend;
        },
        withTelemetry(_component, _props) {
            return backend;
        },
        withAuthentication(_) {
            return this;
        },
        organization(organizationId) {
            return primaryBackend.organization(organizationId);
        },
        organizations() {
            return primaryBackend.organizations();
        },
        currentUser() {
            return primaryBackend.currentUser();
        },
        workspace(id) {
            var _a, _b;
            const targetBackend = (_b = (_a = components.find((b) => b.workspace === id)) === null || _a === void 0 ? void 0 : _a.backend) !== null && _b !== void 0 ? _b : primaryBackend;
            return targetBackend.workspace(id);
        },
        workspaces() {
            throw new NotSupported("not supported");
        },
        authenticate() {
            return primaryBackend.authenticate();
        },
        deauthenticate() {
            return primaryBackend.deauthenticate();
        },
        isAuthenticated() {
            return primaryBackend.isAuthenticated();
        },
        entitlements() {
            return primaryBackend.entitlements();
        },
    };
    return backend;
}
//# sourceMappingURL=index.js.map