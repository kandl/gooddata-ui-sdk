import { IExecutionFactory } from "@gooddata/sdk-backend-spi";
import { IInsightDefinition } from "@gooddata/sdk-model";
import { IBucketItem, IBucketOfFun, IExtendedReferencePoint, IReferencePoint, IVisConstruct, IVisProps } from "../../../interfaces/Visualization.js";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization.js";
/**
 * PluggableHeadline
 *
 * ## Buckets
 *
 * | Name             | Id                 | Accepts       |
 * |------------------|--------------------|---------------|
 * | MeasurePrimary   | measures           | measures only |
 * | MeasureSecondary | secondary_measures | measures only |
 *
 * ### Bucket axioms
 *
 * - |MeasurePrimary| = 1
 * - |MeasureSecondary| ≤ 2
 *
 * ## Dimensions
 *
 * The PluggableHeadline always creates one dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier]]
 *
 * ## Sorts
 *
 * The PluggableHeadline does not use any sorts.
 */
export declare class PluggableHeadline extends AbstractPluggableVisualization {
    private readonly settings?;
    private readonly renderFun;
    private readonly unmountFun;
    private keepPrimaryDerivedMeasureOnly;
    constructor(props: IVisConstruct);
    unmount(): void;
    getExtendedReferencePoint(referencePoint: Readonly<IReferencePoint>): Promise<IExtendedReferencePoint>;
    getExecution(options: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): import("@gooddata/sdk-backend-spi").IPreparedExecution;
    protected checkBeforeRender(insight: IInsightDefinition): boolean;
    protected renderVisualization(options: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): void;
    protected renderConfigurationPanel(insight: IInsightDefinition): void;
    protected mergeDerivedBucketItems(referencePoint: IReferencePoint, bucket: IBucketOfFun, newDerivedBucketItems: IBucketItem[]): IBucketItem[];
    protected updateInstanceProperties(options: IVisProps, insight: IInsightDefinition, insightPropertiesMeta: any): void;
    private getDefaultPropertiesForComparison;
    private buildDefaultMigrationProperties;
}
//# sourceMappingURL=PluggableHeadline.d.ts.map