// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { isCatalogAttribute, isCatalogFact, isCatalogMeasure, isCatalogDateDataset, isCatalogAttributeHierarchy, } from "@gooddata/sdk-model";
import { BearWorkspaceCatalogAvailableItemsFactory } from "./availableItemsFactory.js";
export class BearWorkspaceCatalog {
    constructor(authCall, workspace, catalogGroups, items, options, mappings) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.catalogGroups = catalogGroups;
        this.items = items;
        this.options = options;
        this.mappings = mappings;
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
        return new BearWorkspaceCatalogAvailableItemsFactory(this.authCall, this.workspace, this.catalogGroups, this.items, this.options, this.mappings);
    }
}
//# sourceMappingURL=catalog.js.map