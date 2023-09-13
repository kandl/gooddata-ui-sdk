import { ObjRef, ICatalogGroup, IGroupableCatalogItemBase } from "@gooddata/sdk-model";
import { Builder, BuilderModifications, IBuilder } from "../builder.js";
/**
 * Groupable catalog item builder interface
 *
 * @beta
 */
export interface IGroupableCatalogItemBuilder<T extends IGroupableCatalogItemBase = IGroupableCatalogItemBase> extends IBuilder<T> {
    groups(tagRefs: ObjRef[]): this;
}
/**
 * Groupable catalog item builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class GroupableCatalogItemBuilder<T extends IGroupableCatalogItemBase = IGroupableCatalogItemBase> extends Builder<T> implements IGroupableCatalogItemBuilder<T> {
    groups(tagRefs: ObjRef[]): this;
}
/**
 * Catalog group builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogGroupBuilder<T extends ICatalogGroup = ICatalogGroup> extends Builder<T> {
    title(title: string): this;
    tag(tagRef: ObjRef): this;
}
/**
 * Catalog group factory
 *
 * @param modifications - catalog group builder modifications to perform
 * @returns created catalog group
 * @beta
 */
export declare const newCatalogGroup: (modifications?: BuilderModifications<CatalogGroupBuilder>) => ICatalogGroup;
//# sourceMappingURL=groupFactory.d.ts.map