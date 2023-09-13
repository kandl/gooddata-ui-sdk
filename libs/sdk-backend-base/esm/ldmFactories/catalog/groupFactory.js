// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { Builder, builderFactory } from "../builder.js";
/**
 * Groupable catalog item builder
 * See {@link Builder}
 *
 * @beta
 */
export class GroupableCatalogItemBuilder extends Builder {
    groups(tagRefs) {
        this.item.groups = tagRefs;
        return this;
    }
}
/**
 * Catalog group builder
 * See {@link Builder}
 *
 * @beta
 */
export class CatalogGroupBuilder extends Builder {
    title(title) {
        this.item.title = title;
        return this;
    }
    tag(tagRef) {
        this.item.tag = tagRef;
        return this;
    }
}
/**
 * Catalog group factory
 *
 * @param modifications - catalog group builder modifications to perform
 * @returns created catalog group
 * @beta
 */
export const newCatalogGroup = (modifications = identity) => builderFactory(CatalogGroupBuilder, {}, modifications);
//# sourceMappingURL=groupFactory.js.map