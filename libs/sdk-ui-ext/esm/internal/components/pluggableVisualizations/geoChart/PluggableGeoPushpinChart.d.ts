import { IExtendedReferencePoint, IReferencePoint, IUiConfig, IVisConstruct, IVisProps, IVisualizationProperties } from "../../../interfaces/Visualization.js";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
import { IInsightDefinition } from "@gooddata/sdk-model";
import { IExecutionFactory } from "@gooddata/sdk-backend-spi";
import { IGeoConfig } from "@gooddata/sdk-ui-geo";
/**
 * PluggableGeoPushpinChart
 *
 * ## Buckets
 *
 * | Name        | Id          | Accepts                                                       |
 * |-------------|-------------|---------------------------------------------------------------|
 * | Location    | location    | geo attributes only                                           |
 * | Latitude    | latitude    | geo attributes only, added internally, not accessible from UI |
 * | Longitude   | longitude   | geo attributes only, added internally, not accessible from UI |
 * | Size        | size        | measures only                                                 |
 * | Color       | color       | measures only                                                 |
 * | Segment     | segment     | attributes only                                               |
 * | TooltipText | tooltipText | attributes only, added internally, not accessible from UI     |
 *
 * Internal buckets are used only for execution, they never exist in reference point.
 * In ref. point they are represented by items in properties
 *
 * ### Bucket axioms
 *
 * - |Location| = 1
 * - |Size| ≤ 1
 * - |Color| ≤ 1
 * - |Segment| ≤ 1
 *
 * ## Dimensions
 *
 * The PluggableGeoPushpinChart creates either one- or two-dimensional execution.
 *
 * In the case when latitude and longitude is in the one string label, delimited by ";":
 * - |Size| + |Color| ≥ 1 ⇒ [[MeasureGroupIdentifier], [Location, Segment, TooltipText]]
 * - |Size| + |Color| = 0 ⇒ [[Location, Segment, TooltipText]]
 *
 * In the case when latitude and longitude is in two numerical separate labels:
 * - |Size| + |Color| ≥ 1 ⇒ [[MeasureGroupIdentifier], [Latitude, Longitude, Segment, TooltipText]]
 * - |Size| + |Color| = 0 ⇒ [[Latitude, Longitude, Segment, TooltipText]]
 *
 * ## Sorts
 *
 * Unless the user specifies otherwise, the sorts used by default are:
 *
 * - |Segment| ≥ 1 ⇒ [attributeSort(Segment[0])]
 */
export declare class PluggableGeoPushpinChart extends PluggableBaseChart {
    private backendCapabilities;
    constructor(props: IVisConstruct);
    protected checkBeforeRender(insight: IInsightDefinition): boolean;
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    getUiConfig(): IUiConfig;
    getExecution(options: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): import("@gooddata/sdk-backend-spi").IPreparedExecution;
    protected getSupportedPropertiesList(): string[];
    protected configureBuckets(extendedReferencePoint: IExtendedReferencePoint): IExtendedReferencePoint;
    protected renderConfigurationPanel(insight: IInsightDefinition): void;
    protected buildVisualizationConfig(options: IVisProps, supportedControls: IVisualizationProperties): IGeoConfig;
    protected renderVisualization(options: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): void;
    private withEmptyAttributeTargets;
    private superHandlePushData;
    protected handlePushData: (data: any) => void;
    private sanitizeMeasures;
    private createSort;
    private getSegmentItems;
    private getLocationItems;
    private getPreferredBucketItemLimit;
    private updateSupportedProperties;
    private getLocationProperties;
    private prepareBuckets;
    /**
     * Creates new virtual bucket from existing LOCATION bucket
     * @param insight - current insight
     * @param bucketName - new bucket name
     * @param attributeId - id of bucket item
     * @param attributeLocalIdentifier - local identifier of bucket item, Location item one will be used if not defined
     */
    private createVirtualBucketFromLocationAttribute;
}
//# sourceMappingURL=PluggableGeoPushpinChart.d.ts.map