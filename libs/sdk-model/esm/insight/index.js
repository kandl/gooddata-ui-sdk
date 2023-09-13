// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import intersection from "lodash/intersection.js";
import { sortEntityIds } from "../execution/base/sort.js";
import { anyBucket, } from "../execution/buckets/index.js";
import { filterObjRef, isAttributeFilter } from "../execution/filter/index.js";
import { anyMeasure, measureFilters, measureLocalId, } from "../execution/measure/index.js";
import { anyAttribute, attributeDisplayFormRef, attributeLocalId, } from "../execution/attribute/index.js";
import { bucketsAttributes, bucketsById, bucketsFind, bucketsItems, bucketsMeasures, bucketsModifyItem, bucketsReduceItem, bucketsTotals, } from "../execution/buckets/bucketArray.js";
import { invariant } from "ts-invariant";
import identity from "lodash/identity.js";
import { serializeObjRef } from "../objRef/index.js";
import flatMap from "lodash/flatMap.js";
import uniqBy from "lodash/uniqBy.js";
/**
 * Type guard checking whether the provided object is an {@link IColorMappingItem}.
 *
 * @public
 */
export function isColorMappingItem(obj) {
    return !isEmpty(obj) && !!obj.color && !!obj.id;
}
//
// Type guards
//
/**
 * Type guard checking whether the provided object is an Insight.
 *
 * @public
 */
export function isInsight(obj) {
    return !isEmpty(obj) && obj.insight !== undefined;
}
//
// Functions
//
/**
 * Finds bucket matching the provided predicate in an insight.
 *
 * @remarks
 * This function also provides convenience to find bucket by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchBucket predicate.
 *
 * @param insight - insight to work with
 * @param idOrFun - local identifier or bucket predicate
 * @returns undefined if none match
 * @public
 */
export function insightBucket(insight, idOrFun = anyBucket) {
    invariant(insight, "insight must be specified");
    return bucketsFind(insight.insight.buckets, idOrFun);
}
/**
 * Gets buckets for the insight. If ids are provided, then only returns buckets matching the ids.
 *
 * @param insight - insight to work with
 * @param ids - local identifiers of buckets
 * @returns empty list if none match
 * @public
 */
export function insightBuckets(insight, ...ids) {
    invariant(insight, "insight must be specified");
    if (isEmpty(ids)) {
        return insight.insight.buckets;
    }
    return bucketsById(insight.insight.buckets, ...ids);
}
/**
 * Gets all attributes and measures used in the provided insight.
 *
 * @param insight - insight to work with
 * @returns empty if none
 * @public
 */
export function insightItems(insight) {
    invariant(insight, "insight must be specified");
    return bucketsItems(insight.insight.buckets);
}
/**
 * Gets all measures used in the provided insight.
 *
 * @param insight - insight to work with
 * @param measurePredicate - predicate to select measures satisfying some conditions
 * @returns empty if none
 * @public
 */
export function insightMeasures(insight, measurePredicate = anyMeasure) {
    invariant(insight, "insight must be specified");
    return bucketsMeasures(insight.insight.buckets, measurePredicate);
}
/**
 * Tests whether insight uses any measures.
 *
 * @param insight - insight to test
 * @returns true if any measures, false if not
 * @public
 */
export function insightHasMeasures(insight) {
    invariant(insight, "insight must be specified");
    return insightMeasures(insight).length > 0;
}
/**
 * Gets all attributes used in the provided insight
 *
 * @param insight - insight to work with
 * @param attributePredicate - predicate to select attributes satisfying some conditions
 * @returns empty if none
 * @public
 */
export function insightAttributes(insight, attributePredicate = anyAttribute) {
    invariant(insight, "insight must be specified");
    return bucketsAttributes(insight.insight.buckets, attributePredicate);
}
/**
 * Tests whether insight uses any attributes
 *
 * @param insight - insight to test
 * @returns true if any measures, false if not
 * @public
 */
export function insightHasAttributes(insight) {
    invariant(insight, "insight must be specified");
    return insightAttributes(insight).length > 0;
}
/**
 * Tests whether insight contains valid definition of data to visualise - meaning at least one attribute or
 * one measure is defined in the insight.
 *
 * @param insight - insight to test
 * @returns true if at least one measure or attribute, false if none
 * @public
 */
export function insightHasDataDefined(insight) {
    invariant(insight, "insight must be specified");
    return (insight.insight.buckets.length > 0 && (insightHasMeasures(insight) || insightHasAttributes(insight)));
}
/**
 * Gets filters used in an insight.
 *
 * @param insight - insight to work with
 * @public
 */
export function insightFilters(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.filters;
}
/**
 * Gets sorting defined in the insight.
 *
 * @remarks
 * Note: this function ensures that only sorts working on top of attributes and measures defined in the
 * insight will be returned. Any invalid entries will be stripped.
 *
 * @param insight - insight to get sorts from
 * @returns array of valid sorts
 * @public
 */
export function insightSorts(insight) {
    invariant(insight, "insight must be specified");
    const attributeIds = insightAttributes(insight).map(attributeLocalId);
    const measureIds = insightMeasures(insight).map(measureLocalId);
    function contains(arr1, arr2) {
        return intersection(arr1, arr2).length === arr2.length;
    }
    return insight.insight.sorts.filter((s) => {
        const entities = sortEntityIds(s);
        return (contains(attributeIds, entities.attributeIdentifiers) &&
            contains(measureIds, entities.measureIdentifiers));
    });
}
/**
 * Gets all totals defined in the insight
 *
 * @param insight - insight to get totals from
 * @returns empty if none
 * @public
 */
export function insightTotals(insight) {
    invariant(insight, "insight must be specified");
    return bucketsTotals(insight.insight.buckets);
}
/**
 * Gets visualization properties of an insight.
 *
 * @param insight - insight to get vis properties for
 * @returns empty object is no properties
 * @public
 */
export function insightProperties(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.properties;
}
/**
 * Gets URL of visualization that should be used to render this insight. This is a link to the location
 * where the visualization assets are stored and where they should be loaded and linked from.
 *
 * Note: at the moment, the SDK supports only compile-time linkage; for this the visualization URL
 * is in format "local:visName" (as in "local:bar" for BarChart)
 *
 * @param insight - insight to get visualization URL from
 * @alpha
 */
export function insightVisualizationUrl(insight) {
    invariant(insight, "insight to get vis class URI from must be specified");
    return insight.insight.visualizationUrl;
}
/**
 *
 * @param insight - insight to get visualization type
 * @alpha
 */
export function insightVisualizationType(insight) {
    var _a;
    invariant(insight, "insight to get vis type must be specified");
    return ((_a = insightVisualizationUrl(insight)) === null || _a === void 0 ? void 0 : _a.split(":")[1]) || "";
}
/**
 * Gets the insight title
 *
 * @param insight - insight to get title of
 * @returns the insight title
 * @public
 */
export function insightTitle(insight) {
    invariant(insight, "insight to get title from must be specified");
    return insight.insight.title;
}
/**
 * Gets the insights tags from the tagging system
 *
 * @param insight - insight to get the tags of
 * @returns the insight tags or aan empty array if none are specified
 * @public
 */
export function insightTags(insight) {
    var _a;
    invariant(insight, "insight must be specified");
    return (_a = insight.insight.tags) !== null && _a !== void 0 ? _a : [];
}
/**
 * Gets the insights summary
 *
 * @param insight - insight to get the summary of
 * @returns the insight summary or an empty string if is not specified
 * @public
 */
export function insightSummary(insight) {
    var _a;
    invariant(insight, "insight must be specified");
    return (_a = insight.insight.summary) !== null && _a !== void 0 ? _a : "";
}
/**
 * Gets opaque reference to the insight.
 *
 * @param insight - insight to get ref of
 * @public
 */
export function insightRef(insight) {
    invariant(insight, "insight to get ref of must be specified");
    return insight.insight.ref;
}
/**
 * Gets the insight id
 *
 * @param insight - insight to get id of
 * @returns the insight id
 * @public
 */
export function insightId(insight) {
    invariant(insight, "insight to get id of must be specified");
    return insight.insight.identifier;
}
/**
 * Gets the insight uri
 *
 * @param insight - insight to get uri of
 * @returns the insight uri
 * @public
 */
export function insightUri(insight) {
    invariant(insight, "insight to get uri of must be specified");
    return insight.insight.uri;
}
/**
 * Gets the date when the insight was created
 *
 * @param insight - insight
 * @returns string - YYYY-MM-DD HH:mm:ss
 * @public
 */
export function insightCreated(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.created;
}
/**
 * Gets the user that created the insight
 *
 * @param insight - insight
 * @returns string
 * @public
 */
export function insightCreatedBy(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.createdBy;
}
/**
 * Gets the date of the last insight update
 *
 * @param insight - insight
 * @returns string - YYYY-MM-DD HH:mm:ss
 * @public
 */
export function insightUpdated(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.updated;
}
/**
 * Gets the user that last updated the insight
 *
 * @param insight - insight
 * @returns string
 * @public
 */
export function insightUpdatedBy(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.updatedBy;
}
/**
 * Checks if insight is locked
 *
 * @param insight - insight
 * @returns boolean
 * @public
 */
export function insightIsLocked(insight) {
    invariant(insight, "insight must be specified");
    return insight.insight.isLocked || false;
}
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different properties.
 *
 * @remarks
 * New properties will be used in the new insight as-is, no merging with existing properties.
 *
 * @param insight - insight to work with
 * @param properties - new properties to have on the new insight
 * @returns always new instance
 * @public
 */
export function insightSetProperties(insight, properties = {}) {
    invariant(insight, "insight must be specified");
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { properties }),
    };
}
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different sorts.
 *
 * @remarks
 * New sorts will be used in the new insight as-is, no merging with existing sorts.
 *
 * @param insight - insight to work with
 * @param sorts - new sorts to apply
 * @returns always new instance
 * @public
 */
export function insightSetSorts(insight, sorts = []) {
    invariant(insight, "insight must be specified");
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { sorts }),
    };
}
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different filters.
 *
 * @remarks
 * New filters will be used in the new insight as-is, no merging with existing filters.
 *
 * @param insight - insight to work with
 * @param filters - new filters to apply
 * @returns always new instance
 * @public
 */
export function insightSetFilters(insight, filters = []) {
    invariant(insight, "insight must be specified");
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { filters }),
    };
}
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different buckets.
 *
 * @remarks
 * New buckets will be used in the new insight as-is, no merging with existing buckets.
 *
 * @param insight - insight to work with
 * @param buckets - new buckets to apply
 * @returns always new instance
 * @public
 */
export function insightSetBuckets(insight, buckets = []) {
    invariant(insight, "insight must be specified");
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { buckets }),
    };
}
/**
 * Creates a new insight with modified bucket items (retrieved by applying the modifications function to each bucketItem in the insight).
 *
 * @remarks
 * Note: the bucket item modification function SHOULD NOT modify bucket item's localId.
 * The localId MAY be used to reference the item from other places in the insight (for example from sorts).
 * Changing the item localId has potential to break the insight: as-is this function does not concern itself with changing the references.
 *
 * @param insight - insight to use as template for the new insight
 * @param modifications - modifications to apply to the bucket items
 * @returns always new instance
 * @public
 */
export function insightModifyItems(insight, modifications = identity) {
    invariant(insight, "insight must be specified");
    const buckets = insightBuckets(insight);
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { buckets: bucketsModifyItem(buckets, modifications) }),
    };
}
/**
 * Creates a new insight with reduced bucket items (retrieved by applying the modifications function).
 *
 * @remarks
 * Note: the bucket item modification function SHOULD NOT modify bucket item's localId.
 * The localId MAY be used to reference the item from other places in the insight (for example from sorts).
 * Changing the item localId has potential to break the insight: as-is this function does not concern itself with changing the references.
 *
 * @param insight - insight to use as template for the new insight
 * @param reducer - reduce function to apply to the bucket items
 * @returns always new instance
 * @public
 */
export function insightReduceItems(insight, reducer = identity) {
    invariant(insight, "insight must be specified");
    const buckets = insightBuckets(insight);
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { buckets: bucketsReduceItem(buckets, reducer) }),
    };
}
/**
 * Gets references to all display forms used by the insight.
 *
 * @remarks
 * The display forms may be used for slicing or dicing the
 * data, for filtering the entire insight or for filtering just some measures.
 *
 * @param insight - insight to get the display form usage from
 * @public
 */
export function insightDisplayFormUsage(insight) {
    invariant(insight, "insight must be specified");
    return {
        inAttributes: uniqBy(insightAttributes(insight).map(attributeDisplayFormRef), serializeObjRef),
        inFilters: uniqBy(insightFilters(insight)
            .filter(isAttributeFilter)
            .map((attributeFilter) => filterObjRef(attributeFilter)), serializeObjRef),
        inMeasureFilters: uniqBy(flatMap(insightMeasures(insight), (measure) => {
            var _a;
            const filters = (_a = measureFilters(measure)) !== null && _a !== void 0 ? _a : [];
            return filters
                .filter(isAttributeFilter)
                .map((attributeFilter) => filterObjRef(attributeFilter));
        }), serializeObjRef),
    };
}
//
// Visualization class functions
//
/**
 * For given visualization class, return URL where the vis assets are stored.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export function visClassUrl(vc) {
    invariant(vc, "vis class to get URL from must be specified");
    return vc.visualizationClass.url;
}
/**
 * For given visualization class, return its URI.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export function visClassUri(vc) {
    invariant(vc, "vis class to get URI from must be specified");
    return vc.visualizationClass.uri;
}
/**
 * For given visualization class, return its identifier.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export function visClassId(vc) {
    invariant(vc, "vis class to get URI from must be specified");
    return vc.visualizationClass.identifier;
}
//# sourceMappingURL=index.js.map