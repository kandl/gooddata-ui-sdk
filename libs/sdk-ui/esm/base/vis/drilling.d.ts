import { ExplicitDrill, IDrillEventIntersectionElement, IDrillEventCallback, IDrillEvent } from "./DrillEvents.js";
import { IHeaderPredicate } from "../headerMatching/HeaderPredicate.js";
import { IMappingHeader } from "../headerMatching/MappingHeader.js";
import { DataViewFacade } from "../results/facade.js";
/**
 * @internal
 */
export declare function isSomeHeaderPredicateMatched(drillablePredicates: IHeaderPredicate[], header: IMappingHeader, dv: DataViewFacade): boolean;
/**
 * @internal
 */
export declare function convertDrillableItemsToPredicates(drillableItems: ExplicitDrill[]): IHeaderPredicate[];
/**
 * @internal
 */
export declare function getIntersectionPartAfter(intersection: IDrillEventIntersectionElement[], localIdentifier: string): IDrillEventIntersectionElement[];
/**
 * @internal
 */
export declare function getDrillIntersection(drillItems: IMappingHeader[]): IDrillEventIntersectionElement[];
/**
 * Fire a new drill event built from the provided data to the target that have a 'dispatchEvent' method.
 *
 * @param drillEventFunction - custom drill event function which could process and prevent default post message event.
 * @param drillEventData - The event data in `{ executionContext, drillContext }` format.
 * @param target - The target where the built event must be dispatched.
 * @internal
 */
export declare function fireDrillEvent(drillEventFunction: IDrillEventCallback, drillEventData: IDrillEvent, target: EventTarget): void;
//# sourceMappingURL=drilling.d.ts.map