// (C) 2021-2022 GoodData Corporation
import uniqBy from "lodash/fp/uniqBy.js";
import flatten from "lodash/flatten.js";
/**
 * @internal
 * Provides the subset of attributes which consist from all attributes before given attribute and attribute itself.
 * @param fromAttribute - attribute to which we want to get relevant intersection's attributes
 * @param attributes - all attributes from the same dimension as fromAttribute
 */
export function getIntersectionAttributes(fromAttribute, attributes) {
    const indexOfFromAttribute = attributes.findIndex((attribute) => 
    // to handle duplicated attributes in the same dimension
    attribute.attributeHeader.localIdentifier === fromAttribute.attributeHeader.localIdentifier);
    return attributes.slice(0, indexOfFromAttribute + 1);
}
function getAvailableDrillAttributes(dv) {
    return flatten(dv
        .meta()
        .dimensions()
        .map((_dimension, index) => {
        return dv
            .meta()
            .attributeDescriptorsForDim(index)
            .map((attribute, _index, attributes) => ({
            attribute,
            intersectionAttributes: getIntersectionAttributes(attribute, attributes),
        }));
    }));
}
export function getAvailableDrillTargets(dv) {
    const meta = dv.meta();
    const attributes = uniqBy((attributeDescriptor) => attributeDescriptor.attributeHeader.formOf.identifier, meta.attributeDescriptors());
    return {
        measures: meta
            .measureDescriptors()
            .filter((measure) => !meta.isVirtualMeasure(measure))
            .map((measure) => ({
            measure,
            attributes,
        })),
        attributes: getAvailableDrillAttributes(dv),
    };
}
//# sourceMappingURL=availableDrillTargets.js.map