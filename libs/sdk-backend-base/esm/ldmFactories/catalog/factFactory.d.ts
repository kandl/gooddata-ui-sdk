import { ObjRef, ICatalogFact, IFactMetadataObject } from "@gooddata/sdk-model";
import { GroupableCatalogItemBuilder } from "./groupFactory.js";
import { BuilderModifications } from "../builder.js";
import { FactMetadataObjectBuilder } from "../metadata/factFactory.js";
/**
 * Catalog fact builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogFactBuilder<T extends ICatalogFact = ICatalogFact> extends GroupableCatalogItemBuilder<T> {
    fact(factOrRef: IFactMetadataObject | ObjRef, modifications?: BuilderModifications<FactMetadataObjectBuilder>): this;
}
/**
 * Catalog fact factory
 *
 * @param modifications - catalog fact builder modifications to perform
 * @returns created catalog fact
 * @beta
 */
export declare const newCatalogFact: (modifications?: BuilderModifications<CatalogFactBuilder>) => ICatalogFact;
//# sourceMappingURL=factFactory.d.ts.map