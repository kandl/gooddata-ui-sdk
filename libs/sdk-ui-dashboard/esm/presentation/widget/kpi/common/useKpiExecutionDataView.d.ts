import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IMeasure, IPoPMeasureDefinition, IPreviousPeriodMeasureDefinition } from "@gooddata/sdk-model";
import { DataViewFacade, GoodDataSdkError, UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { IDashboardFilter } from "../../../../types.js";
interface IUseKpiExecutionDataViewConfig {
    backend?: IAnalyticalBackend;
    workspace?: string;
    primaryMeasure?: IMeasure;
    secondaryMeasure?: IMeasure<IPoPMeasureDefinition> | IMeasure<IPreviousPeriodMeasureDefinition>;
    effectiveFilters?: IDashboardFilter[];
    /**
     * If false, the loading will not be attempted. This is useful for when you want to wait for some other load first.
     */
    shouldLoad: boolean;
}
/**
 * Wrapper around useExecutionDataView that does not treat no data errors as errors.
 * This allows formats for empty values to come into play when no data is returned.
 */
export declare function useKpiExecutionDataView(config: IUseKpiExecutionDataViewConfig): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;
export {};
