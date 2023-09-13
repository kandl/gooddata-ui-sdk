import { IMeasure, IPoPMeasureDefinition, IPreviousPeriodMeasureDefinition, FilterContextItem, IKpiWidget } from "@gooddata/sdk-model";
import { GoodDataSdkError, UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { IDashboardFilter } from "../../../../types.js";
interface IUseKpiDataConfig {
    kpiWidget?: IKpiWidget;
    dashboardFilters: FilterContextItem[];
}
interface IUseKpiDataResult {
    primaryMeasure: IMeasure;
    secondaryMeasure?: IMeasure<IPoPMeasureDefinition> | IMeasure<IPreviousPeriodMeasureDefinition>;
    effectiveFilters?: IDashboardFilter[];
    allFilters?: IDashboardFilter[];
}
/**
 * @internal
 */
export declare function useKpiData({ kpiWidget, dashboardFilters, }: IUseKpiDataConfig): UseCancelablePromiseState<IUseKpiDataResult, GoodDataSdkError>;
export {};
