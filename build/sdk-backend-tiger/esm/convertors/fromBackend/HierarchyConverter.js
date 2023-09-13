// (C) 2023 GoodData Corporation
import { idRef } from "@gooddata/sdk-model";
import compact from "lodash/compact.js";
export function convertAttributeHierarchy(hierarchyOut) {
    var _a, _b, _c, _d, _e;
    const { id, type, attributes, links } = hierarchyOut;
    const orderedAttributes = (_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.content) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : [];
    const convertedAttributes = orderedAttributes.map((attribute) => {
        var _a, _b;
        // content is free-form, so we need to make sure that all wanted properties are present
        if (!((_a = attribute.identifier) === null || _a === void 0 ? void 0 : _a.id) || !((_b = attribute.identifier) === null || _b === void 0 ? void 0 : _b.type)) {
            return undefined;
        }
        return idRef(attribute.identifier.id, attribute.identifier.type);
    });
    return {
        type: "attributeHierarchy",
        attributeHierarchy: {
            type: "attributeHierarchy",
            id,
            uri: (_c = links === null || links === void 0 ? void 0 : links.self) !== null && _c !== void 0 ? _c : "",
            ref: idRef(id, type),
            title: (_d = attributes === null || attributes === void 0 ? void 0 : attributes.title) !== null && _d !== void 0 ? _d : "",
            description: (_e = attributes === null || attributes === void 0 ? void 0 : attributes.description) !== null && _e !== void 0 ? _e : "",
            attributes: compact(convertedAttributes),
            production: true,
            deprecated: false,
            unlisted: false,
        },
    };
}
//# sourceMappingURL=HierarchyConverter.js.map