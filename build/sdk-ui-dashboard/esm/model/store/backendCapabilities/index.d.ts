export declare const backendCapabilitiesSliceReducer: import("@reduxjs/toolkit").Reducer<import("./backendCapabilitiesState.js").BackendCapabilitiesState>;
export declare const backendCapabilitiesActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setBackendCapabilities: (state: import("immer/dist/internal.js").WritableDraft<import("./backendCapabilitiesState.js").BackendCapabilitiesState>, action: {
        payload: import("@gooddata/sdk-backend-spi").IBackendCapabilities;
        type: string;
    }) => void | import("./backendCapabilitiesState.js").BackendCapabilitiesState | import("immer/dist/internal.js").WritableDraft<import("./backendCapabilitiesState.js").BackendCapabilitiesState>;
}, "backendCapabilities">;
