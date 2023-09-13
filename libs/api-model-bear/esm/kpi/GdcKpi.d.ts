import { IAttributeFilterReference, IDateFilterReference } from "../extendedDateFilters/GdcExtendedDateFilters.js";
import { IObjectMeta } from "../meta/GdcMetadata.js";
/**
 * @public
 */
export interface IKPI {
    meta: IObjectMeta;
    content: IKpiContentWithoutComparison | IKpiContentWithComparison;
}
/**
 * @public
 */
export interface IWrappedKPI {
    kpi: IKPI;
}
/**
 * @public
 */
export interface IKpiContentBase {
    metric: string;
    ignoreDashboardFilters: Array<IDateFilterReference | IAttributeFilterReference>;
    drillTo?: IKpiProjectDashboardLink;
    dateDimension?: string;
    dateDataSet?: string;
    configuration?: IKpiConfiguration;
}
/**
 * @public
 */
export interface IKpiConfiguration {
    description?: IKpiDescriptionConfiguration;
}
/**
 * @public
 */
export interface IKpiDescriptionConfiguration {
    /**
     * Whether description should be visible or not
     */
    visible: boolean;
    /**
     * Whether description should be used from kpi or inherited from its metric
     */
    source: KpiDescriptionSourceType;
}
/**
 * @public
 */
export type KpiDescriptionSourceType = "kpi" | "metric";
/**
 * @public
 */
export interface IKpiContentWithComparison extends IKpiContentBase {
    comparisonType: IKpiComparisonTypeComparison;
    comparisonDirection: IKpiComparisonDirection;
}
/**
 * @public
 */
export interface IKpiContentWithoutComparison extends IKpiContentBase {
    comparisonType: IKpiComparisonTypeNoComparison;
}
/**
 * @public
 */
export declare function isKpiContentWithoutComparison(obj: unknown): obj is IKpiContentWithoutComparison;
/**
 * @public
 */
export interface IKpiProjectDashboardLink {
    projectDashboard: string;
    projectDashboardTab: string;
}
/**
 * @public
 */
export type IKpiComparisonTypeNoComparison = "none";
/**
 * @public
 */
export type IKpiComparisonTypeComparison = "previousPeriod" | "lastYear";
/**
 * @public
 */
export type IKpiComparisonDirection = "growIsGood" | "growIsBad";
/**
 * @public
 */
export declare function isKpi(obj: unknown): obj is IKPI;
/**
 * @public
 */
export declare function isWrappedKpi(obj: unknown): obj is IWrappedKPI;
//# sourceMappingURL=GdcKpi.d.ts.map