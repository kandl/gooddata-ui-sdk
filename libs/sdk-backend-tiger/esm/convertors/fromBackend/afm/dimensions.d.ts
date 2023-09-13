import { ResultDimension } from "@gooddata/api-client-tiger";
import { IExecutionDefinition, IDimensionDescriptor } from "@gooddata/sdk-model";
/**
 * Transforms dimensions in the result provided by backend to the unified model used in SDK. The tiger backend
 * does not return all the data needed by the SPI. For some information, the transformation needs to look into
 * the input execution definition.
 *
 * @param dimensions - dimensions from execution result
 * @param def - execution definition, this is needed to augment the descriptors with data required by the SPI which
 *  the tiger backend does not pass
 *
 * @returns dimensions as used in the unified model
 */
export declare function transformResultDimensions(dimensions: ResultDimension[], def: IExecutionDefinition): IDimensionDescriptor[];
//# sourceMappingURL=dimensions.d.ts.map