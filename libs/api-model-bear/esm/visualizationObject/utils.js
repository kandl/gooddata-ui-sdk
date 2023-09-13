// (C) 2007-2022 GoodData Corporation
import { isVisualizationObjectMeasureDefinition, isVisualizationObjectAttribute, isVisualizationObjectMeasure, isVisualizationObjectAttributeFilter, isVisualizationObjectPositiveAttributeFilter, } from "./GdcVisualizationObject.js";
function getAttributesInBucket(bucket) {
    return bucket.items.reduce((list, bucketItem) => {
        if (isVisualizationObjectAttribute(bucketItem)) {
            list.push(bucketItem.visualizationAttribute);
        }
        return list;
    }, []);
}
function getAttributes(mdObject) {
    const buckets = mdObject.buckets;
    return buckets.reduce((categoriesList, bucket) => {
        categoriesList.push(...getAttributesInBucket(bucket));
        return categoriesList;
    }, []);
}
function getMeasuresInBucket(bucket) {
    return bucket.items.reduce((list, bucketItem) => {
        if (isVisualizationObjectMeasure(bucketItem)) {
            list.push(bucketItem.measure);
        }
        return list;
    }, []);
}
function getDefinition(measure) {
    return isVisualizationObjectMeasureDefinition(measure.definition)
        ? measure.definition.measureDefinition
        : undefined;
}
function getMeasures(mdObject) {
    const buckets = mdObject.buckets;
    return buckets.reduce((measuresList, bucket) => {
        measuresList.push(...getMeasuresInBucket(bucket));
        return measuresList;
    }, []);
}
function getMeasureFilters(measure) {
    var _a, _b;
    return (_b = (_a = getDefinition(measure)) === null || _a === void 0 ? void 0 : _a.filters) !== null && _b !== void 0 ? _b : [];
}
function getMeasureAttributeFilters(measure) {
    return getMeasureFilters(measure).filter(isVisualizationObjectAttributeFilter);
}
function getAttributeFilters(mdObject) {
    return getMeasures(mdObject).reduce((filters, measure) => {
        filters.push(...getMeasureAttributeFilters(measure));
        return filters;
    }, []);
}
function getAttributeFilterDisplayForm(measureFilter) {
    return isVisualizationObjectPositiveAttributeFilter(measureFilter)
        ? measureFilter.positiveAttributeFilter.displayForm.uri
        : measureFilter.negativeAttributeFilter.displayForm.uri;
}
/**
 * @public
 */
export function getAttributesDisplayForms(mdObject) {
    const attributesDfs = getAttributes(mdObject).map((attribute) => attribute.displayForm.uri);
    const attrMeasureFilters = getAttributeFilters(mdObject);
    const attrMeasureFiltersDfs = attrMeasureFilters.map(getAttributeFilterDisplayForm);
    return [...attrMeasureFiltersDfs, ...attributesDfs];
}
//# sourceMappingURL=utils.js.map