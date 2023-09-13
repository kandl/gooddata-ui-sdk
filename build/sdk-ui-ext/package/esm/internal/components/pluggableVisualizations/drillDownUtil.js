// (C) 2020-2022 GoodData Corporation
import { areObjRefsEqual, attributeLocalId, bucketItemLocalId, insightItems, insightModifyItems, insightProperties, insightReduceItems, insightSetFilters, insightSetProperties, isAttribute, modifyAttribute, newPositiveAttributeFilter, } from "@gooddata/sdk-model";
import { getIntersectionPartAfter, isDrillIntersectionAttributeItem, } from "@gooddata/sdk-ui";
import { drillDownDisplayForm, drillDownFromAttributeLocalId } from "../../utils/ImplicitDrillDownHelper";
import { isAttributeColumnWidthItem } from "@gooddata/sdk-ui-pivot";
function matchesDrillDownTargetAttribute(drillDefinition, attribute) {
    return attributeLocalId(attribute) === drillDownFromAttributeLocalId(drillDefinition);
}
var ENUM_PROPERTIES_TYPE;
(function (ENUM_PROPERTIES_TYPE) {
    ENUM_PROPERTIES_TYPE["CONTROLS"] = "controls";
})(ENUM_PROPERTIES_TYPE || (ENUM_PROPERTIES_TYPE = {}));
export function modifyBucketsAttributesForDrillDown(insight, drillDefinition) {
    const removedLeftAttributes = insightReduceItems(insight, (acc, cur) => {
        if (isAttribute(cur) && matchesDrillDownTargetAttribute(drillDefinition, cur)) {
            return [cur];
        }
        return [...acc, cur];
    });
    const replacedDrill = insightModifyItems(removedLeftAttributes, (bucketItem) => {
        if (isAttribute(bucketItem) && matchesDrillDownTargetAttribute(drillDefinition, bucketItem)) {
            const displayForm = drillDownDisplayForm(drillDefinition);
            return modifyAttribute(bucketItem, (a) => a.displayForm(displayForm).noAlias());
        }
        return bucketItem;
    });
    // remove duplicate attributes
    return insightReduceItems(replacedDrill, (acc, cur) => {
        if (isAttribute(cur)) {
            const alreadyContainsTarget = acc
                .filter(isAttribute)
                .find((attr) => areObjRefsEqual(cur.attribute.displayForm, attr.attribute.displayForm));
            return alreadyContainsTarget ? acc : [...acc, cur];
        }
        return [...acc, cur];
    });
}
function removePropertiesForRemovedAttributes(insight) {
    const properties = insightProperties(insight);
    if (!properties) {
        return insight;
    }
    const identifiers = insightItems(insight).map((bucketItem) => bucketItemLocalId(bucketItem));
    const result = Object.entries(properties).reduce((acc, [key, value]) => {
        if (key === ENUM_PROPERTIES_TYPE.CONTROLS && value.columnWidths) {
            const columns = value.columnWidths.filter((columnWidth) => {
                if (isAttributeColumnWidthItem(columnWidth)) {
                    return identifiers.includes(columnWidth.attributeColumnWidthItem.attributeIdentifier);
                }
                return true;
            });
            acc[key] = {
                columnWidths: columns,
            };
        }
        return acc;
    }, Object.assign({}, properties));
    return insightSetProperties(insight, result);
}
export function sanitizeTableProperties(insight) {
    return removePropertiesForRemovedAttributes(insight);
}
export function convertIntersectionToFilters(intersections, backendSupportsElementUris = true) {
    return intersections
        .map((intersection) => intersection.header)
        .filter(isDrillIntersectionAttributeItem)
        .map((header) => {
        if (backendSupportsElementUris) {
            return newPositiveAttributeFilter(header.attributeHeader.ref, {
                uris: [header.attributeHeaderItem.uri],
            });
        }
        return newPositiveAttributeFilter(header.attributeHeader.ref, {
            values: [header.attributeHeaderItem.name],
        });
    });
}
export function reverseAndTrimIntersection(drillConfig, intersection) {
    if (!intersection || intersection.length === 0) {
        return intersection;
    }
    const clicked = drillDownFromAttributeLocalId(drillConfig);
    const reorderedIntersection = intersection.slice().reverse();
    return getIntersectionPartAfter(reorderedIntersection, clicked);
}
/**
 * @internal
 */
export function addIntersectionFiltersToInsight(source, intersection, backendSupportsElementUris) {
    const filters = convertIntersectionToFilters(intersection, backendSupportsElementUris);
    const resultFilters = [...source.insight.filters, ...filters];
    return insightSetFilters(source, resultFilters);
}
//# sourceMappingURL=drillDownUtil.js.map