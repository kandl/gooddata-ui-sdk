import { IExecutionDefinition, ITotal } from "@gooddata/sdk-model";
import { Total } from "@gooddata/api-client-tiger";
/**
 * Extracts total definitions from execution definition dimensions and converts them into total specifications for
 * Tiger AFM. Execution definition defines totals by a measure, aggregation function, and the attribute for whose
 * values we want the totals. In Tiger, measure and aggregation function remains the same, but the `totalDimensions`
 * with `totalDimensionItems` are best understood as coordinates for the resulting structure where the totals
 * should be placed. This implicitly decides which attributes should be used. This allows for multidimensional totals,
 * but such totals are impossible to define in the execution definition.
 */
export declare function convertTotals(def: IExecutionDefinition): Total[];
export declare function totalLocalIdentifier(total: ITotal, dimIdx: number): string;
export declare function grandTotalLocalIdentifier(total: ITotal, dimIdx: number): string;
export declare function subTotalRowLocalIdentifier(total: ITotal, dimIdx: number): string;
export declare function subTotalColumnLocalIdentifier(total: ITotal, dimIdx: number): string;
export declare function marginalTotalLocalIdentifier(total: ITotal, dimIdx: number): string;
//# sourceMappingURL=TotalsConverter.d.ts.map