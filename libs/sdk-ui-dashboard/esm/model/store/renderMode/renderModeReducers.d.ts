import { Action, AnyAction, CaseReducer } from "@reduxjs/toolkit";
import { RenderModeState } from "./renderModeState.js";
import { RenderMode } from "../../../types.js";
type RenderModeReducer<A extends Action = AnyAction> = CaseReducer<RenderModeState, A>;
export declare const renderModeReducers: {
    setRenderMode: RenderModeReducer<{
        payload: RenderMode;
        type: string;
    }>;
    setEditRenderMode: RenderModeReducer<AnyAction>;
    setViewRenderMode: RenderModeReducer<AnyAction>;
};
export {};
