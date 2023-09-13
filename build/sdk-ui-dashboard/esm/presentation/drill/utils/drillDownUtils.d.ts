import { IDrillEvent } from "@gooddata/sdk-ui";
import { DashboardDrillDefinition } from "../../../types.js";
/**
 * @internal
 */
export declare function getDrillDownAttributeTitle(localIdentifier: string, drillEvent: IDrillEvent): string | null;
/**
 * Get total number of IDrillToUrl
 * @internal
 */
export declare function getTotalDrillToUrlCount(drillDefinition: DashboardDrillDefinition[]): number;
/**
 * Implicit drill (currently IDrillDownDefinition and implicit IDrillToAttributeUrl) has lower priority,
 * so needs to be removed when other drill config exists for the same attribute
 *
 * @internal
 */
export declare function filterDrillFromAttributeByPriority(drillDefinitions: DashboardDrillDefinition[], configuredDrills?: DashboardDrillDefinition[]): DashboardDrillDefinition[];
