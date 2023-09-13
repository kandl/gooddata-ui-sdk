// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { isCatalogAttribute, isCatalogFact, isCatalogMeasure, isCatalogDateDataset, isCatalogAttributeHierarchy, } from "@gooddata/sdk-model";
import { TigerWorkspaceCatalogAvailableItemsFactory } from "./availableItemsFactory.js";
export class TigerWorkspaceCatalog {
    constructor(authCall, workspace, catalogGroups, items, options) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.catalogGroups = catalogGroups;
        this.items = items;
        this.options = options;
    }
    groups() {
        invariant(this.options.loadGroups, "Catalog groups are not loaded.");
        return this.catalogGroups;
    }
    allItems() {
        return this.items;
    }
    attributes() {
        return this.items.filter(isCatalogAttribute);
    }
    measures() {
        return this.items.filter(isCatalogMeasure);
    }
    facts() {
        return this.items.filter(isCatalogFact);
    }
    dateDatasets() {
        return this.items.filter(isCatalogDateDataset);
    }
    attributeHierarchies() {
        return this.items.filter(isCatalogAttributeHierarchy);
    }
    availableItems() {
        return new TigerWorkspaceCatalogAvailableItemsFactory(this.authCall, this.workspace, this.catalogGroups, this.items, this.options);
    }
}
//# sourceMappingURL=catalog.js.map