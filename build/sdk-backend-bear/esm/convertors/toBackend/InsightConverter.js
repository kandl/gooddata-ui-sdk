import { insightBuckets, insightVisualizationUrl, isMeasure, attributeLocalId, attributeAlias, attributeDisplayFormRef, insightTitle, insightFilters, insightProperties, insightId, insightUri, insightIsLocked, insightCreated, insightUpdated, insightTags, insightSummary, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import omitBy from "lodash/omitBy.js";
import { convertUrisToReferences } from "../fromBackend/ReferenceConverter.js";
import { serializeProperties } from "../fromBackend/PropertiesConverter.js";
import { convertExtendedFilter } from "./FilterConverter.js";
import { convertMeasure } from "./MeasureConverter.js";
const convertAttribute = (attribute) => {
    const alias = attributeAlias(attribute);
    return {
        visualizationAttribute: Object.assign({ localIdentifier: attributeLocalId(attribute), displayForm: attributeDisplayFormRef(attribute) }, (alias && { alias })),
    };
};
const convertBucketItem = (bucketItem) => {
    return isMeasure(bucketItem) ? convertMeasure(bucketItem) : convertAttribute(bucketItem);
};
const convertBucket = (bucket) => {
    const { totals } = bucket;
    return Object.assign({ items: bucket.items.map(convertBucketItem), localIdentifier: bucket.localIdentifier }, (!isEmpty(totals) && { totals }));
};
/**
 * @internal
 */
export const convertInsightContent = (insight) => {
    const { properties, references } = convertUrisToReferences({
        properties: insightProperties(insight),
        references: {},
    });
    const nonEmptyProperties = omitBy(properties, (value, key) => key !== "controls" && isEmpty(value));
    const filters = insightFilters(insight).map(convertExtendedFilter);
    return Object.assign(Object.assign(Object.assign({ buckets: insightBuckets(insight).map(convertBucket), visualizationClass: { uri: insightVisualizationUrl(insight) } }, (!isEmpty(nonEmptyProperties) && {
        properties: serializeProperties(nonEmptyProperties),
    })), (!isEmpty(filters) && { filters })), (!isEmpty(references) && { references }));
};
/**
 * @internal
 */
export const convertInsightDefinition = (insight) => {
    return {
        content: convertInsightContent(insight),
        meta: {
            title: insightTitle(insight),
            category: "visualizationObject",
            summary: insightSummary(insight),
        },
    };
};
/**
 * @internal
 */
export const convertInsight = (insight) => {
    const convertedDefinition = convertInsightDefinition(insight);
    const locked = insightIsLocked(insight);
    return {
        content: convertedDefinition.content,
        meta: Object.assign(Object.assign(Object.assign(Object.assign({}, convertedDefinition.meta), { identifier: insightId(insight), uri: insightUri(insight), created: insightCreated(insight), updated: insightUpdated(insight) }), (locked && { locked })), { tags: insightTags(insight).join(" ") }),
    };
};
//# sourceMappingURL=InsightConverter.js.map