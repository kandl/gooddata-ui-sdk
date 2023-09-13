// (C) 2022 GoodData Corporation
import { ActionsApiFactory, Configuration, } from "./generated/scan-json-api/index.js";
import { BaseAPI } from "./generated/scan-json-api/base.js";
export { Configuration as ScanModelConfiguration, BaseAPI as ScanModelBaseApi, };
export const tigerScanModelClientFactory = (axios) => ActionsApiFactory(undefined, "", axios);
//# sourceMappingURL=scanModel.js.map