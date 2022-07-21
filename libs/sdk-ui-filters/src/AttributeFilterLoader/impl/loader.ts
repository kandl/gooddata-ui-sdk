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
    IMeasure,
    IRelativeDateFilter,
} from "@gooddata/sdk-model";
import {
    AsyncOperationStatus,
    CallbackRegistration,
    Correlation,
    IElementsLoadResult,
} from "../types/common";
import { IAttributeFilterHandlerConfig, IAttributeFilterLoader } from "../types";
import { AttributeFilterReduxBridge } from "./bridge/index";
import { GoodDataSdkError } from "@gooddata/sdk-ui";

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
export class AttributeFilterLoader implements IAttributeFilterLoader {
    protected bridge: AttributeFilterReduxBridge;
    protected config: IAttributeFilterHandlerConfig;

    protected constructor(config: IAttributeFilterHandlerConfig) {
        this.config = config;
        this.bridge = new AttributeFilterReduxBridge(config);
    }

    // manipulators
    init = (correlation: Correlation = uuid()): void => {
        this.bridge.init(correlation);
    };

    // loadAttribute = (correlation: Correlation = uuid()): void => {
    //     this.bridge.loadAttribute(correlation);
    // };

    // cancelAttributeLoad = (): void => {
    //     this.bridge.cancelAttributeLoad();
    // };

    loadInitialElementsPage = (correlation: Correlation = uuid()): void => {
        this.bridge.loadInitialElementsPage(correlation);
    };

    // TODO: remove correlation?
    cancelInitialElementsPageLoad(correlation: Correlation = uuid()): void {
        this.bridge.cancelInitialElementsPageLoad(correlation);
    }

    loadNextElementsPage = (correlation: Correlation = uuid()): void => {
        this.bridge.loadNextElementsPage(correlation);
    };

    // TODO: remove correlation?
    cancelNextElementsPageLoad(correlation: Correlation = uuid()): void {
        this.bridge.cancelNextElementsPageLoad(correlation);
    }

    // TODO: options
    loadCustomElements = (options: any, correlation: Correlation = uuid()): void => {
        this.bridge.loadCustomElements(options, correlation);
    };

    // TODO: remove correlation?
    cancelCustomElementsLoad(correlation: Correlation = uuid()): void {
        this.bridge.cancelCustomElementsLoad(correlation);
    }

    setSearch = (search: string): void => {
        this.bridge.setSearch(search);
    };

    setLimit = (_limit: number): void => {
        // TODO
        // this.bridge.setSearch(search);
    };

    setOrder = (_order: "asc" | "desc"): void => {
        // TODO
        // this.bridge.setSearch(search);
    };

    setLimitingMeasures = (measures: IMeasure[]): void => {
        this.bridge.setLimitingMeasures(measures);
    };

    setLimitingAttributeFilters = (filters: IElementsQueryAttributeFilter[]): void => {
        return this.bridge.setLimitingAttributeFilters(filters);
    };

    setLimitingDateFilters = (filters: IRelativeDateFilter[]): void => {
        return this.bridge.setLimitingDateFilters(filters);
    };

    // selectors
    getSearch = (): string => {
        return this.bridge.getSearch();
    };

    getAllElements = (): IAttributeElement[] => {
        return this.bridge.getAllElements();
    };

    getElementsByKey = (keys: string[]): IAttributeElement[] => {
        return this.bridge.getElementsByKey(keys);
    };

    getTotalElementsCount = (): number => {
        return this.bridge.getTotalCount();
    };

    getTotalElementsCountWithCurrentSettings = (): number => {
        return this.bridge.getTotalCountWithCurrentSettings();
    };

    getAttribute = (): IAttributeMetadataObject | undefined => {
        return this.bridge.getAttribute();
    };

    // getAttributeStatus = (): AsyncOperationStatus => {
    //     return this.bridge.getAttributeStatus();
    // };

    // getAttributeError = (): GoodDataSdkError => {
    //     return this.bridge.getAttributeError();
    // };

    // getLoadInitialElementsPageStatus = (): AsyncOperationStatus => {
    //     return this.bridge.getLoadInitialElementsPageStatus();
    // };

    // getLoadInitialElementsPageError = (): GoodDataSdkError => {
    //     return this.bridge.getLoadInitialElementsPageError();
    // };

    getInitialElementsPageLoadStatus = (): AsyncOperationStatus => {
        return this.bridge.getInitialElementsPageLoadStatus();
    };

    getInitialElementsPageLoadError = (): GoodDataSdkError => {
        return this.bridge.getInitialElementsPageLoadError();
    };

    getNextElementsPageLoadStatus = (): AsyncOperationStatus => {
        return this.bridge.getNextElementsPageLoadStatus();
    };

    getNextElementsPageLoadError = (): GoodDataSdkError => {
        return this.bridge.getNextElementsPageLoadError();
    };

    getInitStatus = (): AsyncOperationStatus => {
        return this.bridge.getInitStatus();
    };

    getInitError = (): GoodDataSdkError => {
        return this.bridge.getInitError();
    };

    getFilter = (): IAttributeFilter => {
        return this.bridge.getFilter();
    };

    // callbacks
    onLoadInitialElementsPageSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.bridge.onLoadInitialElementsPageSuccess(cb);
    };

    onLoadInitialElementsPageStart: CallbackRegistration = (cb) => {
        return this.bridge.onLoadInitialElementsPageStart(cb);
    };

    onLoadInitialElementsPageError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.bridge.onLoadInitialElementsPageError(cb);
    };

    onLoadInitialElementsPageCancel: CallbackRegistration = (cb) => {
        return this.bridge.onLoadInitialElementsPageCancel(cb);
    };

    onLoadNextElementsPageSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.bridge.onLoadNextElementsPageSuccess(cb);
    };

    onLoadNextElementsPageStart: CallbackRegistration = (cb) => {
        return this.bridge.onLoadNextElementsPageStart(cb);
    };

    onLoadNextElementsPageError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.bridge.onLoadNextElementsPageError(cb);
    };

    onLoadNextElementsPageCancel: CallbackRegistration = (cb) => {
        return this.bridge.onLoadNextElementsPageCancel(cb);
    };

    onLoadCustomElementsSuccess: CallbackRegistration<IElementsLoadResult> = (cb) => {
        return this.bridge.onLoadCustomElementsSuccess(cb);
    };

    onLoadCustomElementsStart: CallbackRegistration = (cb) => {
        return this.bridge.onLoadCustomElementsStart(cb);
    };

    onLoadCustomElementsError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.bridge.onLoadCustomElementsError(cb);
    };

    onLoadCustomElementsCancel: CallbackRegistration = (cb) => {
        return this.bridge.onLoadCustomElementsCancel(cb);
    };

    onAttributeLoadSuccess: CallbackRegistration<{ attribute: IAttributeMetadataObject }> = (cb) => {
        return this.bridge.onAttributeLoadSuccess(cb);
    };

    onAttributeLoadStart: CallbackRegistration = (cb) => {
        return this.bridge.onAttributeLoadStart(cb);
    };

    onAttributeLoadError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.bridge.onAttributeLoadError(cb);
    };

    onAttributeLoadCancel: CallbackRegistration = (cb) => {
        return this.bridge.onAttributeLoadCancel(cb);
    };

    // TODO: callback params
    onInitStart: CallbackRegistration = (cb) => {
        return this.bridge.onInitStart(cb);
    };

    // TODO ??? or separate init / attribute?
    onInitSuccess: CallbackRegistration<{
        attribute: IAttributeMetadataObject;
        particularElements: any;
        elementsRange: any;
    }> = (cb) => {
        return this.bridge.onInitSuccess(cb);
    };

    onInitError: CallbackRegistration<{ error: Error }> = (cb) => {
        return this.bridge.onInitError(cb);
    };

    onInitCancel: CallbackRegistration = (cb) => {
        return this.bridge.onInitCancel(cb);
    };

    // TODO:
    onUpdate: () => {
        // do something
    };
}
