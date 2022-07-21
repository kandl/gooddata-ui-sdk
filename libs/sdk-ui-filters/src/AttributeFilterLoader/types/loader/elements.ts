// (C) 2022 GoodData Corporation
import {
    // ElementsQueryOptionsElementsSpecification,
    IElementsQueryAttributeFilter,
} from "@gooddata/sdk-backend-spi";
import { IAttributeElement, IMeasure, IRelativeDateFilter } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { IElementsLoadResult, CallbackRegistration, Correlation, AsyncOperationStatus } from "../common";

/**
 * Handles the loading of the elements
 * @alpha
 */
export interface IAttributeElementLoader {
    //
    // manipulators
    //

    /**
     * Trigger the load of a attribute elements range.
     *
     * @remarks
     * Will cancel any running loads if there are any.
     *
     * You can provide a correlation value that will be included in all the events fired by this.
     * This is useful if you want to "pair" loading and loaded events from the same initiated by the same
     * loadElementsRange call.
     *
     * @param offset - the number of elements to skip
     * @param limit - the number of elements to load
     * @param correlation - the correlation value
     */
    loadInitialElementsPage(correlation?: Correlation): void;

    /**
     * Trigger a load of elements specified.
     *
     * @remarks
     * Will cancel any running loads if there are any.
     *
     * You can provide a correlation value that will be included in all the events fired by this.
     * This is useful if you want to "pair" loading and loaded events from the same initiated by the same
     * loadElementsRange call.
     *
     * @param elements - the elements to load
     * @param correlation - the correlation value
     */
    loadNextElementsPage(correlation?: Correlation): void;

    /**
     *
     * @param options - options to load the custom elements
     * @param correlation - the correlation
     */
    loadCustomElements(options: any, correlation?: Correlation): void;
    // elements: ElementsQueryOptionsElementsSpecification,

    // setDisplayForm

    /**
     * Set the limit for element loads.
     *
     * @remarks
     * MUST NOT trigger a page load. MUST reset any loaded elements as they are no longer relevant.
     *
     * @param limit - the limit to use.
     */
    setLimit(limit: number): void;

    /**
     * Set ordering of the element loads.
     *
     * @remarks
     * MUST NOT trigger a page load. MUST reset any loaded elements as they are no longer relevant.
     *
     * @param order - the ordering to use.
     */
    setOrder(order: "asc" | "desc"): void;

    /**
     * Set the search value used to filter the elements.
     *
     * @remarks
     * MUST NOT trigger a page load. MUST reset any loaded elements as they are no longer relevant.
     *
     * @param search - the search string to use. Use empty string to reset search.
     */
    setSearch(search: string): void;

    /**
     * Set the measure that will limit the available elements.
     *
     * @param measures - the measures to use
     */
    setLimitingMeasures(measures: IMeasure[]): void;

    /**
     * Set the attribute filters that will limit the available elements.
     *
     * @param filters - the filters to use
     */
    setLimitingAttributeFilters(filters: IElementsQueryAttributeFilter[]): void;

    /**
     * Set the date filters that will limit the available elements.
     *
     * @param filters - the filters to use
     */
    setLimitingDateFilters(filters: IRelativeDateFilter[]): void;

    /**
     * Cancel any loading of the elements if any is in progress.
     */
    cancelInitialElementsPageLoad(): void;
    cancelNextElementsPageLoad(): void;
    cancelCustomElementsLoad(): void;

    // TODO: separate it?
    getInitialElementsPageLoadStatus(): AsyncOperationStatus;
    getInitialElementsPageLoadError(): GoodDataSdkError;

    // TODO: separate it?
    getNextElementsPageLoadStatus(): AsyncOperationStatus;
    getNextElementsPageLoadError(): GoodDataSdkError;

    //
    // selectors
    //
    getAllElements(): IAttributeElement[];
    getElementsByKey(keys: string[]): IAttributeElement[];

    getSearch(): string;

    getTotalElementsCount(): number;
    getTotalElementsCountWithCurrentSettings(): number;

    //
    // callbacks
    //
    onLoadInitialElementsPageStart: CallbackRegistration;
    onLoadInitialElementsPageSuccess: CallbackRegistration<IElementsLoadResult>;
    onLoadInitialElementsPageError: CallbackRegistration<{ error: Error }>;
    onLoadInitialElementsPageCancel: CallbackRegistration;

    onLoadNextElementsPageStart: CallbackRegistration;
    onLoadNextElementsPageSuccess: CallbackRegistration<IElementsLoadResult>;
    onLoadNextElementsPageError: CallbackRegistration<{ error: Error }>;
    onLoadNextElementsPageCancel: CallbackRegistration;

    onLoadCustomElementsStart: CallbackRegistration;
    onLoadCustomElementsSuccess: CallbackRegistration<IElementsLoadResult>;
    onLoadCustomElementsError: CallbackRegistration<{ error: Error }>;
    onLoadCustomElementsCancel: CallbackRegistration;
}
