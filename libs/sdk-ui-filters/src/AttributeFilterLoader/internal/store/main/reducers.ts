// (C) 2021-2022 GoodData Corporation
import identity from "lodash/identity";
import { PayloadAction } from "@reduxjs/toolkit";

import { AttributeFilterReducer } from "../state";

const init: AttributeFilterReducer = identity;

// TODO: move somewhere else?
const setSearch: AttributeFilterReducer<PayloadAction<{ search: string }>> = (state, action) => {
    state.search = action.payload.search;
};

/**
 * @internal
 */
export const mainReducers = {
    init,
    setSearch,
};
