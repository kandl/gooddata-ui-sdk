import { AnyCol } from "./tableDescriptorTypes.js";
/**
 * Returns localId of measure whose values the provided column contains. For convenience, any type of column
 * can be provided and undefined is returned if the column is not of type that contains measure values.
 *
 * @param col - column descriptor
 */
export declare function colMeasureLocalId(col: AnyCol): string | undefined;
//# sourceMappingURL=colAccessors.d.ts.map