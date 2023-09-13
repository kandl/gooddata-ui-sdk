/// <reference types="lodash" resolution-mode="require"/>
import { DashboardSelector, DashboardState } from "../types.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
import { ObjRef, IWidgetAlert } from "@gooddata/sdk-model";
/**
 * Selects all alerts used on the dashboard.
 *
 * @alpha
 */
export declare const selectAlerts: (state: DashboardState) => IWidgetAlert[];
/**
 * Selects alert or undefined by widget ref
 *
 * @alpha
 */
export declare const selectAlertByWidgetRef: ((widgetRef: ObjRef) => (state: DashboardState) => IWidgetAlert | undefined) & import("lodash").MemoizedFunction;
/**
 * Selects dashboard alerts in mapping an obj ref to widget map.
 *
 * @internal
 */
export declare const selectAlertsMap: DashboardSelector<ObjRefMap<IWidgetAlert>>;
/**
 * Selects alert or undefined by alert ref
 *
 * @alpha
 */
export declare const selectAlertByRef: ((ref: ObjRef) => (state: DashboardState) => IWidgetAlert | undefined) & import("lodash").MemoizedFunction;
