import { isCatalogAttribute, isCatalogFact, isCatalogMeasure, insightItems, isAttribute, isArithmeticMeasure, isSimpleMeasure, attributeDisplayFormRef, isIdentifierRef, modifyAttribute, uriRef, modifySimpleMeasure, measureItem, attributeLocalId, measureLocalId, measureMasterIdentifier, isPoPMeasure, isPreviousPeriodMeasure, isMeasure, measurePopAttribute, modifyPopMeasure, isCatalogAttributeHierarchy, } from "@gooddata/sdk-model";
import { convertItemType, convertDateDataset, isCompatibleCatalogItemType, } from "../../../convertors/fromBackend/CatalogConverter.js";
import { convertInsightDefinition } from "../../../convertors/toBackend/InsightConverter.js";
import { BearWorkspaceCatalogWithAvailableItems } from "./catalogWithAvailableItems.js";
import { objRefToIdentifier, objRefsToIdentifiers } from "../../../utils/api.js";
import { InvariantError } from "ts-invariant";
const catalogItemUri = (catalogItem) => {
    if (isCatalogAttribute(catalogItem)) {
        return catalogItem.attribute.uri;
    }
    else if (isCatalogMeasure(catalogItem)) {
        return catalogItem.measure.uri;
    }
    else if (isCatalogFact(catalogItem)) {
        return catalogItem.fact.uri;
    }
    else if (isCatalogAttributeHierarchy(catalogItem)) {
        return catalogItem.attributeHierarchy.uri;
    }
    return catalogItem.dataSet.uri;
};
export class BearWorkspaceCatalogAvailableItemsFactory {
    constructor(authCall, workspace, groups, items, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }, mappings) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.groups = groups;
        this.items = items;
        this.options = options;
        this.mappings = mappings;
        this.loadAvailableCatalogItems = async (sanitizedVisualizationObject) => {
            const { types } = this.options;
            const compatibleBearItemTypes = types.filter(isCompatibleCatalogItemType);
            if (compatibleBearItemTypes.length === 0) {
                return [];
            }
            const bearTypes = compatibleBearItemTypes.map(convertItemType);
            const itemDescriptions = await this.authCall((sdk) => sdk.catalogue.loadItemDescriptionObjects(this.workspace, sanitizedVisualizationObject.content, this.mappings.attributeByDisplayFormUri));
            const availableItemUris = await this.authCall((sdk) => sdk.catalogue.loadAvailableItemUris(this.workspace, {
                catalogQueryRequest: {
                    bucketItems: itemDescriptions,
                    types: bearTypes,
                },
            }));
            const allAvailableItemUris = types.includes("attributeHierarchy")
                ? [...availableItemUris, ...this.items.filter(isCatalogAttributeHierarchy)]
                : [...availableItemUris];
            return this.items.filter((item) => allAvailableItemUris.includes(catalogItemUri(item)));
        };
        this.loadAvailableDateDatasets = async (sanitizedVisualizationObject) => {
            const { types, includeTags, excludeTags, dataset, production, includeDateGranularities } = this.options;
            const includeDateDatasets = types.includes("dateDataset");
            if (!includeDateDatasets) {
                return [];
            }
            const [includeTagsIds, excludeTagsIds, dataSetIdentifier] = await Promise.all([
                objRefsToIdentifiers(includeTags, this.authCall),
                objRefsToIdentifiers(excludeTags, this.authCall),
                dataset ? objRefToIdentifier(dataset, this.authCall) : Promise.resolve(""),
            ]);
            // only return all the date datasets ignoring production or custom datasets if neither of those were specified by the user
            const shouldReturnAllDateDataSets = !production && !dataSetIdentifier;
            const result = await this.authCall((sdk) => sdk.catalogue.loadDateDataSets(this.workspace, {
                bucketItems: sanitizedVisualizationObject.content,
                includeAvailableDateAttributes: true,
                dataSetIdentifier,
                attributesMap: this.mappings.attributeByDisplayFormUri,
                includeObjectsWithTags: includeTagsIds.length ? includeTagsIds : undefined,
                excludeObjectsWithTags: excludeTagsIds.length ? excludeTagsIds : undefined,
                returnAllDateDataSets: shouldReturnAllDateDataSets,
                includeDateGranularities,
            }));
            return result.dateDataSets.map((dateDataSet) => convertDateDataset(dateDataSet, this.mappings.attributeById));
        };
    }
    withOptions(options) {
        const newOptions = Object.assign(Object.assign({}, this.options), options);
        return new BearWorkspaceCatalogAvailableItemsFactory(this.authCall, this.workspace, this.groups, this.items, newOptions, this.mappings);
    }
    forDataset(dataset) {
        return this.withOptions({ dataset });
    }
    forTypes(types) {
        return this.withOptions({ types });
    }
    includeTags(tags) {
        return this.withOptions({ includeTags: tags });
    }
    excludeTags(tags) {
        return this.withOptions({ excludeTags: tags });
    }
    forItems(items) {
        return this.withOptions({ items });
    }
    forInsight(insight) {
        return this.withOptions({ insight });
    }
    withGroups(loadGroups) {
        return this.withOptions({ loadGroups });
    }
    async load() {
        const tempVisualizationObj = createVisObjectForAvailability(this.options, this.mappings);
        const [availableCatalogItems, availableDateDatasets] = await Promise.all([
            this.loadAvailableCatalogItems(tempVisualizationObj),
            this.loadAvailableDateDatasets(tempVisualizationObj),
        ]);
        const allAvailableCatalogItems = [...availableCatalogItems, ...availableDateDatasets];
        return new BearWorkspaceCatalogWithAvailableItems(this.groups, this.items, allAvailableCatalogItems, this.options);
    }
}
/**
 * Creates temporary visualization object, whose bucket items can then be used to construct the bucket items
 * used by the catalog resource. The construction of bucket items happens using some serious mojo in bear's api
 * client and requires these types of objects.
 *
 * This function will take all the items, strip arithmetic measures and measures derived from them,
 * transform all identifiers to URIs.
 */
function createVisObjectForAvailability(options, mappings) {
    const { items = [], insight } = options;
    if (items.length === 0 && !insight) {
        throw new Error("No items or insight was specified.");
    }
    const itemsToUse = insight ? insightItems(insight) : items;
    const validItems = filterItemsForAvailabilityQuery(itemsToUse);
    const itemsWithUris = validItems.map((item) => translateIdentifiersToUris(item, mappings));
    const tempInsight = {
        insight: {
            title: "",
            filters: [],
            properties: {},
            sorts: [],
            visualizationUrl: "",
            buckets: [
                {
                    items: itemsWithUris,
                },
            ],
        },
    };
    return convertInsightDefinition(tempInsight);
}
/*
 * Availability query must not contain arithmetic measures and measures derived from them.
 */
function filterItemsForAvailabilityQuery(items) {
    const arithmeticMeasuresIds = new Set();
    const otherMeasureIds = new Set();
    items.forEach((measure) => {
        if (isArithmeticMeasure(measure)) {
            arithmeticMeasuresIds.add(measureLocalId(measure));
        }
        else if (isMeasure(measure)) {
            otherMeasureIds.add(measureLocalId(measure));
        }
    });
    return items.filter((item) => {
        if (isAttribute(item) || isSimpleMeasure(item)) {
            return true;
        }
        else if (isArithmeticMeasure(item)) {
            return false;
        }
        else if (isPoPMeasure(item) || isPreviousPeriodMeasure(item)) {
            const masterMeasure = measureMasterIdentifier(item);
            // remove derived measures which are either derived from arithmetic measure or which do
            // not have their master among the items to query
            return !arithmeticMeasuresIds.has(masterMeasure) && otherMeasureIds.has(masterMeasure);
        }
        throw new InvariantError("unexpected type of item encountered while constructing items for availability query");
    });
}
function translateIdentifiersToUris(item, mappings) {
    var _a, _b;
    if (isAttribute(item)) {
        const ref = attributeDisplayFormRef(item);
        if (isIdentifierRef(ref)) {
            const displayForm = mappings.displayFormById[ref.identifier];
            return modifyAttribute(item, (m) => m.displayForm(uriRef(displayForm.meta.uri)).localId(attributeLocalId(item)));
        }
        return item;
    }
    else if (isSimpleMeasure(item)) {
        const ref = measureItem(item);
        if (isIdentifierRef(ref)) {
            const metric = mappings.measureById[ref.identifier];
            const fact = mappings.factById[ref.identifier];
            const uri = (_a = metric === null || metric === void 0 ? void 0 : metric.uri) !== null && _a !== void 0 ? _a : fact.uri;
            return modifySimpleMeasure(item, (m) => m.measureItem(uriRef(uri)).localId(measureLocalId(item)));
        }
        return item;
    }
    else if (isPoPMeasure(item)) {
        const ref = measurePopAttribute(item);
        if (isIdentifierRef(ref)) {
            const attribute = mappings.attributeById[ref.identifier];
            const dateAttribute = mappings.dateAttributeById[ref.identifier];
            const uri = (_b = attribute === null || attribute === void 0 ? void 0 : attribute.attribute.meta.uri) !== null && _b !== void 0 ? _b : dateAttribute.attribute.uri;
            return modifyPopMeasure(item, (m) => m.popAttribute(uriRef(uri)).localId(measureLocalId(item)));
        }
    }
    return item;
}
//# sourceMappingURL=availableItemsFactory.js.map