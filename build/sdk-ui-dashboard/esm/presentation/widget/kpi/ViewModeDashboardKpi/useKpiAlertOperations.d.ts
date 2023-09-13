import { IWidgetAlert, IWidgetAlertDefinition } from "@gooddata/sdk-model";
import { KpiAlertOperationStatus } from "../common/index.js";
/**
 * @internal
 */
interface UseKpiAlertOperations {
    onCreateAlert: (alert: IWidgetAlertDefinition) => void;
    creatingStatus: KpiAlertOperationStatus;
    onUpdateAlert: (alert: IWidgetAlert) => void;
    updatingStatus: KpiAlertOperationStatus;
    onRemoveAlert: (alert: IWidgetAlert) => void;
    removingStatus: KpiAlertOperationStatus;
}
export declare const useKpiAlertOperations: (closeAlertDialog: () => void) => UseKpiAlertOperations;
export {};
