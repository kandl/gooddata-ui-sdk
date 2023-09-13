// (C) 2019-2022 GoodData Corporation
import { uriRef, } from "@gooddata/sdk-model";
import compact from "lodash/compact.js";
import isEmpty from "lodash/isEmpty.js";
import isNil from "lodash/isNil.js";
import omit from "lodash/omit.js";
import { isVisualizationObjectAbsoluteDateFilter, isVisualizationObjectArithmeticMeasureDefinition, isVisualizationObjectAttributeFilter, isVisualizationObjectMeasure, isVisualizationObjectMeasureValueFilter, isVisualizationObjectPoPMeasureDefinition, isVisualizationObjectPositiveAttributeFilter, isVisualizationObjectPreviousPeriodMeasureDefinition, isVisualizationObjectRankingFilter, } from "@gooddata/api-model-bear";
import { convertReferencesToUris } from "./ReferenceConverter.js";
import { deserializeProperties, serializeProperties } from "./PropertiesConverter.js";
import { fromBearRef, fromScopedBearRef } from "./ObjRefConverter.js";
// we use more lenient uri "detection" here because the one in bear-client makes some legacy data fail
// as the objId is not always just a number
const isUriLike = (value) => /\/gdc\/md\/\S+\/obj\/\S+/.test(value);
const convertAttributeElements = (items) => {
    if (!items.length) {
        // in case of empty filter assume that it is meant to be an URI-based one as these are much more common on bear
        return { uris: [] };
    }
    // we assume that all the items either use uris, or values, not both, since there is no way of representing the mixed variant
    const first = items[0];
    return isUriLike(first) ? { uris: items } : { values: items };
};
const convertMeasureValueFilter = (filter) => {
    return {
        measureValueFilter: {
            condition: filter.measureValueFilter.condition,
            measure: fromScopedBearRef(filter.measureValueFilter.measure, "measure"),
        },
    };
};
const convertRankingFilter = (filter) => {
    const { measures, operator, value, attributes } = filter.rankingFilter;
    return {
        rankingFilter: {
            measure: fromScopedBearRef(measures[0], "measure"),
            operator,
            value,
            attributes,
        },
    };
};
const convertFilter = (filter) => {
    if (isVisualizationObjectMeasureValueFilter(filter)) {
        return convertMeasureValueFilter(filter);
    }
    else if (isVisualizationObjectRankingFilter(filter)) {
        return convertRankingFilter(filter);
    }
    else {
        return convertMeasureFilter(filter);
    }
};
const convertMeasureFilter = (filter) => {
    if (isVisualizationObjectAttributeFilter(filter)) {
        if (isVisualizationObjectPositiveAttributeFilter(filter)) {
            return {
                positiveAttributeFilter: {
                    displayForm: fromBearRef(filter.positiveAttributeFilter.displayForm, "displayForm"),
                    in: convertAttributeElements(filter.positiveAttributeFilter.in),
                },
            };
        }
        return {
            negativeAttributeFilter: {
                displayForm: fromBearRef(filter.negativeAttributeFilter.displayForm, "displayForm"),
                notIn: convertAttributeElements(filter.negativeAttributeFilter.notIn),
            },
        };
    }
    else {
        if (isVisualizationObjectAbsoluteDateFilter(filter)) {
            return {
                absoluteDateFilter: {
                    dataSet: fromBearRef(filter.absoluteDateFilter.dataSet, "dataSet"),
                    from: filter.absoluteDateFilter.from || "",
                    to: filter.absoluteDateFilter.to || "",
                },
            };
        }
        // check for all-time filters with missing bounds (even one missing bound suggests an all time filter)
        // we cannot remove them, as they do make sense in some rare legacy contexts
        if (isNil(filter.relativeDateFilter.from) || isNil(filter.relativeDateFilter.to)) {
            console.warn("RelativeDateFilter without 'from' or 'to' field encountered." +
                "This can make sense in some legacy contexts (e.g. PoP measures with All time global filter), but generally, this indicates an error." +
                "Please check the visualization object data to make sure the relativeDateFilter data is what you expected.");
        }
        return {
            relativeDateFilter: Object.assign(Object.assign({}, filter.relativeDateFilter), { granularity: filter.relativeDateFilter.granularity, from: filter.relativeDateFilter.from, to: filter.relativeDateFilter.to }),
        };
    }
};
const convertMeasureDefinition = (definition) => {
    if (isVisualizationObjectArithmeticMeasureDefinition(definition)) {
        return definition;
    }
    if (isVisualizationObjectPoPMeasureDefinition(definition)) {
        return definition;
    }
    if (isVisualizationObjectPreviousPeriodMeasureDefinition(definition)) {
        return definition;
    }
    const { filters } = definition.measureDefinition;
    return {
        measureDefinition: Object.assign(Object.assign({}, definition.measureDefinition), { filters: filters ? compact(filters.map(convertMeasureFilter)) : [] }),
    };
};
const convertMeasure = (measure) => {
    const { definition } = measure.measure;
    return {
        measure: Object.assign(Object.assign({}, measure.measure), { definition: convertMeasureDefinition(definition) }),
    };
};
const convertAttribute = (attribute) => {
    return {
        attribute: Object.assign(Object.assign({}, attribute.visualizationAttribute), { displayForm: fromBearRef(attribute.visualizationAttribute.displayForm, "displayForm") }),
    };
};
const convertBucketItem = (bucketItem) => {
    return isVisualizationObjectMeasure(bucketItem)
        ? convertMeasure(bucketItem)
        : convertAttribute(bucketItem);
};
/**
 * @internal
 */
export const convertBucket = (bucket) => {
    return {
        items: bucket.items.map(convertBucketItem),
        localIdentifier: bucket.localIdentifier,
        totals: bucket.totals,
    };
};
const resolveReferences = (mdObject) => {
    const { content } = mdObject;
    if (!content) {
        return mdObject;
    }
    const { properties } = content;
    if (!properties) {
        return mdObject;
    }
    const { properties: convertedProperties, references: convertedReferences } = convertReferencesToUris({
        properties: deserializeProperties(properties),
        references: content.references || {},
    });
    // set the new properties and references
    const referencesProp = isEmpty(convertedReferences) ? undefined : { references: convertedReferences };
    return Object.assign(Object.assign({}, mdObject), { content: Object.assign(Object.assign(Object.assign({}, omit(mdObject.content, "references")), { properties: serializeProperties(convertedProperties) }), referencesProp) });
};
/**
 *
 * @internal
 */
export const convertVisualization = (visualization, visualizationClassUri, userMap) => {
    var _a, _b, _c;
    const withResolvedReferences = resolveReferences(visualization.visualizationObject);
    const { content, meta } = withResolvedReferences;
    const parsedProperties = deserializeProperties(content.properties);
    return {
        insight: {
            buckets: content.buckets.map(convertBucket),
            filters: content.filters ? compact(content.filters.map(convertFilter)) : [],
            ref: uriRef(meta.uri),
            // we assume that identifier is always defined for visualizations
            identifier: meta.identifier,
            properties: parsedProperties,
            sorts: parsedProperties.sortItems || [],
            title: meta.title,
            uri: meta.uri,
            visualizationUrl: visualizationClassUri,
            created: meta.created,
            createdBy: meta.author ? userMap === null || userMap === void 0 ? void 0 : userMap.get(meta.author) : undefined,
            updated: meta.updated,
            updatedBy: meta.contributor ? userMap === null || userMap === void 0 ? void 0 : userMap.get(meta.contributor) : undefined,
            isLocked: meta.locked,
            tags: (_b = (_a = meta.tags) === null || _a === void 0 ? void 0 : _a.split(" ").filter(Boolean)) !== null && _b !== void 0 ? _b : [],
            summary: (_c = meta.summary) !== null && _c !== void 0 ? _c : "",
        },
    };
};
export const convertListedVisualization = (visualizationLink) => {
    const ref = uriRef(visualizationLink.link);
    return {
        insight: {
            identifier: visualizationLink.identifier || "",
            title: visualizationLink.title || "",
            uri: visualizationLink.link,
            ref: ref,
            properties: [],
            sorts: [],
            visualizationUrl: "",
            buckets: [],
            filters: [],
            tags: [],
            created: visualizationLink.created,
            updated: visualizationLink.updated,
            summary: visualizationLink.summary,
        },
    };
};
//# sourceMappingURL=VisualizationConverter.js.map