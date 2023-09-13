import { IFilter, IInsight } from "@gooddata/sdk-model";
import { IDrillEventIntersectionElement } from "@gooddata/sdk-ui";
import { IDrillDownDefinition } from "../../interfaces/Visualization";
export declare function modifyBucketsAttributesForDrillDown(insight: IInsight, drillDefinition: IDrillDownDefinition): IInsight;
export declare function sanitizeTableProperties(insight: IInsight): IInsight;
export declare function convertIntersectionToFilters(intersections: IDrillEventIntersectionElement[], backendSupportsElementUris?: boolean): IFilter[];
export declare function reverseAndTrimIntersection(drillConfig: IDrillDownDefinition, intersection?: IDrillEventIntersectionElement[]): IDrillEventIntersectionElement[];
/**
 * @internal
 */
export declare function addIntersectionFiltersToInsight(source: IInsight, intersection: IDrillEventIntersectionElement[], backendSupportsElementUris: boolean): IInsight;
//# sourceMappingURL=drillDownUtil.d.ts.map