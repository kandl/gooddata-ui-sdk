import { TargetBackendType } from "./types.js";
/**
 * Load environment variables. This will read .env and .env.secrets files in the current directory. If GDC_USERNAME, GDC_PASSWORD
 * and TIGER_API_TOKEN are set as normal env variables, then they will be used.
 */
export declare function loadEnv(backend: TargetBackendType): Record<string, string>;
//# sourceMappingURL=env.d.ts.map