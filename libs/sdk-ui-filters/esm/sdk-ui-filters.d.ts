/**
 * This package provides several React components related to filters.
 *
 * @remarks
 * These include attribute filters, measure value filters, ranking filters, and date filters and utilities
 * to work with those. You can use them to quickly add filtering to your application.
 *
 * @packageDocumentation
 */

/// <reference types="react" />

import { AttributeFiltersOrPlaceholders } from '@gooddata/sdk-ui';
import { DashboardAttributeFilterSelectionMode } from '@gooddata/sdk-model';
import { DashboardDateFilterConfigMode } from '@gooddata/sdk-model';
import { DateFilterGranularity } from '@gooddata/sdk-model';
import { DateFilterOption as DateFilterOption_2 } from './interfaces/index.js';
import { DateString } from '@gooddata/sdk-model';
import { ElementsQueryOptionsElementsSpecification } from '@gooddata/sdk-backend-spi';
import { GoodDataSdkError } from '@gooddata/sdk-ui';
import { GranularityIntlKey as GranularityIntlKey_2 } from './constants/i18n.js';
import { IAbsoluteDateFilterForm } from '@gooddata/sdk-model';
import { IAbsoluteDateFilterPreset } from '@gooddata/sdk-model';
import { IAlignPoint } from '@gooddata/sdk-ui-kit';
import { IAllTimeDateFilterOption } from '@gooddata/sdk-model';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttributeDisplayFormMetadataObject } from '@gooddata/sdk-model';
import { IAttributeElement } from '@gooddata/sdk-model';
import { IAttributeFilter } from '@gooddata/sdk-model';
import { IAttributeMetadataObject } from '@gooddata/sdk-model';
import { IDataSetMetadataObject } from '@gooddata/sdk-model';
import { IDateAndMessageTranslator as IDateAndMessageTranslator_2 } from './utils/Translations/Translators.js';
import { IDateFilter } from '@gooddata/sdk-model';
import { IDateFilterOptionsByType as IDateFilterOptionsByType_2 } from './interfaces/index.js';
import { IElementsQueryAttributeFilter } from '@gooddata/sdk-backend-spi';
import { IExtendedDateFilterErrors as IExtendedDateFilterErrors_2 } from './interfaces/index.js';
import { ILocale } from '@gooddata/sdk-ui';
import { IMeasure } from '@gooddata/sdk-model';
import { IMeasureValueFilter } from '@gooddata/sdk-model';
import { IntlShape } from 'react-intl';
import { IPlaceholder } from '@gooddata/sdk-ui';
import { IRankingFilter } from '@gooddata/sdk-model';
import { IRelativeDateFilter } from '@gooddata/sdk-model';
import { IRelativeDateFilterForm } from '@gooddata/sdk-model';
import { IRelativeDateFilterPreset } from '@gooddata/sdk-model';
import { IRelativeDateFilterPresetOfGranularity } from '@gooddata/sdk-model';
import { ISeparators } from '@gooddata/sdk-ui';
import { ObjRef } from '@gooddata/sdk-model';
import { ObjRefInScope } from '@gooddata/sdk-model';
import { default as React_2 } from 'react';
import { ReactNode } from 'react';
import { RelativeDateFilterGranularityOffset } from '@gooddata/sdk-model';
import { SortDirection } from '@gooddata/sdk-model';
import { WeekStart } from '@gooddata/sdk-model';

/**
 * Represents a absolute date filter option in the date filter dropdown
 * @public
 */
export declare type AbsoluteDateFilterOption = IUiAbsoluteDateFilterForm | IAbsoluteDateFilterPreset;

/**
 * Represents the current status of the asynchronous operation.
 *
 * @public
 */
export declare type AsyncOperationStatus = "pending" | "loading" | "success" | "error" | "canceled";

/**
 * @internal
 */
export declare const AttributeDatasetInfo: React_2.FC<IAttributeDatasetInfoProps>;

/**
 * Component that render Attribute display forms selector as dropdown.
 * @internal
 */
export declare const AttributeDisplayFormSelect: React_2.FC<IAttributeDisplayFormSelectProps>;

/**
 * Unique key to identify the attribute element - its uri, value or primaryKey.
 *
 * @public
 */
export declare type AttributeElementKey = string | null;

/**
 * AttributeFilter is a component that renders a simple button and a dropdown populated with attribute values
 * for specified attribute display form.
 *
 * @public
 */
export declare const AttributeFilter: React_2.FC<IAttributeFilterProps>;

/**
 * Component that display message that all elements are filtered out by parent filers.
 * @beta
 */
export declare const AttributeFilterAllValuesFilteredResult: React_2.FC<IAttributeFilterAllValuesFilteredResultProps>;

/**
 * AttributeFilterButton is a component that renders a rich button and a dropdown populated with attribute values
 * for specified attribute display form.
 * @public
 */
export declare const AttributeFilterButton: React_2.FC<IAttributeFilterButtonProps>;

/**
 * Tooltip details for the AttributeFilterDropdownButton.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton tooltip details in the GoodData look and feel.
 * It displays the default title, custom title and data set title of the related attribute filter.
 *
 * @beta
 */
export declare const AttributeFilterButtonToolip: React_2.FC<{
    children?: React_2.ReactNode;
}>;

/**
 * @internal
 */
export declare const AttributeFilterConfigurationButton: React_2.VFC<IAttributeFilterConfigurationButtonProps>;

/**
 * AttributeFilter controller return type.
 *
 * @public
 */
export declare type AttributeFilterController = AttributeFilterControllerData & AttributeFilterControllerCallbacks;

/**
 * AttributeFilter controller callbacks.
 *
 * @public
 */
export declare type AttributeFilterControllerCallbacks = {
    /**
     * Apply changes from working selection to committed selection.
     */
    onApply: () => void;
    /**
     * Request next page of elements that respect current search criteria.
     */
    onLoadNextElementsPage: () => void;
    /**
     * Search elements.
     */
    onSearch: (search: string) => void;
    /**
     * Change working selection.
     */
    onSelect: (selectedItems: IAttributeElement[], isInverted: boolean) => void;
    /**
     * Reset working selection.
     */
    onReset: () => void;
};

/**
 * AttributeFilter controller state.
 *
 * @public
 */
export declare type AttributeFilterControllerData = {
    /**
     * Loaded attribute.
     */
    attribute: IAttributeMetadataObject;
    /**
     * Current offset used for the attribute element loading.
     */
    offset: number;
    /**
     * Current limit used for the attribute element loading.
     */
    limit: number;
    /**
     * If true, AttributeFilter is filtering elements.
     */
    isFiltering: boolean;
    /**
     * If true, AttributeFilter is initializing internal data and elements
     */
    isInitializing: boolean;
    /**
     * Error that occurred during the initialization, if any.
     */
    initError?: GoodDataSdkError;
    /**
     * If true, the first elements page is loading.
     */
    isLoadingInitialElementsPage: boolean;
    /**
     * Error that occurred during the initial elements page load, if any.
     */
    initialElementsPageError?: GoodDataSdkError;
    /**
     * If true, the next elements page is loading.
     */
    isLoadingNextElementsPage: boolean;
    /**
     * Error that occurred during the next elements page load, if any.
     */
    nextElementsPageError?: GoodDataSdkError;
    /**
     * Next element page size
     */
    nextElementsPageSize: number;
    /**
     * All attribute elements loaded by initialElementsPageLoad and all nextElementsPageLoad.
     */
    elements: IAttributeElement[];
    /**
     * Total count of the attribute elements.
     */
    totalElementsCount: number;
    /**
     * Total count of the attribute elements with currently set options.
     */
    totalElementsCountWithCurrentSettings: number;
    /**
     * If true, selection has changes or the number of selected elements reached the limit of maximum selection size.
     */
    isApplyDisabled: boolean;
    /**
     * If true, the current working selection is inverted.
     */
    isWorkingSelectionInverted: boolean;
    /**
     * List of all elements in current working selection.
     */
    workingSelectionElements: IAttributeElement[];
    /**
     * If true, the committed selection is inverted.
     */
    isCommittedSelectionInverted: boolean;
    /**
     * List of all elements in committed selection.
     */
    committedSelectionElements: IAttributeElement[];
    /**
     * Current search string.
     */
    searchString: string;
    /**
     * If true, AttributeFilter is filtering elements by parent filters.
     */
    isFilteredByParentFilters: boolean;
    /**
     * List of parent filters Attributes.
     */
    parentFilterAttributes: IAttributeMetadataObject[];
    /**
     * Display forms of the attribute.
     */
    displayForms: IAttributeDisplayFormMetadataObject[];
    /**
     * Current attribute filter display form {@link @gooddata/sdk-model#ObjRef}.
     */
    currentDisplayFormRef: ObjRef;
};

/**
 * @internal
 */
export declare const AttributeFilterDeleteButton: React_2.VFC<IAttributeFilterDeleteButtonProps>;

/**
 * This component displays two buttons Apply and Cancel.
 * Apply button is disabled when selection is not changed.
 * Cancel button discard changes and close AttributeFilter dropdown.
 *
 * @beta
 */
export declare const AttributeFilterDropdownActions: React_2.VFC<IAttributeFilterDropdownActionsProps>;

/**
 * Component showing a list of elements and controls for manipulating the selection.
 *
 * @remarks
 * It uses a component using the {@link IAttributeFilterElementsSelectProps} props for search and manipulation of filter selection
 * and a component using the {@link IAttributeFilterDropdownActionsProps} props to confirm or cancel changes.
 *
 * @beta
 */
export declare const AttributeFilterDropdownBody: React_2.FC<IAttributeFilterDropdownBodyProps>;

/**
 * Dropdown button for the AttributeFilter.
 *
 * @remarks
 * This component implements the {@link IAttributeFilterDropdownButtonProps} interface.
 * It displays AttributeFilterDropdownButton in the GoodData look and feel.
 * It displays the name of the related attribute filter as a title and the state of the selection as a subtitle.
 * It displays loading and filtering statuses.
 * It supports setting a left icon and dragging icons.
 *
 * @beta
 */
export declare const AttributeFilterDropdownButton: React_2.VFC<IAttributeFilterDropdownButtonProps>;

/**
 * It displays three state a checkbox and allow select all or none elements that respect current search criteria.
 * It also displays a number of elements that respect current search criteria.
 *
 * @beta
 */
export declare const AttributeFilterElementsActions: React_2.VFC<IAttributeFilterElementsActionsProps>;

/**
 * This component displays a text field and calls onSearch callback when user types search text.
 *
 * @beta
 */
export declare const AttributeFilterElementsSearchBar: React_2.VFC<IAttributeFilterElementsSearchBarProps>;

/**
 * This component allows users to search Attribute Filter elements.
 * It manipulates selection.
 * It displays statues like loading, filtering etc.
 * It allows paging.
 * It displays selection status like number of elements and selected elements labels.
 * It displays messages when elements are filtered out by parent filters or the result of search is empty.
 *
 * @beta
 */
export declare const AttributeFilterElementsSelect: React_2.FC<IAttributeFilterElementsSelectProps>;

/**
 * Component that displays a generic error message.
 * @beta
 */
export declare const AttributeFilterElementsSelectError: React_2.VFC;

/**
 * This component represents the Attribute Filter element.
 * It displays a checkbox to add/remove to/from selection.
 * It allows users to add only this item to selection.
 * It also displays a localized empty element label in case element value is empty.
 *
 * @beta
 */
export declare const AttributeFilterElementsSelectItem: React_2.VFC<IAttributeFilterElementsSelectItemProps>;

/**
 * Component displays loading indicator.
 *
 * @beta
 */
export declare const AttributeFilterElementsSelectLoading: React_2.VFC<IAttributeFilterElementsSelectLoadingProps>;

/**
 * A component that displays a message that Attribute Filer has any elements.
 * @beta
 */
export declare const AttributeFilterEmptyAttributeResult: React_2.VFC;

/**
 * This component displays different types of messages for situations when all elements are filtered out.
 * It distinguishes messages when current criteria return empty results or all elements are filtered by parents or by search.
 * @beta
 */
export declare const AttributeFilterEmptyResult: React_2.VFC<IAttributeFilterEmptyResultProps>;

/**
 * Component that displays empty result message
 * @beta
 */
export declare const AttributeFilterEmptySearchResult: React_2.VFC;

/**
 * AttributeFilter error component that display error,
 * It does not distinguish different errors, instead it renders a generic error message.
 * @beta
 */
export declare const AttributeFilterError: React_2.VFC<IAttributeFilterErrorProps>;

/**
 * It displays list of parent filters
 * @beta
 */
export declare const AttributeFilterFilteredStatus: React_2.FC<IAttributeFilterFilteredStatusProps>;

/**
 * AttributeFilter component that displays a loading indicator.
 *
 * @beta
 */
export declare const AttributeFilterLoading: React_2.FC<IAttributeFilterLoadingProps>;

/**
 * A component that displays status of current selection, like number of selected elements, if Attribute Filter is inverted and list of selected elements.
 * @beta
 */
export declare const AttributeFilterSelectionStatus: React_2.FC<IAttributeFilterSelectionStatusProps>;

/**
 * Component using the {@link IAttributeFilterDropdownButtonProps} props showing just the attribute title.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton as a simple button.
 * It displays the name of the related attribute filter.
 * It displays loading and filtering statuses.
 *
 * @beta
 */
export declare const AttributeFilterSimpleDropdownButton: React_2.VFC<IAttributeFilterDropdownButtonProps>;

/**
 * Component using the {@link IAttributeFilterDropdownButtonProps} props showing the attribute title and selection.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton as a simple button.
 * It displays the name of related attribute filter.
 * It displays state of selection and selection count.
 * It displays loading and filtering statuses.
 *
 * @beta
 */
export declare const AttributeFilterSimpleDropdownButtonWithSelection: React_2.VFC<IAttributeFilterDropdownButtonProps>;

/**
 * A component that displays status of current selection, like number of selected elements, if Attribute Filter is inverted and list of selected elements.
 *
 * @beta
 */
export declare const AttributeFilterStatusBar: React_2.FC<IAttributeFilterStatusBarProps>;

/**
 * @public
 */
export declare type Callback<T> = (payload: T) => void;

/**
 * @public
 */
export declare type CallbackPayloadWithCorrelation<T = {}> = T & {
    correlation: Correlation;
};

/**
 * @public
 */
export declare type CallbackRegistration<T> = (cb: Callback<T>) => Unsubscribe;

/**
 * @public
 */
export declare type Correlation = string;

/**
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/date_filter_component.html | DateFilter} is a component for configuring a date filter value.
 *
 * @public
 */
export declare class DateFilter extends React_2.PureComponent<IDateFilterProps, IDateFilterState> {
    static defaultProps: Partial<IDateFilterProps>;
    static getDerivedStateFromProps(nextProps: IDateFilterProps, prevState: IDateFilterState): IDateFilterState;
    private static getStateFromProps;
    private static getStateFromSelectedOption;
    private static checkInitialFilterOption;
    constructor(props: IDateFilterProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private handleApplyClick;
    private onChangesDiscarded;
    private onCancelClicked;
    private onDropdownOpenChanged;
    private handleExcludeCurrentPeriodChange;
    private handleSelectedFilterOptionChange;
}

/**
 * @beta
 */
export declare const DateFilterHelpers: {
    validateFilterOption: (filterOption: DateFilterOption_2) => IExtendedDateFilterErrors_2;
    getDateFilterTitle: (filter: DateFilterOption_2, locale: ILocale, dateFormat?: string) => string;
    getDateFilterTitleUsingTranslator: (filter: DateFilterOption_2, translator: IDateAndMessageTranslator_2, dateFormat?: string) => string;
    getDateFilterRepresentation: (filter: DateFilterOption_2, locale: ILocale, dateFormat?: string) => string;
    granularityIntlCodes: {
        "GDC.time.year": GranularityIntlKey_2;
        "GDC.time.week_us": GranularityIntlKey_2;
        "GDC.time.quarter": GranularityIntlKey_2;
        "GDC.time.month": GranularityIntlKey_2;
        "GDC.time.date": GranularityIntlKey_2;
        "GDC.time.hour": GranularityIntlKey_2;
        "GDC.time.minute": GranularityIntlKey_2;
    };
    applyExcludeCurrentPeriod: (dateFilterOption: DateFilterOption_2, excludeCurrentPeriod: boolean) => DateFilterOption_2;
    defaultDateFilterOptions: IDateFilterOptionsByType_2;
    canExcludeCurrentPeriod: (dateFilterOption: DateFilterOption_2) => boolean;
    mapOptionToAfm: (value: DateFilterOption_2, dateDataSet: ObjRef, excludeCurrentPeriod: boolean) => IDateFilter;
    formatAbsoluteDateRange: (from: string | Date, to: string | Date, dateFormat: string) => string;
    formatRelativeDateRange: (from: number, to: number, granularity: DateFilterGranularity, translator: IDateAndMessageTranslator_2) => string;
    filterVisibleDateFilterOptions: typeof filterVisibleDateFilterOptions;
};

/**
 * Represents any option in the date filter dropdown
 * @public
 */
export declare type DateFilterOption = IAllTimeDateFilterOption | AbsoluteDateFilterOption | RelativeDateFilterOption;

/**
 * Relative date filter options grouped by their granularity
 * @public
 */
export declare type DateFilterRelativeOptionGroup = {
    [key in DateFilterGranularity]?: Array<IRelativeDateFilterPresetOfGranularity<key>>;
};

/**
 * The default set of date filter options.
 *
 * @public
 */
export declare const defaultDateFilterOptions: IDateFilterOptionsByType;

/**
 * This component render empty ElementsSearchBar
 * @internal
 */
export declare const EmptyElementsSearchBar: React_2.VFC<IAttributeFilterElementsSearchBarProps>;

/**
 * Returns dateFilterOptions with only items that have visible set to true.
 *
 * @param dateFilterOptions - options to filter
 * @public
 */
export declare function filterVisibleDateFilterOptions(dateFilterOptions: IDateFilterOptionsByType): IDateFilterOptionsByType;

/**
 * Returns localized date format pattern for DAY granularity according to ICU. Unsupported locales default to en-US.
 *
 * See https://date-fns.org/docs/format and https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * @internal
 */
export declare const getLocalizedIcuDateFormatPattern: (locale: string) => string;

/**
 * @beta
 */
export declare type GranularityIntlKey = "day" | "minute" | "hour" | "week" | "month" | "quarter" | "year";

/**
 * @internal
 */
export declare interface IAttributeDatasetInfoProps {
    title?: string;
    defaultAttributeFilterTitle?: string;
    attributeDataSet?: IDataSetMetadataObject;
}

/**
 * It is AttributeDisplayFormSelect
 * It represents selector for related Attribute display forms
 * @internal
 */
export declare interface IAttributeDisplayFormSelectProps {
    onSelect: (displayForm: ObjRef) => void;
    alignPoints?: IAlignPoint[];
}

/**
 * @beta
 */
export declare interface IAttributeDropdownItem {
    title: string;
    ref: ObjRefInScope;
    type?: "DATE" | "ATTRIBUTE";
}

/**
 * Handles the loading of the attribute elements.
 *
 * @public
 */
export declare interface IAttributeElementLoader {
    /**
     * Resets the paging and loads the attribute elements with the current options.
     *
     * @remarks
     * You should call this every time you change the load options (eg search, limit, limitingAttribute filters, etc).
     *
     * Throws error if you call it before the initialization.
     *
     * Throws error if you combine staticElements with unsupported elements load options (limitingAttributeFilters, limitingMeasures or limitingDateFilters).
     *
     * Cancels the running initial elements page load, if any, and starts it again.
     *
     * Cancels the running next elements page load, if any.
     *
     * You can provide a correlation that will be included in the payload of all callbacks fired as a result of calling this method.
     *
     * @param correlation - correlation that will be included in all callbacks fired by this method
     */
    loadInitialElementsPage(correlation?: Correlation): void;
    /**
     * Cancels the running initial elements page load, if any.
     */
    cancelInitialElementsPageLoad(): void;
    /**
     * Loads next page of the attribute elements with the current options.
     *
     * @remarks
     * Throws error if you call it before the initialization.
     *
     * Throws error if you changed the load options and did not called loadInitialElementsPage before.
     *
     * Cancels the running next elements page load, if any, and starts it again.
     *
     * You can provide a correlation that will be included in the payload of all callbacks fired as a result of calling this method.
     *
     * @param correlation - correlation that will be included in all callbacks fired by this method
     */
    loadNextElementsPage(correlation?: Correlation): void;
    /**
     * Cancels the running next elements page load, if any.
     */
    cancelNextElementsPageLoad(): void;
    /**
     * Loads the attribute elements with the provided options.
     *
     * @remarks
     * This is useful, if you want to load additional attribute elements with different options than the currently set.
     *
     * Multiple custom elements loads will run in parallel.
     *
     * Cancels the running custom elements load, if it matches the specified correlation, and starts it again.
     *
     * You can provide a correlation that will be included in the payload of all callbacks fired as a result of calling this method.
     *
     * @param options - options to apply for the custom elements load
     * @param correlation - correlation that will be included in all callbacks fired by this method
     */
    loadCustomElements(options: ILoadElementsOptions, correlation?: Correlation): void;
    /**
     * Cancels the running custom elements load, if it matches the specified correlation.
     */
    cancelCustomElementsLoad(correlation?: Correlation): void;
    /**
     * Set the limit for the upcoming attribute element loads.
     *
     * @remarks
     * When you change the options for the attribute element loads, you should call initial elements page load.
     *
     * @param limit - the limit to use.
     */
    setLimit(limit: number): void;
    /**
     * Set the order for the upcoming attribute element loads.
     *
     * @remarks
     * When you change the options for the attribute element loads, you should call initial elements page load.
     *
     * @param order - the order to use.
     */
    setOrder(order: SortDirection): void;
    /**
     * Set the search to filter the upcoming attribute element loads.
     *
     * @remarks
     * When you change the options for the attribute element loads, you should call initial elements page load.
     *
     * @param search - the search string to use. Use empty string to reset search.
     */
    setSearch(search: string): void;
    /**
     * Set the measures to filter the upcoming attribute element loads.
     *
     * @remarks
     * When you change the options for the attribute element loads, you should call initial elements page load.
     *
     * @param measures - measures to use.
     */
    setLimitingMeasures(measures: IMeasure[]): void;
    /**
     * Set the attribute filters to filter the upcoming attribute element loads.
     *
     * @remarks
     * When you change the options for the attribute element loads, you should call initial elements page load.
     *
     * Throws error when the backend implementation does not support parent filtering.
     *
     * @param filters - filters to use.
     */
    setLimitingAttributeFilters(filters: IElementsQueryAttributeFilter[]): void;
    /**
     * Set the date filters to filter the upcoming attribute element loads.
     *
     * @remarks
     * When you change the options for the attribute element loads, you should call initial elements page load.
     *
     * @param measures - measures to use.
     */
    setLimitingDateFilters(filters: IRelativeDateFilter[]): void;
    /**
     * Returns the current offset used for the attribute element loads.
     */
    getOffset(): number;
    /**
     * Returns the current limit used for the attribute element loads.
     */
    getLimit(): number;
    /**
     * Returns the current order used for the attribute element loads.
     */
    getOrder(): SortDirection;
    /**
     * Returns the current search string used to filter the attribute element loads.
     */
    getSearch(): string;
    /**
     * Returns the current measures used to filter the attribute element loads.
     */
    getLimitingMeasures(): IMeasure[];
    /**
     * Returns the current attribute filters used to filter the attribute element loads.
     */
    getLimitingAttributeFilters(): IElementsQueryAttributeFilter[];
    /**
     * Returns the current date filters used to filter the attribute element loads.
     */
    getLimitingDateFilters(): IRelativeDateFilter[];
    /**
     * Returns all attribute elements loaded by initialElementsPageLoad and nextElementsPageLoad methods.
     *
     * @remarks
     * It does not return attribute elements loaded by loadCustomElements method.
     * To get them, you should use callbacks or getElementsByKey method.
     *
     */
    getAllElements(): IAttributeElement[];
    /**
     * Returns the attribute elements for the specified keys.
     *
     * @remarks
     * If the attribute elements for the specified keys are not loaded, error is thrown.
     */
    getElementsByKey(keys: AttributeElementKey[]): IAttributeElement[];
    /**
     * Returns the total count of the attribute elements.
     * Total elements count is loaded by default only for child filters.
     */
    getTotalElementsCount(): number;
    /**
     * Starts load of total count
     * @param correlation - correlation that will be included in all callbacks fired by this method
     */
    initTotalCount(correlation?: Correlation): void;
    /**
     * Returns the current status of the total count initialization.
     */
    getInitTotalCountStatus(): AsyncOperationStatus;
    /**
     * Returns error, if it was thrown during the total count initialization, undefined otherwise.
     */
    getInitTotalCountError(): GoodDataSdkError | undefined;
    /**
     * Registers a callback that will be fired when the initialization of total count starts.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * @param callback - callback to run
     */
    onInitTotalCountStart: CallbackRegistration<OnInitTotalCountStartCallbackPayload>;
    /**
     * Registers a callback that will be fired when the initialization of total count
     * is successfully completed.
     * Returns unsubscribe function, that will unregister it.
     *
     * @param callback - callback to run
     */
    onInitTotalCountSuccess: CallbackRegistration<OnInitTotalCountSuccessCallbackPayload>;
    /**
     * Registers a callback that will be fired when error is thrown during the total count initialization.
     * Returns unsubscribe function, that will unregister it.
     *
     * @param callback - callback to run
     */
    onInitTotalCountError: CallbackRegistration<OnInitTotalCountErrorCallbackPayload>;
    /**
     * Registers a callback that will be fired when the initialization of total count was canceled.
     * Returns unsubscribe function, that will unregister it.
     *
     * @param callback - callback to run
     */
    onInitTotalCountCancel: CallbackRegistration<OnInitTotalCountCancelCallbackPayload>;
    /**
     * Returns the total count of the attribute elements with currently set options.
     */
    getTotalElementsCountWithCurrentSettings(): number;
    /**
     * Returns the current status of the initial elements page load.
     */
    getInitialElementsPageStatus(): AsyncOperationStatus;
    /**
     * Returns error, if it was thrown during the initial elements page load, undefined otherwise.
     */
    getInitialElementsPageError(): GoodDataSdkError | undefined;
    /**
     * Returns the current status of the next elements page load.
     */
    getNextElementsPageStatus(): AsyncOperationStatus;
    /**
     * Returns error, if it was thrown during the next elements page load, undefined otherwise.
     */
    getNextElementsPageError(): GoodDataSdkError | undefined;
    /**
     * Returns metadata of the attributes set by {@link IAttributeElementLoader.setLimitingAttributeFilters}.
     *
     * Note that these attributes will be available only after successful initialization,
     * or after successful {@link IAttributeElementLoader.loadInitialElementsPage} load.
     */
    getLimitingAttributeFiltersAttributes(): IAttributeMetadataObject[];
    /**
     * Registers a callback that will be fired when the initial elements page load starts.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadInitialElementsPageStart: CallbackRegistration<OnLoadInitialElementsPageStartCallbackPayload>;
    /**
     * Registers a callback that will be fired when the initial elements page load is successfuly completed.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadInitialElementsPageSuccess: CallbackRegistration<OnLoadInitialElementsPageSuccessCallbackPayload>;
    /**
     * Registers a callback that will be fired when error is thrown during the initial elements page load.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadInitialElementsPageError: CallbackRegistration<OnLoadInitialElementsPageErrorCallbackPayload>;
    /**
     * Registers a callback that will be fired when the initial elements page load was canceled.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadInitialElementsPageCancel: CallbackRegistration<OnLoadInitialElementsPageCancelCallbackPayload>;
    /**
     * Registers a callback that will be fired when the next elements page load starts.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadNextElementsPageStart: CallbackRegistration<OnLoadNextElementsPageStartCallbackPayload>;
    /**
     * Registers a callback that will be fired when the next elements page load is successfuly completed.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadNextElementsPageSuccess: CallbackRegistration<OnLoadNextElementsPageSuccessCallbackPayload>;
    /**
     * Registers a callback that will be fired when error is thrown during the next elements page load.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadNextElementsPageError: CallbackRegistration<OnLoadNextElementsPageErrorCallbackPayload>;
    /**
     * Registers a callback that will be fired when the next elements page load was canceled.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadNextElementsPageCancel: CallbackRegistration<OnLoadNextElementsPageCancelCallbackPayload>;
    /**
     * Registers a callback that will be fired when the custom elements load starts.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadCustomElementsStart: CallbackRegistration<OnLoadCustomElementsStartCallbackPayload>;
    /**
     * Registers a callback that will be fired when the custom elements load is successfuly completed.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadCustomElementsSuccess: CallbackRegistration<OnLoadCustomElementsSuccessCallbackPayload>;
    /**
     * Registers a callback that will be fired when error is thrown during the custom elements load.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadCustomElementsError: CallbackRegistration<OnLoadCustomElementsErrorCallbackPayload>;
    /**
     * Registers a callback that will be fired when the custom elements load was canceled.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadCustomElementsCancel: CallbackRegistration<OnLoadCustomElementsCancelCallbackPayload>;
}

/**
 * It represent message when all elements are filtered out by parent filers.
 * @beta
 */
export declare interface IAttributeFilterAllValuesFilteredResultProps {
    parentFilterTitles: string[];
}

/**
 * @public
 */
export declare interface IAttributeFilterBaseProps extends IAttributeFilterCoreProps, IAttributeFilterCustomComponentProps {
}

/**
 * @public
 */
export declare type IAttributeFilterButtonProps = IAttributeFilterBaseProps;

/**
 * @internal
 */
export declare interface IAttributeFilterConfigurationButtonProps {
    onConfiguration: () => void;
}

/**
 * The return type of {@link useAttributeFilterContext}.
 * @beta
 */
export declare type IAttributeFilterContext = AttributeFilterController & Pick<IAttributeFilterCoreProps, "fullscreenOnMobile" | "title" | "selectionMode" | "selectFirst">;

/**
 * @public
 */
export declare interface IAttributeFilterCoreProps {
    /**
     * @internal
     *
     * @remarks
     * Internal purpose that is used for marking if filter reset children filters after changed
     * Default value is "true"
     "     */
    resetOnParentFilterChange?: boolean;
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
     * Specify an attribute filter that will be customized using this filter.
     *
     * @remarks
     * The component will use content of the filter and select the items that are already specified on the filter.
     *
     * Note: It's not possible to combine this property with "connectToPlaceholder" property. Either - provide a value, or a placeholder.
     * The 'onApply' callback must be specified in order to handle filter changes.
     */
    filter?: IAttributeFilter;
    /**
     * Specifies a parent attribute filter that will be used to reduce options for for current attribute filter.
     *
     * @remarks
     * Parent filters elements must contain their URIs due to current backend limitations.
     */
    parentFilters?: AttributeFiltersOrPlaceholders;
    /**
     * Specify {@link @gooddata/sdk-ui#IPlaceholder} to use to get and set the value of the attribute filter.
     *
     * @remarks
     * Note: It's not possible to combine this property with "filter" property. Either - provide a value, or a placeholder.
     * There is no need to specify 'onApply' callback if 'connectToPlaceholder' property is used as the value of the filter
     * is set via this placeholder.
     */
    connectToPlaceholder?: IPlaceholder<IAttributeFilter>;
    /**
     * Specify the over attribute - an attribute the filter and its parent filter are connected through.
     *
     * @remarks
     * You can either provide an {@link @gooddata/sdk-model#ObjRef} which will be used for all the parent filters,
     * or you can provide a pure function that will be called for each parent filter to determine the respective over attribute.
     */
    parentFilterOverAttribute?: ParentFilterOverAttributeType;
    /**
     * Specify title for the attribute filter.
     *
     * @remarks
     * By default, the attribute name will be used.
     */
    title?: string;
    /**
     * Locale to use for localization of appearing texts.
     */
    locale?: ILocale;
    /**
     * If specified, these will be excluded from the elements available for selection and will also be removed from the resulting filter.
     * This effectively behaves as if those elements were not part of the underlying display form.
     *
     * @remarks
     * The meaning of the items is determined by the way the filter is specified: if the filter uses URIs,
     * then these are also interpreted as URIs, analogously with values.
     *
     * If using `hiddenElements`, make sure your input filter excludes the hidden elements, otherwise it could lead to
     * non-intuitive behavior.
     * So, for positive filters, make sure their elements do NOT contain any of the `hiddenElements`.
     * Inversely for negative filters, make sure their elements do contain all of the `hiddenElements`.
     *
     * @example
     * This is how to correctly create a filter that has some items hidden but is set to All:
     *
     * ```tsx
     * const hiddenUris: ["uri1", "uri2"];
     * // make sure to use the uris both in the filter...
     * const filter = newNegativeAttributeFilter("displayForm", { uris: hiddenUris });
     * // ...and also in the prop
     * return <AttributeFilter filter={filter} hiddenElements={hiddenUris} />
     * ```
     */
    hiddenElements?: string[];
    /**
     * If specified, these elements will replace the elements that would be loaded from the server.
     * Note that if using this, limiting measures and/or filters will not work: it is your responsibility to filter
     * the static elements yourself.
     */
    staticElements?: IAttributeElement[];
    /**
     * Customize, whether the filter should take the entire screen on mobile devices.
     */
    fullscreenOnMobile?: boolean;
    /**
     * Customize, how many elements can be selected by filter.
     *
     * @remarks
     * If filter is set as single selection then if `filter` definition is provided it needs to be positive filter with max one selected item.
     *
     *
     */
    selectionMode?: DashboardAttributeFilterSelectionMode;
    /**
     * Specify if first available element should be automatically selected for empty selection.
     *
     * @remarks
     * By default, the value is "false". Works only for `selectionMode` "single" and if current selection is empty.
     */
    selectFirst?: boolean;
    /**
     * Specify function which will be called when user clicks 'Apply' button.
     *
     * @remarks
     * The function will receive the current specification of the filter, as it was updated by the user.
     *
     * @param filter - new value of the filter.
     */
    onApply?: OnApplyCallbackType;
    /**
     * Callback that will be triggered when error is thrown.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Provide pre-loaded attribute so its load can be omitted during the initialization.
     */
    attribute?: IAttributeMetadataObject;
}

/**
 * These customization properties allow you to specify custom components that the AttributeFilter
 * component will use for rendering different parts.
 *
 * @remarks
 * IMPORTANT: while this interface is marked as public, you also need to heed the maturity annotations
 * on each Customization properties,that are at this moment beta level.
 *
 * @public
 */
export declare interface IAttributeFilterCustomComponentProps {
    /**
     * Customize attribute filter with a component to be rendered if initialization fails.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterError} will be used.
     * @beta
     */
    ErrorComponent?: React.ComponentType<IAttributeFilterErrorProps>;
    /**
     * Customize attribute filter with a component to be rendered if attribute filter is loading.
     * Note that this will be rendered only during the initialization of the attribute filter.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterLoading} will be used.
     * @beta
     */
    LoadingComponent?: React.ComponentType<IAttributeFilterLoadingProps>;
    /**
     * Customize attribute filter dropdown button component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterDropdownButton} or {@link AttributeFilterSimpleDropdownButton} will be used.
     *
     * @beta
     */
    DropdownButtonComponent?: React.ComponentType<IAttributeFilterDropdownButtonProps>;
    /**
     * Customize attribute filter dropdown body component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterDropdownBody} will be used.
     *
     * @beta
     */
    DropdownBodyComponent?: React.ComponentType<IAttributeFilterDropdownBodyProps>;
    /**
     * Customize attribute filter dropdown actions component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterDropdownActions} will be used.

     * @beta
     */
    DropdownActionsComponent?: React.ComponentType<IAttributeFilterDropdownActionsProps>;
    /**
     * Customize attribute filter search bar component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterElementsSearchBar} will be used.
     *
     * @beta
     */
    ElementsSearchBarComponent?: React.ComponentType<IAttributeFilterElementsSearchBarProps>;
    /**
     * Customize attribute filter elements select component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterElementsSelect} will be used.
     *
     * @beta
     */
    ElementsSelectComponent?: React.ComponentType<IAttributeFilterElementsSelectProps>;
    /**
     * Customize attribute filter elements select loading component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterElementsSelectLoading} will be used.
     *
     * @beta
     */
    ElementsSelectLoadingComponent?: React.ComponentType<IAttributeFilterElementsSelectLoadingProps>;
    /**
     * Customize attribute filter elements select item component.
     *
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterElementsSelectItem} will be used.
     *
     * @beta
     */
    ElementsSelectItemComponent?: React.ComponentType<IAttributeFilterElementsSelectItemProps>;
    /**
     * Customize attribute filter elements select action component (Select all checkbox)
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterElementsActions} will be used.
     *
     * @beta
     */
    ElementsSelectActionsComponent?: React.ComponentType<IAttributeFilterElementsActionsProps>;
    /**
     * Customize attribute filter elements select error component.
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterElementsSelectError} will be used.
     * @beta
     */
    ElementsSelectErrorComponent?: React.ComponentType<IAttributeFilterElementsSelectErrorProps>;
    /**
     * Customize attribute filter empty result component.
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterEmptyResult} will be used.
     *
     * @beta
     */
    EmptyResultComponent?: React.ComponentType<IAttributeFilterEmptyResultProps>;
    /**
     * Customize attribute filter status bar component.
     * @remarks
     * -  If not provided, the default implementation {@link AttributeFilterStatusBar} will be used.
     * @beta
     */
    StatusBarComponent?: React.ComponentType<IAttributeFilterStatusBarProps>;
}

/**
 * @internal
 */
export declare interface IAttributeFilterDeleteButtonProps {
    onDelete: () => void;
}

/**
 * AttributeFilter dropdown actions like confirm and cancel button.
 * @beta
 */
export declare interface IAttributeFilterDropdownActionsProps {
    /**
     * Callback to apply changes of current selection.
     *
     * @beta
     */
    onApplyButtonClick: () => void;
    /**
     * Callback to discard changes and close AttributeFilter.
     *
     * @beta
     */
    onCancelButtonClick: () => void;
    /**
     * If true, the Apply action should be disabled.
     *
     * @beta
     */
    isApplyDisabled?: boolean;
}

/**
 * AttributeFilter dropdown content that is displayed in the open state of AttributeFilter.
 *
 * @beta
 */
export declare interface IAttributeFilterDropdownBodyProps {
    /**
     * Callback that will be called each time ApplyButton clicked.
     *
     * @beta
     */
    onApplyButtonClick: () => void;
    /**
     * Callback that will be called each time CancelButton clicked.
     *
     * @beta
     */
    onCancelButtonClick: () => void;
    /**
     * Specify the width of dropdown body.
     *
     * @beta
     */
    width?: number;
}

/**
 * The interface of the AttributeFilter dropdown button.
 *
 * @remarks
 * It opens Attribute filter dropdown and displaying title or subtitle, selection details and attribute filter statuses like loading or filtering.
 * Note: for rendering error status see {@link IAttributeFilterErrorProps}.
 * @beta
 */
export declare interface IAttributeFilterDropdownButtonProps {
    /**
     * Title of the attribute {@link @gooddata/sdk-model#IAttributeFilter} and its related display form {@link @gooddata/sdk-model#IAttributeDisplayFormMetadataObject}.
     *
     * @beta
     */
    title?: string;
    /**
     * Comma-separated list of selected element titles.
     *
     * @beta
     */
    subtitle?: string;
    /**
     * Selected items count
     *
     * @remarks
     * -  If value is 0 for {@link @gooddata/sdk-model#IPositiveAttributeFilter} means NONE items are selected
     *
     * -  If value is 0 for {@link @gooddata/sdk-model#INegativeAttributeFilter} means ALL items are selected
     *
     * @beta
     */
    selectedItemsCount?: number;
    /**
     *
     * @beta
     */
    showSelectionCount?: boolean;
    /**
     * If true, the AttributeFilter dropdown is open.
     *
     * @beta
     */
    isOpen?: boolean;
    /**
     * If true, the AttributeFilter is initializing Attribute elements and its internal data.
     *
     * @beta
     */
    isLoading?: boolean;
    /**
     * If true, the AttributeFilter is filtering its elements by parent filters.
     *
     * @beta
     */
    isFiltering?: boolean;
    /**
     * If true, all the initialization has finished.
     *
     * @beta
     */
    isLoaded?: boolean;
    /**
     * If true, the button supports drag and drop operations.
     *
     * @beta
     */
    isDraggable?: boolean;
    /**
     * Icon of the AttributeFilterDropdownButton.
     *
     * @beta
     */
    icon?: ReactNode;
    /**
     * Customize content of the attribute filter tooltip component.
     *
     * @beta
     */
    TooltipContentComponent?: React_2.ComponentType;
    /**
     * Callback to open or close AttributeFilter dropdown.
     *
     * @beta
     */
    onClick?: () => void;
    isError?: boolean;
}

/**
 * It represents a component that allows users add/remove/toggle to/from selection elements that respect current search criteria.
 *
 * @beta
 */
export declare interface IAttributeFilterElementsActionsProps {
    /**
     * Indicate that all items that respect current search criteria are selected or not.
     * @beta
     */
    checked: boolean;
    /**
     * Callback to select or unselect items that respect current search criteria.
     * @beta
     */
    onChange: (value: boolean) => void;
    /**
     * Toggle items that respect current search criteria
     * @beta
     */
    onToggle: () => void;
    /**
     * Indicate that items are filtered or not by parent filters.
     * @beta
     */
    isFiltered: boolean;
    /**
     * Number of elements that respect current search criteria
     * @beta
     */
    totalItemsCount: number;
    /**
     * Indicate that elements that respect current search criteria are partially selected
     * @beta
     */
    isPartialSelection: boolean;
    /**
     * Indicate that component is visible or not
     * @beta
     */
    isVisible: boolean;
}

/**
 * It represent a text field input for searching Attribute Filter elements
 *
 * @beta
 */
export declare interface IAttributeFilterElementsSearchBarProps {
    /**
     * Current search string
     *
     * @beta
     */
    searchString: string;
    /**
     * Debounced search string callback
     *
     * @beta
     */
    onSearch: (text: string) => void;
    /**
     * Render smaller text input
     *
     * @beta
     */
    isSmall?: boolean;
}

/**
 * It represents error message component.
 * @beta
 */
export declare interface IAttributeFilterElementsSelectErrorProps {
    error: GoodDataSdkError;
}

/**
 * It represents an Attribute Filter item.
 * It displays element label, it allow user to add/remove element to/from selection.
 * It allows users to clear selection and add only it into selection.
 *
 * @beta
 */
export declare interface IAttributeFilterElementsSelectItemProps {
    /**
     * Item of list
     *
     * @beta
     */
    item: IAttributeElement;
    /**
     * Indicate that item is selected
     *
     * @beta
     */
    isSelected: boolean;
    /**
     * Add item to selection callback
     *
     * @beta
     */
    onSelect: () => void;
    /**
     * Remove item from selection
     *
     * @beta
     */
    onDeselect: () => void;
    /**
     * Select item only
     *
     * @beta
     */
    onSelectOnly: () => void;
    /**
     * Shown as fullscreen on mobile
     *
     * @beta
     */
    fullscreenOnMobile?: boolean;
}

/**
 * It display loading indicator when Attribute Filter is loading or searching elements.
 *
 * @beta
 */
export declare interface IAttributeFilterElementsSelectLoadingProps {
    /**
     * height of component
     */
    height: number;
}

/**
 * It represents a list of Attribute filter elements.
 * It allows users to search elements and display a number of elements that respect current search criteria.
 * It manipulates with current selection.
 * It allows paging.
 * It displays the current selection status.
 *
 * @beta
 */
export declare interface IAttributeFilterElementsSelectProps {
    /**
     * List of Attribute filter elements that are loaded and respect current search criteria.
     */
    items: IAttributeElement[];
    /**
     * Number of all elements that respect current search criteria.
     *
     * @beta
     */
    totalItemsCount: number;
    /**
     * Number of all elements that respect current search criteria.
     *
     * @beta
     */
    totalItemsCountWithCurrentSettings: number;
    /**
     * Indicate if current filter is inverted or not see: {@link @gooddata/sdk-model#IPositiveAttributeFilter} or  {@link @gooddata/sdk-model#INegativeAttributeFilter}
     *
     * @beta
     */
    isInverted: boolean;
    /**
     * List of current selected items.
     *
     * @beta
     */
    selectedItems: IAttributeElement[];
    /**
     * Change selection callback
     *
     * @beta
     */
    onSelect: (selectedItems: IAttributeElement[], isInverted: boolean) => void;
    /**
     * Current search string
     *
     * @beta
     */
    searchString: string;
    /**
     * Search callback
     *
     * @beta
     */
    onSearch: (searchString: string) => void;
    /**
     * Indicator that AttributeFilter component is in loading state
     *
     * @beta
     */
    isLoading: boolean;
    /**
     * Indicator that next page of elements is loading or not
     *
     * @beta
     */
    isLoadingNextPage: boolean;
    /**
     * Callback to obtain next page of AttributeFilter elements
     *
     * @beta
     */
    onLoadNextPage: () => void;
    /**
     * Size of next page of elements
     *
     * @beta
     */
    nextPageSize: number;
    /**
     * List of parent filter titles that filter current elements
     *
     * @beta
     */
    parentFilterTitles: string[];
    /**
     * Indicate that elements are filtered by parent filters
     *
     * @beta
     */
    isFilteredByParentFilters: boolean;
    /**
     * Error
     *
     * @beta
     */
    error?: GoodDataSdkError;
}

/**
 * Properties of AttributeFilterEmptyResult component implementation
 * @beta
 */
export declare interface IAttributeFilterEmptyResultProps {
    /**
     * Component height
     */
    height: number;
    /**
     * Number of items that respect current criteria
     */
    totalItemsCount: number;
    /**
     * Indicate that items are filtered or not
     */
    isFilteredByParentFilters: boolean;
    /**
     * Current search string
     */
    searchString: string;
    /**
     * List of parent filters items titles that are used as current filtering criteria
     */
    parentFilterTitles?: string[];
}

/**
 * Component that is rendered when the initialization of the attribute filter ends up in an error state.
 * @remarks
 * It will be rendered instead of the component that implements {@link IAttributeFilterDropdownButtonProps}.
 * @beta
 */
export declare interface IAttributeFilterErrorProps {
    /**
     * Error message
     */
    message?: string;
    /**
     * Error object
     */
    error?: any;
    /**
     * Is active state or not
     */
    isOpen?: boolean;
    /**
     * Allow draggable
     */
    isDraggable?: boolean;
}

/**
 * It represent status message for parent elements titles that are used for filtering elements.
 * @beta
 */
export declare interface IAttributeFilterFilteredStatusProps {
    parentFilterTitles: string[];
}

/**
 * Core API for attribute filter components, that allows you to implement custom attribute filter components.
 *
 * @remarks
 * It has the following capabilities:
 *
 * - Load all the required metadata during the intitialization
 *
 * - Attribute elements paging and filtering
 *
 * - Loading of the additional attribute elements
 *
 * - Single selection handling with working and committed stage
 *
 * - Support for static attribute elements (if you don't want to load them from the backend)
 *
 * - Support for hiding particular attribute elements
 *
 * @public
 */
export declare type IAttributeFilterHandler = IMultiSelectAttributeFilterHandler | ISingleSelectAttributeFilterHandler;

/**
 * Options for initialization of the {@link IAttributeFilterHandler}.
 *
 * @public
 */
export declare type IAttributeFilterHandlerOptions = ISingleSelectAttributeFilterHandlerOptions | IMultiSelectAttributeFilterHandlerOptions;

/**
 * Common options for initialization of the {@link IAttributeFilterHandler}.
 *
 * @public
 */
export declare interface IAttributeFilterHandlerOptionsBase {
    /**
     * If specified, these will be excluded from the elements available for selection and will also be removed from the resulting filter.
     * This effectively behaves as if those elements were not part of the underlying display form.
     *
     * @remarks
     * The meaning of the items is determined by the way the filter is specified: if the filter uses URIs,
     * then these are also interpreted as URIs, analogously with values.
     *
     * If using hiddenElements, make sure your input filter excludes the hidden elements, otherwise it could lead to
     * non-intuitive behavior.
     * So, for positive filters, make sure their elements do NOT contain any of the `hiddenElements`.
     * Inversely for negative filters, make sure their elements do contain all of the `hiddenElements`.
     *
     * @example
     * This is how to correctly create a filter that has some items hidden but is set to All:
     *
     * ```tsx
     * const hiddenUris: ["uri1", "uri2"];
     * // make sure to use the uris both in the filter...
     * const filter = newNegativeAttributeFilter("displayForm", { uris: hiddenUris });
     * // ...and also in the config
     * const handler = newAttributeFilterHandler(backend, workspace, filter, { hiddenElements: hiddenUris });
     * ```
     */
    hiddenElements?: string[];
    /**
     * If specified, these elements will replace the elements that would be loaded from the server.
     * Note that if using this, limiting measures and/or filters will not work: it is your responsibility to filter
     * the static elements yourself.
     */
    staticElements?: IAttributeElement[];
    attribute?: IAttributeMetadataObject;
}

/**
 * Handles the loading of the all required metadata for the attribute filter handler.
 *
 * @public
 */
export declare interface IAttributeFilterLoader extends IAttributeLoader, IAttributeElementLoader {
    /**
     * Get the effective filter.
     */
    getFilter(): IAttributeFilter;
    /**
     * Loads all the required data to initialize the attribute filter handler:
     * attribute, selected attribute elements, initial elements page and optionally elements total count (for filters with parent).
     *
     * @remarks
     * Cancels the running initialization, if any, and starts it again.
     *
     * Throws error if you combine staticElements with unsupported elements load options (limitingAttributeFilters, limitingMeasures or limitingDateFilters).
     *
     * You can provide a correlation that will be included in the payload of all callbacks fired as a result of calling this method.
     *
     * @param correlation - correlation that will be included in all callbacks fired by this method
     */
    init(correlation?: Correlation): void;
    /**
     * Returns the current status of the initialization.
     */
    getInitStatus(): AsyncOperationStatus;
    /**
     * Returns error, if it was thrown during the initialization, undefined otherwise.
     */
    getInitError(): GoodDataSdkError | undefined;
    /**
     * Registers a callback that will be fired when the initialization starts.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onInitStart: CallbackRegistration<OnInitStartCallbackPayload>;
    /**
     * Registers a callback that will be fired when the initialization is successfuly completed.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onInitSuccess: CallbackRegistration<OnInitSuccessCallbackPayload>;
    /**
     * Registers a callback that will be fired when error is thrown during the initialization.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onInitError: CallbackRegistration<OnInitErrorCallbackPayload>;
    /**
     * Registers a callback that will be fired when the initialization was canceled.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onInitCancel: CallbackRegistration<OnInitCancelCallbackPayload>;
    /**
     * Registers a callback that will be fired when some data of the attribute filter handler has been changed/updated.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onUpdate: CallbackRegistration<void>;
}

/**
 * Component that displays a loading indicator.
 *
 * @remarks
 * It will be rendered during the initialization instead of the component that implements {@link IAttributeFilterDropdownButtonProps}.
 * @beta
 */
export declare interface IAttributeFilterLoadingProps {
    /**
     * Callback to open or close AttributeFilter dropdown.
     *
     * @beta
     */
    onClick?: () => void;
    /**
     * If true, the AttributeFilter dropdown is open.
     *
     * @beta
     */
    isOpen?: boolean;
}

/**
 * @public
 */
export declare interface IAttributeFilterProps extends IAttributeFilterBaseProps {
    titleWithSelection?: boolean;
}

/**
 * It represents a selection status component.
 *
 * @beta
 */
export declare interface IAttributeFilterSelectionStatusProps {
    /**
     * This prop means that current Attribute Filter is inverted or not.
     */
    isInverted: boolean;
    /**
     * List of selected elements
     */
    selectedItems: IAttributeElement[];
    /**
     * Item title getter it will return localized title for empty elements.
     */
    getItemTitle: (item: IAttributeElement) => string;
    /**
     * Maximum elements in selection.
     */
    selectedItemsLimit: number;
}

/**
 * It represents component that display status of current selection.
 * @beta
 */
export declare interface IAttributeFilterStatusBarProps {
    /**
     * Number of elements that respect current criteria.
     */
    totalElementsCountWithCurrentSettings: number;
    /**
     * Indicate that elements are filtered by parents filters or not.
     */
    isFilteredByParentFilters: boolean;
    /**
     * List of parent filter titles that filter current elements.
     *
     * @beta
     */
    parentFilterTitles: string[];
    /**
     * Indicate that current filter is inverted {@link @gooddata/sdk-model#INegativeAttributeFilter} or not {@link @gooddata/sdk-model#IPositiveAttributeFilter}
     *
     * @beta
     */
    isInverted: boolean;
    /**
     * List of selected items
     * @beta
     */
    selectedItems: IAttributeElement[];
    /**
     * Item title getter used to get translated item empty value
     *
     * @beta
     */
    getItemTitle: (item: IAttributeElement) => string;
    /**
     * Maximum selected items
     *
     * @beta
     */
    selectedItemsLimit: number;
}

/**
 * Handles the loading of the attribute metadata.
 *
 * @public
 */
export declare interface IAttributeLoader {
    /**
     * Loads the metadata object for the attribute, that is used in the attribute filter.
     *
     * @remarks
     * Cancels the running attribute filter load, if any, and starts it again.
     *
     * You can provide a correlation that will be included in the payload of all callbacks fired as a result of calling this method.
     *
     * @param correlation - correlation that will be included in all callbacks fired by this method
     */
    loadAttribute(correlation?: Correlation): void;
    /**
     * Cancels the running attribute load, if any.
     */
    cancelAttributeLoad(): void;
    /**
     * Returns the loaded attribute.
     *
     * @remarks
     * Returns undefined, if the attribute is not loaded yet.
     */
    getAttribute(): IAttributeMetadataObject | undefined;
    /**
     * Returns error, if it was thrown during the attribute filter load, undefined otherwise.
     */
    getAttributeError(): GoodDataSdkError | undefined;
    /**
     * Returns the current status of the attribute filter load.
     */
    getAttributeStatus(): AsyncOperationStatus;
    /**
     * Registers a callback that will be fired when the attribute load starts.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadAttributeStart: CallbackRegistration<OnLoadAttributeStartCallbackPayload>;
    /**
     * Registers a callback that will be fired when the attribute load is successfuly completed.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadAttributeSuccess: CallbackRegistration<OnLoadAttributeSuccessCallbackPayload>;
    /**
     * Registers a callback that will be fired when error is thrown during the attribute load.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadAttributeError: CallbackRegistration<OnLoadAttributeErrorCallbackPayload>;
    /**
     * Registers a callback that will be fired when the attribute load was canceled.
     * Returns unsubscribe function, that will unregister it.
     *
     * @remarks
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onLoadAttributeCancel: CallbackRegistration<OnLoadAttributeCancelCallbackPayload>;
}

/**
 * @beta
 */
export declare interface ICustomGranularitySelection {
    enable: boolean;
    warningMessage: string;
}

/**
 * @beta
 */
export declare interface IDateAndMessageTranslator extends IDateTranslator, IMessageTranslator {
}

/**
 * Absolute form date filter errors.
 *
 * @public
 */
export declare interface IDateFilterAbsoluteFormErrors {
    from?: string;
    to?: string;
}

/**
 * Callback props of the {@link DateFilter} component.
 *
 * @public
 */
export declare interface IDateFilterCallbackProps {
    onApply: (dateFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => void;
    onCancel?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
}

/**
 * All date filter options grouped by their type
 * @public
 */
export declare interface IDateFilterOptionsByType {
    /**
     * Global all time date filter options
     */
    allTime?: IAllTimeDateFilterOption;
    /**
     * Global absolute date filter options
     */
    absoluteForm?: IUiAbsoluteDateFilterForm;
    /**
     * Global relative date filter options
     */
    relativeForm?: IUiRelativeDateFilterForm;
    /**
     * Custom absolute date filter presets
     */
    absolutePreset?: IAbsoluteDateFilterPreset[];
    /**
     * Custom relative date filter presets
     */
    relativePreset?: DateFilterRelativeOptionGroup;
}

/**
 * Props of the {@link DateFilter} component.
 *
 * @public
 */
export declare interface IDateFilterOwnProps extends IDateFilterStatePropsIntersection {
    filterOptions: IDateFilterOptionsByType;
    availableGranularities: DateFilterGranularity[];
    isEditMode?: boolean;
    customFilterName?: string;
    dateFilterMode: DashboardDateFilterConfigMode;
    dateFormat?: string;
    locale?: string;
    isTimeForAbsoluteRangeEnabled?: boolean;
    weekStart?: WeekStart;
}

/**
 * All the props of the {@link DateFilter} component.
 *
 * @public
 */
export declare interface IDateFilterProps extends IDateFilterOwnProps, IDateFilterCallbackProps {
}

/**
 * Relative form date filter errors.
 *
 * @public
 */
export declare interface IDateFilterRelativeFormErrors {
    from?: string;
    to?: string;
}

/**
 * State of the {@link DateFilter} component.
 *
 * @public
 */
export declare interface IDateFilterState extends IDateFilterStatePropsIntersection {
    initExcludeCurrentPeriod: boolean;
    initSelectedFilterOption: DateFilterOption;
    isExcludeCurrentPeriodEnabled: boolean;
}

/**
 * Props of the {@link DateFilter} component that are reflected in the state.
 *
 * @public
 */
export declare interface IDateFilterStatePropsIntersection {
    excludeCurrentPeriod: boolean;
    selectedFilterOption: DateFilterOption;
}

/**
 * @beta
 */
export declare interface IDateTranslator {
    formatDate: IntlShape["formatDate"];
}

/**
 * Extended date filter errors
 * @public
 */
export declare interface IExtendedDateFilterErrors {
    /**
     * Global absolute date filter errors
     */
    absoluteForm?: IDateFilterAbsoluteFormErrors;
    /**
     * Global relative date filter errors
     */
    relativeForm?: IDateFilterRelativeFormErrors;
}

/**
 * Handles the selection that can be inverted.
 *
 * @public
 */
export declare interface IInvertableSelectionHandler<T extends InvertableSelection<any>> {
    /**
     * Change the selection.
     *
     * @param selection - new selection
     */
    changeSelection(selection: T): void;
    /**
     * Invert the current selection.
     */
    invertSelection(): void;
    /**
     * Clear the current selection.
     */
    clearSelection(): void;
    /**
     * Returns the current selection.
     */
    getSelection(): T;
    /**
     * Registers a callback that will be fired when the selection changes.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onSelectionChanged: CallbackRegistration<OnSelectionChangedCallbackPayload<T>>;
}

/**
 * Options that can be applied for the particular load of the attribute elements.
 *
 * @public
 */
export declare interface ILoadElementsOptions {
    offset?: number;
    limit?: number;
    search?: string;
    order?: SortDirection;
    limitingAttributeFilters?: IElementsQueryAttributeFilter[];
    limitingMeasures?: IMeasure[];
    limitingDateFilters?: IRelativeDateFilter[];
    elements?: ElementsQueryOptionsElementsSpecification;
    includeTotalCountWithoutFilters?: boolean;
    excludePrimaryLabel?: boolean;
}

/**
 * Result of the attribute elements load along with the options that were applied for it.
 *
 * @public
 */
export declare interface ILoadElementsResult {
    elements: IAttributeElement[];
    totalCount: number;
    options: ILoadElementsOptions;
}

/**
 * @beta
 */
export declare interface IMeasureDropdownItem {
    title: string;
    ref: ObjRefInScope;
    sequenceNumber?: string;
}

/**
 * @beta
 */
export declare interface IMeasureValueFilterCommonProps {
    filter: IMeasureValueFilter;
    measureIdentifier: string;
    onApply: (filter: IMeasureValueFilter) => void;
    usePercentage?: boolean;
    warningMessage?: WarningMessage;
    locale?: string;
    separators?: ISeparators;
    displayTreatNullAsZeroOption?: boolean;
    treatNullAsZeroDefaultValue?: boolean;
    enableOperatorSelection?: boolean;
}

/**
 * @beta
 */
export declare interface IMeasureValueFilterDropdownProps extends IMeasureValueFilterCommonProps {
    onCancel: () => void;
    anchorEl?: HTMLElement | string;
}

/**
 * @beta
 */
export declare interface IMeasureValueFilterProps extends IMeasureValueFilterCommonProps {
    buttonTitle: string;
    onCancel?: () => void;
}

/**
 * @beta
 */
export declare interface IMeasureValueFilterState {
    displayDropdown: boolean;
}

/**
 * @beta
 */
export declare interface IMessageTranslator {
    formatMessage: IntlShape["formatMessage"];
}

/**
 * Core API for attribute filter components, that allows you to implement custom attribute filter components.
 *
 * @remarks
 * It has the following capabilities:
 *
 * - Load all the required metadata during the intitialization
 *
 * - Attribute elements paging and filtering
 *
 * - Loading of the additional attribute elements
 *
 * - Invertable multi selection handling with working and committed stage
 *
 * - Support for static attribute elements (if you don't want to load them from the backend)
 *
 * - Support for hiding particular attribute elements
 *
 * @public
 */
export declare interface IMultiSelectAttributeFilterHandler extends IAttributeFilterLoader, IStagedInvertableSelectionHandler<InvertableAttributeElementSelection> {
}

/**
 * Options for initialization of the {@link IAttributeFilterHandler} with multi selection.
 *
 * @public
 */
export declare interface IMultiSelectAttributeFilterHandlerOptions extends IAttributeFilterHandlerOptionsBase {
    selectionMode: "multi";
}

/**
 * Invertable selection with list of the unique attribute elements keys.
 *
 * @public
 */
export declare type InvertableAttributeElementSelection = InvertableSelection<AttributeElementKey>;

/**
 * @public
 */
export declare interface InvertableSelection<T> {
    keys: T[];
    isInverted: boolean;
}

/**
 * @beta
 */
export declare interface IRankingFilterDropdownProps {
    measureItems: IMeasureDropdownItem[];
    attributeItems: IAttributeDropdownItem[];
    filter: IRankingFilter;
    onApply: (filter: IRankingFilter) => void;
    onCancel?: () => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    anchorEl?: HTMLElement | string;
    customGranularitySelection?: ICustomGranularitySelection;
    locale?: string;
    enableRenamingMeasureToMetric?: boolean;
}

/**
 * @beta
 */
export declare interface IRankingFilterProps {
    measureItems: IMeasureDropdownItem[];
    attributeItems: IAttributeDropdownItem[];
    filter: IRankingFilter;
    onApply: (filter: IRankingFilter) => void;
    onCancel?: () => void;
    buttonTitle: string;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    customGranularitySelection?: ICustomGranularitySelection;
    locale?: string;
    enableRenamingMeasureToMetric?: boolean;
}

/**
 * Type-guard testing whether the provided object is an instance of {@link AbsoluteDateFilterOption}.
 * @public
 */
export declare const isAbsoluteDateFilterOption: (obj: unknown) => obj is AbsoluteDateFilterOption;

/**
 * Core API for attribute filter components, that allows you to implement custom attribute filter components.
 *
 * @remarks
 * It has the following capabilities:
 *
 * - Load all the required metadata during the intitialization
 *
 * - Attribute elements paging and filtering
 *
 * - Loading of the additional attribute elements
 *
 * - Single selection handling with working and committed stage
 *
 * - Support for static attribute elements (if you don't want to load them from the backend)
 *
 * - Support for hiding particular attribute elements
 *
 * @public
 */
export declare interface ISingleSelectAttributeFilterHandler extends IAttributeFilterLoader, IStagedSingleSelectionHandler<AttributeElementKey | undefined> {
}

/**
 * Options for initialization of the {@link IAttributeFilterHandler} with single selection.
 *
 * @public
 */
export declare interface ISingleSelectAttributeFilterHandlerOptions extends IAttributeFilterHandlerOptionsBase {
    selectionMode: "single";
}

/**
 * Handles simple selection of at most one item.
 *
 * @public
 */
export declare interface ISingleSelectionHandler<T> {
    /**
     * Change the selection.
     *
     * @param selection - new selection
     */
    changeSelection(selection: T): void;
    /**
     * Returns the current selection.
     */
    getSelection(): T;
    /**
     * Registers a callback that will be fired when the selection changes.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onSelectionChanged: CallbackRegistration<OnSelectionChangedCallbackPayload<T>>;
}

/**
 * Type-guard testing whether the provided object is an instance of {@link RelativeDateFilterOption}.
 * @public
 */
export declare const isRelativeDateFilterOption: (obj: unknown) => obj is RelativeDateFilterOption;

/**
 * Handles selection of keys with stages: working and committed.
 * @public
 */
export declare interface IStagedInvertableSelectionHandler<T extends InvertableSelection<any>> extends Omit<IInvertableSelectionHandler<T>, "getSelection"> {
    /**
     * Commit the current working selection making it the new committed selection.
     */
    commitSelection(): void;
    /**
     * Revert the current working selection by resetting it to the committed selection.
     */
    revertSelection(): void;
    /**
     * Returns the current working selection.
     */
    getWorkingSelection(): T;
    /**
     * Returns whether the current working selection is empty.
     */
    isWorkingSelectionEmpty(): boolean;
    /**
     * Returns whether the current working selection is changed..
     */
    isWorkingSelectionChanged(): boolean;
    /**
     * Returns the current committed selection.
     */
    getCommittedSelection(): T;
    /**
     * Registers a callback that will be fired when the selection is committed.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onSelectionCommitted: CallbackRegistration<OnSelectionCommittedCallbackPayload<T>>;
}

/**
 * Handles selection of keys with stages: working and committed.
 * @public
 */
export declare interface IStagedSingleSelectionHandler<T> extends Omit<ISingleSelectionHandler<T>, "getSelection"> {
    /**
     * Commit the current working selection making it the new committed selection.
     */
    commitSelection(): void;
    /**
     * Revert the current working selection by resetting it to the committed selection.
     */
    revertSelection(): void;
    /**
     * Returns the current working selection.
     */
    getWorkingSelection(): T;
    /**
     * Returns the current committed selection.
     */
    getCommittedSelection(): T;
    /**
     * Returns whether the current working selection is empty.
     */
    isWorkingSelectionEmpty(): boolean;
    /**
     * Returns whether the current working selection is changed..
     */
    isWorkingSelectionChanged(): boolean;
    /**
     * Registers a callback that will be fired when the selection is committed.
     * Returns unsubscribe function, that will unregister it, once called.
     *
     * Multiple callbacks can be registered by this function.
     *
     * @param callback - callback to run
     */
    onSelectionCommitted: CallbackRegistration<OnSelectionCommittedCallbackPayload<T>>;
}

/**
 * Type-guard testing whether the provided object is an instance of {@link IUiRelativeDateFilterForm}.
 * @public
 */
export declare const isUiRelativeDateFilterForm: (obj: unknown) => obj is IUiRelativeDateFilterForm;

/**
 * @alpha
 */
export declare function isWarningMessage(obj: unknown): obj is IWarningMessage;

/**
 * Represents the global absolute date filter, which may contain selected values
 * @public
 */
export declare interface IUiAbsoluteDateFilterForm extends IAbsoluteDateFilterForm {
    /**
     * Selected global absolute date filter start date
     */
    from?: DateString;
    /**
     * Selected global absolute date filter end date
     */
    to?: DateString;
}

/**
 * Represents the global relative date filter, which may contain selected granularity and values
 * @public
 */
export declare interface IUiRelativeDateFilterForm extends Omit<IRelativeDateFilterForm, "availableGranularities"> {
    /**
     * Selected global relative date filter granularity
     */
    granularity?: DateFilterGranularity;
    /**
     * Selected global relative date filter granularity start offset
     */
    from?: RelativeDateFilterGranularityOffset;
    /**
     * Selected global relative date filter granularity end offset
     */
    to?: RelativeDateFilterGranularityOffset;
}

/**
 * Properties of {@link useAttributeFilterController}
 * @public
 */
export declare type IUseAttributeFilterControllerProps = Omit<IAttributeFilterCoreProps, "fullscreenOnMobile" | "locale" | "title"> & {
    elementsOptions?: {
        limit: number;
    };
    resetOnParentFilterChange?: boolean;
};

/**
 * Properties of the {@link useAttributeFilterHandler} hook.
 * @beta
 */
export declare interface IUseAttributeFilterHandlerProps {
    backend: IAnalyticalBackend;
    workspace: string;
    filter: IAttributeFilter;
    hiddenElements?: string[];
    staticElements?: IAttributeElement[];
    attribute?: IAttributeMetadataObject;
}

/**
 * Properties of the {@link useAttributeFilterSearch} hook.
 *
 * @beta
 */
export declare interface IUseAttributeFilterSearchProps {
    /**
     * Current search string.
     */
    searchString: string;
    /**
     * Callback to change the current search string.
     */
    onSearch: (search: string) => void;
}

/**
 * @beta
 */
export declare type IWarningMessage = {
    text: string;
    severity: "low" | "medium" | "high";
};

/**
 * @beta
 */
export declare class MeasureValueFilter extends React_2.PureComponent<IMeasureValueFilterProps, IMeasureValueFilterState> {
    static defaultProps: Partial<IMeasureValueFilterProps>;
    state: IMeasureValueFilterState;
    private buttonRef;
    render(): JSX.Element;
    private onApply;
    private onCancel;
    private closeDropdown;
    private toggleDropdown;
}

/**
 * @beta
 */
export declare class MeasureValueFilterDropdown extends React_2.PureComponent<IMeasureValueFilterDropdownProps> {
    static defaultProps: Pick<IMeasureValueFilterDropdownProps, "displayTreatNullAsZeroOption" | "treatNullAsZeroDefaultValue" | "enableOperatorSelection">;
    render(): JSX.Element;
    private onApply;
}

/**
 * @public
 */
export declare function newAttributeFilterHandler(backend: IAnalyticalBackend, workspace: string, attributeFilter: IAttributeFilter, options: ISingleSelectAttributeFilterHandlerOptions): ISingleSelectAttributeFilterHandler;

/**
 * @public
 */
export declare function newAttributeFilterHandler(backend: IAnalyticalBackend, workspace: string, attributeFilter: IAttributeFilter, options: IMultiSelectAttributeFilterHandlerOptions): IMultiSelectAttributeFilterHandler;

/**
 * @public
 */
export declare type OnApplyCallbackType = (filter: IAttributeFilter, isInverted: boolean, selectionMode?: DashboardAttributeFilterSelectionMode) => void;

/**
 * Payload of the onInitCancel callback.
 *
 * @public
 */
export declare type OnInitCancelCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onInitError callback.
 *
 * @public
 */
export declare type OnInitErrorCallbackPayload = CallbackPayloadWithCorrelation<{
    error: GoodDataSdkError;
}>;

/**
 * Payload of the onInitStart callback.
 *
 * @public
 */
export declare type OnInitStartCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onInitSuccess callback.
 *
 * @public
 */
export declare type OnInitSuccessCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onInitTotalCountCancel callback.
 *
 * @public
 */
export declare type OnInitTotalCountCancelCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onInitTotalCountError callback.
 *
 * @public
 */
export declare type OnInitTotalCountErrorCallbackPayload = CallbackPayloadWithCorrelation<{
    error: GoodDataSdkError;
}>;

/**
 * Payload of the onInitTotalCountStart callback.
 *
 * @public
 */
export declare type OnInitTotalCountStartCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onInitTotalCountSuccess callback.
 *
 * @public
 */
export declare type OnInitTotalCountSuccessCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadAttributeCancel callback.
 *
 * @public
 */
export declare type OnLoadAttributeCancelCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadAttributeError callback.
 *
 * @public
 */
export declare type OnLoadAttributeErrorCallbackPayload = CallbackPayloadWithCorrelation<{
    error: GoodDataSdkError;
}>;

/**
 * Payload of the onLoadAttributeStart callback.
 *
 * @public
 */
export declare type OnLoadAttributeStartCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadAttributeSuccess callback.
 *
 * @public
 */
export declare type OnLoadAttributeSuccessCallbackPayload = CallbackPayloadWithCorrelation<{
    attribute: IAttributeMetadataObject;
}>;

/**
 * Payload of the onLoadCustomElementsCancel callback.
 *
 * @public
 */
export declare type OnLoadCustomElementsCancelCallbackPayload = Partial<CallbackPayloadWithCorrelation>;

/**
 * Payload of the onLoadCustomElementsError callback.
 *
 * @public
 */
export declare type OnLoadCustomElementsErrorCallbackPayload = Partial<CallbackPayloadWithCorrelation> & {
    error: GoodDataSdkError;
};

/**
 * Payload of the onLoadCustomElementsStart callback.
 *
 * @public
 */
export declare type OnLoadCustomElementsStartCallbackPayload = Partial<CallbackPayloadWithCorrelation>;

/**
 * Payload of the onLoadCustomElementsSuccess callback.
 *
 * @public
 */
export declare type OnLoadCustomElementsSuccessCallbackPayload = Partial<CallbackPayloadWithCorrelation> & ILoadElementsResult;

/**
 * Payload of the onLoadInitialElementsPageCancel callback.
 *
 * @public
 */
export declare type OnLoadInitialElementsPageCancelCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadInitialElementsPageError callback.
 *
 * @public
 */
export declare type OnLoadInitialElementsPageErrorCallbackPayload = CallbackPayloadWithCorrelation<{
    error: GoodDataSdkError;
}>;

/**
 * Payload of the onLoadInitialElementsPageStart callback.
 *
 * @public
 */
export declare type OnLoadInitialElementsPageStartCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadInitialElementsPageSuccess callback.
 *
 * @public
 */
export declare type OnLoadInitialElementsPageSuccessCallbackPayload = CallbackPayloadWithCorrelation<ILoadElementsResult>;

/**
 * Payload of the onLoadNextElementsPageCancel callback.
 *
 * @public
 */
export declare type OnLoadNextElementsPageCancelCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadNextElementsPageError callback.
 *
 * @public
 */
export declare type OnLoadNextElementsPageErrorCallbackPayload = CallbackPayloadWithCorrelation<{
    error: GoodDataSdkError;
}>;

/**
 * Payload of the onLoadNextElementsPageStart callback.
 *
 * @public
 */
export declare type OnLoadNextElementsPageStartCallbackPayload = CallbackPayloadWithCorrelation;

/**
 * Payload of the onLoadNextElementsPageSuccess callback.
 *
 * @public
 */
export declare type OnLoadNextElementsPageSuccessCallbackPayload = CallbackPayloadWithCorrelation<ILoadElementsResult>;

/**
 * Payload of the onSelectionChanged callback.
 *
 * @public
 */
export declare type OnSelectionChangedCallbackPayload<T> = {
    selection: T;
};

/**
 * Payload of the onSelectionCommitted callback.
 *
 * @public
 */
export declare type OnSelectionCommittedCallbackPayload<T> = {
    selection: T;
};

/**
 * @public
 */
export declare type ParentFilterOverAttributeType = ObjRef | ((parentFilter: IAttributeFilter, index: number) => ObjRef);

/**
 * @beta
 */
export declare const RankingFilter: React_2.FC<IRankingFilterProps>;

/**
 * @beta
 */
export declare const RankingFilterDropdown: React_2.FC<IRankingFilterDropdownProps>;

/**
 * Represents a relative date filter option in the date filter dropdown
 * @public
 */
export declare type RelativeDateFilterOption = IUiRelativeDateFilterForm | IRelativeDateFilterPreset;

/**
 * Renders elements selection list item as a single select list item.
 *
 * @beta
 */
export declare const SingleSelectionAttributeFilterElementsSelectItem: React_2.VFC<IAttributeFilterElementsSelectItemProps>;

/**
 * A component that displays only effective parent filters.
 * Current selection is not rendered as it is too simple for single selection filter.
 *
 * @beta
 */
export declare const SingleSelectionAttributeFilterStatusBar: React_2.FC<IAttributeFilterStatusBarProps>;

/**
 * @public
 */
export declare type Unsubscribe = () => void;

/**
 * Context providing AttributeFilter state and callbacks wrapped as {@link AttributeFilterController}.
 * @beta
 */
export declare const useAttributeFilterContext: () => IAttributeFilterContext;

/**
 * UseAttributeFilterController hook is responsible for initialization of AttributeFilterHandler {@link IMultiSelectAttributeFilterHandler} Core API for Attribute Filter components
 *
 * @remarks
 * You can access AttributeFilter state and callbacks ({@link AttributeFilterController})
 *
 * This is the best option if you need to implement fully custom UI for the attribute filter. This option requires a bit more coding, but you have a full control over the UI.
 * It has identical convenient API as AttributeFilter component - same input props and same output props that are available in the internal context of the AttributeFilter component.
 * It works out of the box with other UI.SDK things - {@link @gooddata/sdk-ui#BackendProvider}, {@link @gooddata/sdk-ui#WorkspaceProvider} and visualization definition placeholders.
 *
 * @public
 */
export declare const useAttributeFilterController: (props: IUseAttributeFilterControllerProps) => AttributeFilterController;

/**
 * Hook for retrieving AttributeFilterHandler {@link IMultiSelectAttributeFilterHandler} Core API for Attribute Filter components.
 * This hook is responsible for initialization of the AttributeFilterHandler.
 * @beta
 */
export declare const useAttributeFilterHandler: (props: IUseAttributeFilterHandlerProps) => IMultiSelectAttributeFilterHandler;

/**
 * Use this hook if you want to implement your custom attribute filter search bar component.
 *
 * @beta
 */
export declare const useAttributeFilterSearch: (props: IUseAttributeFilterSearchProps) => {
    onSearch: (search: string) => void;
    search: string;
};

/**
 * This hook is useful to inject custom isAutoOpen prop to AttributeFilterDropdownButton
 * @internal
 */
export declare const useAutoOpenAttributeFilterDropdownButton: (props: IAttributeFilterDropdownButtonProps, isAutoOpen: boolean) => void;

/**
 * This hook is useful to inject custom onClose to AttributeFilterDropdownButton
 * @internal
 */
export declare const useOnCloseAttributeFilterDropdownButton: (props: IAttributeFilterDropdownButtonProps, onClose: () => void) => void;

/**
 * @beta
 */
export declare type WarningMessage = string | IWarningMessage;

export { }
