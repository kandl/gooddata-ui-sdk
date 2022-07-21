// (C) 2021-2022 GoodData Corporation
import identity from "lodash/identity";
import { PayloadAction } from "@reduxjs/toolkit";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import {
    filterObjRef,
    IMeasure,
    IRelativeDateFilter,
    IAttributeFilter,
    ObjRef,
    isAttributeElementsByValue,
    filterAttributeElements,
    isNegativeAttributeFilter,
    IAttributeElement,
} from "@gooddata/sdk-model";

import { AttributeFilterReducer } from "../state";
import { AsyncOperationStatus } from "../../../types/common";

/**
 * @internal
 */
export type InitActionPayload = {
    attributeFilter: IAttributeFilter;
    hiddenElements?: string[];
    staticElements?: IAttributeElement[];
    correlationId: string;
};

const init: AttributeFilterReducer<PayloadAction<InitActionPayload>> = (state, action) => {
    state.displayForm = filterObjRef(action.payload.attributeFilter);
    const elements = filterAttributeElements(action.payload.attributeFilter);
    state.elementsForm = isAttributeElementsByValue(elements) ? "values" : "uris";
    const elementKeys = isAttributeElementsByValue(elements) ? elements.values : elements.uris;
    state.committedSelection = elementKeys;
    state.workingSelection = elementKeys;
    const isInverted = isNegativeAttributeFilter(action.payload.attributeFilter);
    state.isCommittedSelectionInverted = isInverted;
    state.isWorkingSelectionInverted = isInverted;
    state.hiddenElements = action.payload.hiddenElements;
    state.staticElements = action.payload.staticElements;
};

const initSuccess: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const initError: AttributeFilterReducer<PayloadAction<{ error: any; correlationId: string }>> = (
    state,
    action,
) => {
    state.initError = action.payload.error;
};

const initCancel: AttributeFilterReducer<PayloadAction<{ correlationId: string }>> = identity;

const setInitStatus: AttributeFilterReducer<PayloadAction<AsyncOperationStatus>> = (state, action) => {
    state.initStatus = action.payload;
};

const reset: AttributeFilterReducer = identity;

const setDisplayForm: AttributeFilterReducer<PayloadAction<{ search: string }>> = (state, action) => {
    state.search = action.payload.search;
};

const setElementsForm: AttributeFilterReducer<PayloadAction<{ displayForm: ObjRef }>> = (state, action) => {
    state.displayForm = action.payload.displayForm;
};

const setSearch: AttributeFilterReducer<PayloadAction<{ search: string }>> = (state, action) => {
    state.search = action.payload.search;
};

const setLimitingAttributeFilters: AttributeFilterReducer<
    PayloadAction<{ filters: IElementsQueryAttributeFilter[] }>
> = (state, action) => {
    state.limitingAttributeFilters = action.payload.filters;
};

const setLimitingMeasures: AttributeFilterReducer<PayloadAction<{ filters: IMeasure[] }>> = (
    state,
    action,
) => {
    state.limitingMeasures = action.payload.filters;
};

const setLimitingDateFilters: AttributeFilterReducer<PayloadAction<{ filters: IRelativeDateFilter[] }>> = (
    state,
    action,
) => {
    state.limitingDateFilters = action.payload.filters;
};

const setHiddenElements: AttributeFilterReducer<PayloadAction<{ hiddenElements: string[] | undefined }>> = (
    state,
    action,
) => {
    state.hiddenElements = action.payload.hiddenElements;
};

/**
 * @internal
 */
export const mainReducers = {
    init,
    initSuccess,
    initError,
    initCancel,
    setInitStatus,
    //
    setDisplayForm,
    setElementsForm,
    setSearch,
    setLimitingAttributeFilters,
    setLimitingMeasures,
    setLimitingDateFilters,
    setHiddenElements,
    //
    reset,
};
