import { ActionsApi } from "./generated/afm-rest-api/index.js";
/**
 * Tiger execution client factory
 */
export const tigerExecutionClientFactory = (axios) => new ActionsApi(undefined, "", axios);
//# sourceMappingURL=execution.js.map