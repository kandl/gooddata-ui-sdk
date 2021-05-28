// (C) 2021 GoodData Corporation
import { createSlice } from "@reduxjs/toolkit";
import { catalogReducers } from "./catalogReducers";
import { catalogInitialState } from "./catalogState";

const catalogSlice = createSlice({
    name: "catalog",
    initialState: catalogInitialState,
    reducers: catalogReducers,
});

export const catalogSliceReducer = catalogSlice.reducer;
export const catalogActions = catalogSlice.actions;
