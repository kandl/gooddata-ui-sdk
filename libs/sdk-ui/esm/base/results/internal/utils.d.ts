import { IDataView } from "@gooddata/sdk-backend-spi";
import { IMeasureDescriptor, IDimensionItemDescriptor, IMeasureGroupDescriptor, IResultHeader, IResultAttributeHeader } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare function dataViewHeaders(dataView: IDataView, dimIdx: number): IResultHeader[][];
/**
 * @internal
 */
export declare function dataViewDimensionItems(dataView: IDataView, dimIdx: number): IDimensionItemDescriptor[];
/**
 * @internal
 */
export declare function measureGroupItems(measureGroup: IMeasureGroupDescriptor): IMeasureDescriptor[];
/**
 * @internal
 */
export declare function measureFormat(measureDescriptor: IMeasureDescriptor): string;
/**
 * @internal
 */
export declare function measureName(measureDescriptor: IMeasureDescriptor): string;
/**
 * @internal
 */
export declare function getTotalInfo(attributeHeaders: IResultAttributeHeader[]): {
    isTotal: boolean;
    isSubtotal: boolean;
};
//# sourceMappingURL=utils.d.ts.map