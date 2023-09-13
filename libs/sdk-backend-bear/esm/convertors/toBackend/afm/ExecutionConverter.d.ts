import { IExecution, IResultSpec } from "@gooddata/api-model-bear";
import { IExecutionDefinition } from "@gooddata/sdk-model";
export declare function convertResultSpec(def: IExecutionDefinition): IResultSpec;
/**
 * Converts execution definition to AFM Execution
 *
 * @param def - execution definition
 * @returns AFM Execution
 *
 * @internal
 */
export declare const toAfmExecution: (def: IExecutionDefinition) => IExecution;
//# sourceMappingURL=ExecutionConverter.d.ts.map