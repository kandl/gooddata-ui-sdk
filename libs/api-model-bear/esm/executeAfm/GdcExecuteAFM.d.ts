import { Identifier, SortDirection, MeasureAggregation, TotalType, ArithmeticMeasureOperator, ObjQualifier, MeasureValueFilterCondition, RankingFilterOperator, Qualifier, IPreviousPeriodDateDataSet } from "../base/GdcTypes.js";
/**
 * @public
 */
export interface IExecution {
    execution: {
        afm: IAfm;
        resultSpec?: IResultSpec;
    };
}
/**
 * @public
 */
export interface IAfm {
    attributes?: IAttribute[];
    measures?: IMeasure[];
    filters?: CompatibilityFilter[];
    nativeTotals?: INativeTotalItem[];
}
/**
 * @public
 */
export interface IResultSpec {
    dimensions?: IDimension[];
    sorts?: SortItem[];
}
/**
 * @public
 */
export interface IAttribute {
    localIdentifier: Identifier;
    displayForm: ObjQualifier;
    alias?: string;
}
/**
 * @public
 */
export interface IMeasure {
    localIdentifier: Identifier;
    definition: MeasureDefinition;
    alias?: string;
    format?: string;
}
/**
 * @public
 */
export type MeasureDefinition = ISimpleMeasureDefinition | IArithmeticMeasureDefinition | IPopMeasureDefinition | IPreviousPeriodMeasureDefinition;
/**
 * @public
 */
export interface ISimpleMeasureDefinition {
    measure: ISimpleMeasure;
}
/**
 * @public
 */
export interface IArithmeticMeasureDefinition {
    arithmeticMeasure: IArithmeticMeasure;
}
/**
 * @public
 */
export interface IPopMeasureDefinition {
    popMeasure: IPopMeasure;
}
/**
 * @public
 */
export interface IPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: IPreviousPeriodMeasure;
}
/**
 * @public
 */
export interface ISimpleMeasure {
    item: ObjQualifier;
    aggregation?: MeasureAggregation;
    filters?: FilterItem[];
    computeRatio?: boolean;
}
/**
 * @public
 */
export interface IArithmeticMeasure {
    measureIdentifiers: Identifier[];
    operator: ArithmeticMeasureOperator;
}
/**
 * @public
 */
export interface IPopMeasure {
    measureIdentifier: Identifier;
    popAttribute: ObjQualifier;
}
/**
 * @public
 */
export interface IPreviousPeriodMeasure {
    measureIdentifier: Identifier;
    dateDataSets: IPreviousPeriodDateDataSet[];
}
/**
 * @public
 */
export type ExtendedFilter = FilterItem | IMeasureValueFilter | IRankingFilter;
/**
 * @public
 */
export type CompatibilityFilter = IExpressionFilter | ExtendedFilter;
/**
 * @public
 */
export type FilterItem = DateFilterItem | AttributeFilterItem;
/**
 * @public
 */
export type AttributeFilterItem = IPositiveAttributeFilter | INegativeAttributeFilter;
/**
 * @public
 */
export type DateFilterItem = IAbsoluteDateFilter | IRelativeDateFilter;
/**
 * @public
 */
export interface IAttributeElementsByRef {
    uris: string[];
}
/**
 * @public
 */
export interface IAttributeElementsByValue {
    values: string[];
}
/**
 * @public
 */
export type AttributeElements = string[] | IAttributeElementsByRef | IAttributeElementsByValue;
/**
 * @public
 */
export interface IPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: AttributeElements;
    };
}
/**
 * @public
 */
export interface INegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: AttributeElements;
    };
}
/**
 * @public
 */
export interface IAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet: ObjQualifier;
        from: string;
        to: string;
    };
}
/**
 * @public
 */
export interface IRelativeDateFilter {
    relativeDateFilter: {
        dataSet: ObjQualifier;
        granularity: string;
        from: number;
        to: number;
    };
}
/**
 * @public
 */
export interface IMeasureValueFilter {
    measureValueFilter: {
        measure: Qualifier;
        condition?: MeasureValueFilterCondition;
    };
}
/**
 * @public
 */
export interface IRankingFilter {
    rankingFilter: {
        measures: Qualifier[];
        attributes?: Qualifier[];
        operator: RankingFilterOperator;
        value: number;
    };
}
/**
 * @public
 * @deprecated Expression filter in AFM can be used only by legacy code
 */
export interface IExpressionFilter {
    expression: {
        value: string;
    };
}
/**
 * @public
 */
export interface ITotalItem {
    measureIdentifier: Identifier;
    type: TotalType;
    attributeIdentifier: Identifier;
}
/**
 * @public
 */
export interface INativeTotalItem {
    measureIdentifier: Identifier;
    attributeIdentifiers: Identifier[];
}
/**
 * @public
 */
export interface IDimension {
    itemIdentifiers: Identifier[];
    totals?: ITotalItem[];
}
/**
 * @public
 */
export type SortItem = IAttributeSortItem | IMeasureSortItem;
/**
 * @public
 */
export interface IAttributeSortItem {
    attributeSortItem: {
        direction: SortDirection;
        attributeIdentifier: Identifier;
        aggregation?: "sum";
    };
}
/**
 * @public
 */
export type VisualizationStyleType = "common" | "table" | "line" | "column" | "bar" | "area";
/**
 * @public
 */
export interface IVisualizationStyle {
    visualizationStyle: {
        type: VisualizationStyleType;
        colorPalette: {
            measure?: {
                color: string;
                periodOverPeriod: string;
            };
            stack?: any;
        };
    };
}
/**
 * @public
 */
export interface IMeasureSortItem {
    measureSortItem: {
        direction: SortDirection;
        locators: LocatorItem[];
    };
}
/**
 * @public
 */
export type LocatorItem = IAttributeLocatorItem | IMeasureLocatorItem;
/**
 * @public
 */
export interface IAttributeLocatorItem {
    attributeLocatorItem: {
        attributeIdentifier: Identifier;
        element: string;
    };
}
/**
 * @public
 */
export interface IMeasureLocatorItem {
    measureLocatorItem: {
        measureIdentifier: Identifier;
    };
}
/**
 * @public
 */
export declare function isSimpleMeasureDefinition(definition: MeasureDefinition): definition is ISimpleMeasureDefinition;
/**
 * @public
 */
export declare function isArithmeticMeasureDefinition(definition: MeasureDefinition): definition is IArithmeticMeasureDefinition;
/**
 * @public
 */
export declare function isPopMeasureDefinition(definition: MeasureDefinition): definition is IPopMeasureDefinition;
/**
 * @public
 */
export declare function isPreviousPeriodMeasureDefinition(definition: MeasureDefinition): definition is IPreviousPeriodMeasureDefinition;
/**
 * @public
 */
export declare function isAttributeSortItem(sortItem: SortItem): sortItem is IAttributeSortItem;
/**
 * @public
 */
export declare function isMeasureSortItem(sortItem: SortItem): sortItem is IMeasureSortItem;
/**
 * @public
 */
export declare function isAttributeLocatorItem(locator: LocatorItem): locator is IAttributeLocatorItem;
/**
 * @public
 */
export declare function isMeasureLocatorItem(locator: LocatorItem): locator is IMeasureLocatorItem;
/**
 * @public
 */
export declare function isDateFilter(filter: CompatibilityFilter): filter is DateFilterItem;
/**
 * @public
 */
export declare function isRelativeDateFilter(filter: CompatibilityFilter): filter is IRelativeDateFilter;
/**
 * @public
 */
export declare function isAbsoluteDateFilter(filter: CompatibilityFilter): filter is IAbsoluteDateFilter;
/**
 * @public
 */
export declare function isAttributeFilter(filter: CompatibilityFilter): filter is AttributeFilterItem;
/**
 * @public
 */
export declare function isPositiveAttributeFilter(filter: CompatibilityFilter): filter is IPositiveAttributeFilter;
/**
 * @public
 */
export declare function isNegativeAttributeFilter(filter: CompatibilityFilter): filter is INegativeAttributeFilter;
/**
 * @public
 */
export declare function isMeasureValueFilter(filter: CompatibilityFilter): filter is IMeasureValueFilter;
/**
 * @public
 */
export declare function isRankingFilter(filter: CompatibilityFilter): filter is IRankingFilter;
/**
 * @public
 */
export declare function isExpressionFilter(filter: CompatibilityFilter): filter is IExpressionFilter;
/**
 * @public
 */
export declare function isAttributeElementsArray(attributeElements: AttributeElements): attributeElements is string[];
/**
 * @public
 */
export declare function isAttributeElementsByRef(attributeElements: AttributeElements): attributeElements is IAttributeElementsByRef;
/**
 * @public
 */
export declare function isAttributeElementsByValue(attributeElements: AttributeElements): attributeElements is IAttributeElementsByValue;
//# sourceMappingURL=GdcExecuteAFM.d.ts.map