import { Identifier } from "../../objRef/index.js";
import { IAttribute } from "../attribute/index.js";
import { IMeasure } from "../measure/index.js";
/**
 * Sort items can be used to specify how the result of an execution should be sorted.
 *
 * @remarks
 * Sorting can be done by attribute value and/or by value of a measure.
 *
 * @public
 */
export type ISortItem = IAttributeSortItem | IMeasureSortItem;
/**
 * Sorting direction.
 *
 * @public
 */
export type SortDirection = "asc" | "desc";
/**
 * Sorting direction part of sort.
 *
 * @public
 */
export interface ISortDirection {
    /**
     * Sort ascending or descending.
     */
    direction: SortDirection;
}
/**
 * Sort item which specifies that the result should be sorted by attribute element values in either
 * ascending or descending order.
 *
 * @public
 */
export interface IAttributeSortItem {
    attributeSortItem: IAttributeSortTarget & IAttributeSortType & ISortDirection;
}
/**
 * Attribute sort target.
 *
 * @public
 */
export interface IAttributeSortTarget {
    /**
     * Local identifier of the attribute to sort by.
     */
    attributeIdentifier: Identifier;
}
/**
 * Attribute sort type specification.
 *
 * @public
 */
export interface IAttributeSortType {
    /**
     * If specified, defines aggregation function used on attribute's data points before sorting is evaluated
     * eg. used on stacked bar chart on view by attribute it defines, that all stacks are summed up and results are sorted
     */
    aggregation?: "sum";
}
/**
 * Sort item which specifies that the result should be sorted by value of a measure.
 *
 * @remarks
 * Since the result can have the value of the measure sliced by one or more attributes, the measure
 * sort item must explicitly specify the 'slice' by which to sort. This slice is specified by locators.
 *
 * @public
 */
export interface IMeasureSortItem {
    measureSortItem: IMeasureSortTarget & ISortDirection;
}
/**
 * Measure sort target.
 *
 * @public
 */
export interface IMeasureSortTarget {
    /**
     * Locators explicitly specifying the exact slice of the measure values to sort by.
     */
    locators: ILocatorItem[];
}
/**
 * Locators are used to identify slice of measure values to sort by.
 *
 * @public
 */
export type ILocatorItem = IAttributeLocatorItem | IMeasureLocatorItem | ITotalLocatorItem;
/**
 * Locator that specifies a concrete attribute element for which the measure values are sliced.
 *
 * @public
 */
export interface IAttributeLocatorItemBody {
    /**
     * Local identifier of the attribute.
     */
    attributeIdentifier: Identifier;
    /**
     * Value of the attribute element; TODO: make sure bear is ready for this
     */
    element: string | null;
}
/**
 * Locator that specifies a concrete attribute element for which the total is applicable
 *
 * @public
 */
export interface ITotalLocatorItemBody {
    /**
     * Local identifier of the attribute.
     */
    attributeIdentifier: Identifier;
    /**
     * Function for the total, such as sum, max, min, ...
     */
    totalFunction: string;
}
/**
 * Locator that specifies a concrete attribute element for which the measure values are sliced.
 *
 * @public
 */
export interface IAttributeLocatorItem {
    attributeLocatorItem: IAttributeLocatorItemBody;
}
/**
 * Locator that specifies a concrete total element for which the measure values are sliced.
 *
 * @public
 */
export interface ITotalLocatorItem {
    totalLocatorItem: ITotalLocatorItemBody;
}
/**
 * Object defining the {@link IMeasureLocatorItem} object structure.
 *
 * @public
 */
export interface IMeasureLocatorItemBody {
    /**
     * Local identifier of the measure.
     */
    measureIdentifier: Identifier;
}
/**
 * Locator that specifies a concrete measure to sort by.
 *
 * @public
 */
export interface IMeasureLocatorItem {
    measureLocatorItem: IMeasureLocatorItemBody;
}
/**
 * Type guard checking whether an object is an attribute sort item.
 *
 * @public
 */
export declare function isAttributeSort(obj: unknown): obj is IAttributeSortItem;
/**
 * Type guard checking whether an object is an attribute area sort item.
 *
 * @public
 */
export declare function isAttributeAreaSort(obj: unknown): obj is IAttributeSortItem;
/**
 * Type guard checking whether an object is a normal attribute value sort item, not the area one.
 *
 * @public
 */
export declare function isAttributeValueSort(obj: unknown): obj is IAttributeSortItem;
/**
 * Type guard checking whether an object is a measure sort item.
 *
 * @public
 */
export declare function isMeasureSort(obj: unknown): obj is IMeasureSortItem;
/**
 * Type guard checking whether an object is an attribute locator.
 *
 * @public
 */
export declare function isAttributeLocator(obj: unknown): obj is IAttributeLocatorItem;
/**
 * Type guard checking whether an object is a total locator.
 *
 * @public
 */
export declare function isTotalLocator(obj: unknown): obj is ITotalLocatorItem;
/**
 * Type guard checking whether an object is measure locator
 *
 * @public
 */
export declare function isMeasureLocator(obj: unknown): obj is IMeasureLocatorItem;
/**
 * Gets sort item's direction
 * @param sort - sort item.
 * @public
 */
export declare function sortDirection(sort: ISortItem): SortDirection;
/**
 * Categorized collection of entity (object) identifiers referenced by a sort item.
 *
 * @public
 */
export type SortEntityIds = {
    allIdentifiers: Identifier[];
    attributeIdentifiers: Identifier[];
    measureIdentifiers: Identifier[];
};
/**
 * Given sort item, returns ids of entities (objects) that are referenced by the sort item.
 *
 * @remarks
 * The ids are returned in an categorized way.
 *
 * @public
 */
export declare function sortEntityIds(sort: ISortItem): SortEntityIds;
/**
 * Given a measure sort item, return the locators which identify the measure (possibly scoped for particular
 * attribute element).
 *
 * @param sort - measure sort items
 * @returns measure sort locators
 * @public
 */
export declare function sortMeasureLocators(sort: IMeasureSortItem): ILocatorItem[];
/**
 * Given attribute locator, return the localId of attribute that it references.
 *
 * @param locator - attribute locator
 * @returns attribute localId
 * @public
 */
export declare function attributeLocatorIdentifier(locator: IAttributeLocatorItem): Identifier;
/**
 * Given attribute locator, return the element that it references.
 *
 * @param locator - attribute locator
 * @returns attribute element
 * @public
 */
export declare function attributeLocatorElement(locator: IAttributeLocatorItem): Identifier | null;
/**
 * Given measure locator, return the localId of measure that it references.
 *
 * @param locator - measure locator
 * @returns measure localId
 * @public
 */
export declare function measureLocatorIdentifier(locator: IMeasureLocatorItem): Identifier;
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
export declare function newAttributeSort(attributeOrId: IAttribute | string, sortDirection?: SortDirection): IAttributeSortItem;
/**
 * Creates a new attribute area sort - sorting the result by aggregated measure values belonging to each
 * attribute value included in the result.
 *
 * @param attributeOrId - attribute to sort by
 * @param sortDirection - sorting direction
 * @param aggregation - area sort aggregation function. only "sum" is supported at the moment.
 * @public
 */
export declare function newAttributeAreaSort(attributeOrId: IAttribute | string, sortDirection?: SortDirection, aggregation?: "sum"): IAttributeSortItem;
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
export declare function newMeasureSort(measureOrId: IMeasure | string, sortDirection?: SortDirection, attributeLocators?: IAttributeLocatorItem[]): IMeasureSortItem;
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
export declare function newMeasureSortFromLocators(locators: ILocatorItem[], sortDirection?: SortDirection): IMeasureSortItem;
/**
 * Creates a new attribute locator for an attribute element.
 *
 * @param attributeOrId - attribute, can be specified by either the attribute object or its local identifier
 * @param element - attribute element value URI or primary label value
 * @returns new locator
 * @public
 */
export declare function newAttributeLocator(attributeOrId: IAttribute | string, element: string): IAttributeLocatorItem;
//# sourceMappingURL=sort.d.ts.map