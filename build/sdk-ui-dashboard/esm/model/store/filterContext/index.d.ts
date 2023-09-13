export declare const filterContextSliceReducer: import("@reduxjs/toolkit").Reducer<import("./filterContextState.js").FilterContextState>;
export declare const filterContextActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setFilterContext: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: {
            filterContextDefinition: import("@gooddata/sdk-model").IFilterContextDefinition;
            originalFilterContextDefinition?: import("@gooddata/sdk-model").IFilterContextDefinition | undefined;
            attributeFilterDisplayForms: import("@gooddata/sdk-model").IAttributeDisplayFormMetadataObject[];
            filterContextIdentity?: import("@gooddata/sdk-model").IDashboardObjectIdentity | undefined;
        };
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    updateFilterContextIdentity: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: {
            filterContextIdentity?: import("@gooddata/sdk-model").IDashboardObjectIdentity | undefined;
        };
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    removeAttributeFilterDisplayForms: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    addAttributeFilterDisplayForm: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("@gooddata/sdk-model").IAttributeDisplayFormMetadataObject;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    addAttributeFilter: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IAddAttributeFilterPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    removeAttributeFilter: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IRemoveAttributeFilterPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    moveAttributeFilter: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IMoveAttributeFilterPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    updateAttributeFilterSelection: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IUpdateAttributeFilterSelectionPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    setAttributeFilterParents: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").ISetAttributeFilterParentsPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    clearAttributeFiltersSelection: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IClearAttributeFiltersSelectionPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    upsertDateFilter: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IUpsertDateFilterPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    changeAttributeDisplayForm: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IChangeAttributeDisplayFormPayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    changeAttributeTitle: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IChangeAttributeTitlePayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
    changeSelectionMode: (state: import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>, action: {
        payload: import("./filterContextReducers.js").IChangeAttributeSelectionModePayload;
        type: string;
    }) => void | import("./filterContextState.js").FilterContextState | import("immer/dist/internal.js").WritableDraft<import("./filterContextState.js").FilterContextState>;
}, "filterContext">;
