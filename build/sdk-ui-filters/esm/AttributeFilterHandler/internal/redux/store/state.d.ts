import { CaseReducer, AnyAction } from "@reduxjs/toolkit";
import { IAttributeElement, ObjRef, IAttributeMetadataObject } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { ILoadElementsOptions, AsyncOperationStatus } from "../../../types/index.js";
/**
 * @internal
 */
export interface AttributeFilterState {
    displayFormRef: ObjRef;
    elementsForm: "uris" | "values";
    initialization: {
        status: AsyncOperationStatus;
        error?: GoodDataSdkError;
    };
    attribute: {
        data?: IAttributeMetadataObject;
        status: AsyncOperationStatus;
        error?: GoodDataSdkError;
    };
    elements: {
        data?: string[];
        totalCount?: number;
        totalCountInitialization: {
            status: AsyncOperationStatus;
            error?: GoodDataSdkError;
        };
        totalCountWithCurrentSettings?: number;
        cache: Record<string, IAttributeElement>;
        initialPageLoad: {
            status: AsyncOperationStatus;
            error?: GoodDataSdkError;
        };
        nextPageLoad: {
            status: AsyncOperationStatus;
            error?: GoodDataSdkError;
        };
        lastLoadedOptions?: ILoadElementsOptions;
        currentOptions: ILoadElementsOptions;
        limitingAttributeFiltersAttributes: IAttributeMetadataObject[];
    };
    selection: {
        commited: {
            keys?: string[];
            isInverted?: boolean;
        };
        working: {
            keys?: string[];
            isInverted?: boolean;
        };
    };
    config: {
        hiddenElements?: string[];
        staticElements?: IAttributeElement[];
    };
}
/**
 * @internal
 */
export declare const initialState: Omit<AttributeFilterState, "displayFormRef" | "elementsForm">;
/**
 * @internal
 */
export type AttributeFilterReducer<A extends AnyAction = AnyAction> = CaseReducer<AttributeFilterState, A>;
