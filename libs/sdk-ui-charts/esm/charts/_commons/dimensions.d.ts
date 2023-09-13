import { IDimension, IExecutionDefinition } from "@gooddata/sdk-model";
export declare function defaultDimensions(def: IExecutionDefinition): IDimension[];
export declare function stackedChartDimensions(def: IExecutionDefinition, viewBucketName?: string, stackBucketName?: string): IDimension[];
export declare function pointyChartDimensions(def: IExecutionDefinition): IDimension[];
export declare function roundChartDimensions(def: IExecutionDefinition): IDimension[];
export declare function heatmapDimensions(def: IExecutionDefinition): IDimension[];
export declare function treemapDimensions(def: IExecutionDefinition): IDimension[];
export declare function sankeyDimensions(def: IExecutionDefinition): IDimension[];
export declare function dependencyWheelDimensions(def: IExecutionDefinition): IDimension[];
//# sourceMappingURL=dimensions.d.ts.map