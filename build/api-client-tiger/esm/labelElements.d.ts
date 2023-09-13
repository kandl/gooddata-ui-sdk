import { AxiosInstance } from "axios";
import { ActionsApiInterface, Configuration, ConfigurationParameters } from "./generated/afm-rest-api/index.js";
import { BaseAPI, RequestArgs } from "./generated/afm-rest-api/base.js";
export { Configuration as LabelElementsConfiguration, ConfigurationParameters as LabelElementsConfigurationParameters, BaseAPI as LabelElementsBaseApi, RequestArgs as LabelElementsRequestArgs, };
export declare const tigerLabelElementsClientFactory: (axios: AxiosInstance) => Pick<ActionsApiInterface, "computeLabelElementsPost">;
//# sourceMappingURL=labelElements.d.ts.map