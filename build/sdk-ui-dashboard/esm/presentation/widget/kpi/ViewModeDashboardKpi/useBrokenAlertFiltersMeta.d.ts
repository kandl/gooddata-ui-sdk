import { AnalyticalBackendError, IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { UseCancelablePromiseCallbacks, UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { ICatalogDateDataset, IDataSetMetadataObject } from "@gooddata/sdk-model";
import { IAttributeFilterMetaCollection } from "./KpiAlerts/index.js";
import { IBrokenAlertFilterBasicInfo } from "../../../../model/index.js";
export interface IBrokenAlertFiltersMeta {
    attributeFiltersMeta: IAttributeFilterMetaCollection;
    dateDatasets: IDataSetMetadataObject[];
}
/**
 * @internal
 */
export interface IUseEnrichedBrokenAlertsConfig extends UseCancelablePromiseCallbacks<IBrokenAlertFiltersMeta, AnalyticalBackendError> {
    /**
     * Broken filters to get meta data for.
     */
    brokenAlertFilters?: IBrokenAlertFilterBasicInfo[];
    /**
     * Date data sets
     */
    dateDatasets: ICatalogDateDataset[];
    /**
     * Backend to work with.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the hook MUST be called within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where the insight exists.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the hook MUST be called within an existing WorkspaceContext.
     */
    workspace?: string;
}
/**
 * @internal
 */
export declare function useBrokenAlertFiltersMeta({ backend, brokenAlertFilters, dateDatasets, workspace, onCancel, onError, onLoading, onPending, onSuccess, }: IUseEnrichedBrokenAlertsConfig): UseCancelablePromiseState<IBrokenAlertFiltersMeta, AnalyticalBackendError>;
