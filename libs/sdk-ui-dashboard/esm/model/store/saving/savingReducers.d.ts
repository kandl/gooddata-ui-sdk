import { Action, AnyAction, CaseReducer } from "@reduxjs/toolkit";
import { SavingState } from "./savingState.js";
type SavingReducer<A extends Action = AnyAction> = CaseReducer<SavingState, A>;
export declare const savingReducers: {
    setSavingStart: SavingReducer<AnyAction>;
    setSavingSuccess: SavingReducer<AnyAction>;
    setSavingError: SavingReducer<{
        payload: Error;
        type: string;
    }>;
};
export {};
