import { Action, CaseReducer } from "@reduxjs/toolkit";
import { ResolvedEntitlements } from "../../types/commonTypes.js";
import { EntitlementsState } from "./entitlementsState.js";
type EntitlementsReducer<A extends Action> = CaseReducer<EntitlementsState, A>;
export declare const entitlementsReducers: {
    setEntitlements: EntitlementsReducer<{
        payload: ResolvedEntitlements;
        type: string;
    }>;
};
export {};
