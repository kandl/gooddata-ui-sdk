// (C) 2021-2023 GoodData Corporation
import { newMeasureMetadataObject } from "@gooddata/sdk-backend-base";
import { idRef } from "@gooddata/sdk-model";
import { isInheritedObject } from "./ObjectInheritance.js";
import { convertUserIdentifier } from "./UsersConverter.js";
/**
 * Type guard checking whether object is an instance of JsonApiMetricOutDocument.
 */
function isJsonApiMetricOutDocument(obj) {
    return obj.data !== undefined;
}
export function convertMetricFromBackend(data, included = []) {
    const { id, attributes, object, createdAt, createdBy, modifiedAt, modifiedBy } = getPropertiesFromData(data);
    const ref = idRef(id, "measure");
    return newMeasureMetadataObject(ref, (m) => m
        .id(id)
        .title((attributes === null || attributes === void 0 ? void 0 : attributes.title) || "")
        .isLocked(isInheritedObject(object))
        .description((attributes === null || attributes === void 0 ? void 0 : attributes.description) || "")
        .expression(attributes.content.maql)
        .format(attributes.content.format || "")
        .created(createdAt)
        .createdBy(convertUserIdentifier(createdBy, included))
        .updated(modifiedAt)
        .updatedBy(convertUserIdentifier(modifiedBy, included)));
}
function getPropertiesFromData(data) {
    var _a, _b, _c, _d;
    if (isJsonApiMetricOutDocument(data)) {
        return {
            id: data.data.id,
            attributes: data.data.attributes,
            object: data.data,
            createdAt: data.data.attributes.createdAt,
            modifiedAt: data.data.attributes.modifiedAt,
            createdBy: (_a = data.data.relationships) === null || _a === void 0 ? void 0 : _a.createdBy,
            modifiedBy: (_b = data.data.relationships) === null || _b === void 0 ? void 0 : _b.modifiedBy,
        };
    }
    return {
        id: data.id,
        attributes: data.attributes,
        object: data,
        createdAt: data.attributes.createdAt,
        modifiedAt: data.attributes.modifiedAt,
        createdBy: (_c = data.relationships) === null || _c === void 0 ? void 0 : _c.createdBy,
        modifiedBy: (_d = data.relationships) === null || _d === void 0 ? void 0 : _d.modifiedBy,
    };
}
//# sourceMappingURL=MetricConverter.js.map