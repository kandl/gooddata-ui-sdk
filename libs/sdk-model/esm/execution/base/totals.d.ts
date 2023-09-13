import { IMeasure } from "../measure/index.js";
import { IAttribute } from "../attribute/index.js";
import { Identifier } from "../../objRef/index.js";
/**
 * Supported types of totals.
 *
 * @public
 */
export type TotalType = "sum" | "avg" | "max" | "min" | "med" | "nat";
/**
 * Describes type and granularity for calculation of Totals.
 *
 * @remarks
 * Total is calculated for particular measure and on some granularity - specified by an attribute
 * by which the measure is sliced by.
 *
 * @public
 */
export interface ITotal {
    /**
     * Type of total calculation.
     */
    type: TotalType;
    /**
     * Local identifier of measure for which to calculate total.
     */
    measureIdentifier: Identifier;
    /**
     * Local identifier of attribute - specifies granularity of the calculation.
     */
    attributeIdentifier: Identifier;
    /**
     * Specifies custom name for the calculated total. This will be included in result metadata.
     */
    alias?: string;
}
/**
 * Type-guard checking whether an object is a Total.
 *
 * @public
 */
export declare function isTotal(obj: unknown): obj is ITotal;
/**
 * Creates a new total.
 *
 * @param type - type of total, one of the enumerated types
 * @param measureOrId - measure instance OR measure local identifier
 * @param attributeOrId - attribute instance OR attribute local identifier
 * @param alias - provide custom name (alias) for the total; this will be included in the computed results
 * @returns new total
 * @public
 */
export declare function newTotal(type: TotalType, measureOrId: IMeasure | Identifier, attributeOrId: IAttribute | Identifier, alias?: string): ITotal;
/**
 * Tests whether total instance represents a native total = a roll-up total.
 *
 * @public
 */
export declare function totalIsNative(total: ITotal): boolean;
//# sourceMappingURL=totals.d.ts.map