import { IDimensionDescriptor, IExecutionDefinition } from "@gooddata/sdk-model";
import { CustomLabel, CustomMetric, CustomOverride } from "@gooddata/api-client-tiger";
export type ExportMetrics = {
    [key: string]: CustomMetric;
};
export type ExportLabels = {
    [key: string]: CustomLabel;
};
/**
 * Resolves custom override value for export payload.
 *
 * @param dimensions - the source of default values
 * @param definition - the source of custom values
 */
export declare const resolveCustomOverride: (dimensions: IDimensionDescriptor[], definition: IExecutionDefinition) => CustomOverride | undefined;
/**
 * Fills measures/metrics and attributes/labels with the lowest priority values, which serve as default.
 *
 * @param dimensions - the source of default values
 */
export declare const prepareCustomOverride: (dimensions: IDimensionDescriptor[]) => CustomOverride;
/**
 * Overwrites default measure/metric values with custom ones.
 * This function should be used after {@link prepareCustomOverride}, because it relies upon its output.
 *
 * @param definition - the source of custom values
 * @param metrics - return values from {@link prepareCustomOverride}
 */
export declare const setCustomMetrics: (definition: IExecutionDefinition, metrics: ExportMetrics) => {
    [x: string]: CustomMetric | {
        title: string;
        format: string;
    };
};
/**
 * Overwrites formats of derived measures/metrics with values from master, which they should inherit.
 * This function should be used after {@link setCustomMetrics}, because it relies upon its output.
 *
 * @param definition - the source of data
 * @param metrics - return values from {@link setCustomMetrics}
 */
export declare const setDerivedMetrics: (definition: IExecutionDefinition, metrics: ExportMetrics) => ExportMetrics;
/**
 * Overwrites default attribute/label values with custom ones.
 * This function should be used after {@link prepareCustomOverride}, because it relies upon its output.
 *
 * @param definition - the source of custom values
 * @param labels - return values from {@link prepareCustomOverride}
 */
export declare const setCustomLabels: (definition: IExecutionDefinition, labels: ExportLabels) => {
    [x: string]: CustomLabel | {
        title: string;
    };
};
//# sourceMappingURL=utils.d.ts.map