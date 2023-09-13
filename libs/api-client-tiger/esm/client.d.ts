import { tigerExecutionClientFactory } from "./execution.js";
import { tigerExecutionResultClientFactory } from "./executionResult.js";
import { LabelElementsConfiguration, LabelElementsConfigurationParameters, LabelElementsBaseApi, LabelElementsRequestArgs, tigerLabelElementsClientFactory } from "./labelElements.js";
import { tigerValidObjectsClientFactory } from "./validObjects.js";
import { AxiosInstance } from "axios";
import { tigerLayoutClientFactory } from "./layout.js";
import { tigerAfmExplainClientFactory } from "./explain.js";
import { tigerActionsClientFactory } from "./actions.js";
import { tigerAuthActionsClientFactory } from "./authActions.js";
import { MetadataConfiguration, MetadataConfigurationParameters, MetadataBaseApi, MetadataRequestArgs, tigerEntitiesObjectsClientFactory } from "./entitiesObjects.js";
import { tigerProfileClientFactory, IUserProfile, ProfileApiInterface, ILiveFeatures, IStaticFeatures, FeatureContext } from "./profile.js";
import { tigerExportClientFactory, ExportActionsApiInterface, ActionsApiCreateTabularExportRequest, TabularExportRequest, ActionsApiGetTabularExportRequest } from "./export.js";
import { ScanModelConfiguration, ScanModelConfigurationParameters, ScanModelBaseApi, ScanModelRequestArgs, ScanModelActionsApiInterface, tigerScanModelClientFactory } from "./scanModel.js";
export { tigerExecutionClientFactory, tigerEntitiesObjectsClientFactory, tigerExecutionResultClientFactory, tigerLabelElementsClientFactory, tigerValidObjectsClientFactory, tigerLayoutClientFactory, tigerAfmExplainClientFactory, tigerProfileClientFactory, tigerActionsClientFactory, tigerAuthActionsClientFactory, tigerScanModelClientFactory, tigerExportClientFactory, MetadataConfiguration, MetadataConfigurationParameters, MetadataBaseApi, MetadataRequestArgs, LabelElementsConfiguration, LabelElementsConfigurationParameters, LabelElementsBaseApi, LabelElementsRequestArgs, ProfileApiInterface, IUserProfile, ILiveFeatures, IStaticFeatures, FeatureContext, ScanModelConfiguration, ScanModelConfigurationParameters, ScanModelBaseApi, ScanModelRequestArgs, ScanModelActionsApiInterface, ExportActionsApiInterface, ActionsApiCreateTabularExportRequest, TabularExportRequest, ActionsApiGetTabularExportRequest, };
export interface ITigerClient {
    axios: AxiosInstance;
    execution: ReturnType<typeof tigerExecutionClientFactory>;
    executionResult: ReturnType<typeof tigerExecutionResultClientFactory>;
    labelElements: ReturnType<typeof tigerLabelElementsClientFactory>;
    validObjects: ReturnType<typeof tigerValidObjectsClientFactory>;
    explain: ReturnType<typeof tigerAfmExplainClientFactory>;
    declarativeLayout: ReturnType<typeof tigerLayoutClientFactory>;
    entities: ReturnType<typeof tigerEntitiesObjectsClientFactory>;
    profile: ReturnType<typeof tigerProfileClientFactory>;
    actions: ReturnType<typeof tigerActionsClientFactory>;
    authActions: ReturnType<typeof tigerAuthActionsClientFactory>;
    scanModel: ReturnType<typeof tigerScanModelClientFactory>;
    export: ReturnType<typeof tigerExportClientFactory>;
    /**
     * Updates tiger client to send the provided API TOKEN in `Authorization` header of all
     * requests.
     *
     * @remarks This is a convenience method that ultimately calls {@link setAxiosAuthorizationToken}.
     * @param token - token to set, if undefined, it will reset
     */
    setApiToken: (token: string | undefined) => void;
}
/**
 * Tiger execution client
 *
 */
export declare const tigerClientFactory: (axios: AxiosInstance) => ITigerClient;
//# sourceMappingURL=client.d.ts.map