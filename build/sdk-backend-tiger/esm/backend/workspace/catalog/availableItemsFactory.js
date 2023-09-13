import { insightMeasures, insightAttributes, isAttribute, isFilter, isMeasure, insightFilters, areObjRefsEqual, isCatalogAttribute, isCatalogFact, isCatalogMeasure, isCatalogAttributeHierarchy, } from "@gooddata/sdk-model";
import { AfmValidObjectsQueryTypesEnum } from "@gooddata/api-client-tiger";
import intersectionWith from "lodash/intersectionWith.js";
import uniq from "lodash/uniq.js";
import { TigerWorkspaceCatalogWithAvailableItems } from "./catalogWithAvailableItems.js";
import { convertMeasure } from "../../../convertors/toBackend/afm/MeasureConverter.js";
import { convertAttribute } from "../../../convertors/toBackend/afm/AttributeConverter.js";
import { jsonApiIdToObjRef } from "../../../convertors/fromBackend/ObjRefConverter.js";
import { InvariantError } from "ts-invariant";
import { convertAfmFilters } from "../../../convertors/toBackend/afm/AfmFiltersConverter.js";
const typesMatching = {
    attribute: AfmValidObjectsQueryTypesEnum.ATTRIBUTES,
    fact: AfmValidObjectsQueryTypesEnum.FACTS,
    measure: AfmValidObjectsQueryTypesEnum.MEASURES,
    // dateDatasets are not supported by tiger in this context
};
const mapToTigerType = (type) => {
    var _a;
    return (_a = typesMatching[type]) !== null && _a !== void 0 ? _a : AfmValidObjectsQueryTypesEnum.UNRECOGNIZED;
};
/**
 * Converts a type T to type U that affects availability of items of type T in tiger.
 * @param type - type to convert
 */
const mapToTigerRestrictingType = (type) => {
    if (type === "dateDataset") {
        // date datasets' availability is restricted by their attributes' availability in tiger
        return "attribute";
    }
    if (type === "attributeHierarchy") {
        // attribute hierarchy availability is restricted by used attributes' availability in tiger
        return "attribute";
    }
    return type;
};
const getRestrictingTypes = (requested) => {
    return uniq(requested.map(mapToTigerRestrictingType));
};
const catalogItemRefs = (item) => {
    return isCatalogAttribute(item)
        ? [item.attribute.ref]
        : isCatalogFact(item)
            ? [item.fact.ref]
            : isCatalogMeasure(item)
                ? [item.measure.ref]
                : isCatalogAttributeHierarchy(item)
                    ? [item.attributeHierarchy.ref]
                    : item.dateAttributes.map((attr) => attr.attribute.ref);
};
export class TigerWorkspaceCatalogAvailableItemsFactory {
    constructor(authCall, workspace, groups, items, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.groups = groups;
        this.items = items;
        this.options = options;
    }
    withOptions(options) {
        const newOptions = Object.assign(Object.assign({}, this.options), options);
        return new TigerWorkspaceCatalogAvailableItemsFactory(this.authCall, this.workspace, this.groups, this.items, newOptions);
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
        return this.withOptions({
            loadGroups,
        });
    }
    async load() {
        const { items = [], insight, types } = this.options;
        if (items.length === 0 && !insight) {
            throw new InvariantError("No items or insight was specified!");
        }
        const relevantRestrictingTypes = getRestrictingTypes(types);
        const relevantItems = insight
            ? [...insightMeasures(insight), ...insightAttributes(insight), ...insightFilters(insight)]
            : items;
        const attributes = relevantItems.filter(isAttribute);
        const measures = relevantItems.filter(isMeasure);
        const filters = relevantItems.filter(isFilter);
        const { filters: afmFilters, auxMeasures } = convertAfmFilters(measures, filters);
        const afmValidObjectsQuery = {
            types: relevantRestrictingTypes.map(mapToTigerType),
            afm: {
                attributes: attributes.map(convertAttribute),
                measures: measures.map(convertMeasure),
                filters: afmFilters,
                auxMeasures,
            },
        };
        const availableItemsResponse = await this.authCall((client) => client.validObjects.computeValidObjects({
            workspaceId: this.workspace,
            afmValidObjectsQuery,
        }));
        const availableObjRefs = availableItemsResponse.data.items.map(jsonApiIdToObjRef);
        const availableItems = filterAvailableItems(availableObjRefs, this.items);
        const allAvailableItems = types.includes("attributeHierarchy")
            ? [...availableItems, ...this.items.filter(isCatalogAttributeHierarchy)]
            : [...availableItems];
        return new TigerWorkspaceCatalogWithAvailableItems(this.groups, this.items, allAvailableItems, this.options);
    }
}
/**
 * @internal
 */
export function filterAvailableItems(refs, items) {
    return items.filter((item) => {
        const itemRefs = catalogItemRefs(item);
        return intersectionWith(refs, itemRefs, areObjRefsEqual).length > 0;
    });
}
//# sourceMappingURL=availableItemsFactory.js.map