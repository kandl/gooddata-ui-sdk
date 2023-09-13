import { Action, CaseReducer } from "@reduxjs/toolkit";
import { UserState } from "./userState.js";
import { IUser } from "@gooddata/sdk-model";
type UserReducers<A extends Action> = CaseReducer<UserState, A>;
export declare const userReducers: {
    setUser: UserReducers<{
        payload: IUser;
        type: string;
    }>;
};
export {};
