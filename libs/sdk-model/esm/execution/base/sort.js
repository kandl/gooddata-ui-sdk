import { attributeLocalId } from "../attribute/index.js";
import { measureLocalId } from "../measure/index.js";
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
//
// Type guards
//
/**
 * Type guard checking whether an object is an attribute sort item.
 *
 * @public
 */
export function isAttributeSort(obj) {
    return !isEmpty(obj) && obj.attributeSortItem !== undefined;
}
/**
 * Type guard checking whether an object is an attribute area sort item.
 *
 * @public
 */
export function isAttributeAreaSort(obj) {
    return isAttributeSort(obj) && obj.attributeSortItem.aggregation !== undefined;
}
/**
 * Type guard checking whether an object is a normal attribute value sort item, not the area one.
 *
 * @public
 */
export function isAttributeValueSort(obj) {
    return isAttributeSort(obj) && !isAttributeAreaSort(obj);
}
/**
 * Type guard checking whether an object is a measure sort item.
 *
 * @public
 */
export function isMeasureSort(obj) {
    return !isEmpty(obj) && obj.measureSortItem !== undefined;
}
/**
 * Type guard checking whether an object is an attribute locator.
 *
 * @public
 */
export function isAttributeLocator(obj) {
    return !isEmpty(obj) && obj.attributeLocatorItem !== undefined;
}
/**
 * Type guard checking whether an object is a total locator.
 *
 * @public
 */
export function isTotalLocator(obj) {
    return !isEmpty(obj) && obj.totalLocatorItem !== undefined;
}
/**
 * Type guard checking whether an object is measure locator
 *
 * @public
 */
export function isMeasureLocator(obj) {
    return !isEmpty(obj) && obj.measureLocatorItem !== undefined;
}
//
// Public functions
//
/**
 * Gets sort item's direction
 * @param sort - sort item.
 * @public
 */
export function sortDirection(sort) {
    invariant(sort, "sort item must be specified");
    if (isAttributeSort(sort)) {
        return sort.attributeSortItem.direction;
    }
    else {
        return sort.measureSortItem.direction;
    }
}
/**
 * Given sort item, returns ids of entities (objects) that are referenced by the sort item.
 *
 * @remarks
 * The ids are returned in an categorized way.
 *
 * @public
 */
export function sortEntityIds(sort) {
    invariant(sort, "sort item must be specified");
    const res = {
        attributeIdentifiers: [],
        measureIdentifiers: [],
        allIdentifiers: [],
    };
    if (isAttributeSort(sort)) {
        const attrId = sort.attributeSortItem.attributeIdentifier;
        res.attributeIdentifiers.push(attrId);
        res.allIdentifiers.push(attrId);
    }
    else if (isMeasureSort(sort)) {
        sort.measureSortItem.locators.forEach((loc) => {
            if (isAttributeLocator(loc)) {
                const attrId = loc.attributeLocatorItem.attributeIdentifier;
                res.attributeIdentifiers.push(attrId);
                res.allIdentifiers.push(attrId);
            }
            else if (isMeasureLocator(loc)) {
                const measureId = loc.measureLocatorItem.measureIdentifier;
                res.measureIdentifiers.push(measureId);
                res.allIdentifiers.push(measureId);
            }
        });
    }
    return res;
}
/**
 * Given a measure sort item, return the locators which identify the measure (possibly scoped for particular
 * attribute element).
 *
 * @param sort - measure sort items
 * @returns measure sort locators
 * @public
 */
export function sortMeasureLocators(sort) {
    return sort.measureSortItem.locators;
}
/**
 * Given attribute locator, return the localId of attribute that it references.
 *
 * @param locator - attribute locator
 * @returns attribute localId
 * @public
 */
export function attributeLocatorIdentifier(locator) {
    return locator.attributeLocatorItem.attributeIdentifier;
}
/**
 * Given attribute locator, return the element that it references.
 *
 * @param locator - attribute locator
 * @returns attribute element
 * @public
 */
export function attributeLocatorElement(locator) {
    return locator.attributeLocatorItem.element;
}
/**
 * Given measure locator, return the localId of measure that it references.
 *
 * @param locator - measure locator
 * @returns measure localId
 * @public
 */
export function measureLocatorIdentifier(locator) {
    return locator.measureLocatorItem.measureIdentifier;
}
/**
 * Creates a new attribute sort - sorting the result by values of the provided attribute's elements.
 *
 * @remarks
 * The attribute can be either specified by value or by reference using its local identifier.
 *
 * @param attributeOrId - attribute to sort by
 * @param sortDirection - asc or desc, defaults to "asc"
 * @returns always new item
 * @public
 */
export function newAttributeSort(attributeOrId, sortDirection = "asc") {
    invariant(attributeOrId, "attribute to create sort for must be specified");
    const id = attributeLocalId(attributeOrId);
    return {
        attributeSortItem: {
            attributeIdentifier: id,
            direction: sortDirection,
        },
    };
}
/**
 * Creates a new attribute area sort - sorting the result by aggregated measure values belonging to each
 * attribute value included in the result.
 *
 * @param attributeOrId - attribute to sort by
 * @param sortDirection - sorting direction
 * @param aggregation - area sort aggregation function. only "sum" is supported at the moment.
 * @public
 */
export function newAttributeAreaSort(attributeOrId, sortDirection = "asc", aggregation = "sum") {
    invariant(attributeOrId, "attribute to create sort for must be specified");
    const id = attributeLocalId(attributeOrId);
    return {
        attributeSortItem: {
            attributeIdentifier: id,
            direction: sortDirection,
            aggregation,
        },
    };
}
/**
 * Creates a new measure sort - sorting the result by values of the provided measure.
 *
 * @remarks
 * The measure can be either specified by value or by reference using its local identifier.
 *
 * @param measureOrId - measure to sort by
 * @param sortDirection - asc or desc, defaults to "asc"
 * @param attributeLocators - optional attribute locators
 * @returns new sort item
 * @public
 */
export function newMeasureSort(measureOrId, sortDirection = "asc", attributeLocators = []) {
    invariant(measureOrId, "measure to create sort for must be specified");
    const id = measureLocalId(measureOrId);
    return {
        measureSortItem: {
            direction: sortDirection,
            locators: [
                ...attributeLocators,
                {
                    measureLocatorItem: {
                        measureIdentifier: id,
                    },
                },
            ],
        },
    };
}
/**
 * Creates a new measure sort - sorting the result by values of the provided measure.
 *
 * @remarks
 * New measure sort is created from provided parts. Helpful eg. for just switching the direction of existing sort
 *
 * @param locators - complete locators
 * @param sortDirection - asc or desc, defaults to "asc"
 * @returns new sort item
 * @public
 */
export function newMeasureSortFromLocators(locators, sortDirection = "asc") {
    invariant(locators.length !== 0, "locators must be specified");
    return {
        measureSortItem: {
            direction: sortDirection,
            locators,
        },
    };
}
/**
 * Creates a new attribute locator for an attribute element.
 *
 * @param attributeOrId - attribute, can be specified by either the attribute object or its local identifier
 * @param element - attribute element value URI or primary label value
 * @returns new locator
 * @public
 */
export function newAttributeLocator(attributeOrId, element) {
    invariant(attributeOrId, "attribute to create sort locator for must be specified");
    invariant(element, "attribute element must be specified");
    const localId = attributeLocalId(attributeOrId);
    return {
        attributeLocatorItem: {
            attributeIdentifier: localId,
            element,
        },
    };
}
//# sourceMappingURL=sort.js.map