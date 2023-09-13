// (C) 2019-2023 GoodData Corporation
import { JsonApiLabelOutWithLinksTypeEnum, } from "@gooddata/api-client-tiger";
import keyBy from "lodash/keyBy.js";
import { newAttributeDisplayFormMetadataObject, newAttributeMetadataObject, newDashboardMetadataObject, newDataSetMetadataObject, } from "@gooddata/sdk-backend-base";
import { idRef, } from "@gooddata/sdk-model";
import { convertLabelType } from "./LabelTypeConverter.js";
export const commonMetadataObjectModifications = (item) => (builder) => {
    var _a, _b;
    return builder
        .id(item.id)
        .uri(item.links.self)
        .title(((_a = item.attributes) === null || _a === void 0 ? void 0 : _a.title) || "")
        .description(((_b = item.attributes) === null || _b === void 0 ? void 0 : _b.description) || "");
};
function createLabelMap(included) {
    if (!included) {
        return {};
    }
    const labels = included.filter((include) => {
        return include.type === JsonApiLabelOutWithLinksTypeEnum.LABEL;
    });
    return keyBy(labels, (t) => t.id);
}
/**
 * Converts all labels of this attribute. The map contains sideloaded label information
 */
function convertAttributeLabels(attribute, labelsMap) {
    var _a, _b, _c, _d;
    const labelsRefs = (_b = (_a = attribute.relationships) === null || _a === void 0 ? void 0 : _a.labels) === null || _b === void 0 ? void 0 : _b.data;
    const defaultView = (_d = (_c = attribute.relationships) === null || _c === void 0 ? void 0 : _c.defaultView) === null || _d === void 0 ? void 0 : _d.data;
    return labelsRefs
        .map((ref) => {
        var _a;
        const label = labelsMap[ref.id];
        if (!label) {
            return undefined;
        }
        const isDefault = defaultView ? defaultView.id === label.id : !!((_a = label.attributes) === null || _a === void 0 ? void 0 : _a.primary);
        return convertLabelWithLinks(label, attribute.id, isDefault);
    })
        .filter((df) => df !== undefined);
}
/**
 * Converts attribute when its sideloaded
 */
function convertAttributeWithLinks(attribute, labels) {
    return newAttributeMetadataObject(idRef(attribute.id, "attribute"), (m) => m
        .modify(commonMetadataObjectModifications(attribute))
        .displayForms(convertAttributeLabels(attribute, labels)));
}
/**
 * Converts attribute when its top-level
 */
function convertAttributeDocument(attributeDoc, labels) {
    const attribute = attributeDoc.data;
    return newAttributeMetadataObject(idRef(attribute.id, "attribute"), (m) => {
        var _a, _b;
        return m
            .id(attribute.id)
            .title(((_a = attribute.attributes) === null || _a === void 0 ? void 0 : _a.title) || "")
            .description(((_b = attribute.attributes) === null || _b === void 0 ? void 0 : _b.description) || "")
            .uri(attributeDoc.links.self)
            .displayForms(convertAttributeLabels(attribute, labels));
    });
}
/**
 * Converts label when its side-loaded. attributeId and isDefault must be passed by context because sideloaded
 * label does not contain relationships
 */
function convertLabelWithLinks(label, attributeId, isDefault) {
    return newAttributeDisplayFormMetadataObject(idRef(label.id, "displayForm"), (m) => {
        var _a, _b, _c;
        return m
            .id(label.id)
            .title(((_a = label.attributes) === null || _a === void 0 ? void 0 : _a.title) || "")
            .description(((_b = label.attributes) === null || _b === void 0 ? void 0 : _b.description) || "")
            .uri(label.links.self)
            .attribute(idRef(attributeId, "attribute"))
            .isDefault(isDefault)
            .displayFormType(convertLabelType((_c = label.attributes) === null || _c === void 0 ? void 0 : _c.valueType));
    });
}
//
//
//
/**
 * Converts result of a single attribute query with included labels into a {@link IAttributeMetadataObject}.
 *
 * @param attribute - response from backend
 */
export function convertAttributeWithSideloadedLabels(attribute) {
    const labels = createLabelMap(attribute.included);
    return convertAttributeDocument(attribute, labels);
}
/**
 * Converts result of attributes query with included labels into list of {@link IAttributeMetadataObject}s
 *
 * @param attributes - response from backend
 */
export function convertAttributesWithSideloadedLabels(attributes) {
    const labels = createLabelMap(attributes.included);
    /*
     * Filter out date data set attributes. Purely because there is special processing for them
     * in catalog & code generators. Want to stick to that.
     *
     */
    return attributes.data.map((attribute) => convertAttributeWithLinks(attribute, labels));
}
/**
 * Converts sideloaded dataset into {@link IDataSetMetadataObject}
 *
 * @param dataset - sideloaded dataset
 */
export function convertDatasetWithLinks(dataset) {
    return newDataSetMetadataObject(idRef(dataset.id, "dataSet"), (m) => m.modify(commonMetadataObjectModifications(dataset)));
}
/**
 * Converts sideloaded dashboard into {@link IDashboardMetadataObject}
 *
 * @param dashboard - sideloaded dashboard
 */
export function convertAnalyticalDashboardWithLinks(dashboard) {
    return newDashboardMetadataObject(idRef(dashboard.id, "analyticalDashboard"), (m) => m.modify(commonMetadataObjectModifications(dashboard)));
}
//# sourceMappingURL=MetadataConverter.js.map