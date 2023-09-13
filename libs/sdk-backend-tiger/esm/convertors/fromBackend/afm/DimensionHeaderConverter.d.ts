import { IDimensionDescriptor, IResultHeader } from "@gooddata/sdk-model";
import { DateFormatter } from "../dateFormatting/types.js";
import { DimensionHeader, ExecutionResultGrandTotal } from "@gooddata/api-client-tiger";
export declare function getTransformDimensionHeaders(dimensions: IDimensionDescriptor[], dateFormatter: DateFormatter, grandTotals?: ExecutionResultGrandTotal[]): (dimensionHeaders: DimensionHeader[]) => IResultHeader[][][];
//# sourceMappingURL=DimensionHeaderConverter.d.ts.map