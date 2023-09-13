/**
 * @internal
 */
export declare const rootReducers: {
    setElementsTotalCount: import("./state.js").AttributeFilterReducer<{
        payload: {
            totalCount: number;
        };
        type: string;
    }>;
    initTotalCount: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    initTotalCountStart: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    initTotalCountSuccess: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    initTotalCountError: import("./state.js").AttributeFilterReducer<{
        payload: {
            error: import("@gooddata/sdk-ui").GoodDataSdkError;
            correlation: string;
        };
        type: string;
    }>;
    initTotalCountCancel: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    setElementsTotalCountWithCurrentSettings: import("./state.js").AttributeFilterReducer<{
        payload: {
            totalCount: number;
        };
        type: string;
    }>;
    setOffset: import("./state.js").AttributeFilterReducer<{
        payload: {
            offset: number;
        };
        type: string;
    }>;
    setLimit: import("./state.js").AttributeFilterReducer<{
        payload: {
            limit: number;
        };
        type: string;
    }>;
    setSearch: import("./state.js").AttributeFilterReducer<{
        payload: {
            search: string;
        };
        type: string;
    }>;
    setOrder: import("./state.js").AttributeFilterReducer<{
        payload: {
            order: import("@gooddata/sdk-model").SortDirection;
        };
        type: string;
    }>;
    setLimitingAttributeFilters: import("./state.js").AttributeFilterReducer<{
        payload: {
            filters: import("@gooddata/sdk-backend-spi").IElementsQueryAttributeFilter[];
        };
        type: string;
    }>;
    setLimitingMeasures: import("./state.js").AttributeFilterReducer<{
        payload: {
            filters: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IMeasureDefinitionType>[];
        };
        type: string;
    }>;
    setLimitingDateFilters: import("./state.js").AttributeFilterReducer<{
        payload: {
            filters: import("@gooddata/sdk-model").IRelativeDateFilter[];
        };
        type: string;
    }>;
    setLimitingAttributeFiltersAttributes: import("./state.js").AttributeFilterReducer<{
        payload: {
            attributes: import("@gooddata/sdk-model").IAttributeMetadataObject[];
        };
        type: string;
    }>;
    changeSelection: import("./state.js").AttributeFilterReducer<{
        payload: {
            selection: string[];
            isInverted?: boolean;
        };
        type: string;
    }>;
    revertSelection: import("./state.js").AttributeFilterReducer;
    commitSelection: import("./state.js").AttributeFilterReducer;
    invertSelection: import("./state.js").AttributeFilterReducer;
    clearSelection: import("./state.js").AttributeFilterReducer;
    loadCustomElementsRequest: import("./state.js").AttributeFilterReducer<{
        payload: {
            options: import("../../../index.js").ILoadElementsOptions;
            correlation: string;
        };
        type: string;
    }>;
    loadCustomElementsStart: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadCustomElementsSuccess: import("./state.js").AttributeFilterReducer<{
        payload: import("../../../index.js").ILoadElementsResult & {
            correlation?: string;
        };
        type: string;
    }>;
    loadCustomElementsError: import("./state.js").AttributeFilterReducer<{
        payload: {
            error: import("@gooddata/sdk-ui").GoodDataSdkError;
            correlation: string;
        };
        type: string;
    }>;
    loadCustomElementsCancelRequest: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadCustomElementsCancel: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadNextElementsPageRequest: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadNextElementsPageStart: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadNextElementsPageSuccess: import("./state.js").AttributeFilterReducer<{
        payload: import("../../../index.js").ILoadElementsResult & {
            correlation: string;
        };
        type: string;
    }>;
    loadNextElementsPageError: import("./state.js").AttributeFilterReducer<{
        payload: {
            error: import("@gooddata/sdk-ui").GoodDataSdkError;
            correlation: string;
        };
        type: string;
    }>;
    loadNextElementsPageCancelRequest: import("./state.js").AttributeFilterReducer;
    loadNextElementsPageCancel: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadInitialElementsPageRequest: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadInitialElementsPageStart: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadInitialElementsPageSuccess: import("./state.js").AttributeFilterReducer<{
        payload: import("../../../index.js").ILoadElementsResult & {
            correlation: string;
        };
        type: string;
    }>;
    loadInitialElementsPageError: import("./state.js").AttributeFilterReducer<{
        payload: {
            error: import("@gooddata/sdk-ui").GoodDataSdkError;
            correlation: string;
        };
        type: string;
    }>;
    loadInitialElementsPageCancelRequest: import("./state.js").AttributeFilterReducer;
    loadInitialElementsPageCancel: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadAttributeRequest: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadAttributeStart: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    loadAttributeSuccess: import("./state.js").AttributeFilterReducer<{
        payload: {
            attribute: import("@gooddata/sdk-model").IAttributeMetadataObject;
            correlation: string;
        };
        type: string;
    }>;
    loadAttributeError: import("./state.js").AttributeFilterReducer<{
        payload: {
            error: import("@gooddata/sdk-ui").GoodDataSdkError;
            correlation: string;
        };
        type: string;
    }>;
    loadAttributeCancelRequest: import("./state.js").AttributeFilterReducer;
    loadAttributeCancel: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    init: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    initStart: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    initSuccess: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
    initError: import("./state.js").AttributeFilterReducer<{
        payload: {
            error: import("@gooddata/sdk-ui").GoodDataSdkError;
            correlation: string;
        };
        type: string;
    }>;
    initCancel: import("./state.js").AttributeFilterReducer<{
        payload: {
            correlation: string;
        };
        type: string;
    }>;
};
