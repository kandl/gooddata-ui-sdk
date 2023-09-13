import { IGroupableCatalogItemBase } from "../group/index.js";
import { IMeasureMetadataObject } from "../../metadata/measure/index.js";
/**
 * Type representing catalog measure
 *
 * @public
 */
export interface ICatalogMeasure extends IGroupableCatalogItemBase {
    /**
     * Catalog item type
     */
    type: "measure";
    /**
     * Measure metadata object that catalog measure represents
     */
    measure: IMeasureMetadataObject;
}
/**
 * Type guard checking whether the provided object is a {@link ICatalogMeasure}
 *
 * @public
 */
export declare function isCatalogMeasure(obj: unknown): obj is ICatalogMeasure;
//# sourceMappingURL=index.d.ts.map