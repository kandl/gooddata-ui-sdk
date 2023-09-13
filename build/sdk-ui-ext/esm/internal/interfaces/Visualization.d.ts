import { IAnalyticalBackend, IExecutionFactory, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { ISettings, ITheme, IColorPalette, IInsight, IInsightDefinition, ITotal, ObjRef, VisualizationProperties, IExecutionConfig, LocalIdRef, ISortItem, ISeparators } from "@gooddata/sdk-model";
import { ChartType, GoodDataSdkError, ExplicitDrill, IDrillEvent, ILocale, IPushData, IVisualizationCallbacks, OverTimeComparisonType, VisualizationEnvironment, IOpenAsReportUiConfig } from "@gooddata/sdk-ui";
import { IAvailableSortsGroup, ISortConfig } from "./SortConfig.js";
import { IDefaultControlProperties } from "./ControlProperties.js";
export type RenderFunction = (component: any, target: Element) => void;
export type UnmountFunction = (elementsOrSelectors?: (string | HTMLElement)[]) => void;
export type ElementSelectorFunction = () => HTMLElement | null;
export interface IVisConstruct {
    backend: IAnalyticalBackend;
    projectId: string;
    element: ElementSelectorFunction;
    configPanelElement: ElementSelectorFunction;
    callbacks: IVisCallbacks;
    environment?: VisualizationEnvironment;
    locale?: ILocale;
    featureFlags?: ISettings;
    visualizationProperties: VisualizationProperties;
    renderFun: RenderFunction;
    unmountFun: UnmountFunction;
}
export interface ICustomProps {
    drillableItems?: ExplicitDrill[];
    totalsEditAllowed?: boolean;
    lastSavedVisClassUrl?: string;
}
export interface IDimensions {
    width?: number;
    height: number;
}
/**
 * @alpha
 */
export interface IVisProps {
    dimensions?: IDimensions;
    custom?: ICustomProps;
    locale?: ILocale;
    dateFormat?: string;
    config?: IGdcConfig;
    executionConfig?: IExecutionConfig;
    theme?: ITheme;
    customVisualizationConfig?: any;
}
export interface IVisualizationOptions {
    dateOptionsDisabled: boolean;
}
export interface IVisCallbacks extends IVisualizationCallbacks {
    pushData(data: IPushData, options?: IVisualizationOptions): void;
}
export interface IBucketFilterElement {
    title: string;
    uri: string;
}
export type ComparisonConditionOperator = "GREATER_THAN" | "GREATER_THAN_OR_EQUAL_TO" | "LESS_THAN" | "LESS_THAN_OR_EQUAL_TO" | "EQUAL_TO" | "NOT_EQUAL_TO";
export interface IComparisonCondition {
    readonly comparison: {
        readonly operator: ComparisonConditionOperator;
        readonly value: number;
    };
}
export type RangeConditionOperator = "BETWEEN" | "NOT_BETWEEN";
export interface IRangeCondition {
    readonly range: {
        readonly operator: RangeConditionOperator;
        readonly from: number;
        readonly to: number;
    };
}
export type IMeasureValueFilterCondition = IComparisonCondition | IRangeCondition;
export interface IBucketFilterInterval {
    granularity: string;
    interval: string[];
    name: string;
}
export interface IAttributeFilter {
    attribute: string;
    isInverted: boolean;
    totalElementsCount: number;
    displayFormRef: ObjRef;
    selectedElements: Array<{
        title: string;
        uri: string;
    }>;
}
export declare const DATE_DATASET_ATTRIBUTE = "attr.datedataset";
export interface IDateFilter {
    attribute: "attr.datedataset";
    overTimeComparisonType: OverTimeComparisonType;
    interval: {
        granularity: string;
        interval: [string, string] | [number, number];
        name: string;
        type: "relative" | "absolute";
    };
}
export interface IMeasureValueFilter {
    measureLocalIdentifier: string;
    condition?: IMeasureValueFilterCondition;
}
export type RankingFilterOperator = "TOP" | "BOTTOM";
export interface IRankingFilter {
    measure: string;
    attributes?: string[];
    operator: RankingFilterOperator;
    value: number;
}
export type IBucketFilter = IAttributeFilter | IDateFilter | IMeasureValueFilter | IRankingFilter;
export interface ISort {
    direction: "asc" | "desc";
}
export interface IDisplayForm {
    id: string;
    ref: ObjRef;
    type: string;
    title: string;
    isDefault?: boolean;
}
export interface IBucketItem {
    localIdentifier: string;
    type?: string;
    aggregation?: boolean;
    attribute?: string;
    filters?: IBucketFilter[];
    format?: string;
    granularity?: string;
    showInPercent?: boolean;
    showOnSecondaryAxis?: boolean;
    isTotalMeasure?: boolean;
    sort?: ISort;
    masterLocalIdentifier?: string;
    overTimeComparisonType?: OverTimeComparisonType;
    operandLocalIdentifiers?: Array<string | null> | null;
    operator?: string | null;
    dfRef?: ObjRef;
    locationDisplayFormRef?: ObjRef;
    dateDatasetRef?: ObjRef;
    displayForms?: IDisplayForm[];
}
export interface IFiltersBucketItem extends IBucketItem {
    autoCreated?: boolean;
}
export interface IBucketOfFun {
    localIdentifier: string;
    items: IBucketItem[];
    totals?: ITotal[];
    chartType?: string;
}
export interface IFilters {
    localIdentifier: "filters";
    items: IFiltersBucketItem[];
}
export interface IRecommendations {
    [key: string]: boolean;
}
export interface IBucketUiConfig {
    accepts?: string[];
    canAddItems?: boolean;
    warningMessage?: string;
    title?: string;
    subtitle?: string;
    icon?: string;
    allowsDuplicateItems?: boolean;
    allowsDuplicateDates?: boolean;
    allowsReordering?: boolean;
    allowsSwapping?: boolean;
    enabled?: boolean;
    itemsLimit?: number;
    itemsLimitByType?: {
        date?: number;
        metric?: number;
        fact?: number;
        attribute?: number;
    };
    isShowInPercentEnabled?: boolean;
    isShowInPercentVisible?: boolean;
    isShowOnSecondaryAxisVisible?: boolean;
    allowShowOnSecondaryAxis?: boolean;
    allowSelectChartType?: boolean;
    allowOptionalStacking?: boolean;
    isTotalMeasureVisible?: boolean;
    isTotalMeasureEnabled?: boolean;
    preferSynchronizedDates?: boolean;
}
export interface IBucketsUiConfig {
    [localIdentifier: string]: IBucketUiConfig;
}
export interface IExportUiConfig {
    supported?: boolean;
}
export interface INoMetricUiConfig {
    supported?: boolean;
}
export interface ICustomError {
    heading: string;
    text: string;
}
export interface IOptionalStacking {
    supported?: boolean;
    disabled?: boolean;
    stackMeasures?: boolean;
    stackMeasuresToPercent?: boolean;
    canStackInPercent?: boolean;
}
export interface ISupportedLocationIcon {
    supported?: boolean;
}
export interface IUiConfig {
    buckets: IBucketsUiConfig;
    recommendations?: IRecommendations;
    exportConfig?: IExportUiConfig;
    noMetricAccepted?: INoMetricUiConfig;
    openAsReport?: IOpenAsReportUiConfig;
    customError?: ICustomError;
    supportedOverTimeComparisonTypes?: OverTimeComparisonType[];
    supportedChartTypes?: ChartType[];
    axis?: string;
    optionalStacking?: IOptionalStacking;
    supportedLocationIcon?: ISupportedLocationIcon;
}
export interface IVisualizationProperties<ControlProperties extends IDefaultControlProperties = IDefaultControlProperties> {
    sortItems?: ISortItem[];
    controls?: IDefaultControlProperties & ControlProperties;
    [property: string]: any;
}
export interface IReferencePoint {
    buckets: IBucketOfFun[];
    filters: IFilters;
    properties?: IVisualizationProperties;
    availableSorts?: IAvailableSortsGroup[];
}
export interface IReferences {
    [identifier: string]: string;
}
export interface IExtendedReferencePoint extends IReferencePoint {
    uiConfig: IUiConfig;
}
/**
 * @alpha
 */
export interface IVisualization {
    /**
     * Update and re-render visualization to reflect change of insight state.
     *
     * Currently it is possible that context (AD/KD) will send insight that is not in a valid state:
     *
     * -  insight might be empty
     * -  insight might not be completely defined (user did not yet specify measures etc)
     *
     * It is the responsibility of the implementation to verify the state of insight during the update and
     * if there is anything amiss communicate with the context using the onError callback which it
     * received during construction time via {@link IVisConstruct}
     *
     * The loading state of the visualization must be communicated using the onLoadingChanged callback which
     * is also passed during construction time.
     *
     * @param props - some runtime properties
     * @param insight - new state of insight
     * @param insightPropertiesMeta - new state of insight properties meta
     * @param executionFactory - execution factory to use when triggering calculation on backend
     */
    update(props: IVisProps, insight: IInsightDefinition, insightPropertiesMeta: any, executionFactory: IExecutionFactory): void;
    /**
     * Get visualization execution based on provided props, insight and execution factory.
     *
     * @param props - visualization properties
     * @param insight - insight to be executed
     * @param executionFactory - execution factory to use when triggering calculation on backend
     */
    getExecution(props: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): IPreparedExecution;
    unmount(): void;
    addNewDerivedBucketItems(referencePoint: IReferencePoint, newDerivedBucketItems: IBucketItem[]): Promise<IReferencePoint>;
    /**
     * Called every time the reference point or the visualization class change
     * to allow visualizations to get updated ExtendedReferencePoint.
     * @param referencePoint - The new value of the reference point.
     * @param previousReferencePoint - The previous value of the reference point.
     * This value is only provided if the visualization class was not changed
     * (i. e. both points are related to the same visualization class).
     * @returns Promise of the new ExtendedReferencePoint.
     */
    getExtendedReferencePoint(referencePoint: IReferencePoint, previousReferencePoint?: IReferencePoint): Promise<IExtendedReferencePoint>;
    /**
     * Called when the Drill Down is performed, used to get the Drill Down target {@link IInsight} instance.
     *
     * The exact contract depends on individual {@link IInsight} type, but generally it should replace
     * the drilled attribute with the Drill Down target target attribute and include the filters from the
     * drill event into the returned {@link IInsight}.
     *
     * @param source - {@link IInsight} to be used for the the Drill Down execution
     * @param drillDownContext - Drill Down configuration used to properly create the result
     * @param backendSupportsElementUris - whether current backend supports elements by uri. Affects how filters for insight are created
     * @returns `source` as the Drill Down target {@link IInsight}
     */
    getInsightWithDrillDownApplied(source: IInsight, drillDownContext: IDrillDownContext, backendSupportsElementUris: boolean): IInsight;
    /**
     * Called whenever inputs for default sorts calculation changed and it should provide current sort and also all valid available sorts for actual reference point/properties
     * @param referencePoint - the reference point for which the sort config needs to be evaluated
     */
    getSortConfig(referencePoint: IReferencePoint): Promise<ISortConfig>;
    /**
     * Called whenever props of visualization changed. Detects if some of properties which affect also reference point did change. If so, reference point will be then recalculated.
     * @param currentReferencePoint - the current reference point
     * @param nextReferencePoint - the new reference point
     */
    haveSomePropertiesRelevantForReferencePointChanged(currentReferencePoint: IReferencePoint, nextReferencePoint: IReferencePoint): boolean;
}
export interface IGdcConfig {
    separators?: ISeparators;
    colorPalette?: IColorPalette;
    isExportMode?: boolean;
    isInEditMode?: boolean;
    mapboxToken?: string;
    maxWidth?: number;
    maxHeight?: number;
    forceDisableDrillOnAxes?: boolean;
}
/**
 * Class name of element where pluggable visualization is supposed to render its configuration
 * panels.
 *
 * @alpha
 */
export declare const ConfigPanelClassName = "gd-configuration-panel-content";
/**
 * @alpha
 */
export declare const PluggableVisualizationErrorCodes: {
    /**
     * If pluggable visualization is asked to render itself but its buckets do not contain the right 'stuff',
     * then this is the error code to communicate the fact.
     */
    INVALID_BUCKETS: string;
    /**
     * This error means that empty AFM was went to the GoodData.UI and as such can't be executed.
     */
    EMPTY_AFM: string;
};
/**
 * @alpha
 */
export type PluggableVisualizationErrorType = keyof typeof PluggableVisualizationErrorCodes;
/**
 * @alpha
 */
export declare class InvalidBucketsSdkError extends GoodDataSdkError {
    readonly pveType: PluggableVisualizationErrorType;
    constructor(cause?: Error);
    getErrorCode(): string;
}
/**
 * @alpha
 */
export declare class EmptyAfmSdkError extends GoodDataSdkError {
    readonly pveType: PluggableVisualizationErrorType;
    constructor(cause?: Error);
    getErrorCode(): string;
}
/**
 * @alpha
 */
export type PluggableVisualizationError = InvalidBucketsSdkError | EmptyAfmSdkError;
/**
 * @alpha
 */
export declare function isPluggableVisualizationError(obj: unknown): obj is PluggableVisualizationError;
/**
 * @alpha
 */
export declare function isInvalidBuckets(obj: unknown): obj is InvalidBucketsSdkError;
/**
 * @alpha
 */
export declare function isEmptyAfm(obj: unknown): obj is EmptyAfmSdkError;
/**
 * Implicit drill down context
 *
 * @alpha
 */
export interface IDrillDownContext {
    drillDefinition: IDrillDownDefinition;
    event: IDrillEvent;
}
/**
 * Information about the DrillDown interaction - the attribute that is next in the drill down hierarchy.
 * @beta
 */
export interface IDrillDownDefinition {
    type: "drillDown";
    /**
     * Local identifier of the attribute that triggered the drill down.
     */
    origin: LocalIdRef;
    /**
     * Target attribute display form for drill down.
     */
    target: ObjRef;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillDownDefinition}.
 * @beta
 */
export declare function isDrillDownDefinition(obj: unknown): obj is IDrillDownDefinition;
//# sourceMappingURL=Visualization.d.ts.map