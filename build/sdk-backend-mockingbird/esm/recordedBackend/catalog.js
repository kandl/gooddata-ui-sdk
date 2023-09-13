// (C) 2019-2022 GoodData Corporation
import { UnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
import { isCatalogAttribute, isCatalogFact, isCatalogMeasure, isCatalogDateDataset, isCatalogAttributeHierarchy, } from "@gooddata/sdk-model";
import identity from "lodash/identity.js";
/**
 * @internal
 */
export class RecordedCatalogFactory {
    constructor(workspace, recordings = {}, config = {}, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }) {
        this.workspace = workspace;
        this.recordings = recordings;
        this.config = config;
        this.options = options;
        this.forDataset = (dataset) => {
            return this.withOptions({
                dataset,
            });
        };
        this.forTypes = (types) => {
            return this.withOptions({
                types,
            });
        };
        // include and exclude tags do not work yet
        this.includeTags = (tags) => {
            return this.withOptions({
                includeTags: tags,
            });
        };
        this.excludeTags = (tags) => {
            return this.withOptions({
                excludeTags: tags,
            });
        };
        this.withOptions = (options) => {
            const newOptions = Object.assign(Object.assign({}, this.options), options);
            return new RecordedCatalogFactory(this.workspace, this.recordings, this.config, newOptions);
        };
        this.load = async () => {
            var _a;
            const catalog = (_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.catalog;
            if (!((catalog === null || catalog === void 0 ? void 0 : catalog.items) && (catalog === null || catalog === void 0 ? void 0 : catalog.groups))) {
                throw new UnexpectedResponseError("No catalog recording", 404, {});
            }
            const typeFilteredItems = catalog.items.filter((item) => this.options.types.includes(item.type));
            const catalogItems = typeFilteredItems.map(this.convertToCatalogItem.bind(this));
            return new RecordedCatalog(this.workspace, this.config, catalog.groups, catalogItems);
        };
    }
    withGroups(loadGroups) {
        return this.withOptions({
            loadGroups,
        });
    }
    convertToCatalogItem(catalogItem) {
        if (isCatalogAttribute(catalogItem)) {
            return Object.assign(Object.assign({}, catalogItem), { attribute: Object.assign(Object.assign({}, catalogItem.attribute), { displayForms: catalogItem.displayForms }) });
        }
        return catalogItem;
    }
}
class RecordedCatalogBase {
    constructor(catalogGroups, items) {
        this.catalogGroups = catalogGroups;
        this.items = items;
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
    groups() {
        return this.catalogGroups;
    }
    attributeHierarchies() {
        return this.items.filter(isCatalogAttributeHierarchy);
    }
}
class RecordedCatalog extends RecordedCatalogBase {
    constructor(workspace, config, catalogGroups, items) {
        super(catalogGroups, items);
        this.workspace = workspace;
        this.config = config;
    }
    availableItems() {
        return new RecordedAvailableCatalogFactory(this.workspace, this.config, this.catalogGroups, this.items);
    }
}
class RecordedAvailableCatalogFactory {
    constructor(workspace, config, groups, items, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }) {
        this.workspace = workspace;
        this.config = config;
        this.groups = groups;
        this.items = items;
        this.options = options;
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.forDataset = (dataset) => {
            return this.withOptions({
                dataset,
            });
        };
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.forTypes = (types) => {
            return this.withOptions({
                types,
            });
        };
        // include and exclude tags do not work yet
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.includeTags = (tags) => {
            return this.withOptions({
                includeTags: tags,
            });
        };
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.excludeTags = (tags) => {
            return this.withOptions({
                excludeTags: tags,
            });
        };
        this.withOptions = (options) => {
            const newOptions = Object.assign(Object.assign({}, this.options), options);
            return new RecordedAvailableCatalogFactory(this.workspace, this.config, this.groups, this.items, newOptions);
        };
        this.forItems = (_items) => {
            // availability not implemented yet
            return this;
        };
        this.forInsight = (_insight) => {
            // availability not implemented yet
            return this;
        };
        this.load = async () => {
            return new RecordedAvailableCatalog(this.workspace, this.config, this.groups, this.items);
        };
    }
    // eslint-disable-next-line sonarjs/no-identical-functions
    withGroups(loadGroups) {
        return this.withOptions({
            loadGroups,
        });
    }
}
class RecordedAvailableCatalog extends RecordedCatalogBase {
    constructor(workspace, config, groups, items) {
        var _a;
        super(groups, items);
        this.workspace = workspace;
        this.config = config;
        this.allAvailableItems = () => {
            return [
                ...this.filteredAttributes,
                ...this.filteredMeasures,
                ...this.filteredFacts,
                ...this.filteredDateDatasets,
                ...this.filteredAttributeHierarchies,
            ];
        };
        this.availableAttributes = () => {
            return this.filteredAttributes;
        };
        this.availableMeasures = () => {
            return this.filteredMeasures;
        };
        // without this inference starts thinking the identity may return undefined :/
        const typedIdentity = identity;
        const { availableAttributes = typedIdentity, availableMeasures = typedIdentity, availableFacts = typedIdentity, availableDateDatasets = typedIdentity, availableAttributeHierarchies = typedIdentity, } = (_a = this.config.catalogAvailability) !== null && _a !== void 0 ? _a : {};
        this.filteredAttributes = availableAttributes(this.attributes());
        this.filteredMeasures = availableMeasures(this.measures());
        this.filteredFacts = availableFacts(this.facts());
        this.filteredDateDatasets = availableDateDatasets(this.dateDatasets());
        this.filteredAttributeHierarchies = availableAttributeHierarchies(this.attributeHierarchies());
    }
    availableFacts() {
        return this.filteredFacts;
    }
    availableDateDatasets() {
        return this.filteredDateDatasets;
    }
    availableAttributeHierarchies() {
        return this.filteredAttributeHierarchies;
    }
}
//# sourceMappingURL=catalog.js.map