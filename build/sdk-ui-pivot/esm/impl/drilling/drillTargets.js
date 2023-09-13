// (C) 2007-2022 GoodData Corporation
import { getIntersectionAttributes, } from "@gooddata/sdk-ui";
export function getAvailableDrillTargets(dv, measureGroupDimension, columnHeadersPosition) {
    const measureDescriptors = dv
        .meta()
        .measureDescriptors()
        .map((measure) => ({
        measure,
        attributes: dv.meta().attributeDescriptors(),
    }));
    const dimensionIndex = measureGroupDimension === "rows" && columnHeadersPosition === "left" ? 1 : 0;
    const attributeItems = dv
        .meta()
        .attributeDescriptorsForDim(dimensionIndex)
        .map((attribute, _index, attributes) => ({
        attribute,
        intersectionAttributes: getIntersectionAttributes(attribute, attributes),
    }));
    return {
        measures: measureDescriptors,
        attributes: attributeItems,
    };
}
//# sourceMappingURL=drillTargets.js.map