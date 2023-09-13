import { AxiosInstance } from "axios";
import { ActionsApiInterface as ScanModelActionsApiInterface, Configuration, ConfigurationParameters } from "./generated/scan-json-api/index.js";
import { BaseAPI, RequestArgs } from "./generated/scan-json-api/base.js";
export { Configuration as ScanModelConfiguration, ConfigurationParameters as ScanModelConfigurationParameters, BaseAPI as ScanModelBaseApi, RequestArgs as ScanModelRequestArgs, ScanModelActionsApiInterface, };
export declare const tigerScanModelClientFactory: (axios: AxiosInstance) => ScanModelActionsApiInterface;
//# sourceMappingURL=scanModel.d.ts.map