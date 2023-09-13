import { Action, CaseReducer } from "@reduxjs/toolkit";
import { BackendCapabilitiesState } from "./backendCapabilitiesState.js";
import { IBackendCapabilities } from "@gooddata/sdk-backend-spi";
type BackendCapabilitiesReducer<A extends Action> = CaseReducer<BackendCapabilitiesState, A>;
export declare const backendCapabilitiesReducers: {
    setBackendCapabilities: BackendCapabilitiesReducer<{
        payload: IBackendCapabilities;
        type: string;
    }>;
};
export {};
