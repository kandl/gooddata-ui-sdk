// (C) 2019-2022 GoodData Corporation
import { insightUri } from "@gooddata/sdk-model";
import { unwrapMetadataObject, } from "@gooddata/api-model-bear";
import { getObjectIdFromUri } from "../../../utils/api.js";
import union from "lodash/union.js";
import { convertMetadataObject } from "../../../convertors/fromBackend/MetaConverter.js";
import flow from "lodash/flow.js";
import isEmpty from "lodash/isEmpty.js";
import values from "lodash/values.js";
import keyBy from "lodash/keyBy.js";
import flatMap from "lodash/fp/flatMap.js";
import uniqBy from "lodash/fp/uniqBy.js";
import { convertMetric, convertWrappedFact, convertWrappedAttribute, } from "../../../convertors/fromBackend/CatalogConverter.js";
const objectTypeToObjectCategory = (type) => {
    switch (type) {
        case "displayForm":
            return "attributeDisplayForm";
        case "measure":
            return "metric";
        case "variable":
            return "prompt";
        default:
            return type;
    }
};
const objectTypesWithLinkToDataset = ["fact", "attribute"];
const objectCategoriesWithLinkToDataset = objectTypesWithLinkToDataset.map(objectTypeToObjectCategory);
/**
 * Given requested types, return types of objects that should be queried using 'using2' resource
 *
 * 1. When user wants data set info, then facts and attributes always must be queried
 * 2. When user wants attribute or display form, then both must be queried because they are needed
 *    for the CatalogItem
 */
function typesForXref(types) {
    let enrichedTypes = types.includes("dataSet")
        ? union(types, objectTypesWithLinkToDataset)
        : types;
    if (types.includes("attribute") || types.includes("displayForm")) {
        enrichedTypes = union(enrichedTypes, ["attribute", "displayForm"]);
    }
    return enrichedTypes;
}
/**
 * Given requested types, return types of objects that should be loaded.
 *
 * When user wants attribute or display form, then both must be queried because they are needed for CatalogItem
 */
function typesForLoad(types) {
    if (types.includes("attribute") || types.includes("displayForm")) {
        return union(types, ["attribute", "displayForm"]);
    }
    return types;
}
export class InsightReferencesQuery {
    constructor(authCall, workspace, insight, requestedTypes) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.insight = insight;
        this.requestedTypes = requestedTypes;
        this.run = async () => {
            if (isEmpty(this.typesForXref)) {
                return {};
            }
            const xrefs = await this.findReferencedObjects();
            /*
             * If dataSet information is needed, do one more call to find out to which data sets do the
             * different facts and attributes belong. Query resource cannot return dataSets because the relationship
             * to dataSets is in the 'opposite direction'.
             */
            if (this.requestedTypes.includes("dataSet")) {
                const datasets = await this.findDatasets(xrefs);
                xrefs.push(...datasets);
            }
            /*
             * Xrefs do not contain all the necessary information. Load the referenced objects.
             */
            const objects = await this.loadObjects(xrefs);
            return this.createResult(objects);
        };
        //
        //
        //
        /**
         * Uses the query resource to obtain all objects of the desired types which are used by the insight.
         */
        this.findReferencedObjects = async () => {
            const categories = this.typesForXref.map(objectTypeToObjectCategory);
            const { entries: allDirectObjects } = await this.authCall((sdk) => sdk.xhr.getParsed(`/gdc/md/${this.workspace}/using2/${this.objectId}?types=${categories.join(",")}`));
            return allDirectObjects;
        };
        /**
         * Given objects used by the insight, retrieve dataSets to which they belong. The usedBy2 is bulk mode
         * is used for this.
         */
        this.findDatasets = async (objects) => {
            // only some object types will have a reference to a dataSet, so no need to load other object types
            const uris = objects
                .filter((i) => objectCategoriesWithLinkToDataset.includes(i.category))
                .map((i) => i.link);
            const usedByPayload = {
                inUseMany: {
                    uris,
                    types: ["dataSet"],
                    nearest: false,
                },
            };
            const datasetResponses = await this.authCall((sdk) => {
                return sdk.xhr.postParsed(`/gdc/md/${this.workspace}/usedby2`, {
                    body: usedByPayload,
                });
            });
            return flow(flatMap((response) => response.entries), uniqBy((dataSet) => dataSet.identifier))(values(datasetResponses.useMany));
        };
        /**
         * Give the discovered references, bulk load data for objects of those types that the caller is interested in.
         */
        this.loadObjects = async (xrefs) => {
            const categories = this.typesForLoad.map(objectTypeToObjectCategory);
            const objectUrisToObtain = xrefs
                .filter((i) => categories.includes(i.category))
                .map((meta) => meta.link);
            return this.authCall((sdk) => sdk.md.getObjects(this.workspace, objectUrisToObtain));
        };
        const uri = insightUri(this.insight);
        this.objectId = getObjectIdFromUri(uri);
        this.typesForXref = typesForXref(this.requestedTypes);
        this.typesForLoad = typesForLoad(this.requestedTypes);
    }
    //
    //
    //
    createResult(objects) {
        const unwrappedObjects = objects.map(unwrapMetadataObject);
        const convertedObjects = unwrappedObjects.map(convertMetadataObject);
        const wantDatasets = this.requestedTypes.includes("dataSet");
        if (this.requestedTypes.length === 1 && wantDatasets) {
            return {
                dataSetMeta: convertedObjects,
            };
        }
        const objectsByUri = keyBy(unwrappedObjects, (obj) => obj.meta.uri);
        const catalogItems = [];
        const dataSetMeta = [];
        convertedObjects.forEach((obj) => {
            const fullObject = objectsByUri[obj.uri];
            switch (obj.type) {
                case "displayForm":
                case "variable":
                    /*
                     * TODO: implement conversions in order to support these additional types;
                     *  attributeDf -> catalog item? or tis this reliably covered by "attribute" objects
                     *  variable -> ?? not catalog item, probably something else..
                     */
                    break;
                case "attribute":
                    catalogItems.push(convertWrappedAttribute({ attribute: fullObject }));
                    break;
                case "fact":
                    catalogItems.push(convertWrappedFact({ fact: fullObject }));
                    break;
                case "measure":
                    catalogItems.push(convertMetric({ metric: fullObject }));
                    break;
                case "dataSet":
                    dataSetMeta.push(obj);
                    break;
            }
        });
        const datasetProp = wantDatasets ? { dataSetMeta } : {};
        return Object.assign(Object.assign({}, datasetProp), { catalogItems });
    }
}
//# sourceMappingURL=insightReferences.js.map