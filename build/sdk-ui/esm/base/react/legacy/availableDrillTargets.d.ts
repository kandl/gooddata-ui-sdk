import { IAttributeDescriptor } from "@gooddata/sdk-model";
import { IAvailableDrillTargets } from "../../vis/Events.js";
import { DataViewFacade } from "../../results/facade.js";
/**
 * @internal
 * Provides the subset of attributes which consist from all attributes before given attribute and attribute itself.
 * @param fromAttribute - attribute to which we want to get relevant intersection's attributes
 * @param attributes - all attributes from the same dimension as fromAttribute
 */
export declare function getIntersectionAttributes(fromAttribute: IAttributeDescriptor, attributes: IAttributeDescriptor[]): IAttributeDescriptor[];
export declare function getAvailableDrillTargets(dv: DataViewFacade): IAvailableDrillTargets;
//# sourceMappingURL=availableDrillTargets.d.ts.map