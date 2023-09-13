import { IDimensionDescriptor, IMeasureGroupDescriptor, IResultHeader } from "@gooddata/sdk-model";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
export declare function findMeasureGroupInDimensions(dimensions: IDimensionDescriptor[]): IMeasureGroupDescriptor["measureGroupHeader"];
export declare function findAttributeInDimension(dimension: IDimensionDescriptor, attributeHeaderItemsDimension: IResultHeader[][], indexInDimension?: number): IUnwrappedAttributeHeadersWithItems;
//# sourceMappingURL=executionResultHelper.d.ts.map