import { ICustomWidget } from "../../model/types/layoutTypes.js";
/**
 * @alpha
 */
export interface KpiPlaceholderWidget extends ICustomWidget {
    readonly customType: "gd-kpi-placeholder";
}
/**
 * Tests whether an object is a {@link KpiPlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isKpiPlaceholderWidget(obj: unknown): obj is KpiPlaceholderWidget;
/**
 * @internal
 */
export declare const KPI_PLACEHOLDER_WIDGET_ID = "__kpiPlaceholder__";
/**
 * @alpha
 */
export declare function newKpiPlaceholderWidget(): KpiPlaceholderWidget;
/**
 * @alpha
 */
export interface InsightPlaceholderWidget extends ICustomWidget {
    readonly customType: "gd-insight-placeholder";
}
/**
 * Tests whether an object is a {@link InsightPlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isInsightPlaceholderWidget(obj: unknown): obj is InsightPlaceholderWidget;
/**
 * @internal
 */
export declare const INSIGHT_PLACEHOLDER_WIDGET_ID = "__insightPlaceholder__";
/**
 * @alpha
 */
export declare function newInsightPlaceholderWidget(): InsightPlaceholderWidget;
/**
 * @alpha
 */
export interface PlaceholderWidget extends ICustomWidget {
    readonly customType: "gd-widget-placeholder";
    readonly isInitial?: boolean;
    readonly isLoading?: boolean;
}
/**
 * Tests whether an object is a {@link PlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isPlaceholderWidget(obj: unknown): obj is PlaceholderWidget;
/**
 * Tests whether an object is a {@link PlaceholderWidget} and is initial.
 *
 * @param obj - object to test
 * @internal
 */
export declare function isInitialPlaceholderWidget(obj: unknown): obj is PlaceholderWidget;
/**
 * Tests whether an object is a {@link PlaceholderWidget} and is loading.
 *
 * @param obj - object to test
 * @internal
 */
export declare function isLoadingPlaceholderWidget(obj: unknown): obj is PlaceholderWidget;
/**
 * @internal
 */
export declare const PLACEHOLDER_WIDGET_ID = "__placeholder__";
/**
 * @alpha
 */
export declare function newPlaceholderWidget(): PlaceholderWidget;
/**
 * @internal
 */
export declare function newInitialPlaceholderWidget(): PlaceholderWidget;
/**
 * @internal
 */
export declare function newLoadingPlaceholderWidget(): PlaceholderWidget;
/**
 * Tests whether an object is any type of placeholder widgets.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isAnyPlaceholderWidget(obj: unknown): obj is PlaceholderWidget | InsightPlaceholderWidget | KpiPlaceholderWidget;
