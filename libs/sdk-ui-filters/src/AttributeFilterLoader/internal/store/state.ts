// (C) 2022 GoodData Corporation
import { CaseReducer, AnyAction } from "@reduxjs/toolkit";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import {
    IAttributeElement,
    ObjRef,
    IAttributeMetadataObject,
    IMeasure,
    IRelativeDateFilter,
} from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { AsyncOperationStatus } from "../../types/common";

/**
 * @internal
 */
export interface AttributeFilterState {
    displayForm?: ObjRef;
    elementsForm?: "uris" | "values";

    // Selection
    committedSelection?: string[];
    isCommittedSelectionInverted?: boolean;
    // commitedSelection: {
    //     keys: string[];
    //     isInverted: boolean;
    // }
    // workingSelection: {
    //     keys: string[];
    //     isInverted: boolean;
    // }
    // init: {
    //     status: AsyncOperationStatus;
    //     error: GoodDataSdkError;
    // }
    // attribute: {
    //     data: IAttributeMetadataObject;
    //     status: AsyncOperationStatus;
    //     error: GoodDataSdkError;
    // }
    // elements: {
    //     cache: Record<string, IAttributeElement>;
    //     data: string[];
    //     totalCount: number;
    //     status: AsyncOperationStatus;
    //     error: GoodDataSdkError;
    //     lastLoadSettings: {
    //         offset: number;
    //         limit: number;
    //         order: "asc" | "desc";
    //         search?: string;
    //         limitingAttributeFilters?: IElementsQueryAttributeFilter[];
    //         limitingMeasures?: IMeasure[];
    //         limitingDateFilters?: IRelativeDateFilter[];
    //     }
    //     nextLoadSettings: {
    //         offset: number;
    //         limit: number;
    //         order: "asc" | "desc";
    //         search?: string;
    //         limitingAttributeFilters?: IElementsQueryAttributeFilter[];
    //         limitingMeasures?: IMeasure[];
    //         limitingDateFilters?: IRelativeDateFilter[];
    //     }
    // }
    // config: {
    //     displayForm?: ObjRef;
    //     elementsForm?: "uris" | "values";
    //     hiddenElements?: string[];
    //     staticElements?: IAttributeElement[];
    // }

    workingSelection?: string[];
    isWorkingSelectionInverted?: boolean;

    initStatus: AsyncOperationStatus;
    initError?: GoodDataSdkError;

    // Loaded attribute of the display form
    attribute?: IAttributeMetadataObject;
    attributeStatus: AsyncOperationStatus;
    attributeError?: GoodDataSdkError;

    // Loaded attribute elements cache
    attributeElementsMap?: Record<string, IAttributeElement>;

    // Loaded attribute elements
    attributeElements?: string[];
    attributeElementsTotalCount?: number;
    attributeElementsTotalCountWithCurrentSettings?: number;

    loadAttributeElementsInitialPageStatus: AsyncOperationStatus;
    loadAttributeElementsInitialPageError?: GoodDataSdkError;

    loadAttributeElementsNextPageStatus: AsyncOperationStatus;
    loadAttributeElementsNextPageError?: GoodDataSdkError;

    // nextElementOptions: {}
    // lastElementOptions: {}

    // Load attribute elements options
    offset: number;
    limit: number;
    order: "asc" | "desc";
    search?: string;
    limitingAttributeFilters?: IElementsQueryAttributeFilter[];
    limitingMeasures?: IMeasure[];
    limitingDateFilters?: IRelativeDateFilter[];

    hiddenElements?: string[];
    staticElements?: IAttributeElement[];
}

/**
 * @internal
 */
export const initialState: AttributeFilterState = {
    initStatus: "pending",
    attributeStatus: "pending",
    loadAttributeElementsInitialPageStatus: "pending",
    loadAttributeElementsNextPageStatus: "pending",
    limit: 550,
    offset: 0,
    order: "asc",
};

/**
 * @internal
 */
export type AttributeFilterReducer<A extends AnyAction = AnyAction> = CaseReducer<AttributeFilterState, A>;
