import { ObjRef } from "@gooddata/sdk-model";
import { ExplicitDrill, IAvailableDrillTargets, IHeaderPredicate } from "@gooddata/sdk-ui";
import { DashboardDrillDefinition } from "../../../types.js";
import { DashboardSelector } from "../types.js";
/**
 * @internal
 */
export interface IImplicitDrillWithPredicates {
    drillDefinition: DashboardDrillDefinition;
    predicates: IHeaderPredicate[];
}
/**
 * @internal
 */
export declare const selectImplicitDrillsDownByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;
/**
 * @internal
 */
export declare const selectImplicitDrillsToUrlByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;
/**
 * @internal
 */
export declare const selectConfiguredDrillsByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;
/**
 * @internal
 */
export declare const selectValidConfiguredDrillsByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;
/**
 * @internal
 */
export declare const selectConfiguredAndImplicitDrillsByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;
/**
 * @internal
 */
export declare const selectDrillableItemsByWidgetRef: (ref: ObjRef) => DashboardSelector<ExplicitDrill[]>;
/**
 * @internal
 */
export declare const selectImplicitDrillsByAvailableDrillTargets: (availableDrillTargets: IAvailableDrillTargets | undefined) => DashboardSelector<IImplicitDrillWithPredicates[]>;
/**
 * @internal
 */
export declare const selectDrillableItemsByAvailableDrillTargets: (availableDrillTargets: IAvailableDrillTargets | undefined) => DashboardSelector<IHeaderPredicate[]>;
