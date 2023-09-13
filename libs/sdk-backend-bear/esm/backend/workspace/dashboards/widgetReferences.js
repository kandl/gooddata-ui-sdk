// (C) 2019-2022 GoodData Corporation
import { widgetUri } from "@gooddata/sdk-model";
import { getObjectIdFromUri } from "../../../utils/api.js";
import { convertMetadataObject } from "../../../convertors/fromBackend/MetaConverter.js";
import isEmpty from "lodash/isEmpty.js";
import keyBy from "lodash/keyBy.js";
import { convertMetric } from "../../../convertors/fromBackend/CatalogConverter.js";
import { unwrapMetadataObject, } from "@gooddata/api-model-bear";
const objectTypeToObjectCategory = (type) => {
    if (type === "measure") {
        return "metric";
    }
    return type;
};
export class WidgetReferencesQuery {
    constructor(authCall, workspace, widget, requestedTypes) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.widget = widget;
        this.requestedTypes = requestedTypes;
        this.run = async () => {
            if (isEmpty(this.typesForXref)) {
                return {};
            }
            const xrefs = await this.findReferencedObjects();
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
         * Give the discovered references, bulk load data for objects of those types that the caller is interested in.
         */
        this.loadObjects = async (xrefs) => {
            const categories = this.typesForLoad.map(objectTypeToObjectCategory);
            const objectUrisToObtain = xrefs
                .filter((i) => categories.includes(i.category))
                .map((meta) => meta.link);
            return this.authCall((sdk) => sdk.md.getObjects(this.workspace, objectUrisToObtain));
        };
        const uri = widgetUri(this.widget);
        this.objectId = getObjectIdFromUri(uri);
        this.typesForXref = this.requestedTypes;
        this.typesForLoad = this.requestedTypes;
    }
    //
    //
    //
    createResult(objects) {
        const unwrappedObjects = objects.map(unwrapMetadataObject);
        const convertedObjects = unwrappedObjects.map(convertMetadataObject);
        const objectsByUri = keyBy(unwrappedObjects, (obj) => obj.meta.uri);
        const catalogItems = [];
        convertedObjects.forEach((obj) => {
            const fullObject = objectsByUri[obj.uri];
            if (obj.type === "measure") {
                catalogItems.push(convertMetric({ metric: fullObject }));
            }
        });
        return {
            catalogItems,
        };
    }
}
//# sourceMappingURL=widgetReferences.js.map