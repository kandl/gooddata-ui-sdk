// (C) 2021-2022 GoodData Corporation
import { PayloadAction } from "@reduxjs/toolkit";
import { IAttributeMetadataObject } from "@gooddata/sdk-model";
import identity from "lodash/identity";

import { AttributeFilterReducer } from "../state";
import { AsyncOperationStatus } from "../../../types";

const attributeRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const attributeSuccess: AttributeFilterReducer<
    PayloadAction<{ attribute: IAttributeMetadataObject; correlationId: string }>
> = identity;

const attributeError: AttributeFilterReducer<PayloadAction<{ error: any; correlationId: string }>> = (
    state,
    action,
) => {
    state.attributeError = action.payload.error;
};

const attributeCancelRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const attributeCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const setAttribute: AttributeFilterReducer<PayloadAction<{ attribute: IAttributeMetadataObject }>> = (
    state,
    action,
) => {
    state.attribute = action.payload.attribute;
};

const setLoadAttributeStatus: AttributeFilterReducer<PayloadAction<AsyncOperationStatus>> = (
    state,
    action,
) => {
    state.attributeStatus = action.payload;
};

const loadAttributeRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const loadAttributeSuccess: AttributeFilterReducer<
    PayloadAction<{ attribute: IAttributeMetadataObject; correlationId: string }>
> = identity;

const loadAttributeError: AttributeFilterReducer<PayloadAction<{ error: any; correlationId: string }>> = (
    state,
    action,
) => {
    state.attributeError = action.payload.error;
};

const loadAttributeCancelRequest: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const loadAttributeCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const attributeReset: AttributeFilterReducer = (state) => {
    state.attribute = undefined;
};

/**
 * @internal
 */
export const attributeReducers = {
    attributeRequest,
    attributeSuccess,
    attributeError,
    attributeCancelRequest,
    attributeCancel,
    attributeReset,
    setAttribute,
    // setAttributeStatus,
    //
    loadAttributeRequest,
    loadAttributeSuccess,
    loadAttributeError,
    loadAttributeCancelRequest,
    loadAttributeCancel,
    setLoadAttributeStatus,
};
