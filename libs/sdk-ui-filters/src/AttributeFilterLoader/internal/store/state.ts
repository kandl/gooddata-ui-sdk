// (C) 2022 GoodData Corporation
import { CaseReducer, AnyAction } from "@reduxjs/toolkit";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import {
    // IAttributeDisplayFormMetadataObject,
    IAttributeElement,
    IAttributeFilter,
    IAttributeMetadataObject,
    IMeasure,
    IRelativeDateFilter,
    SortDirection,
} from "@gooddata/sdk-model";

/**
 * @internal
 */
export interface AttributeFilterState {
    // Attribute filter
    attributeFilter?: IAttributeFilter;

    // Current selection
    isInverted?: boolean;
    selectedAttributeElements?: IAttributeElement[];

    // Backend data / metadata
    attribute?: IAttributeMetadataObject;
    attributeElements?: IAttributeElement[];
    attributeElementsTotalCount?: number;
    attributeElementsTotalCountWithCurrentSettings?: number;

    // Load attribute elements options
    search?: string;
    // limit?: number;
    // offset?: number;
    sortDirection?: SortDirection;
    attributeFilters?: IElementsQueryAttributeFilter[];
    measureFilters?: IMeasure[];
    dateFilter?: IRelativeDateFilter[];
}

/**
 * @internal
 */
export const initialState: AttributeFilterState = {};

/**
 * @internal
 */
export type AttributeFilterReducer<A extends AnyAction = AnyAction> = CaseReducer<AttributeFilterState, A>;
