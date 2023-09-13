import { ObjRefInScope, DrillDefinition, InsightDrillDefinition, ICatalogAttribute, ICatalogDateAttribute, IAttributeDescriptor } from "@gooddata/sdk-model";
import { IAvailableDrillTargetAttribute, IHeaderPredicate, IDrillEvent, IAvailableDrillTargets } from "@gooddata/sdk-ui";
import { DashboardDrillDefinition, IDrillDownDefinition } from "../../types.js";
export { getAttributeIdentifiersPlaceholdersFromUrl } from "@gooddata/sdk-model/internal";
interface IImplicitDrillWithPredicates {
    drillDefinition: DrillDefinition | IDrillDownDefinition;
    predicates: IHeaderPredicate[];
}
/**
 * Returns a collection of pairs consisting of a drill definition and all its predicates.
 *
 * @param insightWidgetDrills - drills from the insight widget itself
 * @param possibleDrills - possible drill targets returned by pushData (this contains all attributes in the visualization)
 * @param attributesWithDrillDown - all the attributes in the catalog that have drill down step defined
 */
export declare function getImplicitDrillsWithPredicates(insightWidgetDrills: DrillDefinition[], possibleDrills: IAvailableDrillTargetAttribute[], attributesWithDrillDown: Array<ICatalogAttribute | ICatalogDateAttribute>, disableWidgetDrills?: boolean): IImplicitDrillWithPredicates[];
export declare function getDrillsBySourceLocalIdentifiers(widgetDrillDefinition: Array<DashboardDrillDefinition>, drillSourceLocalIdentifiers: string[]): Array<DashboardDrillDefinition>;
export declare function getLocalIdentifiersFromEvent(drillEvent: IDrillEvent): string[];
export declare function getDrillSourceLocalIdentifierFromEvent(drillEvent: IDrillEvent): string[];
export declare function filterDrillsByDrillEvent(drillDefinitions: DashboardDrillDefinition[], drillEvent: IDrillEvent): DashboardDrillDefinition[];
export declare function getDrillOriginLocalIdentifier(drillDefinition: InsightDrillDefinition | IDrillDownDefinition): string;
export declare function getLocalIdentifierOrDie(ref: ObjRefInScope): string;
export declare function isDrillConfigured(drill: DashboardDrillDefinition, configuredDrills: DashboardDrillDefinition[]): boolean;
export declare function getValidDrillOriginAttributes(supportedItemsForWidget: IAvailableDrillTargets, localIdentifier: string): IAttributeDescriptor[];
