// (C) 2022 GoodData Corporation
import { isAttributeDescriptor, isMeasureGroupDescriptor, measureMasterIdentifier, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
/**
 * Resolves custom override value for export payload.
 *
 * @param dimensions - the source of default values
 * @param definition - the source of custom values
 */
export const resolveCustomOverride = (dimensions, definition) => {
    var _a, _b;
    const customOverride = prepareCustomOverride(dimensions);
    const metrics = setDerivedMetrics(definition, setCustomMetrics(definition, (_a = customOverride === null || customOverride === void 0 ? void 0 : customOverride.metrics) !== null && _a !== void 0 ? _a : {}));
    const labels = setCustomLabels(definition, (_b = customOverride === null || customOverride === void 0 ? void 0 : customOverride.labels) !== null && _b !== void 0 ? _b : {});
    const result = {};
    if (!isEmpty(metrics)) {
        result.metrics = metrics;
    }
    if (!isEmpty(labels)) {
        result.labels = labels;
    }
    return isEmpty(result) ? undefined : result;
};
/**
 * Fills measures/metrics and attributes/labels with the lowest priority values, which serve as default.
 *
 * @param dimensions - the source of default values
 */
export const prepareCustomOverride = (dimensions) => {
    const metrics = {};
    const labels = {};
    for (const dimension of dimensions) {
        for (const header of dimension.headers) {
            if (isMeasureGroupDescriptor(header)) {
                header.measureGroupHeader.items.forEach(({ measureHeaderItem }) => {
                    const { localIdentifier, name, format } = measureHeaderItem;
                    metrics[localIdentifier] = {
                        title: name,
                        format: format,
                    };
                });
            }
            if (isAttributeDescriptor(header)) {
                const { localIdentifier, formOf } = header.attributeHeader;
                labels[localIdentifier] = {
                    title: formOf.name,
                };
            }
        }
    }
    return {
        metrics,
        labels,
    };
};
/**
 * Overwrites default measure/metric values with custom ones.
 * This function should be used after {@link prepareCustomOverride}, because it relies upon its output.
 *
 * @param definition - the source of custom values
 * @param metrics - return values from {@link prepareCustomOverride}
 */
export const setCustomMetrics = (definition, metrics) => definition.measures.reduce((result, measure) => {
    var _a;
    const { localIdentifier, alias, title, format } = measure.measure;
    return Object.assign(Object.assign({}, result), { [localIdentifier]: {
            title: (_a = alias !== null && alias !== void 0 ? alias : title) !== null && _a !== void 0 ? _a : result[localIdentifier].title,
            format: format !== null && format !== void 0 ? format : result[localIdentifier].format,
        } });
}, metrics);
/**
 * Overwrites formats of derived measures/metrics with values from master, which they should inherit.
 * This function should be used after {@link setCustomMetrics}, because it relies upon its output.
 *
 * @param definition - the source of data
 * @param metrics - return values from {@link setCustomMetrics}
 */
export const setDerivedMetrics = (definition, metrics) => definition.measures.reduce((result, measure) => {
    const masterId = measureMasterIdentifier(measure);
    if (!masterId) {
        return result;
    }
    const derivedId = measure.measure.localIdentifier;
    if (metrics[masterId].format) {
        return Object.assign(Object.assign({}, result), { [derivedId]: Object.assign(Object.assign({}, result[derivedId]), { format: metrics[masterId].format }) });
    }
    return result;
}, metrics);
/**
 * Overwrites default attribute/label values with custom ones.
 * This function should be used after {@link prepareCustomOverride}, because it relies upon its output.
 *
 * @param definition - the source of custom values
 * @param labels - return values from {@link prepareCustomOverride}
 */
export const setCustomLabels = (definition, labels) => definition.attributes.reduce((result, attribute) => {
    const { localIdentifier, alias } = attribute.attribute;
    return Object.assign(Object.assign({}, result), { [localIdentifier]: {
            title: alias !== null && alias !== void 0 ? alias : result[localIdentifier].title,
        } });
}, labels);
//# sourceMappingURL=utils.js.map