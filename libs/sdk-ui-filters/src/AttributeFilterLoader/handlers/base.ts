// (C) 2022 GoodData Corporation
import { v4 as uuid } from "uuid";
import {
    ElementsQueryOptionsElementsSpecification,
    IAnalyticalBackend,
    IElementsQueryAttributeFilter,
} from "@gooddata/sdk-backend-spi";
import {
    IAttributeElement,
    IAttributeDisplayFormMetadataObject,
    ObjRef,
    IAttributeFilter,
    filterObjRef,
    newNegativeAttributeFilter,
    newPositiveAttributeFilter,
    isNegativeAttributeFilter,
    filterAttributeElements,
    isAttributeElementsByRef,
    IAttributeElements,
    IMeasure,
    IRelativeDateFilter,
} from "@gooddata/sdk-model";
import {
    AttributeElementSelection,
    AttributeElementSelectionFull,
    CallbackRegistration,
    Correlation,
    DisplayFormLoad,
    ElementsLoad,
    IElementsLoadResult,
    Loadable,
    LoadableStatus,
} from "../types/common";
import {
    IAttributeDisplayFormLoader,
    IAttributeElementLoader,
    IAttributeFilterHandlerBase,
    IStagedAttributeElementsSelectionHandler,
} from "../types";
import { DefaultAttributeDisplayFormLoader } from "./displayForm";
import { DefaultStagedAttributeElementsSelectionHandler } from "./selection";
import { DefaultAttributeElementsLoader } from "./elements";

/**
 * @internal
 */
export interface IAttributeFilterHandlerConfig {
    readonly backend: IAnalyticalBackend;
    readonly workspace: string;
    readonly filter: IAttributeFilter;
    readonly displayFormLoad?: DisplayFormLoad;
    readonly elementsLoad?: ElementsLoad;
}

/**
 * @internal
 */
export class AttributeFilterHandlerBase implements IAttributeFilterHandlerBase {
    protected displayFormLoader: IAttributeDisplayFormLoader;
    protected elementLoader: IAttributeElementLoader;

    protected displayForm: ObjRef;
    protected isElementsByRef: boolean;
    protected stagedSelectionHandler: IStagedAttributeElementsSelectionHandler;

    constructor(config: IAttributeFilterHandlerConfig) {
        this.displayForm = filterObjRef(config.filter);

        this.displayFormLoader = new DefaultAttributeDisplayFormLoader(
            this.displayForm,
            config.backend,
            config.workspace,
            config.displayFormLoad,
        );

        const elements = filterAttributeElements(config.filter);

        const initialSelection: AttributeElementSelection = {
            isInverted: isNegativeAttributeFilter(config.filter),
            items: isAttributeElementsByRef(elements) ? elements.uris : elements.values,
        };

        this.isElementsByRef = isAttributeElementsByRef(elements);

        this.stagedSelectionHandler = new DefaultStagedAttributeElementsSelectionHandler(initialSelection);

        this.elementLoader = new DefaultAttributeElementsLoader(
            this.displayForm,
            config.backend,
            config.workspace,
            config.elementsLoad,
        );

        this.init(initialSelection);
    }

    private init = (selection: AttributeElementSelection) => {
        const correlation = "__INIT__";
        this.loadDisplayFormInfo(correlation);
        this.ensureSelectionLoaded(selection, correlation);
    };

    private ensureSelectionLoaded = (selection: AttributeElementSelection, correlation: Correlation) => {
        this.elementLoader.loadParticularElements(
            {
                uris: selection.items, // TODO detect other types of filters: value, primaryValue,...
            },
            correlation,
        );
    };

    // manipulators
    loadDisplayFormInfo = (correlation: Correlation = uuid()): void => {
        return this.displayFormLoader.loadDisplayFormInfo(correlation);
    };

    cancelDisplayFormInfoLoad = (): void => {
        return this.displayFormLoader.cancelDisplayFormInfoLoad();
    };

    loadElementsRange = (offset: number, limit: number, correlation: Correlation = uuid()): void => {
        return this.elementLoader.loadElementsRange(offset, limit, correlation);
    };

    loadParticularElements = (
        elements: ElementsQueryOptionsElementsSpecification,
        correlation: Correlation = uuid(),
    ): void => {
        return this.elementLoader.loadParticularElements(elements, correlation);
    };

    cancelElementLoad(): void {
        return this.elementLoader.cancelElementLoad();
    }

    setSearch = (search: string, correlation: Correlation = uuid()): void => {
        this.stagedSelectionHandler.changeSelection({ isInverted: true, items: [] }); // maybe not?
        return this.elementLoader.setSearch(search, correlation);
    };

    setLimitingMeasures = (measures: IMeasure[], correlation: Correlation = uuid()): void => {
        return this.elementLoader.setLimitingMeasures(measures, correlation);
    };

    setLimitingAttributeFilters = (
        filters: IElementsQueryAttributeFilter[],
        correlation: Correlation = uuid(),
    ): void => {
        return this.elementLoader.setLimitingAttributeFilters(filters, correlation);
    };

    setLimitingDateFilters = (filters: IRelativeDateFilter[], correlation: Correlation = uuid()): void => {
        return this.elementLoader.setLimitingDateFilters(filters, correlation);
    };

    // selectors
    protected getSelectedItemsBase(): AttributeElementSelectionFull {
        const selection = this.stagedSelectionHandler.getWorkingSelection();
        return {
            isInverted: selection.isInverted,
            elements: this.getItemsByKey(selection.items),
        };
    }

    getSearch = (): string => {
        return this.elementLoader.getSearch();
    };

    getAllItems = (): IAttributeElement[] => {
        return this.elementLoader.getAllItems();
    };

    getItemsByKey = (keys: string[]): IAttributeElement[] => {
        return this.elementLoader.getItemsByKey(keys);
    };

    getTotalCount = (): number => {
        return this.elementLoader.getTotalCount();
    };

    getCountWithCurrentSettings = (): number => {
        return this.elementLoader.getCountWithCurrentSettings();
    };

    getDisplayFormInfo = (): Loadable<IAttributeDisplayFormMetadataObject> => {
        return this.displayFormLoader.getDisplayFormInfo();
    };

    getFilter = (): IAttributeFilter => {
        const committedSelection = this.stagedSelectionHandler.getCommittedSelection();
        const elements: IAttributeElements = this.isElementsByRef
            ? { uris: committedSelection.items }
            : { values: committedSelection.items };
        return committedSelection.isInverted
            ? newNegativeAttributeFilter(this.displayForm, elements)
            : newPositiveAttributeFilter(this.displayForm, elements);
    };

    getLoadingStatus = (): LoadableStatus => {
        return this.elementLoader.getLoadingStatus();
    };

    // callbacks
    onElementsRangeLoadSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.elementLoader.onElementsRangeLoadSuccess(cb);
    };

    onElementsRangeLoadStart: CallbackRegistration = (cb) => {
        return this.elementLoader.onElementsRangeLoadStart(cb);
    };

    onElementsRangeLoadError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.elementLoader.onElementsRangeLoadError(cb);
    };

    onElementsRangeLoadCancel: CallbackRegistration = (cb) => {
        return this.elementLoader.onElementsRangeLoadCancel(cb);
    };

    onDisplayFormLoadSuccess: CallbackRegistration<{ displayForm: IAttributeDisplayFormMetadataObject }> = (
        cb,
    ) => {
        return this.displayFormLoader.onDisplayFormLoadSuccess(cb);
    };

    onDisplayFormLoadStart: CallbackRegistration = (cb) => {
        return this.displayFormLoader.onDisplayFormLoadStart(cb);
    };

    onDisplayFormLoadError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.displayFormLoader.onDisplayFormLoadError(cb);
    };

    onDisplayFormLoadCancel: CallbackRegistration = (cb) => {
        return this.displayFormLoader.onDisplayFormLoadCancel(cb);
    };
}
