import { TargetBackendType } from "./types.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { BackendCredentials } from "./credentials.js";
export type BackendConfig = {
    backend: TargetBackendType;
    hostname: string;
    credentials: BackendCredentials;
};
/**
 * Creates a new analytical backend according to the provided config.
 *
 * Note: this function assumes & does not check that the necessary props holding credentials/token are
 * set. It is responsibility of the caller to ensure that & properly communicate to the user via CLI
 * messages.
 */
export declare function createBackend(backendConfig: BackendConfig): IAnalyticalBackend;
//# sourceMappingURL=backend.d.ts.map