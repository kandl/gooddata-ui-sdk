// (C) 2021 GoodData Corporation
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterContextState {
    filterContext: any;
}

const initialState = { filterContext: 0 } as FilterContextState;

const filterContextSlice = createSlice({
    name: "filterContext",
    initialState,
    reducers: {
        initialize(state, action: PayloadAction<any>) {
            state.filterContext = action.payload;
        },
    },
});

export const { initialize } = filterContextSlice.actions;
export const filterContextSliceReducer = filterContextSlice.reducer;