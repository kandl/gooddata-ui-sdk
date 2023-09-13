import { DimensionHeader, ExecutionResult } from "@gooddata/api-client-tiger";
import { DataValue, IResultHeader } from "@gooddata/sdk-model";
export type Data = DataValue[] | DataValue[][];
export type TransformedResult = {
    readonly headerItems: IResultHeader[][][];
    readonly data: Data;
    readonly offset: number[];
    readonly count: number[];
    readonly total: number[];
};
export declare function transformExecutionResult(result: ExecutionResult, transformDimensionHeaders: (headers: DimensionHeader[]) => IResultHeader[][][]): TransformedResult;
//# sourceMappingURL=result.d.ts.map