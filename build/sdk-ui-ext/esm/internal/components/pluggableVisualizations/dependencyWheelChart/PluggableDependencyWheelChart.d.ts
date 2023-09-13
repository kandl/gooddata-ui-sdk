import { IExtendedReferencePoint, IReferencePoint, IVisConstruct } from "../../../interfaces/Visualization.js";
import { PluggableSankeyChart } from "../sankeyChart/PluggableSankeyChart.js";
/**
 * PluggableDependencyWheelChart
 *
 * ## Buckets
 *
 * | Name              | Id             | Accepts             |
 * |-------------------|----------------|---------------------|
 * | Measure           | measure        | measures only       |
 * | Attribute ( From )| attribute_from | attribute or date |
 * | Attribute ( To )  | attribute_to   | attribute or date |
 *
 * ### Bucket axioms
 *
 * - |Measure           | = 1
 * - |Attribute ( From )| ≤ 1
 * - |Attribute ( To )  | ≤ 1
 *
 * ## Dimensions
 *
 * The PluggableDependencyWheelChart always creates the same two dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier], compact([attributeFrom, attributeTo])]
 *
 * ## Sorts
 *
 * The PluggableDependencyWheelChart does not use any sorts.
 */
export declare class PluggableDependencyWheelChart extends PluggableSankeyChart {
    constructor(params: IVisConstruct);
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
}
//# sourceMappingURL=PluggableDependencyWheelChart.d.ts.map