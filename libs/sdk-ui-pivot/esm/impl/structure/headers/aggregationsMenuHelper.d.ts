import { IAttributeDescriptor, ITotal, TotalType } from "@gooddata/sdk-model";
import { IColumnTotal } from "./aggregationsMenuTypes.js";
import { IMenuAggregationClickConfig } from "../../privateTypes.js";
declare function getTotalsForAttributeHeader(totals: ITotal[], measureLocalIdentifiers: string[], ignoreMeasures?: boolean): IColumnTotal[];
declare function getTotalsForMeasureHeader(totals: ITotal[], measureLocalIdentifier: string): IColumnTotal[];
declare function isTotalEnabledForAttribute(attributeLocalIdentifier: string[], columnAttributeLocalIdentifier: string[], totalType: TotalType, columnTotals: IColumnTotal[], rowTotals: IColumnTotal[]): boolean;
declare function isTotalEnabledForSubMenuAttribute(attributeLocalIdentifier: string, totalType: TotalType, totals: IColumnTotal[]): boolean;
export declare function getUpdatedColumnOrRowTotals(totals: ITotal[], menuAggregationClickConfig: IMenuAggregationClickConfig): ITotal[];
export declare function getAttributeDescriptorsLocalId(attributeDescriptors: IAttributeDescriptor[]): string[];
declare const _default: {
    getTotalsForAttributeHeader: typeof getTotalsForAttributeHeader;
    getTotalsForMeasureHeader: typeof getTotalsForMeasureHeader;
    isTotalEnabledForAttribute: typeof isTotalEnabledForAttribute;
    isTotalEnabledForSubMenuAttribute: typeof isTotalEnabledForSubMenuAttribute;
    getUpdatedColumnOrRowTotals: typeof getUpdatedColumnOrRowTotals;
};
export default _default;
//# sourceMappingURL=aggregationsMenuHelper.d.ts.map