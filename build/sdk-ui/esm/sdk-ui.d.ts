/**
 * This package provides base functionality useful for building React visualizations on top of GoodData.
 *
 * @remarks
 * The functionality includes functions for getting data from the Analytical Backend,
 * components and React hooks that serve as building blocks for custom visualizations,
 * visualization definition placeholders, support for drilling, and so on.
 *
 * See the other `@gooddata/sdk-ui-*` packages (for example, `@gooddata/sdk-ui-charts`) for pre-built visualizations
 * that you can use instead of building your own.
 *
 * @packageDocumentation
 */

/// <reference types="react" />

import { AuthenticationFlow } from '@gooddata/sdk-backend-spi';
import { ComponentType } from 'react';
import { DataValue } from '@gooddata/sdk-model';
import { DependencyList } from 'react';
import { IAbsoluteDateFilter } from '@gooddata/sdk-model';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttribute } from '@gooddata/sdk-model';
import { IAttributeDescriptor } from '@gooddata/sdk-model';
import { IAttributeFilter } from '@gooddata/sdk-model';
import { IAttributeOrMeasure } from '@gooddata/sdk-model';
import { IBucket } from '@gooddata/sdk-model';
import { IColor } from '@gooddata/sdk-model';
import { IColorDescriptor } from '@gooddata/sdk-model';
import { IColorPalette } from '@gooddata/sdk-model';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { IDateFilter } from '@gooddata/sdk-model';
import { IDimension } from '@gooddata/sdk-model';
import { IDimensionDescriptor } from '@gooddata/sdk-model';
import { IDimensionItemDescriptor } from '@gooddata/sdk-model';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IExecutionResult } from '@gooddata/sdk-backend-spi';
import { IExportConfig } from '@gooddata/sdk-backend-spi';
import { IExportResult } from '@gooddata/sdk-backend-spi';
import { IFilter } from '@gooddata/sdk-model';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { IMeasure } from '@gooddata/sdk-model';
import { IMeasureDefinitionType } from '@gooddata/sdk-model';
import { IMeasureDescriptor } from '@gooddata/sdk-model';
import { IMeasureFilter } from '@gooddata/sdk-model';
import { IMeasureGroupDescriptor } from '@gooddata/sdk-model';
import { IMeasureValueFilter } from '@gooddata/sdk-model';
import { INegativeAttributeFilter } from '@gooddata/sdk-model';
import { IntlShape } from 'react-intl';
import { INullableFilter } from '@gooddata/sdk-model';
import { IPagedResource } from '@gooddata/sdk-backend-spi';
import { IPositiveAttributeFilter } from '@gooddata/sdk-model';
import { IPreparedExecution } from '@gooddata/sdk-backend-spi';
import { IRankingFilter } from '@gooddata/sdk-model';
import { IRelativeDateFilter } from '@gooddata/sdk-model';
import { IResultAttributeHeader } from '@gooddata/sdk-model';
import { IResultAttributeHeaderItem } from '@gooddata/sdk-model';
import { IResultHeader } from '@gooddata/sdk-model';
import { IResultMeasureHeader } from '@gooddata/sdk-model';
import { IResultTotalHeader } from '@gooddata/sdk-model';
import { IResultWarning } from '@gooddata/sdk-model';
import { ISeparators } from '@gooddata/sdk-model';
import { ISortItem } from '@gooddata/sdk-model';
import { ITotal } from '@gooddata/sdk-model';
import { ITotalDescriptor } from '@gooddata/sdk-model';
import { IWorkspaceSettings } from '@gooddata/sdk-backend-spi';
import { MessageDescriptor } from 'react-intl';
import { ObjRef } from '@gooddata/sdk-model';
import { default as React_2 } from 'react';
import { ValueOrUpdateCallback } from '@gooddata/sdk-backend-base';
import { WithIntlProps } from 'react-intl';
import { WrappedComponentProps } from 'react-intl';

/**
 * Generate all possible combinations of arrays signatures for the union type.
 *
 * @example
 * ```
 * IAttribute | IMeasure is resolved as IAttribute[] | IMeasure[] | (IAttribute | IMeasure)[]
 * ```
 *
 * @public
 */
export declare type AnyArrayOf<T> = T[] | ArrayOf<T>;

/**
 * Represents all possible measure signatures.
 *
 * @public
 */
export declare type AnyMeasure = IMeasure | MeasureOf<IMeasureDefinitionType>;

/**
 * Any placeholder type - placeholder or composed placeholder.
 * @public
 */
export declare type AnyPlaceholder<T = any> = IPlaceholder<T> | IComposedPlaceholder<T, any, any>;

/**
 * Generate all possible combinations of placeholder signatures for the union type.
 *
 * @example
 * ```
 * IAttribute | IMeasure
 * is resolved as
 * AnyPlaceholder\<IAttribute\> | AnyPlaceholder\<IMeasure\> | AnyPlaceholder\<IAttribute | IMeasure\>
 * ```
 * @public
 */
export declare type AnyPlaceholderOf<T> = AnyPlaceholder<T> | PlaceholderOf<T>;

/**
 * Factory that builds formatted localized titles of arithmetic measures.
 * The title is used during AFM execution and for bucket item titles.
 *
 * @internal
 */
export declare class ArithmeticMeasureTitleFactory {
    private readonly locale;
    /**
     * Create a new instance of the class.
     * @param locale - The locale used for translation.
     */
    constructor(locale: ILocale);
    /**
     * Returns formatted localized title string for arithmetic measure.
     *
     * @param arithmeticMeasureProps - The properties of arithmetic measure for which
     *      the title must be obtained.
     * @param measureTitleProps - The array of objects in which the title of master measures used
     *      in arithmetic measure is looked up.
     * @returns localized title of the arithmetic measure or null when arithmetic measure references invalid
     *      master measures or invalid number of master measures.
     */
    getTitle(arithmeticMeasureProps: IArithmeticMeasureTitleProps, measureTitleProps: IMeasureTitleProps[]): string | null;
    private getTitleLocalizationKey;
    private getMasterMeasureTitles;
    private findMeasureTitle;
    private translateKey;
}

/**
 * Wrap each member of union type in the array.
 *
 * @example
 * ```
 * IAttribute | IMeasure | IFilter is resolved as IAttribute[] | IMeasure[] | IFilter[]
 * ```
 * @public
 */
export declare type ArrayOf<T> = T extends any ? T[] : never;

/**
 * Alias for all possible attribute filter or placeholder signatures.
 *
 * @public
 */
export declare type AttributeFilterOrPlaceholder = ValueOrPlaceholder<IAttributeFilter> | ValueOrPlaceholder<IPositiveAttributeFilter> | ValueOrPlaceholder<INegativeAttributeFilter>;

/**
 * Alias for all possible attribute filters or their placeholder signatures.
 *
 * @public
 */
export declare type AttributeFiltersOrPlaceholders = Array<ValueOrMultiValuePlaceholder<IAttributeFilter> | ValueOrMultiValuePlaceholder<IPositiveAttributeFilter> | ValueOrMultiValuePlaceholder<INegativeAttributeFilter>>;

/**
 * Creates a predicate that return true for any attribute result header with the provided name.
 *
 * @public
 */
export declare function attributeItemNameMatch(name: string): IHeaderPredicate;

/**
 * Alias for all possible attribute, measure or placeholder signatures.
 *
 * @public
 */
export declare type AttributeMeasureOrPlaceholder = ValueOrPlaceholder<IAttribute | AnyMeasure> | ValueOrPlaceholder<IAttribute> | ValueOrPlaceholder<AnyMeasure>;

/**
 * Alias for all possible attribute or placeholder signatures.
 *
 * @public
 */
export declare type AttributeOrPlaceholder = ValueOrPlaceholder<IAttribute>;

/**
 * Alias for all possible attributes, measures or their placeholders signatures.
 *
 * @public
 */
export declare type AttributesMeasuresOrPlaceholders = Array<ValueOrMultiValuePlaceholder<IAttribute | AnyMeasure> | ValueOrMultiValuePlaceholder<IAttribute> | ValueOrMultiValuePlaceholder<AnyMeasure>>;

/**
 * Alias for all possible attributes or their placeholder signatures.
 *
 * @public
 */
export declare type AttributesOrPlaceholders = ValuesOrPlaceholders<IAttribute>;

/**
 * BackendProvider can be used to inject analytical backend instance to all ui-sdk components in your app.
 *
 * @public
 */
export declare const BackendProvider: React_2.FC<IBackendProviderProps>;

/**
 * This error means that server could not understand the request due to invalid syntax.
 *
 * @public
 */
export declare class BadRequestSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * @internal
 */
export declare type BucketNameKeys = keyof typeof BucketNames;

/**
 * Standard bucket names used in the different visualizations.
 * @internal
 */
export declare const BucketNames: {
    readonly MEASURES: "measures";
    readonly SECONDARY_MEASURES: "secondary_measures";
    readonly TERTIARY_MEASURES: "tertiary_measures";
    readonly ATTRIBUTE: "attribute";
    readonly ATTRIBUTES: "attributes";
    readonly ATTRIBUTE_FROM: "attribute_from";
    readonly ATTRIBUTE_TO: "attribute_to";
    readonly VIEW: "view";
    readonly STACK: "stack";
    readonly TREND: "trend";
    readonly SEGMENT: "segment";
    readonly COLUMNS: "columns";
    readonly LOCATION: "location";
    readonly LONGITUDE: "longitude";
    readonly LATITUDE: "latitude";
    readonly SIZE: "size";
    readonly COLOR: "color";
    readonly TOOLTIP_TEXT: "tooltipText";
};

/**
 * @internal
 */
export declare type BucketNameValues = typeof BucketNames[BucketNameKeys];

/**
 * @internal
 */
export declare class CancelError extends Error {
    reason?: string | undefined;
    constructor(reason?: string | undefined);
    /**
     * Underlying cause of this error (if any).
     */
    getReason(): string | undefined;
}

/**
 * This error means that request has been cancelled usually after component has been unmounted.
 *
 * @public
 */
export declare class CancelledSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * @public
 */
export declare type ChartElementType = "slice" | "bar" | "point" | "label" | "cell" | "target" | "primary" | "comparative";

/**
 * @public
 */
export declare type ChartType = "bar" | "column" | "pie" | "line" | "area" | "donut" | "scatter" | "bubble" | "heatmap" | "geo" | "pushpin" | "combo" | "combo2" | "histogram" | "bullet" | "treemap" | "waterfall" | "funnel" | "pyramid" | "pareto" | "alluvial" | "sankey" | "dependencywheel";

/**
 * ClientWorkspaceProvider can be used as a replacement of the {@link WorkspaceProvider},
 * if you want to work with the workspace in LCM context.
 *
 * It allows you to:
 * - Use dataProduct and client identifier as a replacement of the workspace identifier.
 *   Workspace identifier is resolved and provided to the {@link WorkspaceProvider} automatically.
 *
 * - Use workspace identifier to obtain dataProduct, client and segment identifiers by the {@link useClientWorkspaceIdentifiers} hooks.
 *
 * If the backend does not support clientId / dataProduct LCM provisioning,
 * or the workspace is not provisioned via LCM, segment / client / dataProduct values will be undefined.
 *
 * To read more details about LCM, see: {@link https://help.gooddata.com/pages/viewpage.action?pageId=86796865}
 *
 * @alpha
 */
export declare const ClientWorkspaceProvider: React_2.FC<IClientWorkspaceProviderProps>;

/**
 * Creates a new predicate that returns true of any arithmetic measure where measure with the provided identifier
 * is used as an operand.
 *
 * @public
 */
export declare function composedFromIdentifier(identifier: string): IHeaderPredicate;

/**
 * Creates a new predicate that returns true of any arithmetic measure where measure with the provided URI
 * is used as an operand.
 *
 * @public
 */
export declare function composedFromUri(uri: string): IHeaderPredicate;

/**
 * Get composed placeholder resolution context type.
 *
 * @example
 * ```
 * IComposedPlaceholder\<any, any, IResolutionContext\> is resolved as IResolutionContext
 * ```
 *
 * @public
 */
export declare type ComposedPlaceholderResolutionContext<T> = T extends IComposedPlaceholder<any, any, infer TContext> ? TContext : any;

/**
 * @internal
 */
export declare function convertDrillableItemsToPredicates(drillableItems: ExplicitDrill[]): IHeaderPredicate[];

/**
 * Converts any error into an instance of {@link GoodDataSdkError}.
 *
 * @remarks
 * The conversion logic right now focuses mostly on errors that are contractually specified in Analytical Backend SPI.
 * All other unexpected errors are wrapped into an exception with the generic 'UNKNOWN_ERROR' code.
 *
 * Instances of GoodDataSdkError are returned as-is and are not subject to any processing.
 *
 * @param error - error to convert
 * @returns new instance of GoodDataSdkError
 * @public
 */
export declare function convertError(error: unknown): GoodDataSdkError;

/**
 * Creates function that should be passed to onExportReady in the event that the backend execution
 * fails and export is not possible.
 *
 * @param error - the execution error
 * @internal
 */
export declare function createExportErrorFunction(error: GoodDataSdkError): IExportFunction;

/**
 * Creates function to export data in the provided result. This function is typically passed by visualization
 * components via the onExportReady callback.
 *
 * @param result - data view that will be exported
 * @param exportTitle - specify title
 * @internal
 */
export declare function createExportFunction(result: IExecutionResult, exportTitle?: string): IExportFunction;

/**
 * @internal
 */
export declare function createIntlMock(customMessages?: {}, locale?: string): IntlShape;

/**
 * Creates value formatter that uses `@gooddata/number-formatter` to format raw measure values according
 * to the format string.
 *
 * @remarks
 * By default, the format will strip away all the coloring information and
 * just return the value as string.
 *
 * @param separators - number separators to use. if not specified then `numberjs` defaults will be used
 * @public
 */
export declare function createNumberJsFormatter(separators?: ISeparators): ValueFormatter;

/**
 * @public
 */
export declare type DataAccessConfig = {
    /**
     * Function to use to format measure values.
     */
    valueFormatter: ValueFormatter;
    /**
     * Function to translate header names.
     */
    headerTranslator?: HeaderTranslator;
};

/**
 * Data Point represents a value computed for particular data series, possibly sliced for additional
 * set of attribute elements OR possibly being a total.
 *
 * @remarks
 * Technically, DataPoint is the raw data value stored in the data view decorated with all the metadata
 * there exists about that value.
 *
 * @public
 */
export declare type DataPoint = {
    /**
     * Unformatted value - as provided by the backend.
     */
    readonly rawValue: DataValue;
    /**
     * Formatted value - the raw value transformed according to the format set for the data
     * series to which this point belongs.
     */
    formattedValue(): null | string;
    /**
     * Coordinates into the data view. Coordinates are zero-based.
     */
    readonly coordinates: DataPointCoordinates;
    /**
     * Descriptor of data series to which this data point belongs.
     */
    readonly seriesDesc: DataSeriesDescriptor;
    /**
     * If the data series contains values for different data slices, then the description of the particular
     * slice is included here.
     */
    readonly sliceDesc?: DataSliceDescriptor;
    /**
     * Indicates whether the data point is for a subtotal.
     */
    readonly total?: boolean;
};

/**
 * @public
 */
export declare type DataPointCoordinates = number[];

/**
 * Full descriptive information about the data series.
 *
 * @public
 */
export declare type DataSeriesDescriptor = DataSeriesHeaders & DataSeriesDescriptorMethods & {
    /**
     * Unique identifier of the data series. This can be used to directly access this data series from data view.
     */
    readonly id: DataSeriesId;
    /**
     * Descriptor of the measure object whose computed values are in the data series. The descriptor
     * contains essential detail about the measure - its name as stored on backend, the intended format
     * for the values and references to the full object metadata.
     */
    readonly measureDescriptor: IMeasureDescriptor;
    /**
     * Definition of the measure whose computed values are in the data series.
     */
    readonly measureDefinition: IMeasure;
    /**
     * Descriptors of attributes whose elements are listed in the headers property. Cardinality of this
     * array is same as cardinality of the headers. For each header in the headers array, this array contains that
     * attribute's descriptor at the same index.
     */
    readonly attributeDescriptors?: IAttributeDescriptor[];
    /**
     * Definitions of attributes whose elements are listed in the headers property. Cardinality of this
     * array is the same as cardinality of the headers and attribute descriptors. For each attribute
     * descriptor in the `attributeDescriptors` array, this array contains that attribute's definition at
     * the same index.
     */
    readonly attributeDefinitions?: IAttribute[];
    /**
     * Identifies whether the Data Serie is part of sub-total.
     */
    readonly isSubtotal?: boolean;
    /**
     * Identifies whether the Data Serie is part of grand total.
     */
    readonly isTotal?: boolean;
};

/**
 * @public
 */
export declare type DataSeriesDescriptorMethods = {
    /**
     * @returns - title of measure used to compute the data points
     */
    measureTitle(): string;
    /**
     * @returns - intended format of the measure values; this value is indicated by the backend
     */
    measureFormat(): string;
    /**
     *
     * @returns - titles of attribute elements that are used to scope all data points in this series
     */
    scopeTitles(): Array<string | null>;
};

/**
 * @public
 */
export declare type DataSeriesHeaders = {
    /**
     * Header of the measure whose computed values are in the data series. This header contains the
     * title that is desired for display.
     */
    readonly measureHeader: IResultMeasureHeader;
    /**
     * If the data series measure is further scoped to values pertaining to particular attribute elements,
     * then headers of those elements are listed here.
     *
     * The order of appearance matches the dimension definition of the data view itself.
     */
    readonly attributeHeaders?: IResultAttributeHeader[];
};

/**
 * @public
 */
export declare type DataSeriesId = string;

/**
 * Full descriptive information of a data slice includes all attribute element and total headers for the slice and
 * next to them descriptors of attribute objects whose elements figure in the headers.
 *
 * @public
 */
export declare type DataSliceDescriptor = DataSliceHeaders & DataSliceDescriptorMethods & {
    /**
     * Unique identifier of the data slice. This can be used to directly access this data slice from data view.
     */
    readonly id: DataSliceId;
    /**
     * Descriptors of attributes whose elements are listed in the headers property.
     *
     * Cardinality of this array is same as cardinality of the headers. For each attribute header in the headers array,
     * this array contains the attribute's descriptor at the same index.
     */
    readonly descriptors: IAttributeDescriptor[];
    /**
     * Definitions of attributes whose elements are listed in the headers property.
     *
     * Cardinality of this array is same as cardinality of the descriptors. For each attribute descriptor in the
     * descriptors array, this array contains the respective attribute's definition at the same index.
     */
    readonly definitions: IAttribute[];
};

/**
 * @public
 */
export declare type DataSliceDescriptorMethods = {
    /**
     * @returns titles of attribute elements to which this data slice belongs
     */
    readonly sliceTitles: () => Array<string | null>;
};

/**
 * Data slice name is specified using the result headers.
 *
 * @remarks
 * The headers describe attribute elements (title+ID) for the slice. The slice MAY be for a total calculation,
 * in which case the last header will be for the
 * total.
 *
 * @public
 */
export declare type DataSliceHeaders = {
    /**
     * Headers of the attribute elements and/or totals for the data slice.
     */
    readonly headers: Array<IResultAttributeHeader | IResultTotalHeader>;
    /**
     * Indicates whether this data slice is a total.
     */
    readonly isTotal?: boolean;
};

/**
 * @public
 */
export declare type DataSliceId = string;

/**
 * This error means that processed request would generate a result too large to be processed
 * by GoodData platform.
 *
 * @public
 */
export declare class DataTooLargeToComputeSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * This error means that executed data were too large to be displayed by GoodData.UI.
 *
 * @public
 */
export declare class DataTooLargeToDisplaySdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * Wrapper for {@link @gooddata/sdk-backend-spi#IDataView}.
 *
 * @remarks
 * This provides various convenience methods to work with data and metadata stored inside
 * the provided instance of {@link @gooddata/sdk-backend-spi#IDataView}.
 *
 * The facade keeps an ephemeral state - such as calculated indexes on top of the headers in the {@link @gooddata/sdk-backend-spi#IDataView} -
 * to optimize performance of often-used lookups at the cost of extra memory.
 *
 * The facade is part of the public API and we strongly recommend to use it whenever client code needs to work with
 * data view; ideally, single instance of data view facade
 *
 * @public
 */
export declare class DataViewFacade {
    readonly dataView: IDataView;
    private static Facades;
    private static FacadesForResult;
    readonly definition: IExecutionDefinition;
    private definitionMethods;
    private resultMetaMethods;
    private resultDataMethods;
    private dataAccessMethods;
    protected constructor(dataView: IDataView);
    /**
     * @param dataView - instance of data view to create the facade for
     * @public
     */
    static for(dataView: IDataView): DataViewFacade;
    /**
     * Creates a DataViewFacade with provided execution result.
     *
     * @remarks
     * Only use this when execution result is unable to load data and some
     * form of DataViewFacade is still needed. Beware that the calculated data view is empty after the creation. Only execution
     * definition and result is defined.
     *
     * @param result - instance of execution result to create the facade for
     * @public
     */
    static forResult(result: IExecutionResult): DataViewFacade;
    /**
     * @returns result of execution which returned this data view
     * @public
     */
    result(): IExecutionResult;
    /**
     * @returns execution result warnings
     * @public
     */
    warnings(): IResultWarning[];
    /**
     * @remarks see {@link @gooddata/sdk-backend-spi#IDataView.fingerprint} for more contractual information
     * @returns fingerprint of the data view
     * @public
     */
    fingerprint(): string;
    /**
     * @returns methods to access data in a curated fashion using data slices and data series iterators
     * @public
     */
    data(config?: DataAccessConfig): IDataAccessMethods;
    /**
     * @returns methods to work with execution definition
     * @internal
     */
    def(): IExecutionDefinitionMethods;
    /**
     * @returns methods to work with result metadata
     * @internal
     */
    meta(): IResultMetaMethods;
    /**
     * @returns methods to work with the raw data included in the result
     * @internal
     */
    rawData(): IResultDataMethods;
}

/**
 * DataViewLoader allows you to speficy, load and access data results with convenient series and slices API.
 *
 * @alpha
 */
export declare class DataViewLoader {
    private readonly backend;
    private readonly workspace;
    private readonly options;
    private constructor();
    /**
     * Creates a new instance of the DataViewLoader for particular backend and workspace.
     *
     * @alpha
     */
    static for(backend: IAnalyticalBackend, workspace: string): DataViewLoader;
    /**
     * Data series will be built using the provided measures that are further scoped for
     * elements of the specified attributes.
     *
     * @remarks
     * You must define at least 1 measure for the series.
     *
     * @alpha
     */
    seriesFrom: (...measuresAndScopingAttributes: IAttributeOrMeasure[]) => DataViewLoader;
    /**
     * Slice all data series by elements of these attributes.
     *
     * @alpha
     */
    slicesFrom: (...attributes: IAttribute[]) => DataViewLoader;
    /**
     * Filters to apply on server side.
     *
     * @alpha
     */
    filterBy: (...filters: INullableFilter[]) => DataViewLoader;
    /**
     * Sorting to apply on server side.
     *
     * @alpha
     */
    sortBy: (...sorts: ISortItem[]) => DataViewLoader;
    /**
     * Include these totals among the data slices.
     *
     * @alpha
     */
    withTotals: (...totals: ITotal[]) => DataViewLoader;
    /**
     * Loads subset of the result data and wraps them in {@link DataViewFacade}.
     *
     * @alpha
     */
    loadWindow: (dataWindow: DataViewWindow) => Promise<DataViewFacade>;
    /**
     * Loads all the result data and wraps them in {@link DataViewFacade}.
     *
     * @alpha
     */
    loadAll: () => Promise<DataViewFacade>;
    private loadResult;
    private newLoaderWithOptions;
}

/**
 * Structure specifying a particular portion of data.
 * @public
 */
export declare type DataViewWindow = {
    /**
     * Zero-based offsets into the data.
     */
    offset: number[];
    /**
     * Size of the window to retrieve.
     */
    size: number[];
};

/**
 * Default value for {@link @gooddata/sdk-model#IColorPalette}.
 * @public
 */
export declare const DefaultColorPalette: IColorPalette;

/**
 * Default configuration for the data access methods. Uses default `@gooddata/number-formatter` formatter and no result formatting.
 *
 * @public
 */
export declare const DefaultDataAccessConfig: DataAccessConfig;

/**
 * Default error handler - logs error to console as error.
 *
 * @param error - error to log
 * @public
 */
export declare function defaultErrorHandler(error: unknown): void;

/**
 * Default value for {@link ILocale}.
 *
 * @public
 */
export declare const DefaultLocale: ILocale;

/**
 * Factory that builds formatted localized suffix string for derived measure based on the over time comparison type.
 * The suffix is used during AFM execution and for bucket item titles.
 *
 * @internal
 */
export declare class DerivedMeasureTitleSuffixFactory {
    private readonly locale;
    /**
     * Create a new instance of the class.
     * @param locale - The locale used for translation.
     */
    constructor(locale: ILocale);
    /**
     * Returns formatted localized suffix string for derived measure based on the over time comparison type.
     * In case when unsupported over time comparison type is provided the empty string is returned.
     *
     * @param overTimeComparisonType - The over time comparison type for which the
     *      suffix must be obtained.
     * @returns localized suffix
     */
    getSuffix(overTimeComparisonType: OverTimeComparisonType): string;
    private getSuffixLocalizationKey;
    private translateKey;
}

/**
 * @public
 */
export declare type DrillEventIntersectionElementHeader = IAttributeDescriptor | IMeasureDescriptor | ITotalDescriptor | IDrillIntersectionAttributeItem;

/**
 * This error means that loading of dynamic script/plugin failed.
 *
 * @public
 */
export declare class DynamicScriptLoadSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * Returns a string meant to represent a header with an empty value.
 * @param intl - the source of i18n strings
 * @internal
 */
export declare function emptyHeaderTitleFromIntl(intl: IntlShape): string;

/**
 * Error codes recognized by the SDK.
 *
 * @public
 */
export declare const ErrorCodes: {
    BAD_REQUEST: string;
    UNAUTHORIZED: string;
    GEO_LOCATION_MISSING: string;
    GEO_MAPBOX_TOKEN_MISSING: string;
    DATA_TOO_LARGE_TO_DISPLAY: string;
    DATA_TOO_LARGE_TO_COMPUTE: string;
    NEGATIVE_VALUES: string;
    NO_DATA: string;
    NOT_FOUND: string;
    PROTECTED_REPORT: string;
    UNKNOWN_ERROR: string;
    CANCELLED: string;
    DYNAMIC_SCRIPT_LOAD_ERROR: string;
    TIMEOUT_ERROR: string;
    VISUALIZATION_CLASS_UNKNOWN: string;
};

/**
 * Component that renders a default error message.
 *
 * @remarks
 * See {@link https://sdk.gooddata.com/gooddata-ui/docs/error_component.html | ErrorComponent}
 *
 * @public
 */
export declare class ErrorComponent extends React_2.Component<IErrorProps> {
    static defaultProps: Partial<IErrorProps>;
    render(): JSX.Element;
}

/**
 * The executor provides a more curated experience to obtain and work with data from backends.
 *
 * @remarks
 * It is aligned with the `DataAccess` infrastructure which exposes the underlying data as data series that can be
 * sliced by additional attributes.
 *
 * Once the executor finishes, the {@link DataViewFacade.data} method will expose the data as series and
 * slices according to the specification to the executor.
 * Note that if the resulting data is empty this will NOT throw a NoDataError. It is the responsibility
 * of the child component to handle that if they need to.
 *
 * See {@link IDataAccessMethods} for additional documentation
 * @public
 */
export declare const Execute: (props: IExecuteProps) => JSX.Element;

/**
 * Gets data for a specific stored insight.
 *
 * @public
 */
export declare const ExecuteInsight: React_2.ComponentType<IExecuteInsightProps>;

/**
 * Drillable item reference or predicate that enables insight / kpi drilling if it matches some attribute or measure of the insight / kpi.
 *
 * @remarks
 * You can use {@link @gooddata/sdk-ui#HeaderPredicates} factory functions to create predicates,
 * or specify reference to the identifier / uri of the target attribute / measure using {@link @gooddata/sdk-ui#IDrillableItem} definition.
 *
 * @public
 */
export declare type ExplicitDrill = IDrillableItem | IHeaderPredicate;

/**
 * The function fills the format of the measure bucket item that does not have it set.
 *
 * @param item - bucket attribute or measure
 *
 * @returns a copy of bucket item with auto-generated format for measure
 *
 * @internal
 */
export declare function fillMissingFormat(item: IAttributeOrMeasure): IAttributeOrMeasure;

/**
 * The function fills the format of the measures that does not have it set.
 *
 * @param insight - insight or insight definition that must be processed.
 *
 * @returns a copy of insight with auto-generated format for measures
 *
 * @internal
 */
export declare function fillMissingFormats<T extends IInsightDefinition>(insight: T): T;

/**
 * The function fills the titles of the measures that does not have it set.
 *
 * The derived measures
 * have the title built from the current name of the master measure and suffix based on the derived measure type.
 *
 * The arithmetic measures
 * have the title built from the current names of the referenced master measures and type of the arithmetic
 * operation.
 *
 * @param insight - insight or insight definition that must be processed.
 * @param locale - locale used for localization of the measure titles.
 * @param maxArithmeticMeasureTitleLength - maximum length of generated arithmetic measures titles.
 * Longer names will be shortened. Default value is 50 characters.
 *
 * @returns a copy of insight with auto-generated titles for derived and arithmetic measures
 *
 * @internal
 */
export declare function fillMissingTitles<T extends IInsightDefinition>(insight: T, locale: ILocale, maxArithmeticMeasureTitleLength?: number): T;

/**
 *
 * @public
 */
export declare type FilterOrMultiValuePlaceholder = ValueOrMultiValuePlaceholder<IFilter> | ValueOrMultiValuePlaceholder<IDateFilter> | ValueOrMultiValuePlaceholder<IMeasureFilter> | ValueOrMultiValuePlaceholder<IAttributeFilter> | ValueOrMultiValuePlaceholder<IAbsoluteDateFilter> | ValueOrMultiValuePlaceholder<IRelativeDateFilter> | ValueOrMultiValuePlaceholder<IPositiveAttributeFilter> | ValueOrMultiValuePlaceholder<INegativeAttributeFilter> | ValueOrMultiValuePlaceholder<IMeasureValueFilter> | ValueOrMultiValuePlaceholder<IRankingFilter>;

/**
 * Alias for all possible filter or placeholder signatures.
 *
 * @public
 */
export declare type FilterOrPlaceholder = ValueOrPlaceholder<IFilter> | ValueOrPlaceholder<IDateFilter> | ValueOrPlaceholder<IMeasureFilter> | ValueOrPlaceholder<IAttributeFilter> | ValueOrPlaceholder<IAbsoluteDateFilter> | ValueOrPlaceholder<IRelativeDateFilter> | ValueOrPlaceholder<IPositiveAttributeFilter> | ValueOrPlaceholder<INegativeAttributeFilter> | ValueOrPlaceholder<IMeasureValueFilter> | ValueOrPlaceholder<IRankingFilter>;

/**
 * Alias for all possible filters or their placeholder signatures.
 *
 * @public
 */
export declare type FiltersOrPlaceholders = Array<FilterOrMultiValuePlaceholder>;

/**
 * Fire a new drill event built from the provided data to the target that have a 'dispatchEvent' method.
 *
 * @param drillEventFunction - custom drill event function which could process and prevent default post message event.
 * @param drillEventData - The event data in `{ executionContext, drillContext }` format.
 * @param target - The target where the built event must be dispatched.
 * @internal
 */
export declare function fireDrillEvent(drillEventFunction: IDrillEventCallback, drillEventData: IDrillEvent, target: EventTarget): void;

/**
 * Flatten array type.
 *
 * @remarks
 * If the type is not an array, return the same type.
 * Works only for 1 level, nested array types are not recursively flattened.
 *
 * @example
 * ```
 * number[] is resolved as number
 * string[][] is resolved as string[]
 * string is resolved as string
 * ```
 * @public
 */
export declare type Flatten<T> = T extends Array<infer A> ? A : T;

/**
 * This error means that location bucket is missing
 *
 * @public
 */
export declare class GeoLocationMissingSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * This error means that mapbox token of GeoChart is missing
 *
 * @public
 */
export declare class GeoTokenMissingSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * Get formatted name of provided attribute header item.
 *
 * Formatted name has higher priority than name when displaying in visualisations.
 *
 * @internal
 */
export declare function getAttributeHeaderItemName(attributeHeaderItem: IResultAttributeHeaderItem | undefined): string | null | undefined;

/**
 * @internal
 */
export declare function getDrillIntersection(drillItems: IMappingHeader[]): IDrillEventIntersectionElement[];

/**
 * @internal
 * Provides the subset of attributes which consist from all attributes before given attribute and attribute itself.
 * @param fromAttribute - attribute to which we want to get relevant intersection's attributes
 * @param attributes - all attributes from the same dimension as fromAttribute
 */
export declare function getIntersectionAttributes(fromAttribute: IAttributeDescriptor, attributes: IAttributeDescriptor[]): IAttributeDescriptor[];

/**
 * @internal
 */
export declare function getIntersectionPartAfter(intersection: IDrillEventIntersectionElement[], localIdentifier: string): IDrillEventIntersectionElement[];

/**
 * Gets react-intl's IntlShape set up for the provided locale.
 *
 * @param locale - one of the supported locales, if not specified returns shape for `DefaultLocale`
 * @internal
 */
export declare function getIntl(locale?: ILocale): IntlShape;

/**
 * Get formatted name of provided mapping header.
 *
 * Formatted name has higher priority than name when displaying in visualisations.
 *
 * @internal
 */
export declare function getMappingHeaderFormattedName(header: IMappingHeader | IResultMeasureHeader): string | undefined | null;

/**
 * @internal
 */
export declare function getMappingHeaderIdentifier(header: IMappingHeader): string | undefined;

/**
 * @internal
 */
export declare function getMappingHeaderLocalIdentifier(header: IMappingHeader): string;

/**
 * @internal
 */
export declare function getMappingHeaderName(header: IMappingHeader | IResultMeasureHeader): string | undefined | null;

/**
 * @internal
 */
export declare function getMappingHeaderUri(header: IMappingHeader): string | undefined;

/**
 * @internal
 */
export declare function getTotalInfo(attributeHeaders: IResultAttributeHeader[]): {
    isTotal: boolean;
    isSubtotal: boolean;
};

/**
 * Convenience function to return translated and formatted string for given key and locale; optionally specify
 * values of parameters to substitute in the translated string.
 *
 * @param translationId - id of the localized string
 * @param locale - target locale
 * @param values - parameters, optional
 *
 * @internal
 */
export declare function getTranslation(translationId: string | MessageDescriptor, locale: ILocale, values?: {}): string;

/**
 * @internal
 */
export declare function getVisualizationType(type: ChartType): ChartType;

/**
 * Base class for all anticipated GoodData.UI SDK errors.
 *
 * @public
 */
export declare abstract class GoodDataSdkError extends Error {
    readonly seType: SdkErrorType;
    readonly cause?: any;
    protected constructor(seType: SdkErrorType, message?: string, cause?: any);
    /**
     * Provides description of the problem or one of {@link ErrorCodes}.
     */
    getMessage(): string;
    /**
     * Underlying cause of this error (if any).
     */
    getCause(): any | undefined;
    /**
     * Error code for this exception.
     *
     * @remarks
     * This can be used to identify exact type of exception.
     */
    getErrorCode(): string;
}

/**
 * @internal
 */
export declare function hasMappingHeaderFormattedName(header: IMappingHeader): boolean;

/**
 * @internal
 */
export declare function hasMappingHeaderLocalIdentifier(header: IMappingHeader): boolean;

/**
 * Set of factory functions to create the most commonly-used {@link IHeaderPredicate | HeaderPredicates}.
 *
 * @public
 */
export declare const HeaderPredicates: {
    attributeItemNameMatch: typeof attributeItemNameMatch;
    composedFromIdentifier: typeof composedFromIdentifier;
    composedFromUri: typeof composedFromUri;
    identifierMatch: typeof identifierMatch;
    localIdentifierMatch: typeof localIdentifierMatch;
    uriMatch: typeof uriMatch;
    objRefMatch: typeof objRefMatch;
    objMatch: typeof objMatch;
};

/**
 * @public
 */
export declare type HeaderTranslator = (value: string | null) => string;

/**
 * @public
 */
export declare type HeadlineElementType = "primaryValue" | "secondaryValue";

/**
 * @public
 */
export declare type HeadlineType = "headline";

/**
 * The properties of the `GdcVisualizationObject.IArithmeticMeasureDefinition` necessary for the creation of the title
 * of the arithmetic measure.
 *
 * @internal
 */
export declare interface IArithmeticMeasureTitleProps {
    operator: string;
    masterMeasureLocalIdentifiers: string[];
}

/**
 * @internal
 */
export declare interface IAvailableDrillTargetAttribute {
    attribute: IAttributeDescriptor;
    intersectionAttributes: IAttributeDescriptor[];
}

/**
 * @internal
 */
export declare interface IAvailableDrillTargetMeasure {
    measure: IMeasureDescriptor;
    attributes: IAttributeDescriptor[];
}

/**
 * @internal
 */
export declare interface IAvailableDrillTargets {
    attributes?: IAvailableDrillTargetAttribute[];
    measures?: IAvailableDrillTargetMeasure[];
}

/**
 * Props of the {@link BackendProvider} component.
 * @public
 */
export declare interface IBackendProviderProps {
    /**
     * Specify instance of backend which should be used by components to communicate with the server.
     */
    backend: IAnalyticalBackend;
    /**
     * React children
     */
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare interface ICancelablePromise<T> {
    promise: Promise<T>;
    cancel: (reason?: string) => void;
    getHasFulfilled: () => boolean;
    getHasCanceled: () => boolean;
}

/**
 * Resolved LCM identifiers of the workspace.
 *
 * @alpha
 */
export declare interface IClientWorkspaceIdentifiers {
    /**
     * Data product identifier.
     */
    dataProduct?: string;
    /**
     * Client identifier.
     */
    client?: string;
    /**
     * Segment identifier.
     */
    segment?: string;
    /**
     * Workspace identifier.
     */
    workspace?: string;
    /**
     * React children
     */
    children?: React.ReactNode;
}

/**
 * Common props of the {@link ClientWorkspaceProvider}.
 *
 * @alpha
 */
export declare interface IClientWorkspaceProviderCoreProps {
    /**
     * Specify an instance of the analytical backend instance to work with.
     *
     * @remarks
     * Note: if you do not have a BackendProvider above in the component tree, then you MUST specify the backend.
     */
    backend?: IAnalyticalBackend;
    /**
     * Wrapped React components that will have access to the LCMWorkspace context.
     */
    children: React_2.ReactNode;
}

/**
 * Props of the {@link ClientWorkspaceProvider} component.
 * @alpha
 */
export declare type IClientWorkspaceProviderProps = IClientWorkspaceProviderWithWorkspaceProps | IClientWorkspaceProviderWithClientAndDataProductProps;

/**
 * @alpha
 */
export declare interface IClientWorkspaceProviderWithClientAndDataProductProps extends IClientWorkspaceProviderCoreProps {
    /**
     * Specify the data product identifier to use to obtain the LCM context.
     *
     * @remarks
     * Note: another option is to specify workspace prop, and then data product identifier will be resolved from it.
     */
    dataProduct: string;
    /**
     * Specify the client identifier to use to obtain the LCM context.
     *
     * Note: another option is to specify workspace prop, and then client identifier will be resolved from it.
     */
    client: string;
}

/**
 * @alpha
 */
export declare interface IClientWorkspaceProviderWithWorkspaceProps extends IClientWorkspaceProviderCoreProps {
    /**
     * Specify the workspace to use to obtain the LCM context.
     *
     * @remarks
     * Note: another option is to specify dataProduct and client props, and then workspace will be resolved from them.
     */
    workspace: string;
}

/**
 * @internal
 */
export declare interface IClientWorkspaceStatus {
    isInitialized: boolean;
}

/**
 * @internal
 */
export declare interface IColorAssignment {
    headerItem: IMappingHeader;
    color: IColor;
}

/**
 * @internal
 */
export declare interface IColorsData {
    colorAssignments: IColorAssignment[];
    colorPalette: IColorPalette;
}

/**
 * Represents placeholder composed from other placeholders.
 *
 * @remarks
 * You can perform computation on top of resolved placeholder values.
 * Composed placeholders accepts also other composed placeholders as an input.
 *
 * You can provide custom resolution context to the composed placeholders,
 * and use it in your computation, but be aware that this context is shared across all composed placeholders in the call tree
 * (e.g. when you are calling composed placeholder composed from other composed placeholders,
 * each composed placeholder will be called with the same resolution context).
 *
 * @public
 */
export declare interface IComposedPlaceholder<TReturn, TValue extends any[], TContext> {
    type: "IComposedPlaceholder";
    placeholders: TValue;
    computeValue: (values: PlaceholdersResolvedValues<TValue>, resolutionContext: TContext) => TReturn;
    use: IUseComposedPlaceholderHook<IComposedPlaceholder<TReturn, TValue, TContext>>;
}

/**
 * Defines methods to access data in the data view.
 *
 * @remarks
 * These methods and types are recommended in favor of directly accessing the underlying data,
 * headers and descriptors.
 *
 * @public
 */
export declare interface IDataAccessMethods {
    /**
     * @returns collection of data series that are available in the data view
     */
    series(): IDataSeriesCollection;
    /**
     * @returns collection of data slices that are available in the data view
     */
    slices(): IDataSliceCollection;
}

/**
 * Data series is a sequence of data points that are all computed from a single measure, scoped for
 * particular attribute elements.
 *
 * @remarks
 * In other words, data series allows iterating over two dimensional data view _along_ the dimension which contains
 * the measures (via inclusion of MeasureGroupIdentifier).
 *
 * For convenience, the data series is iterable over Data Points. You can use it either in for-of loop or
 * spread data series into an array of {@link DataPoint | DataPoints}.
 *
 * @public
 */
export declare interface IDataSeries extends DataSeriesDescriptorMethods, Iterable<DataPoint> {
    /**
     * Unique identifier of the data series. This can be used to directly access this data series from data view.
     */
    readonly id: DataSeriesId;
    /**
     * Descriptor of this data series - what measure it was calculated from, whether it is scoped and if so to what attribute headers.
     */
    readonly descriptor: DataSeriesDescriptor;
    /**
     * @returns - all raw, unformatted data for this series.
     * @remarks if you need to work with fully annotated and formatted data, use the DataPoint iterator.
     */
    rawData(): DataValue[];
    /**
     * @returns - all data points in this series
     * @remarks the series is iterable over data points; if you want to iterate using for-of loop then it is not
     *  necessary to call this method - just use `for (const dataPoint of series) {...}`
     */
    dataPoints(): DataPoint[];
}

/**
 * An iterable collection of data series.
 *
 * @remarks
 * The collection additionally includes basic information about the
 * origin of the data series that can be iterated - their number, measures they were calculated from and
 * the scoping attributes.
 *
 * @public
 */
export declare interface IDataSeriesCollection extends Iterable<IDataSeries> {
    /**
     * Number of available data series.
     */
    readonly count: number;
    /**
     * Descriptors of measures that are used in the data series.
     *
     * @remarks
     * Note that the number of measures MAY differ from number of data series - that is because the data series may be
     * created for multiple scopes of each measure (e.g. measure X calculated for attribute element A, then same
     * measure calculated for attribute element B etc)
     */
    readonly fromMeasures: IMeasureDescriptor[];
    /**
     * Definitions of measures which were sent to execution and resulted in the data series.
     *
     * @remarks
     * Order of appearance matches the order of appearance in the `fromMeasures` array.
     */
    readonly fromMeasuresDef: IMeasure[];
    /**
     * Descriptors of attributes that are used to create data series with scoped measure values.
     */
    readonly scopingAttributes?: IAttributeDescriptor[];
    /**
     * Definitions of attributes which were sent to execution and resulted in the data series with scoped
     * measure values.
     *
     * @remarks
     * Order of apperance matches the order of appreance in the `scopingAttributes` array.
     */
    readonly scopingAttributesDef?: IAttribute[];
    /**
     * Returns iterator over all data series created for particular measure.
     *
     * @param localIdOrMeasure - local id of measure or measure object to get local id from
     * @returns iterable with no elements
     */
    allForMeasure(localIdOrMeasure: string | IMeasure): Iterable<IDataSeries>;
    /**
     * Returns first-found data series for the provided measure.
     *
     * @remarks
     * This is a 'get-or-die' method and will throw in case data series from the provided measure is not located.
     *
     * @param localIdOrMeasure - local id of measure or measure object to get local id from
     * @returns data series
     * @throws error if no data series or no data series from the provided measure
     */
    firstForMeasure(localIdOrMeasure: string | IMeasure): IDataSeries;
    /**
     * Returns all data series in an array.
     *
     * @remarks
     * Note: if you are looking for a subset of measures, always prefer using the first-class methods
     * {@link IDataSeriesCollection#allForMeasure} and {@link IDataSeriesCollection#firstForMeasure} in favor of getting the array and filtering yourself.
     *
     * @returns empty if no data series
     */
    toArray(): IDataSeries[];
}

/**
 * Data slice is a sequence of data points that are all computed for a particular attribute elements and/or totals but
 * different data series.
 *
 * @remarks
 * In other words, data slice allows iterating over two dimension data view _across_ the dimension which contains
 * the measures.
 *
 * For convenience, the data slice is iterable over the Data Points. You can use it either in for-of loop or
 * spread data slice into an array of DataPoints.
 *
 * @public
 */
export declare interface IDataSlice extends DataSliceDescriptorMethods, Iterable<DataPoint> {
    /**
     * Unique identifier of the data slice. This can be used to directly access this data slice from data view.
     */
    readonly id: DataSliceId;
    /**
     * Descriptor of this data slice - what attributes or totals are the data points calculated for.
     */
    readonly descriptor: DataSliceDescriptor;
    /**
     * @returns raw, unformatted data for this slice.
     * @remarks if you need to work with fully annotated and formatted data, use the DataPoint iterator
     */
    rawData(): DataValue[];
    /**
     * @returns - all data points in this slice
     * @remarks the slice is iterable over data points; if you want to iterate using for-of loop then it is not
     *  necessary to call this method - just use `for (const dataPoint of slice) {...}`
     */
    dataPoints(): DataPoint[];
}

/**
 * An iterable collection of data slices.
 *
 * @remarks
 * The collection additionally includes basic information about the
 * origin of the data slices that can be iterated - their number and attributes or totals that were used
 * for slicing.
 *
 * The slices are iterated in the order in which they appear in the underlying results; server side sorting
 * specified at the execution time is thus reflected and honored during the iteration.
 *
 * @public
 */
export declare interface IDataSliceCollection extends Iterable<IDataSlice> {
    /**
     * Number of available data slices
     */
    readonly count: number;
    /**
     * Descriptors of attributes and/or totals that were used to create data slices.
     */
    readonly descriptors: Array<IAttributeDescriptor | ITotal>;
    /**
     * Returns all data slices in an array.
     *
     * @returns empty if no data slices
     */
    toArray(): IDataSlice[];
}

/**
 * Common props for visualization of data computed by the analytical backend.
 *
 * @remarks
 * Data visualization contains prepared execution which will return data that needs to be visualized.
 *
 * @public
 */
export declare interface IDataVisualizationProps extends IVisualizationProps, IVisualizationCallbacks {
    /**
     * Prepared execution - running this will compute data to visualize.
     */
    execution: IPreparedExecution;
}

/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided identifier.
 *
 * @public
 */
export declare function identifierMatch(identifier: string): IHeaderPredicate;

/**
 * @public
 */
export declare type IDrillableItem = IDrillableItemUri | IDrillableItemIdentifier | (IDrillableItemUri & IDrillableItemIdentifier);

/**
 * @public
 */
export declare interface IDrillableItemIdentifier {
    identifier: string;
}

/**
 * @public
 */
export declare interface IDrillableItemUri {
    uri: string;
}

/**
 * @public
 */
export declare interface IDrillConfig {
    dataView: IDataView;
    onDrill: OnFiredDrillEvent;
}

/**
 * @public
 */
export declare interface IDrillEvent {
    dataView: IDataView;
    drillContext: IDrillEventContext;
}

/**
 * @public
 */
export declare type IDrillEventCallback = (event: IDrillEvent) => void | boolean;

/**
 * Drill context for all visualization type.
 * @public
 */
export declare interface IDrillEventContext {
    type: VisType;
    element: VisElementType;
    x?: number;
    y?: number;
    z?: number;
    columnIndex?: number;
    rowIndex?: number;
    row?: any[];
    value?: string;
    intersection?: IDrillEventIntersectionElement[];
    points?: IDrillPoint[];
}

/**
 * Drill context for chart element group (multiple series + click on axis value) where
 * every point has own intersection.
 *
 * @public
 */
export declare interface IDrillEventContextGroup {
    type: ChartType;
    element: ChartElementType;
    points: IDrillPoint[];
}

/**
 * Drill context for headline
 *
 * @public
 */
export declare interface IDrillEventContextHeadline {
    type: HeadlineType;
    element: HeadlineElementType;
    value: string;
    intersection: IDrillEventIntersectionElement[];
}

/**
 * Drill context for pointy-charts
 *
 * @public
 */
export declare interface IDrillEventContextPoint {
    type: ChartType;
    element: ChartElementType;
    elementChartType?: ChartType;
    x?: number;
    y?: number;
    z?: number;
    value?: string;
    intersection: IDrillEventIntersectionElement[];
}

/**
 * Drill context for table
 *
 * @public
 */
export declare interface IDrillEventContextTable {
    type: TableType;
    element: TableElementType;
    columnIndex: number;
    rowIndex: number;
    row: any[];
    intersection: IDrillEventIntersectionElement[];
}

/**
 * Drill context for XIRR
 *
 * @public
 */
export declare interface IDrillEventContextXirr {
    type: XirrType;
    element: HeadlineElementType;
    value: string;
    intersection: IDrillEventIntersectionElement[];
}

/**
 * @public
 */
export declare interface IDrillEventIntersectionElement {
    header: DrillEventIntersectionElementHeader;
}

/**
 * @public
 */
export declare interface IDrillIntersectionAttributeItem extends IAttributeDescriptor, IResultAttributeHeader {
}

/**
 * Drill context for headline
 *
 * @public
 */
export declare interface IDrillPoint {
    x: number;
    y: number;
    intersection: IDrillEventIntersectionElement[];
    type?: ChartType;
}

/**
 * Mapping between error code and human readable description of the error.
 *
 * Key is error code as defined in {@link ErrorCodes}.
 *
 * @public
 */
export declare interface IErrorDescriptors {
    [key: string]: {
        icon?: string;
        message: string;
        description: string;
    };
}

/**
 * Props of the {@link ErrorComponent}.
 * @public
 */
export declare interface IErrorProps {
    code?: string;
    icon?: string;
    message: string;
    description?: string;
    className?: string;
    style?: object;
    width?: any;
    /**
     * Size of the error component.
     */
    height?: any;
    /**
     * Size of the visualisation content when custom size layouting is enabled.
     */
    clientHeight?: any;
}

/**
 * Represents an error component provided to Execute or RawExecute components
 * @public
 */
export declare type IExecuteErrorComponent = ComponentType<IExecuteErrorComponentProps>;

/**
 * Properties of the error component provided to Execute or RawExecute components
 * @public
 */
export declare interface IExecuteErrorComponentProps {
    /**
     * Original error
     */
    error: GoodDataSdkError;
}

/**
 * Props of the {@link ExecuteInsight} component.
 * @public
 */
export declare interface IExecuteInsightProps extends IWithLoadingEvents<IExecuteInsightProps> {
    /**
     * Backend to execute against.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace in whose context to perform the execution.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
    /**
     * Reference to the insight for which you want to get the data view.
     */
    insight: ObjRef;
    /**
     * Modify sorts on prepared insight execution, before it's executed.
     */
    sorts?: ISortItem[] | ((def: IExecutionDefinition, props: IExecuteInsightProps) => ISortItem[]);
    /**
     * Modify dimensions on prepared insight execution, before it's executed.
     */
    dimensions?: IDimension[] | ((def: IExecutionDefinition, props: IExecuteInsightProps) => IDimension[]);
    /**
     * Modify date formatting on prepared insight execution, before it's executed.
     */
    dateFormat?: string | ((def: IExecutionDefinition, props: IExecuteInsightProps) => string);
    /**
     * Filters to apply on server side.
     */
    filters?: INullableFilter[];
    /**
     * Name to use for files exported from this component.
     *
     * @remarks
     * If you do not specify this, then the componentName will be used instead.
     *
     * Note: it is also possible to pass custom name to the export function that will be sent via the
     * onExportReady callback. That approach is preferred if you need to assign the names in an ad-hoc
     * fashion.
     */
    exportTitle?: string;
    /**
     * Informative name of the component.
     *
     * @remarks
     * This value is sent as telemetry information together with the actual execution request. We recommend to set this
     * because it can be useful for diagnostic purposes.
     *
     * Defaults 'Execute'.
     */
    componentName?: string;
    /**
     * Specifies whether `Execute` should trigger execution and loading right after it is
     * mounted.
     *
     * @remarks
     * If not specified defaults to `true`.
     *
     * If set to `false`, then the {@link WithLoadingResult#reload} function needs to be called
     * to trigger the execution and loading.
     */
    loadOnMount?: boolean;
    /**
     * Specifies whether `Execute` should load all data from backend or just a particular window - specified by
     * offset and size of the window.
     *
     * @remarks
     * If not specified, all data will be loaded.
     */
    window?: DataViewWindow;
    /**
     * Indicates that the execution to obtain the data for the insight should be an 'execution by reference'.
     *
     * Execution by reference means that the ExecuteInsight will ask analytical backend to compute results for an insight
     * which is stored on the backend by specifying link to the insight, additional filters and description how
     * to organize the data.
     *
     * Otherwise, a freeform execution is done, in which the InsightView will send to backend the full execution
     * definition of what to compute.
     *
     * This distinction is in place because some backends MAY want to prohibit users from doing freeform executions
     * and only allow computing data for set of insights created by admins.
     *
     * Note: the need for execute by reference is rare. You will typically be notified by the solution admin to use
     * this mode.
     */
    executeByReference?: boolean;
    /**
     * Child component to which rendering is delegated.
     *
     * @remarks
     * This is a function that will be called every time state of execution and data loading changes.
     *
     * @param executionResult - execution result, indicating state and/or results
     */
    children: (executionResult: WithLoadingResult) => React_2.ReactElement | null;
    /**
     * Provide component for rendering of the loading state.
     *
     * @remarks
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    LoadingComponent?: IExecuteLoadingComponent;
    /**
     * Provide component for rendering of the error state.
     *
     * @remarks
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    ErrorComponent?: IExecuteErrorComponent;
}

/**
 * Represents a loading component provided to Execute or RawExecute components
 * @public
 */
export declare type IExecuteLoadingComponent = ComponentType;

/**
 * Props of the {@link Execute} component.
 * @public
 */
export declare interface IExecuteProps extends IWithLoadingEvents<IExecuteProps> {
    /**
     * Backend to execute against.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace in whose context to perform the execution.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
    /**
     * Data series will be built using the provided measures that are further scoped for
     * elements of the specified attributes.
     */
    seriesBy?: AttributesMeasuresOrPlaceholders;
    /**
     * Slice all data series by elements of these attributes.
     */
    slicesBy?: AttributesOrPlaceholders;
    /**
     * Include these totals among the data slices.
     */
    totals?: TotalsOrPlaceholders;
    /**
     * Filters to apply on server side.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Sorting to apply on server side.
     */
    sortBy?: SortsOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
    /**
     * Name to use for files exported from this component.
     *
     * @remarks
     * If you do not specify this, then the componentName will be used instead.
     *
     * Note: it is also possible to pass custom name to the export function that will be sent via the
     * onExportReady callback. That approach is preferred if you need to assign the names in an ad-hoc
     * fashion.
     */
    exportTitle?: string;
    /**
     * Informative name of the component.
     *
     * @remarks
     * This value is sent as telemetry information together with the actual execution request.
     * We recommend to set this because it can be useful for diagnostic purposes.
     *
     * Defaults 'Execute'.
     */
    componentName?: string;
    /**
     * Specifies whether {@link Execute} should trigger execution and loading right after it is
     * mounted.
     *
     * @remarks
     * If not specified defaults to `true`.
     *
     * If set to `false`, then the {@link WithLoadingResult#reload} function needs to be called
     * to trigger the execution and loading.
     */
    loadOnMount?: boolean;
    /**
     * Specifies whether {@link Execute} should load all data from backend or just a particular window - specified by
     * offset and size of the window.
     *
     * @remarks
     * If not specified, all data will be loaded.
     */
    window?: DataViewWindow;
    /**
     * Child component to which rendering is delegated.
     *
     * @remarks
     * This is a function that will be called every time state of execution and data loading changes.
     *
     * @param executionResult - execution result, indicating state and/or results
     */
    children: (executionResult: WithLoadingResult) => React_2.ReactElement | null;
    /**
     * Provide component for rendering of the loading state.
     *
     * @remarks
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    LoadingComponent?: IExecuteLoadingComponent;
    /**
     * Provide component for rendering of the error state.
     *
     * @remarks
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    ErrorComponent?: IExecuteErrorComponent;
}

/**
 * Convenient interface to define execution by series and slices.
 *
 * @public
 */
export declare interface IExecutionConfiguration {
    /**
     * Data series will be built using the provided measures that are further scoped for
     * elements of the specified attributes.
     */
    seriesBy: AttributesMeasuresOrPlaceholders;
    /**
     * Slice all data series by elements of these attributes.
     */
    slicesBy?: AttributesOrPlaceholders;
    /**
     * Include these totals among the data slices.
     */
    totals?: TotalsOrPlaceholders;
    /**
     * Filters to apply on server side.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Sorting to apply on server side.
     */
    sortBy?: SortsOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
    /**
     * Informative name of the component.
     *
     * @remarks
     * This value is sent as telemetry information together with the actual execution request.
     * We recommend to set this because it can be useful for diagnostic purposes.
     *
     * Defaults 'Execute'.
     */
    componentName?: string;
}

/**
 * Methods to work with execution definition.
 *
 * @internal
 */
export declare interface IExecutionDefinitionMethods {
    /**
     * @returns attributes which were specified in execution definition that resulted in this data view
     */
    attributes(): IAttribute[];
    /**
     * @returns measures which were specified in execution definition that resulted in this data view
     */
    measures(): IMeasure[];
    /**
     * @returns buckets which were specified in execution definition that resulted in this data view; please note that
     *  buckets are an optional metadata included in an execution definition; buckets provide information how different
     *  measures and attributes that make up an execution are logically grouped; therefore keep in mind that it is
     *  completely valid that a data view is populated with data but has no bucket metadata at all.
     */
    buckets(): IBucket[];
    /**
     * Returns bucket by its local identifier.
     *
     * @param localId - desired bucket's local identifier
     * @returns undefined if no such bucket
     */
    bucket(localId: string): IBucket | undefined;
    /**
     * @returns number of buckets which were specified in execution definition that resulted in this data view
     */
    bucketCount(): number;
    /**
     * A convenience function that tests whether any buckets were specified in the execution definition that resulted
     * in this data view.
     *
     * @returns true if any buckets, false otherwise
     */
    hasBuckets(): boolean;
    /**
     * A convenience function that tests whether a bucket is either missing from execution definition that
     * resulted in this data view or the bucket exists and is empty.
     *
     * @param localId - desired bucket's local identifier
     * @returns true if bucket with the provided local identifier both exists and is non empty.
     */
    isBucketEmpty(localId: string): boolean;
    /**
     * A convenience function that locates bucket by local identifier and if found returns measures
     * contained in that bucket.
     *
     * @param localId - desired bucket's local identifier
     * @returns array of measures in the bucket, empty array if no such bucket or if the bucket is empty or if
     *  the bucket contains no measures
     */
    bucketMeasures(localId: string): IMeasure[];
    /**
     * Finds a measure with the provided local identifier within the execution definition that resulted
     * in this data view.
     *
     * @param localId - desired measure's local identifier
     * @returns undefined if no such measure found
     */
    measure(localId: string): IMeasure | undefined;
    /**
     * Finds index of measure with the provided local identifier with the execution definition that
     * resulted in this data view.
     *
     * @param localId - desired measure's local identifier
     * @returns index within list of measures, -1 if no such measure
     */
    measureIndex(localId: string): number;
    /**
     * Given a local identifier of a measure in execution definition, this method will return master measure from which
     * the measure is derived. IF the measure with the provided identifier is not derived, then it itself
     * is returned.
     *
     * @param localId - desired measure's local identifier
     * @returns undefined if no measure with provided local id exists in the execution definition OR if measure exists, it is
     *  derived but master measure does not exist in the execution definition
     */
    masterMeasureForDerived(localId: string): IMeasure | undefined;
    /**
     * @returns true if execution definition that resulted in this data view has any attributes
     */
    hasAttributes(): boolean;
}

/**
 * @public
 */
export declare type IExportFunction = (exportConfig: IExtendedExportConfig) => Promise<IExportResult>;

/**
 * @public
 */
export declare interface IExtendedExportConfig extends IExportConfig {
    includeFilterContext?: boolean;
}

/**
 * This function ignores the titles of simple measures.
 *
 * For simple measures, their titles are removed.
 * For adhoc or non-simple measures, their titles are left intact.
 *
 * @param insight - insight or insight definition that must be processed.
 * @returns a copy of insight modified bucket items
 *
 * @internal
 */
export declare function ignoreTitlesForSimpleMeasures<T extends IInsightDefinition>(insight: T): T;

/**
 * A function called for {@link IMappingHeader} instances.
 *
 * @remarks
 * When the function returns true, it means the IMappingHeader is matched.
 * See {@link https://sdk.gooddata.com/gooddata-ui/docs/ht_create_predicates.html | documentation} for more information.
 *
 * @public
 */
export declare type IHeaderPredicate = (header: IMappingHeader, context: IHeaderPredicateContext) => boolean;

/**
 * Additional data that describes the context in which the {@link IHeaderPredicate} match is being tested.
 *
 * @public
 */
export declare interface IHeaderPredicateContext {
    dv: DataViewFacade;
}

/**
 * @public
 */
export declare interface IHighchartsCategoriesTree {
    tick: IHighchartsParentTick;
}

/**
 * @public
 */
export declare interface IHighchartsParentTick {
    leaves: number;
    startAt: number;
    label: any;
}

/**
 * @internal
 */
export declare interface IIntlWrapperProps {
    locale?: string;
    children?: React_2.ReactNode;
}

/**
 * Props of the {@link Kpi} component.
 * @public
 */
export declare interface IKpiProps extends IWithLoadingEvents<IRawExecuteProps> {
    /**
     * Specify an instance of analytical backend instance to work with.
     *
     * @remarks
     * Note: if you do not have a BackendProvider above in the component tree, then you MUST specify the backend.
     */
    backend?: IAnalyticalBackend;
    /**
     * Specify workspace to work with.
     *
     * @remarks
     * Note: if you do not have a WorkspaceProvider above in the component tree, then you MUST specify the workspace.
     */
    workspace?: string;
    /**
     * Specify measure whose value should be calculated and rendered.
     */
    measure: IMeasure;
    /**
     * Specify filters to apply during calculation
     */
    filters?: INullableFilter[];
    /**
     * Specify number separators to use when rendering (segment delimiters, decimal point character)
     */
    separators?: ISeparators;
    /**
     * Specify locale to use for strings that the Kpi component may render (for instance when encountering
     * errors).
     */
    locale?: string;
    /**
     * Specify react component to render while the data is loading.
     */
    LoadingComponent?: React_2.ComponentType<ILoadingProps>;
    /**
     * Specify react component to render if execution fails.
     */
    ErrorComponent?: React_2.ComponentType<IErrorProps>;
}

/**
 * These props are injected by withEntireDataView HOC. This HOC takes care of driving the execution and obtaining
 * the data view to visualize. Oh and by the way, the HOC also provides internationalization context :/
 *
 * @internal
 */
export declare interface ILoadingInjectedProps {
    /**
     * If the data is loading, then this prop contains true. Otherwise, if the loading finished with either
     * success or failure, this prop contains false.
     */
    isLoading: boolean;
    /**
     * If loading succeeds, then this prop contains the data to visualize. Otherwise is undefined.
     */
    dataView?: IDataView;
    /**
     * If loading fails, then this prop contains description of the error. Otherwise is undefined.
     */
    error?: string;
    intl: IntlShape;
    /**
     * Callback to trigger when export is ready
     */
    onExportReady(exportFunction: IExportFunction): void;
    /**
     * Callback to trigger if the chart cannot visualize the data because it is too large.
     */
    onDataTooLarge(data: any, errorMessage?: string): void;
    /**
     * Callback to trigger if the chart cannot visualize the data because it contains negative values.
     */
    onNegativeValues(): void;
}

/**
 * Props of the {@link LoadingComponent}.
 * @public
 */
export declare interface ILoadingProps {
    className?: string;
    color?: string;
    speed?: number;
    inline?: boolean;
    height?: any;
    width?: any;
    imageHeight?: any;
    imageWidth?: any;
}

/**
 * @public
 */
export declare interface ILoadingState {
    isLoading: boolean;
}

/**
 * Language codes that can be used with GoodData.
 *
 * @public
 */
export declare type ILocale = "en-US" | "de-DE" | "es-ES" | "fr-FR" | "ja-JP" | "nl-NL" | "pt-BR" | "pt-PT" | "zh-Hans" | "ru-RU";

/**
 * @privateRemarks
 * TODO: SDK8: remove this, replace with something more meaningful
 *
 * @public
 */
export declare type IMappingHeader = IAttributeDescriptor | IResultAttributeHeader | IMeasureDescriptor | ITotalDescriptor | IColorDescriptor;

/**
 * The properties of the `GdcVisualizationObject.IMeasure` necessary for the creation of the title of the ad hoc measures.
 *
 * @internal
 */
export declare interface IMeasureTitleProps {
    localIdentifier: string;
    title?: string;
    alias?: string;
}

/**
 * @internal
 */
export declare const IntlTranslationsProvider: React_2.FC<WithIntlProps<ITranslationsProviderProps>> & {
    WrappedComponent: React_2.ComponentType<ITranslationsProviderProps>;
};

/**
 * @internal
 */
export declare const IntlWrapper: React_2.FC<IIntlWrapperProps>;

/**
 * @internal
 */
export declare interface IOpenAsReportUiConfig {
    supported?: boolean;
    warningMessage?: string;
}

/**
 * Placeholder represents a reference to a specific part of the execution - attribute(s), measure(s), filter(s), sort(s) or total(s),
 * that may change the value at runtime.
 *
 * @remarks
 * You can provide it to visualizations instead of the attributes/measures/filters/sorts/totals themselves,
 * placeholders will be replaced with the actual values on the background.
 *
 * This allows you:
 * - share a reference to the same execution elements across multiple components.
 * - change the value of these execution elements with ease.
 * - decouple hardcoded execution elements from the visualizations.
 * - update any number of visualizations just by updating the placeholder value.
 *
 * Placeholder values are living in React context and you can obtain/set their values by the following hooks:
 * - {@link usePlaceholder}
 *
 * - {@link usePlaceholders}
 *
 * - {@link useComposedPlaceholder}
 *
 * - {@link useResolveValueWithPlaceholders}
 *
 * - {@link useResolveValuesWithPlaceholders}
 *
 * Note:
 * - Don't create placeholders manually, to create a new placeholder, use factory function {@link newPlaceholder}.
 * - To make it work, don't forget to wrap your application in {@link PlaceholdersProvider}.
 *
 * @public
 */
export declare type IPlaceholder<T> = {
    type: "IPlaceholder";
    id: string;
    defaultValue?: T;
    value?: T;
    validate?: (value: T) => void;
    use: IUsePlaceholderHook<IPlaceholder<T>>;
};

/**
 * Common placeholder options.
 * @public
 */
export declare interface IPlaceholderOptions<T> {
    /**
     * By default, each placeholder has a unique generated id.
     *
     * @remarks
     * You can provide id of the placeholder which can be useful for debugging.
     * Please note that the id should be unique for all your placeholders.
     */
    id?: string;
    /**
     * Provide function to validate the placeholder value.
     */
    validate?: (value?: T) => void;
}

/**
 * Props of the {@link PlaceholdersProvider} component.
 * @public
 */
export declare interface IPlaceholdersProviderProps {
    children: React_2.ReactNode;
    initialValues?: [IPlaceholder<any>, any][];
}

/**
 * TODO: remove push data
 * @internal
 */
export declare interface IPushData {
    dataView?: IDataView;
    properties?: {
        sortItems?: ISortItem[];
        totals?: ITotal[];
        controls?: Record<string, any>;
        bucketType?: string;
    };
    propertiesMeta?: any;
    colors?: IColorsData;
    initialProperties?: any;
    availableDrillTargets?: IAvailableDrillTargets;
    openAsReport?: IOpenAsReportUiConfig;
    ignoreUndoRedo?: boolean;
}

/**
 * Props of the {@link RawExecute} component.
 * @public
 */
export declare interface IRawExecuteProps extends IWithLoadingEvents<IRawExecuteProps> {
    /**
     * Prepared execution which the executor will drive to completion and will obtain data from.
     */
    execution: IPreparedExecution;
    /**
     * Specifies whether {@link RawExecute} should load all data from backend or just a particular window - specified by
     * offset and size of the window.
     *
     * @remarks
     * If not specified, all data will be loaded.
     */
    window?: DataViewWindow;
    /**
     * Name to use for files exported from this component.
     *
     * @remarks
     * If you do not specify this, then the 'RawExecute' will be used instead.
     *
     * Note: it is also possible to pass custom name to the export function that will be sent via the
     * onExportReady callback. That approach is preferred if you need to assign the names in an ad-hoc
     * fashion.
     */
    exportTitle?: string;
    /**
     * Indicates whether the executor should trigger execution and loading right after it is
     * mounted.
     *
     * @remarks
     * If not specified defaults to `true`.
     *
     * If set to `false`, then the {@link WithLoadingResult#reload} function needs to be called
     * to trigger the execution and loading.
     */
    loadOnMount?: boolean;
    /**
     * Child component to which rendering is delegated.
     *
     * @remarks
     * This is a function that will be called every time state of execution and data loading changes.
     *
     * @param executionResult - execution result, indicating state and/or results
     */
    children: (executionResult: WithLoadingResult) => React_2.ReactElement | null;
    /**
     * Provide component for rendering of the loading state.
     *
     * @remarks
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    LoadingComponent?: IExecuteLoadingComponent;
    /**
     * Provide component for rendering of the error state.
     *
     * @remarks
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    ErrorComponent?: IExecuteErrorComponent;
}

/**
 * Methods to access data and totals in a result.
 *
 * @internal
 */
export declare interface IResultDataMethods {
    /**
     * @returns true if the data is empty
     */
    isEmpty(): boolean;
    /**
     * @returns size for first dimension of the data view
     */
    firstDimSize(): number;
    /**
     * @returns size for second dimension of the data view
     */
    secondDimSize(): number;
    /**
     * @param index - index within first dimension
     * @returns data at index of the first dimension of the data view; if the data view has single dimension
     *  then returns actual data point; if the data view is two dimensional, then returns array
     */
    dataAt(index: number): DataValue | DataValue[];
    /**
     * @returns all data in the data view; this is array of arrays for two dim views or array of data points
     *  for one dimensional data view
     */
    data(): DataValue[][] | DataValue[];
    /**
     * This is a convenience method that asserts whether data in the data view is one dimensional and if so
     * returns array of data points.
     *
     * @returns array of data points, empty array if there's no data at all
     */
    singleDimData(): DataValue[];
    /**
     * This is a convenience method that determines whether the data in the data view is two dimension; if it
     * is then data is returned as-is. If the data is single dimension, this method will up-cast the data to
     * two dimensions.
     *
     * TODO: this method has serious contract issues and inconsistencies; it even borders outright dumb behavior :)
     *   investigation & clean up is a must
     *
     * @returns two dimensional data; if data is empty, returns array with single empty array in
     */
    twoDimData(): DataValue[][];
    /**
     * @returns grand totals in the data view, undefined if there are no grand totals
     */
    totals(): DataValue[][][] | undefined;
    /**
     * @returns grand totals for row in the data view, undefined if there are no row grand totals
     */
    rowTotals(): DataValue[][] | undefined;
    /**
     * @returns grand totals for column in the data view, undefined if there are no column grand totals
     */
    columnTotals(): DataValue[][] | undefined;
    /**
     * @returns totals of grand totals in the data view, undefined if there are no totals of grand totals
     */
    totalOfTotals(): DataValue[][][] | undefined;
    /**
     * Tests whether the data view included grand totals for row
     *
     * @returns true if row grand totals present, false if not
     */
    hasRowTotals(): boolean;
    /**
     * Tests whether the data view included grand totals for column
     *
     * @returns true if column grand totals present, false if not
     */
    hasColumnTotals(): boolean;
    /**
     * Tests whether the data view included grand totals.
     *
     * @returns true if grand totals present, false if not
     */
    hasTotals(): boolean;
}

/**
 * Methods to access result metadata - dimension descriptors and result headers.
 *
 * @internal
 */
export declare interface IResultMetaMethods {
    /**
     * @returns data view's dimension descriptors
     * @remarks see {@link @gooddata/sdk-backend-spi#IDimensionDescriptor} for more information of what this is
     */
    dimensions(): IDimensionDescriptor[];
    /**
     * @param dimIdx - index of dimension
     * @returns dimension item descriptors for desired dimension of the resulting data view
     */
    dimensionItemDescriptors(dimIdx: number): IDimensionItemDescriptor[];
    /**
     * @returns attribute descriptors from all dimensions
     */
    attributeDescriptors(): IAttributeDescriptor[];
    /**
     * Returns attribute descriptors from particular dimension.
     *
     * @param dim - dimension index
     * @returns attribute descriptors, empty if none or if no such dimension
     */
    attributeDescriptorsForDim(dim: number): IAttributeDescriptor[];
    /**
     * @returns measure group descriptor, regardless of dimension in which it is located
     */
    measureGroupDescriptor(): IMeasureGroupDescriptor | undefined;
    /**
     * This is a convenience function to find measure group descriptor and return its measure descriptors.
     *
     * @returns measure descriptors, empty array if measure group header descriptor is not in any dimension
     */
    measureDescriptors(): IMeasureDescriptor[];
    /**
     * Finds measure descriptor by local identifier of the measure from execution definition.
     *
     * @param localId - local identifier of desired measure's descriptor
     * @returns undefined if no measure group header descriptor or no measure descriptor with the provided local identifier
     */
    measureDescriptor(localId: string): IMeasureDescriptor | undefined;
    /**
     * Tests whether there are any headers in the dimension with the provided index.
     *
     * @param dim - dimension index.
     */
    hasNoHeadersInDim(dim: number): boolean;
    /**
     * @returns all headers describing the data included in the data view
     */
    allHeaders(): IResultHeader[][][];
    /**
     * @returns filters headers for all dimensions so that only attribute headers for the dimensions
     *   are returned
     */
    attributeHeaders(): IResultAttributeHeader[][][];
    /**
     * @returns filters headers for the provided dimension so that only attribute headers in that dimension
     *   are returned
     */
    attributeHeadersForDim(idx: number): IResultAttributeHeader[][];
    /**
     * Tests whether measure descriptor is for a derived measure - that is, the measure is specified in
     * execution definition and is either PoP measure or Previous Period Measure.
     *
     * @param measureDescriptor - input measure descriptor
     * @returns true if measure for the provide measure descriptor is in definition AND is either PoP or previous
     *  period; false otherwise.
     */
    isDerivedMeasure(measureDescriptor: IMeasureDescriptor): boolean;
    /**
     * Tests whether measure descriptor is for a virtual measure - that is, the measure is specified in
     * execution definition and is either virtual measure.
     *
     * @param measureDescriptor - input measure descriptor
     * @returns true if measure for the provide measure descriptor is in definition AND is either virtual measure; false otherwise.
     */
    isVirtualMeasure(measureDescriptor: IMeasureDescriptor): boolean;
    /**
     * Returns only those sort items from the result's definition which are actually applied on the result.
     *
     * The execution definition may contain sorts for measures scoped for particular attribute elements - it may
     * however happen that at the same time the execution definition contains filters that will remove the
     * attribute elements in question.
     *
     * This method inspects sorts in the definition, metadata and headers in the results and returns only those items
     * which actually match them.
     */
    effectiveSortItems(): ISortItem[];
}

/**
 * Type-guard testing whether the provided object is an instance of {@link AnyPlaceholder}.
 * @public
 */
export declare function isAnyPlaceholder<T>(obj: unknown): obj is AnyPlaceholder<T>;

/**
 * Typeguard checking whether input is an instance of {@link BadRequestSdkError};
 *
 * @public
 */
export declare function isBadRequest(obj: unknown): obj is BadRequestSdkError;

/**
 * @internal
 */
export declare const isCancelError: (obj: unknown) => obj is CancelError;

/**
 * Typeguard checking whether input is an instance of {@link CancelledSdkError};
 *
 * @public
 */
export declare function isCancelledSdkError(obj: unknown): obj is CancelledSdkError;

/**
 * Type-guard testing whether the provided object is an instance of {@link IComposedPlaceholder}.
 * @public
 */
export declare function isComposedPlaceholder<TReturn, TValue extends any[], TContext>(obj: unknown): obj is IComposedPlaceholder<TReturn, TValue, TContext>;

/**
 * Typeguard checking whether input is an instance of {@link DataTooLargeToComputeSdkError};
 *
 * @public
 */
export declare function isDataTooLargeToCompute(obj: unknown): obj is DataTooLargeToComputeSdkError;

/**
 * Typeguard checking whether input is an instance of {@link DataTooLargeToDisplaySdkError};
 *
 * @public
 */
export declare function isDataTooLargeToDisplay(obj: unknown): obj is DataTooLargeToDisplaySdkError;

/**
 * @public
 */
export declare function isDrillableItem(item: unknown): item is IDrillableItem;

/**
 * @public
 */
export declare function isDrillableItemIdentifier(item: unknown): item is IDrillableItemIdentifier;

/**
 * @public
 */
export declare function isDrillableItemUri(item: unknown): item is IDrillableItemUri;

/**
 * @public
 */
export declare function isDrillIntersectionAttributeItem(header: DrillEventIntersectionElementHeader): header is IDrillIntersectionAttributeItem;

/**
 * Typeguard checking whether input is an instance of {@link DynamicScriptLoadSdkError};
 *
 * @public
 */
export declare function isDynamicScriptLoadSdkError(obj: unknown): obj is DynamicScriptLoadSdkError;

export { ISeparators }

/**
 * @public
 */
export declare function isExplicitDrill(obj: unknown): obj is ExplicitDrill;

/**
 * Typeguard checking whether input is an instance of {@link GeoLocationMissingSdkError};
 *
 * @public
 */
export declare function isGeoLocationMissing(obj: unknown): obj is GeoLocationMissingSdkError;

/**
 * Typeguard checking whether input is an instance of {@link GeoTokenMissingSdkError};
 *
 * @public
 */
export declare function isGeoTokenMissing(obj: unknown): obj is GeoTokenMissingSdkError;

/**
 * Typeguard checking whether input is an instance of {@link GoodDataSdkError};
 *
 * @public
 */
export declare function isGoodDataSdkError(obj: unknown): obj is GoodDataSdkError;

/**
 * Typeguard checking whether the object is an {@link IHeaderPredicate} instance.
 * @public
 */
export declare function isHeaderPredicate(obj: unknown): obj is IHeaderPredicate;

/**
 * Type-guard for language codes that can be used with GoodData.
 *
 * @public
 */
export declare const isLocale: (locale: unknown) => locale is ILocale;

/**
 * Typeguard checking whether input is an instance of {@link NegativeValuesSdkError};
 *
 * @public
 */
export declare function isNegativeValues(obj: unknown): obj is NegativeValuesSdkError;

/**
 * Typeguard checking whether input is an instance of {@link NoDataSdkError};
 *
 * @public
 */
export declare function isNoDataSdkError(obj: unknown): obj is NoDataSdkError;

/**
 * Typeguard checking whether input is an instance of {@link NotFoundSdkError};
 *
 * @public
 */
export declare function isNotFound(obj: unknown): obj is NotFoundSdkError;

/**
 * Type-guard testing whether the provided object is an instance of {@link IPlaceholder}.
 * @public
 */
export declare function isPlaceholder<T>(obj: unknown): obj is IPlaceholder<T>;

/**
 * Typeguard checking whether input is an instance of {@link ProtectedReportSdkError};
 *
 * @public
 */
export declare function isProtectedReport(obj: unknown): obj is ProtectedReportSdkError;

/**
 * @internal
 */
export declare function isSomeHeaderPredicateMatched(drillablePredicates: IHeaderPredicate[], header: IMappingHeader, dv: DataViewFacade): boolean;

/**
 * Typeguard checking whether input is an instance of {@link UnauthorizedSdkError};
 *
 * @public
 */
export declare function isUnauthorized(obj: unknown): obj is UnauthorizedSdkError;

/**
 * Typeguard checking whether input is an instance of {@link UnexpectedSdkError};
 *
 * @public
 */
export declare function isUnknownSdkError(obj: unknown): obj is UnexpectedSdkError;

/**
 * @internal
 */
export declare interface ITranslations {
    [key: string]: string;
}

/**
 * @internal
 */
export declare interface ITranslationsComponentProps {
    numericSymbols: string[];
    emptyHeaderString: string;
    intl: IntlShape;
}

/**
 * @beta
 */
export declare interface ITranslationsCustomizationContextProviderProps {
    /**
     * Flag telling whether settings is being loaded or not
     */
    translationsCustomizationIsLoading: boolean;
    /**
     * Customized translations.
     */
    translations: Record<string, string>;
    /**
     * React children
     */
    children?: React_2.ReactNode;
}

/**
 * @beta
 */
export declare interface ITranslationsCustomizationProviderProps {
    /**
     * Component that will be render (Render Props pattern).
     */
    render(translations: Record<string, string>): JSX.Element;
    /**
     * Customization function that will change final translations.
     */
    customize?(translations: Record<string, string>, settings?: IWorkspaceSettings): Record<string, string>;
    /**
     * Translations that needs to be modified.
     */
    translations: Record<string, string>;
    /**
     * Analytical backend, from which the ThemeProvider will obtain selected theme object
     *
     * @remarks
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the ThemeProvider will obtain the selected theme identifier
     *
     * @remarks
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;
}

/**
 * @internal
 */
export declare interface ITranslationsProviderOwnProps {
    children: any;
}

/**
 * @internal
 */
export declare type ITranslationsProviderProps = ITranslationsProviderOwnProps & WrappedComponentProps;

/**
 * React hook to obtain {@link IComposedPlaceholder} value.
 * @public
 */
export declare type IUseComposedPlaceholderHook<T extends IComposedPlaceholder<any, any, any>> = (resolutionContext: ComposedPlaceholderResolutionContext<T>) => PlaceholderResolvedValue<T>;

/**
 * Configuration for {@link useExecutionDataView} hook.
 * See also {@link UseExecutionDataViewCallbacks}.
 *
 * @public
 */
export declare interface IUseExecutionDataViewConfig {
    /**
     * Prepared execution, or execution configuration for which you want to get the data view.
     */
    execution?: IPreparedExecution | IExecutionConfiguration;
    /**
     * You can define only a specific "window" of data to load.
     *
     * @remarks
     * This is useful if you want to page data.
     */
    window?: DataViewWindow;
    /**
     * Backend to work with.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where execution should be executed.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
}

/**
 * Configuration for {@link useInsightDataView} hook.
 *
 * @public
 */
export declare interface IUseInsightDataViewConfig {
    /**
     * Reference to the insight for which you want to get the data view.
     *
     * @remarks
     * Note: When the reference or identifier is not provided, hook is locked in a "pending" state.
     */
    insight?: ObjRef;
    /**
     * Modify sorts on prepared insight execution, before it's executed.
     */
    sorts?: ISortItem[] | ((def: IExecutionDefinition) => ISortItem[]);
    /**
     * Modify dimensions on prepared insight execution, before it's executed.
     */
    dimensions?: IDimension[] | ((def: IExecutionDefinition) => IDimension[]);
    /**
     * Modify date formatting on prepared insight execution, before it's executed.
     */
    dateFormat?: string | ((def: IExecutionDefinition) => string);
    /**
     * Specify filters to merge with filters already defined in the insight.
     */
    filters?: INullableFilter[];
    /**
     * You can define only a specific "window" of data to load.
     *
     * @remarks
     * This is useful if you want to page data.
     */
    window?: DataViewWindow;
    /**
     * Indicates that the execution to obtain the data for the insight should be an 'execution by reference'.
     *
     * Execution by reference means that the useInsightDataView will ask analytical backend to compute results for an insight
     * which is stored on the backend by specifying link to the insight, additional filters and description how
     * to organize the data.
     *
     * Otherwise, a freeform execution is done, in which the InsightView will send to backend the full execution
     * definition of what to compute.
     *
     * This distinction is in place because some backends MAY want to prohibit users from doing freeform executions
     * and only allow computing data for set of insights created by admins.
     *
     * Note: the need for execute by reference is rare. You will typically be notified by the solution admin to use
     * this mode.
     */
    executeByReference?: boolean;
    /**
     * Backend to work with.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where execution should be executed.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
}

/**
 * @public
 */
export declare interface IUsePagedResourceResult<TItem> extends IUsePagedResourceState<TItem> {
    isLoading: boolean;
}

/**
 * @public
 */
export declare interface IUsePagedResourceState<TItem> {
    totalItemsCount: number | undefined;
    items: Array<TItem | undefined>;
}

/**
 * React hook to obtain and set {@link IPlaceholder} value.
 * @public
 */
export declare type IUsePlaceholderHook<T extends IPlaceholder<any>> = () => [
PlaceholderValue<T> | undefined,
(valueOrUpdateCallback: ValueOrUpdateCallback<PlaceholderValue<T> | undefined>) => void
];

/**
 * Super-interface for all visualization callbacks.
 *
 * @remarks
 * All visualizations SHOULD have at least these callbacks defined.
 *
 * @public
 */
export declare interface IVisualizationCallbacks {
    /**
     * Called when an error occurs while loading data for the visualization.
     */
    onError?: OnError;
    /**
     * Called when the visualization is ready to be exported.
     */
    onExportReady?: OnExportReady;
    /**
     * Called when loading status of the visualization changes - vis starts or stops loading
     */
    onLoadingChanged?: OnLoadingChanged;
    /**
     * Called when user triggers a drill on a visualization.
     */
    onDrill?: OnFiredDrillEvent;
    /**
     * @internal
     */
    afterRender?: () => void;
    /**
     * @internal
     */
    pushData?: (data: IPushData) => void;
}

/**
 * Super-interface for all visualization props.
 *
 * @remarks
 * Charts, tables or anything else - all should have these basic props.
 *
 * @public
 */
export declare interface IVisualizationProps {
    /**
     * Set Locale for visualization localization.
     *
     * @remarks
     * Note: This locale will be used for everything EXCEPT the data being visualized.
     */
    locale?: string;
    /**
     * Set title to use for exported files.
     *
     * @remarks
     * Note: you can also specify export file name as parameters to the export function which you
     * receive in the onExportReady. If you do not specify title here and neither as input to export function,
     * the the name will default to name of the visualization component.
     */
    exportTitle?: string;
    /**
     * Configure drillability; e.g. which parts of the visualization can be interacted with.
     */
    drillableItems?: ExplicitDrill[];
    /**
     * React component to display in the event when there is an error with either obtaining the data from
     * backend or with the data itself.
     */
    ErrorComponent?: React_2.ComponentType<IErrorProps>;
    /**
     * React component to display while loading data from the backend.
     */
    LoadingComponent?: React_2.ComponentType<ILoadingProps>;
}

/**
 * Configuration for the withExecution HOC. All configuration parameters can be either actual parameter values
 * or functions to obtain them from the wrapped component props.
 *
 * If functions are specified, the HOC will call them with the wrapped component props as parameter and then use
 * the resulting values as if they were passed directly.
 *
 * @internal
 */
export declare interface IWithExecution<T> {
    /**
     * Specify execution that the HOC will drive.
     */
    execution: IPreparedExecution | ((props: T) => IPreparedExecution) | ((props: T) => Promise<IPreparedExecution>);
    /**
     * Specify export title that will be used unless the export function caller sends their own custom title.
     *
     * @param props - props to retrieve export title from
     */
    exportTitle: string | ((props: T) => string);
    /**
     * Customize data window to load.
     *
     * By default the HOC loads all the data available in the execution's result.
     */
    window?: DataViewWindow | ((props: T) => DataViewWindow | undefined);
    /**
     * Specify event callbacks which the HOC will trigger in different situations.
     */
    events?: IWithLoadingEvents<T> | ((props: T) => IWithLoadingEvents<T>);
    /**
     * Customize, whether execution & data loading should start as soon as component is mounted.
     *
     * @remarks
     * Default is true. When not loading on mount, the wrapped component can trigger the load by calling the
     * reload() function which the HOC injects into its props.
     */
    loadOnMount?: boolean | ((props: T) => boolean);
    /**
     * Specify function that will be called during component prop updates and will be used to
     * determine whether execution should be re-run and data reloaded.
     *
     * @param prevProps - previous props
     * @param nextProps - next props
     */
    shouldRefetch?: (prevProps: T, nextProps: T) => boolean;
}

/**
 * Configuration for the {@link withExecutionLoading} HOC.
 *
 * @remarks
 * All configuration parameters can be either actual parameter values or functions to obtain them
 * from the wrapped component props.
 *
 * If functions are specified, the HOC will call them with the wrapped component props as parameter and then use
 * the resulting values as if they were passed directly.
 *
 * @internal
 */
export declare interface IWithExecutionLoading<TProps> {
    /**
     * Specify export title that will be used unless the export function caller sends their own custom title.
     *
     * @param props - props to retrieve export title from
     */
    exportTitle: string | ((props: TProps) => string);
    /**
     * Specify a factory function to create data promises, based on props and optionally the data window size.
     *
     * This is where the data is actually being loaded. And the HOC hides the promise from the wrapped component
     * which just receives the data.
     *
     * @param props - wrapped component props
     * @param window - data view window to retrieve, not specified in case all data should be retrieved
     */
    promiseFactory: (props: TProps, window?: DataViewWindow) => Promise<DataViewFacade>;
    /**
     * Specify data view window to retrieve from backend.
     *
     * @remarks
     * If specified as function, the function can return undefined in case all data must be retrieved.
     */
    window?: DataViewWindow | ((props: TProps) => DataViewWindow | undefined);
    /**
     * Specify event callbacks which the HOC will trigger in different situations.
     */
    events?: IWithLoadingEvents<TProps> | ((props: TProps) => IWithLoadingEvents<TProps>);
    /**
     * Customize, whether execution & data loading should start as soon as component is mounted.
     *
     * Default is true. When not loading on mount, the wrapped component can trigger the load by calling the
     * reload() function which the HOC injects into its props.
     */
    loadOnMount?: boolean | ((props: TProps) => boolean);
    /**
     * Specify function that will be called during component prop updates and will be used to
     * determine whether execution should be re-run and data reloaded.
     *
     * @param prevProps - previous props
     * @param nextProps - next props
     */
    shouldRefetch?: (prevProps: TProps, nextProps: TProps) => boolean;
}

/**
 * @public
 */
export declare interface IWithLoadingEvents<TProps> {
    /**
     * If specified, this function will be called in case loading runs into an error.
     *
     * @param error - an instance of error. see also GoodDataSdkError
     * @param props - props effective at the time of load
     */
    onError?: (error: GoodDataSdkError, props: TProps) => void;
    /**
     * Called when loading starts.
     *
     * @param props - props effective at the time of load
     */
    onLoadingStart?: (props: TProps) => void;
    /**
     * Called when loading finishes.
     *
     * @param result - result wrapped in data view facade
     * @param props - props effective at the time of load
     */
    onLoadingFinish?: (result: DataViewFacade, props: TProps) => void;
    /**
     * Called when loading starts and finishes, indicating the current state using the `isLoading` parameter.
     *
     * @param isLoading - true if loading, false if no longer loading
     * @param props - props effective at the time of load
     */
    onLoadingChanged?: (isLoading: boolean, props: TProps) => void;
    /**
     * Called when loading finishes and it is possible to export the underlying data. Function that does
     * the export will be provided on the callback.
     *
     * @param exportFunction - function to call if export is desired
     * @param props - props effective at the time export is ready
     */
    onExportReady?: (exportFunction: IExportFunction, props: TProps) => void;
}

/**
 * Props of the {@link WorkspaceProvider} component.
 * @public
 */
export declare interface IWorkspaceProviderProps {
    /**
     * Workspace with which the components should work with.
     */
    workspace: string;
    /**
     * React children
     */
    children?: React_2.ReactNode;
}

/**
 * Kpi is a simple component which calculates and renders a single formatted measure value.
 *
 * @remarks
 * The the value is rendered inside a <span> element.
 *
 * Kpi component is useful for instance for embedding data values into text paragraphs.
 *
 * See also the {@link @gooddata/sdk-ui-charts#Headline} component for a more 'chart-like' variant.
 *
 * @public
 */
export declare const Kpi: React_2.ComponentType<IKpiProps>;

/**
 * Component that renders a default loading indicator.
 *
 * @remarks
 * See {@link https://sdk.gooddata.com/gooddata-ui/docs/loading_component.html | LoadingComponent }
 *
 * @public
 */
export declare class LoadingComponent extends React_2.Component<ILoadingProps> {
    static defaultProps: Partial<ILoadingProps>;
    render(): JSX.Element;
}

/**
 * Array of locales for type-guard. It must be the same as {@link ILocale}
 *
 * @internal
 */
export declare const LOCALES: string[];

/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided local identifier.
 *
 * @public
 */
export declare function localIdentifierMatch(localIdOrMeasure: string | IMeasure): IHeaderPredicate;

/**
 * !!! USE WITH CAUTION !!! Opinionated utility to wrap promise and make it cancelable
 *
 * - It does not stop original promise execution after canceling, it just does not care about it's results anymore
 * (for example when react component unmounts)
 * - This is not meant to be universal solution to make promises cancelable, it's not easily composable,
 * and it's not good to solve more complex async logic
 * - For cancelable async operations, there are much better abstractions than promises, for example Tasks,
 * however there is no standard for this in JavaScript
 *
 * @internal
 */
export declare function makeCancelable<T>(promise: Promise<T>): ICancelablePromise<T>;

/**
 * Generate union of measures from union of measure definitions.
 *
 * @example
 * - IMeasureDefinition | IArithmeticMeasureDefinition is resolved as
 *   IMeasure\<IMeasureDefinition\> | IMeasure\<IArithmeticMeasureDefinition\>
 *
 * @public
 */
export declare type MeasureOf<T extends IMeasureDefinitionType> = T extends any ? IMeasure<T> : never;

/**
 * Alias for all possible measure or placeholder signatures.
 *
 * @public
 */
export declare type MeasureOrPlaceholder = ValueOrPlaceholder<AnyMeasure>;

/**
 * Alias for all possible measures or their placeholder signatures.
 *
 * @public
 */
export declare type MeasuresOrPlaceholders = ValuesOrPlaceholders<AnyMeasure>;

/**
 * @internal
 */
export declare const messagesMap: {
    [locale: string]: ITranslations;
};

/**
 * This error means that processed result contains negative values which does not make
 * sense within the given visualization (e.g. pie chart with negative values).
 *
 * @public
 */
export declare class NegativeValuesSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * Create a new composed placeholder.
 * See {@link IComposedPlaceholder}.
 *
 * @public
 */
export declare function newComposedPlaceholder<TValue extends any[], TReturn = PlaceholdersResolvedValues<TValue>, TContext = UnionToIntersection<ComposedPlaceholderResolutionContext<Flatten<TValue>>>>(placeholders: [...TValue], computeValue?: (values: PlaceholdersResolvedValues<TValue>, resolutionContext: TContext) => TReturn): IComposedPlaceholder<TReturn, TValue, TContext>;

/**
 * Returns a new, localized error code descriptors.
 *
 * @param intl - localizations
 * @returns always new instance
 * @public
 */
export declare function newErrorMapping(intl: IntlShape): IErrorDescriptors;

/**
 * Create a new placeholder.
 * See {@link IPlaceholder}.
 *
 * @public
 */
export declare function newPlaceholder<T>(defaultValue?: T, options?: IPlaceholderOptions<T>): IPlaceholder<T>;

/**
 * This error means that the processed result does not contain any data.
 *
 * @public
 */
export declare class NoDataSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * This error means that requested entity (e.g. a visualization) was not found on the server.
 *
 * @public
 */
export declare class NotFoundSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * Alias for all possible nullable filter or placeholder signatures.
 *
 * @public
 */
export declare type NullableFilterOrPlaceholder = FilterOrPlaceholder | ValueOrPlaceholder<INullableFilter> | ValueOrPlaceholder<IFilter | null> | ValueOrPlaceholder<IDateFilter | null> | ValueOrPlaceholder<IMeasureFilter | null> | ValueOrPlaceholder<IAttributeFilter | null> | ValueOrPlaceholder<IAbsoluteDateFilter | null> | ValueOrPlaceholder<IRelativeDateFilter | null> | ValueOrPlaceholder<IPositiveAttributeFilter | null> | ValueOrPlaceholder<INegativeAttributeFilter | null> | ValueOrPlaceholder<IMeasureValueFilter | null> | ValueOrPlaceholder<IRankingFilter | null>;

/**
 * Alias for all possible nullable filters or their placeholder signatures.
 *
 * @public
 */
export declare type NullableFiltersOrPlaceholders = Array<FilterOrMultiValuePlaceholder | ValueOrMultiValuePlaceholder<INullableFilter> | ValueOrMultiValuePlaceholder<IFilter | null> | ValueOrMultiValuePlaceholder<IDateFilter | null> | ValueOrMultiValuePlaceholder<IMeasureFilter | null> | ValueOrMultiValuePlaceholder<IAttributeFilter | null> | ValueOrMultiValuePlaceholder<IAbsoluteDateFilter | null> | ValueOrMultiValuePlaceholder<IRelativeDateFilter | null> | ValueOrMultiValuePlaceholder<IPositiveAttributeFilter | null> | ValueOrMultiValuePlaceholder<INegativeAttributeFilter | null> | ValueOrMultiValuePlaceholder<IMeasureValueFilter | null> | ValueOrMultiValuePlaceholder<IRankingFilter | null>>;

/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure matching
 * the provided object.
 *
 * @remarks
 * If the object is empty or is not attribute, simple measure or object reference, the function returns predicate
 * that is always falsy.
 *
 * @param obj - the object to be checked
 *
 * @public
 */
export declare function objMatch(obj: any): IHeaderPredicate;

/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided object reference.
 *
 * @public
 */
export declare function objRefMatch(objRef: ObjRef): IHeaderPredicate;

/**
 * @public
 */
export declare type OnError = (error: GoodDataSdkError) => void;

/**
 * @public
 */
export declare type OnExportReady = (exportFunction: IExportFunction) => void;

/**
 * @public
 */
export declare type OnFiredDrillEvent = IDrillEventCallback;

/**
 * @public
 */
export declare type OnLoadingChanged = (loadingState: ILoadingState) => void;

/**
 * @internal
 */
export declare type OverTimeComparisonType = "same_period_previous_year" | "previous_period" | "nothing";

/**
 * @internal
 */
export declare const OverTimeComparisonTypes: {
    SAME_PERIOD_PREVIOUS_YEAR: "same_period_previous_year";
    PREVIOUS_PERIOD: "previous_period";
    NOTHING: "nothing";
};

/**
 * @beta
 */
export declare const pickCorrectInsightWording: (translations: Record<string, string>, settings?: IWorkspaceSettings) => Record<string, string>;

/**
 * The function to pick correct wording 'measure' or 'metric'
 * @beta
 */
export declare const pickCorrectMetricWording: (translations: Record<string, string>, settings?: IWorkspaceSettings) => Record<string, string>;

/**
 * @beta
 */
export declare const pickCorrectWording: (translations: Record<string, string>, settings?: IWorkspaceSettings) => Record<string, string>;

/**
 * Wrap each member of the union type in AnyPlaceholder.
 *
 * @example
 * ```
 * IAttribute | IMeasure is resolved as AnyPlaceholder\<IAttribute\> | AnyPlaceholder\<IMeasure\>
 * ```
 *
 * @public
 */
export declare type PlaceholderOf<T> = T extends any ? AnyPlaceholder<T> : never;

/**
 * Convert any value that may contain placeholders to its resolved value type.
 *
 * @remarks
 * Nested array placeholders resolved value types are flattened.
 * If the type is not a placeholder, return the same type.
 *
 * @example
 * ```
 * IPlaceholder\<IAttribute\> is resolved as IAttribute
 * IPlaceholder\<IAttribute\>[] is resolved as IAttribute[]
 * IPlaceholder\<IAttribute[]\> is resolved as IAttribute[]
 * [IPlaceholder\<IAttribute[]\>, IPlaceholder\<IMeasure[]\>] is resolved as (IAttribute | IMeasure)[]
 * null is resolved as null
 * ```
 *
 * @public
 */
export declare type PlaceholderResolvedValue<T> = T extends Array<infer A> ? Flatten<PlaceholderResolvedValue<A>>[] : T extends IPlaceholder<infer B> ? B : T extends IComposedPlaceholder<infer C, any, any> ? C : T;

/**
 * Wraps component into a PlaceholdersContext consumer enabling the children of this to access the current
 * placeholders state.
 *
 * @public
 */
export declare function PlaceholdersProvider(props: IPlaceholdersProviderProps): JSX.Element;

/**
 * Convert tuple of values that may contain placeholders to tuple of their respective resolved value types.
 *
 * @example
 * ```
 * [IPlaceholder\<IAttribute\>, IPlaceholder\<IAttribute[]\>] is resolved as [IAttribute, IAttribute[]]
 * [IPlaceholder\<IMeasure\>, IMeasure] is resolved as [IMeasure, IMeasure]
 * ```
 *
 * @remarks
 * Check mapped tuple types for more details:
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#mapped-types-on-tuples-and-arrays
 *
 * @public
 */
export declare type PlaceholdersResolvedValues<Tuple extends any[]> = {
    [Index in keyof Tuple]: PlaceholderResolvedValue<Tuple[Index]>;
};

/**
 * Convert tuple of placeholders to tuple of their respective value types.
 *
 * @example
 * [IPlaceholder\<IAttribute\>, IPlaceholder\<IAttribute[]\>] is resolved as [IAttribute, IAttribute[]]
 *
 * @remarks
 * Check mapped tuple types for more details:
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#mapped-types-on-tuples-and-arrays
 *
 * @public
 */
export declare type PlaceholdersValues<Tuple extends [...any[]]> = {
    [Index in keyof Tuple]: PlaceholderValue<Tuple[Index]>;
};

/**
 * Get placeholder value type.
 *
 * @remarks
 * If the type is not a placeholder, return the same type.
 *
 * @example
 * ```
 * IPlaceholder\<IAttribute\> is resolved as IAttribute
 * IPlaceholder\<IAttribute[]\> is resolved as IAttribute[]
 * IComposedPlaceholder\<IMeasure\> is resolved as IMeasure
 * null is resolved as null
 * ```
 *
 * @public
 */
export declare type PlaceholderValue<T> = T extends IPlaceholder<infer A> ? A : T extends IComposedPlaceholder<infer B, any, any> ? B : T;

/**
 * This error means that requested visualization is restricted by access rules within the GoodData platform.
 * Please contact your administrator.
 *
 * @public
 */
export declare class ProtectedReportSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * @internal
 */
export declare type PushDataCallback = (data: IPushData) => void;

/**
 * Raw executor is the most basic React component to drive custom executions to obtain
 * data from backends.
 *
 * @remarks
 * The component accepts an instance of prepared execution and drives all the necessary
 * APIs and boilerplate needed to obtain a {@link DataViewFacade}.
 * Note that if the resulting data is empty this will NOT throw a {@link @gooddata/sdk-backend-spi#NoDataError}.
 * It is the responsibility of the child component to handle that if they need to.
 *
 * The rendering is delegated to a child component. This will be called every time the
 * state of the loading changes.
 *
 * @public
 */
export declare const RawExecute: React_2.ComponentClass<IRawExecuteProps, any>;

/**
 * @beta
 */
export declare const removeAllInsightToReportTranslations: (translations: Record<string, string>) => Record<string, string>;

/**
 * The function to remove all translation keys that contain special suffixes "|report", "|insight", "._measure" or "._metric"
 * @beta
 */
export declare const removeAllWordingTranslationsWithSpecialSuffix: (translations: Record<string, string>) => Record<string, string>;

/**
 * ResolvedClientWorkspaceProvider can be used as a replacement of the {@link WorkspaceProvider}, if you are accessing
 * workspace in LCM context.
 *
 * This provider expects that the client workspace is already resolved on input to the provider. The provider
 * will then establish a client workspace and workspace contexts so that the resolved information can
 * be accessed by the children.
 *
 * Note: check out the {@link ClientWorkspaceProvider} for version of provider that performs the resolution of
 * client workspace identifiers to workspace.
 *
 * @alpha
 */
export declare const ResolvedClientWorkspaceProvider: React_2.FC<IClientWorkspaceIdentifiers>;

/**
 * Resolves LCM workspace identifiers. This function will use the data product and client information
 * and consult the backend in order to obtain identifier of workspace contains analytics for that
 * data product & client combination.
 *
 * Note that at the moment only the bear Analytical Backend supports the workspace identification using
 * LCM workspace identifiers. Attempting to use this function for other backends will yield empty
 * result.
 *
 * @param backend - analytical backend to resolve client workspace identifiers on
 * @param clientWorkspace - client workspace identifiers; must contain data product and client identifier
 * @returns resolved IClientWorkspaceIdentifiers or an empty object if resolution is not possible
 * @alpha
 */
export declare function resolveLCMWorkspaceIdentifiers(backend: any, { client, dataProduct, workspace }: IClientWorkspaceIdentifiers): Promise<IClientWorkspaceIdentifiers>;

/**
 * Resolves parameter into {@link ILocale} or {@link DefaultLocale}.
 *
 * @param locale - value of the locale to check for support
 *
 * @internal
 */
export declare const resolveLocale: (locale: unknown) => ILocale;

/**
 * Resolve error of multiple {@link useCancelablePromise} hooks - gets first error in the sequence of cancelable promise states.
 *
 * @remarks
 * This is useful for useCancelablePromise composition - when you want to wrap multiple useCancelablePromise hooks in another hook,
 * and keep the return value shape of the hook same as for useCancelablePromise.
 *
 * @param states - cancelable promise states (useCancelablePromise return values)
 * @returns first error
 * @public
 */
export declare function resolveUseCancelablePromisesError<TError>(states: UseCancelablePromiseState<unknown, TError>[]): TError | undefined;

/**
 * Resolve status of multiple {@link useCancelablePromise} hooks.
 *
 * @remarks
 * This is useful for useCancelablePromise composition - when you want to wrap multiple useCancelablePromise hooks in another hook,
 * and keep the return value shape of the hook same as for useCancelablePromise.
 *
 * You can choose between 2 strategies to resolve the status (default strategy is "serial"):
 * - serial: Short-circuits to the first pending/loading/error status, and returns the last status
 *   only when all previous statuses are "success".
 * - parallel: Is resolved to the status which has the highest priority.
 *   Priority of the statuses has the following order (from highest to lowest): pending, loading, error, success.
 *   Examples:
 *     - ["pending", "loading"] will be resolved to "pending"
 *     - ["loading", "error"] will be resolved to "loading"
 *     - ["error", "success"] will be resolved to "error"
 *     - ["success", "success"] will be resolved to "success"
 *
 * @param states - cancelable promise states (useCancelablePromise return values)
 * @param options - specify options for resolving the status
 * @returns resolved status
 * @public
 */
export declare function resolveUseCancelablePromisesStatus(cancelablePromisesStates: UseCancelablePromiseState<unknown, unknown>[], options?: {
    strategy?: "serial" | "parallel";
}): UseCancelablePromiseStatus;

/**
 * @public
 */
export declare type SdkErrorType = keyof typeof ErrorCodes;

/**
 * Alias for all possible sorts or their placeholders signatures.
 *
 * @public
 */
export declare type SortsOrPlaceholders = ValuesOrPlaceholders<ISortItem>;

/**
 * @internal
 */
export declare type Subtract<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

/**
 * @public
 */
export declare type TableElementType = "cell";

/**
 * @public
 */
export declare type TableType = "table";

/**
 * Returns a string meant to represent the total colum when it is empty.
 * @param intl - the source of i18n strings
 * @internal
 */
export declare function totalColumnTitleFromIntl(intl: IntlShape): string;

/**
 * Alias for all possible totals or their placeholders signatures.
 *
 * @public
 */
export declare type TotalsOrPlaceholders = ValuesOrPlaceholders<ITotal>;

/**
 * @beta
 */
export declare const TranslationsCustomizationContextProvider: React_2.FC<ITranslationsCustomizationContextProviderProps>;

/**
 * This provider is here because of the need for customization of translations.
 *
 * @remarks
 * If you need to change translations based on some setting flag,
 * use this provider at the top of you your react tree.
 *
 * You can see that the provider accepts render function and customize function as parameters.
 * Using these two function you can customize your translations.
 *
 * @beta
 */
export declare const TranslationsCustomizationProvider: React_2.FC<ITranslationsCustomizationProviderProps>;

/**
 * @internal
 */
export declare class TranslationsProvider extends React_2.PureComponent<ITranslationsProviderProps> {
    render(): any;
}

/**
 * This error means that you are not authorized.
 *
 * @public
 */
export declare class UnauthorizedSdkError extends GoodDataSdkError {
    authenticationFlow?: AuthenticationFlow;
    constructor(message?: string, cause?: Error);
}

/**
 * This error means that GoodData.UI does not know how to handle such error.
 *
 * @public
 */
export declare class UnexpectedSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}

/**
 * Convert union type to intersection type.
 *
 * @example
 * ```
 * number | string | boolean is resolved as number & string & boolean
 * Type1 | Type2 | Type3 is resolved as Type1 & Type2 & Type3
 * ```
 *
 * @public
 */
export declare type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided URI.
 *
 * @public
 */
export declare function uriMatch(uri: string): IHeaderPredicate;

/**
 * Hook to get analytical backend instance provided to {@link BackendProvider}.
 *
 * @remarks
 * You can set a backend override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: For a better TypeScript experience without the hassle of undefined values, you can use the {@link useBackendStrict} hook.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useBackend();
 * const effectiveBackend = fromArguments ?? fromContext.
 * // you can write
 * const backend = useBackend(fromArguments);
 *```
 *
 * @param backend - backend to use instead of context value. If undefined, the context value is used.
 * @public
 */
export declare const useBackend: (backend?: IAnalyticalBackend) => IAnalyticalBackend | undefined;

/**
 * Hook to get analytical backend instance provided to {@link BackendProvider}.
 *
 * @remarks
 * You can set a backend override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: If you do not provide an {@link @gooddata/sdk-backend-spi#IAnalyticalBackend} instance to {@link BackendProvider} or as a parameter for this hook,
 * an invariant error is raised.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useBackendStrict();
 * const effectiveBackend = fromArguments ?? fromContext.
 * // you can write
 * const backend = useBackendStrict(fromArguments);
 *```
 *
 * @param backend - backend to use instead of context value. If undefined, the context value is used.
 * @param context - provide context to improve error message in raised invariant (e.g. parent hook name).
 * @public
 */
export declare const useBackendStrict: (backend?: IAnalyticalBackend, context?: string) => IAnalyticalBackend;

/**
 * This hook provides easy way to work with Promises in React components.
 *
 * @remarks
 * You can:
 * - watch it's status (pending/loading/success/error)
 * - get it's result/error when the Promise is resolved/rejected,
 * - attach convenient callbacks to it
 * - be sure, that when the dependency list changes, result will be still relevant (if previous Promise is still running, it's "canceled").
 *
 * Note that it's not recommended to use this hook for storing data on the backend
 * as it does not cancel requests wrapped in these promises
 * and you have no guarantee about the resolution order of the fired requests.
 *
 * @public
 */
export declare function useCancelablePromise<TResult, TError = any>(options: UseCancelablePromiseOptions<TResult, TError>, deps?: DependencyList): UseCancelablePromiseState<TResult, TError>;

/**
 * Callbacks for {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromiseCallbacks<TResult, TError> = {
    /**
     * onLoading is fired whenever the promise loading starts
     */
    onLoading?: () => void;
    /**
     * onPending is fired whenever the promise is not provided
     */
    onPending?: () => void;
    /**
     * onCancel is fired whenever the dependency list changes before the promise resolution
     */
    onCancel?: () => void;
    /**
     * onSuccess is fired whenever the promise is fulfilled
     */
    onSuccess?: (result: TResult) => void;
    /**
     * onError is fired whenever the promise is rejected
     */
    onError?: (err: TError) => void;
};

/**
 * Indicates error state for {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromiseErrorState<TError> = {
    result: undefined;
    error: TError;
    status: "error";
};

/**
 * Indicates loading state for {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromiseLoadingState = {
    result: undefined;
    error: undefined;
    status: "loading";
};

/**
 * Options for the {@link useCancelablePromise} hook.
 *
 * @public
 */
export declare type UseCancelablePromiseOptions<TResult, TError> = UseCancelablePromiseCallbacks<TResult, TError> & {
    promise: (() => Promise<TResult>) | undefined | null;
};

/**
 * Indicates pending state for {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromisePendingState = {
    result: undefined;
    error: undefined;
    status: "pending";
};

/**
 * Indicates the current state of {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromiseState<TResult, TError> = UseCancelablePromisePendingState | UseCancelablePromiseLoadingState | UseCancelablePromiseErrorState<TError> | UseCancelablePromiseSuccessState<TResult>;

/**
 * Indicates the current state of the promise inside {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromiseStatus = "success" | "error" | "loading" | "pending";

/**
 * Indicates success state for {@link useCancelablePromise} hook
 * @public
 */
export declare type UseCancelablePromiseSuccessState<TResult> = {
    result: TResult;
    error: undefined;
    status: "success";
};

/**
 * Hook to obtain loading error of the {@link ClientWorkspaceProvider}.
 * @alpha
 */
export declare const useClientWorkspaceError: () => GoodDataSdkError | undefined;

/**
 * Hook to obtain all resolved identifiers from the {@link ClientWorkspaceProvider} - workspace, segment, dataProduct and client.
 * @alpha
 */
export declare const useClientWorkspaceIdentifiers: () => IClientWorkspaceIdentifiers;

/**
 * Hook to check if client workspace is initialized.
 *
 * @alpha
 */
export declare const useClientWorkspaceInitialized: () => boolean;

/**
 * Hook to obtain loading status of the {@link ClientWorkspaceProvider} - "success", "error", "loading" or "pending".
 * @alpha
 */
export declare const useClientWorkspaceStatus: () => UseCancelablePromiseStatus;

/**
 * React hook to obtain composed placeholder value.
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 * See {@link IComposedPlaceholder}.
 *
 * @public
 */
export declare function useComposedPlaceholder<TContext, TPlaceholder extends IComposedPlaceholder<any, any, TContext>>(placeholder: TPlaceholder, resolutionContext?: TContext): PlaceholderResolvedValue<TPlaceholder>;

/**
 * This hook provides easy way to export data in your preferred format (csv/xlsx/raw) for the provided {@link @gooddata/sdk-backend-spi#IPreparedExecution}.
 *
 * @remarks
 * As a result, you will receive a string with uri, so you can easily create a download link.
 * Be aware that execution is re-executed only on dependency list change, not on execution/exportConfig/callbacks change.
 *
 * @public
 */
export declare function useDataExport({ execution, exportConfig, onCancel, onError, onLoading, onPending, onSuccess, }: {
    execution: IPreparedExecution | undefined | null;
    exportConfig?: IExportConfig;
} & UseDataExportCallbacks, deps?: DependencyList): UseDataExportState;

/**
 * Callbacks for useDataExport hook
 * @public
 */
export declare type UseDataExportCallbacks = UseCancelablePromiseCallbacks<string, GoodDataSdkError>;

/**
 * Indicates current state of useDataExport hook
 * @public
 */
export declare type UseDataExportState = UseCancelablePromiseState<string, GoodDataSdkError>;

/**
 * React hook to get data for a specific execution.
 *
 * @public
 */
export declare function useExecutionDataView(config: IUseExecutionDataViewConfig & UseExecutionDataViewCallbacks, deps?: React.DependencyList): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;

/**
 * Callbacks for {@link useExecutionDataView} hook.
 *
 * @public
 */
export declare type UseExecutionDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;

/**
 * React hook to get data for a specific insight.
 *
 * @public
 */
export declare function useInsightDataView(config: IUseInsightDataViewConfig & UseInsightDataViewCallbacks, deps?: React.DependencyList): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;

/**
 * Callbacks for {@link useInsightDataView} hook.
 *
 * @public
 */
export declare type UseInsightDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;

/**
 * Hook for getting data from paged resource
 * @public
 */
export declare function usePagedResource<TParams, TItem>(resourceFactory: (params: TParams) => Promise<IPagedResource<TItem>>, fetchParams: TParams[], fetchDeps: React.DependencyList, resetDeps: React.DependencyList, getCacheKey?: (params: TParams) => string, initialState?: IUsePagedResourceState<TItem>, preventResetPromises?: boolean): IUsePagedResourceResult<TItem>;

/**
 * React hook to obtain/set placeholder value.
 *
 * @remarks
 * See {@link IPlaceholder}.
 *
 * Note: When placeholder is not provided, setting its value will result in the error.
 *
 * @public
 */
export declare function usePlaceholder<T extends IPlaceholder<any>>(placeholder?: T): [
PlaceholderValue<T> | undefined,
(valueOrUpdateCallback: ValueOrUpdateCallback<PlaceholderValue<T> | undefined>) => void
];

/**
 * React hook to obtain/set multiple placeholder values at once.
 *
 * @remarks
 * This is useful to perform placeholders atomic change.
 * See {@link IPlaceholder}.
 * @public
 */
export declare function usePlaceholders<T extends IPlaceholder<any>[]>(placeholders: [...T]): [PlaceholdersValues<T>, (valueOrUpdateCallback: ValueOrUpdateCallback<PlaceholdersValues<T>>) => void];

/**
 * Hook for tracking the previous value of the React component prop.
 * This is useful as a replacement for the componentWillReceiveProps lifecycle method.
 * See: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @internal
 */
export declare const usePrevious: <T>(props: T) => T;

/**
 * React hook that resolves multiple value(s) that can possibly contain also placeholder(s) to actual value(s).
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 *
 * @public
 */
export declare function useResolveValuesWithPlaceholders<T extends any[], C>(values: [...T], resolutionContext?: C): PlaceholdersResolvedValues<T>;

/**
 * React hook that resolves any value(s) that can possibly contain also placeholder(s) to actual value(s).
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 *
 * @public
 */
export declare function useResolveValueWithPlaceholders<T, C>(value: T, resolutionContext?: C): PlaceholderResolvedValue<T>;

/**
 * Hook to get workspace instance provided to {@link WorkspaceProvider}.
 *
 * @remarks
 * You can set a workspace override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: For a better TypeScript experience without the hassle of undefined values, you can use the {@link useWorkspaceStrict} hook.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useWorkspace();
 * const effectiveWorkspace = fromArguments ?? fromContext.
 * // you can write
 * const workspace = useWorkspace(fromArguments);
 *```
 *
 * @param workspace - workspace to use instead of context value. If undefined, the context value is used.
 * @public
 */
export declare const useWorkspace: (workspace?: string) => string | undefined;

/**
 * Hook to get workspace instance provided to {@link WorkspaceProvider}.
 *
 * @remarks
 * You can set a workspace override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: Note: If you do not provide a workspace identifier to {@link WorkspaceProvider} or as a parameter for this hook,
 * an invariant error is raised.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useWorkspaceStrict();
 * const effectiveWorkspace = fromArguments ?? fromContext.
 * // you can write
 * const workspace = useWorkspaceStrict(fromArguments);
 * ```
 *
 * @param workspace - workspace to use instead of context value. If undefined, the context value is used.
 * @param context - provide context to improve error message in raised invariant (e.g. parent hook name).
 * @public
 */
export declare const useWorkspaceStrict: (workspace?: string, context?: string) => string;

/**
 * @public
 */
export declare type ValueFormatter = (value: DataValue, format: string) => string;

/**
 * @public
 */
export declare type ValueOrMultiValuePlaceholder<T> = ValueOrPlaceholder<T> | AnyPlaceholderOf<T[]>;

/**
 * Represents value of type T or any placeholder that may hold value T.
 *
 * @public
 */
export declare type ValueOrPlaceholder<T> = T | AnyPlaceholderOf<T>;

/**
 * Represents array of values T or placeholders that may hold value T.
 *
 * @public
 */
export declare type ValuesOrPlaceholders<T> = AnyArrayOf<ValueOrMultiValuePlaceholder<T>>;

/**
 * @public
 */
export declare type VisElementType = ChartElementType | HeadlineElementType | TableElementType | "pushpin";

/**
 * @public
 */
export declare type VisType = ChartType | HeadlineType | TableType | XirrType;

/**
 * @internal
 */
export declare type VisualizationEnvironment = "none" | "dashboards" | "analyticalDesigner";

/**
 * @internal
 */
export declare function visualizationIsBetaWarning(): void;

/**
 * @internal
 */
export declare const VisualizationTypes: {
    BAR: "bar";
    COLUMN: "column";
    LINE: "line";
    PIE: "pie";
    DONUT: "donut";
    TABLE: "table";
    HEADLINE: "headline";
    AREA: "area";
    SCATTER: "scatter";
    BUBBLE: "bubble";
    HEATMAP: "heatmap";
    GEO: "geo";
    PUSHPIN: "pushpin";
    COMBO: "combo";
    COMBO2: "combo2";
    HISTOGRAM: "histogram";
    BULLET: "bullet";
    TREEMAP: "treemap";
    WATERFALL: "waterfall";
    FUNNEL: "funnel";
    PYRAMID: "pyramid";
    PARETO: "pareto";
    ALLUVIAL: "alluvial";
    SANKEY: "sankey";
    DEPENDENCY_WHEEL: "dependencywheel";
    XIRR: "xirr";
};

/**
 * Wraps component into a BackendContext consumer - injecting an instance of backend from context into the
 * backend prop.
 *
 * @internal
 */
export declare function withBackend<T extends {
    backend?: IAnalyticalBackend;
}>(Component: React_2.ComponentType<T>): React_2.ComponentType<T>;

/**
 * Injects backend and workspace provided by BackendProvider & WorkspaceProvider to a component
 * @internal
 */
export declare function withContexts<T extends {
    backend?: IAnalyticalBackend;
    workspace?: string;
}>(Chart: React.ComponentType<T>): React.ComponentType<T>;

/**
 * A HOC to wrap data visualization components with loading / error handling.
 *
 * Note: this is a legacy HOC with a long history. In v7 we had VisualizationLoadingHOC - that one was used for
 * all components and was linked to AFM and the paging and everything. We took this and gutted it out, changed to
 * work with executions and to only support reading all the data.
 *
 * @param InnerComponent - component to wrap
 * @internal
 */
export declare function withEntireDataView<T extends IDataVisualizationProps>(InnerComponent: React_2.ComponentClass<T & ILoadingInjectedProps>): React_2.ComponentClass<T>;

/**
 * A React HOC that for driving an execution to get data view that can be visualized.
 *
 * Note that if the resulting data is empty this will NOT throw a NoDataError.
 *
 * @internal
 */
export declare function withExecution<T>(params: IWithExecution<T>): (WrappedComponent: React.ComponentType<T & WithLoadingResult>) => React.ComponentClass<T, any>;

/**
 * A React HOC responsible for orchestrating resolution of a data promise (e.g. data to load).
 *
 * This component offers more flexibility in regards to how to obtain the data - all that is encapsulated
 * into a promise of data. For most use cases, the withExecution HOC is a better fit.
 *
 * @internal
 */
export declare function withExecutionLoading<TProps>(params: IWithExecutionLoading<TProps>): (WrappedComponent: React_2.ComponentType<TProps & WithLoadingResult>) => React_2.ComponentClass<TProps>;

/**
 * @internal
 */
export declare function withIntl<P>(WrappedComponent: React_2.FC<P> | React_2.ComponentClass<P>, customLocale?: ILocale, customMessages?: ITranslations): React_2.ComponentType<P>;

/**
 * @public
 */
export declare type WithLoadingResult = {
    /**
     * The result of a successful loading is an instance of {@link DataViewFacade}. If this property
     * is undefined, then the data is not (yet) loaded.
     */
    result: DataViewFacade | undefined;
    /**
     * The result of failed loading. If this property is undefined, then no error has occurred (yet).
     */
    error: GoodDataSdkError | undefined;
    /**
     * Indicates whether loading is in progress or not. This value will be `false` when loading finished
     * successfully or when loading has failed. Otherwise it will be set to true.
     */
    isLoading: boolean;
    /**
     * Callback to trigger load or reload of data.
     */
    reload: () => void;
};

/**
 * @beta
 */
export declare function withTranslationsCustomization<T>(Component: React_2.ComponentType<T>): React_2.ComponentType<Omit<T, "translationsCustomizationIsLoading" | "translations">>;

/**
 * Wraps component into a WorkspaceContext consumer - injecting an instance of workspace from context into the
 * workspace prop.
 *
 * @internal
 */
export declare function withWorkspace<T extends {
    workspace?: string;
}>(Component: React_2.ComponentType<T>): React_2.ComponentType<T>;

/**
 * WorkspaceProvider can be used to inject analytical workspace instance to all ui-sdk components in your app.
 *
 * @public
 */
export declare const WorkspaceProvider: React_2.FC<IWorkspaceProviderProps>;

/**
 * Wrap displayName of React component
 * @internal
 */
export declare const wrapDisplayName: (hocName: string, BaseComponent?: React.ComponentType<any>) => <T>(Component: ComponentType<T>) => ComponentType<T>;

/**
 * @public
 */
export declare type XirrType = "xirr";

export { }
