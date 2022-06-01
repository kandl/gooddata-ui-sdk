// (C) 2021-2022 GoodData Corporation
import { PayloadAction } from "@reduxjs/toolkit";
import { IAttributeElement, IAttributeElements } from "@gooddata/sdk-model";
import identity from "lodash/identity";

import { AttributeFilterReducer } from "../state";

const attributeElementsRequest: AttributeFilterReducer<
    PayloadAction<{
        // TODO: replace with ElementsQueryOptionsElementsSpecification
        elements?: IAttributeElements;
        offset?: number;
        limit?: number;
        correlationId: string;
    }>
> = identity;

const attributeElementsSuccess: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
        totalCount: number;
        correlationId: string;
    }>
> = identity;

const attributeElementsError: AttributeFilterReducer<PayloadAction<{ error: any; correlationId: string }>> =
    identity;

const attributeElementsCancelRequest: AttributeFilterReducer = identity; // TODO: should this also have correlation id?

const attributeElementsCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const setAttributeElements: AttributeFilterReducer<
    PayloadAction<{
        attributeElements: IAttributeElement[];
        totalCount: number;
    }>
> = (state, action) => {
    state.attributeElements = action.payload.attributeElements;
    state.attributeElementsTotalCount = action.payload.totalCount;
};

const resetAttributeElements: AttributeFilterReducer = (state) => {
    state.attributeElementsTotalCount = undefined;
    state.attributeElements = undefined;
};

/**
 * @internal
 */
export const attributeElementsReducers = {
    attributeElementsRequest,
    attributeElementsSuccess,
    attributeElementsError,
    attributeElementsCancelRequest,
    attributeElementsCancel,

    setAttributeElements,

    resetAttributeElements,
};
