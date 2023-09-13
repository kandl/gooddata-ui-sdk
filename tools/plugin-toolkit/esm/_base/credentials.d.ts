import { TargetBackendType } from "./types.js";
export type BackendCredentials = {
    /**
     * Value of GDC_USERNAME retrieved from the environment (files or process)
     */
    username: string | undefined;
    /**
     * Value of GDC_PASSWORD retrieved from the environment (files or process)
     */
    password: string | undefined;
    /**
     * Value of TIGER_API_TOKEN retrieved from the environment (files or process)
     */
    token: string | undefined;
};
export declare function createCredentialsFromEnv(env: Record<string, string>): BackendCredentials;
export declare function promptCredentials(backend: TargetBackendType): Promise<BackendCredentials>;
type CredentialsValidationError = "USERNAME_MISSING" | "PASSWORD_MISSING" | "TOKEN_MISSING";
/**
 * Validate that the gathered credentials provided on the input are complete in the context of the
 * specified backend type. For 'bear' both username & password must be specified. For 'tiger' only
 * token must be specified.
 *
 * If any essential prop is missing value - being undefined or empty, an appropriate validation error value is
 * returned. Otherwise, undefined is returned.
 *
 * @param backend - backend being targeted by the CLI
 * @param credentials - gathered credentials
 */
export declare function validateCredentialsComplete(backend: TargetBackendType, credentials: BackendCredentials): CredentialsValidationError | undefined;
/**
 * Validate that the gathered credentials provided on the input are complete in the context of the
 * specified backend type. For 'bear' both username & password must be specified. For 'tiger' only
 * token must be specified.
 *
 * If any essential prop is missing value - being undefined or empty, then InputValidationError flies. Otherwise
 * the function just returns.
 *
 * @param backend - backend being targeted by the CLI
 * @param credentials - gathered credentials
 */
export declare function completeCredentialsOrDie(backend: TargetBackendType, credentials: BackendCredentials): void;
export {};
//# sourceMappingURL=credentials.d.ts.map