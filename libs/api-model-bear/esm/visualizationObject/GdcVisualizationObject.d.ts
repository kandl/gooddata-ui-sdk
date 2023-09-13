import { IObjectMeta } from "../meta/GdcMetadata.js";
import { Identifier, MeasureAggregation, TotalType, ArithmeticMeasureOperator, ObjQualifier, IObjUriQualifier, MeasureValueFilterCondition, RankingFilterOperator, ILocalIdentifierQualifier, IPreviousPeriodDateDataSet } from "../base/GdcTypes.js";
/**
 * @public
 */
export type VisualizationType = "table" | "line" | "column" | "bar" | "pie" | "doughnut" | "combo" | "area";
/**
 * @public
 */
export type BucketItem = IVisualizationObjectMeasure | IVisualizationObjectAttribute;
/**
 * @public
 */
export type VisualizationObjectExtendedFilter = VisualizationObjectFilter | IVisualizationObjectMeasureValueFilter | IVisualizationObjectRankingFilter;
/**
 * @public
 */
export type VisualizationObjectFilter = VisualizationObjectDateFilter | VisualizationObjectAttributeFilter;
/**
 * @public
 */
export type VisualizationObjectDateFilter = IVisualizationObjectRelativeDateFilter | IVisualizationObjectAbsoluteDateFilter;
/**
 * @public
 */
export type VisualizationObjectAttributeFilter = IVisualizationObjectPositiveAttributeFilter | IVisualizationObjectNegativeAttributeFilter;
/**
 * @public
 */
export interface IVisualizationObjectPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: string[];
    };
}
/**
 * @public
 */
export interface IVisualizationObjectNegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: string[];
    };
}
/**
 * @public
 */
export interface IVisualizationObjectAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet: ObjQualifier;
        from?: string;
        to?: string;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectRelativeDateFilter {
    relativeDateFilter: {
        dataSet: ObjQualifier;
        granularity: string;
        from?: number;
        to?: number;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectMeasureValueFilter {
    measureValueFilter: {
        measure: IObjUriQualifier | ILocalIdentifierQualifier;
        condition?: MeasureValueFilterCondition;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectRankingFilter {
    rankingFilter: {
        measures: (IObjUriQualifier | ILocalIdentifierQualifier)[];
        attributes?: (IObjUriQualifier | ILocalIdentifierQualifier)[];
        operator: RankingFilterOperator;
        value: number;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectContent {
    visualizationClass: IObjUriQualifier;
    buckets: IBucket[];
    filters?: VisualizationObjectExtendedFilter[];
    properties?: string;
    references?: IReferenceItems;
}
/**
 * @public
 */
export interface IReferenceItems {
    [identifier: string]: string;
}
/**
 * @public
 */
export interface IBucket {
    localIdentifier?: Identifier;
    items: BucketItem[];
    totals?: ITotal[];
}
/**
 * @public
 */
export interface ITotal {
    type: TotalType;
    measureIdentifier: string;
    attributeIdentifier: string;
    alias?: string;
}
/**
 * @public
 */
export type VisualizationObjectMeasureDefinitionType = IVisualizationObjectMeasureDefinition | IVisualizationObjectArithmeticMeasureDefinition | IVisualizationObjectPoPMeasureDefinition | IVisualizationObjectPreviousPeriodMeasureDefinition;
/**
 * @public
 */
export interface IVisualizationObjectMeasure {
    measure: IMeasureContent;
}
/**
 * @public
 */
export interface IMeasureContent {
    localIdentifier: Identifier;
    definition: VisualizationObjectMeasureDefinitionType;
    alias?: string;
    title?: string;
    format?: string;
}
/**
 * @public
 */
export interface IVisualizationObjectAttribute {
    visualizationAttribute: IVisualizationAttributeContent;
}
/**
 * @public
 */
export interface IVisualizationAttributeContent {
    localIdentifier: Identifier;
    displayForm: ObjQualifier;
    alias?: string;
    showAllValues?: boolean;
}
/**
 * @public
 */
export interface IVisualizationObjectMeasureDefinition {
    measureDefinition: {
        item: ObjQualifier;
        aggregation?: MeasureAggregation;
        filters?: VisualizationObjectFilter[];
        computeRatio?: boolean;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectArithmeticMeasureDefinition {
    arithmeticMeasure: {
        measureIdentifiers: Identifier[];
        operator: ArithmeticMeasureOperator;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectPoPMeasureDefinition {
    popMeasureDefinition: {
        measureIdentifier: Identifier;
        popAttribute: ObjQualifier;
    };
}
/**
 * @public
 */
export interface IVisualizationObjectPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: {
        measureIdentifier: Identifier;
        dateDataSets: IPreviousPeriodDateDataSet[];
    };
}
/**
 * @public
 */
export interface IVisualizationObject {
    meta: IObjectMeta;
    content: IVisualizationObjectContent;
}
/**
 * @public
 */
export interface IVisualization {
    visualizationObject: IVisualizationObject;
}
/**
 * @public
 */
export interface IVisualizationObjectResponse {
    visualizationObject: IVisualizationObject;
}
/**
 * @public
 */
export declare function isVisualization(obj: unknown): obj is IVisualization;
/**
 * @public
 */
export declare function isVisualizationObjectMeasure(bucketItem: IVisualizationObjectMeasure | IVisualizationObjectAttribute): bucketItem is IVisualizationObjectMeasure;
/**
 * @public
 */
export declare function isVisualizationObjectAttribute(bucketItem: IVisualizationObjectMeasure | IVisualizationObjectAttribute): bucketItem is IVisualizationObjectAttribute;
/**
 * @public
 */
export declare function isVisualizationObjectMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectMeasureDefinition;
/**
 * @public
 */
export declare function isVisualizationObjectArithmeticMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectArithmeticMeasureDefinition;
/**
 * @public
 */
export declare function isVisualizationObjectPoPMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectPoPMeasureDefinition;
/**
 * @public
 */
export declare function isVisualizationObjectPreviousPeriodMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectPreviousPeriodMeasureDefinition;
/**
 * @public
 */
export declare function isVisualizationObjectAttributeFilter(filter: VisualizationObjectExtendedFilter): filter is VisualizationObjectAttributeFilter;
/**
 * @public
 */
export declare function isVisualizationObjectDateFilter(filter: VisualizationObjectExtendedFilter): filter is VisualizationObjectDateFilter;
/**
 * @public
 */
export declare function isVisualizationObjectPositiveAttributeFilter(filter: VisualizationObjectAttributeFilter): filter is IVisualizationObjectPositiveAttributeFilter;
/**
 * @public
 */
export declare function isVisualizationObjectNegativeAttributeFilter(filter: VisualizationObjectAttributeFilter): filter is IVisualizationObjectNegativeAttributeFilter;
/**
 * @public
 */
export declare function isVisualizationObjectMeasureValueFilter(filter: VisualizationObjectExtendedFilter): filter is IVisualizationObjectMeasureValueFilter;
/**
 * @public
 */
export declare function isVisualizationObjectRankingFilter(filter: VisualizationObjectExtendedFilter): filter is IVisualizationObjectRankingFilter;
/**
 * @public
 */
export declare function isVisualizationObjectAbsoluteDateFilter(filter: VisualizationObjectDateFilter): filter is IVisualizationObjectAbsoluteDateFilter;
/**
 * @public
 */
export declare function isVisualizationObjectRelativeDateFilter(filter: VisualizationObjectDateFilter): filter is IVisualizationObjectRelativeDateFilter;
//# sourceMappingURL=GdcVisualizationObject.d.ts.map