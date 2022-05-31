// (C) 2022 GoodData Corporation
import {
    ElementsQueryOptionsElementsSpecification,
    IAnalyticalBackend,
    IElementsQueryAttributeFilter,
} from "@gooddata/sdk-backend-spi";
import { IAttributeElement, ObjRef, IMeasure, IRelativeDateFilter } from "@gooddata/sdk-model";
import { Correlation, ElementsLoad, IElementsLoadResult, LoadableStatus } from "../types/common";
import { IAttributeElementLoader } from "../types";
import { newCallbackHandler } from "./common";

const defaultElementsLoad: ElementsLoad = (config) => {
    const {
        backend,
        displayForm,
        limit,
        offset,
        workspace,
        limitingAttributeFilters,
        limitingDateFilters,
        limitingMeasures,
        search,
        elements,
    } = config;
    let loader = backend.workspace(workspace).attributes().elements().forDisplayForm(displayForm);
    if (limit) {
        loader = loader.withLimit(limit);
    }
    if (offset) {
        loader = loader.withOffset(limit);
    }
    if (search || elements) {
        loader = loader.withOptions({ filter: search, elements });
    }
    if (limitingDateFilters) {
        loader = loader.withDateFilters(limitingDateFilters);
    }
    if (limitingAttributeFilters) {
        loader = loader.withAttributeFilters(limitingAttributeFilters);
    }
    if (limitingMeasures) {
        loader = loader.withMeasures(limitingMeasures);
    }

    return loader.query().then((res) => ({
        items: res.items,
        limit: res.limit,
        offset: res.offset,
        totalCount: res.totalCount,
    }));
};

/**
 * @internal
 */
export class DefaultAttributeElementsLoader implements IAttributeElementLoader {
    private search: string | undefined;
    private items: IAttributeElement[] = [];
    private dictionary: Map<string, IAttributeElement> = new Map();
    private totalCount: number = -1;
    private currentSettingsCount: number = -1;
    private limitingMeasures: IMeasure[] = [];
    private limitingAttributeFilters: IElementsQueryAttributeFilter[] = [];
    private limitingDateFilters: IRelativeDateFilter[] = [];
    private loadingStatus: LoadableStatus = "pending";

    private onLoaded = newCallbackHandler<IElementsLoadResult>();
    private onLoading = newCallbackHandler();
    private onError = newCallbackHandler<{ error: Error }>();
    private onCancelled = newCallbackHandler();

    constructor(
        private readonly displayFormRef: ObjRef,
        private readonly backend: IAnalyticalBackend,
        private readonly workspace: string,
        private readonly elementsLoad: ElementsLoad = defaultElementsLoad,
    ) {
        this.loadTotalCount();
    }

    // manipulators
    private loadTotalCount = (): void => {
        this.elementsLoad({
            backend: this.backend,
            workspace: this.workspace,
            displayForm: this.displayFormRef,
            offset: 0,
            limit: 1,
            search: "",
        }).then((res) => {
            this.totalCount = res.totalCount;
        });
    };

    loadElementsRange = (offset: number, limit: number, correlation?: string): void => {
        this.onLoading.triggerAll({ correlation });
        this.loadingStatus = "loading";
        this.elementsLoad({
            backend: this.backend,
            workspace: this.workspace,
            displayForm: this.displayFormRef,
            offset,
            limit,
            search: this.search,
            limitingMeasures: this.limitingMeasures,
            limitingAttributeFilters: this.limitingAttributeFilters,
            limitingDateFilters: this.limitingDateFilters,
        })
            .then((res) => {
                this.items.push(...res.items); // TODO actually merge
                res.items.forEach((item) => {
                    this.dictionary.set(item.uri, item);
                });
                this.currentSettingsCount = res.totalCount;
                this.onLoaded.triggerAll({ correlation, ...res });
                this.loadingStatus = "success";
            })
            // eslint-disable-next-line sonarjs/no-identical-functions
            .catch((error: Error) => {
                if (error.name === "AbortError") {
                    this.onCancelled.triggerAll({ correlation });
                } else {
                    this.onError.triggerAll({ correlation, error });
                }
                this.loadingStatus = "error";
            });
    };

    loadParticularElements = (
        elements: ElementsQueryOptionsElementsSpecification,
        correlation?: string,
    ): void => {
        this.onLoading.triggerAll({ correlation });
        this.elementsLoad({
            backend: this.backend,
            workspace: this.workspace,
            displayForm: this.displayFormRef,
            limit: 1000, // TODO actual max limit or length of elements?
            offset: 0,
            elements,
        })
            .then((res) => {
                res.items.forEach((item) => {
                    this.dictionary.set(item.uri, item);
                });
                this.onLoaded.triggerAll({ correlation, ...res });
            })
            // eslint-disable-next-line sonarjs/no-identical-functions
            .catch((error: Error) => {
                if (error.name === "AbortError") {
                    this.onCancelled.triggerAll({ correlation });
                } else {
                    this.onError.triggerAll({ correlation, error });
                }
            });
    };

    setSearch = (search: string, _correlation?: Correlation): void => {
        this.cancelElementLoad();
        this.search = search;
        this.items = [];
        this.currentSettingsCount = -1;
    };

    setLimitingMeasures = (measures: IMeasure[], _correlation?: Correlation): void => {
        this.cancelElementLoad();
        this.limitingMeasures = measures;
        this.items = [];
        this.currentSettingsCount = -1;
    };

    setLimitingAttributeFilters = (
        filters: IElementsQueryAttributeFilter[],
        _correlation?: Correlation,
    ): void => {
        this.cancelElementLoad();
        this.limitingAttributeFilters = filters;
        this.items = [];
        this.currentSettingsCount = -1;
    };

    setLimitingDateFilters = (filters: IRelativeDateFilter[], _correlation?: Correlation): void => {
        this.cancelElementLoad();
        this.limitingDateFilters = filters;
        this.items = [];
        this.currentSettingsCount = -1;
    };

    getSearch = (): string => {
        return this.search ?? "";
    };

    cancelElementLoad = (): void => {
        // TODO actually cancel
    };

    // selectors
    getAllItems = (): IAttributeElement[] => {
        return this.items;
    };

    getItemsByKey = (keys: string[]): IAttributeElement[] => {
        return keys.map((key) => this.dictionary.get(key));
    };

    getTotalCount = (): number => {
        return this.totalCount;
    };

    getCountWithCurrentSettings = (): number => {
        return this.currentSettingsCount;
    };

    getLoadingStatus = (): LoadableStatus => {
        return this.loadingStatus;
    };

    // callbacks
    onElementsRangeLoadSuccess = this.onLoaded.subscribe;
    onElementsRangeLoadStart = this.onLoading.subscribe;
    onElementsRangeLoadError = this.onError.subscribe;
    onElementsRangeLoadCancel = this.onCancelled.subscribe;
}
