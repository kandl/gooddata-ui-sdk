import { IMultiSelectAttributeFilterHandler, AsyncOperationStatus } from "../../AttributeFilterHandler/index.js";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import { IAttributeDisplayFormMetadataObject, IAttributeElement, IAttributeFilter, IAttributeMetadataObject, IMeasure, IRelativeDateFilter, SortDirection } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export interface IUseAttributeFilterHandlerStateResult {
    attributeFilter: IAttributeFilter;
    displayForm?: IAttributeDisplayFormMetadataObject;
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
        data?: IAttributeElement[];
        totalCount?: number;
        totalCountWithCurrentSettings?: number;
        initialPageLoad: {
            status: AsyncOperationStatus;
            error?: GoodDataSdkError;
        };
        nextPageLoad: {
            status: AsyncOperationStatus;
            error?: GoodDataSdkError;
        };
        options?: {
            offset: number;
            limit: number;
            order?: SortDirection;
            search?: string;
            limitingAttributeFilters?: IElementsQueryAttributeFilter[];
            limitingMeasures?: IMeasure[];
            limitingDateFilters?: IRelativeDateFilter[];
        };
    };
    selection: {
        committed: {
            elements?: IAttributeElement[];
            keys?: string[];
            isInverted?: boolean;
        };
        working: {
            elements?: IAttributeElement[];
            keys?: string[];
            isInverted?: boolean;
            isChanged?: boolean;
            isEmpty?: boolean;
        };
    };
    config?: {
        hiddenElements?: string[];
        staticElements?: IAttributeElement[];
    };
}
/**
 * @internal
 */
export declare const useAttributeFilterHandlerState: (handler: IMultiSelectAttributeFilterHandler) => IUseAttributeFilterHandlerStateResult;
