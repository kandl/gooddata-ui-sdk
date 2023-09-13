import { ActionsApi, Configuration, } from "./generated/afm-rest-api/index.js";
import { BaseAPI } from "./generated/afm-rest-api/base.js";
export { Configuration as LabelElementsConfiguration, BaseAPI as LabelElementsBaseApi, };
export const tigerLabelElementsClientFactory = (axios) => new ActionsApi(undefined, "", axios);
//# sourceMappingURL=labelElements.js.map