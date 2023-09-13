import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { BackendType } from "./base/types.js";
export declare const getOrInitBackend: (username: string, password: string, hostname: string, backendType: BackendType) => IAnalyticalBackend;
declare const getBackend: () => IAnalyticalBackend;
export default getBackend;
//# sourceMappingURL=backend.d.ts.map