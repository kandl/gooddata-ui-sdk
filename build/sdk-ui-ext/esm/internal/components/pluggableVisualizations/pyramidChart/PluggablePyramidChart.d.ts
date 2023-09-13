import { IVisConstruct, IReferencePoint, IExtendedReferencePoint } from "../../../interfaces/Visualization.js";
import { PluggablePieChart } from "../pieChart/PluggablePieChart.js";
import { IInsightDefinition } from "@gooddata/sdk-model";
/**
 * PluggablePyramidChart
 *
 * ## Buckets
 *
 * | Name     | Id       | Accepts             |
 * |----------|----------|---------------------|
 * | Measures | measures | measures only       |
 * | ViewBy   | view     | attribute or date   |
 *
 * ### Bucket axioms
 *
 * - |ViewBy| ≤ 1
 * - |Measures| ≥ 1 ∧ ≤ 20
 * - |ViewBy| = 1 ⇒ |Measures| = 1
 * - |ViewBy| = 0 ⇒ |Measures| ≥ 1
 *
 * ## Dimensions
 *
 * The PluggablePyramidChart always creates two dimensional execution.
 *
 * - |ViewBy| = 0 ⇒ [[], [MeasureGroupIdentifier]]
 * - |ViewBy| = 1 ⇒ [[MeasureGroupIdentifier], [ViewBy]]
 *
 * ## Default sorts
 *
 * The PluggablePyramidChart uses the same sorts as pie chart.
 *
 */
export declare class PluggablePyramidChart extends PluggablePieChart {
    constructor(props: IVisConstruct);
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    protected renderConfigurationPanel(insight: IInsightDefinition): void;
}
//# sourceMappingURL=PluggablePyramidChart.d.ts.map