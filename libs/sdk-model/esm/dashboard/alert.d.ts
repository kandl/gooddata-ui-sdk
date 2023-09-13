import { ObjRef } from "../objRef/index.js";
import { IDashboardObjectIdentity } from "./common.js";
import { IFilterContext, IFilterContextDefinition } from "./filterContext.js";
/**
 * Common widget alert properties
 * @alpha
 */
export interface IWidgetAlertBase {
    /**
     * Kpi alert title
     */
    readonly title: string;
    /**
     * Kpi alert description
     */
    readonly description: string;
    /**
     * Kpi ref (currently only kpi widget alerts are supported)
     */
    readonly widget: ObjRef;
    /**
     * KPI can be on more dashboards - we need to distinguish
     * which dashboard can be used as link in dashboard alerting email
     */
    readonly dashboard: ObjRef;
    /**
     * Threshold
     */
    readonly threshold: number;
    /**
     * Is alert triggered?
     */
    readonly isTriggered: boolean;
    /**
     * Rule to apply
     */
    readonly whenTriggered: "underThreshold" | "aboveThreshold";
}
/**
 * With widget alert, user can be notified to his email according to provided rules
 * (e.g. when some measure exceeds/drops below the set value)
 * @alpha
 */
export interface IWidgetAlertDefinition extends IWidgetAlertBase, Partial<IDashboardObjectIdentity> {
    /**
     * Alert filter context
     */
    readonly filterContext?: IFilterContext | IFilterContextDefinition;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAlertDefinition}.
 * @alpha
 */
export declare function isWidgetAlertDefinition(obj: unknown): obj is IWidgetAlertDefinition;
/**
 * See {@link IWidgetAlertDefinition}
 * @alpha
 */
export interface IWidgetAlert extends IWidgetAlertBase, IDashboardObjectIdentity {
    /**
     * Alert filter context
     */
    readonly filterContext?: IFilterContext;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAlert}.
 * @alpha
 */
export declare function isWidgetAlert(obj: unknown): obj is IWidgetAlert;
//# sourceMappingURL=alert.d.ts.map