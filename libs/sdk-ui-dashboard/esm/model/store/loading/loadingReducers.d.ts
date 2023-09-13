import { Action, AnyAction, CaseReducer } from "@reduxjs/toolkit";
import { LoadingState } from "./loadingState.js";
type LoadingReducer<A extends Action = AnyAction> = CaseReducer<LoadingState, A>;
export declare const loadingReducers: {
    setLoadingStart: LoadingReducer<AnyAction>;
    setLoadingSuccess: LoadingReducer<AnyAction>;
    setLoadingError: LoadingReducer<{
        payload: Error;
        type: string;
    }>;
};
export {};
