// (C) 2021-2022 GoodData Corporation
import { PayloadAction } from "@reduxjs/toolkit";
import { IAttributeElement } from "@gooddata/sdk-model";
import identity from "lodash/identity";

import { AttributeFilterReducer } from "../state";
import { ILoadAttributeElementsOptions } from "./types";
import { AsyncOperationStatus } from "../../../types/common";

const attributeElementsRequest: AttributeFilterReducer<
    PayloadAction<
        Omit<ILoadAttributeElementsOptions, "displayFormRef"> & {
            correlationId: string;
        }
    >
> = identity;

const attributeElementsSuccess: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
        totalCount: number;
        correlationId: string;
        limit: number;
        offset: number;
    }>
> = (state, action) => {
    if (!state.attributeElementsMap) {
        state.attributeElementsMap = {};
    }

    action.payload.attributeElements.forEach((el) => {
        if (!state.attributeElementsMap[el.uri]) {
            state.attributeElementsMap[el.uri] = el;
        }
    });
};

const attributeElementsError: AttributeFilterReducer<PayloadAction<{ error: any; correlationId: string }>> =
    identity;

const attributeElementsCancelRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;

const attributeElementsCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const setAttributeElements: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
    }>
> = (state, action) => {
    state.attributeElements = action.payload.attributeElements.map((el) => el.uri);
};

const setStaticAttributeElements: AttributeFilterReducer<
    PayloadAction<{
        staticElements: IAttributeElement[];
    }>
> = (state, action) => {
    state.staticElements = action.payload.staticElements;
};

const setAttributeElementsTotalCount: AttributeFilterReducer<
    PayloadAction<{
        totalCount: number;
    }>
> = (state, action) => {
    state.attributeElementsTotalCount = action.payload.totalCount;
};

const setAttributeElementsTotalCountWithCurrentSettings: AttributeFilterReducer<
    PayloadAction<{
        totalCount: number;
    }>
> = (state, action) => {
    state.attributeElementsTotalCountWithCurrentSettings = action.payload.totalCount;
};

const loadInitialElementsPageRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;
// () => {
//     // todo reset previous error
// };

const setLoadInitialElementsPageStatus: AttributeFilterReducer<PayloadAction<AsyncOperationStatus>> = (
    state,
    action,
) => {
    state.loadAttributeElementsInitialPageStatus = action.payload;
};

const loadInitialElementsPageSuccess: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
        totalCount: number;
        correlationId?: string;
        limit: number;
        offset: number;
    }>
> = identity;

const loadInitialElementsPageError: AttributeFilterReducer<
    PayloadAction<{ error: any; correlationId: string }>
> = (state, action) => {
    state.loadAttributeElementsInitialPageError = action.payload.error;
};

const loadInitialElementsPageCancelRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;

const loadInitialElementsPageCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;

const setLoadNextElementsPageStatus: AttributeFilterReducer<PayloadAction<AsyncOperationStatus>> = (
    state,
    action,
) => {
    state.loadAttributeElementsNextPageStatus = action.payload;
};

const loadNextElementsPageRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;
// () => {
//     // todo reset previous error
// };

const loadNextElementsPageSuccess: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
        totalCount: number;
        correlationId?: string;
        limit: number;
        offset: number;
    }>
> = identity;

const loadNextElementsPageError: AttributeFilterReducer<
    PayloadAction<{ error: any; correlationId: string }>
> = (state, action) => {
    state.loadAttributeElementsNextPageError = action.payload.error;
};

// Remove correlation ID as there can be only 1 running request at the time. (same for other cancel methods, except for custom elements load)
const loadNextElementsPageCancelRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;

const loadNextElementsPageCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

///

const loadCustomElementsRequest: AttributeFilterReducer<
    PayloadAction<{ options: ILoadAttributeElementsOptions; correlationId: string }>
> = identity;
// options: Omit<ILoadAttributeElementsOptions, "displayFormRef">;

const loadCustomElementsSuccess: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
        totalCount: number;
        correlationId?: string;
        limit: number;
        offset: number;
    }>
> = identity;

const loadCustomElementsError: AttributeFilterReducer<PayloadAction<{ error: any; correlationId: string }>> =
    identity;

// check correlation id for cancel vs does not check it
const loadCustomElementsCancelRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> =
    identity;

const loadCustomElementsCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

/**
 * @internal
 */
export const attributeElementsReducers = {
    attributeElementsRequest,
    attributeElementsSuccess,
    attributeElementsError,
    attributeElementsCancelRequest,
    attributeElementsCancel,
    //
    loadInitialElementsPageRequest,
    loadInitialElementsPageSuccess,
    loadInitialElementsPageError,
    loadInitialElementsPageCancelRequest,
    loadInitialElementsPageCancel,
    setLoadInitialElementsPageStatus,
    //
    loadNextElementsPageRequest,
    loadNextElementsPageSuccess,
    loadNextElementsPageError,
    loadNextElementsPageCancelRequest,
    loadNextElementsPageCancel,
    setLoadNextElementsPageStatus,
    //
    loadCustomElementsRequest,
    loadCustomElementsSuccess,
    loadCustomElementsError,
    loadCustomElementsCancelRequest,
    loadCustomElementsCancel,
    //
    setAttributeElements,
    setAttributeElementsTotalCount,
    setAttributeElementsTotalCountWithCurrentSettings,
    setStaticAttributeElements,
};
