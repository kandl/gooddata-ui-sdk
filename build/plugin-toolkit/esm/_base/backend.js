// (C) 2021 GoodData Corporation
import bearFactory, { FixedLoginAndPasswordAuthProvider } from "@gooddata/sdk-backend-bear";
import tigerFactory, { TigerTokenAuthProvider } from "@gooddata/sdk-backend-tiger";
/**
 * Creates a new analytical backend according to the provided config.
 *
 * Note: this function assumes & does not check that the necessary props holding credentials/token are
 * set. It is responsibility of the caller to ensure that & properly communicate to the user via CLI
 * messages.
 */
export function createBackend(backendConfig) {
    const { backend, hostname, credentials } = backendConfig;
    if (backend === "bear") {
        const { username, password } = credentials;
        return bearFactory({
            hostname,
        }).withAuthentication(new FixedLoginAndPasswordAuthProvider(username, password));
    }
    else {
        const { token } = credentials;
        return tigerFactory({
            hostname,
        }).withAuthentication(new TigerTokenAuthProvider(token));
    }
}
//# sourceMappingURL=backend.js.map