// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { isFactMetadataObject } from "@gooddata/sdk-model";
import { GroupableCatalogItemBuilder } from "./groupFactory.js";
import { builderFactory } from "../builder.js";
import { newFactMetadataObject } from "../metadata/factFactory.js";
/**
 * Catalog fact builder
 * See {@link Builder}
 *
 * @beta
 */
export class CatalogFactBuilder extends GroupableCatalogItemBuilder {
    fact(factOrRef, modifications) {
        if (!isFactMetadataObject(factOrRef)) {
            this.item.fact = newFactMetadataObject(factOrRef, modifications);
        }
        else {
            this.item.fact = factOrRef;
        }
        return this;
    }
}
/**
 * Catalog fact factory
 *
 * @param modifications - catalog fact builder modifications to perform
 * @returns created catalog fact
 * @beta
 */
export const newCatalogFact = (modifications = identity) => builderFactory(CatalogFactBuilder, { type: "fact" }, modifications);
//# sourceMappingURL=factFactory.js.map