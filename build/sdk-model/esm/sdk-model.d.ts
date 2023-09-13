/**
 * This package provides domain models for GoodData.UI.
 *
 * @remarks
 * These domain models are backend-agnostic. This makes them reusable across different Analytical Backend implementations.
 * The package includes TypeScript type definitions, factory functions, functions to get or set certain
 * properties of the objects in an immutable way, and more.
 * These are used in both the `@gooddata/sdk-backend-*` and `@gooddata/sdk-ui*` packages.
 *
 * @packageDocumentation
 */

import { ComparatorDirection as ComparatorDirection_2 } from '../base/comparators.js';
import { IComparator as IComparator_2 } from '../base/comparators.js';
import { IInsightDefinition as IInsightDefinition_2 } from './index.js';

/**
 * Gets effective values of an absolute date filter.
 *
 * @param filter - date filter to work with
 * @returns filter values
 * @public
 */
export declare function absoluteDateFilterValues(filter: IAbsoluteDateFilter): IAbsoluteDateFilterValues;

/**
 * Entity having access to the object.
 *
 * @alpha
 */
export declare type AccessGranteeDetail = IUserAccess | IUserGroupAccess | IGranularUserAccess | IGranularUserGroupAccess;

/**
 * Type of granted granular access.
 *
 * @public
 */
export declare type AccessGranularPermission = "VIEW" | "EDIT" | "SHARE";

/**
 * Special granularity used to indicate there should be no date filtering for the given dimension.
 *
 * @public
 */
export declare type AllTimeGranularity = "ALL_TIME_GRANULARITY";

/**
 * Reserved type names used for dashboard's built-in analytical widgets.
 *
 * @alpha
 */
export declare type AnalyticalWidgetType = "kpi" | "insight";

/**
 * Predicate that returns true for any attribute.
 *
 * @public
 */
export declare const anyAttribute: AttributePredicate;

/**
 * This predicate evaluates true for any bucket.
 *
 * @public
 */
export declare const anyBucket: BucketPredicate;

/**
 * Implementation of measure predicate which always returns true.
 *
 * @public
 */
export declare const anyMeasure: MeasurePredicate;

/**
 * Applies compute ratio rule to all measures in a list.
 *
 * @remarks
 * This MAY be done to sanitize measure definitions so that the computed results make sense when visualized in a chart.
 *
 * The function will return a new list with updated measures according to the specified rule; see {@link ComputeRatioRule}.
 *
 * For convenience this function can work with list of measures AND attributes; attributes will be ignored
 * in processing and kept in resulting array as-is.
 *
 * @param items - list of attributes or measures to sanitize; attributes will be lef
 * @param rule - rule to apply; see {@link ComputeRatioRule}
 * @returns new list with modified measures; the original list and measures in it are left intact
 * @public
 */
export declare function applyRatioRule<T extends IAttributeOrMeasure>(items: T[], rule?: ComputeRatioRule): T[];

/**
 * Returns a value indicating whether the two ObjRef instances are semantically equal (i.e. are of the same type and have the same value).
 * Null and undefined are considered equal to each other.
 *
 * @remarks If the objects are ObjRefs of multiple types at once (for example they have identifiers and URIs),
 * the match is tested in the following sequence:
 * 1. identifier
 * 2. URI
 * 3. localIdentifier
 *
 * @public
 */
export declare function areObjRefsEqual<T extends ObjRefInScope | null | undefined>(a: T, b: T): boolean;

/**
 * Builder for arithmetic measures.
 *
 * Do not instantiate this builder directly, instead use {@link newArithmeticMeasure}.
 *
 * @public
 */
export declare class ArithmeticMeasureBuilder extends MeasureBuilderBase<IArithmeticMeasureDefinition> {
    private readonly arithmeticMeasure;
    /**
     * @internal
     */
    constructor(input: ArithmeticMeasureBuilderInput);
    /**
     * Sets arithmetic operator to apply when calculating the arithmetic measure.
     *
     * @param op - operator
     */
    operator: (op: ArithmeticMeasureOperator) => this;
    /**
     * Sets operands for arithmetic: other measures specified by either value or local identifier -
     *
     * @param measuresOrLocalIds - array of measures and/or localIds of measures to use as operands
     */
    operands: (measuresOrLocalIds: MeasureOrLocalId[]) => this;
    protected buildDefinition(): IArithmeticMeasureDefinition;
    protected generateLocalId(): string;
}

/**
 * Input to the ArithmeticMeasureBuilder.
 * @public
 */
export declare type ArithmeticMeasureBuilderInput = {
    measuresOrIds: ReadonlyArray<MeasureOrLocalId>;
    operator: ArithmeticMeasureOperator;
} | IMeasure<IArithmeticMeasureDefinition>;

/**
 * Simple math operators for arithmetic measure construction.
 *
 * @public
 */
export declare type ArithmeticMeasureOperator = "sum" | "difference" | "multiplication" | "ratio" | "change";

/**
 * Gets an attribute alias.
 *
 * @param attribute - attribute to work with
 * @returns value of attribute alias
 * @public
 */
export declare function attributeAlias(attribute: IAttribute): string | undefined;

/**
 * Builder for attributes.
 *
 * Do not instantiate this class directly. Instead use {@link newAttribute} or {@link modifyAttribute}.
 *
 * @public
 */
export declare class AttributeBuilder {
    private attribute;
    private customLocalId;
    /**
     * @internal
     */
    constructor(input: AttributeBuilderInput);
    /**
     * Sets alias - alternative title - for the attribute.
     *
     * @remarks
     * This value will then be used in various chart-specific descriptive elements. For convenience if no alias is specified,
     * the attribute will fall back to server-defined value.
     *
     * @param alias - alias to use instead of attribute title; undefined to use server-defined value
     */
    alias: (alias?: string | undefined) => this;
    /**
     * Resets alias - alternative title - set for the attribute.
     *
     * @remarks
     * The server-defined title of the attribute will be used instead.
     */
    noAlias: () => this;
    /**
     * Sets show all values property.
     *
     * @remarks
     * The flag showAllValues translates to a property of the same name on the attribute in execution definition.
     * If truthy, the backend will return all values of the particular attribute in the execution response
     * even if there are no data available for it.
     *
     * @param showAllValues - flag defining whether to return all attribute values for given attribute; undefined to use backend default behavior(false)
     */
    showAllValues: (showAllValues?: boolean | undefined) => this;
    /**
     * Sets display form reference.
     *
     * @param ref - new ref to use
     */
    displayForm: (ref: ObjRef) => this;
    /**
     * Sets local identifier (localId) for the attribute. LocalId can be used to reference the attribute
     * within the execution definition.
     *
     * Normally, builder will generate localId based on contents of the attribute definition - taking all
     * properties into account: in typical scenarios you don't have to call this function at all. The only exception
     * where you have to provide custom local id is if your execution must contain the exact same attribute twice.
     *
     * For convenience, this method also accepts 'undefined', which indicates that the default local id generation
     * logic should be used.
     *
     * @param localId - local identifier to set; if not specified, the builder will ensure local id will
     * be generated
     */
    localId: (localId?: Identifier | undefined) => this;
    /**
     * Indicates that the attribute's localId should be generated using the default local-id generator logic.
     */
    defaultLocalId: () => this;
    /**
     * Creates the IAttribute instance.
     */
    build: () => IAttribute;
    private getOrGenerateLocalId;
    private calculateAliasHash;
}

/**
 * Input to the AttributeBuilder.
 * @public
 */
export declare type AttributeBuilderInput = Identifier | ObjRef | IAttribute;

/**
 * Returns local identifier of attribute described in the provided attribute descriptor.
 *
 * @param descriptor - attribute descriptor, must be specified
 * @public
 */
export declare function attributeDescriptorLocalId(descriptor: IAttributeDescriptor): string;

/**
 * Returns name of attribute described in the provided attribute descriptor.
 *
 * @param descriptor - attribute descriptor, must be specified
 * @public
 */
export declare function attributeDescriptorName(descriptor: IAttributeDescriptor): string;

/**
 * Gets ObjRef of the attribute the display form is a form of.
 *
 * @param displayForm - attribute display form to work with
 * @returns display form ObjRef
 * @public
 */
export declare function attributeDisplayFormMetadataObjectAttributeRef(displayForm: IAttributeDisplayFormMetadataObject): ObjRef;

/**
 * Gets the attribute display form's ObjRef
 * @param displayForm - attribute display form to work with
 * @returns ObjRef of the attribute display form
 * @public
 */
export declare function attributeDisplayFormMetadataObjectRef(displayForm: IAttributeDisplayFormMetadataObject): ObjRef;

/**
 * Gets the attribute display form's title.
 * @param displayForm - attribute display form to work with
 * @returns title of the attribute display form
 * @public
 */
export declare function attributeDisplayFormMetadataObjectTitle(displayForm: IAttributeDisplayFormMetadataObject): string;

/**
 * Gets an attribute display form object ref.
 *
 * @param attribute - attribute to work with
 * @returns value of attribute display form object ref
 * @public
 */
export declare function attributeDisplayFormRef(attribute: IAttribute): ObjRef;

/**
 * Attribute display form type
 *
 * @public
 */
export declare type AttributeDisplayFormType = 
/**
* Display form representing hyperlink
*/
"GDC.link"
/**
* Display form representing geo pin location.
* Both latitude and longitude in single value (lat;long).
*/
| "GDC.geo.pin"
/**
* Display form representing geo pin latitude.
*/
| "GDC.geo.pin_latitude"
/**
* Display form representing geo pin longitude.
*/
| "GDC.geo.pin_longitude";

/**
 * Gets the number of items in the {@link IAttributeElements}.
 *
 * @param attributeElements - object to test
 * @returns the number of items
 * @internal
 */
export declare function attributeElementsCount(attributeElements: IAttributeElements): number;

/**
 * Tests whether the attribute elements object is empty.
 *
 * @param attributeElements - object to test
 * @returns true if empty = attribute elements not specified in any way (URI or value)
 * @internal
 */
export declare function attributeElementsIsEmpty(attributeElements: IAttributeElements): boolean;

/**
 * Gets identifier of attribute's display form to use and get attribute element values from.
 *
 * @param attribute - attribute to work with, may be undefined == result is undefined
 * @returns display form identifier as string, undefined if display for not specified using identifier
 * @public
 */
export declare function attributeIdentifier(attribute: IAttribute): string | undefined;

/**
 * Describes exact location of attribute in a bucket.
 *
 * @public
 */
export declare type AttributeInBucket = {
    bucket: IBucket;
    idx: number;
    attribute: IAttribute;
};

/**
 * Gets local identifier of an attribute.
 *
 * @remarks
 * For convenience and fluency, this function accepts both attribute object and identifier.
 *
 * @param attributeOrId - attribute to work with or the identifier
 * @returns value of local identifier
 * @public
 */
export declare function attributeLocalId(attributeOrId: IAttribute | Identifier): string;

/**
 * Given attribute locator, return the element that it references.
 *
 * @param locator - attribute locator
 * @returns attribute element
 * @public
 */
export declare function attributeLocatorElement(locator: IAttributeLocatorItem): Identifier | null;

/**
 * Given attribute locator, return the localId of attribute that it references.
 *
 * @param locator - attribute locator
 * @returns attribute localId
 * @public
 */
export declare function attributeLocatorIdentifier(locator: IAttributeLocatorItem): Identifier;

/**
 * Function that will be called to perform modifications of an attribute before it is fully constructed.
 *
 * @public
 */
export declare type AttributeModifications = (builder: AttributeBuilder) => AttributeBuilder;

/**
 * Defines function signature for measure predicates.
 *
 * @public
 */
export declare type AttributePredicate = (attribute: IAttribute) => boolean;

/**
 * Given list of attributes, returns first-found attribute matching the provided predicate.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning first found attribute
 * will be returned.
 *
 * This function also provides convenience to find attribute by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @param attributes - list of attributes to work with, must be specified
 * @param idOrFun - attribute identifier or instance of AttributePredicate; {@link anyAttribute} predicate is default
 * @public
 */
export declare function attributesFind(attributes: IAttribute[], idOrFun?: string | AttributePredicate): IAttribute | undefined;

/**
 * Gets an attribute show all values property.
 *
 * @param attribute - attribute to work with
 * @returns value of attribute show all values property
 * @public
 */
export declare function attributeShowAllValues(attribute: IAttribute): boolean | undefined;

/**
 * Gets URI of attribute's display form to use and get attribute element values from.
 *
 * @param attribute - attribute to work with, may be undefined == result is undefined
 * @returns display form URI as string, undefined if display form not specified using URI
 * @public
 */
export declare function attributeUri(attribute: IAttribute): string | undefined;

/**
 * Gets first attribute matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning first found attribute
 * will be returned.
 *
 * This function also provides convenience to find attribute by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - attribute identifier or instance of AttributePredicate; {@link anyAttribute} predicate is default
 * @returns undefined if no matching attribute is found
 * @public
 */
export declare function bucketAttribute(bucket: IBucket, idOrFun?: string | AttributePredicate): IAttribute | undefined;

/**
 * Gets the index of the first attribute matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning first found attribute
 * will be returned.
 *
 * This function also provides convenience to find attribute by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - attribute identifier or instance of AttributePredicate; {@link anyAttribute} predicate is default
 * @returns -1 if no matching attribute is found
 * @public
 */
export declare function bucketAttributeIndex(bucket: IBucket, idOrFun?: string | AttributePredicate): number;

/**
 * Gets all attributes matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning all attributes
 * from the bucket will be returned.
 *
 * @param bucket - bucket to work with
 * @param predicate - attribute predicate; {@link anyAttribute} predicate is default
 * @returns empty list if none match
 * @public
 */
export declare function bucketAttributes(bucket: IBucket, predicate?: AttributePredicate): IAttribute[];

/**
 * Tests whether the provided bucket is empty = contains no items and no totals.
 *
 * @param bucket - bucket to test
 * @returns true if empty, false if not
 * @public
 */
export declare function bucketIsEmpty(bucket: IBucket): boolean;

/**
 * Gets value of local identifier of bucketItem
 *
 * @param bucketItem - bucketItem to work with
 * @returns value of local identifier
 * @public
 */
export declare function bucketItemLocalId(bucketItem: IAttributeOrMeasure): string;

/**
 * Describes the type of the function used to modify the bucket items.
 *
 * @public
 */
export declare type BucketItemModifications = (bucketItem: IAttributeOrMeasure) => IAttributeOrMeasure;

/**
 * Creates a new bucket by modifying items of the provided input bucket.
 *
 * @remarks
 * Array of item from the input bucket will be dispatched to the reducer function
 * and the result of the modification will be included in the new bucket.
 *
 *
 * @param bucket - bucket in which all items are applied the modification function
 * @param reducer - the reducer function to apply to the bucket items
 * @returns new instance of bucket with modified bucket items
 * @public
 */
export declare function bucketItemReduce(bucket: IBucket, reducer?: BucketItemReducer): IBucket;

/**
 * Describes the type of the function used to reduce the bucket items.
 *
 * @public
 */
export declare type BucketItemReducer = (acc: IAttributeOrMeasure[], cur: IAttributeOrMeasure, idx: number, src: IAttributeOrMeasure[]) => IAttributeOrMeasure[];

/**
 * Gets all attributes and measures from the bucket.
 *
 * @param bucket - bucket to work with
 * @returns empty list if no items
 * @public
 */
export declare function bucketItems(bucket: IBucket): IAttributeOrMeasure[];

/**
 * Gets first measure matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyMeasure predicate - meaning first found measure
 * will be returned.
 *
 * This function also provides convenience to find measure by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchMeasure predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - measure identifier or instance of MeasurePredicate; {@link anyMeasure} predicate is default
 * @returns undefined if no matching measure is found
 * @public
 */
export declare function bucketMeasure(bucket: IBucket, idOrFun?: string | MeasurePredicate): IMeasure | undefined;

/**
 * Gets the index of the first measure matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyMeasure predicate - meaning first found measure
 * will be returned.
 *
 * This function also provides convenience to find measure by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchMeasure predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - measure identifier or instance of MeasurePredicate; {@link anyMeasure} predicate is default
 * @returns -1 if no matching measure is found
 * @public
 */
export declare function bucketMeasureIndex(bucket: IBucket, idOrFun?: string | MeasurePredicate): number;

/**
 * Gets all measures matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyMeasure predicate - meaning all measures from
 * the bucket will be returned.
 *
 * @param bucket - bucket to work with
 * @param predicate - measure predicate; {@link anyMeasure} predicate is default
 * @returns empty list if none match
 * @public
 */
export declare function bucketMeasures(bucket: IBucket, predicate?: MeasurePredicate): IMeasure[];

/**
 * Creates a new bucket by modifying items of the provided input bucket.
 *
 * @remarks
 * Each item from the input bucket will be dispatched to the modification function
 * and the result of the modification will be included in the new bucket.
 *
 * Note: it is valid for the modification function to just return the original item.
 * In that case the item will be included in the bucket without modification.
 *
 * @param bucket - bucket in which all items are applied the modification function
 * @param modifications - the modification to apply to the bucket items
 * @returns new instance of bucket with modified bucket items
 * @public
 */
export declare function bucketModifyItems(bucket: IBucket, modifications?: BucketItemModifications): IBucket;

/**
 * Signature for bucket predicates; predicates are used by different functions to find/filter buckets according
 * to some criteria.
 *
 * @public
 */
export declare type BucketPredicate = (bucket: IBucket) => boolean;

/**
 * Gets all attributes matching the provided predicate from a list of buckets.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to {@link anyAttribute} predicate - meaning all
 * attributes will be returned.
 *
 * @param buckets - list of buckets to get attributes from
 * @param predicate - attribute predicate; {@link anyAttribute} is default
 * @returns empty list if none match
 * @public
 */
export declare function bucketsAttributes(buckets: IBucket[], predicate?: AttributePredicate): IAttribute[];

/**
 * Gets buckets with the provided local identifiers from a list of buckets.
 *
 * @param buckets - list of buckets to filter
 * @param ids - bucket identifiers
 * @returns empty list if none match
 * @public
 */
export declare function bucketsById(buckets: IBucket[], ...ids: string[]): IBucket[];

/**
 * Gets a new bucket that 'inherits' all data from the provided bucket but has different totals.
 *
 * @remarks
 * New totals will be used in the new bucket as-is, no merging with existing totals.
 *
 * @param bucket - bucket to work with
 * @param totals - new totals to apply
 * @returns new bucket
 * @public
 */
export declare function bucketSetTotals(bucket: IBucket, totals?: ITotal[]): IBucket;

/**
 * Finds bucket matching the provided predicate in a list of buckets.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to {@link anyBucket} predicate - meaning first
 * bucket in the list will be returned.
 *
 * This function also provides convenience to find bucket by local identifier - if you pass predicate as
 * string the function will automatically create idMatchBucket predicate.
 *
 * @param buckets - list of buckets to search
 * @param idOrFun - bucket predicate or string to match bucket by local identifier; {@link anyBucket} is default
 * @public
 */
export declare function bucketsFind(buckets: IBucket[], idOrFun?: string | BucketPredicate): IBucket | undefined;

/**
 * Finds attribute matching the provided predicate in a list of buckets.
 *
 * @remarks
 * If found, the function returns an object that contains bucket where the matched attribute is stored, index within
 * that bucket and the attribute itself.
 *
 * This function also provides convenience to find attribute by local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @remarks See {@link AttributeInBucket}
 *
 * @param buckets - list of buckets to search
 * @param idOrFun - attribute predicate or string to find attribute by local identifier; defaults to {@link anyAttribute}
 * @returns first-found attribute matching the predicate, undefined if none match
 * @public
 */
export declare function bucketsFindAttribute(buckets: IBucket[], idOrFun?: string | AttributePredicate): AttributeInBucket | undefined;

/**
 * Finds measure matching the provided predicate in a list of buckets.
 *
 * @remarks
 * If found, the function returns an object that contains bucket where the matched measure is stored, index
 * within that bucket and the measure itself.
 *
 * This function also provides convenience to find measure by local identifier - if you pass predicate as
 * string the function will automatically create idMatchMeasure predicate.
 *
 * @remarks See {@link MeasureInBucket}
 *
 * @param buckets - list of buckets to search
 * @param idOrFun - measure predicate or string to find measure by local identifier; defaults to {@link anyMeasure}
 * @returns first-found measure matching the predicate, undefined if none match
 * @public
 */
export declare function bucketsFindMeasure(buckets: IBucket[], idOrFun?: string | MeasurePredicate): MeasureInBucket | undefined;

/**
 * Tests whether all buckets in a list are empty (meaning neither has any items or totals defined)
 *
 * @param buckets - buckets to work with
 * @returns true if empty, false if not
 * @public
 */
export declare function bucketsIsEmpty(buckets: IBucket[]): boolean;

/**
 * Gets all attributes and measures from a list of buckets.
 *
 * @param buckets - buckets to work with
 * @returns empty list if none
 * @public
 */
export declare function bucketsItems(buckets: IBucket[]): IAttributeOrMeasure[];

/**
 * Gets all measures matching the provided predicate from a list of buckets.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to {@link anyMeasure} predicate - meaning all
 * measures will be returned.
 *
 * @param buckets - list of buckets to get measures from
 * @param predicate - measure predicate; {@link anyMeasure} is default
 * @returns empty list if none match
 * @public
 */
export declare function bucketsMeasures(buckets: IBucket[], predicate?: MeasurePredicate): IMeasure[];

/**
 * Creates a new array of buckets, each bucket in the array contains modified bucket items
 * (retrieved by applying the modifications function to the bucketItem).
 *
 * @param buckets - an array of buckets, all items of each bucket in the array are applied the modification function
 * @param modifications - the modification to apply to the bucket items
 * @returns a new array of buckets, each bucket in the array contains modified bucket items
 * @public
 */
export declare function bucketsModifyItem(buckets: IBucket[], modifications?: BucketItemModifications): IBucket[];

/**
 * Creates a new array of buckets, each bucket in the array contains modified bucket items
 *
 * @param buckets - an array of buckets, array is applied the modification function
 * @param reducer - the reducer to apply to the bucket items array
 * @returns a new array of buckets, each bucket in the array contains modified bucket items
 * @public
 */
export declare function bucketsReduceItem(buckets: IBucket[], reducer?: BucketItemReducer): IBucket[];

/**
 * Gets all totals from a list of buckets
 *
 * @param buckets - buckets to work with
 * @returns empty list if none
 * @public
 */
export declare function bucketsTotals(buckets: IBucket[]): ITotal[];

/**
 * Gets all totals from the bucket
 *
 * @param bucket - bucket to work with
 * @returns empty list if no totals
 * @public
 */
export declare function bucketTotals(bucket: IBucket): ITotal[];

/**
 * List of built-in widget types. These type names are reserved and must not be used by custom widgets.
 *
 * @alpha
 */
export declare const BuiltInWidgetTypes: string[];

/**
 * Type representing catalog item - attribute, measure, fact or dateDataset
 *
 * @public
 */
export declare type CatalogItem = ICatalogAttribute | ICatalogMeasure | ICatalogFact | ICatalogDateDataset | ICatalogAttributeHierarchy;

/**
 * Get metadata object that catalog item represents
 *
 * @param catalogItem - catalog item
 * @returns metadata object
 * @public
 */
export declare const catalogItemMetadataObject: (catalogItem: CatalogItem) => MetadataObject;

/**
 * Type representing catalog item type - attribute, measure, fact, dateDataset or attributeHierarchy
 *
 * @public
 */
export declare type CatalogItemType = "attribute" | "measure" | "fact" | "dateDataset" | "attributeHierarchy";

/**
 * Returns RGB code representing the color in the provided color palette items.
 *
 * @param item - color palette item
 * @returns an `rgb(red#,green#,blue#)` code
 * @public
 */
export declare function colorPaletteItemToRgb(item: IColorPaletteItem): string;

/**
 * Returns a list of RGB color codes for all items in the provided color palette.
 *
 * @param palette - color palette
 * @returns list with the same cardinality as the color palette. RGB colors appear in the same order in which
 * they appear in the palette
 * @public
 */
export declare function colorPaletteToColors(palette: IColorPalette): string[];

/**
 * Direction of the comparator.
 * @public
 */
export declare type ComparatorDirection = "asc" | "desc";

/**
 * @public
 */
export declare type ComparisonConditionOperator = "GREATER_THAN" | "GREATER_THAN_OR_EQUAL_TO" | "LESS_THAN" | "LESS_THAN_OR_EQUAL_TO" | "EQUAL_TO" | "NOT_EQUAL_TO";

/**
 * Defines possible compute ratio sanitization rules.
 *
 * @public
 */
export declare enum ComputeRatioRule {
    /**
     * Compute ratio must not be used in any measure
     */
    NEVER = 0,
    /**
     * Compute ratio can be used if there is just a single measure
     */
    SINGLE_MEASURE_ONLY = 1,
    /**
     * Compute ratio can be used on any measure
     */
    ANY_MEASURE = 2
}

/**
 * Attribute filter selection mode value
 * @beta
 */
export declare type DashboardAttributeFilterSelectionMode = "single" | "multi";

/**
 * Date filter configuration mode
 * @alpha
 */
export declare type DashboardDateFilterConfigMode = "readonly" | "hidden" | "active";

/**
 * Gets reference to object being used for filtering. For attribute filters, this will be reference to the display
 * form. For date filters this will be reference to the data set.
 *
 * @alpha
 */
export declare function dashboardFilterReferenceObjRef(ref: IDashboardFilterReference): ObjRef;

/**
 * Represents type of LDM field created from the Dataset column.
 *
 * @public
 */
export declare type DataColumnType = "ATTRIBUTE" | "FACT" | "DATE";

/**
 * Represents the current status of CSV source.
 *
 * @public
 */
export declare type DatasetLoadStatus = "RUNNING" | "OK" | "ERROR" | "CANCELLED" | "ERROR_METADATA" | "REFRESHING";

/**
 * Single calculated data value.
 *
 * @remarks
 * The data value may be `null` - the semantics here are same as with
 * SQL nulls. The calculated numeric value WILL be returned in string representation - this is to
 * prevent float number precision errors.
 *
 * @public
 */
export declare type DataValue = null | string | number;

/**
 * All possible date dataset attribute granularities.
 *
 * @remarks
 * NOTE: Implementations of analytical backend MAY support only a subset of these granularities.
 *
 * See {@link DateGranularity} for a more convenient way to access commonly used granularities.
 *
 * @public
 */
export declare type DateAttributeGranularity = "GDC.time.year" | "GDC.time.week_us" | "GDC.time.week_in_year" | "GDC.time.week_in_quarter" | "GDC.time.week" | "GDC.time.euweek_in_year" | "GDC.time.euweek_in_quarter" | "GDC.time.quarter" | "GDC.time.quarter_in_year" | "GDC.time.month" | "GDC.time.month_in_quarter" | "GDC.time.month_in_year" | "GDC.time.day_in_year" | "GDC.time.day_in_quarter" | "GDC.time.day_in_month" | "GDC.time.day_in_week" | "GDC.time.day_in_euweek" | "GDC.time.date" | "GDC.time.hour" | "GDC.time.hour_in_day" | "GDC.time.minute" | "GDC.time.minute_in_hour";

/**
 * Date filter type - absolute
 * @beta
 */
export declare type DateFilterAbsoluteType = "absolute";

/**
 * Supported date filter granularity for the relative date filter
 * @beta
 */
export declare type DateFilterGranularity = "GDC.time.minute" | "GDC.time.hour" | "GDC.time.date" | "GDC.time.week_us" | "GDC.time.month" | "GDC.time.quarter" | "GDC.time.year";

/**
 * Type that identifies the absolute date filter form
 * @alpha
 */
export declare type DateFilterOptionAbsoluteFormType = "absoluteForm";

/**
 * Type that identifies the absolute date filter preset
 * @alpha
 */
export declare type DateFilterOptionAbsolutePresetType = "absolutePreset";

/**
 * Type that identifies the the all time date filter
 * @alpha
 */
export declare type DateFilterOptionAllTimeType = "allTime";

/**
 * Type that identifies the relative date filter form
 * @alpha
 */
export declare type DateFilterOptionRelativeFormType = "relativeForm";

/**
 * Type that identifies the relative date filter preset
 * @alpha
 */
export declare type DateFilterOptionRelativePresetType = "relativePreset";

/**
 * Type that identifies the date filter option
 * @alpha
 */
export declare type DateFilterOptionType = DateFilterOptionAllTimeType | DateFilterOptionAbsoluteFormType | DateFilterOptionRelativeFormType | DateFilterOptionAbsolutePresetType | DateFilterOptionRelativePresetType;

/**
 * Date filter type - relative
 * @beta
 */
export declare type DateFilterRelativeType = "relative";

/**
 * Date filter type - relative or absolute
 * @beta
 */
export declare type DateFilterType = DateFilterRelativeType | DateFilterAbsoluteType;

/**
 * Defines shortcuts for commonly used date dataset attribute granularities.
 *
 * @public
 */
export declare const DateGranularity: {
    [short: string]: DateAttributeGranularity;
};

/**
 * Date string - ISO-8601 calendar date string, eg.: '2018-12-30'
 * @beta
 */
export declare type DateString = string;

/**
 * Default dimension generator for execution definition behaves as follows:
 *
 * @remarks
 * - If the definition was created WITHOUT 'buckets', then:
 *   - If there are no measures specified, then single dimension will be returned and will contain all attributes
 *   - If there are measures, then two dimensions will be returned; measureGroup will be in the first dimension
 *     and all attributes in the second dimension
 *
 * If the definition was created WITH 'buckets' then:
 *   - If there is just one bucket and it contains only attributes, then single dimension with all attributes will be returned
 *   - If there is just one bucket and it contains both attributes and measures, then two dimensions will be returned:
 *     measureGroup will be in first dimension, all other attributes in the second dimension
 *   - If there are multiple buckets, then all attributes from first bucket will be in first dimension and all attributes
 *     from other buckets in the second dimension. If the first bucket contains measure(s), then the MeasureGroup will
 *     be in first dimension. Otherwise it will be in second dimension.
 *
 * @param definition - execution definition to get dims for
 * @public
 */
export declare function defaultDimensionsGenerator(definition: IExecutionDefinition): IDimension[];

/**
 * Calculates fingerprint for the execution definition.
 *
 * @remarks
 * Fingerprinting is used as an _approximate_,
 * quick, first-level assessment whether two execution definitions are or are not effectively same = they
 * lead to the same computation on the backend.
 *
 * The contract and the approximate nature of the fingerprint can be described as follows:
 *
 * -  If two execution definitions have the same fingerprint, then they definitely are effectively the same
 *    from the result calculation point of view and the backend will perform the same computation for them.
 *
 * -  If two execution definition have different fingerprint, they MAY OR MAY NOT lead to different execution. Or
 *    more concrete: two executions with two different fingerprints MAY lead to the same execution and same results.
 *
 * While not optimal, this contract allows for safe usage of fingerprints to determine whether two
 * execution definitions have changed. For instance it can be used in React lifecycle methods (shouldComponentUpdate)
 * or for client-side caching.
 *
 * @param def - execution definition
 * @public
 */
export declare function defFingerprint(def: IExecutionDefinition): string;

/**
 * Creates new execution definition by slapping the provided dimensions on top of the definition.
 *
 * @param def - existing definition
 * @param dimensions - dimensions
 * @returns always new instance
 * @public
 */
export declare function defSetDimensions(def: IExecutionDefinition, dimensions?: IDimension[]): IExecutionDefinition;

/**
 * Creates new execution definition by merging new exection configuration into an existing definition.
 *
 * @param def - existing definition
 * @param config - execution configuration
 * @returns always new instance
 * @public
 */
export declare function defSetExecConfig(def: IExecutionDefinition, config: IExecutionConfig): IExecutionDefinition;

/**
 * Creates new execution definition by setting a new post processing.
 *
 * @param def - existing definition
 * @param postProcessing - configuration that should be done with the data after they are obtained from the server
 *  and before they are passed to the user
 * @returns always new instance
 * @public
 */
export declare function defSetPostProcessing(def: IExecutionDefinition, postProcessing: IPostProcessing): IExecutionDefinition;

/**
 * Creates new execution definition by merging new sort items into an existing definition.
 *
 * @param def - existing definition
 * @param sortBy - array of sort items to add to definition
 * @returns always new instance
 * @public
 */
export declare function defSetSorts(def: IExecutionDefinition, sortBy?: ISortItem[]): IExecutionDefinition;

/**
 * Gets totals from particular dimension in the provided execution definition.
 *
 * @param def - definition to get totals from
 * @param dimIdx - dimension index
 * @returns empty list if no definition or dimension with the provided index not defined or if there are no
 *  totals in the dimension
 * @public
 */
export declare function defTotals(def: IExecutionDefinition, dimIdx: number): ITotal[];

/**
 * Changes the dateFormat of a postProcessing, other properties of postProcessing (if any) remain unchanged.
 *
 * @remarks
 * This function will call defWithPostProcessing to update definition with the new postProcessing.
 *
 * This function MUST be used to implement IPreparedExecution.withDateFormat();
 *
 * @param definition - execution definition to alter with postProcessing
 * @param dateFormat - Format to be applied to the dates in an AFM execution response.
 * @returns new execution with postProcessing updated with the specified dateFormat
 * @public
 */
export declare function defWithDateFormat(definition: IExecutionDefinition, dateFormat: string): IExecutionDefinition;

/**
 * Configures dimensions in the exec definition.
 *
 * @remarks
 * Any dimension settings accumulated so far WILL be wiped out.
 * If dims is array if dimensions, they will be used as is. If it is an array whose first element is dimension
 * generation function, then the function will be called to obtain dimensions.
 *
 * This function MUST be used to implement IPreparedExecution.withDimensions(); its parameters are constructed in
 * a way that it can handle both signatures of the withDimensions().
 *
 * @param definition - execution definition to alter
 * @param dims - dimensions to set
 * @returns new execution with the updated dimensions
 * @public
 */
export declare function defWithDimensions(definition: IExecutionDefinition, ...dims: Array<IDimension | DimensionGenerator>): IExecutionDefinition;

/**
 * Changes additional execution configuration in the definition.
 *
 * @remarks
 * Any additional execution configuration settings accumulated so far WILL be wiped out.
 *
 * This function MUST be used to implement IPreparedExecution.withExecConfig();
 *
 * @param definition - definition to alter with execution config
 * @param config - configuration
 * @returns new execution with the updated sorts
 * @public
 */
export declare function defWithExecConfig(definition: IExecutionDefinition, config: IExecutionConfig): IExecutionDefinition;

/**
 * Creates new execution definition by merging new filters into an existing definition.
 *
 * @param def - existing definition
 * @param filters - array of filters to add to definition
 * @returns always new instance
 * @public
 */
export declare function defWithFilters(def: IExecutionDefinition, filters?: INullableFilter[]): IExecutionDefinition;

/**
 * Changes the postProcessing of a definition.
 *
 * @param definition - execution definition to alter with postProcessing
 * @param postProcessing - configuration that should be done with the data after they are obtained from the server
 *  and before they are passed to the user
 * @returns new execution with the specified postProcessing
 * @public
 */
export declare function defWithPostProcessing(definition: IExecutionDefinition, postProcessing: IPostProcessing): IExecutionDefinition;

/**
 * Changes sorting in the definition. Any sorting settings accumulated so far WILL be wiped out.
 *
 * @remarks
 * This function MUST be used to implement IPreparedExecution.withSorting();
 *
 * @param definition - definition to alter with sorting
 * @param sorts - items to sort by
 * @returns new execution with the updated sorts
 * @public
 */
export declare function defWithSorting(definition: IExecutionDefinition, sorts: ISortItem[]): IExecutionDefinition;

/**
 * Deserializes an ObjRef from its pure string representation.
 *
 * @remarks
 * The function will throw an error if the input is not a valid, serialized ObjRef.
 *
 * @param val - string representation of ObjRef
 * @remarks see {@link serializeObjRef}
 * @public
 */
export declare function deserializeObjRef(val: string): ObjRef | ObjRefInScope;

/**
 * Function transforming a list of buckets (with attributes and measures) into execution dimension descriptors.
 *
 * @public
 */
export declare type DimensionGenerator = (def: IExecutionDefinition) => IDimension[];

/**
 * Defines union of items that can be placed into a dimension.
 *
 * @remarks
 * Identifier can be attribute localId or the special {@link MeasureGroupIdentifier}. Attribute `localId` can be
 * also specified by value of IAttribute.
 *
 * @public
 */
export declare type DimensionItem = Identifier | IAttribute | ITotal;

/**
 * Creates a new dimension which has same items as the provided dimension but different totals.
 *
 * @param dim - dimension to inherit item identifiers from
 * @param totals - totals to have in the new dimension
 * @returns new dimension
 * @public
 */
export declare function dimensionSetTotals(dim: IDimension, totals?: ITotal[]): IDimension;

/**
 * Looks for item with the provided local identifier among the dimensions.
 *
 * @param dims - list of dimensions to look in
 * @param localId - local identifier to find among item identifiers
 * @returns list of items in dimensions, empty if not found, may contain more than one entry if
 *  item is in multiple dimensions
 * @public
 */
export declare function dimensionsFindItem(dims: IDimension[], localId: string): ItemInDimension[];

/**
 * Gets totals defined in the provided dimension
 *
 * @param dim - dimension to work with
 * @returns totals in the dimension or empty array if none
 * @public
 */
export declare function dimensionTotals(dim: IDimension): ITotal[];

/**
 * Disables compute ratio if set on a simple measure. Does not do anything for other measures.
 *
 * @param item - maybe a simple measure where compute ratio should be disabled
 * @returns an instance of measure with compute ratio disabled
 * @public
 */
export declare function disableComputeRatio<T extends IAttributeOrMeasure>(item: T): T;

/**
 * Widget drill definition
 * @alpha
 */
export declare type DrillDefinition = InsightDrillDefinition | KpiDrillDefinition;

/**
 * Drill origin
 * @alpha
 */
export declare type DrillOrigin = IDrillFromMeasure | IDrillFromAttribute;

/**
 * Drill origin type
 * @alpha
 */
export declare type DrillOriginType = "drillFromMeasure" | "drillFromAttribute";

/**
 * Drill transition
 * @alpha
 */
export declare type DrillTransition = "pop-up" | "in-place" | "new-window";

/**
 * Drill type
 * @alpha
 */
export declare type DrillType = "drillToInsight" | "drillToDashboard" | "drillToLegacyDashboard" | "drillToCustomUrl" | "drillToAttributeUrl";

/**
 * Creates new, empty execution definition for the provided workspace.
 *
 * @param workspace - workspace to calculate on
 * @returns always new instance
 * @public
 */
export declare function emptyDef(workspace: string): IExecutionDefinition;

/**
 * Returns a code for generating the provided input using convenience factory methods where possible.
 * @param data - data to return the generating code for
 * @param additionalConversion - specify other conversion that will be tried before falling back to standard stringify. return undefined when you want to fall back to standard stringify.
 * @public
 */
export declare const factoryNotationFor: (data: any, additionalConversion?: ((data: any) => string | undefined) | undefined) => string;

/**
 * Gets attribute elements specified on the attribute filter.
 *
 * @param filter - attribute filter to work with
 * @returns attribute elements, undefined if not available
 * @public
 */
export declare function filterAttributeElements(filter: IPositiveAttributeFilter | INegativeAttributeFilter): IAttributeElements;

/**
 * Gets attribute elements specified on a filter. If the provided filter is not an attribute filter, then
 * undefined is returned
 *
 * @param filter - filter to work with
 * @returns attribute elements, undefined if not available
 * @public
 */
export declare function filterAttributeElements(filter: IFilter): IAttributeElements | undefined;

/**
 * Supported filter context items
 * @alpha
 */
export declare type FilterContextItem = IDashboardAttributeFilter | IDashboardDateFilter;

/**
 * Tests whether the provided attribute element does not specify any attribute elements.
 *
 * @param filter - attribute filter to test
 * @returns true if empty = no attribute elements
 * @public
 */
export declare function filterIsEmpty(filter: IAttributeFilter): boolean;

/**
 * Gets reference to a measure being used for filtering if the provided filter is measure based. For other filters return undefined.
 *
 * @public
 */
export declare function filterMeasureRef(filter: IFilter): ObjRefInScope | undefined;

/**
 * Gets reference to object being used for filtering.
 *
 * @remarks
 * For attribute filters, this will be reference to the display form. For date filters this will be reference to the data set.
 *
 * @param filter - filter to work with
 * @returns reference to object used for filtering (display form for attr filters, data set for date filters)
 * @public
 */
export declare function filterObjRef(filter: IAbsoluteDateFilter | IRelativeDateFilter | IPositiveAttributeFilter | INegativeAttributeFilter): ObjRef;

/**
 * Gets reference to object being used for filtering.
 *
 * @remarks
 * For attribute filters, this will be reference to the display form.
 * For date filters this will be reference to the data set. For measure value filter, this will be undefined.
 *
 * @param filter - filter to work with
 * @returns reference to object used for filtering (display form for attr filters, data set for date filters), undefined
 *  for measure value filters
 * @public
 */
export declare function filterObjRef(filter: IFilter): ObjRef | undefined;

/**
 * Gets the items from the {@link IAttributeElements}.
 *
 * @param attributeElements - object to get items from
 * @returns the array of items
 * @internal
 */
export declare function getAttributeElementsItems(attributeElements: IAttributeElements): Array<string | null>;

/**
 * Returns count of selected elements
 * @alpha
 */
export declare function getSelectedElementsCount(filter: IDashboardAttributeFilter): number;

/**
 * Type representing groupable catalog item - attribute, measure or fact
 *
 * @public
 */
export declare type GroupableCatalogItem = ICatalogAttribute | ICatalogMeasure | ICatalogFact;

/**
 * @public
 */
export declare type GuidType = "guid";

/**
 * Filters results to an absolute date range - from one fixed date to another.
 *
 * @public
 */
export declare interface IAbsoluteDateFilter {
    absoluteDateFilter: {
        /**
         * Date data set for filtering
         */
        dataSet: ObjRef;
        /**
         * Start date (including): this is in format 'YYYY-MM-DD'
         */
        from: string;
        /**
         * End date (including): this is in format 'YYYY-MM-DD'
         */
        to: string;
    };
}

/**
 * Customized options for the global absolute date filter
 * @alpha
 */
export declare interface IAbsoluteDateFilterForm extends IDateFilterOption {
    /**
     * Type to identify the global absolute date filter
     */
    type: DateFilterOptionAbsoluteFormType;
}

/**
 * Custom absolute date filter preset
 * @alpha
 */
export declare interface IAbsoluteDateFilterPreset extends IDateFilterOption {
    /**
     * Type to identify an absolute date filter preset
     */
    type: DateFilterOptionAbsolutePresetType;
    /**
     * Absolute date filter start date
     */
    from: DateString;
    /**
     * Absolute date filter end date
     */
    to: DateString;
}

/**
 * Represents values of an absolute filter.
 *
 * @public
 */
export declare interface IAbsoluteDateFilterValues {
    from: string;
    to: string;
}

/**
 * Common properties for objects with controlled access
 * @alpha
 */
export declare interface IAccessControlAware {
    /**
     * Current object share status. This prop is affecting listing of object and access to it for different users
     */
    readonly shareStatus: ShareStatus;
    /**
     * For backends NOT forcing strict access this prop reflects its current setting of strict access
     * If set to true then object is not accessible via its URI for people without access rights.
     * Otherwise object is accessible by its URI, eg. when drilling to it.
     */
    readonly isUnderStrictControl?: boolean;
    /**
     * When object is locked, no one other than the administrator can edit it
     */
    readonly isLocked?: boolean;
}

/**
 * Access grantee specification.
 *
 * @public
 */
export declare type IAccessGrantee = IUserGroupAccessGrantee | IUserAccessGrantee | IGranularAccessGrantee;

/**
 * Customized options for the global all time date filter
 * @alpha
 */
export declare interface IAllTimeDateFilterOption extends IDateFilterOption {
    /**
     * Type to identify the global all time date filter
     */
    type: DateFilterOptionAllTimeType;
}

/**
 * Analytical Widgets are a sub-type of dashboard widgets that display analytics. Be it charts rendering
 * insights (reports) or KPIs rendering measure values optionally with their comparison.
 *
 * @alpha
 */
export declare interface IAnalyticalWidget extends IBaseWidget, IWidgetDescription, IFilterableWidget, IDrillableWidget {
    readonly type: AnalyticalWidgetType;
}

/**
 * Arithmetic measures are created by composing two or more other measures and defining arithmetic
 * to apply on their values.
 *
 * @public
 */
export declare interface IArithmeticMeasureDefinition {
    arithmeticMeasure: {
        measureIdentifiers: Identifier[];
        operator: ArithmeticMeasureOperator;
    };
}

/**
 * Attribute is our nomenclature for 'dimension' as typically used in multi-dimensional BI modeling.
 *
 * @remarks
 * The attribute specifies on what dimension to slice/dice the measures.
 *
 * In GoodData, each attribute can have multiple different display forms. Display forms essentially provide different
 * representations for elements in the dimension.
 *
 * @public
 */
export declare interface IAttribute {
    attribute: IAttributeBody;
}

/**
 * Attribute is our nomenclature for 'dimension' as typically used in multi-dimensional BI modeling.
 *
 * @remarks
 * The attribute specifies on what dimension to slice/dice the measures.
 *
 * In GoodData, each attribute can have multiple different display forms. Display forms essentially provide different
 * representations for elements in the dimension.
 *
 * @public
 */
export declare interface IAttributeBody {
    /**
     * User-assigned id of the attribute. The value is used to cross-reference model elements that are part
     * of an execution.
     *
     * The constraint is that the local identifiers of all measures and attributes in an execution definition MUST
     * be unique.
     */
    localIdentifier: Identifier;
    /**
     * Reference to display form to use for element representations.
     *
     * The display form can be referenced by either URL of the display form resource on backend OR by
     * unique, backend-recognized, identifier of the display form.
     *
     * Note: specifying display forms by URI is discouraged and WILL be deprecated in the future. The
     * specification of URL has several drawbacks:
     *
     * -  Display form URLs are tied to particular analytical workspace; this makes any application that uses
     *    URL-specified display forms workspace-specific.
     * -  Display form URLs are not supported by all GoodData backends == this makes any application that uses
     *    URL-specified display form backend-specific
     */
    displayForm: ObjRef;
    /**
     * This is user-assigned alias of the attribute; it is opaque for the backend. When backend returns
     * metadata about execution results, it WILL include this user-assigned alias in the metadata.
     */
    alias?: string;
    /**
     * Indicates whether to show all values of given attribute even if the data bound to those values
     * are not available
     */
    showAllValues?: boolean;
}

/**
 * Describes attribute slicing of a dimension.
 *
 * @remarks
 * The primary descriptor is the attribute display form which was
 * used to slice the dimension. Description of the attribute to which the display form belongs is provided in the
 * `formOf` property.
 *
 * @public
 */
export declare interface IAttributeDescriptor {
    /**
     * Attribute descriptor header.
     */
    attributeHeader: IAttributeDescriptorBody;
}

/**
 * Attribute descriptor header.
 *
 * @public
 */
export declare interface IAttributeDescriptorBody {
    /**
     * URI of the display form object
     */
    uri: string;
    /**
     * Display form identifier
     */
    identifier: string;
    /**
     * Local identifier of the display form - this references back to the IAttribute which was on the input
     * to the execution.
     */
    localIdentifier: string;
    /**
     * Opaque reference of the display form object.
     */
    ref: ObjRef;
    /**
     * Human readable name of the attribute.
     */
    name: string;
    totalItems?: ITotalDescriptor[];
    /**
     * Display form type
     */
    type?: string;
    /**
     * Describes attributes to which the display form belongs.
     */
    formOf: IAttributeHeaderFormOf;
    /**
     * Specifies granularity in case of date attribute.
     */
    granularity?: string;
    /**
     * Describes format information in case of date attribute.
     */
    format?: {
        locale: string;
        pattern: string;
    };
}

/**
 * Attribute display form metadata object
 *
 * @public
 */
export declare interface IAttributeDisplayFormMetadataObject extends IMetadataObject {
    type: "displayForm";
    /**
     * A reference to the attribute that displayForm represents
     */
    attribute: ObjRef;
    /**
     * Subtype of the display form
     * (e.g. GDC.geo.pin, or GDC.link, see constants above).
     */
    displayFormType?: AttributeDisplayFormType | string;
    /**
     * Default display form of attribute.
     */
    isDefault?: boolean;
}

/**
 * Attribute element represented by concrete display form
 *
 * @public
 */
export declare interface IAttributeElement {
    /**
     * Title of the attribute element for the given display form
     */
    readonly title: string | null;
    /**
     * Uri of the attribute element
     */
    readonly uri: string | null;
    /**
     * Formatted title of attribute element for the given display form
     *
     * @remarks
     * The property represents the formatted form of title property for the given display form.
     * The formatted title should have precedence over original title to show a more readable form of dates.
     */
    readonly formattedTitle?: string;
}

/**
 * Attribute elements are used in positive and negative attribute filters. They can be specified either
 * using URI (primary key) or using textual values of the attribute elements.
 *
 * @public
 */
export declare type IAttributeElements = IAttributeElementsByRef | IAttributeElementsByValue;

/**
 * Attribute elements specified by their URI.
 *
 * @remarks
 * NOTE: attribute element URIs MAY NOT be transferable across workspaces. On some backends (such as bear)
 * same element WILL have different URI in each workspace. In general we recommend using URIs only if your code retrieves
 * them at runtime from backend using elements query or from the data view's headers. Hardcoding URIs is never a good idea, if
 * you find yourself doing that, please consider specifying attribute elements by value
 *
 * See {@link IAttributeElementsByValue}
 *
 * @public
 */
export declare interface IAttributeElementsByRef {
    uris: Array<string | null>;
}

/**
 * Attribute elements specified by their textual value.
 *
 * @public
 */
export declare interface IAttributeElementsByValue {
    values: Array<string | null>;
}

/**
 * Attribute filters limit results of execution to data pertaining to attributes that are or are not specified
 * by the filters.
 *
 * @public
 */
export declare type IAttributeFilter = IPositiveAttributeFilter | INegativeAttributeFilter;

/**
 * Describes attributes to which the display form belongs.
 *
 * @public
 */
export declare interface IAttributeHeaderFormOf {
    /**
     * Opaque reference of the attribute object.
     */
    ref: ObjRef;
    /**
     * URI of the attribute object.
     */
    uri: string;
    /**
     * Attribute identifier.
     */
    identifier: string;
    /**
     * Human readable name of the attribute.
     *
     * @remarks
     * Note: attribute name is typically more descriptive than the display form. Therefore, visualizations
     * often use the attribute name for axes and other descriptive elements of the chart such as tooltips.
     *
     * For example attribute called 'Location' may have multiple display forms each with different name and possibly
     * also different data type such as 'ShortName', 'LongName', 'Coordinates', 'Link' etc. Using the display
     * form name would often lead to visualizations which are harder to comprehend.
     */
    name: string;
}

/**
 * Attribute hierarchy metadata object.
 *
 * @public
 */
export declare interface IAttributeHierarchyMetadataObject extends IMetadataObjectIdentity, IMetadataObjectBase {
    type: "attributeHierarchy";
    /**
     * Ordered array of attributes which represent hierarchy.
     */
    attributes: ObjRef[];
}

/**
 * Locator that specifies a concrete attribute element for which the measure values are sliced.
 *
 * @public
 */
export declare interface IAttributeLocatorItem {
    attributeLocatorItem: IAttributeLocatorItemBody;
}

/**
 * Locator that specifies a concrete attribute element for which the measure values are sliced.
 *
 * @public
 */
export declare interface IAttributeLocatorItemBody {
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
 * Attribute metadata object
 *
 * @public
 */
export declare interface IAttributeMetadataObject extends IMetadataObject {
    type: "attribute";
    /**
     * A reference to the attribute displayForm that represents implicit drill down step
     *
     * @remarks
     * Drilling of this type will be available in any report/dashboard where this attribute will be present.
     * This will be performed on attribute headers and attribute element headers. These will be defined in LDM.
     */
    drillDownStep?: ObjRef;
    /**
     * A reference to the attribute displayForm that represents implicit drill to url from attribute value
     *
     * @remarks
     * Drilling of this type will be available in any report/dashboard where this attribute will be present.
     * This will be performed on attribute headers and attribute element headers. These will be defined in LDM.
     */
    drillToAttributeLink?: ObjRef;
    /**
     * Display forms of the attribute
     */
    displayForms: IAttributeDisplayFormMetadataObject[];
}

/**
 * Type representing bucket items - which can be either measure or an attribute.
 *
 * @public
 */
export declare type IAttributeOrMeasure = IMeasure | IAttribute;

/**
 * Sort item which specifies that the result should be sorted by attribute element values in either
 * ascending or descending order.
 *
 * @public
 */
export declare interface IAttributeSortItem {
    attributeSortItem: IAttributeSortTarget & IAttributeSortType & ISortDirection;
}

/**
 * Attribute sort target.
 *
 * @public
 */
export declare interface IAttributeSortTarget {
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
export declare interface IAttributeSortType {
    /**
     * If specified, defines aggregation function used on attribute's data points before sorting is evaluated
     * eg. used on stacked bar chart on view by attribute it defines, that all stacks are summed up and results are sorted
     */
    aggregation?: "sum";
}

/**
 * Object that can provide information about the users that created or modified it and when those actions occurred.
 * @public
 */
export declare type IAuditable = IAuditableDates & IAuditableUsers;

/**
 * Object that can provide information about the users that created or modified it and when those actions occurred.
 * @public
 */
export declare interface IAuditableDates {
    /**
     * Creation date - YYYY-MM-DD HH:mm:ss
     */
    created?: string;
    /**
     * Last update date - YYYY-MM-DD HH:mm:ss
     */
    updated?: string;
}

/**
 * Object that can provide information about the users that created or modified it and when those actions occurred.
 * @public
 */
export declare interface IAuditableUsers {
    /**
     * User id of the user that created the object.
     */
    createdBy?: IUser;
    /**
     * User id of the user that last modified the object.
     */
    updatedBy?: IUser;
}

/**
 * Grantee that is available as target for granting of a permission to shared object.
 *
 * @alpha
 */
export declare type IAvailableAccessGrantee = IAvailableUserAccessGrantee | IAvailableUserGroupAccessGrantee;

/**
 * User grantee that is available as target for granting of a permission to shared object.
 *
 * @alpha
 */
export declare interface IAvailableUserAccessGrantee {
    /**
     * Access grantee type
     */
    type: "user";
    /**
     * Access grantee object reference
     */
    ref: ObjRef;
    /**
     * Access grantee name
     */
    name: string;
    /**
     * Access grantee email
     */
    email?: string;
    /**
     * Access grantee status
     */
    status: "ENABLED" | "DISABLED";
}

/**
 * User group grantee that is available as target for granting of a permission to shared object.
 *
 * @alpha
 */
export declare interface IAvailableUserGroupAccessGrantee {
    /**
     * Access grantee type
     */
    type: "group";
    /**
     * Access grantee object reference
     */
    ref: ObjRef;
    /**
     * Access grantee name
     */
    name: string;
}

/**
 * Base type for dashboard widgets.
 *
 * @alpha
 */
export declare interface IBaseWidget {
    /**
     * Type of widget. This can be assigned by widget creator and can be any string up to 256 characters.
     *
     * @remarks see {@link BuiltInWidgetTypes} for list of built-in widget types.
     */
    readonly type: string;
}

/**
 * Bucket is a logical, user-defined grouping of attributes, measures and totals.
 *
 * @remarks
 * Buckets can be used to create a new execution and to derive the result dimensionality.
 * In the context of an existing execution, they serve as metadata about the execution.
 *
 * @public
 */
export declare interface IBucket {
    localIdentifier?: Identifier;
    items: IAttributeOrMeasure[];
    totals?: ITotal[];
}

/**
 * Type representing catalog attribute
 *
 * @public
 */
export declare interface ICatalogAttribute extends IGroupableCatalogItemBase {
    /**
     * Catalog item type
     */
    type: "attribute";
    /**
     * Attribute metadata object that catalog attribute represents
     */
    attribute: IAttributeMetadataObject;
    /**
     * Default display form of the attribute
     */
    defaultDisplayForm: IAttributeDisplayFormMetadataObject;
    /**
     * Display forms of the attribute
     */
    displayForms: IAttributeDisplayFormMetadataObject[];
    /**
     * Attribute's display forms that contain geo pins (lat; lng) pairs.
     */
    geoPinDisplayForms: IAttributeDisplayFormMetadataObject[];
}

/**
 * Type representing catalog attribute hierarchy.
 *
 * @public
 */
export declare interface ICatalogAttributeHierarchy {
    type: "attributeHierarchy";
    /**
     * Attribute hierarchy metadata object that attribute hierarchy represents.
     */
    attributeHierarchy: IAttributeHierarchyMetadataObject;
}

/**
 * Type representing catalog dateDataset date attribute
 *
 * @public
 */
export declare interface ICatalogDateAttribute {
    /**
     * Date attribute granularity
     */
    granularity: DateAttributeGranularity;
    /**
     * Date attribute metadata object
     */
    attribute: IAttributeMetadataObject;
    /**
     * Date attribute default display form metadata object
     */
    defaultDisplayForm: IAttributeDisplayFormMetadataObject;
}

/**
 * Type representing catalog date dataset
 *
 * @public
 */
export declare interface ICatalogDateDataset extends ICatalogItemBase {
    /**
     * Catalog item type
     */
    type: "dateDataset";
    /**
     * Date dataset relevance - higher is more, default relevance is 0
     */
    relevance: number;
    /**
     * Date dataset date attributes
     */
    dateAttributes: ICatalogDateAttribute[];
    /**
     * Dataset metadata object that catalog date dataset represents
     */
    dataSet: IDataSetMetadataObject;
}

/**
 * Type representing catalog fact
 *
 * @public
 */
export declare interface ICatalogFact extends IGroupableCatalogItemBase {
    /**
     * Catalog item type
     */
    type: "fact";
    /**
     * Fact metadata object that catalog fact represents
     */
    fact: IFactMetadataObject;
}

/**
 * Catalog group can be used to group catalog items
 *
 * @public
 */
export declare interface ICatalogGroup {
    /**
     * Group title
     */
    title: string;
    /**
     * Tag reference that catalog group represents
     */
    tag: ObjRef;
}

/**
 * Properties contained in each catalog item
 *
 * @public
 */
export declare interface ICatalogItemBase {
    type: CatalogItemType;
}

/**
 * Type representing catalog measure
 *
 * @public
 */
export declare interface ICatalogMeasure extends IGroupableCatalogItemBase {
    /**
     * Catalog item type
     */
    type: "measure";
    /**
     * Measure metadata object that catalog measure represents
     */
    measure: IMeasureMetadataObject;
}

/**
 * A color. It can be specified by referencing an item from from user-defined color palette or by RGB Value.
 *
 * @public
 */
export declare type IColor = IColorFromPalette | IRgbColor;

/**
 * Describes color included in a dimension.
 *
 * @public
 */
export declare interface IColorDescriptor {
    colorHeaderItem: IColorDescriptorItem;
}

/**
 * Describes color included in a dimension.
 *
 * @public
 */
export declare interface IColorDescriptorItem {
    id: string;
    name: string;
}

/**
 * Color defined by referencing an item in the user-defined color palette.
 *
 * @public
 */
export declare interface IColorFromPalette {
    type: GuidType;
    value: string;
}

/**
 * An item in color mapping definition for an insight. The color mapping is stored in properties of those
 * insights that can be colored AND have color mapping specified by the user.
 *
 * @public
 */
export declare interface IColorMappingItem {
    id: string;
    color: IColor;
}

/**
 * User-defined color palette. Colors from the palette can be used as input to charts and naturally
 * influence the coloring strategy for the chart.
 *
 * @public
 */
export declare type IColorPalette = IColorPaletteItem[];

/**
 * Color palette definition represents modified or created theme
 *
 * @alpha
 */
export declare interface IColorPaletteDefinition extends Partial<IMetadataObject> {
    readonly type: "colorPalette";
    readonly colorPalette: IColorPalette;
}

/**
 * An item in user-defined color palette. Item is essentially mapping of user-assigned
 * color identifier to an RGB Color value.
 *
 * @public
 */
export declare interface IColorPaletteItem {
    guid: string;
    fill: IRgbColorValue;
}

/**
 * Color palette metadata object
 *
 * @alpha
 */
export declare interface IColorPaletteMetadataObject extends IMetadataObject {
    readonly type: "colorPalette";
    readonly colorPalette: IColorPalette;
}

/**
 * Function that can be used to sort collections. The semantics are the same as the first argument to Array#sort function.
 * @public
 */
export declare type IComparator<T> = (a: T, b: T) => number;

/**
 * @public
 */
export declare interface IComparisonCondition {
    comparison: IComparisonConditionBody;
}

/**
 * @public
 */
export declare interface IComparisonConditionBody {
    operator: ComparisonConditionOperator;
    value: number;
    treatNullValuesAs?: number;
}

/**
 * Analytical dashboard consists of widgets
 * (widgets are kpis or insights with additional settings - drilling and alerting),
 * layout (which defines rendering and ordering of these widgets),
 * and filter context (configured attribute and date filters).
 * It's also possible to setup scheduled emails for the dashboard
 * (user will receive an email with the exported dashboard attached at the specified time interval),
 * and optionally extended date filter config.
 * @alpha
 */
export declare interface IDashboard<TWidget = IDashboardWidget> extends IDashboardBase, IDashboardObjectIdentity, Readonly<Required<IAuditableDates>>, Readonly<IAuditableUsers>, IAccessControlAware {
    readonly type: "IDashboard";
    /**
     * The layout of the dashboard determines the dashboard widgets {@link IWidget} and where they are rendered
     */
    readonly layout?: IDashboardLayout<TWidget>;
    /**
     * Dashboard filter context, or temporary filter context
     * (temporary filter context is used to override original filter context during the export)
     */
    readonly filterContext?: IFilterContext | ITempFilterContext;
    /**
     * Dashboard extended date filter config
     */
    readonly dateFilterConfig?: IDashboardDateFilterConfig;
    /**
     * Plugins used on this dashboard.
     */
    readonly plugins?: IDashboardPluginLink[];
}

/**
 * Email attachment - dashboard exported as pdf.
 *
 * @remarks
 * You can setup specific filter context to use for the dashboard export
 * @alpha
 */
export declare interface IDashboardAttachment {
    /**
     * Dashboard object ref
     */
    dashboard: ObjRef;
    /**
     * File format
     */
    format: "pdf";
    /**
     * Export filter context
     */
    filterContext?: ObjRef;
}

/**
 * Attribute filter of the filter context
 * @public
 */
export declare interface IDashboardAttributeFilter {
    attributeFilter: {
        /**
         * Display form object ref
         */
        displayForm: ObjRef;
        /**
         * Is negative filter?
         */
        negativeSelection: boolean;
        /**
         * Selected attribute elements
         * @beta
         */
        attributeElements: IAttributeElements;
        /**
         * Identifier of the filter which is valid in the scope of the filter context
         */
        localIdentifier?: string;
        /**
         * Parent filters that are limiting elements available in this filter
         * @beta
         */
        filterElementsBy?: IDashboardAttributeFilterParent[];
        /**
         * Custom title of the attribute filter. If specified has priority over the default attribute filter title.
         */
        title?: string;
        /**
         * Selection mode which defines how many elements can be in attributeElements.
         * Default value is 'multi' if property is missing.
         * @beta
         */
        selectionMode?: DashboardAttributeFilterSelectionMode;
    };
}

/**
 * Parent filter of an attribute filter of the filter context
 * @beta
 */
export declare interface IDashboardAttributeFilterParent {
    /**
     * Local identifier of the parent filter
     */
    filterLocalIdentifier: string;
    /**
     * Specification of the connection point(s) between the parent and child filter in the data model
     */
    over: {
        attributes: ObjRef[];
    };
}

/**
 * Reference to a particular dashboard attribute filter
 * This is commonly used to define filters to ignore
 * for the particular dashboard widget
 *
 * @alpha
 */
export declare interface IDashboardAttributeFilterReference {
    /**
     * Dashboard filter reference type
     */
    type: "attributeFilterReference";
    /**
     * Attribute display form reference of the target attribute filter
     */
    displayForm: ObjRef;
}

/**
 * Dashboard common properties
 * @alpha
 */
export declare interface IDashboardBase {
    /**
     * Dashboard title
     */
    readonly title: string;
    /**
     * Dashboard description
     */
    readonly description: string;
    /**
     * Dashboard tags.
     *
     * @remarks
     * This property is optional for backwards compatibility reasons, but for newly created dashboards,
     * you can expect this to always be defined (an empty array in case there are no tags).
     *
     * Since 8.6.0
     */
    readonly tags?: string[];
}

/**
 * Date filter of the filter context
 * @public
 */
export declare interface IDashboardDateFilter {
    dateFilter: {
        /**
         * Date filter type - relative or absolute
         * @beta
         */
        type: DateFilterType;
        /**
         * Date filter granularity
         * @beta
         */
        granularity: DateFilterGranularity;
        /**
         * Filter - from
         * @beta
         */
        from?: DateString | number;
        /**
         * Filter - to
         * @beta
         */
        to?: DateString | number;
        /**
         * DateDataSet object ref
         */
        dataSet?: ObjRef;
        /**
         * Date attribute object ref
         */
        attribute?: ObjRef;
    };
}

/**
 * Date filter presets to add to the date filter for the current dashboard
 * @alpha
 */
export declare interface IDashboardDateFilterAddedPresets {
    /**
     * Absolute date filter presets to include in the date filter for the current dashboard
     */
    absolutePresets?: IAbsoluteDateFilterPreset[];
    /**
     * Relative date filter presets to include in the date filter for the current dashboard
     */
    relativePresets?: IRelativeDateFilterPreset[];
}

/**
 * Extended date filter config
 * @alpha
 */
export declare interface IDashboardDateFilterConfig {
    /**
     * Customized name of the date filter to display
     */
    filterName: string;
    /**
     * Extended date filter config mode
     */
    mode: DashboardDateFilterConfigMode;
    /**
     * Local identifiers of the date filter options to hide for the current dashboard
     */
    hideOptions?: Identifier[];
    /**
     * Date filter granularities to hide in the date filter dropdown for the current dashboard
     */
    hideGranularities?: DateFilterGranularity[];
    /**
     * Date filter presets to add to the date filter dropdown specific for the current dashboard
     */
    addPresets?: IDashboardDateFilterAddedPresets;
}

/**
 * Reference to a particular dashboard date filter
 * This is commonly used to define filters to ignore
 * for the particular dashboard widget
 *
 * @alpha
 */
export declare interface IDashboardDateFilterReference {
    /**
     * Dashboard filter reference type
     */
    type: "dateFilterReference";
    /**
     * DataSet reference of the target date filter
     */
    dataSet: ObjRef;
}

/**
 * Dashboard definition represents modified or created dashboard
 *
 * @alpha
 */
export declare interface IDashboardDefinition<TWidget = IDashboardWidget> extends IDashboardBase, IAccessControlAware, Partial<IDashboardObjectIdentity> {
    readonly type: "IDashboard";
    /**
     * The layout of the dashboard determines the dashboard widgets {@link IWidget} and where they are rendered
     */
    readonly layout?: IDashboardLayout<TWidget>;
    /**
     * Dashboard filter context, or temporary filter context
     */
    readonly filterContext?: IFilterContext | IFilterContextDefinition;
    /**
     * Dashboard extended date filter config
     */
    readonly dateFilterConfig?: IDashboardDateFilterConfig;
    /**
     * Plugins to use on this dashboard.
     */
    readonly plugins?: IDashboardPluginLink[];
}

/**
 * Reference to a particular dashboard filter
 * This is commonly used to define filters to ignore
 * for the particular dashboard widget
 *
 * @alpha
 */
export declare type IDashboardFilterReference = IDashboardDateFilterReference | IDashboardAttributeFilterReference;

/**
 * Dashboard layout describes the data to be displayed on the dashboard, and their structure for UI rendering.
 * Generic TWidget param is here to support type checking with custom widgets (e.g. in Dashboard component).
 *
 * @alpha
 */
export declare interface IDashboardLayout<TWidget = IDashboardWidget> {
    /**
     * Unique type to identify dashboard layout.
     */
    type: "IDashboardLayout";
    /**
     * Layout sections.
     */
    sections: IDashboardLayoutSection<TWidget>[];
    /**
     * Layout size.
     */
    size?: IDashboardLayoutSize;
}

/**
 * Dashboard layout item - usually contains kpi widget, insight widget or another nested layout.
 * Generic TWidget param is here to support type checking with custom widgets (e.g. in Dashboard component).
 *
 * @alpha
 */
export declare interface IDashboardLayoutItem<TWidget = IDashboardWidget> {
    /**
     * Unique type to identify dashboard layout item.
     */
    type: "IDashboardLayoutItem";
    /**
     * Widget data - kpi widget, insight widget, nested layout or custom widget.
     */
    widget?: TWidget;
    /**
     * Item size configuration for each of the screen sizes.
     */
    size: IDashboardLayoutSizeByScreenSize;
}

/**
 * Dashboard layout section represents a group of widgets on the dashboard with a title and description.
 * @alpha
 */
export declare interface IDashboardLayoutSection<TWidget = IDashboardWidget> {
    /**
     * Unique type to identify dashboard layout section.
     */
    type: "IDashboardLayoutSection";
    /**
     * Section items.
     */
    items: IDashboardLayoutItem<TWidget>[];
    /**
     * Section header with title and description.
     */
    header?: IDashboardLayoutSectionHeader;
}

/**
 * Dashboard layout section header definition.
 *
 * @alpha
 */
export declare interface IDashboardLayoutSectionHeader {
    /**
     * Section title.
     */
    title?: string;
    /**
     * Section description.
     */
    description?: string;
}

/**
 * Dashboard layout size definition.
 *
 * @alpha
 */
export declare interface IDashboardLayoutSize {
    /**
     * Width, defined as a number of grid columns (grid is 12 columns wide by default).
     */
    gridWidth: number;
    /**
     * Height, defined as a number of grid rows.
     */
    gridHeight?: number;
    /**
     * Height defined as the ratio to the width in percent.
     * Examples:
     * - When heightAsRatio is 100, the column has a 1:1 ratio.
     * - When heightAsRatio is 200, the column has a 1:2 ratio.
     * - When heightAsRatio is 50, the column has a 2:1 ratio.
     */
    heightAsRatio?: number;
}

/**
 * Dashboard layout size configuration, defined by screen type.
 *
 * @alpha
 */
export declare interface IDashboardLayoutSizeByScreenSize {
    /**
     * The size configuration to use for a screen with a width less than the set xs breakpoint.
     */
    xs?: IDashboardLayoutSize;
    /**
     * The size configuration to use for a screen larger than the set xs breakpoint,
     * but smaller than the set sm breakpoint.
     */
    sm?: IDashboardLayoutSize;
    /**
     * The size configuration to use for a screen larger than the set sm breakpoint,
     * but smaller than the set md breakpoint.
     */
    md?: IDashboardLayoutSize;
    /**
     * The size configuration to use for a screen larger than the set md breakpoint,
     * but smaller than the set xl breakpoint.
     */
    lg?: IDashboardLayoutSize;
    /**
     * The size configuration to use for a screen larger than the set xl breakpoint.
     * This is also default configuration
     */
    xl: IDashboardLayoutSize;
}

/**
 * Dashboard metadata object
 *
 * @public
 */
export declare interface IDashboardMetadataObject extends IMetadataObject {
    type: "analyticalDashboard";
}

/**
 * Object unique identity
 * @alpha
 */
export declare interface IDashboardObjectIdentity {
    /**
     * Object ref
     */
    readonly ref: ObjRef;
    /**
     * Object uri
     */
    readonly uri: string;
    /**
     * Object identifier
     */
    readonly identifier: string;
}

/**
 * Dashboard permissions.
 *
 * @alpha
 */
export declare type IDashboardPermissions = {
    [permission in "canEditDashboard" | "canEditLockedDashboard" | "canShareLockedDashboard" | "canShareDashboard" | "canViewDashboard"]: boolean;
};

/**
 * @alpha
 */
export declare interface IDashboardPlugin extends IDashboardPluginBase, IDashboardObjectIdentity, IAuditable {
}

/**
 * @alpha
 */
export declare interface IDashboardPluginBase {
    readonly type: "IDashboardPlugin";
    /**
     * Plugin name.
     */
    readonly name: string;
    /**
     * Plugin description. This is optional and may provide additional information about what
     * the plugin does.
     */
    readonly description?: string;
    /**
     * Plugins may be tagged using arbitrary tags for additional categorization.
     */
    readonly tags: string[];
    /**
     * Fully qualified URL where the plugin entry point is hosted.
     */
    readonly url: string;
}

/**
 * @alpha
 */
export declare interface IDashboardPluginDefinition extends IDashboardPluginBase, Partial<IDashboardObjectIdentity> {
}

/**
 * A link between dashboard and a plugin that it uses. Optionally contains parameters that should
 * be passed to the plugin at load time.
 *
 * @alpha
 */
export declare interface IDashboardPluginLink {
    readonly type: "IDashboardPluginLink";
    /**
     * Linked plugin.
     */
    readonly plugin: ObjRef;
    /**
     * Contains parameters that should be passed to the plugin at load time. The format
     * and content of the parameters are fully dependent on the implementation of the plugin. If the
     * plugin parameterization is possible, then the plugin documentation should contain the detail.
     */
    readonly parameters?: string;
}

/**
 * Default dashboard widgets - kpi widget, insight widget, or nested layout.
 *
 * @alpha
 */
export declare type IDashboardWidget = IWidget | IWidgetDefinition | IDashboardLayout<IDashboardWidget>;

/**
 * Dataset column with name, type and boolean flag whether the column
 * needs to be skipped while data loading or not.
 *
 * @public
 */
export declare interface IDataColumn {
    column: IDataColumnBody;
}

/**
 * Data column object interface.
 *
 * @public
 */
export declare interface IDataColumnBody {
    name: string;
    type: DataColumnType;
    skip?: boolean;
    format?: string;
}

/**
 * Structural information about CSV header and columns.
 *
 * @remarks
 * Indicates whether the CSV file contains header or not and on which row.
 * Also contains the list of CSV columns with their names and types.
 *
 * @public
 */
export declare interface IDataHeader {
    headerRowIndex?: number;
    columns: IDataColumn[];
}

/**
 * Dataset describes a particular structure of dataset (CSV file).
 *
 * @remarks
 * There may be many Loads related to a single dataset - meaning multiple files with the same
 * structure and different data.
 *
 * @public
 */
export declare interface IDataset {
    dataset: IDatasetBody;
}

/**
 * Dataset object interface.
 *
 * @public
 */
export declare interface IDatasetBody {
    name: string;
    dataHeader: IDataHeader;
    datasetId: string;
    loadedRowCount: number;
    datasetLoadStatus: DatasetLoadStatus;
    firstSuccessfulUpdate?: IDatasetLoadInfo;
    lastSuccessfulUpdate?: IDatasetLoadInfo;
    lastUpdate?: IDatasetLoadInfo;
}

/**
 * Object wrapping basic information (owner, date created, status) about a CSV Load.
 *
 * @public
 */
export declare interface IDatasetLoadInfo {
    owner: IDatasetUser;
    status: DatasetLoadStatus;
    created: string;
}

/**
 * DataSet metadata object
 *
 * @public
 */
export declare interface IDataSetMetadataObject extends IMetadataObject {
    type: "dataSet";
}

/**
 * Object wrapping info about the user that created CSV load. Contains their login and full name.
 *
 * @public
 */
export declare interface IDatasetUser {
    login: string;
    fullName: string;
}

/**
 * Date filters limit the range of results to data within relative or absolute date range.
 *
 * @public
 */
export declare type IDateFilter = IRelativeDateFilter | IAbsoluteDateFilter;

/**
 * Date filter configs allow to define your own date filter options, that appear in the date filter.
 *
 * @alpha
 */
export declare interface IDateFilterConfig {
    /**
     * Extended date filter config reference
     */
    ref: ObjRef;
    /**
     * Local identifier of the default selected date filter preset
     */
    selectedOption: Identifier;
    /**
     * Options to customize displaying of the global all time date filter
     */
    allTime?: IAllTimeDateFilterOption;
    /**
     * Options to customize displaying of the global absolute date filter
     */
    absoluteForm?: IAbsoluteDateFilterForm;
    /**
     * Options to customize displaying of the global relative date filter
     */
    relativeForm?: IRelativeDateFilterForm;
    /**
     * Custom absolute date filter presets (options to display in the extended date filter dropdown)
     */
    absolutePresets?: IAbsoluteDateFilterPreset[];
    /**
     * Custom relative date filter presets (options to display in the extended date filter dropdown)
     */
    relativePresets?: IRelativeDateFilterPreset[];
}

/**
 * Common props for date filter options
 * @alpha
 */
export declare interface IDateFilterOption {
    /**
     * Local identifier of the option
     */
    localIdentifier: Identifier;
    /**
     * Customized name of the option to display in the dropdown
     */
    name?: string;
    /**
     * Option type
     */
    type: DateFilterOptionType;
    /**
     * Sets whether this option will be visible in the dropdown
     */
    visible: boolean;
}

/**
 * Type for all identifiers.
 *
 * @public
 */
export declare type Identifier = string;

/**
 * Model object reference using object's unique identifier.
 *
 * NOTE: this is preferred way to reference model objects.
 *
 * @public
 */
export declare type IdentifierRef = {
    /**
     * Type of object being referenced.
     *
     * -  This field MUST be specified when working with backends which have identifiers unique on workspace+type level
     *    instead of the entire workspace level. Tiger backend requires this field.
     *
     * -  Backends with workspace-unique identifiers MUST ignore this field.
     *
     * Note: the best way to avoid this conundrum is to actually avoid manually creating/typing the object references.
     * The catalog-exporter tool is capable to generate code from your LDM and will create correct references - allowing
     * you to treat references opaquely. Same stands for the various services provided the backend-spi - reference-able
     * entities returned by backend-spi will typically have the 'ref' property that contains correct object reference.
     */
    type?: ObjectType;
    /**
     * The actual identifier.
     */
    identifier: Identifier;
};

/**
 * Dimensions specify how to organize the results of an execution in a data view.
 *
 * @remarks
 * Imagine an attribute in columns vs. rows.
 * Each dimension requires the itemIdentifiers property, which is an array of items. These items could be attributes' localIdentifiers
 * or a special 'measureGroup' identifier.
 *
 * The 'measureGroup' can be used to specify that all measures in the execution definition should be
 * included in the dimension.
 *
 * @public
 */
export declare interface IDimension {
    /**
     * List of localIdentifier's of attribute to put in this dimension.
     */
    itemIdentifiers: Identifier[];
    /**
     * List of totals to include in this dimension.
     */
    totals?: ITotal[];
}

/**
 * Dimension descriptor is the output counter-part of the dimension specification that was included in the
 * execution definition.
 *
 * @remarks
 * It describes in further detail the LDM objects which were used to obtain data and metadata for the dimension
 * in the cross-tabulated result.
 *
 * The information is provided in a form of attribute or measure group descriptors. The contract is that the
 * descriptors appear in the same order as they were specified in the execution definition.
 *
 * This best best demonstrated using examples.
 *
 * 1. Execution was done for attribute A1 and measures M1 and M2. Both attribute and measureGroup are in single
 *    dimension.
 *
 * The result dimension will contain two headers, first will be header describing the attribute {@link IAttributeDescriptor},
 * followed by {@link IMeasureGroupDescriptor}. The measure group header contains two items - one for each requested
 * measure.
 *
 * 2. Execution was done for attributes A1 and A2, measures M1 and M2. Attribute A1 is in first dimension and
 *    the remainder of objects (A2 and measureGroup) is in second dimension.
 *
 * There will be two result dimension descriptors. First descriptor will specify single header for A1 attribute,
 * second descriptor will have two headers, first will be header for attribute A2 and then measure group header
 * with two items.
 *
 * @public
 */
export declare interface IDimensionDescriptor {
    headers: IDimensionItemDescriptor[];
}

/**
 * Headers describing contents of a dimension.
 *
 * @public
 */
export declare type IDimensionItemDescriptor = IMeasureGroupDescriptor | IAttributeDescriptor;

/**
 * Factory function for attribute predicate which evaluates true for attributes that match particular ID.
 *
 * @public
 */
export declare const idMatchAttribute: (id: string) => AttributePredicate;

/**
 * Factory function for predicates that will evaluate true if bucket's id is same as the provided id.
 *
 * @public
 */
export declare const idMatchBucket: (id: string) => BucketPredicate;

/**
 * Factory function for measure predicate which evaluates true for measures that match particular ID.
 *
 * @public
 */
export declare const idMatchMeasure: (id: string) => MeasurePredicate;

/**
 * Creates an IdentifierRef from object identifier and given object type.
 *
 * @remarks see {@link IdentifierRef} for more information about identifier references
 *
 * @param identifier - identifier to use
 * @param type - referenced object type
 * @returns identifier reference
 * @public
 */
export declare function idRef(identifier: Identifier, type?: ObjectType): IdentifierRef;

/**
 * Drill base type
 * @alpha
 */
export declare interface IDrill {
    /**
     * Drill type
     */
    type: DrillType;
    /**
     * Drill transition
     */
    transition: DrillTransition;
    /**
     * Drill origin
     */
    origin: DrillOrigin;
}

/**
 * Defines properties that are used for drillable widgets. Such widgets allow user clicking on
 * different parts of the widget and through this interaction navigate to other insights or dashboards.
 *
 * @alpha
 */
export declare interface IDrillableWidget {
    /**
     * Widget drills
     */
    readonly drills: DrillDefinition[];
}

/**
 * Drill from attribute
 * @alpha
 */
export declare interface IDrillFromAttribute extends IDrillOrigin {
    /**
     * Drill origin type
     */
    type: "drillFromAttribute";
    /**
     * Attribute object ref
     */
    attribute: ObjRefInScope;
}

/**
 * Drill from measure
 * @alpha
 */
export declare interface IDrillFromMeasure extends IDrillOrigin {
    /**
     * Drill origin type
     */
    type: "drillFromMeasure";
    /**
     * Measure object ref
     */
    measure: ObjRefInScope;
}

/**
 * Drill origin base type
 * @alpha
 */
export declare interface IDrillOrigin {
    /**
     * Drill origin type
     */
    type: DrillOriginType;
}

/**
 * Drill target
 * @alpha
 */
export declare type IDrillTarget = ObjRef | IDrillToCustomUrlTarget | IDrillToAttributeUrlTarget;

/**
 * Drill to attribute url
 * @alpha
 */
export declare interface IDrillToAttributeUrl extends IDrill {
    /**
     * Drill type
     */
    type: "drillToAttributeUrl";
    /**
     * Drill transition
     */
    transition: "new-window";
    /**
     * Target display form and hyperlink display form
     */
    target: IDrillToAttributeUrlTarget;
}

/**
 * Drill to attribute url target
 * @alpha
 */
export declare interface IDrillToAttributeUrlTarget {
    /**
     * Original attribute display form on the insight
     */
    displayForm: ObjRef;
    /**
     * Target attribute display form (must be of type `Hyperlink`), which contains elements with destination URL
     */
    hyperlinkDisplayForm: ObjRef;
}

/**
 * Drill to custom url
 * @alpha
 */
export declare interface IDrillToCustomUrl extends IDrill {
    /**
     * Drill type
     */
    type: "drillToCustomUrl";
    /**
     * Drill transition
     */
    transition: "new-window";
    /**
     * Target url
     */
    target: IDrillToCustomUrlTarget;
}

/**
 * Drill to custom url target
 * @alpha
 */
export declare interface IDrillToCustomUrlTarget {
    /**
     * Custom url to drill to
     */
    url: string;
}

/**
 * Drill to dashboard
 * @alpha
 */
export declare interface IDrillToDashboard extends IDrill {
    /**
     * Drill type
     */
    type: "drillToDashboard";
    /**
     * Drill transition
     */
    transition: "in-place";
    /**
     * Target dashboard ref. If not specified, then this is a drill to self - activating such
     * drill will not switch to a different dashboard but will instead set dashboard filters to
     * 'focus' on the drilled attribute element IF a filter for that attribute is defined for
     * the dashboard.
     *
     * Example: dashboard shows several for company departments. It is possible to filter the entire
     * dashboard by department. A column chart showing cost by department has drill to dashboard set
     * without 'target'. When user clicks a column, the dashboard's department filter will be set
     * to the department that the clicked column represents.
     */
    target?: ObjRef;
}

/**
 * Drill to insight
 * @alpha
 */
export declare interface IDrillToInsight extends IDrill {
    /**
     * Drill type
     */
    type: "drillToInsight";
    /**
     * Drill transition
     */
    transition: "pop-up";
    /**
     * Target insight ref
     */
    target: ObjRef;
}

/**
 * Drill to PP dashboard
 * @alpha
 */
export declare interface IDrillToLegacyDashboard extends IDrill {
    /**
     * Drill type
     */
    type: "drillToLegacyDashboard";
    /**
     * Drill transition
     */
    transition: "in-place";
    /**
     * Target dashboard tab
     */
    tab: string;
    /**
     * Target legacy dashboard ref
     */
    target: ObjRef;
}

/**
 * Entitlement descriptor
 *
 * @public
 */
export declare interface IEntitlementDescriptor {
    /**
     * License entitlement name
     */
    name: IEntitlementsName;
    /**
     * Optional value provided for the entitlement, for example workspace or user counts
     * for the respective entitlement names
     */
    value?: string;
    /**
     * Expiration date string of the entitlement returned as YYYY-MM-DD, used for
     * example with"Contract" entitlement
     */
    expiry?: string;
}

/**
 * Entitlement name
 *
 * @public
 */
export declare type IEntitlementsName = "CacheStrategy" | "Contract" | "CustomTheming" | "ExtraCache" | "ManagedOIDC" | "UiLocalization" | "Tier" | "UserCount" | "PdfExports" | "UnlimitedUsers" | "UnlimitedWorkspaces" | "WhiteLabeling" | "WorkspaceCount";

/**
 * Contains any configiration that should be part of execution
 *
 * @public
 */
export declare interface IExecutionConfig {
    /**
     * Data sampling is only available in Tiger for specific databases
     */
    dataSamplingPercentage?: number;
}

/**
 * Execution definition contains 100% complete description of what will the execution compute and how will
 * the resulting data look like.
 *
 * @remarks
 * While the execution definition is part of the public API, it is a low-level structure and as such SHOULD NOT
 * be used in the typical application code. The UI.SDK offers several convenience layers to construct the execution
 * definition. The typical flows start in the Analytical Workspace.
 *
 * @public
 */
export declare interface IExecutionDefinition {
    /**
     * Analytical Workspace against which the execution should be run.
     */
    readonly workspace: string;
    /**
     * Buckets describe logical grouping within attributes and measures - they serve as a metadata
     * about the execution. They ARE NOT used during the execution itself. MAY be empty.
     */
    readonly buckets: IBucket[];
    /**
     * Attributes to slice the results by. MAY be empty. If not specified, then measures MUST be specified.
     */
    readonly attributes: IAttribute[];
    /**
     * Measures to calculate. MAY be empty. If not specified, then attributes MUST be specified.
     */
    readonly measures: IMeasure[];
    /**
     * Filters to apply during the execution. MAY be empty.
     */
    readonly filters: IFilter[];
    /**
     * Sorting to apply on the results. MAY be empty.
     */
    readonly sortBy: ISortItem[];
    /**
     * Dimensionality and contents of dimensions. MUST be specified.
     *
     * The dimensions specify how the result should be organized. For instance which attributes should be
     * used to slice the row dimension, in which dimension should the measures be located.
     */
    readonly dimensions: IDimension[];
    /**
     * Contains any configuration that should be done with the data after they are obtained from the server
     * and before they are passed to the user.
     */
    readonly postProcessing?: IPostProcessing;
    /**
     * additional configuration of the execution
     */
    readonly executionConfig?: IExecutionConfig;
}

/**
 * Object describing minimal properties of existing dashboard.
 *
 * @alpha
 */
export declare interface IExistingDashboard extends IDashboardObjectIdentity {
    /**
     * Dashboard title
     */
    title?: string;
}

/**
 * Configuration of the exported file
 * @alpha
 */
export declare interface IExportOptions {
    includeFilters?: boolean;
    mergeHeaders?: boolean;
}

/**
 * Fact metadata object
 *
 * @public
 */
export declare interface IFactMetadataObject extends IMetadataObject {
    type: "fact";
}

/**
 * All possible filters.
 *
 * @public
 */
export declare type IFilter = IAbsoluteDateFilter | IRelativeDateFilter | IPositiveAttributeFilter | INegativeAttributeFilter | IMeasureValueFilter | IRankingFilter;

/**
 * Defines properties that are used for filterable widgets. Filterable widgets allow users to specify:
 *
 * -  Date data set that should be used for date-filtering the data for the widget
 * -  An ignore-list containing references to dashboard attribute filters that should be ignored by
 *    the widget.
 *
 * @alpha
 */
export declare interface IFilterableWidget {
    /**
     * Ignore particular dashboard filters in the current widget
     */
    readonly ignoreDashboardFilters: IDashboardFilterReference[];
    /**
     * Date data set widget is connected to
     */
    readonly dateDataSet?: ObjRef;
}

/**
 * Filter context consists of configured attribute and date filters
 * (which could be applied to the dashboard, widget alert, or scheduled email)
 *
 * @alpha
 */
export declare interface IFilterContext extends IFilterContextBase, IDashboardObjectIdentity {
}

/**
 * Common filter context properties
 *
 * @alpha
 */
export declare interface IFilterContextBase {
    /**
     * Filter context title
     */
    readonly title: string;
    /**
     * Filter context description
     */
    readonly description: string;
    /**
     * Attribute or date filters
     */
    readonly filters: FilterContextItem[];
}

/**
 * Filter context definition represents modifier or created filter context
 *
 * @alpha
 */
export declare interface IFilterContextDefinition extends IFilterContextBase, Partial<IDashboardObjectIdentity> {
}

/**
 * Access grantee specification with granular permissions.
 *
 * @public
 */
export declare interface IGranteeGranularity {
    /**
     * Permissions granted directly
     */
    permissions: AccessGranularPermission[];
    /**
     * Permissions granted by inheritance
     */
    inheritedPermissions: AccessGranularPermission[];
}

/**
 * Access grantee with granular permission.
 *
 * @public
 */
export declare type IGranularAccessGrantee = IGranularUserAccessGrantee | IGranularUserGroupAccessGrantee;

/**
 * User access specification with granular permissions.
 *
 * @alpha
 */
export declare interface IGranularUserAccess extends IGranteeGranularity {
    /**
     * Access type
     */
    type: "granularUser";
    /**
     * Access user
     */
    user: IWorkspaceUser;
}

/**
 * User access grantee specification with granular permissions.
 *
 * @public
 */
export declare interface IGranularUserAccessGrantee extends IGranteeGranularity {
    /**
     * Access grantee type
     */
    type: "granularUser";
    /**
     * Access grantee object reference
     */
    granteeRef: ObjRef;
}

/**
 * User group access specification with granular permissions.
 *
 * @alpha
 */
export declare interface IGranularUserGroupAccess extends IGranteeGranularity {
    /**
     * Access type
     */
    type: "granularGroup";
    /**
     * Access user group
     */
    userGroup: IWorkspaceUserGroup;
}

/**
 * User group access grantee specification with granular permissions.
 *
 * @public
 */
export declare interface IGranularUserGroupAccessGrantee extends IGranteeGranularity {
    /**
     * Access grantee type
     */
    type: "granularGroup";
    /**
     * Access grantee object reference
     */
    granteeRef: ObjRef;
}

/**
 * Properties contained in each groupable catalog item
 *
 * @public
 */
export declare interface IGroupableCatalogItemBase extends ICatalogItemBase {
    /**
     * Group tag references
     */
    groups: ObjRef[];
}

/**
 * Inline measures are defined as MAQL measures inline string.
 *
 * @remarks
 * Measures created from facts MAY specify aggregation function to apply during execution.
 *
 * @public
 */
export declare interface IInlineMeasureDefinition {
    inlineDefinition: {
        maql: string;
    };
}

/**
 * Represents an Insight defined in GoodData platform. Insight is typically created using Analytical Designer
 * and can be embedded using UI SDK.
 *
 * @remarks
 * Insight contains all metadata needed to construct its visualization and perform execution to obtain data
 * for that visualization.
 *
 * @public
 */
export declare type IInsight = IInsightDefinition & {
    insight: IAuditable & {
        /**
         * Unique identifier of the Insight
         */
        identifier: string;
        /**
         * Link to the insight.
         */
        uri: string;
        /**
         * Object to use when referencing insight.
         */
        ref: ObjRef;
        /**
         * Insight is locked for editing & deleting
         */
        isLocked?: boolean;
    };
};

/**
 * Insight definition specifies what and how should be visualized by an insight.
 *
 * @public
 */
export declare type IInsightDefinition = {
    insight: {
        /**
         * User-assigned title of this insight
         */
        title: string;
        /**
         * Insight tags.
         *
         * @remarks
         * This property is optional for backwards compatibility reasons, but for newly created insights,
         * you can expect this to always be defined (an empty array in case there are no tags).
         *
         * Added in 8.6.0
         */
        tags?: string[];
        /**
         * Insight summary.
         *
         * @remarks
         * This property is optional for backwards compatibility reasons, but for newly created insights,
         * you can expect this to always be defined (an empty string in case there are no summary).
         *
         * Added in 8.9.0
         */
        summary?: string;
        /**
         * URL of visualization that should be used to render this insight. This is a link to the location
         * where the visualization assets are stored and where they should be loaded and linked from.
         *
         * Note: at the moment, the SDK supports only compile-time linkage; for this the visualization URL
         * is in format "local:visName" (as in "local:bar" for BarChart)
         *
         * @alpha
         */
        visualizationUrl: string;
        /**
         * Buckets of attributes, measures and totals to render on the visualization.
         */
        buckets: IBucket[];
        /**
         * Filters to apply on the data.
         */
        filters: IFilter[];
        /**
         * Sorting to apply on the data.
         */
        sorts: ISortItem[];
        /**
         * Visualization-specific properties. This object MAY contain customization metadata for this insight such as:
         *
         * - what axis to display on a chart
         * - whether to display legend
         * - how to color the chart
         *
         * These properties vary from visualization to visualization. Backend does not process the properties in
         * any way.
         */
        properties: VisualizationProperties;
    };
};

/**
 * @alpha
 */
export declare interface IInsightWidget extends IInsightWidgetBase, IDashboardObjectIdentity {
}

/**
 * @alpha
 */
export declare interface IInsightWidgetBase extends IAnalyticalWidget {
    readonly type: "insight";
    /**
     * Widget insight object reference (when widget is not kpi)
     */
    readonly insight: ObjRef;
    /**
     * Overrides for visualization-specific properties.
     * Insight rendered in context of this widget
     * will use these properties instead of its own.
     *
     * This is now only supported for the PivotTable.
     *
     */
    readonly properties?: VisualizationProperties;
    /**
     * Drill interactions configured for the insight widget.
     */
    readonly drills: InsightDrillDefinition[];
    /**
     * Configuration of the widget itself regardless of the visualization type
     */
    readonly configuration?: IInsightWidgetConfiguration;
}

/**
 * @alpha
 */
export declare interface IInsightWidgetConfiguration {
    hideTitle?: boolean;
    description?: IInsightWidgetDescriptionConfiguration;
}

/**
 * @alpha
 */
export declare interface IInsightWidgetDefinition extends IInsightWidgetBase, Partial<IDashboardObjectIdentity> {
}

/**
 * Configuration of widget's description
 * @alpha
 */
export declare interface IInsightWidgetDescriptionConfiguration {
    /**
     * whether description should be visible or not
     */
    visible: boolean;
    /**
     * whether description should be used from widget or inherited from its insight
     */
    source: InsightWidgetDescriptionSourceType;
    /**
     * whether description should include also info about insight's metrics
     */
    includeMetrics: boolean;
}

/**
 * Kpi
 * @alpha
 */
export declare type IKpi = IKpiWithComparison | IKpiWithoutComparison;

/**
 * Common kpi properties
 * @alpha
 */
export declare interface IKpiBase {
    comparisonType: IKpiComparisonTypeComparison;
    comparisonDirection?: IKpiComparisonDirection;
    metric: ObjRef;
}

/**
 * Kpi comparison direction
 * @alpha
 */
export declare type IKpiComparisonDirection = "growIsGood" | "growIsBad";

/**
 * Kpi comparison type
 * @alpha
 */
export declare type IKpiComparisonTypeComparison = IKpiWithPreviousPeriodComparison["comparisonType"] | IKpiWithPopComparison["comparisonType"] | IKpiWithoutComparison["comparisonType"];

/**
 * @alpha
 */
export declare interface IKpiWidget extends IKpiWidgetBase, IDashboardObjectIdentity {
}

/**
 * @alpha
 */
export declare interface IKpiWidgetBase extends IAnalyticalWidget {
    readonly type: "kpi";
    /**
     * Temporary place for legacy kpi properties
     */
    readonly kpi: IKpi;
    /**
     * Drill interactions configured for the kpi widget.
     */
    readonly drills: KpiDrillDefinition[];
    /**
     * Configuration of the kpi itself
     */
    readonly configuration?: IKpiWidgetConfiguration;
}

/**
 * @alpha
 */
export declare interface IKpiWidgetConfiguration {
    description?: IKpiWidgetDescriptionConfiguration;
}

/**
 * @alpha
 */
export declare interface IKpiWidgetDefinition extends IKpiWidgetBase, Partial<IDashboardObjectIdentity> {
}

/**
 * Configuration of kpi's description
 * @alpha
 */
export declare interface IKpiWidgetDescriptionConfiguration {
    /**
     * whether description should be visible or not
     */
    visible: boolean;
    /**
     * whether description should be used from kpi or inherited from its metric
     */
    source: KpiWidgetDescriptionSourceType;
}

/**
 * Kpi with comparison
 * @alpha
 */
export declare type IKpiWithComparison = IKpiWithPreviousPeriodComparison | IKpiWithPopComparison;

/**
 * Kpi without comparison
 * @alpha
 */
export declare interface IKpiWithoutComparison extends IKpiBase {
    comparisonType: "none";
}

/**
 * Kpi with period over period comparison
 * @alpha
 */
export declare interface IKpiWithPopComparison extends IKpiBase {
    comparisonType: "lastYear";
    comparisonDirection: IKpiComparisonDirection;
}

/**
 * Kpi with previous period comparison
 * @alpha
 */
export declare interface IKpiWithPreviousPeriodComparison extends IKpiBase {
    comparisonType: "previousPeriod";
    comparisonDirection: IKpiComparisonDirection;
}

/**
 * Listed dashboard - to display the dashboard in the list
 * Only a subset of dashboard data is available,
 * for the full definition see {@link IDashboard}
 * @alpha
 */
export declare interface IListedDashboard extends Readonly<Required<IAuditableDates>>, Readonly<IAuditableUsers>, IAccessControlAware {
    /**
     * Dashboard object ref
     */
    readonly ref: ObjRef;
    /**
     * Dashboard uri
     */
    readonly uri: string;
    /**
     * Dashboard identifier
     */
    readonly identifier: string;
    /**
     * Dashboard title
     */
    readonly title: string;
    /**
     * Dashboard description
     */
    readonly description: string;
    /**
     * Dashboard tags.
     *
     * @remarks
     * This property is optional for backwards compatibility reasons, but for newly created dashboards,
     * you can expect this to always be defined (an empty array in case there are no tags).
     *
     * Since 8.6.0
     */
    readonly tags?: string[];
    /**
     * States if dashboard is shared with the user and fully accessible or if it is hidden but accessible via link if user knows it.
     */
    readonly availability: ListedDashboardAvailability;
}

/**
 * Locators are used to identify slice of measure values to sort by.
 *
 * @public
 */
export declare type ILocatorItem = IAttributeLocatorItem | IMeasureLocatorItem | ITotalLocatorItem;

/**
 * All types of measures have a set of common properties; those are defined here.
 *
 * @remarks
 * The measure-type-specific information is stored in the measure definition.
 *
 * @public
 */
export declare interface IMeasure<T extends IMeasureDefinitionType = IMeasureDefinitionType> extends IMeasureTitle {
    measure: IMeasureBody<T>;
}

/**
 * Object defining the {@link IMeasure} object structure.
 *
 * @public
 */
export declare interface IMeasureBody<T extends IMeasureDefinitionType = IMeasureDefinitionType> {
    localIdentifier: Identifier;
    definition: T;
    alias?: string;
    title?: string;
    format?: string;
}

/**
 * Simple measures are defined from existing MAQL measures or logical data model facts.
 *
 * @remarks
 * Measures created from facts MAY specify aggregation function to apply during execution.
 *
 * @public
 */
export declare interface IMeasureDefinition {
    measureDefinition: IMeasureDefinitionBody;
}

/**
 * Object defining the {@link IMeasureDefinition} object structure.
 *
 * @public
 */
export declare interface IMeasureDefinitionBody {
    /**
     * Reference to MAQL metric or LDM fact object.
     */
    item: ObjRef;
    /**
     * Aggregation to apply when calculating from LDM facts. If aggregation is provided for MAQL measures,
     * it will be ignored.
     */
    aggregation?: MeasureAggregation;
    /**
     * Filters to apply in scope of this measure's calculation.
     */
    filters?: IMeasureFilter[];
    /**
     * Indicates whether the measure should be calculated as % of total instead of actual values.
     */
    computeRatio?: boolean;
}

/**
 * Available measure definitions; this is union of simple measure, arithmetic measure, PoP measure and
 * previous period measure.
 *
 * @remarks
 * See the respective definitions for more information on what can be achieved using them.
 *
 * @public
 */
export declare type IMeasureDefinitionType = IInlineMeasureDefinition | IMeasureDefinition | IArithmeticMeasureDefinition | IPoPMeasureDefinition | IPreviousPeriodMeasureDefinition;

/**
 * Describes measure included in a dimension.
 *
 * @public
 */
export declare interface IMeasureDescriptor {
    measureHeaderItem: IMeasureDescriptorItem;
}

/**
 * Measure descriptor object.
 *
 * @public
 */
export declare interface IMeasureDescriptorItem {
    localIdentifier: string;
    /**
     * Measure name.
     *
     * @remarks
     * Backend must fill the name according to the following rules:
     *
     * -  If measure definition contained 'title', then name MUST equal to 'title',
     * -  Else if measure definition contained 'alias', then name MUST equal to 'alias',
     * -  Else if the backend has a name of the measure in its records, then it MUST include that name
     * -  Otherwise the name must default to value of localIdentifier
     */
    name: string;
    /**
     * Measure format.
     *
     * @remarks
     * Backend must fill the name according to the following rules:
     *
     * -  If measure definition contained 'format', then the format from the definition MUST be used
     * -  Else if backend has a format for the measure in its records, then it MUST include that format
     * -  Otherwise the format must be defaulted
     */
    format: string;
    /**
     * For persistent metrics or facts, this returns URI of the object. Is empty for ad-hoc measures.
     */
    uri?: string;
    /**
     * For persistent metrics or facts, this returns identifier of the object. Is empty for ad-hoc measures.
     */
    identifier?: string;
    /**
     * Opaque reference of the metric or fact object.
     */
    ref?: ObjRef;
}

/**
 * Descriptor of the measure and its contents.
 *
 * @public
 */
export declare interface IMeasureDescriptorObject {
    items: IMeasureDescriptor[];
    totalItems?: ITotalDescriptor[];
}

/**
 * All possible filters that can be specified for a simple measure.
 *
 * @public
 */
export declare type IMeasureFilter = IAbsoluteDateFilter | IRelativeDateFilter | IPositiveAttributeFilter | INegativeAttributeFilter;

/**
 * Describes measure group and its contents.
 * @public
 */
export declare interface IMeasureGroupDescriptor {
    measureGroupHeader: IMeasureDescriptorObject;
}

/**
 * Locator that specifies a concrete measure to sort by.
 *
 * @public
 */
export declare interface IMeasureLocatorItem {
    measureLocatorItem: IMeasureLocatorItemBody;
}

/**
 * Object defining the {@link IMeasureLocatorItem} object structure.
 *
 * @public
 */
export declare interface IMeasureLocatorItemBody {
    /**
     * Local identifier of the measure.
     */
    measureIdentifier: Identifier;
}

/**
 * Measure metadata object
 *
 * @public
 */
export declare type IMeasureMetadataObject = IMetadataObject & IMeasureMetadataObjectBase & IAuditable;

/**
 * @public
 */
export declare interface IMeasureMetadataObjectBase {
    type: "measure";
    /**
     * Measure MAQL expression
     */
    expression: string;
    /**
     * Measure formatting
     * Prefer set format value, if the format is empty string backend implementation-dependent default will be used.
     */
    format: string;
    /**
     * Measure is locked for editing
     */
    isLocked?: boolean;
}

/**
 * Measure metadata object definition
 *
 * @public
 */
export declare type IMeasureMetadataObjectDefinition = IMetadataObjectDefinition & IMeasureMetadataObjectBase;

/**
 * Sort item which specifies that the result should be sorted by value of a measure.
 *
 * @remarks
 * Since the result can have the value of the measure sliced by one or more attributes, the measure
 * sort item must explicitly specify the 'slice' by which to sort. This slice is specified by locators.
 *
 * @public
 */
export declare interface IMeasureSortItem {
    measureSortItem: IMeasureSortTarget & ISortDirection;
}

/**
 * Measure sort target.
 *
 * @public
 */
export declare interface IMeasureSortTarget {
    /**
     * Locators explicitly specifying the exact slice of the measure values to sort by.
     */
    locators: ILocatorItem[];
}

/**
 * Subset of IMeasure interface which defines properties that MAY be used to provide human readable
 * description of the measure.
 *
 * @public
 */
export declare interface IMeasureTitle {
    measure: IMeasureTitleBody;
}

/**
 * Object defining the {@link IMeasureTitle} object body.
 *
 * @public
 */
export declare interface IMeasureTitleBody {
    localIdentifier: string;
    title?: string;
    alias?: string;
}

/**
 * @public
 */
export declare interface IMeasureValueFilter {
    measureValueFilter: IMeasureValueFilterBody;
}

/**
 * Object defining the {@link IMeasureValueFilter} object body.
 *
 * @public
 */
export declare interface IMeasureValueFilterBody {
    measure: ObjRefInScope;
    condition?: MeasureValueFilterCondition;
}

/**
 * @public
 */
export declare interface IMetadataObject extends IMetadataObjectBase, IMetadataObjectIdentity {
}

/**
 * @public
 */
export declare interface IMetadataObjectBase {
    /**
     * Type of metadata object
     */
    type: ObjectType;
    /**
     * Title
     */
    title: string;
    /**
     * Description
     */
    description: string;
    /**
     * Is production
     */
    production: boolean;
    /**
     * Is metadata object deprecated?
     * Deprecated metadata objects still work in created reports or insights,
     * but you cannot select them for new ones (they are not displayed in the lists).
     */
    deprecated: boolean;
    /**
     * Indicates whether the item is unlisted. Depending on the context, unlisted items may
     * not be shown to the users at all or may be shown with a special indicator.
     */
    unlisted: boolean;
}

/**
 * @public
 */
export declare interface IMetadataObjectDefinition extends Partial<IMetadataObjectBase>, Partial<Pick<IMetadataObject, "id">> {
}

/**
 * @public
 */
export declare interface IMetadataObjectIdentity {
    /**
     * Metadata object reference
     */
    ref: ObjRef;
    /**
     * Metadata object identifier
     * Currently, our implementation still depends on converting id to uri (or uri to id)
     * So until we add cache, keep both id and uri exposed on metadata objects
     */
    id: string;
    /**
     * Metadata object uri
     * Currently, our implementation still depends on converting id to uri (or uri to id)
     * So until we add cache, keep both id and uri exposed on metadata objects
     */
    uri: string;
}

/**
 * Negative attribute filter essentially adds an `NOT IN <set>` condition to the execution on the backend.
 *
 * @remarks
 * When the condition is applied on attribute display form which is included in execution, it essentially limits the
 * attribute elements that will be returned in the results: only those elements that ARE NOT in the provided list
 * will be returned.
 *
 * The filter can be specified even for attributes that are not included in the execution - such a filter then
 * MAY influence the results of the execution indirectly: if the execution definition specifies MAQL measures that
 * use the filtered attribute.
 *
 * If the attribute elements in the `notIn` property are empty, then the filter is NOOP.
 *
 * @public
 */
export declare interface INegativeAttributeFilter {
    negativeAttributeFilter: INegativeAttributeFilterBody;
}

/**
 * Object defining the {@link INegativeAttributeFilter} object body.
 *
 * @public
 */
export declare interface INegativeAttributeFilterBody {
    /**
     * Display form whose attribute elements are included in the 'notIn' list.
     */
    displayForm: ObjRef;
    /**
     * Attribute elements to filter out. The attribute elements can be specified either using
     * their human readable value or by using they URI = the primary key. Using either representation has
     * the same effect. While using human readable representation may be more readable in the client code,
     * the using URI will likely have better performance on the backend.
     */
    notIn: IAttributeElements;
}

/**
 * Builder for inline measures.
 *
 * Do not instantiate this builder directly, instead use {@link newMeasure} or {@link modifyMeasure} functions.
 *
 * @public
 */
export declare class InlineMeasureBuilder extends MeasureBuilderBase<IInlineMeasureDefinition> {
    private readonly inlineMeasureDefinition;
    /**
     * @internal
     */
    constructor(measureInput: InlineMeasureBuilderInput);
    /**
     * Sets content of inline metric as string maql
     *
     * @param maql - maql of metric to use
     */
    maql: (maql: string) => this;
    protected generateLocalId(): string;
    protected buildDefinition(): IInlineMeasureDefinition;
}

/**
 * Input to the InlineMeasureBuilder.
 * @public
 */
export declare type InlineMeasureBuilderInput = string | IMeasure<IInlineMeasureDefinition>;

/**
 * Gets all attributes used in the provided insight
 *
 * @param insight - insight to work with
 * @param attributePredicate - predicate to select attributes satisfying some conditions
 * @returns empty if none
 * @public
 */
export declare function insightAttributes(insight: IInsightDefinition, attributePredicate?: AttributePredicate): IAttribute[];

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
export declare function insightBucket(insight: IInsightDefinition, idOrFun?: string | BucketPredicate): IBucket | undefined;

/**
 * Gets buckets for the insight. If ids are provided, then only returns buckets matching the ids.
 *
 * @param insight - insight to work with
 * @param ids - local identifiers of buckets
 * @returns empty list if none match
 * @public
 */
export declare function insightBuckets(insight: IInsightDefinition, ...ids: string[]): IBucket[];

/**
 * Gets the date when the insight was created
 *
 * @param insight - insight
 * @returns string - YYYY-MM-DD HH:mm:ss
 * @public
 */
export declare function insightCreated(insight: IInsight): string | undefined;

/**
 * Gets the user that created the insight
 *
 * @param insight - insight
 * @returns string
 * @public
 */
export declare function insightCreatedBy(insight: IInsight): IUser | undefined;

/**
 * @beta
 */
export declare const insightCreatedByComparator: (direction: ComparatorDirection_2) => IComparator_2<IInsight>;

/**
 * @beta
 */
export declare const insightCreatedComparator: (direction: ComparatorDirection_2) => IComparator_2<IInsight>;

/**
 * Insight definition builder can be used to set various properties of the insight using fluent API.
 *
 * @internal
 */
export declare class InsightDefinitionBuilder {
    private insight;
    constructor(visualizationUrl: string);
    title: (title: string) => InsightDefinitionBuilder;
    buckets: (buckets: IBucket[]) => InsightDefinitionBuilder;
    filters: (filters: IFilter[]) => InsightDefinitionBuilder;
    sorts: (sorts: ISortItem[]) => InsightDefinitionBuilder;
    properties: (properties: VisualizationProperties) => InsightDefinitionBuilder;
    build: () => IInsightDefinition;
}

/**
 * Contains breakdown of what display forms are used in an insight.
 *
 * @public
 */
export declare type InsightDisplayFormUsage = {
    /**
     * References to display forms used for slicing and dicing the results.
     */
    inAttributes: ObjRef[];
    /**
     * References to display forms used to filter the entire insight.
     */
    inFilters: ObjRef[];
    /**
     * References to display forms used to filter particular measures.
     */
    inMeasureFilters: ObjRef[];
};

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
export declare function insightDisplayFormUsage<T extends IInsightDefinition>(insight: T): InsightDisplayFormUsage;

/**
 * Insight widget drill definition
 * @alpha
 */
export declare type InsightDrillDefinition = IDrillToInsight | IDrillToDashboard | IDrillToCustomUrl | IDrillToAttributeUrl;

/**
 * Gets filters used in an insight.
 *
 * @param insight - insight to work with
 * @public
 */
export declare function insightFilters(insight: IInsightDefinition): IFilter[];

/**
 * Tests whether insight uses any attributes
 *
 * @param insight - insight to test
 * @returns true if any measures, false if not
 * @public
 */
export declare function insightHasAttributes(insight: IInsightDefinition): boolean;

/**
 * Tests whether insight contains valid definition of data to visualise - meaning at least one attribute or
 * one measure is defined in the insight.
 *
 * @param insight - insight to test
 * @returns true if at least one measure or attribute, false if none
 * @public
 */
export declare function insightHasDataDefined(insight: IInsightDefinition): boolean;

/**
 * Tests whether insight uses any measures.
 *
 * @param insight - insight to test
 * @returns true if any measures, false if not
 * @public
 */
export declare function insightHasMeasures(insight: IInsightDefinition): boolean;

/**
 * Gets the insight id
 *
 * @param insight - insight to get id of
 * @returns the insight id
 * @public
 */
export declare function insightId(insight: IInsight): string;

/**
 * Checks if insight is locked
 *
 * @param insight - insight
 * @returns boolean
 * @public
 */
export declare function insightIsLocked(insight: IInsight): boolean;

/**
 * Gets all attributes and measures used in the provided insight.
 *
 * @param insight - insight to work with
 * @returns empty if none
 * @public
 */
export declare function insightItems(insight: IInsightDefinition): IAttributeOrMeasure[];

/**
 * Gets all measures used in the provided insight.
 *
 * @param insight - insight to work with
 * @param measurePredicate - predicate to select measures satisfying some conditions
 * @returns empty if none
 * @public
 */
export declare function insightMeasures(insight: IInsightDefinition, measurePredicate?: MeasurePredicate): IMeasure[];

/**
 * @internal
 */
export declare type InsightModifications = (builder: InsightDefinitionBuilder) => InsightDefinitionBuilder;

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
export declare function insightModifyItems<T extends IInsightDefinition>(insight: T, modifications?: BucketItemModifications): T;

/**
 * Gets visualization properties of an insight.
 *
 * @param insight - insight to get vis properties for
 * @returns empty object is no properties
 * @public
 */
export declare function insightProperties(insight: IInsightDefinition): VisualizationProperties;

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
export declare function insightReduceItems<T extends IInsightDefinition>(insight: T, reducer?: BucketItemReducer): T;

/**
 * Gets opaque reference to the insight.
 *
 * @param insight - insight to get ref of
 * @public
 */
export declare function insightRef(insight: IInsight): ObjRef;

/**
 * Makes sure the insight does not have any nonsensical data (like totals that no longer make sense, etc.), before it is saved.
 *
 * @param insight - the insight or insight definition to sanitize
 * @public
 */
export declare function insightSanitize<T extends IInsightDefinition>(insight: T): T;

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
export declare function insightSetBuckets<T extends IInsightDefinition>(insight: T, buckets?: IBucket[] | undefined): T;

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
export declare function insightSetFilters<T extends IInsightDefinition>(insight: T, filters?: IFilter[]): T;

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
export declare function insightSetProperties<T extends IInsightDefinition>(insight: T, properties?: VisualizationProperties): T;

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
export declare function insightSetSorts<T extends IInsightDefinition>(insight: T, sorts?: ISortItem[]): T;

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
export declare function insightSorts(insight: IInsightDefinition): ISortItem[];

/**
 * Gets the insights summary
 *
 * @param insight - insight to get the summary of
 * @returns the insight summary or an empty string if is not specified
 * @public
 */
export declare function insightSummary(insight: IInsightDefinition): string;

/**
 * Gets the insights tags from the tagging system
 *
 * @param insight - insight to get the tags of
 * @returns the insight tags or aan empty array if none are specified
 * @public
 */
export declare function insightTags(insight: IInsightDefinition): string[];

/**
 * Gets the insight title
 *
 * @param insight - insight to get title of
 * @returns the insight title
 * @public
 */
export declare function insightTitle(insight: IInsightDefinition): string;

/**
 * @beta
 */
export declare const insightTitleComparator: (direction: ComparatorDirection_2) => IComparator_2<IInsightDefinition_2>;

/**
 * Gets all totals defined in the insight
 *
 * @param insight - insight to get totals from
 * @returns empty if none
 * @public
 */
export declare function insightTotals(insight: IInsightDefinition): ITotal[];

/**
 * Gets the date of the last insight update
 *
 * @param insight - insight
 * @returns string - YYYY-MM-DD HH:mm:ss
 * @public
 */
export declare function insightUpdated(insight: IInsight): string | undefined;

/**
 * Gets the user that last updated the insight
 *
 * @param insight - insight
 * @returns string
 * @public
 */
export declare function insightUpdatedBy(insight: IInsight): IUser | undefined;

/**
 * @beta
 */
export declare const insightUpdatedByComparator: (direction: ComparatorDirection_2) => IComparator_2<IInsight>;

/**
 * @beta
 */
export declare const insightUpdatedComparator: (direction: ComparatorDirection_2) => IComparator_2<IInsight>;

/**
 * Gets the insight uri
 *
 * @param insight - insight to get uri of
 * @returns the insight uri
 * @public
 */
export declare function insightUri(insight: IInsight): string;

/**
 *
 * @param insight - insight to get visualization type
 * @alpha
 */
export declare function insightVisualizationType(insight: IInsightDefinition): string;

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
export declare function insightVisualizationUrl(insight: IInsightDefinition): string;

/**
 * @alpha
 */
export declare type InsightWidgetDescriptionSourceType = "widget" | "insight";

/**
 * Represents a filter specification variant where either the actual filter or a 'null' filter is
 * provided. Null filters will be ignored during processing.
 *
 * @public
 */
export declare type INullableFilter = IFilter | undefined | null;

/**
 * Organization descriptor contains details about the organization that services analytical workspaces.
 *
 * @public
 */
export declare interface IOrganizationDescriptor {
    id: string;
    title: string;
}

/**
 * Defines Period-Over-Period measure (or Time-over-Time).
 *
 * @remarks
 * This is a derived measure that calculates value of a measure referenced by measureIdentifier in previous period.
 * The period to calculate value for will be determined from the specified date data set's attribute - popAttribute.
 *
 * @privateRemarks
 * TODO: enhance, add examples
 * @public
 */
export declare interface IPoPMeasureDefinition {
    popMeasureDefinition: IPoPMeasureDefinitionBody;
}

/**
 * Object defining the {@link IPoPMeasureDefinition} object body.
 *
 * @public
 */
export declare interface IPoPMeasureDefinitionBody {
    measureIdentifier: Identifier;
    popAttribute: ObjRef;
}

/**
 * Positive attribute filter essentially adds an `IN <set>` condition to the execution on the backend.
 *
 * @remarks
 * When the condition is applied on attribute display form which is included in execution, it essentially limits the
 * attribute elements that will be returned in the results: only those elements that are in the provided list
 * will be returned.
 *
 * The filter can be specified even for attributes that are not included in the execution - such a filter then
 * MAY influence the results of the execution indirectly: if the execution definition specifies MAQL measures that
 * use the filtered attribute.
 *
 * If the attribute elements in the `in` property are empty, then the filter is NOOP.
 * @public
 */
export declare interface IPositiveAttributeFilter {
    positiveAttributeFilter: IPositiveAttributeFilterBody;
}

/**
 * Object defining the {@link IPositiveAttributeFilter} object body.
 *
 * @public
 */
export declare interface IPositiveAttributeFilterBody {
    /**
     * Display form whose attribute elements are included in the 'in' list.
     */
    displayForm: ObjRef;
    /**
     * Attribute elements to filter in. The attribute elements can be specified either using
     * their human readable value or by using their URI = the primary key. Using either representation has
     * the same effect. While using human readable representation may be more readable in the client code,
     * the using URI will likely have better performance on the backend.
     */
    in: IAttributeElements;
}

/**
 * Contains any configuration that should be done with the data after they are obtained from the server
 * and before they are passed to the user.
 *
 * @public
 */
export declare interface IPostProcessing {
    /**
     * Format to be applied to the dates in an AFM execution response.
     */
    readonly dateFormat?: string;
}

/**
 * This is used to specify previous period.
 *
 * @remarks
 * Previous period is current time period shifted forward or backward
 * one or more times. The current time period is calculated from filter setting for the provided date data set.
 *
 * @public
 */
export declare interface IPreviousPeriodDateDataSet {
    dataSet: ObjRef;
    periodsAgo: number;
}

/**
 * Simplified Previous Period Data DataSet specification
 * @public
 */
export declare interface IPreviousPeriodDateDataSetSimple {
    /**
     * Identifier or reference to the date data set.
     */
    dataSet: string | ObjRef;
    periodsAgo: number;
}

/**
 * This is a derived measure that calculates value of a measure referenced by measureIdentifier for previous
 * period.
 *
 * @remarks
 * Period is determined from filter setting of the specified date data sets. The time period for
 * this derived measure will be shifted forward or backward according to the specified periodAgo number
 *
 * @privateRemarks
 * TODO: enhance, add examples
 *
 * @public
 */
export declare interface IPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: IPreviousPeriodMeasureDefinitionBody;
}

/**
 * Object defining the {@link IPreviousPeriodMeasureDefinition} object body.
 *
 * @public
 */
export declare interface IPreviousPeriodMeasureDefinitionBody {
    measureIdentifier: Identifier;
    dateDataSets: IPreviousPeriodDateDataSet[];
}

/**
 * @public
 */
export declare interface IRangeCondition {
    range: IRangeConditionBody;
}

/**
 * Object defining the {@link IRangeCondition} object body.
 *
 * @public
 */
export declare interface IRangeConditionBody {
    operator: RangeConditionOperator;
    from: number;
    to: number;
    treatNullValuesAs?: number;
}

/**
 * @public
 */
export declare interface IRankingFilter {
    rankingFilter: IRankingFilterBody;
}

/**
 * Object defining the {@link IRankingFilter} object body.
 *
 * @public
 */
export declare interface IRankingFilterBody {
    measure: ObjRefInScope;
    attributes?: ObjRefInScope[];
    operator: RankingFilterOperator;
    value: number;
}

/**
 * Filters results to a relative date range.
 *
 * @remarks
 * The relative filtering is always done on some granularity - this specifies
 * the units in the 'from' and 'to' fields.
 *
 * See {@link DateAttributeGranularity}, {@link AllTimeGranularity} and {@link DateGranularity} for further detail.
 * @public
 */
export declare type IRelativeDateFilter = {
    relativeDateFilter: {
        dataSet: ObjRef;
        granularity: DateAttributeGranularity;
        from: number;
        to: number;
    };
} | {
    relativeDateFilter: {
        dataSet: ObjRef;
        granularity: AllTimeGranularity;
        from: 0;
        to: 0;
    };
};

/**
 * Customized options for the global relative date filter
 * @alpha
 */
export declare interface IRelativeDateFilterForm extends IDateFilterOption {
    /**
     * Type to identify the global relative date filter
     */
    type: DateFilterOptionRelativeFormType;
    /**
     * Available granularities for the global relative date filter
     */
    availableGranularities: DateFilterGranularity[];
}

/**
 * Custom relative date filter preset
 * @alpha
 */
export declare interface IRelativeDateFilterPreset extends IDateFilterOption {
    /**
     * Type to identify a relative date filter preset
     */
    type: DateFilterOptionRelativePresetType;
    /**
     * Relative date filter granularity (day/week/year,etc.)
     */
    granularity: DateFilterGranularity;
    /**
     * Relative date filter granularity start offset
     */
    from: RelativeDateFilterGranularityOffset;
    /**
     * Relative date filter granularity end offset
     */
    to: RelativeDateFilterGranularityOffset;
}

/**
 * Generic type to express relative date filter preset of a particular granularity
 * @alpha
 */
export declare interface IRelativeDateFilterPresetOfGranularity<Key extends DateFilterGranularity> extends IRelativeDateFilterPreset {
    /**
     * Particular relative date filter preset granularity
     */
    granularity: Key;
}

/**
 * Represents values of a relative filter.
 *
 * @public
 */
export declare interface IRelativeDateFilterValues {
    from: number;
    to: number;
    granularity: string;
}

/**
 * Attribute header specifies name and URI of the attribute element to which the calculated measure
 * values in the particular data view slice belong.
 *
 * @public
 */
export declare interface IResultAttributeHeader {
    attributeHeaderItem: IResultAttributeHeaderItem;
}

/**
 * Attribute header item specifies name and URI of the attribute element to which the calculated measure
 * values in the particular data view slice belong.
 *
 * @public
 */
export declare interface IResultAttributeHeaderItem {
    /**
     * Human readable name of the attribute element.
     *
     * @remarks
     */
    name: string | null;
    /**
     * URI of the attribute element.
     *
     * @remarks
     * This is essentially a primary key of the attribute element. It can
     * be used in places where attribute elements have to be exactly specified - such as positive or
     * negative attribute filters.
     *
     * It is up to the backend implementation whether the URI is transferable across workspaces or not in the
     * data distribution scenarios. In other words, if a data for one attribute (say Product) is distributed
     * into multiple workspaces, it is up to the backend whether the URIs of the elements will be same across
     * all workspaces or not.
     *
     * Recommendation for the consumers: URI is safe to use if you obtain in programmatically from this header
     * and then use it in the same workspace for instance for filtering. It is not safe to hardcode URIs
     * and use them in a solution which should operate on top of different workspaces.
     *
     * Note that this can actually be null on some backends if your data contains NULL values.
     * We will change the type of this to string | null in the next major (since it is a breaking change),
     * but for now, if you expect NULLs in your data, treat this as string | null already.
     */
    uri: string;
    /**
     * Formatted name of attribute element.
     *
     * @remarks
     * This property holds the formatted form of name property in case of date attributes. When using attribute
     * elements in visualisations, formatted name should have precedence over original name to show a more
     * readable form of dates. In other cases, such as drilling, original name property must be used to avoid
     * inconsistencies.
     */
    formattedName?: string;
}

/**
 * Result headers provide metadata about data included in the data view.
 *
 * @remarks
 * They are integral part of the data view and are organized in per-dimension and per-dimension-item arrays.
 *
 * @remarks see {@link @gooddata/sdk-backend-spi#IDataView} for further detail on the organization.
 *
 * @public
 */
export declare type IResultHeader = IResultAttributeHeader | IResultMeasureHeader | IResultTotalHeader;

/**
 * Measure header specifies name of the measure to which the calculated values in the particular data view slice belong.
 *
 * @remarks
 * Measure header also specifies 'order' - this is essentially an index into measure group descriptor's item array; it
 * can be used to obtain further information about the measure.
 *
 * @public
 */
export declare interface IResultMeasureHeader {
    measureHeaderItem: IResultMeasureHeaderItem;
}

/**
 * Measure header specifies name of the measure to which the calculated values in the particular data view slice belong.
 *
 * @remarks
 * Measure header also specifies 'order' - this is essentially an index into measure group descriptor's item array; it
 * can be used to obtain further information about the measure.
 *
 * @public
 */
export declare interface IResultMeasureHeaderItem {
    /**
     * Measure name - equals to the measure name contained in the respective measure descriptor, included here
     * for convenience and easy access.
     *
     * Note: check out the contract for measure name as described in {@link IMeasureDescriptor} - it is
     * somewhat more convoluted than one would expect.
     */
    name: string;
    /**
     * Index of this measure's descriptor within the measure group description. The measure group descriptor
     * is included in the execution result.
     */
    order: number;
}

/**
 * Total header specifies name and type of total to which the calculated values in particular data view slice belong.
 *
 * @public
 */
export declare interface IResultTotalHeader {
    totalHeaderItem: IResultTotalHeaderItem;
}

/**
 * Total header specifies name and type of total to which the calculated values in particular data view slice belong.
 * Also can contain measure index which can be used to lookup the measure which belongs to this total.
 *
 * @public
 */
export declare interface IResultTotalHeaderItem {
    name: string;
    type: string;
    measureIndex?: number;
}

/**
 * Represents an execution result warning.
 * (e.g. when execution was executed successfully, but backend didn't take something into the account)
 *
 * @public
 */
export declare interface IResultWarning {
    /**
     * Unique identifier of the execution warning
     */
    warningCode: string;
    /**
     * Human readable representation of the execution warning.
     *
     * @remarks
     * With C-like printf parameter placeholders.
     * The values for the placeholders are in the parameters array in the order in which they should replace the placeholders.
     *
     * Example: "metric filter on dimension [%s] not applied"
     */
    message: string;
    /**
     * Execution warning parameters (e.g. when filter was not applied - its ObjRef)
     */
    parameters?: (ObjRef | string)[];
}

/**
 * Color defined used RGB values.
 *
 * @public
 */
export declare interface IRgbColor {
    type: RgbType;
    value: IRgbColorValue;
}

/**
 * RGB Color value specification.
 *
 * @public
 */
export declare interface IRgbColorValue {
    r: number;
    g: number;
    b: number;
}

/**
 * Returns true when given date filter has type set to absolute.
 * @alpha
 */
export declare function isAbsoluteDashboardDateFilter(dateFilter: IDashboardDateFilter): boolean;

/**
 * Type guard checking whether the provided object is an absolute date filter.
 *
 * @public
 */
export declare function isAbsoluteDateFilter(obj: unknown): obj is IAbsoluteDateFilter;

/**
 * Type-guard testing whether the provided object is an instance of {@link IAbsoluteDateFilterForm}.
 * @alpha
 */
export declare const isAbsoluteDateFilterForm: (obj: unknown) => obj is IAbsoluteDateFilterForm;

/**
 * Type-guard testing whether the provided object is an instance of {@link IAbsoluteDateFilterPreset}.
 * @alpha
 */
export declare const isAbsoluteDateFilterPreset: (obj: unknown) => obj is IAbsoluteDateFilterPreset;

/**
 * Type guard for checking whether object is an adhoc measure.
 *
 * @remarks
 * An adhoc measure is a measure having an aggregation, one or some filters or a computeRatio of true
 *
 * @public
 */
export declare function isAdhocMeasure(obj: unknown): obj is IMeasure<IMeasureDefinition>;

/**
 * Type-guard testing whether the provided object is an All time dashboard date filter.
 * @alpha
 */
export declare function isAllTimeDashboardDateFilter(obj: unknown): boolean;

/**
 * Type guard checking whether the provided object is an all time date filter.
 *
 * @public
 */
export declare function isAllTimeDateFilter(obj: unknown): obj is IRelativeDateFilter & {
    relativeDateFilter: {
        granularity: "ALL_TIME_GRANULARITY";
    };
};

/**
 * Type-guard testing whether the provided object is an instance of {@link IAllTimeDateFilterOption}.
 * @alpha
 */
export declare const isAllTimeDateFilterOption: (obj: unknown) => obj is IAllTimeDateFilterOption;

/**
 * Type guard for checking whether object is an arithmetic measure.
 *
 * @public
 */
export declare function isArithmeticMeasure(obj: unknown): obj is IMeasure<IArithmeticMeasureDefinition>;

/**
 * Type guard for checking whether object is an arithmetic measure definition.
 *
 * @public
 */
export declare function isArithmeticMeasureDefinition(obj: unknown): obj is IArithmeticMeasureDefinition;

/**
 * Type guard checking whether object is an instance of IAttribute.
 *
 * @public
 */
export declare function isAttribute(obj: unknown): obj is IAttribute;

/**
 * Type guard checking whether an object is an attribute area sort item.
 *
 * @public
 */
export declare function isAttributeAreaSort(obj: unknown): obj is IAttributeSortItem;

/**
 * Type-guard testing whether the provided object is an instance of {@link IAttributeDescriptor}.
 *
 * @public
 */
export declare function isAttributeDescriptor(obj: unknown): obj is IAttributeDescriptor;

/**
 * Tests whether the provided object is of type {@link IAttributeDisplayFormMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isAttributeDisplayFormMetadataObject(obj: unknown): obj is IAttributeDisplayFormMetadataObject;

/**
 * Type guard checking whether the provided object is list of attribute elements specified by URI reference.
 *
 * @public
 */
export declare function isAttributeElementsByRef(obj: unknown): obj is IAttributeElementsByRef;

/**
 * Type guard checking whether the provided object is list of attribute elements specified by their text value.
 *
 * @public
 */
export declare function isAttributeElementsByValue(obj: unknown): obj is IAttributeElementsByValue;

/**
 * Type guard checking whether the provided object is an attribute filter.
 *
 * @public
 */
export declare function isAttributeFilter(obj: unknown): obj is IAttributeFilter;

/**
 * Tests whether the provided object is of type {@link IAttributeHierarchyMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isAttributeHierarchyMetadataObject(obj: unknown): obj is IAttributeHierarchyMetadataObject;

/**
 * Type guard checking whether an object is an attribute locator.
 *
 * @public
 */
export declare function isAttributeLocator(obj: unknown): obj is IAttributeLocatorItem;

/**
 * Tests whether the provided object is of type {@link IAttributeMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isAttributeMetadataObject(obj: unknown): obj is IAttributeMetadataObject;

/**
 * Type guard checking whether an object is an attribute sort item.
 *
 * @public
 */
export declare function isAttributeSort(obj: unknown): obj is IAttributeSortItem;

/**
 * Type guard checking whether an object is a normal attribute value sort item, not the area one.
 *
 * @public
 */
export declare function isAttributeValueSort(obj: unknown): obj is IAttributeSortItem;

/**
 * Tests whether the provided object is an instance of {@link IAvailableUserAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isAvailableUserAccessGrantee: (obj: unknown) => obj is IAvailableUserAccessGrantee;

/**
 * Tests whether the provided object is an instance of {@link IAvailableUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isAvailableUserGroupAccessGrantee: (obj: unknown) => obj is IAvailableUserGroupAccessGrantee;

/**
 * Type-guard testing whether the provided object is an instance of {@link IBucket}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isBucket(obj: unknown): obj is IBucket;

/**
 * Type guard checking whether the provided object is a {@link ICatalogAttribute}
 *
 * @public
 */
export declare function isCatalogAttribute(obj: unknown): obj is ICatalogAttribute;

/**
 * Type guard checking whether the provided object is a {@link ICatalogAttributeHierarchy}.
 *
 * @public
 */
export declare function isCatalogAttributeHierarchy(obj: unknown): obj is ICatalogAttributeHierarchy;

/**
 * Type guard checking whether object is an instance of ICatalogDateDataset.
 *
 * @public
 */
export declare function isCatalogDateDataset(obj: unknown): obj is ICatalogDateDataset;

/**
 * Type guard checking whether the provided object is a {@link ICatalogFact}
 *
 * @public
 */
export declare function isCatalogFact(obj: unknown): obj is ICatalogFact;

/**
 * Type guard checking whether the provided object is a {@link ICatalogMeasure}
 *
 * @public
 */
export declare function isCatalogMeasure(obj: unknown): obj is ICatalogMeasure;

/**
 * A scheduled email is used to notify a user with an exported dashboard according to a specified time interval
 * @alpha
 */
export declare interface IScheduledMail extends IAuditableUsers, IScheduledMailBase, IDashboardObjectIdentity {
}

/**
 * A scheduled email common properties
 * @alpha
 */
export declare interface IScheduledMailBase {
    /**
     * Scheduled email title
     */
    title: string;
    /**
     * Scheduled email description
     */
    description: string;
    /**
     * Scheduled email job interval
     */
    when: {
        /**
         * Start date in YYYY-MM-DD format.
         */
        startDate: string;
        /**
         * End date in YYYY-MM-DD format.
         */
        endDate?: string;
        /**
         * Recurrence specification string
         * e.g. 0:0:1*3:12:30:0
         */
        recurrence: string;
        /**
         * Timezone
         * e.g. Europe/Amsterdam
         */
        timeZone: string;
    };
    /**
     * Recipients unique login identifiers - should be equal to login property in {@link IWorkspaceUser} / {@link IUser}
     */
    to: string[];
    /**
     * BCC recipients email addresses
     */
    bcc?: string[];
    /**
     * Unsubscribed recipients email addresses
     */
    unsubscribed?: string[];
    /**
     * Email subject
     */
    subject: string;
    /**
     * Email message body
     */
    body: string;
    /**
     * Email attachments
     */
    attachments: ScheduledMailAttachment[];
    /**
     * Date of the last successful email processing job run
     */
    lastSuccessful?: string;
    /**
     * Is unlisted?
     */
    unlisted: boolean;
}

/**
 * A scheduled email is used to notify a user with an exported dashboard according to a specified time interval
 * @alpha
 */
export declare interface IScheduledMailDefinition extends IScheduledMailBase, Partial<IDashboardObjectIdentity> {
}

/**
 * Type-guard testing whether the provided object is an instance of {@link IColorDescriptor}.
 *
 * @public
 */
export declare function isColorDescriptor(obj: unknown): obj is IColorDescriptor;

/**
 * Type guard checking whether the provided object is a {@link IColorFromPalette}
 *
 * @public
 */
export declare function isColorFromPalette(obj: unknown): obj is IColorFromPalette;

/**
 * Type guard checking whether the provided object is an {@link IColorMappingItem}.
 *
 * @public
 */
export declare function isColorMappingItem(obj: unknown): obj is IColorMappingItem;

/**
 * Type guard checking whether the provided object is a {@link IColorPaletteItem}
 *
 * @public
 */
export declare function isColorPaletteItem(obj: unknown): obj is IColorPaletteItem;

/**
 * Type guard checking whether the provided object is a measure value filter's comparison condition.
 *
 * @public
 */
export declare function isComparisonCondition(obj: unknown): obj is IComparisonCondition;

/**
 * Type guard checking whether the provided operator is a measure value filter's comparison operator.
 *
 * @public
 */
export declare function isComparisonConditionOperator(obj: unknown): obj is ComparisonConditionOperator;

/**
 * Tests whether the provided object is an instance of {@link IDashboard}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isDashboard(obj: unknown): obj is IDashboard;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttachment}.
 *
 * @alpha
 */
export declare function isDashboardAttachment(obj: unknown): obj is IDashboardAttachment;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttributeFilter}.
 * @alpha
 */
export declare function isDashboardAttributeFilter(obj: unknown): obj is IDashboardAttributeFilter;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttributeFilterReference}.
 * @alpha
 */
export declare function isDashboardAttributeFilterReference(obj: unknown): obj is IDashboardAttributeFilterReference;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardDateFilter}.
 * @alpha
 */
export declare function isDashboardDateFilter(obj: unknown): obj is IDashboardDateFilter;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardDateFilterReference}.
 * @alpha
 */
export declare function isDashboardDateFilterReference(obj: unknown): obj is IDashboardDateFilterReference;

/**
 * Tests whether the provided object is an instance of {@link IDashboardDefinition}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isDashboardDefinition(obj: unknown): obj is IDashboardDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardLayout}.
 * @alpha
 */
export declare function isDashboardLayout<TWidget = IDashboardWidget>(obj: unknown): obj is IDashboardLayout<TWidget>;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardLayoutItem}.
 * @alpha
 */
export declare function isDashboardLayoutItem<TWidget>(obj: unknown): obj is IDashboardLayoutItem<TWidget>;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardLayoutSection}.
 * @alpha
 */
export declare function isDashboardLayoutSection<TWidget>(obj: unknown): obj is IDashboardLayoutSection<TWidget>;

/**
 * Tests whether the provided object is of type {@link IDashboardMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isDashboardMetadataObject(obj: unknown): obj is IDashboardMetadataObject;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardWidget}.
 * @alpha
 */
export declare const isDashboardWidget: (obj: unknown) => obj is IDashboardWidget;

/**
 * Tests whether the provided object is of type {@link IDataSetMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isDataSetMetadataObject(obj: unknown): obj is IDataSetMetadataObject;

/**
 * Type guard checking whether the provided object is a date filter.
 *
 * @public
 */
export declare function isDateFilter(obj: unknown): obj is IDateFilter;

/**
 * Type-guard testing whether the provided object is an instance of {@link DateFilterGranularity}.
 * @alpha
 */
export declare const isDateFilterGranularity: (obj: unknown) => obj is DateFilterGranularity;

/**
 * Type guard checking whether object is of IDimension type.
 *
 * @public
 */
export declare function isDimension(obj: unknown): obj is IDimension;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillFromAttribute}.
 * @alpha
 */
export declare function isDrillFromAttribute(obj: DrillOrigin): obj is IDrillFromAttribute;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillFromMeasure}.
 * @alpha
 */
export declare function isDrillFromMeasure(obj: DrillOrigin): obj is IDrillFromMeasure;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToAttributeUrl}.
 * @alpha
 */
export declare function isDrillToAttributeUrl(obj: unknown): obj is IDrillToAttributeUrl;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToCustomUrl}.
 * @alpha
 */
export declare function isDrillToCustomUrl(obj: unknown): obj is IDrillToCustomUrl;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToDashboard}.
 * @alpha
 */
export declare function isDrillToDashboard(obj: unknown): obj is IDrillToDashboard;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToInsight}.
 * @alpha
 */
export declare function isDrillToInsight(obj: unknown): obj is IDrillToInsight;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToLegacyDashboard}.
 * @alpha
 */
export declare function isDrillToLegacyDashboard(obj: unknown): obj is IDrillToLegacyDashboard;

/**
 * Settings for regional number formatting
 *
 * @public
 */
export declare interface ISeparators {
    /**
     * Thousand separator (e.g. " " or ",")
     */
    thousand: string;
    /**
     * Decimal separator (e.g. "," or ".")
     */
    decimal: string;
}

/**
 * Settings are obtained from backend and are effectively a collection of feature flags or settings with
 * concrete string or numeric value.
 *
 * @remarks
 * Settings are stored and configured on the server and typically allow
 * for a more fine-grained tuning of otherwise unified behavior.
 *
 * @public
 */
export declare interface ISettings {
    /**
     * Indicates whether the Headline's improvements is available.
     */
    enableNewHeadline?: boolean;
    /**
     * Headline component will not be underlined when it is set up with drilling.
     */
    disableKpiDashboardHeadlineUnderline?: boolean;
    /**
     * Disables Kpi widget drills in embedded mode.
     */
    hideKpiDrillInEmbedded?: boolean;
    /**
     * Allows configuration of axis name position and visibility for Pluggable Visualizations.
     */
    enableAxisNameConfiguration?: boolean;
    /**
     * Indicates whether PivotTable columns should be auto-resized to fit viewport before
     * the table is shown to the user.
     */
    enableTableColumnsAutoResizing?: boolean;
    /**
     * Indicates whether PivotTable should grow to fill all available, allocated space.
     */
    enableTableColumnsGrowToFit?: boolean;
    /**
     * Indicates whether PivotTable manual resizing should be persisted or not.
     */
    enableTableColumnsManualResizing?: boolean;
    /**
     * Indicates whether the Bullet Chart is available in AD.
     */
    enableBulletChart?: boolean;
    /**
     * Indicates whether the GeoPushpin Chart is available in AD.
     */
    enablePushpinGeoChart?: boolean;
    /**
     * Indicates whether the Waterfall Chart is available in AD.
     */
    enableWaterfallChart?: boolean;
    /**
     * Indicates whether week filtering is available in AD.
     */
    enableWeekFilters?: boolean;
    /**
     * Indicates whether color picker config panel should allow users to select custom RGB colors.
     */
    enableCustomColorPicker?: boolean;
    /**
     * Indicates whether "Treat null as zero" option should be displayed in measure value filter configuration and its default state"
     */
    ADMeasureValueFilterNullAsZeroOption?: string;
    /**
     * Indicates whether the catalog groups in analytical designer are expanded by default.
     */
    ADCatalogGroupsExpanded?: boolean;
    /**
     * Indicates whether data point visibility configuration is available in AD
     */
    enableHidingOfDataPoints?: boolean;
    /**
     * Indicates the format in which the dates will be displayed
     */
    responsiveUiDateFormat?: string;
    /**
     * Indicates whether multiple dates can be put into buckets
     */
    enableMultipleDates?: boolean;
    /**
     * Indicates whether alternative display form can be selected for attribute and multiple instances
     * of the same attributes can be put into buckets
     */
    enableAlternativeDisplayFormSelection?: boolean;
    /**
     * Indicates whether unavailable data items are visible
     */
    enableUnavailableItemsVisible?: boolean;
    /**
     * Indicates whether dashboard scheduled mails are enabled.
     */
    enableKPIDashboardSchedule?: boolean;
    /**
     * Indicates whether the user can select recipients of scheduled e-mails.
     * If not, scheduled mail can only be sent to a logged in user.
     */
    enableKPIDashboardScheduleRecipients?: boolean;
    /**
     * Indicates whether the new UI for scheduled widget exports is enabled.
     */
    enableInsightExportScheduling?: boolean;
    /**
     * Indicates whether the user can zoom on the insights in KPI dashboards that have this feature enabled.
     */
    enableKDZooming?: boolean;
    /**
     * Indicates whether the user can change widget height in KPI dashboards.
     */
    enableKDWidgetCustomHeight?: boolean;
    /**
     * Indicates whether the user can save and existing dashboard in KPI dashboards as new.
     */
    enableKPIDashboardSaveAsNew?: boolean;
    /**
     * Indicates whether the Embed dashboard button is available in KPI dashboards.
     */
    enableEmbedButtonInKD?: boolean;
    /**
     * Indicates whether the Embed button/dialog is available in AD.
     */
    enableEmbedButtonInAD?: boolean;
    /**
     * Indicates whether the approximate variant of count is available in AD.
     */
    enableApproxCount?: boolean;
    /**
     * Indicates whether the drill to dashboard is enabled.
     */
    enableKPIDashboardDrillToDashboard?: boolean;
    /**
     * Indicates whether the drill to insight is enabled.
     */
    enableKPIDashboardDrillToInsight?: boolean;
    /**
     * Indicates whether the drill to url is enabled.
     */
    enableKPIDashboardDrillToURL?: boolean;
    /**
     * Indicates whether the drilled insight can be exported.
     */
    enableDrilledInsightExport?: boolean;
    /**
     * Indicates whether backend supports data sampling.
     */
    enableDataSampling?: boolean;
    /**
     * Indicates current platform edition.
     */
    platformEdition?: PlatformEdition;
    /**
     * Indicates whether the company logo should be visible in the embedded dashboard.
     */
    enableCompanyLogoInEmbeddedUI?: boolean;
    /**
     * Setting to use Report instead of Insight in AD&KD
     */
    enableInsightToReport?: boolean;
    /**
     * Enable implicit drillToAttributeURL
     */
    enableClickableAttributeURL?: boolean;
    /**
     * Enable implicit drill down
     */
    enableKPIDashboardImplicitDrillDown?: boolean;
    /**
     * Enable drill from attributes
     */
    enableKPIDashboardDrillFromAttribute?: boolean;
    /**
     * Enable usage of Dashboard permissions
     */
    enableAnalyticalDashboardPermissions?: boolean;
    /**
     * Enable renaming measure to metric
     */
    enableRenamingMeasureToMetric?: boolean;
    /**
     * Enable axis label formatting
     */
    enableAxisLabelFormat?: boolean;
    /**
     * Enable charts sorting customization
     */
    enableChartsSorting?: boolean;
    /**
     * Enable hiding of widget title
     */
    enableHidingOfWidgetTitle?: boolean;
    /**
     * Enable axis name for the column, bar and bullet charts with view by two attributes.
     */
    enableAxisNameViewByTwoAttributes?: boolean;
    /**
     * Enable reverse the order of stacked items in bar chart.
     */
    enableReversedStacking?: boolean;
    /**
     * Enable visibility control for total labels
     */
    enableSeparateTotalLabels?: boolean;
    /**
     * Represents whiteLabeling configuration
     */
    whiteLabeling?: IWhiteLabeling;
    /**
     * Enable custom non-production dataset in AD/Modeler
     */
    ["msf.enableTenantCustomModel"]?: boolean;
    /**
     * Enable usage of insights, widgets, kpis descriptions.
     */
    enableDescriptions?: boolean;
    /**
     * Enable editing of insight description in AD.
     */
    enableAdDescriptionEdit?: boolean;
    /**
     * Locale code to use for date formatting.
     */
    formatLocale?: string;
    /**
     * Enable use of composite grain
     */
    enableCompositeGrain?: boolean;
    /**
     * Week start day
     */
    weekStart?: WeekStart;
    /**
     * Enable table transposition (metrics in rows)
     */
    enablePivotTableTransposition?: boolean;
    /**
     * Enable moving column attribute headers to the left.
     */
    enableColumnHeadersPosition?: boolean;
    /**
     * IANA identifier of time zone in which the platform metadata are stored.
     */
    metadataTimeZone?: string;
    /**
     * Enable attribute hierarchies.
     */
    enableAttributeHierarchies?: boolean;
    [key: string]: number | boolean | string | object | undefined;
}

/**
 * Tests whether the provided object is of type {@link IFactMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isFactMetadataObject(obj: unknown): obj is IFactMetadataObject;

/**
 * Type guard checking whether the provided object is a filter.
 *
 * @public
 */
export declare function isFilter(obj: unknown): obj is IFilter;

/**
 * Type-guard testing whether the provided object is an instance of {@link IFilterContext}.
 * @alpha
 */
export declare function isFilterContext(obj: unknown): obj is IFilterContext;

/**
 * Type-guard testing whether the provided object is an instance of {@link IFilterContextDefinition}.
 * @alpha
 */
export declare function isFilterContextDefinition(obj: unknown): obj is IFilterContextDefinition;

/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess} or {@link IGranularUserGroupAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularAccess: (obj: unknown) => obj is IGranularUserAccess | IGranularUserGroupAccess;

/**
 * Tests whether the provided object is an instance of {@link IGranularAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularAccessGrantee: (obj: unknown) => obj is IGranularAccessGrantee;

/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserAccess: (obj: unknown) => obj is IGranularUserAccess;

/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserAccessGrantee: (obj: unknown) => obj is IGranularUserAccessGrantee;

/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserGroupAccess: (obj: unknown) => obj is IGranularUserGroupAccess;

/**
 * Tests whether the provided object is an instance of {@link IGranularUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserGroupAccessGrantee: (obj: unknown) => obj is IGranularUserGroupAccessGrantee;

/**
 * Type guard checking whether object is an Identifier Reference.
 *
 * @public
 */
export declare function isIdentifierRef(obj: unknown): obj is IdentifierRef;

/**
 * Type guard for checking whether object is a inline measure.
 *
 * @public
 */
export declare function isInlineMeasure(obj: unknown): obj is IMeasure<IInlineMeasureDefinition>;

/**
 * Type guard for checking whether object is a inline measure definition.
 *
 * @public
 */
export declare function isInlineMeasureDefinition(obj: unknown): obj is IInlineMeasureDefinition;

/**
 * Type guard checking whether the provided object is an Insight.
 *
 * @public
 */
export declare function isInsight(obj: unknown): obj is IInsight;

/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidget}.
 * @alpha
 */
export declare function isInsightWidget(obj: unknown): obj is IInsightWidget;

/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidgetDefinition}.
 * @alpha
 */
export declare function isInsightWidgetDefinition(obj: unknown): obj is IInsightWidgetDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpi}.
 * @alpha
 */
export declare function isKpi(obj: unknown): obj is IKpi;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @alpha
 */
export declare function isKpiWidget(obj: unknown): obj is IKpiWidget;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @alpha
 */
export declare function isKpiWidgetDefinition(obj: unknown): obj is IKpiWidgetDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWithComparison}.
 * @alpha
 */
export declare function isKpiWithComparison(obj: unknown): obj is IKpiWithComparison;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWithoutComparison}.
 * @alpha
 */
export declare function isKpiWithoutComparison(obj: unknown): obj is IKpiWithoutComparison;

/**
 * Type guard checking whether object is a localId Reference.
 *
 * @public
 */
export declare function isLocalIdRef(obj: unknown): obj is LocalIdRef;

/**
 * Type guard for checking whether object is any type of measure.
 *
 * @public
 */
export declare function isMeasure(obj: unknown): obj is IMeasure;

/**
 * Type guard for checking whether object is a measure definition.
 *
 * @public
 */
export declare function isMeasureDefinition(obj: unknown): obj is IMeasureDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IMeasureDescriptor}.
 *
 * @public
 */
export declare function isMeasureDescriptor(obj: unknown): obj is IMeasureDescriptor;

/**
 * Gets a flag indicating whether a given measure has a format resulting in data being formatted as percentage
 * @param measureOrFormat - measure or measure format to test
 * @returns true if the measure format is in percent, false otherwise
 * @public
 * @remarks Measure format is considered to represent value in percent when
 * A) format string has no conditional separators (i.e. no semicolons except a single one at the end);
 *    otherwise the parsing would need access to a particular value.
 * B) percentage symbol is found (not directly preceded by backslash)
 */
export declare function isMeasureFormatInPercent(measureOrFormat: IMeasure | string): boolean;

/**
 * Type-guard testing whether the provided object is an instance of {@link IMeasureGroupDescriptor}.
 *
 * @public
 */
export declare function isMeasureGroupDescriptor(obj: unknown): obj is IMeasureGroupDescriptor;

/**
 * Determine if a given item is a measure group.
 *
 * @public
 */
export declare const isMeasureGroupIdentifier: (itemOrTotal: DimensionItem) => boolean;

/**
 * Type guard checking whether an object is measure locator
 *
 * @public
 */
export declare function isMeasureLocator(obj: unknown): obj is IMeasureLocatorItem;

/**
 * Tests whether the provided object is of type {@link IMeasureMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isMeasureMetadataObject(obj: unknown): obj is IMeasureMetadataObject;

/**
 * Tests whether the provided object is of type {@link IMeasureMetadataObjectDefinition}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isMeasureMetadataObjectDefinition(obj: unknown): obj is IMeasureMetadataObjectDefinition;

/**
 * Type guard checking whether an object is a measure sort item.
 *
 * @public
 */
export declare function isMeasureSort(obj: unknown): obj is IMeasureSortItem;

/**
 * Type guard checking whether the provided object is a measure value filter.
 *
 * @public
 */
export declare function isMeasureValueFilter(obj: unknown): obj is IMeasureValueFilter;

/**
 * Type guard checking whether input is an instance of {@link IMetadataObject}.
 *
 * @public
 */
export declare function isMetadataObject(obj: unknown): obj is IMetadataObject;

/**
 * Type guard checking whether the provided object is a negative attribute filter.
 *
 * @public
 */
export declare function isNegativeAttributeFilter(obj: unknown): obj is INegativeAttributeFilter;

/**
 * Returns true when given filter has negative selection
 * @alpha
 */
export declare function isNegativeDashboardAttributeFilter(filter: IDashboardAttributeFilter): boolean;

/**
 * Type guard checking whether object is an Identifier Reference or an URI reference.
 *
 * @public
 */
export declare function isObjRef(obj: unknown): obj is ObjRef;

/**
 * Sorting direction part of sort.
 *
 * @public
 */
export declare interface ISortDirection {
    /**
     * Sort ascending or descending.
     */
    direction: SortDirection;
}

/**
 * Sort items can be used to specify how the result of an execution should be sorted.
 *
 * @remarks
 * Sorting can be done by attribute value and/or by value of a measure.
 *
 * @public
 */
export declare type ISortItem = IAttributeSortItem | IMeasureSortItem;

/**
 * Type guard for checking whether object is a period-over-period measure.
 *
 * @public
 */
export declare function isPoPMeasure(obj: unknown): obj is IMeasure<IPoPMeasureDefinition>;

/**
 * Type guard for checking whether object is a period-over-period measure definition.
 *
 * @public
 */
export declare function isPoPMeasureDefinition(obj: unknown): obj is IPoPMeasureDefinition;

/**
 * Type guard checking whether the provided object is a positive attribute filter.
 *
 * @public
 */
export declare function isPositiveAttributeFilter(obj: unknown): obj is IPositiveAttributeFilter;

/**
 * Type guard for checking whether object is a previous-period measure.
 *
 * @public
 */
export declare function isPreviousPeriodMeasure(obj: unknown): obj is IMeasure<IPreviousPeriodMeasureDefinition>;

/**
 * Type guard for checking whether object is a previous period measure definition.
 *
 * @public
 */
export declare function isPreviousPeriodMeasureDefinition(obj: unknown): obj is IPreviousPeriodMeasureDefinition;

/**
 * Type guard checking whether the provided object is a measure value filter's range condition.
 *
 * @public
 */
export declare function isRangeCondition(obj: unknown): obj is IRangeCondition;

/**
 * Type guard checking whether the provided object is a measure value filter's range condition operator.
 *
 * @public
 */
export declare function isRangeConditionOperator(obj: unknown): obj is RangeConditionOperator;

/**
 * Type guard checking whether the provided object is a ranking filter.
 *
 * @public
 */
export declare function isRankingFilter(obj: unknown): obj is IRankingFilter;

/**
 * Returns true when given date filter has type set to relative.
 * @alpha
 */
export declare function isRelativeDashboardDateFilter(dateFilter: IDashboardDateFilter): boolean;

/**
 * Type guard checking whether the provided object is a relative date filter.
 *
 * @public
 */
export declare function isRelativeDateFilter(obj: unknown): obj is IRelativeDateFilter;

/**
 * Type-guard testing whether the provided object is an instance of {@link IRelativeDateFilterForm}.
 * @alpha
 */
export declare const isRelativeDateFilterForm: (obj: unknown) => obj is IRelativeDateFilterForm;

/**
 * Type-guard testing whether the provided object is an instance of {@link IRelativeDateFilterPreset}.
 * @alpha
 */
export declare const isRelativeDateFilterPreset: (obj: unknown) => obj is IRelativeDateFilterPreset;

/**
 * Type-guard testing whether the provided object is an instance of {@link IResultAttributeHeader}.
 *
 * @public
 */
export declare function isResultAttributeHeader(obj: unknown): obj is IResultAttributeHeader;

/**
 * Type-guard testing whether the provided object is an instance of {@link IResultMeasureHeader}.
 *
 * @public
 */
export declare function isResultMeasureHeader(obj: unknown): obj is IResultMeasureHeader;

/**
 * Type-guard testing whether the provided object is an instance of {@link IResultTotalHeader}.
 *
 * @public
 */
export declare function isResultTotalHeader(obj: unknown): obj is IResultTotalHeader;

/**
 * Type guard checking whether the provided object is a {@link IRgbColor}
 *
 * @public
 */
export declare function isRgbColor(obj: unknown): obj is IRgbColor;

/**
 * Type guard for checking whether object is a simple measure.
 *
 * @public
 */
export declare function isSimpleMeasure(obj: unknown): obj is IMeasure<IMeasureDefinition>;

/**
 * Returns true when given filter has selection mode set to single
 * @alpha
 */
export declare function isSingleSelectionFilter(filter: IDashboardAttributeFilter): boolean;

/**
 * Type-guard testing whether the provided object is an instance of {@link ITempFilterContext}.
 * @alpha
 */
export declare function isTempFilterContext(obj: unknown): obj is ITempFilterContext;

/**
 * Type-guard checking whether an object is a Total.
 *
 * @public
 */
export declare function isTotal(obj: unknown): obj is ITotal;

/**
 * Type-guard testing whether the provided object is an instance of {@link ITotalDescriptor}.
 *
 * @public
 */
export declare function isTotalDescriptor(obj: unknown): obj is ITotalDescriptor;

/**
 * Type guard checking whether an object is a total locator.
 *
 * @public
 */
export declare function isTotalLocator(obj: unknown): obj is ITotalLocatorItem;

/**
 * Type guard checking whether object is an URI Reference.
 *
 * @public
 */
export declare function isUriRef(obj: unknown): obj is UriRef;

/**
 * Tests whether the provided object is an instance of {@link IUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isUserAccess: (obj: unknown) => obj is IUserAccess;

/**
 * Tests whether the provided object is an instance of {@link IUserAccessGrantee}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isUserAccessGrantee: (obj: unknown) => obj is IUserAccessGrantee;

/**
 * Tests whether the provided object is an instance of {@link IUserGroupAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isUserGroupAccess: (obj: unknown) => obj is IUserGroupAccess;

/**
 * Tests whether the provided object is an instance of {@link IUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isUserGroupAccessGrantee: (obj: unknown) => obj is IUserGroupAccessGrantee;

/**
 * Tests whether the provided object is of type {@link IVariableMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isVariableMetadataObject(obj: unknown): obj is IVariableMetadataObject;

/**
 * Type guard for checking whether an object is a virtual arithmetic measure.
 *
 * @internal
 *
 * @param obj - The object to be checked for being a virtual arithmetic measure.
 * @returns Returns true if the object is a virtual arithmetic measure, false otherwise.
 */
export declare function isVirtualArithmeticMeasure(obj: unknown): obj is IMeasure<IVirtualArithmeticMeasureDefinition>;

/**
 * Type guard for checking whether object is a virtual arithmetic measure definition.
 *
 * @internal
 */
export declare function isVirtualArithmeticMeasureDefinition(obj: unknown): obj is IVirtualArithmeticMeasureDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidget}.
 * @alpha
 */
export declare function isWidget(obj: unknown): obj is IWidget;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAlert}.
 * @alpha
 */
export declare function isWidgetAlert(obj: unknown): obj is IWidgetAlert;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAlertDefinition}.
 * @alpha
 */
export declare function isWidgetAlertDefinition(obj: unknown): obj is IWidgetAlertDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAttachment}.
 *
 * @alpha
 */
export declare function isWidgetAttachment(obj: unknown): obj is IWidgetAttachment;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetDefinition}.
 * @alpha
 */
export declare function isWidgetDefinition(obj: unknown): obj is IWidgetDefinition;

/**
 * Result of search of item among list of dimensions.
 *
 * @public
 */
export declare type ItemInDimension = {
    /**
     * Content of dimension where the item was found.
     */
    dim: IDimension;
    /**
     * Index of dimension where the item was found.
     */
    dimIdx: number;
    /**
     * Index of the item within the dimension where it was found.
     */
    itemIdx: number;
};

/**
 * Temporary filter context serves to override original dashboard filter context during the dashboard export
 *
 * @alpha
 */
export declare interface ITempFilterContext {
    /**
     * Filter context created time
     * YYYY-MM-DD HH:mm:ss
     */
    readonly created: string;
    /**
     * Attribute or date filters
     */
    readonly filters: FilterContextItem[];
    /**
     * Temp filter context ref
     */
    readonly ref: ObjRef;
    /**
     * Temp filter context uri
     */
    readonly uri: string;
}

/**
 * Theme used to customize selected parts of the UI
 *
 * @remarks
 * Only the primary color main value is mandatory
 *
 * Optional properties are replaced with the default values
 *
 * @beta
 */
export declare interface ITheme {
    /**
     * Typography
     *
     * Definition of both normal and bold font URIs
     */
    typography?: IThemeTypography;
    /**
     * Customizable palette of major colors
     *
     * Inspired by Material UI palette: https://material-ui.com/customization/palette/
     */
    palette?: IThemePalette;
    /**
     * Button customizable UI properties
     */
    button?: IThemeButton;
    /**
     * Tooltip customizable UI properties
     */
    tooltip?: IThemeTooltip;
    /**
     * Modal customizable UI properties
     */
    modal?: IThemeModal;
    /**
     * Global Kpi/Headline customizable UI properties
     */
    kpi?: IThemeKpi;
    /**
     * Chart customizable UI properties
     */
    chart?: IThemeChart;
    /**
     * Table customizable UI properties
     */
    table?: IThemeTable;
    /**
     * KPI dashboards specific properties
     */
    dashboards?: IThemeDashboard;
    /**
     * Analytical designer specific properties
     */
    analyticalDesigner?: IThemeAnalyticalDesigner;
}

/**
 * Analytical designer specific properties.
 *
 * @beta
 */
export declare interface IThemeAnalyticalDesigner {
    /**
     * Title specific properties
     */
    title?: IThemeAnalyticalDesignerTitle;
}

/**
 * Analytical designer title specific properties.
 *
 * @beta
 */
export declare interface IThemeAnalyticalDesignerTitle {
    /**
     * Foreground color of the title
     */
    color?: ThemeColor;
}

/**
 * Button customizable UI properties
 *
 * @beta
 */
export declare interface IThemeButton {
    /**
     * Radius of the button border in px
     */
    borderRadius?: string;
    /**
     * Flag determining whether the button has a shadow or not
     */
    dropShadow?: boolean;
    /**
     * Flag determining whether the button has its text capitalized or not
     */
    textCapitalization?: boolean;
}

/**
 * Charts customization
 *
 * @beta
 */
export declare interface IThemeChart {
    /**
     * Background color
     */
    backgroundColor?: ThemeColor;
    /**
     * Grid line color
     */
    gridColor?: ThemeColor;
    /**
     * Axis line color
     */
    axisColor?: ThemeColor;
    /**
     * Axis label color, title name of axis
     */
    axisLabelColor?: ThemeColor;
    /**
     * Axis value color, numbers or names under axis
     */
    axisValueColor?: ThemeColor;
    /**
     * Legend value color
     */
    legendValueColor?: ThemeColor;
    /**
     * Tooltip background color
     */
    tooltipBackgroundColor?: ThemeColor;
    /**
     * Tooltip border color
     */
    tooltipBorderColor?: ThemeColor;
    /**
     * Tooltip label color
     */
    tooltipLabelColor?: ThemeColor;
    /**
     * Tooltip value color
     */
    tooltipValueColor?: ThemeColor;
}

/**
 * Variants of the palette color
 *
 * @beta
 */
export declare interface IThemeColorFamily {
    /**
     * Base color
     */
    base: ThemeColor;
    /**
     * Light variant of base color
     */
    light?: ThemeColor;
    /**
     * Dark variant of base color
     */
    dark?: ThemeColor;
    /**
     * Color contrast to main color
     *
     * Is used as foreground color of the button with base background color for instance
     */
    contrast?: ThemeColor;
}

/**
 * Used to color various elements across many components by replacing
 * the default complementary palette of gray color shades
 *
 * @remarks
 * Contains up to 10 shades, typically the first one being the lightest
 * and the last being the darkest, or vice-versa for the dark-based designs
 *
 * The first and last shades are mandatory, the rest is automatically
 * calculated if not provided
 *
 * @beta
 */
export declare interface IThemeComplementaryPalette {
    c0: ThemeColor;
    c1?: ThemeColor;
    c2?: ThemeColor;
    c3?: ThemeColor;
    c4?: ThemeColor;
    c5?: ThemeColor;
    c6?: ThemeColor;
    c7?: ThemeColor;
    c8?: ThemeColor;
    c9: ThemeColor;
}

/**
 * KPI dashboards specific properties
 *
 * @beta
 */
export declare interface IThemeDashboard {
    /**
     * Title specific properties
     */
    title?: IThemeDashboardTitle;
    /**
     * Section specific properties
     */
    section?: IThemeDashboardSection;
    /**
     * Filter bar specific properties
     */
    filterBar?: IThemeDashboardFilterBar;
    /**
     * Dashboard content specific properties
     */
    content?: IThemeDashboardContent;
    /**
     * Navigation specific properties (left panel)
     */
    navigation?: IThemeDashboardNavigation;
    /**
     * Edit panel specific properties
     */
    editPanel?: IThemeDashboardEditPanel;
}

/**
 * Dashboard content customizable properties.
 *
 * @beta
 */
export declare interface IThemeDashboardContent {
    /**
     * Background color of the dashboard content
     */
    backgroundColor?: ThemeColor;
    /**
     * Widget specific properties
     */
    widget?: IThemeDashboardContentWidget;
    /**
     * Kpi widget specific properties
     */
    kpiWidget?: IThemeDashboardContentKpi;
}

/**
 * Dashboard content KPI customizable properties.
 *
 * @beta
 */
export declare interface IThemeDashboardContentKpi {
    /**
     * Kpi widget title color and alignment
     */
    title?: IThemeWidgetTitle;
    /**
     * Kpi widget background color
     */
    backgroundColor?: ThemeColor;
    /**
     * Kpi widget border color
     */
    borderColor?: ThemeColor;
    /**
     * Kpi widget border width
     */
    borderWidth?: string;
    /**
     * Kpi widget border radius in px
     */
    borderRadius?: string;
    /**
     * Flag determining whether the kpi widget has a shadow or not
     */
    dropShadow?: boolean;
    /**
     * Dashboards specific Kpi/Headline customizable UI properties
     */
    kpi?: IThemeKpi;
}

/**
 * Dashboard content widget customizable properties.
 *
 * @beta
 */
export declare interface IThemeDashboardContentWidget {
    /**
     * Widget title color and alignment
     */
    title?: IThemeWidgetTitle;
    /**
     * Widget background color
     */
    backgroundColor?: ThemeColor;
    /**
     * Widget border color
     */
    borderColor?: ThemeColor;
    /**
     * Widget border width
     */
    borderWidth?: string;
    /**
     * Widget border radius in px
     */
    borderRadius?: string;
    /**
     * Flag determining whether the widget has a shadow or not
     */
    dropShadow?: boolean;
}

/**
 * Edit panel specific properties.
 *
 * @beta
 */
export declare interface IThemeDashboardEditPanel {
    /**
     * Edit panel background color
     */
    backgroundColor?: ThemeColor;
}

/**
 * Dashboard filterBar customizable properties.
 *
 * @beta
 */
export declare interface IThemeDashboardFilterBar {
    /**
     * Background color of the filter bar
     */
    backgroundColor?: ThemeColor;
    /**
     * Border color of the filter bar
     */
    borderColor?: ThemeColor;
    /**
     * Filter bar button specific properties
     */
    filterButton?: IThemeDashboardFilterBarButton;
}

/**
 * Filter bar button specific properties
 *
 * @beta
 */
export declare interface IThemeDashboardFilterBarButton {
    /**
     * Background color of the filter bar button
     */
    backgroundColor?: ThemeColor;
}

/**
 * Navigation customizable properties.
 *
 * @beta
 */
export declare interface IThemeDashboardNavigation {
    /**
     * Navigation background color
     */
    backgroundColor?: ThemeColor;
    /**
     * Navigation border color
     */
    borderColor?: ThemeColor;
    /**
     * Navigation header specific properties
     */
    title?: IThemeDashboardNavigationTitle;
    /**
     * Navigation items (dashboards) specific properties
     */
    item?: IThemeDashboardNavigationItem;
}

/**
 * Navigation items (dashboards) specific properties.
 *
 * @beta
 */
export declare interface IThemeDashboardNavigationItem {
    /**
     * Item foreground color
     */
    color?: ThemeColor;
    /**
     * Item foreground color on hover
     */
    hoverColor?: ThemeColor;
    /**
     * Selected item foreground color
     */
    selectedColor?: ThemeColor;
    /**
     * Selected item background color
     */
    selectedBackgroundColor?: ThemeColor;
}

/**
 * Dashboard navigation title specific properties.
 *
 * @beta
 */
export declare interface IThemeDashboardNavigationTitle {
    /**
     * Header foreground color
     */
    color?: ThemeColor;
}

/**
 * Dashboard section customizable properties.
 *
 * @beta
 */
export declare interface IThemeDashboardSection {
    /**
     * Section title properties
     */
    title?: IThemeDashboardSectionTitle;
    /**
     * Section description properties
     */
    description?: IThemeDashboardSectionDescription;
}

/**
 * Dashboard section description properties.
 *
 * @beta
 */
export declare interface IThemeDashboardSectionDescription {
    /**
     * Foreground color of the section
     */
    color?: ThemeColor;
}

/**
 * Dashboard section title properties.
 *
 * @beta
 */
export declare interface IThemeDashboardSectionTitle {
    /**
     * Foreground color of the section
     */
    color?: ThemeColor;
    /**
     * Color of the line separator between the sections
     */
    lineColor?: ThemeColor;
}

/**
 * Dashboard title specific properties.
 *
 * @beta
 */
export declare interface IThemeDashboardTitle {
    /**
     * Foreground color of the title
     */
    color?: ThemeColor;
    /**
     * Background color of the title
     */
    backgroundColor?: ThemeColor;
    /**
     * Border color of the title
     */
    borderColor?: ThemeColor;
}

/**
 * Theme definition represents modified or created theme
 *
 * @alpha
 */
export declare interface IThemeDefinition extends Partial<IMetadataObject> {
    readonly type: "theme";
    readonly theme: ITheme;
}

/**
 * Kpi values customization
 *
 * @beta
 */
export declare interface IThemeKpi {
    /**
     * Kpi value specific properties
     */
    value?: IThemeKpiValue;
    /**
     * Color of the primary measure value (main)
     */
    primaryMeasureColor?: ThemeColor;
    /**
     * Color of the secondary measure value (informative)
     */
    secondaryInfoColor?: ThemeColor;
}

/**
 * Kpi value specific properties.
 *
 * @beta
 */
export declare interface IThemeKpiValue {
    /**
     * Value align
     */
    textAlign?: string;
    /**
     * Color of the value considered to be positive
     */
    positiveColor?: ThemeColor;
    /**
     * Color of the value considered to be negative
     */
    negativeColor?: ThemeColor;
}

/**
 * Theme metadata object
 *
 * @alpha
 */
export declare interface IThemeMetadataObject extends IMetadataObject {
    readonly type: "theme";
    readonly theme: ITheme;
}

/**
 * Modal customizable properties.
 *
 * @beta
 */
export declare interface IThemeModal {
    /**
     * Title of the modal
     */
    title?: IThemeModalTitle;
    /**
     * Background color of the modal surroundings
     */
    outsideBackgroundColor?: ThemeColor;
    /**
     * Flag determining whether the button has a shadow or not
     */
    dropShadow?: boolean;
    /**
     * Width of the border
     */
    borderWidth?: string;
    /**
     * Color of the border
     */
    borderColor?: ThemeColor;
    /**
     * Radius of the border in px
     */
    borderRadius?: string;
}

/**
 * Properties of the title of the modal.
 *
 * @beta
 */
export declare interface IThemeModalTitle {
    /**
     * Foreground color of the tooltip
     */
    color?: ThemeColor;
    /**
     * Color of the line separator between the title and the content
     */
    lineColor?: ThemeColor;
}

/**
 * Customizable palette of major colors
 *
 * Inspired by Material UI palette: https://material-ui.com/customization/palette/
 *
 * @beta
 */
export declare interface IThemePalette {
    /**
     * Used as an accent color for most of the UI elements
     */
    primary?: IThemeColorFamily;
    /**
     * Used to express error
     */
    error?: IThemeColorFamily;
    /**
     * Used to express warning
     */
    warning?: IThemeColorFamily;
    /**
     * Used to express success
     */
    success?: IThemeColorFamily;
    /**
     * Used to express info or progress
     */
    info?: IThemeColorFamily;
    /**
     * Used to color various elements across many components
     *
     * See {@link IThemeComplementaryPalette} for more details.
     */
    complementary?: IThemeComplementaryPalette;
}

/**
 * Table customization
 *
 * @beta
 */
export declare interface IThemeTable {
    /**
     * Background color
     */
    backgroundColor?: ThemeColor;
    /**
     * Grid line color
     */
    gridColor?: ThemeColor;
    /**
     * Value color
     */
    valueColor?: ThemeColor;
    /**
     * Color of null value (dash)
     */
    nullValueColor?: ThemeColor;
    /**
     * Color of loading icon
     */
    loadingIconColor?: ThemeColor;
    /**
     * Background color of hovered row
     */
    hoverBackgroundColor?: ThemeColor;
    /**
     * Color of header labels
     */
    headerLabelColor?: ThemeColor;
    /**
     * Background color of hovered header row
     */
    headerHoverBackgroundColor?: ThemeColor;
    /**
     * Background color of total values
     */
    totalBackgroundColor?: ThemeColor;
    /**
     * Background color of subtotal values
     */
    subtotalBackgroundColor?: ThemeColor;
    /**
     * Color of total value
     */
    totalValueColor?: ThemeColor;
}

/**
 * Tooltip customizable UI properties
 *
 * @beta
 */
export declare interface IThemeTooltip {
    /**
     * Background color of the tooltip
     */
    backgroundColor?: ThemeColor;
    /**
     * Foreground color of the tooltip
     */
    color?: ThemeColor;
}

/**
 * Definition of both normal and bold font URIs
 *
 * @beta
 */
export declare interface IThemeTypography {
    /**
     * Normal font URI
     */
    font?: ThemeFontUri;
    /**
     * Bold font URI
     */
    fontBold?: ThemeFontUri;
}

/**
 * Title of the widget
 *
 * @beta
 */
export declare interface IThemeWidgetTitle {
    /**
     * Title text color
     */
    color?: ThemeColor;
    /**
     * Align of the text
     */
    textAlign?: string;
}

/**
 * Describes type and granularity for calculation of Totals.
 *
 * @remarks
 * Total is calculated for particular measure and on some granularity - specified by an attribute
 * by which the measure is sliced by.
 *
 * @public
 */
export declare interface ITotal {
    /**
     * Type of total calculation.
     */
    type: TotalType;
    /**
     * Local identifier of measure for which to calculate total.
     */
    measureIdentifier: Identifier;
    /**
     * Local identifier of attribute - specifies granularity of the calculation.
     */
    attributeIdentifier: Identifier;
    /**
     * Specifies custom name for the calculated total. This will be included in result metadata.
     */
    alias?: string;
}

/**
 * Describes total included in a dimension.
 *
 * @public
 */
export declare interface ITotalDescriptor {
    totalHeaderItem: ITotalDescriptorItem;
}

/**
 * Describes total included in a dimension.
 *
 * @public
 */
export declare interface ITotalDescriptorItem {
    name: string;
}

/**
 * Locator that specifies a concrete total element for which the measure values are sliced.
 *
 * @public
 */
export declare interface ITotalLocatorItem {
    totalLocatorItem: ITotalLocatorItemBody;
}

/**
 * Locator that specifies a concrete attribute element for which the total is applicable
 *
 * @public
 */
export declare interface ITotalLocatorItemBody {
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
 * Represents platform user.
 *
 * @public
 */
export declare interface IUser {
    /**
     * Stored user reference.
     */
    ref: ObjRef;
    /**
     * Login - unique user ID for logging into the platform.
     */
    login: string;
    /**
     * Contact email of the user.
     */
    email?: string;
    /**
     * Full name.
     *
     * Note: This property has higher priority than firstName / lastName.
     * Backend implementation MUST fill this property if user names are supported.
     */
    fullName?: string;
    /**
     * First name - when backend implementations supports it.
     */
    firstName?: string;
    /**
     * Last name - when backend implementations supports it.
     */
    lastName?: string;
    /**
     * Organization name - when backend implementations supports it.
     */
    organizationName?: string;
}

/**
 * User having access to the object.
 *
 * @alpha
 */
export declare interface IUserAccess {
    /**
     * Access type
     */
    type: "user";
    /**
     * Access user
     */
    user: IWorkspaceUser;
}

/**
 * User access grantee specification.
 *
 * @public
 */
export declare interface IUserAccessGrantee {
    /**
     * Grantee type
     */
    type: "user";
    /**
     * Grantee object reference
     */
    granteeRef: ObjRef;
}

/**
 * User group having access to the object.
 *
 * @alpha
 */
export declare interface IUserGroupAccess {
    /**
     * Access type
     */
    type: "group";
    /**
     * Access user group
     */
    userGroup: IWorkspaceUserGroup;
}

/**
 * User group access grantee specification.
 *
 * @public
 */
export declare interface IUserGroupAccessGrantee {
    /**
     * Grantee type
     */
    type: "group";
    /**
     * Grantee object reference
     */
    granteeRef: ObjRef;
}

/**
 * Variable metadata object
 *
 * @public
 */
export declare interface IVariableMetadataObject extends IMetadataObject {
    type: "variable";
}

/**
 * Virtual arithmetic measures are the same arithmetic measure and include flag virtual
 *
 * @remarks
 * In fact, the 'virtual' property should ideally be introduced within the 'IArithmeticMeasureDefinition' interface.
 * However, since 'IArithmeticMeasureDefinition' is a public interface and the 'virtual' property is intended for internal use,
 * we are hesitant to expose this property publicly.
 * Publicizing this property could raise concerns among users about whether the arithmetic measure is virtual or not.
 *
 * @internal
 */
export declare interface IVirtualArithmeticMeasureDefinition extends IArithmeticMeasureDefinition {
    virtual?: boolean;
}

/**
 * Visualization class is essentially a descriptor for particular type of visualization - say bar chart
 * or table.
 *
 * @remarks
 * Each available visualization type is described by a class stored in the metadata. The available
 * classes influence what visualizations can users select in Analytical Designer.
 *
 * @public
 */
export declare interface IVisualizationClass {
    visualizationClass: IVisualizationClassBody;
}

/**
 * Object defining the {@link IVisualizationClass} object body.
 *
 * @public
 */
export declare interface IVisualizationClassBody {
    /**
     * Unique identifier of the visualization.
     */
    identifier: string;
    /**
     * Link to visualization class object.
     */
    uri: string;
    /**
     * Human readable name of the visualization (Bar Chart, Pivot Table)
     */
    title: string;
    /**
     * Link to where visualization's assets reside.
     *
     * This MAY contain URLs such as 'local:bar', 'local:table' - such URLs indicate that the visualization
     * is bundled with the GoodData.UI SDK.
     */
    url: string;
    /**
     * Visualization icon to display in Analytical Designer.
     */
    icon: string;
    /**
     * Visualization icon to display when user selects the visualization in Analytical Designer.
     */
    iconSelected: string;
    /**
     * Checksum for subresource integrity checking.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity}
     */
    checksum: string;
    /**
     * Override ordering in the visualization catalog.
     */
    orderIndex?: number;
}

/**
 * Configuration of WhiteLabeling.
 *
 * @public
 */
export declare interface IWhiteLabeling {
    /**
     * (De)/Activate whiteLabeling
     */
    enabled: boolean;
    /**
     * Whitelabeling favicon url
     */
    faviconUrl?: string;
    /**
     * Company logo url
     */
    logoUrl?: string;
    /**
     * Whitelabeling of Apple touch icon url
     */
    appleTouchIconUrl?: string;
}

/**
 * @alpha
 */
export declare type IWidget = IKpiWidget | IInsightWidget;

/**
 * See {@link IWidgetAlertDefinition}
 * @alpha
 */
export declare interface IWidgetAlert extends IWidgetAlertBase, IDashboardObjectIdentity {
    /**
     * Alert filter context
     */
    readonly filterContext?: IFilterContext;
}

/**
 * Common widget alert properties
 * @alpha
 */
export declare interface IWidgetAlertBase {
    /**
     * Kpi alert title
     */
    readonly title: string;
    /**
     * Kpi alert description
     */
    readonly description: string;
    /**
     * Kpi ref (currently only kpi widget alerts are supported)
     */
    readonly widget: ObjRef;
    /**
     * KPI can be on more dashboards - we need to distinguish
     * which dashboard can be used as link in dashboard alerting email
     */
    readonly dashboard: ObjRef;
    /**
     * Threshold
     */
    readonly threshold: number;
    /**
     * Is alert triggered?
     */
    readonly isTriggered: boolean;
    /**
     * Rule to apply
     */
    readonly whenTriggered: "underThreshold" | "aboveThreshold";
}

/**
 * With widget alert, user can be notified to his email according to provided rules
 * (e.g. when some measure exceeds/drops below the set value)
 * @alpha
 */
export declare interface IWidgetAlertDefinition extends IWidgetAlertBase, Partial<IDashboardObjectIdentity> {
    /**
     * Alert filter context
     */
    readonly filterContext?: IFilterContext | IFilterContextDefinition;
}

/**
 * Email attachment - widget exported as csv or/and xlsx.
 *
 * @remarks
 * You can setup specific filter context to use for the widget export
 * @alpha
 */
export declare interface IWidgetAttachment {
    /**
     * The dashboard on which is the widget to be exported
     */
    widgetDashboard: ObjRef;
    /**
     * Widget object ref
     */
    widget: ObjRef;
    /**
     * File format
     */
    formats: ("csv" | "xlsx")[];
    /**
     * Export filter context
     */
    filterContext?: ObjRef;
    /**
     *
     */
    exportOptions?: IExportOptions;
}

/**
 * See {@link IWidget}]
 * @alpha
 */
export declare type IWidgetDefinition = IKpiWidgetDefinition | IInsightWidgetDefinition;

/**
 * Defines properties that are used to store widget's descriptive metadata.
 *
 * @alpha
 */
export declare interface IWidgetDescription {
    /**
     * Widget title
     */
    readonly title: string;
    /**
     * Widget description
     */
    readonly description: string;
}

/**
 * Dictionary of workspace permissions
 *
 * @public
 */
export declare type IWorkspacePermissions = {
    [permission in WorkspacePermission]: boolean;
};

/**
 * Represents platform user in context of the workspace.
 *
 * @public
 */
export declare interface IWorkspaceUser {
    /**
     * Stored user reference
     */
    ref: ObjRef;
    /**
     * User uri
     */
    uri: string;
    /**
     * Login - unique user ID for logging into the platform
     */
    login: string;
    /**
     * Contact email of the user
     */
    email: string;
    /**
     * Full name.
     *
     * Note: This property has higher priority than firstName / lastName.
     * Backend implementation MUST fill this property if user names are supported.
     */
    fullName?: string;
    /**
     * First name - when backend implementations supports it.
     */
    firstName?: string;
    /**
     * Last name - when backend implementations supports it.
     */
    lastName?: string;
    /**
     * User status - when backend implementations supports it.
     */
    status?: "ENABLED" | "DISABLED";
}

/**
 * User Group
 * @alpha
 */
export declare interface IWorkspaceUserGroup {
    /**
     * Stored user group reference
     */
    ref: ObjRef;
    /**
     * Stored user group id
     */
    id?: string;
    /**
     * Group name
     */
    name?: string;
    /**
     * Group description
     */
    description?: string;
}

/**
 * Kpi widget drill definition
 * @alpha
 */
export declare type KpiDrillDefinition = IDrillToLegacyDashboard;

/**
 * @alpha
 */
export declare type KpiWidgetDescriptionSourceType = "kpi" | "metric";

/**
 * Availability of {@link IListedDashboard}.
 * Either full (the listed dashboard is also available as a fully accessible metadata object) or
 * only via link (full metadata object is not accessible, only the listed dashboard record).
 * @alpha
 */
export declare type ListedDashboardAvailability = "full" | "viaLink";

/**
 * Model object reference using object's local identifier.
 *
 * @remarks
 * This type of referencing can be used for objects that are defined together within the same scope - such as within same execution.
 *
 * @public
 */
export declare type LocalIdRef = {
    localIdentifier: Identifier;
};

/**
 * Creates an LocalIdRef from a local identifier
 * @param localIdentifier - local identifier to use
 * @returns local identifier reference
 * @public
 */
export declare function localIdRef(localIdentifier: Identifier): LocalIdRef;

/**
 * Simple measures created from facts can use these types of aggregations.
 *
 * @remarks
 * Note the special approximate_count aggregation. It translates to corresponding SQL function on backend if the
 * underlying data source supports it. Otherwise the backend should fall back to classic exact count. Some backends
 * are oblivious to this functionality completely - for them it's ok to perform the fallback already in SDK backend.
 *
 * @public
 */
export declare type MeasureAggregation = "sum" | "count" | "approximate_count" | "avg" | "min" | "max" | "median" | "runsum";

/**
 * Gets measure aggregation from a measure.
 *
 * @remarks
 * Measure aggregation is applicable and optional only for
 * simple measures. Passing any other measure to this function guarantees that undefined will be returned
 *
 * @param measure - measure to get the aggregation of
 * @returns measure aggregation if specified, undefined otherwise
 * @public
 */
export declare function measureAggregation(measure: IMeasure): MeasureAggregation | undefined;

/**
 * Gets measure alias.
 *
 * @param measure - measure to get the alias of
 * @returns measure alias if specified, undefined otherwise
 * @public
 */
export declare function measureAlias(measure: IMeasure): string | undefined;

/**
 * Gets identifiers of arithmetic operands from the provided arithmetic measure.
 *
 * @param measure - measure to get arithmetic operands from
 * @returns array of local identifiers of measures that are used as arithmetic operands
 * @public
 */
export declare function measureArithmeticOperands(measure: IMeasure<IArithmeticMeasureDefinition>): string[];

/**
 * Gets identifiers of arithmetic operands from the provided measure. If the measure is not an arithmetic measure, then
 * undefined is returned.
 *
 * @param measure - measure to get arithmetic operands from
 * @returns array of local identifiers of measures that are used as arithmetic operands, undefined if input measure
 * is not arithmetic
 * @public
 */
export declare function measureArithmeticOperands(measure: IMeasure): string[] | undefined;

/**
 * Gets arithmetic operator from the provided arithmetic measure.
 *
 * @param measure - arithmetic measure to get arithmetic operator from
 * @returns arithmetic operator of the measure
 * @public
 */
export declare function measureArithmeticOperator(measure: IMeasure<IArithmeticMeasureDefinition>): ArithmeticMeasureOperator;

/**
 * Gets arithmetic operator from the provided measure.
 *
 * @remarks
 * If the measure is not an arithmetic measure, then undefined is returned.
 *
 * @param measure - measure to get arithmetic operator from
 * @returns arithmetic operator of the measure, or undefined if measure is not arithmetic
 * @public
 */
export declare function measureArithmeticOperator(measure: IMeasure): ArithmeticMeasureOperator | undefined;

/**
 * Builder for simple measures.
 *
 * Do not instantiate this builder directly, instead use {@link newMeasure} or {@link modifyMeasure} functions.
 *
 * @public
 */
export declare class MeasureBuilder extends MeasureBuilderBase<IMeasureDefinition> {
    private readonly measureDefinition;
    /**
     * @internal
     */
    constructor(measureOrRef: IMeasure<IMeasureDefinition> | ObjRef);
    /**
     * Sets aggregation to use for measures created from facts.
     *
     * @remarks
     * By default the aggregation is SUM. For convenience the aggregation can be specified also for measures
     * created from metrics - and in that case it will be ignored.
     *
     * For convenience, the aggregation may be undefined and it means the value should be reset to the default.
     *
     * @param aggregation - aggregation to use; if undefined will reset to default
     */
    aggregation: (aggregation?: MeasureAggregation | undefined) => this;
    /**
     * Resets measure aggregation to the default (SUM).
     */
    defaultAggregation: () => this;
    /**
     * Indicates that the measure values should be calculated as percent contributions to the total unsliced
     * value.
     *
     * @remarks
     * This method works as 'turn-on-toggle' by default, however you can specify the actual boolean parameter and
     * turn the ratio computation off using this method.
     *
     * @param value - set the compute ratio indicator to this value
     */
    ratio: (value?: boolean) => this;
    /**
     * Resets compute as ratio indicator.
     */
    noRatio: () => this;
    /**
     * Sets filters to apply when calculating the values of this measure.
     *
     * @remarks
     * These filters apply only to this particular measure calculation and do not impact the rest of the execution.
     *
     * @param filters - filters to apply to this measure
     */
    filters: (...filters: IMeasureFilter[]) => this;
    /**
     * Resets measure filters - this will remove all filters from the measure.
     */
    noFilters: () => this;
    /**
     * Sets reference to measure item that will be used for calculation.
     *
     * @remarks
     * This can be either reference to a MAQL metric or a fact to calculate from.
     *
     * @param ref - new reference to use
     */
    measureItem: (ref: ObjRef) => this;
    protected generateLocalId(): string;
    protected buildDefinition(): IMeasureDefinition;
    private filterLocalIdString;
}

/**
 * Abstract base class for measure builders. Measure builders allow for incremental, fluent construction
 * and modification of measures.
 *
 * @remarks
 * You should not be instantiating the builders directly. Instead, rely on the different functions to
 * create different types of measures.
 *
 * @public
 */
export declare abstract class MeasureBuilderBase<T extends IMeasureDefinitionType> {
    protected customLocalId: boolean;
    private measure;
    /**
     * @internal
     */
    protected constructor();
    /**
     * Sets local identifier (localId) for the measure. LocalId can be used to reference the measure
     * within the execution definition.
     *
     * @remarks
     * Normally, builder will generate localId based on contents of the measure definition - taking all
     * properties into account: in typical scenarios you don't have to call this function at all. The only exception
     * where you have to provide custom local id is if your execution must contain the exact same measure twice.
     *
     * For convenience, this method also accepts 'undefined', which indicates that the default local id generation
     * logic should be used.
     *
     * @param localId - local identifier to set; if not specified, the builder will ensure local id will
     * be generated
     */
    localId: (localId?: Identifier | undefined) => this;
    /**
     * Indicates that the measure's localId should be generated using the default local-id generator logic.
     */
    defaultLocalId: () => this;
    /**
     * Sets alias - alternative title - for the measure.
     *
     * @remarks
     * This value will then be used in various chart-specific descriptive elements.
     * For convenience if no alias is specified, the measure will fall back to using either title (if specified)
     * or server-defined title as the ultimate fallback
     *
     * @param alias - alias to use instead of measure title; undefined to use the title instead
     */
    alias: (alias?: string | undefined) => this;
    /**
     * Resets alias - alternative title - set for the measure.
     *
     * @remarks
     * The measure title will be used if specified, otherwise the server-defined title will be used instead.
     */
    noAlias: () => this;
    /**
     * Sets alternative title for the measure.
     *
     * @remarks
     * This value will then be used in various chart-specific descriptive elements.
     * For convenience if no title is specified, the measure will fall back to server-defined value.
     *
     * @param title - alternative title to use instead of server-defined value; undefined to use server-defined value
     */
    title: (title?: string | undefined) => this;
    /**
     * Resets alternative title for the measure. The server-defined title of the measure will be used
     * instead.
     */
    noTitle: () => this;
    /**
     * Sets measure format to use when rendering values calculated from this measure.
     *
     * @remarks
     * The format string is described in more detail here {@link https://help.gooddata.com/doc/en/reporting-and-dashboards/reports/working-with-reports/formatting-numbers-in-reports}.
     *
     * For convenience, if you do not specify any format, then a default server-defined value will be used instead.
     *
     * @param format - measure format string; or undefined if you want to fall back to server-defined value
     */
    format: (format?: string | undefined) => this;
    /**
     * Resets format string to the server-defined value.
     */
    defaultFormat: () => this;
    build: () => IMeasure<T>;
    /**
     * The measure builder subclasses must call this when they are used to modify
     * an existing measure. Existing measure modification returns a new object that
     * reflects the mods however it keeps the localId set as-is.
     *
     * @param measure - envelope of measure being modified
     */
    protected initializeFromExisting(measure: MeasureEnvelope): void;
    /**
     * Generation of local identifier is a responsibility shared with the the subclass - so that the concrete
     * builders can use their concrete definition to provide additional parts of the local id.
     *
     * @returns local identifier
     */
    protected abstract generateLocalId(): string;
    /**
     * Build of measure definition is responsibility of the subclass.
     *
     * @returns new instance
     */
    protected abstract buildDefinition(): T;
    /**
     * If custom localId has been set using localId() function, then use it unless it is empty.
     *
     * In all other cases generate localId. The localId generation consists up from three parts:
     *
     * - local identifier always starts with letter 'm'
     * - IF alias, title or format is specified, it is hashed and first 8 chars of the hash will follow
     * - The measure type specific part of the local identifier follows
     *
     * These three parts are separated using underscore.
     */
    private getOrGenerateLocalId;
    private buildEnvelopeLocalIdPart;
    private buildEnvelope;
}

/**
 * Tests whether the measure is set to compute ratio.
 *
 * @param measure - measure to to test
 * @returns true if computes ratio, false otherwise
 * @public
 */
export declare function measureDoesComputeRatio(measure: IMeasure): measure is IMeasure<IMeasureDefinition>;

/**
 * Measure without the definition.
 * @public
 */
export declare type MeasureEnvelope = Omit<IMeasure["measure"], "definition">;

/**
 * Gets measure filters.
 *
 * @param measure - measure to get the filters of
 * @returns measure filters if specified, undefined otherwise
 * @public
 */
export declare function measureFilters(measure: IMeasure): IMeasureFilter[] | undefined;

/**
 * Gets measure format.
 * @param measure - measure to get the format of
 * @returns measure format if specified, undefined otherwise
 * @public
 */
export declare function measureFormat(measure: IMeasure): string | undefined;

/**
 * Measure Group is a pseudo-identifier which can be used in an execution dimension and indicates
 * that this dimension MUST contain all the measures.
 *
 * @public
 */
export declare const MeasureGroupIdentifier = "measureGroup";

/**
 * Gets identifier of persistent measure.
 *
 * @remarks
 * Undefined is returned if the measure definition is not for a persistent
 * measure (arithmetic or derived). Undefined is returned if the measure is not specified by identifier.
 *
 * @param measure - measure to get URI for
 * @returns identifier or undefined
 * @public
 */
export declare function measureIdentifier(measure: IMeasure): string | undefined;

/**
 * Describes exact location of measure in a bucket.
 *
 * @public
 */
export declare type MeasureInBucket = {
    bucket: IBucket;
    idx: number;
    measure: IMeasure;
};

/**
 * Gets reference of LDM object from which the measure is calculated (fact or MAQL metric).
 *
 * @param measure - measure to get LDM object reference from
 * @returns object reference
 * @public
 */
export declare function measureItem(measure: IMeasure<IMeasureDefinition>): ObjRef;

/**
 * Gets reference of LDM object from which the measure is calculated (fact or MAQL metric).
 *
 * @param measure - measure to get LDM object reference from
 * @returns object reference or undefined if not simple measure
 * @public
 */
export declare function measureItem(measure: IMeasure): ObjRef | undefined;

/**
 * Gets measure's local identifier. For convenience and fluency, this function accepts both measure object and identifier
 * object.
 *
 * @param measureOrLocalId - measure object or measure localId; if localId provided, it is returned as is
 * @returns string identifier
 * @public
 */
export declare function measureLocalId(measureOrLocalId: MeasureOrLocalId): string;

/**
 * Given measure locator, return the localId of measure that it references.
 *
 * @param locator - measure locator
 * @returns measure localId
 * @public
 */
export declare function measureLocatorIdentifier(locator: IMeasureLocatorItem): Identifier;

/**
 * Gets identifier of master measure for the provided PoP measure or Previous Period measure.
 *
 * @param measure - derived measure
 * @returns master measure identifier
 * @public
 */
export declare function measureMasterIdentifier(measure: IMeasure<IPoPMeasureDefinition | IPreviousPeriodMeasureDefinition>): string;

/**
 * Gets identifier of master measure for the provided derived measure (PoP measure or Previous Period measure).
 *
 * @remarks
 * If the measure is not derived or is derived and does not specify master measure id, then undefined is returned.
 *
 * @param measure - derived measure
 * @returns master measure identifier, undefined if input measure not derived or does not specify master
 * @public
 */
export declare function measureMasterIdentifier(measure: IMeasure): string | undefined;

/**
 * Function that will be called to perform modifications of measure before it is fully constructed.
 *
 * @public
 */
export declare type MeasureModifications<TBuilder> = (builder: TBuilder) => TBuilder;

/**
 * Specification of measure either by value or by local id reference.
 *
 * @remarks
 * It is a common convenience that functions which require measure reference accept both value and reference.
 *
 * @public
 */
export declare type MeasureOrLocalId = IMeasure | Identifier;

/**
 * Gets attribute used for period-over-period measure calculation.
 *
 * @param measure - measure to get the popAttribute of
 * @returns measure popAttribute
 * @public
 */
export declare function measurePopAttribute(measure: IMeasure<IPoPMeasureDefinition>): ObjRef;

/**
 * Gets attribute used for period-over-period measure calculation.
 *
 * @remarks
 * If the input measure is not a period over period measure, then undefined will be returned.
 *
 * @param measure - measure to get the popAttribute of
 * @returns measure popAttribute, undefined if input is not a PoP measure
 * @public
 */
export declare function measurePopAttribute(measure: IMeasure): ObjRef | undefined;

/**
 * Defines function signature for measure predicates.
 *
 * @public
 */
export declare type MeasurePredicate = (measure: IMeasure) => boolean;

/**
 * Gets date data sets used in previous-period measure.
 *
 * @param measure - measure to get the previous period date data sets of
 * @returns previous period date data sets
 * @public
 */
export declare function measurePreviousPeriodDateDataSets(measure: IMeasure<IPreviousPeriodMeasureDefinition>): IPreviousPeriodDateDataSet[];

/**
 * Gets date data sets used in previous-period measure.
 *
 * @remarks
 * If the input is not a previous period measure, then undefined will be returned.
 *
 * @param measure - measure to get the previous period date data sets of
 * @returns measure previous period date data sets if specified, undefined otherwise
 * @public
 */
export declare function measurePreviousPeriodDateDataSets(measure: IMeasure): IPreviousPeriodDateDataSet[] | undefined;

/**
 * Gets measure title.
 * @param measure - measure to get the title of
 * @returns measure title if specified, undefined otherwise
 * @public
 */
export declare function measureTitle(measure: IMeasure): string | undefined;

/**
 * Gets URI of persistent measure.
 *
 * @remarks
 * Undefined is returned if the measure definition is not for a persistent
 * measure (arithmetic or derived). Undefined is returned if the measure is not specified by URI.
 *
 * @param measure - measure to get URI for
 * @returns URI or undefined
 * @public
 */
export declare function measureUri(measure: IMeasure): string | undefined;

/**
 * @public
 */
export declare type MeasureValueFilterCondition = IComparisonCondition | IRangeCondition;

/**
 * Gets measure value filter condition.
 * @param filter - measure value filter to work with
 * @returns filter condition
 * @public
 */
export declare function measureValueFilterCondition(filter: IMeasureValueFilter): MeasureValueFilterCondition | undefined;

/**
 * Gets measure value filter measure.
 * @param filter - measure value filter to work with
 * @returns filter measure
 * @public
 */
export declare function measureValueFilterMeasure(filter: IMeasureValueFilter): ObjRefInScope;

/**
 * Gets operator used in measure value filter condition.
 *
 * @param filter - filter to get operator from
 * @returns undefined if no condition in the filter
 * @public
 */
export declare function measureValueFilterOperator(filter: IMeasureValueFilter): ComparisonConditionOperator | RangeConditionOperator | undefined;

/**
 * Merges two sets of filters.
 *
 * - Attribute filters and ranking filters from both sets are simply concatenated resulting
 *   in the filters being ANDed together.
 * - Date filters are merged based on date data set they filter on
 *   - For Date filters for the same date data set:
 *     - the filters are ordered putting original filters first
 *     - the last filter in this ordering is taken
 *        - if it is All time, all filters for the dimension are cleared
 *        - else the last filter is used
 * - Measure value filters are merged so that there is at most one Measure value filter per measure
 *   (the last one specified is used). This is to prevent errors with more than one Measure value filter
 *   on the same measure which is not supported.
 *
 * @remarks
 * It is the responsibility of the caller to make sure all the filters use the same ObjRef type so that
 * they can be compared without involving the backend. Otherwise, the results might be unexpected
 * (especially for date filters).
 *
 * There is also a function in backend insights service called getInsightWithAddedFilters that can help you
 * do this that takes care of the ObjRef normalization.
 *
 * @param originalFilters - original filters to merge with
 * @param addedFilters - new filters to add on top of original
 * @internal
 */
export declare function mergeFilters(originalFilters: IFilter[], addedFilters: INullableFilter[] | undefined): IFilter[];

/**
 * Type that represents any metadata object
 *
 * @public
 */
export declare type MetadataObject = IAttributeMetadataObject | IAttributeDisplayFormMetadataObject | IFactMetadataObject | IMeasureMetadataObject | IDataSetMetadataObject | IVariableMetadataObject | IDashboardMetadataObject | IAttributeHierarchyMetadataObject;

/**
 * Get metadata object identifier
 *
 * @public
 */
export declare const metadataObjectId: (metadataObject: MetadataObject) => string;

/**
 * Allows modification of an existing attribute instance.
 *
 * @remarks
 * The returned attribute will have the same localId as the original attribute. If you would like to assign
 * new/different local identifier to the attribute, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the attribute should fall back to the auto-generated localId.
 *
 * @param attribute - attribute to modify
 * @param modifications - modification function
 * @public
 */
export declare function modifyAttribute(attribute: IAttribute, modifications?: AttributeModifications): IAttribute;

/**
 * Creates a new inline measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyInlineMeasure(measure: IMeasure<IInlineMeasureDefinition>, modifications?: MeasureModifications<InlineMeasureBuilder>): IMeasure<IInlineMeasureDefinition>;

/**
 * Creates a new measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This generic function can accept measure of any type and thus in returns allows modifications on the properties that are common
 * in any type of measure.
 *
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyMeasure<T extends IMeasureDefinitionType>(measure: IMeasure<T>, modifications?: MeasureModifications<MeasureBuilderBase<IMeasureDefinitionType>>): IMeasure<T>;

/**
 * Creates a new PoP measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyPopMeasure(measure: IMeasure<IPoPMeasureDefinition>, modifications?: MeasureModifications<PoPMeasureBuilder>): IMeasure<IPoPMeasureDefinition>;

/**
 * Creates a new Previous Period measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyPreviousPeriodMeasure(measure: IMeasure<IPreviousPeriodMeasureDefinition>, modifications?: MeasureModifications<PreviousPeriodMeasureBuilder>): IMeasure<IPreviousPeriodMeasureDefinition>;

/**
 * Creates a new simple measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifySimpleMeasure(measure: IMeasure<IMeasureDefinition>, modifications?: MeasureModifications<MeasureBuilder>): IMeasure<IMeasureDefinition>;

/**
 * Creates a new absolute dashboard date filter.
 *
 * @param from - start of the interval in ISO-8601 calendar date format
 * @param to - end of the interval in ISO-8601 calendar date format
 * @alpha
 */
export declare function newAbsoluteDashboardDateFilter(from: DateString, to: DateString): IDashboardDateFilter;

/**
 * Creates a new absolute date filter.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @param from - start of the interval in ISO-8601 calendar date format
 * @param to - end of the interval in ISO-8601 calendar date format
 * @public
 */
export declare function newAbsoluteDateFilter(dateDataSet: ObjRef | Identifier, from: string, to: string): IAbsoluteDateFilter;

/**
 * Creates a new all time date filter. This filter is used to indicate that there should be no filtering on the dates.
 *
 * @alpha
 */
export declare function newAllTimeDashboardDateFilter(): IDashboardDateFilter;

/**
 * Creates a new all time date filter. This filter is used to indicate that there should be no filtering on the given date data set.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @public
 */
export declare function newAllTimeFilter(dateDataSet: ObjRef | Identifier): IRelativeDateFilter;

/**
 * Creates a new arithmetic measure with the specified measure identifiers and operator and optional modifications and localIdentifier.
 * @param measuresOrIds - measures or identifiers of the measures to be included in this arithmetic measure
 * @param operator - operator of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newArithmeticMeasure(measuresOrIds: ReadonlyArray<MeasureOrLocalId>, operator: ArithmeticMeasureOperator, modifications?: MeasureModifications<ArithmeticMeasureBuilder>): IMeasure<IArithmeticMeasureDefinition>;

/**
 * Creates a new attribute with the specified display form ref and optional modifications and localIdentifier.
 * @param displayFormRefOrId - ref or identifier of the attribute display form
 * @param modifications - optional modifications (e.g. alias, etc.)
 * @public
 */
export declare function newAttribute(displayFormRefOrId: ObjRef | Identifier, modifications?: AttributeModifications): IAttribute;

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
 * Creates a new attribute locator for an attribute element.
 *
 * @param attributeOrId - attribute, can be specified by either the attribute object or its local identifier
 * @param element - attribute element value URI or primary label value
 * @returns new locator
 * @public
 */
export declare function newAttributeLocator(attributeOrId: IAttribute | string, element: string): IAttributeLocatorItem;

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
 * Creates a new bucket with the provided id and all the specified content.
 *
 * @param localId - bucket identifier
 * @param content - items to put into the bucket; attributes, measures and/or totals
 * @returns always new instance
 * @public
 */
export declare function newBucket(localId: string, ...content: Array<IAttributeOrMeasure | ITotal | undefined>): IBucket;

/**
 * Prepares a new execution definition for a list of buckets.
 *
 * @remarks
 * Attributes and measures WILL be transferred to the execution in natural order:
 *
 * - Order of items within a bucket is retained in the execution
 * - Items from first bucket appear before items from second bucket
 *
 * Or more specifically, given two buckets with items as [A1, A2, M1] and [A3, M2, M3], the resulting
 * prepared execution WILL have definition with attributes = [A1, A2, A3] and measures = [M1, M2, M3]
 *
 * This function MUST be used to implement IExecutionFactory.forBuckets();
 *
 * @param workspace - workspace to execute against, must not be empty
 * @param buckets - list of buckets with attributes and measures, must be non empty, must have at least one attr or measure
 * @param filters - optional, may not be provided
 * @public
 */
export declare function newDefForBuckets(workspace: string, buckets: IBucket[], filters?: INullableFilter[]): IExecutionDefinition;

/**
 * Prepares a new execution definition for the provided insight.
 *
 * @remarks
 * Buckets with attributes and measures WILL be used
 * to obtain attributes and measures - the behavior WILL be same as in forBuckets() function. Filters, sort by
 * and totals in the insight WILL be included in the prepared execution.
 *
 * Additionally, an optional list of additional filters WILL be merged with the filters already defined in
 * the insight.
 *
 * - Attributes and measures from insight's buckets are distributed into definition attributes and measures
 *   in natural order.
 * - Insight filters are added into definition
 * - Insight sorts are added into definition
 * - Insight totals are added into definition
 *
 * This function MUST be used to implement IExecutionFactory.forInsight();
 *
 * @param workspace - workspace to execute against, must not be empty
 * @param insight - insight to create execution for, must have buckets which must have some attributes or measures in them
 * @param filters - optional, may not be provided
 * @public
 */
export declare function newDefForInsight(workspace: string, insight: IInsightDefinition, filters?: INullableFilter[]): IExecutionDefinition;

/**
 * Prepares a new execution definition for a list of attributes and measures, filtered using the
 * provided filters.
 *
 * @remarks
 * This function MUST be used to implement IExecutionFactory.forItems();
 *
 * @param workspace - workspace to execute against, must not be empty
 * @param items - list of attributes and measures, must not be empty
 * @param filters - list of filters, may not be provided
 * @public
 */
export declare function newDefForItems(workspace: string, items: IAttributeOrMeasure[], filters?: INullableFilter[]): IExecutionDefinition;

/**
 * Creates new single-dimensional specification where the dimension will have the provided set of identifiers.
 *
 * @param items - allows for mix of item identifiers, attributes and total definitions to have in the new dimension
 * @param totals - additional totals to add to the dimension
 * @returns single dimension
 * @public
 */
export declare function newDimension(items?: DimensionItem[], totals?: ITotal[]): IDimension;

/**
 * Creates a new inline measure
 *
 * @param maql - maql definition of measure
 * @returns new instance
 * @public
 */
export declare function newInlineMeasure(maql: string): IMeasure<IInlineMeasureDefinition>;

/**
 * Creates new, empty insight definition, modifying its content with given modifications.
 *
 * @param visualizationUrl - visualization URL (e.g. local:bar, local:table..)
 * @param modifications - modification function which will be called with builder to update the insight
 * @internal
 */
export declare function newInsightDefinition(visualizationUrl: string, modifications?: InsightModifications): IInsightDefinition;

/**
 * Creates a new measure with the specified identifier and optional modifications and localIdentifier.
 * @param measure - ref of identifier of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newMeasure(measure: ObjRef | Identifier, modifications?: MeasureModifications<MeasureBuilder>): IMeasure<IMeasureDefinition>;

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
 * Creates a new measure value filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - comparison or range operator to use in the filter
 * @param value - the value to compare to
 * @param treatNullValuesAs - value to use instead of null values
 * @public
 */
export declare function newMeasureValueFilter(measureOrRef: IMeasure | ObjRefInScope | string, operator: ComparisonConditionOperator, value: number, treatNullValuesAs?: number): IMeasureValueFilter;

/**
 * Creates a new measure value filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - range operator to use in the filter
 * @param from - the start of the range
 * @param to - the end of the range
 * @param treatNullValuesAs - value to use instead of null values
 * @public
 */
export declare function newMeasureValueFilter(measureOrRef: IMeasure | ObjRefInScope | LocalIdRef | string, operator: RangeConditionOperator, from: number, to: number, treatNullValuesAs?: number): IMeasureValueFilter;

/**
 * Creates a new negative attribute filter.
 *
 * @remarks
 * NOTE: when specifying attribute element using URIs (primary keys), please keep in mind that they MAY NOT be transferable
 * across workspaces. On some backends (such as bear) same element WILL have different URI in each workspace.
 * In general we recommend using URIs only if your code retrieves them at runtime from backend using elements query
 * or from the data view's headers. Hardcoding URIs is never a good idea, if you find yourself doing that,
 * please consider specifying attribute elements by value
 *
 * @param attributeOrRef - either instance of attribute to create filter for or ref or identifier of attribute's display form
 * @param notInValues - values to filter out; these can be either specified as AttributeElements object or as an array
 *  of attribute element _values_; if you specify empty array, then the filter will be noop and will be ignored
 * @public
 */
export declare function newNegativeAttributeFilter(attributeOrRef: IAttribute | ObjRef | Identifier, notInValues: IAttributeElements | string[]): INegativeAttributeFilter;

/**
 * Creates a new PoP measure with the specified identifier and PoP attribute identifier and optional modifications and localIdentifier.
 * @param measureOrLocalId - measure or local identifier of the measure
 * @param popAttrIdOrRef - identifier or a reference to PoP attribute
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newPopMeasure(measureOrLocalId: MeasureOrLocalId, popAttrIdOrRef: ObjRef | Identifier, modifications?: MeasureModifications<PoPMeasureBuilder>): IMeasure<IPoPMeasureDefinition>;

/**
 * Creates a new positive attribute filter.
 *
 * @remarks
 * NOTE: when specifying attribute element using URIs (primary keys), please keep in mind that they MAY NOT be transferable
 * across workspaces. On some backends (such as bear) same element WILL have different URI in each workspace.
 * In general we recommend using URIs only if your code retrieves them at runtime from backend using elements query
 * or from the data view's headers. Hardcoding URIs is never a good idea, if you find yourself doing that,
 * please consider specifying attribute elements by value
 *
 * @param attributeOrRef - either instance of attribute to create filter for or ref or identifier of attribute's display form
 * @param inValues - values to filter for; these can be either specified as AttributeElements object or as an array
 *  of attribute element _values_; if you specify empty array, then the filter will be noop and will be ignored
 * @public
 */
export declare function newPositiveAttributeFilter(attributeOrRef: IAttribute | ObjRef | Identifier, inValues: IAttributeElements | string[]): IPositiveAttributeFilter;

/**
 * Creates a new Previous Period measure with the specified measure identifier and date data sets and optional modifications and localIdentifier.
 * @param measureIdOrLocalId - measure or local identifier of the measure to create Previous Period measure for
 * @param dateDataSets - date data sets to use in the Previous Period calculation
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newPreviousPeriodMeasure(measureIdOrLocalId: MeasureOrLocalId, dateDataSets: IPreviousPeriodDateDataSetSimple[], modifications?: MeasureModifications<PreviousPeriodMeasureBuilder>): IMeasure<IPreviousPeriodMeasureDefinition>;

/**
 * Creates a new ranking filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - TOP or BOTTOM operator to use in the filter
 * @param value - Number of values to use in filter
 * @param attributesOrRefs - Array of attributes used in filter, or reference of the attribute object. If instance of attribute is
 *   provided, then it is assumed this attribute is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @public
 */
export declare function newRankingFilter(measureOrRef: IMeasure | ObjRefInScope | string, attributesOrRefs: Array<IAttribute | ObjRefInScope | string>, operator: RankingFilterOperator, value: number): IRankingFilter;

/**
 * Creates a new ranking filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - TOP or BOTTOM operator to use in the filter
 * @param value - Number of values to use in filter
 * @public
 */
export declare function newRankingFilter(measureOrRef: IMeasure | ObjRefInScope | string, operator: RankingFilterOperator, value: number): IRankingFilter;

/**
 * Creates a new relative dashboard date filter.
 *
 * @param granularity - granularity of the filters (month, year, etc.)
 * @param from - start of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @param to - end of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @alpha
 */
export declare function newRelativeDashboardDateFilter(granularity: DateFilterGranularity, from: number, to: number): IDashboardDateFilter;

/**
 * Creates a new relative date filter.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @param granularity - granularity of the filters (month, year, etc.)
 * @param from - start of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @param to - end of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 *
 * See also {@link DateAttributeGranularity} and {@link DateGranularity}
 * @public
 */
export declare function newRelativeDateFilter(dateDataSet: ObjRef | Identifier, granularity: DateAttributeGranularity, from: number, to: number): IRelativeDateFilter;

/**
 * Creates a new total.
 *
 * @param type - type of total, one of the enumerated types
 * @param measureOrId - measure instance OR measure local identifier
 * @param attributeOrId - attribute instance OR attribute local identifier
 * @param alias - provide custom name (alias) for the total; this will be included in the computed results
 * @returns new total
 * @public
 */
export declare function newTotal(type: TotalType, measureOrId: IMeasure | Identifier, attributeOrId: IAttribute | Identifier, alias?: string): ITotal;

/**
 * Creates new two dimensional specification where each dimension will have the provided set of
 * identifiers.
 *
 * @remarks
 * The 'measureGroup' identifier MAY be specified in only one of the dimensions.
 *
 * @param dim1Input - items to put into the first dimension, this can be item identifiers or totals
 * @param dim2Input - items to put into the second dimension, this can be item identifiers or totals
 * @returns array with exactly two dimensions
 * @public
 */
export declare function newTwoDimensional(dim1Input: DimensionItem[], dim2Input: DimensionItem[]): IDimension[];

/**
 * Creates a new virtual arithmetic measure with the specified measure identifiers and operator and optional modifications and localIdentifier.
 *
 * @param measuresOrIds - measures or identifiers of the measures to be included in this arithmetic measure
 * @param operator - operator of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 *
 * @internal
 */
export declare function newVirtualArithmeticMeasure(measuresOrIds: ReadonlyArray<MeasureOrLocalId>, operator: ArithmeticMeasureOperator, modifications?: MeasureModifications<VirtualArithmeticMeasureBuilder>): IMeasure<IVirtualArithmeticMeasureDefinition>;

/**
 * Metadata object types
 *
 * @public
 */
export declare type ObjectType = "measure" | "fact" | "attribute" | "displayForm" | "dataSet" | "tag" | "insight" | "variable" | "analyticalDashboard" | "theme" | "colorPalette" | "filterContext" | "dashboardPlugin" | "attributeHierarchy";

/**
 * Model object reference.
 *
 * @remarks
 * Note: you should avoid manually creating and maintaining object references. The recommended practice is to
 * treat your logical data model as code; you can achieve this by using the catalog-exporter tool which can
 * create code representation of the various LDM entities. You can then use this code in conjuction with the
 * various factory and builder methods in sdk-model to conveniently construct visualizations.
 *
 * @public
 */
export declare type ObjRef = UriRef | IdentifierRef;

/**
 * Model object reference with support of referencing objects living in the same scope using their
 * local identifier.
 *
 * @public
 */
export declare type ObjRefInScope = ObjRef | LocalIdRef;

/**
 * Retrieves string representation of object reference. This is purely for for representation of
 * references in text, debug and tests.
 *
 * @internal
 */
export declare function objRefToString(objRef: ObjRef | ObjRefInScope): string;

/**
 * Indicates current platform edition.
 *
 * @public
 */
export declare type PlatformEdition = "free" | "growth" | "enterprise";

/**
 * Builder for period-over-period measures.
 *
 * Do not instantiate this builder directly, instead use {@link newPopMeasure}.
 *
 * @public
 */
export declare class PoPMeasureBuilder extends MeasureBuilderBase<IPoPMeasureDefinition> {
    private popMeasureDefinition;
    /**
     * @internal
     */
    constructor(input: PoPMeasureBuilderInput);
    /**
     * Sets master measure from which this period-over-period measure should be calculated.
     *
     * @param measureOrLocalId - measure value or measure local identifier
     */
    masterMeasure: (measureOrLocalId: MeasureOrLocalId) => this;
    /**
     * Sets period-over-period date dimension attribute to use for offsetting. For convenience the attribute
     * may be specified by either object reference or as a string - in which case it is assumed this is identifier
     * of the attribute object.
     *
     * @param popAttrIdOrRef - reference of the PoP attribute, or identifier
     */
    popAttribute: (popAttrIdOrRef: ObjRef | Identifier) => this;
    protected buildDefinition(): IPoPMeasureDefinition;
    protected generateLocalId(): string;
}

/**
 * Input to the PoPMeasureBuilder.
 * @public
 */
export declare type PoPMeasureBuilderInput = {
    measureOrLocalId: MeasureOrLocalId;
    popAttrIdOrRef: ObjRef | Identifier;
} | IMeasure<IPoPMeasureDefinition>;

/**
 * Builder for previous period measures.
 *
 * Do not instantiate this builder directly, instead use {@link newPreviousPeriodMeasure}.
 *
 * @public
 */
export declare class PreviousPeriodMeasureBuilder extends MeasureBuilderBase<IPreviousPeriodMeasureDefinition> {
    private previousPeriodMeasure;
    /**
     * @internal
     */
    constructor(input: PreviousPeriodMeasureBuilderInput);
    /**
     * Sets master measure from which this previous period measure should be calculated.
     *
     * @param measureOrLocalId - measure value or measure local identifier
     */
    masterMeasure: (measureOrLocalId: MeasureOrLocalId) => this;
    /**
     * Sets date data set + offset within the data set to use when calculating values of this measure.
     *
     * @param dd - date data set + offset
     */
    dateDataSets: (dd: IPreviousPeriodDateDataSetSimple[]) => this;
    protected buildDefinition(): IPreviousPeriodMeasureDefinition;
    protected generateLocalId(): string;
    private convertDd;
}

/**
 * Import to the PreviousPeriodMeasureBuilder.
 * @public
 */
export declare type PreviousPeriodMeasureBuilderInput = {
    measureIdOrLocalId: MeasureOrLocalId;
    dateDataSets: IPreviousPeriodDateDataSetSimple[];
} | IMeasure<IPreviousPeriodMeasureDefinition>;

/**
 * @public
 */
export declare type RangeConditionOperator = "BETWEEN" | "NOT_BETWEEN";

/**
 * @public
 */
export declare type RankingFilterOperator = "TOP" | "BOTTOM";

/**
 * Relative granularity offset
 * (e.g. "GDC.time.year" granularity with offset -2 means "the previous 2 years")
 * @alpha
 */
export declare type RelativeDateFilterGranularityOffset = number;

/**
 * Gets effective values of a relative date filter.
 *
 * @param filter - date filter to work with
 * @returns filter values
 * @public
 */
export declare function relativeDateFilterValues(filter: IRelativeDateFilter): IRelativeDateFilterValues;

/**
 * Returns item name contained within a result header.
 *
 * @param header - header of any type
 * @public
 */
export declare function resultHeaderName(header: IResultHeader): string | null;

/**
 * @public
 */
export declare type RgbType = "rgb";

/**
 * Takes totals from a bucket and removes all subtotals if the bucket is sorted on other than the first attribute.
 * This does not apply to columns bucket, as totals set with columns bucket are valid with sorts.
 *
 * @param bucket - a grouping of attributes, measures and totals to sanitize
 * @param sortItems - a specification of the sort
 * @param totals - if specified these totals instead of the bucket totals will be sanitized in regard to the bucket
 * @returns sanitized totals
 * @internal
 */
export declare function sanitizeBucketTotals(bucket: IBucket, sortItems: ISortItem[], totals?: ITotal[]): ITotal[];

/**
 * Supported email attachments
 * @alpha
 */
export declare type ScheduledMailAttachment = IDashboardAttachment | IWidgetAttachment;

/**
 * Classification of the screen size according to its size with respect to the set breakpoints.
 *
 * @alpha
 */
export declare type ScreenSize = "xl" | "lg" | "md" | "sm" | "xs";

/**
 * Serializes an instance of ObjRef to a string representation.
 *
 * @remarks
 * This is suitable when ObjRef needs to be used as a key in dictionaries/objects.
 *
 * Note: there is no loss of information and the serialized value is guaranteed to be stable, meaning same ObjRef
 * will always serialize the same.
 *
 * @param objRef - ref to serialize
 * @remarks see {@link deserializeObjRef}
 * @public
 */
export declare function serializeObjRef(objRef: ObjRef | ObjRefInScope): string;

/**
 * Object share status
 *
 * @remarks
 * private - object accessible only by its creator
 * shared - object shared with closed set of users/groups
 * public - accessible by everyone in project
 *
 * @alpha
 */
export declare type ShareStatus = "private" | "shared" | "public";

/**
 * Sorting direction.
 *
 * @public
 */
export declare type SortDirection = "asc" | "desc";

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
export declare type SortEntityIds = {
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
 * Color string in hex format, e.g. #14b2e2
 *
 * @beta
 */
export declare type ThemeColor = string;

/**
 * Custom font URI which is used to override the default font
 *
 * @beta
 */
export declare type ThemeFontUri = string;

/**
 * Tests whether total instance represents a native total = a roll-up total.
 *
 * @public
 */
export declare function totalIsNative(total: ITotal): boolean;

/**
 * Supported types of totals.
 *
 * @public
 */
export declare type TotalType = "sum" | "avg" | "max" | "min" | "med" | "nat";

/**
 * Updates the items in the {@link IAttributeElements}.
 *
 * @param attributeElements - object to update items in
 * @param newItems - new items to put into attributeElements
 * @returns updated attributeElements object with new item values
 * @internal
 */
export declare function updateAttributeElementsItems(attributeElements: IAttributeElements, newItems: Array<string | null>): IAttributeElements;

/**
 * Type for all URI's.
 *
 * @public
 */
export declare type Uri = string;

/**
 * Model object reference using object's URI.
 *
 * @remarks
 * NOTE: using URI references is discouraged. URIs are workspace-specific and thus any application
 * which references model objects using their URI will not work on multiple workspaces.
 *
 * @public
 */
export declare type UriRef = {
    uri: Uri;
};

/**
 * Creates an UriRef from an URI
 * @param uri - URI to use
 * @returns uri reference
 * @public
 */
export declare function uriRef(uri: Uri): UriRef;

/**
 * Gets the user full name
 *
 * @param user - user to get full name of
 * @returns the user full name
 * @public
 */
export declare function userFullName(user: IUser): string | undefined;

/**
 * Builder for virtual arithmetic measures.
 *
 * Do not instantiate this builder directly, instead use {@link newVirtualArithmeticMeasure}.
 *
 * @internal
 */
export declare class VirtualArithmeticMeasureBuilder extends ArithmeticMeasureBuilder {
    protected buildDefinition(): IVirtualArithmeticMeasureDefinition;
}

/**
 * For given visualization class, return its identifier.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export declare function visClassId(vc: IVisualizationClass): string;

/**
 * For given visualization class, return its URI.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export declare function visClassUri(vc: IVisualizationClass): string;

/**
 * For given visualization class, return URL where the vis assets are stored.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export declare function visClassUrl(vc: IVisualizationClass): string;

/**
 * Visualization-specific properties.
 *
 * @remarks
 * These are modelled in generic fashion as they vary visualization by visualization.
 *
 * @privateRemarks
 * TODO: add links to properties supported by our visualizations.
 *
 * @public
 */
export declare type VisualizationProperties = {
    [key: string]: any;
};

/**
 * Week start day
 *
 * @public
 */
export declare type WeekStart = "Sunday" | "Monday";

/**
 * Gets the widget identifier
 *
 * @param widget - widget to get identifier of
 * @returns the widget identifier
 * @alpha
 */
export declare function widgetId(widget: IWidget): string;

/**
 * Gets the widget ref
 *
 * @param widget - widget to get ref of
 * @returns the widget ref
 * @alpha
 */
export declare function widgetRef(widget: IWidget): ObjRef;

/**
 * Gets the widget title
 *
 * @param widget - widget to get title of
 * @returns the widget title
 * @alpha
 */
export declare function widgetTitle(widget: IWidget): string;

/**
 * Gets the widget type
 *
 * @param widget - widget to get type of
 * @returns the widget type
 * @alpha
 */
export declare function widgetType(widget: IWidget): AnalyticalWidgetType;

/**
 * Gets the widget uri
 *
 * @param widget - widget to get uri of
 * @returns the widget uri
 * @alpha
 */
export declare function widgetUri(widget: IWidget): string;

/**
 * Workspace permission types
 *
 * @public
 */
export declare type WorkspacePermission = 
/**
* Whether the current user has permissions to run MAQL DDL and DML, access a workspace staging directory.
*/
"canInitData"
/**
* Whether the current user has permissions to upload CSV files via CSV Uploader.
*/
| "canUploadNonProductionCSV"
/**
* Whether the current user has permissions to download a complete report.
*/
| "canExecuteRaw"
/**
* Whether the current user has permissions to export the report.
*/
| "canExportReport"
/**
* Whether the current user has permissions to access GoodData portal directly (user can log in).
*/
| "canAccessWorkbench"
/**
* Whether the current user has permissions to create a report object via API.
*/
| "canCreateReport"
/**
* Whether the current user has permissions to create a KPI object, KPI widget object, and an insight object via API.
*/
| "canCreateVisualization"
/**
* Whether the current user has permissions to create a KPI dashboard object via API.
*/
| "canCreateAnalyticalDashboard"
/**
* Whether the current user has permissions to modify and delete a metric, run MAQL DDL, run the MAQL validator, change metric visibility via the `unlisted` flag.
*/
| "canManageMetric"
/**
* Whether the current user has permissions to modify and delete a report object, change report visibility via the `unlisted` flag.
*/
| "canManageReport"
/**
* Whether the current user has permissions to modify and delete a KPI dashboard object.
*/
| "canManageAnalyticalDashboard"
/**
* Whether the current user has permissions to modify workspace metadata, see the workspace token, lock and unlock objects, delete locked objects, set and unset the restricted flag on objects, clear cache, delete a workspace.
*/
| "canManageProject"
/**
* Whether the current user has permissions to create a scheduled email object and a KPI alert object.
*/
| "canCreateScheduledMail"
/**
* Whether the current user has permissions to list users, roles, and permissions.
*/
| "canListUsersInProject"
/**
* Whether the current user has permissions to modify and delete a domain, run MAQL DDL.
*/
| "canManageDomain"
/**
* Whether the current user has permissions to invite a user to a workspace or delete an invitation.
*/
| "canInviteUserToProject"
/**
* Whether the current user has permissions to run uploads, load date dimensions, access a workspace staging directory.
*/
| "canRefreshData"
/**
* Whether the current user has permissions to add, remove, and list ACLs (Access Control Lists) on an object.
*/
| "canManageACL"
/**
* Whether the current user has permissions to manage scheduled email objects.
*/
| "canManageScheduledMail"
/**
* Whether the current user has permissions to export as tabular reports.
*/
| "canExportTabular"
/**
* Whether the current user has permissions to export as pdf documents.
*/
| "canExportPdf";

export { }
