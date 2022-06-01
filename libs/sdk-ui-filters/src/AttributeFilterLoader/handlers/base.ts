// (C) 2022 GoodData Corporation
import { v4 as uuid } from "uuid";
import {
    ElementsQueryOptionsElementsSpecification,
    IAnalyticalBackend,
    IElementsQueryAttributeFilter,
} from "@gooddata/sdk-backend-spi";
import {
    IAttributeElement,
    IAttributeMetadataObject,
    ObjRef,
    IAttributeFilter,
    // filterObjRef,
    // newNegativeAttributeFilter,
    // newPositiveAttributeFilter,
    // isNegativeAttributeFilter,
    // filterAttributeElements,
    // isAttributeElementsByRef,
    // IAttributeElements,
    IMeasure,
    IRelativeDateFilter,
} from "@gooddata/sdk-model";
import {
    CallbackRegistration,
    Correlation,
    IElementsLoadResult,
    Loadable,
    LoadableStatus,
} from "../types/common";
import {
    // IAttributeLoader,
    // IAttributeElementLoader,
    IAttributeFilterHandlerBase,
    // IStagedInvertableSelectionHandler,
    // InvertableSelection,
    // AttributeElementSelectionFull,
} from "../types";
// import { DefaultAttributeDisplayFormLoader } from "./attribute";
// import { DefaultStagedAttributeElementsSelectionHandler } from "./selection";
// import { DefaultAttributeElementsLoader } from "./elements";
import {
    actions,
    AttributeFilterStore,
    createAttributeFilterStore,
    selectAttribute,
    selectAttributeElements,
    selectAttributeElementsTotalCount,
    selectAttributeElementsTotalCountWithCurrentSettings,
    selectAttributeFilter,
    selectSearch,
} from "../internal";
import { newCallbackHandler } from "./common";

/**
 * @internal
 */
export interface ElementsLoadConfig {
    backend: IAnalyticalBackend;
    workspace: string;
    displayForm: ObjRef;
    offset: number;
    limit: number;
    search?: string;
    limitingAttributeFilters?: IElementsQueryAttributeFilter[];
    limitingMeasures?: IMeasure[];
    limitingDateFilters?: IRelativeDateFilter[];
    elements?: ElementsQueryOptionsElementsSpecification;
}

/**
 * @internal
 */
export interface IAttributeFilterHandlerConfig {
    readonly backend: IAnalyticalBackend;
    readonly workspace: string;
    readonly filter: IAttributeFilter;
}

/**
 * @alpha
 */
export class AttributeFilterHandlerBase implements IAttributeFilterHandlerBase {
    // protected attributeLoader: IAttributeLoader;
    // protected elementLoader: IAttributeElementLoader;

    // protected displayForm: ObjRef;
    // protected isElementsByRef: boolean;
    // protected stagedSelectionHandler: IStagedInvertableSelectionHandler;
    private callbacks = {
        // Elements
        elementsRangeLoadStart: newCallbackHandler(),
        elementsRangeLoadSuccess: newCallbackHandler<IElementsLoadResult>(),
        elementsRangeLoadError: newCallbackHandler<{ error: Error }>(),
        elementsRangeLoadCancel: newCallbackHandler(),

        // Attribute
        attributeLoadStart: newCallbackHandler(),
        attributeLoadSuccess: newCallbackHandler<{ attribute: IAttributeMetadataObject }>(),
        attributeLoadError: newCallbackHandler<{ error: Error }>(),
        attributeLoadCancel: newCallbackHandler(),
    };

    protected redux: AttributeFilterStore;

    // TODO: make private
    protected constructor(config: IAttributeFilterHandlerConfig) {
        this.redux = createAttributeFilterStore({
            backend: config.backend,
            workspace: config.workspace,
            attributeFilter: config.filter,
            // TODO: callback registration & unsubscribe
            eventListener: (action, nextState) => {
                // eslint-disable-next-line no-console
                console.log("Action fired:", { action, nextState });

                // Concrete action listening
                if (actions.attributeElementsRequest.match(action)) {
                    // React somehow
                }
            },
        });

        this.redux.dispatch(actions.init());
    }

    // public static for = (config: IAttributeFilterHandlerConfig) => {

    // }

    // private init = (selection: InvertableSelection) => {
    //     const correlation = "__INIT__";
    //     this.loadAttribute(correlation);
    //     this.ensureSelectionLoaded(selection, correlation);
    // };

    // private ensureSelectionLoaded = (selection: InvertableSelection, correlation: Correlation) => {
    //     this.elementLoader.loadParticularElements(
    //         {
    //             uris: selection.items, // TODO detect other types of filters: value, primaryValue,...
    //         },
    //         correlation,
    //     );
    // };

    // manipulators
    loadAttribute = (correlation: Correlation = uuid()): void => {
        this.redux.dispatch(actions.attributeRequest({ correlationId: correlation }));
    };

    cancelAttributeLoad = (): void => {
        this.redux.dispatch(actions.attributeCancelRequest());
    };

    loadElementsRange = (offset: number, limit: number, correlation: Correlation = uuid()): void => {
        this.redux.dispatch(actions.attributeElementsRequest({ limit, offset, correlationId: correlation }));
    };

    // TODO: init callbacks (onSelectionLoaded)
    // loadParticularElements = (
    //     elements: ElementsQueryOptionsElementsSpecification,
    //     correlation: Correlation = uuid(),
    // ): void => {
    //     return this.elementLoader.loadParticularElements(elements, correlation);
    // };

    cancelElementLoad(): void {
        this.redux.dispatch(actions.attributeElementsCancelRequest());
    }

    setSearch = (search: string): void => {
        // TODO: Reset selection?
        // this.stagedSelectionHandler.changeSelection({ isInverted: true, items: [] }); // maybe not?
        this.redux.dispatch(actions.setSearch({ search }));
    };

    setLimitingMeasures = (_measures: IMeasure[], _correlation: Correlation = uuid()): void => {
        // TODO: implement
        // return this.elementLoader.setLimitingMeasures(measures, correlation);
    };

    setLimitingAttributeFilters = (
        _filters: IElementsQueryAttributeFilter[],
        _correlation: Correlation = uuid(),
    ): void => {
        // TODO: implement
        // return this.elementLoader.setLimitingAttributeFilters(filters, correlation);
    };

    setLimitingDateFilters = (_filters: IRelativeDateFilter[], _correlation: Correlation = uuid()): void => {
        // TODO: implement
        // return this.elementLoader.setLimitingDateFilters(filters, correlation);
    };

    // selectors
    // protected getSelectedItemsBase(): AttributeElementSelectionFull {
    //     const selection = this.stagedSelectionHandler.getWorkingSelection();
    //     return {
    //         isInverted: selection.isInverted,
    //         elements: this.getItemsByKey(selection.items),
    //     };
    // }

    getSearch = (): string => {
        return this.redux.select(selectSearch);
    };

    getAllItems = (): IAttributeElement[] => {
        return this.redux.select(selectAttributeElements);
    };

    getItemsByKey = (_keys: string[]): IAttributeElement[] => {
        // TODO implement selector for it
        return [];
    };

    getTotalCount = (): number => {
        return this.redux.select(selectAttributeElementsTotalCount);
    };

    getCountWithCurrentSettings = (): number => {
        return this.redux.select(selectAttributeElementsTotalCountWithCurrentSettings);
    };

    getAttribute = (): Loadable<IAttributeMetadataObject> => {
        // TODO
        return {
            result: this.redux.select(selectAttribute),
            error: undefined,
            status: "success",
        };
    };

    getFilter = (): IAttributeFilter => {
        // TODO
        // const committedSelection = this.stagedSelectionHandler.getCommittedSelection();
        // const elements: IAttributeElements = this.isElementsByRef
        //     ? { uris: committedSelection.items }
        //     : { values: committedSelection.items };
        // return committedSelection.isInverted
        //     ? newNegativeAttributeFilter(this.displayForm, elements)
        //     : newPositiveAttributeFilter(this.displayForm, elements);
        return this.redux.select(selectAttributeFilter);
    };

    getLoadingStatus = (): LoadableStatus => {
        // TODO
        // return this.elementLoader.getLoadingStatus();
        return "success";
    };

    // callbacks
    onElementsRangeLoadSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.callbacks.elementsRangeLoadSuccess.subscribe(cb);
    };

    onElementsRangeLoadStart: CallbackRegistration = (cb) => {
        return this.callbacks.elementsRangeLoadStart.subscribe(cb);
    };

    onElementsRangeLoadError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.elementsRangeLoadError.subscribe(cb);
    };

    onElementsRangeLoadCancel: CallbackRegistration = (cb) => {
        return this.callbacks.elementsRangeLoadCancel.subscribe(cb);
    };

    onAttributeLoadSuccess: CallbackRegistration<{ attribute: IAttributeMetadataObject }> = (cb) => {
        return this.callbacks.attributeLoadSuccess.subscribe(cb);
    };

    onAttributeLoadStart: CallbackRegistration = (cb) => {
        return this.callbacks.attributeLoadStart.subscribe(cb);
    };

    onAttributeLoadError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.attributeLoadError.subscribe(cb);
    };

    onAttributeLoadCancel: CallbackRegistration = (cb) => {
        return this.callbacks.attributeLoadCancel.subscribe(cb);
    };
}
