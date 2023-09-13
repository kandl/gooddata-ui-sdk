// (C) 2019-2023 GoodData Corporation
import { MetadataUtilities, JsonApiLabelOutAttributesValueTypeEnum, } from "@gooddata/api-client-tiger";
import values from "lodash/values.js";
import { convertAttribute, convertDateAttribute, convertDateDataset, } from "../../../convertors/fromBackend/CatalogConverter.js";
import { addRsqlFilterToParams } from "./rsqlFilter.js";
import { convertAttributeHierarchy } from "../../../convertors/fromBackend/HierarchyConverter.js";
function lookupRelatedObject(included, id, type) {
    if (!included) {
        return;
    }
    return included === null || included === void 0 ? void 0 : included.find((item) => item.type === type && item.id === id);
}
function getAttributeLabels(attribute, included) {
    var _a, _b;
    const labelsRefs = (_b = (_a = attribute.relationships) === null || _a === void 0 ? void 0 : _a.labels) === null || _b === void 0 ? void 0 : _b.data;
    return labelsRefs
        .map((ref) => {
        const obj = lookupRelatedObject(included, ref.id, ref.type);
        if (!obj) {
            return;
        }
        return obj;
    })
        .filter((obj) => obj !== undefined);
}
function isGeoLabel(label) {
    var _a;
    const type = (_a = label.attributes) === null || _a === void 0 ? void 0 : _a.valueType;
    return (type === JsonApiLabelOutAttributesValueTypeEnum.GEO ||
        type === JsonApiLabelOutAttributesValueTypeEnum.GEO_LATITUDE ||
        type === JsonApiLabelOutAttributesValueTypeEnum.GEO_LONGITUDE);
}
function createNonDateAttributes(attributes) {
    const nonDateAttributes = attributes.data.filter((attr) => { var _a; return ((_a = attr.attributes) === null || _a === void 0 ? void 0 : _a.granularity) === undefined; });
    return nonDateAttributes.map((attribute) => {
        var _a, _b;
        const allLabels = getAttributeLabels(attribute, attributes.included);
        const geoLabels = allLabels.filter(isGeoLabel);
        const defaultView = (_b = (_a = attribute.relationships) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b.data;
        const defaultViewLabel = defaultView && allLabels.find((label) => label.id === defaultView.id);
        // use the defaultView if available, fall back to primary: exactly one label is guaranteed to be primary
        const defaultLabel = defaultViewLabel !== null && defaultViewLabel !== void 0 ? defaultViewLabel : allLabels.filter((label) => label.attributes.primary)[0];
        return convertAttribute(attribute, defaultLabel, geoLabels, allLabels);
    });
}
function identifyDateDatasets(dateAttributes, included) {
    const datasets = {};
    dateAttributes.forEach((attribute) => {
        var _a, _b;
        const ref = (_b = (_a = attribute.relationships) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.data;
        if (!ref) {
            return;
        }
        const dataset = lookupRelatedObject(included, ref.id, ref.type);
        if (!dataset) {
            return;
        }
        const entry = datasets[ref.id];
        if (!entry) {
            datasets[ref.id] = {
                dataset,
                attributes: [attribute],
            };
        }
        else {
            entry.attributes.push(attribute);
        }
    });
    return values(datasets);
}
function createDateDatasets(attributes) {
    const dateAttributes = attributes.data.filter((attr) => { var _a; return ((_a = attr.attributes) === null || _a === void 0 ? void 0 : _a.granularity) !== undefined; });
    const dateDatasets = identifyDateDatasets(dateAttributes, attributes.included);
    return dateDatasets
        .map((dd) => {
        const catalogDateAttributes = dd.attributes.map((attribute) => {
            const labels = getAttributeLabels(attribute, attributes.included);
            const defaultLabel = labels[0];
            return convertDateAttribute(attribute, defaultLabel, labels);
        });
        return convertDateDataset(dd.dataset, catalogDateAttributes);
    })
        .sort((a, b) => a.dataSet.title.localeCompare(b.dataSet.title));
}
function createAttributeHierarchies(attributes) {
    var _a;
    const included = (_a = attributes.included) !== null && _a !== void 0 ? _a : [];
    const outAttributeHierarchies = included.filter((item) => item.type === "attributeHierarchy");
    return outAttributeHierarchies.map(convertAttributeHierarchy);
}
export async function loadAttributesAndDateDatasetsAndHierarchies(client, workspaceId, rsqlFilter, loadAttributes, loadDateDatasets, loadAttributeHierarchies) {
    const includeObjects = ["labels", "defaultView"];
    if (loadDateDatasets) {
        includeObjects.push("dataset");
    }
    if (loadAttributeHierarchies) {
        includeObjects.push("attributeHierarchies");
    }
    const params = addRsqlFilterToParams({ workspaceId, include: includeObjects }, rsqlFilter);
    const attributes = await MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesAttributes, params).then(MetadataUtilities.mergeEntitiesResults);
    const catalogItems = [];
    if (loadAttributes) {
        const nonDateAttributes = createNonDateAttributes(attributes);
        catalogItems.push(...nonDateAttributes);
    }
    if (loadDateDatasets) {
        const dateDatasets = createDateDatasets(attributes);
        catalogItems.push(...dateDatasets);
    }
    if (loadAttributeHierarchies) {
        const attributeHierarchies = createAttributeHierarchies(attributes);
        catalogItems.push(...attributeHierarchies);
    }
    return catalogItems;
}
//# sourceMappingURL=datasetLoader.js.map