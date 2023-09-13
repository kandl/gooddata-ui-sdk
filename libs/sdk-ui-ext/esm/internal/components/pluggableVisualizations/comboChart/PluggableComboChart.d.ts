import { IChartConfig } from "@gooddata/sdk-ui-charts";
import { IInsightDefinition } from "@gooddata/sdk-model";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
import { IExtendedReferencePoint, IReferencePoint, IUiConfig, IVisConstruct, IVisualizationProperties, IBucketOfFun, IVisProps } from "../../../interfaces/Visualization.js";
import { ISortConfig } from "../../../interfaces/SortConfig.js";
/**
 * PluggableComboChart
 *
 * ## Buckets
 *
 * | Name                | Id                 | Accepts             |
 * |---------------------|--------------------|---------------------|
 * | Measure (Primary)   | measures           | measures only       |
 * | Measure (Secondary) | secondary_measures | measures only       |
 * | ViewBy              | view               | attributes or dates |
 *
 * ### Bucket axioms
 *
 * - |MeasurePrimary| ≤ 20
 * - |MeasureSecondary| ≤ 20
 * - |ViewBy| ≤ 1
 * - |MeasurePrimary| + |MeasureSecondary| ≥ 1
 *
 * ## Dimensions
 *
 * The PluggableComboChart always creates the same two dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier], [...ViewBy]]
 *
 * ## Sorts
 *
 * The PluggableComboChart does not use any sorts.
 */
export declare class PluggableComboChart extends PluggableBaseChart {
    private primaryChartType;
    private secondaryChartType;
    constructor(props: IVisConstruct);
    getSupportedPropertiesList(): string[];
    getUiConfig(): IUiConfig;
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    isStackMeasuresByDefault(): boolean;
    protected configureBuckets(extReferencePoint: IExtendedReferencePoint): void;
    protected buildVisualizationConfig(options: IVisProps, supportedControls: IVisualizationProperties): IChartConfig;
    private configureChartTypes;
    private isPercentDisabled;
    private isDataPointsControlDisabled;
    private hasStackingAreaChart;
    private isContinuousLineControlDisabled;
    protected getDefaultAndAvailableSort(buckets: IBucketOfFun[]): {
        defaultSort: ISortConfig["defaultSort"];
        availableSorts: ISortConfig["availableSorts"];
    };
    private isSortDisabled;
    getSortConfig(referencePoint: IReferencePoint): Promise<ISortConfig>;
    protected renderConfigurationPanel(insight: IInsightDefinition): void;
}
//# sourceMappingURL=PluggableComboChart.d.ts.map