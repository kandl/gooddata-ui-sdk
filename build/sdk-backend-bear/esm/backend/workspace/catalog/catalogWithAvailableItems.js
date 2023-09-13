// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { isCatalogAttribute, isCatalogFact, isCatalogMeasure, isCatalogDateDataset, isCatalogAttributeHierarchy, } from "@gooddata/sdk-model";
export class BearWorkspaceCatalogWithAvailableItems {
    constructor(catalogGroups, items, availableItems, options) {
        this.catalogGroups = catalogGroups;
        this.items = items;
        this.availableItems = availableItems;
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
    allAvailableItems() {
        return this.availableItems;
    }
    availableAttributes() {
        return this.availableItems.filter(isCatalogAttribute);
    }
    availableMeasures() {
        return this.availableItems.filter(isCatalogMeasure);
    }
    availableFacts() {
        return this.availableItems.filter(isCatalogFact);
    }
    availableDateDatasets() {
        return this.availableItems.filter(isCatalogDateDataset);
    }
    availableAttributeHierarchies() {
        return this.availableItems.filter(isCatalogAttributeHierarchy);
    }
}
//# sourceMappingURL=catalogWithAvailableItems.js.map