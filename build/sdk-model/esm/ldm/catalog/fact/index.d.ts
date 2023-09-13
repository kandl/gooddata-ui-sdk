import { IGroupableCatalogItemBase } from "../group/index.js";
import { IFactMetadataObject } from "../../metadata/fact/index.js";
/**
 * Type representing catalog fact
 *
 * @public
 */
export interface ICatalogFact extends IGroupableCatalogItemBase {
    /**
     * Catalog item type
     */
    type: "fact";
    /**
     * Fact metadata object that catalog fact represents
     */
    fact: IFactMetadataObject;
}
/**
 * Type guard checking whether the provided object is a {@link ICatalogFact}
 *
 * @public
 */
export declare function isCatalogFact(obj: unknown): obj is ICatalogFact;
//# sourceMappingURL=index.d.ts.map