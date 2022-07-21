// (C) 2022 GoodData Corporation
import invariant from "ts-invariant";
import compact from "lodash/compact";
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
    IMeasure,
    IRelativeDateFilter,
} from "@gooddata/sdk-model";
import {
    AsyncOperationStatus,
    CallbackRegistration,
    Correlation,
    IElementsLoadResult,
} from "../../types/common";
import { IAttributeFilterHandlerConfig, InvertableAttributeElementSelection } from "../../types";
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
    selectWorkingSelection,
    selectCommittedSelection,
    selectAttributeElementsMap,
    getElementsByKeys,
    selectAttributeStatus,
    selectAttributeError,
    selectInitStatus,
    selectInitError,
    selectLoadInitialElementsPageStatus,
    selectLoadInitialElementsPageError,
    selectLoadNextElementsPageStatus,
    selectLoadNextElementsPageError,
} from "../../internal";
import { newAttributeFilterCallbacks } from "./callbacks";
import {
    selectInvertableCommittedSelection,
    selectInvertableWorkingSelection,
    selectIsWorkingSelectionChanged,
    selectIsWorkingSelectionEmpty,
} from "./selectors";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { ILoadAttributeElementsOptions } from "../../internal/store/attributeElements/types";

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
export class AttributeFilterReduxBridge {
    private redux: AttributeFilterStore;
    private config: IAttributeFilterHandlerConfig;

    private callbacks: ReturnType<typeof newAttributeFilterCallbacks>;

    constructor(config: IAttributeFilterHandlerConfig) {
        this.config = config;
        this.initializeBridge();
    }

    private initializeBridge = () => {
        this.callbacks = newAttributeFilterCallbacks();
        this.redux = createAttributeFilterStore({
            backend: this.config.backend,
            workspace: this.config.workspace,
            attributeFilter: this.config.filter,
            eventListener: (action, select) => {
                this.callbacks.eventListener(action, select);
            },
        });
    };

    init = (correlation: string): void => {
        this.redux.dispatch(
            actions.init({
                correlationId: correlation,
                attributeFilter: this.config.filter,
                hiddenElements: this.config.hiddenElements,
                staticElements: this.config.staticElements,
            }),
        );
    };

    reset = (): void => {
        this.redux.cancelRootSaga();
        this.callbacks.unsubscribeAll();
        this.initializeBridge();
    };

    loadAttribute = (correlation: Correlation): void => {
        this.redux.dispatch(actions.loadAttributeRequest({ correlationId: correlation }));
    };

    cancelAttributeLoad = (): void => {
        this.redux.dispatch(actions.loadAttributeCancelRequest());
    };

    loadInitialElementsPage = (correlation: Correlation): void => {
        this.redux.dispatch(actions.loadInitialElementsPageRequest({ correlationId: correlation }));
    };

    // remove correlation id
    cancelInitialElementsPageLoad = (correlation: Correlation): void => {
        this.redux.dispatch(actions.loadInitialElementsPageCancelRequest({ correlationId: correlation }));
    };

    loadNextElementsPage = (correlation: Correlation): void => {
        this.redux.dispatch(actions.loadNextElementsPageRequest({ correlationId: correlation }));
    };

    // remove correlation id
    cancelNextElementsPageLoad(correlation: Correlation): void {
        this.redux.dispatch(actions.loadNextElementsPageCancelRequest({ correlationId: correlation }));
    }

    loadCustomElements = (options: ILoadAttributeElementsOptions, correlation: Correlation): void => {
        this.redux.dispatch(actions.loadCustomElementsRequest({ options, correlationId: correlation }));
    };

    // remove correlation id
    cancelCustomElementsLoad(correlation: Correlation): void {
        this.redux.dispatch(actions.loadCustomElementsCancelRequest({ correlationId: correlation }));
    }

    // Manipulators
    setSearch = (search: string): void => {
        this.redux.dispatch(actions.setSearch({ search }));
    };

    setLimitingMeasures = (filters: IMeasure[]): void => {
        this.redux.dispatch(actions.setLimitingMeasures({ filters }));
    };

    setLimitingAttributeFilters = (filters: IElementsQueryAttributeFilter[]): void => {
        this.redux.dispatch(actions.setLimitingAttributeFilters({ filters }));
    };

    setLimitingDateFilters = (filters: IRelativeDateFilter[]): void => {
        this.redux.dispatch(actions.setLimitingDateFilters({ filters }));
    };

    getSearch = (): string => {
        return this.redux.select(selectSearch);
    };

    getAllElements = (): IAttributeElement[] => {
        return this.redux.select(selectAttributeElements);
    };

    getElementsByKey = (keys: string[]): IAttributeElement[] => {
        const elementsMap = this.redux.select(selectAttributeElementsMap);
        return getElementsByKeys(keys, elementsMap);
    };

    getTotalCount = (): number => {
        return this.redux.select(selectAttributeElementsTotalCount);
    };

    getTotalCountWithCurrentSettings = (): number => {
        return this.redux.select(selectAttributeElementsTotalCountWithCurrentSettings);
    };

    getAttribute = (): IAttributeMetadataObject | undefined => {
        return this.redux.select(selectAttribute);
    };

    getAttributeStatus = (): AsyncOperationStatus => {
        return this.redux.select(selectAttributeStatus);
    };

    getAttributeError = (): GoodDataSdkError => {
        return this.redux.select(selectAttributeError);
    };

    getInitialElementsPageLoadStatus = (): AsyncOperationStatus => {
        return this.redux.select(selectLoadInitialElementsPageStatus);
    };

    getInitialElementsPageLoadError = (): GoodDataSdkError => {
        return this.redux.select(selectLoadInitialElementsPageError);
    };

    getNextElementsPageLoadStatus = (): AsyncOperationStatus => {
        return this.redux.select(selectLoadNextElementsPageStatus);
    };

    getNextElementsPageLoadError = (): GoodDataSdkError => {
        return this.redux.select(selectLoadNextElementsPageError);
    };

    getInitStatus = (): AsyncOperationStatus => {
        return this.redux.select(selectInitStatus);
    };

    getInitError = (): GoodDataSdkError => {
        return this.redux.select(selectInitError);
    };

    getFilter = (): IAttributeFilter => {
        return this.redux.select(selectAttributeFilter);
    };

    //
    // Multi select
    //
    changeMultiSelection = ({ items, isInverted }: InvertableAttributeElementSelection): void => {
        this.redux.dispatch(
            actions.changeSelection({
                selection: items,
                isInverted,
            }),
        );
    };

    revertMultiSelection = (): void => {
        this.redux.dispatch(actions.revertSelection());
    };

    commitMultiSelection = (): void => {
        this.redux.dispatch(actions.commitSelection());
    };

    invertMultiSelection = (): void => {
        this.redux.dispatch(actions.invertSelection());
    };

    clearMultiSelection = (): void => {
        this.redux.dispatch(actions.clearSelection());
    };

    getWorkingMultiSelection = (): InvertableAttributeElementSelection => {
        return this.redux.select(selectInvertableWorkingSelection);
    };

    getCommittedMultiSelection = (): InvertableAttributeElementSelection => {
        return this.redux.select(selectInvertableCommittedSelection);
    };

    getIsWorkingSelectionEmpty = (): boolean => {
        return this.redux.select(selectIsWorkingSelectionEmpty);
    };

    getIsWorkingSelectionChanged = (): boolean => {
        return this.redux.select(selectIsWorkingSelectionChanged);
    };

    changeSingleSelection = (selection: string | undefined): void => {
        this.redux.dispatch(
            actions.changeSelection({
                isInverted: false,
                selection: compact([selection]),
            }),
        );
    };

    revertSingleSelection = (): void => {
        this.redux.dispatch(actions.revertSelection());
    };

    commitSingleSelection = (): void => {
        this.redux.dispatch(actions.commitSelection());
    };

    getWorkingSingleSelection = (): string | undefined => {
        const [element, ...maybeMoreElements] = this.redux.select(selectWorkingSelection);
        invariant(
            !maybeMoreElements.length,
            "Trying to invoke single select method, but multiple elements are selected.",
        );
        return element;
    };

    getCommittedSingleSelection = (): string | undefined => {
        const [element, ...maybeMoreElements] = this.redux.select(selectCommittedSelection);
        invariant(
            !maybeMoreElements.length,
            "Trying to invoke single select method, but multiple elements are selected.",
        );
        return element;
    };

    onMultiSelectionChanged: CallbackRegistration<{ selection: InvertableAttributeElementSelection }> = (
        cb,
    ) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.selectionChanged);
    };

    onMultiSelectionCommitted: CallbackRegistration<{ selection: InvertableAttributeElementSelection }> = (
        cb,
    ) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.selectionCommitted);
    };

    onSingleSelectionChanged: CallbackRegistration<{ selection: string | undefined }> = (cb) => {
        return this.callbacks.registerCallback(
            ({ selection }) => cb({ selection: selection[0] }),
            this.callbacks.registrations.selectionChanged,
        );
    };

    onSingleSelectionCommitted: CallbackRegistration<{ selection: string | undefined }> = (cb) => {
        return this.callbacks.registerCallback(
            ({ selection }) => cb({ selection: selection[0] }),
            this.callbacks.registrations.selectionCommitted,
        );
    };

    onLoadInitialElementsPageSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.callbacks.registerCallback(
            cb,
            this.callbacks.registrations.loadInitialElementsPageSuccess,
        );
    };

    onLoadInitialElementsPageStart: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadInitialElementsPageStart);
    };

    onLoadInitialElementsPageError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadInitialElementsPageError);
    };

    onLoadInitialElementsPageCancel: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(
            cb,
            this.callbacks.registrations.loadInitialElementsPageCancel,
        );
    };

    onLoadNextElementsPageSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageSuccess);
    };

    onLoadNextElementsPageStart: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageStart);
    };

    onLoadNextElementsPageError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageError);
    };

    onLoadNextElementsPageCancel: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageCancel);
    };

    onLoadCustomElementsSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsSuccess);
    };

    onLoadCustomElementsStart: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsStart);
    };

    onLoadCustomElementsError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsError);
    };

    onLoadCustomElementsCancel: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsCancel);
    };

    onAttributeLoadSuccess: CallbackRegistration<{ attribute: IAttributeMetadataObject }> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeSuccess);
    };

    onAttributeLoadStart: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeStart);
    };

    onAttributeLoadError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeError);
    };

    onAttributeLoadCancel: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeCancel);
    };

    onInitStart: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.initStart);
    };

    onInitSuccess: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.initSuccess);
    };

    onInitError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.initError);
    };

    onInitCancel: CallbackRegistration = (cb) => {
        return this.callbacks.registerCallback(cb, this.callbacks.registrations.initCancel);
    };
}
