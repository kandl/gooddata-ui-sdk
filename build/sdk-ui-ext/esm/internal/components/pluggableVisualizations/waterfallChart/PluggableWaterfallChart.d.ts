import { IInsightDefinition } from "@gooddata/sdk-model";
import { IExtendedReferencePoint, IReferencePoint, IVisConstruct, IUiConfig, IBucketItem, IVisualizationProperties } from "../../../interfaces/Visualization.js";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
import { ISortConfig } from "../../../interfaces/SortConfig.js";
/**
 * PluggableWaterfallChart
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
 * The PluggableWaterfallChart always creates two dimensional execution.
 *
 * With measures only:
 * - [[], [MeasureGroupIdentifier]]
 * With viewBy:
 * - [[MeasureGroupIdentifier], [ViewBy]]
 *
 * ## Default sorts
 *
 * When Waterfall Chart is used with measures only, it's sorted by their order by default.
 * When Waterfall Chart chart is used with viewBy attribute or date, it's sorted by the values of the measure by default.
 *
 * Default sort behavior can be overriden by sortBy option.
 *
 */
export declare class PluggableWaterfallChart extends PluggableBaseChart {
    constructor(props: IVisConstruct);
    protected getSupportedPropertiesList(): string[];
    protected initializeProperties(visualizationProperties: IVisualizationProperties): void;
    getUiConfig(): IUiConfig;
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    protected getDefaultAndAvailableSort(measures: IBucketItem[], viewBy: IBucketItem[]): {
        defaultSort: ISortConfig["defaultSort"];
        availableSorts: ISortConfig["availableSorts"];
    };
    private isSortDisabled;
    getSortConfig(referencePoint: IReferencePoint): Promise<ISortConfig>;
    protected renderConfigurationPanel(insight: IInsightDefinition): void;
    private setPropertiesTotalMeasures;
}
//# sourceMappingURL=PluggableWaterfallChart.d.ts.map