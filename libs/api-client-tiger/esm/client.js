// (C) 2019-2023 GoodData Corporation
import { tigerExecutionClientFactory } from "./execution.js";
import { tigerExecutionResultClientFactory } from "./executionResult.js";
import { LabelElementsConfiguration, LabelElementsBaseApi, tigerLabelElementsClientFactory, } from "./labelElements.js";
import { tigerValidObjectsClientFactory } from "./validObjects.js";
import { setAxiosAuthorizationToken } from "./axios.js";
import { tigerLayoutClientFactory } from "./layout.js";
import { tigerAfmExplainClientFactory } from "./explain.js";
import { tigerActionsClientFactory } from "./actions.js";
import { tigerAuthActionsClientFactory } from "./authActions.js";
import { MetadataConfiguration, MetadataBaseApi, tigerEntitiesObjectsClientFactory, } from "./entitiesObjects.js";
import { tigerProfileClientFactory, } from "./profile.js";
import { tigerExportClientFactory, } from "./export.js";
import { ScanModelConfiguration, ScanModelBaseApi, tigerScanModelClientFactory, } from "./scanModel.js";
export { tigerExecutionClientFactory, tigerEntitiesObjectsClientFactory, tigerExecutionResultClientFactory, tigerLabelElementsClientFactory, tigerValidObjectsClientFactory, tigerLayoutClientFactory, tigerAfmExplainClientFactory, tigerProfileClientFactory, tigerActionsClientFactory, tigerAuthActionsClientFactory, tigerScanModelClientFactory, tigerExportClientFactory, MetadataConfiguration, MetadataBaseApi, LabelElementsConfiguration, LabelElementsBaseApi, ScanModelConfiguration, ScanModelBaseApi, };
/**
 * Tiger execution client
 *
 */
export const tigerClientFactory = (axios) => {
    const execution = tigerExecutionClientFactory(axios);
    const executionResult = tigerExecutionResultClientFactory(axios);
    const labelElements = tigerLabelElementsClientFactory(axios);
    const validObjects = tigerValidObjectsClientFactory(axios);
    const declarativeLayout = tigerLayoutClientFactory(axios);
    const explain = tigerAfmExplainClientFactory(axios);
    const entities = tigerEntitiesObjectsClientFactory(axios);
    const profile = tigerProfileClientFactory(axios);
    const actions = tigerActionsClientFactory(axios);
    const authActions = tigerAuthActionsClientFactory(axios);
    const scanModel = tigerScanModelClientFactory(axios);
    const exportFactory = tigerExportClientFactory(axios);
    return {
        axios,
        execution,
        executionResult,
        labelElements,
        validObjects,
        declarativeLayout,
        explain,
        entities,
        profile,
        actions,
        authActions,
        scanModel,
        setApiToken: (token) => {
            setAxiosAuthorizationToken(axios, token);
        },
        export: exportFactory,
    };
};
//# sourceMappingURL=client.js.map