// (C) 2022 GoodData Corporation
import {
    // ElementsQueryOptionsElementsSpecification,
    IElementsQueryAttributeFilter,
} from "@gooddata/sdk-backend-spi";
import { IAttributeElement, IMeasure, IRelativeDateFilter } from "@gooddata/sdk-model";
import { IElementsLoadResult, LoadableStatus, CallbackRegistration, Correlation } from "./common";

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
    loadElementsRange(offset: number, limit: number, correlation?: Correlation): void;

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
    // loadParticularElements(
    //     elements: ElementsQueryOptionsElementsSpecification,
    //     correlation?: Correlation,
    // ): void;

    /**
     * Set the search value used to filter the elements.
     *
     * @remarks
     * MUST NOT trigger a page load. MUST reset any loaded elements as they are no longer relevant.
     *
     * You can provide a correlation value that will be included in all the events fired by this.
     * This is useful if you want to "pair" loading and loaded events from the same initiated by the same
     * loadElementsRange call.
     *
     * @param search - the search string to use. Use empty string to reset search.
     * @param correlation - the correlation value // TODO is this useful here?
     */
    setSearch(search: string): void;

    /**
     * Set the measure that will limit the available elements.
     *
     * @param measures - the measures to use
     * @param correlation - the correlation value // TODO is this useful here?
     */
    setLimitingMeasures(measures: IMeasure[], correlation?: Correlation): void;

    /**
     * Set the attribute filters that will limit the available elements.
     *
     * @param filters - the filters to use
     * @param correlation - the correlation value // TODO is this useful here?
     */
    setLimitingAttributeFilters(filters: IElementsQueryAttributeFilter[], correlation?: Correlation): void;

    /**
     * Set the date filters that will limit the available elements.
     *
     * @param filters - the filters to use
     * @param correlation - the correlation value // TODO is this useful here?
     */
    setLimitingDateFilters(filters: IRelativeDateFilter[], correlation?: Correlation): void;

    /**
     * Cancel any loading of the elements if any is in progress.
     */
    cancelElementLoad(): void;

    //
    // selectors
    //

    getAllItems(): IAttributeElement[];
    getItemsByKey(keys: string[]): IAttributeElement[];
    getSearch(): string;
    getTotalCount(): number;
    getCountWithCurrentSettings(): number;
    getLoadingStatus(): LoadableStatus;

    //
    // callbacks
    //

    onElementsRangeLoadStart: CallbackRegistration;
    onElementsRangeLoadSuccess: CallbackRegistration<IElementsLoadResult>;
    onElementsRangeLoadError: CallbackRegistration<{ error: Error }>;
    onElementsRangeLoadCancel: CallbackRegistration;
}
