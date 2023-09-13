import { isCatalogAttribute, isCatalogFact, isCatalogMeasure, } from "@gooddata/sdk-model";
import { convertFact, convertMeasure } from "../../../convertors/fromBackend/CatalogConverter.js";
import { TigerWorkspaceCatalog } from "./catalog.js";
import { loadAttributesAndDateDatasetsAndHierarchies } from "./datasetLoader.js";
import flatten from "lodash/flatten.js";
import flatMap from "lodash/flatMap.js";
import uniqBy from "lodash/uniqBy.js";
import sortBy from "lodash/sortBy.js";
import { MetadataUtilities, ValidateRelationsHeader } from "@gooddata/api-client-tiger";
import { addRsqlFilterToParams, tagsToRsqlFilter } from "./rsqlFilter.js";
export class TigerWorkspaceCatalogFactory {
    constructor(authCall, workspace, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.options = options;
        this.withOptions = (options) => {
            const newOptions = Object.assign(Object.assign({}, this.options), options);
            return new TigerWorkspaceCatalogFactory(this.authCall, this.workspace, newOptions);
        };
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
        this.load = async () => {
            const promises = [];
            if (this.options.types.includes("measure")) {
                promises.push(this.loadMeasures());
            }
            if (this.options.types.includes("fact")) {
                promises.push(this.loadFacts());
            }
            const includeAttributes = this.options.types.includes("attribute");
            const includeDateDatasets = this.options.types.includes("dateDataset");
            const includeAttributeHierarchies = this.options.types.includes("attributeHierarchy");
            if (includeAttributes || includeDateDatasets) {
                promises.push(this.loadAttributesAndDatesAndHierarchies(includeAttributes, includeDateDatasets, includeAttributeHierarchies));
            }
            const loadersResults = await Promise.all(promises);
            const catalogItems = sortBy(flatten(loadersResults), (item) => { var _a; return (_a = this.getCatalogItemSortingKey(item)) === null || _a === void 0 ? void 0 : _a.toUpperCase(); });
            const groups = this.extractGroups(catalogItems);
            return new TigerWorkspaceCatalog(this.authCall, this.workspace, groups, catalogItems, this.options);
        };
        this.getCatalogItemSortingKey = (item) => {
            if (isCatalogAttribute(item)) {
                return item.attribute.title;
            }
            if (isCatalogFact(item)) {
                return item.fact.title;
            }
            if (isCatalogMeasure(item)) {
                return item.measure.title;
            }
            return undefined;
        };
        this.loadAttributesAndDatesAndHierarchies = async (loadAttributes, loadDateDataSets, loadAttributeHierarchies) => {
            const rsqlTagFilter = tagsToRsqlFilter(this.options);
            return this.authCall((client) => loadAttributesAndDateDatasetsAndHierarchies(client, this.workspace, rsqlTagFilter, loadAttributes, loadDateDataSets, loadAttributeHierarchies));
        };
        this.loadMeasures = async () => {
            const rsqlTagFilter = tagsToRsqlFilter(this.options);
            const params = addRsqlFilterToParams({ workspaceId: this.workspace }, rsqlTagFilter);
            const measures = await this.authCall((client) => {
                return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesMetrics, params, {
                    headers: ValidateRelationsHeader,
                })
                    .then(MetadataUtilities.mergeEntitiesResults)
                    .then(MetadataUtilities.filterValidEntities);
            });
            return measures.data.map((measure) => convertMeasure(measure, measures.included));
        };
        this.loadFacts = async () => {
            const rsqlTagFilter = tagsToRsqlFilter(this.options);
            const params = addRsqlFilterToParams({ workspaceId: this.workspace }, rsqlTagFilter);
            const facts = await this.authCall((client) => {
                return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesFacts, params).then(MetadataUtilities.mergeEntitiesResults);
            });
            return facts.data.map(convertFact);
        };
    }
    withGroups(loadGroups) {
        return this.withOptions({
            loadGroups,
        });
    }
    // Groups are collected from all catalog entities.
    // There is no separate endpoint for the tags anymore.
    extractGroups(catalogItems) {
        const groupableItems = catalogItems.filter((item) => item.type !== "dateDataset" && item.type !== "attributeHierarchy");
        const allTags = flatMap(groupableItems, (item) => {
            return item.groups.map((tag) => ({
                title: tag.identifier,
                tag: tag,
            }));
        });
        return uniqBy(allTags, (tag) => tag.title);
    }
}
//# sourceMappingURL=factory.js.map