import { ObjRef } from "../../objRef/index.js";
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
export type DataValue = null | string | number;
/**
 * Descriptor of the measure and its contents.
 *
 * @public
 */
export interface IMeasureDescriptorObject {
    items: IMeasureDescriptor[];
    totalItems?: ITotalDescriptor[];
}
/**
 * Describes measure group and its contents.
 * @public
 */
export interface IMeasureGroupDescriptor {
    measureGroupHeader: IMeasureDescriptorObject;
}
/**
 * Measure descriptor object.
 *
 * @public
 */
export interface IMeasureDescriptorItem {
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
 * Describes measure included in a dimension.
 *
 * @public
 */
export interface IMeasureDescriptor {
    measureHeaderItem: IMeasureDescriptorItem;
}
/**
 * Describes total included in a dimension.
 *
 * @public
 */
export interface ITotalDescriptorItem {
    name: string;
}
/**
 * Describes total included in a dimension.
 *
 * @public
 */
export interface ITotalDescriptor {
    totalHeaderItem: ITotalDescriptorItem;
}
/**
 * Describes color included in a dimension.
 *
 * @public
 */
export interface IColorDescriptorItem {
    id: string;
    name: string;
}
/**
 * Describes color included in a dimension.
 *
 * @public
 */
export interface IColorDescriptor {
    colorHeaderItem: IColorDescriptorItem;
}
/**
 * Describes attributes to which the display form belongs.
 *
 * @public
 */
export interface IAttributeHeaderFormOf {
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
 * Attribute descriptor header.
 *
 * @public
 */
export interface IAttributeDescriptorBody {
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
 * Describes attribute slicing of a dimension.
 *
 * @remarks
 * The primary descriptor is the attribute display form which was
 * used to slice the dimension. Description of the attribute to which the display form belongs is provided in the
 * `formOf` property.
 *
 * @public
 */
export interface IAttributeDescriptor {
    /**
     * Attribute descriptor header.
     */
    attributeHeader: IAttributeDescriptorBody;
}
/**
 * Headers describing contents of a dimension.
 *
 * @public
 */
export type IDimensionItemDescriptor = IMeasureGroupDescriptor | IAttributeDescriptor;
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
export interface IDimensionDescriptor {
    headers: IDimensionItemDescriptor[];
}
/**
 * Attribute header item specifies name and URI of the attribute element to which the calculated measure
 * values in the particular data view slice belong.
 *
 * @public
 */
export interface IResultAttributeHeaderItem {
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
 * Attribute header specifies name and URI of the attribute element to which the calculated measure
 * values in the particular data view slice belong.
 *
 * @public
 */
export interface IResultAttributeHeader {
    attributeHeaderItem: IResultAttributeHeaderItem;
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
export interface IResultMeasureHeaderItem {
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
 * Measure header specifies name of the measure to which the calculated values in the particular data view slice belong.
 *
 * @remarks
 * Measure header also specifies 'order' - this is essentially an index into measure group descriptor's item array; it
 * can be used to obtain further information about the measure.
 *
 * @public
 */
export interface IResultMeasureHeader {
    measureHeaderItem: IResultMeasureHeaderItem;
}
/**
 * Total header specifies name and type of total to which the calculated values in particular data view slice belong.
 * Also can contain measure index which can be used to lookup the measure which belongs to this total.
 *
 * @public
 */
export interface IResultTotalHeaderItem {
    name: string;
    type: string;
    measureIndex?: number;
}
/**
 * Total header specifies name and type of total to which the calculated values in particular data view slice belong.
 *
 * @public
 */
export interface IResultTotalHeader {
    totalHeaderItem: IResultTotalHeaderItem;
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
export type IResultHeader = IResultAttributeHeader | IResultMeasureHeader | IResultTotalHeader;
/**
 * Represents an execution result warning.
 * (e.g. when execution was executed successfully, but backend didn't take something into the account)
 *
 * @public
 */
export interface IResultWarning {
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
 * Type-guard testing whether the provided object is an instance of {@link IAttributeDescriptor}.
 *
 * @public
 */
export declare function isAttributeDescriptor(obj: unknown): obj is IAttributeDescriptor;
/**
 * Type-guard testing whether the provided object is an instance of {@link IMeasureGroupDescriptor}.
 *
 * @public
 */
export declare function isMeasureGroupDescriptor(obj: unknown): obj is IMeasureGroupDescriptor;
/**
 * Type-guard testing whether the provided object is an instance of {@link IMeasureDescriptor}.
 *
 * @public
 */
export declare function isMeasureDescriptor(obj: unknown): obj is IMeasureDescriptor;
/**
 * Type-guard testing whether the provided object is an instance of {@link ITotalDescriptor}.
 *
 * @public
 */
export declare function isTotalDescriptor(obj: unknown): obj is ITotalDescriptor;
/**
 * Type-guard testing whether the provided object is an instance of {@link IColorDescriptor}.
 *
 * @public
 */
export declare function isColorDescriptor(obj: unknown): obj is IColorDescriptor;
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
 * Returns item name contained within a result header.
 *
 * @param header - header of any type
 * @public
 */
export declare function resultHeaderName(header: IResultHeader): string | null;
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
//# sourceMappingURL=index.d.ts.map