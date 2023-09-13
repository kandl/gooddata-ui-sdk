import identity from "lodash/identity.js";
/**
 * @alpha
 */
export class DecoratedWorkspaceCatalogFactory {
    constructor(decorated, wrapper = identity) {
        this.decorated = decorated;
        this.wrapper = wrapper;
        this.workspace = this.decorated.workspace;
        this.options = this.decorated.options;
    }
    forDataset(dataset) {
        return this.createNew(this.decorated.forDataset(dataset));
    }
    forTypes(types) {
        return this.createNew(this.decorated.forTypes(types));
    }
    excludeTags(tags) {
        return this.createNew(this.decorated.excludeTags(tags));
    }
    includeTags(tags) {
        return this.createNew(this.decorated.includeTags(tags));
    }
    withOptions(options) {
        return this.createNew(this.decorated.withOptions(options));
    }
    withGroups(loadGroups) {
        return this.createNew(this.decorated.withGroups(loadGroups));
    }
    async load() {
        const catalog = await this.decorated.load();
        return this.wrapper(catalog);
    }
}
/**
 * @alpha
 */
export class DecoratedWorkspaceCatalog {
    constructor(decorated) {
        this.decorated = decorated;
    }
    availableItems() {
        return this.decorated.availableItems();
    }
    attributes() {
        return this.decorated.attributes();
    }
    dateDatasets() {
        return this.decorated.dateDatasets();
    }
    facts() {
        return this.decorated.facts();
    }
    groups() {
        return this.decorated.groups();
    }
    allItems() {
        return this.decorated.allItems();
    }
    measures() {
        return this.decorated.measures();
    }
    attributeHierarchies() {
        return this.decorated.attributeHierarchies();
    }
}
//# sourceMappingURL=catalog.js.map