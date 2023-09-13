// (C) 2007-2023 GoodData Corporation
import { isAttributeDescriptor, isTotalDescriptor, isMeasureDescriptor, isResultAttributeHeader, } from "@gooddata/sdk-model";
import findIndex from "lodash/findIndex.js";
import { identifierMatch, uriMatch } from "../headerMatching/HeaderPredicateFactory.js";
import { isDrillableItemIdentifier, isDrillableItemUri, isDrillIntersectionAttributeItem, } from "./DrillEvents.js";
/**
 * @internal
 */
export function isSomeHeaderPredicateMatched(drillablePredicates, header, dv) {
    return drillablePredicates.some((drillablePredicate) => drillablePredicate(header, { dv }));
}
/**
 * @internal
 */
export function convertDrillableItemsToPredicates(drillableItems) {
    return drillableItems.map((drillableItem) => {
        if (isDrillableItemUri(drillableItem)) {
            return uriMatch(drillableItem.uri);
        }
        else if (isDrillableItemIdentifier(drillableItem)) {
            return identifierMatch(drillableItem.identifier);
        }
        else {
            return drillableItem;
        }
    });
}
/**
 * @internal
 */
export function getIntersectionPartAfter(intersection, localIdentifier) {
    const index = findIndex(intersection, (item) => isDrillIntersectionAttributeItem(item.header) &&
        item.header.attributeHeader.localIdentifier === localIdentifier);
    return intersection.slice(index);
}
/**
 * @internal
 */
export function getDrillIntersection(drillItems) {
    return drillItems.reduce((drillIntersection, drillItem, index, drillItems) => {
        if (isAttributeDescriptor(drillItem)) {
            const attributeItem = drillItems[index - 1]; // attribute item is always before attribute
            if (attributeItem && isResultAttributeHeader(attributeItem)) {
                drillIntersection.push({
                    header: Object.assign(Object.assign({}, convertToEmpty(attributeItem)), drillItem),
                });
            }
            else {
                // no attr. item before attribute -> use only attribute header
                drillIntersection.push({
                    header: drillItem,
                });
            }
        }
        else if (isMeasureDescriptor(drillItem) || isTotalDescriptor(drillItem)) {
            drillIntersection.push({
                header: drillItem,
            });
        }
        return drillIntersection;
    }, []);
}
/**
 * Fire a new drill event built from the provided data to the target that have a 'dispatchEvent' method.
 *
 * @param drillEventFunction - custom drill event function which could process and prevent default post message event.
 * @param drillEventData - The event data in `{ executionContext, drillContext }` format.
 * @param target - The target where the built event must be dispatched.
 * @internal
 */
export function fireDrillEvent(drillEventFunction, drillEventData, target) {
    const shouldDispatchPostMessage = drillEventFunction === null || drillEventFunction === void 0 ? void 0 : drillEventFunction(drillEventData);
    if (shouldDispatchPostMessage !== false) {
        target.dispatchEvent(new CustomEvent("drill", {
            detail: drillEventData,
            bubbles: true,
        }));
    }
}
function convertToEmpty(attributeItem) {
    var _a;
    const { attributeHeaderItem } = attributeItem;
    // This is special behaviour for tiger when we allowed empty string or null
    // In this case if uri is one of these special value, set on same value also name
    // because there is now some special ui value (from example "(empty value)") which is not
    // valid for this case
    const values = ["", null];
    const isEmpty = values.indexOf(attributeHeaderItem.uri) >= 0;
    return Object.assign(Object.assign({}, attributeItem), { attributeHeaderItem: Object.assign(Object.assign({}, attributeHeaderItem), { 
            // Send empty string for not, need to be updated for NULL in future
            name: isEmpty ? "" : (_a = attributeHeaderItem.name) !== null && _a !== void 0 ? _a : "" }) });
}
//# sourceMappingURL=drilling.js.map