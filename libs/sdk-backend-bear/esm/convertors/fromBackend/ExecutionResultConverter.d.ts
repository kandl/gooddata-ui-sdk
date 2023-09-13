import { IResultDimension, Warning } from "@gooddata/api-model-bear";
import { IDimensionDescriptor, IResultWarning } from "@gooddata/sdk-model";
export declare function convertWarning(warning: Warning): IResultWarning;
/**
 * Converts execution result's dimension headers as passed by backend into dimension descriptor. At the moment, this function
 * ensures that the 'ref' properties are correctly filled in.
 *
 * @param dims - result dimensions.
 */
export declare function convertDimensions(dims: IResultDimension[]): IDimensionDescriptor[];
//# sourceMappingURL=ExecutionResultConverter.d.ts.map