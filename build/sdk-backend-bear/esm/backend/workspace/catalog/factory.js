import partition from "lodash/partition.js";
import uniq from "lodash/uniq.js";
import flatMap from "lodash/flatMap.js";
import keyBy from "lodash/keyBy.js";
import { isCatalogFact, isCatalogMeasure, isCatalogAttribute, uriRef, } from "@gooddata/sdk-model";
import { convertAttribute, convertDateDataset, convertFact, convertGroup, convertItemType, convertMeasure, isCompatibleCatalogItemType, } from "../../../convertors/fromBackend/CatalogConverter.js";
import { BearWorkspaceCatalog } from "./catalog.js";
import { objRefsToIdentifiers, objRefToIdentifier } from "../../../utils/api.js";
import { isCatalogAttribute as isBearCatalogAttribute, isCatalogMetric, isWrappedAttribute, } from "@gooddata/api-model-bear";
import { v4 } from "uuid";
const bearCatalogItemToCatalogItem = (displayForms, attributes) => (item) => {
    if (isBearCatalogAttribute(item)) {
        return convertAttribute(item, displayForms, attributes);
    }
    else if (isCatalogMetric(item)) {
        return convertMeasure(item);
    }
    return convertFact(item);
};
const createLookups = (displayFormsAndAttributes) => {
    const [attributes, displayForms] = partition(displayFormsAndAttributes, isWrappedAttribute);
    const unwrappedDisplayForms = displayForms.map((df) => df.attributeDisplayForm);
    const attributeByUri = keyBy(attributes, (item) => item.attribute.meta.uri);
    const attributeById = keyBy(attributes, (item) => item.attribute.meta.identifier);
    const displayFormByUri = keyBy(unwrappedDisplayForms, (item) => item.meta.uri);
    const displayFormById = keyBy(unwrappedDisplayForms, (item) => item.meta.identifier);
    const attributeByDisplayFormUri = Object.keys(displayFormByUri).reduce((acc, displayFormUri) => {
        const displayForm = displayFormByUri[displayFormUri];
        const attributeUri = displayForm.content.formOf;
        const attribute = attributeByUri[attributeUri];
        acc[displayFormUri] = attribute;
        return acc;
    }, {});
    return {
        attributeById,
        attributeByDisplayFormUri,
        displayFormById,
        displayFormByUri,
    };
};
const getProductionFlag = ({ production, dataset, }) => {
    // if production is undefined, leave it as is - it has meaning
    if (production === undefined) {
        return production;
    }
    // if a dataset is specified, production must be false
    const sanitizedProduction = !dataset && production;
    return sanitizedProduction ? 1 : 0;
};
const groupableCatalogItemTypes = ["attribute", "measure", "fact"];
const isGroupableCatalogItemType = (type) => groupableCatalogItemTypes.includes(type);
export class BearWorkspaceCatalogFactory {
    constructor(authCall, workspace, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.options = options;
        this.tagsAndDatasetIdsPromise = null;
        this.loadAllCatalogItemsAndMappings = async () => {
            const [bearCatalogItems, bearDateDatasets] = await Promise.all([
                this.loadBearCatalogItems(),
                this.loadDateDatasets(),
            ]);
            const bearAttributes = await this.loadBearAttributes(bearCatalogItems, flatMap(bearDateDatasets, (dd) => { var _a; return (_a = dd.availableDateAttributes) !== null && _a !== void 0 ? _a : []; }));
            const bearDisplayFormsAndAttributes = extractDisplayFormsFromBearAttributes(bearAttributes);
            const { attributeByDisplayFormUri, displayFormById, displayFormByUri, attributeById } = createLookups(bearDisplayFormsAndAttributes);
            const catalogItems = bearCatalogItems.map(bearCatalogItemToCatalogItem(displayFormByUri, attributeById));
            const dateDatasets = bearDateDatasets.map((dd) => convertDateDataset(dd, attributeById));
            const attributeHierarchies = this.options.types.includes("attributeHierarchy")
                ? extractAttributeHierarchiesFromCatalogItems(catalogItems, dateDatasets)
                : [];
            const allCatalogItems = catalogItems.concat(dateDatasets, attributeHierarchies);
            const measureById = keyBy(catalogItems.filter(isCatalogMeasure).map((el) => el.measure), (el) => el.id);
            const factById = keyBy(catalogItems.filter(isCatalogFact).map((el) => el.fact), (el) => el.id);
            const dateAttributeById = keyBy(flatMap(dateDatasets, (dd) => dd.dateAttributes), (attr) => attr.attribute.id);
            return {
                allCatalogItems,
                mappings: {
                    attributeById,
                    attributeByDisplayFormUri,
                    displayFormById,
                    measureById,
                    factById,
                    dateAttributeById,
                },
            };
        };
        this.loadDateDatasets = async () => {
            const { types, production, includeDateGranularities } = this.options;
            const includeDateDatasets = types.includes("dateDataset");
            if (!includeDateDatasets) {
                return [];
            }
            const { includeTagsIds, excludeTagsIds, dataSetId } = await this.getTagsAndDatasetIds();
            // only return all the date datasets ignoring production or custom datasets if neither of those were specified by the user
            const shouldReturnAllDateDataSets = !production && !dataSetId;
            const result = await this.authCall((sdk) => sdk.catalogue.loadDateDataSets(this.workspace, {
                returnAllDateDataSets: shouldReturnAllDateDataSets,
                dataSetIdentifier: dataSetId,
                excludeObjectsWithTags: excludeTagsIds.length ? excludeTagsIds : undefined,
                includeObjectsWithTags: includeTagsIds.length ? includeTagsIds : undefined,
                includeDateGranularities,
            }));
            return result.dateDataSets;
        };
        this.loadBearCatalogItems = async () => {
            const { types, dataset } = this.options;
            const compatibleBearItemTypes = types.filter(isCompatibleCatalogItemType);
            if (compatibleBearItemTypes.length === 0) {
                return [];
            }
            const { includeTagsIds, excludeTagsIds, dataSetId } = await this.getTagsAndDatasetIds();
            const bearItemTypes = compatibleBearItemTypes.map(convertItemType);
            return this.authCall((sdk) => sdk.catalogue.loadAllItems(this.workspace, {
                types: bearItemTypes,
                includeWithTags: includeTagsIds.length ? includeTagsIds : undefined,
                excludeWithTags: excludeTagsIds.length ? excludeTagsIds : undefined,
                production: getProductionFlag(this.options),
                csvDataSets: dataset ? [dataSetId] : [],
            }));
        };
        this.loadBearAttributes = async (bearCatalogItems, dateDatasetAttributes) => {
            const { types } = this.options;
            const shouldLoadAttributes = types.some((type) => type === "attribute" || type === "dateDataset");
            if (!shouldLoadAttributes) {
                return [];
            }
            const bearCatalogAttributes = bearCatalogItems.filter(isCatalogAttribute);
            const attributeUris = bearCatalogAttributes.map((attr) => attr.links.self);
            const dateAttributeUris = dateDatasetAttributes.map((attr) => attr.attributeMeta.uri);
            return this.authCall((sdk) => sdk.md.getObjects(this.workspace, uniq([...attributeUris, ...dateAttributeUris])));
        };
        this.loadCatalogGroups = async () => {
            const { types, loadGroups } = this.options;
            const shouldLoadGroups = loadGroups && types.some(isGroupableCatalogItemType);
            if (!shouldLoadGroups) {
                return [];
            }
            const { dataset } = this.options;
            const { includeTagsIds, excludeTagsIds, dataSetId } = await this.getTagsAndDatasetIds();
            const bearCatalogGroups = await this.authCall((sdk) => sdk.catalogue.loadGroups(this.workspace, {
                includeWithTags: includeTagsIds.length ? includeTagsIds : undefined,
                excludeWithTags: excludeTagsIds.length ? excludeTagsIds : undefined,
                production: getProductionFlag(this.options),
                csvDataSets: dataset ? [dataSetId] : [],
            }));
            return bearCatalogGroups.map(convertGroup);
        };
        this.getTagsAndDatasetIds = async () => {
            if (!this.tagsAndDatasetIdsPromise) {
                const { dataset, includeTags, excludeTags } = this.options;
                this.tagsAndDatasetIdsPromise = Promise.all([
                    objRefsToIdentifiers(includeTags, this.authCall),
                    objRefsToIdentifiers(excludeTags, this.authCall),
                    dataset ? objRefToIdentifier(dataset, this.authCall) : Promise.resolve(""),
                ]).then(([includeTagsIds, excludeTagsIds, dataSetId]) => ({
                    dataSetId,
                    excludeTagsIds,
                    includeTagsIds,
                }));
            }
            return this.tagsAndDatasetIdsPromise;
        };
    }
    withOptions(options) {
        const newOptions = Object.assign(Object.assign({}, this.options), options);
        return new BearWorkspaceCatalogFactory(this.authCall, this.workspace, newOptions);
    }
    forDataset(dataset) {
        return this.withOptions({
            dataset,
        });
    }
    forTypes(types) {
        return this.withOptions({
            types,
        });
    }
    includeTags(tags) {
        return this.withOptions({
            includeTags: tags,
        });
    }
    excludeTags(tags) {
        return this.withOptions({
            excludeTags: tags,
        });
    }
    withGroups(loadGroups) {
        return this.withOptions({
            loadGroups,
        });
    }
    async load() {
        const [{ allCatalogItems, mappings }, catalogGroups] = await Promise.all([
            this.loadAllCatalogItemsAndMappings(),
            this.loadCatalogGroups(),
        ]);
        return new BearWorkspaceCatalog(this.authCall, this.workspace, catalogGroups, allCatalogItems, this.options, mappings);
    }
}
function extractDisplayFormsFromBearAttributes(attributes) {
    return flatMap(attributes, (attribute) => [
        attribute,
        ...attribute.attribute.content.displayForms.map((df) => ({ attributeDisplayForm: df })),
    ]);
}
function extractAttributeHierarchiesFromCatalogItems(items, dateDatasets) {
    const attributesWithDrillDownStep = items
        .filter(isCatalogAttribute)
        .filter((attr) => attr.attribute.drillDownStep);
    const dateAttributesWithDrillDownStep = dateDatasets.flatMap((dateDataset) => dateDataset.dateAttributes.filter((attr) => attr.attribute.drillDownStep));
    return [...attributesWithDrillDownStep, ...dateAttributesWithDrillDownStep].map((attr) => {
        const { attribute } = attr;
        const uri = v4(); // create a new uri for identification as this object is not a real Bear MD object
        return {
            type: "attributeHierarchy",
            attributeHierarchy: {
                type: "attributeHierarchy",
                id: uri,
                uri,
                ref: uriRef(uri),
                title: `Attribute hierarchy for ${attribute.title}`,
                description: "",
                production: true,
                deprecated: false,
                unlisted: false,
                attributes: [attribute.ref, attribute.drillDownStep],
            },
        };
    });
}
//# sourceMappingURL=factory.js.map