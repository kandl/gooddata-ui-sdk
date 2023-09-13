import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import { IAttributeMetadataObject, IMeasure, IRelativeDateFilter, SortDirection } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { AttributeFilterReducer } from "../store/state.js";
import { Correlation } from "../../../types/index.js";
/**
 * @internal
 */
export declare const elementsReducers: {
    setElementsTotalCount: AttributeFilterReducer<{
        payload: {
            totalCount: number;
        };
        type: string;
    }>;
    initTotalCount: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    initTotalCountStart: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    initTotalCountSuccess: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    initTotalCountError: AttributeFilterReducer<{
        payload: {
            error: GoodDataSdkError;
            correlation: Correlation;
        };
        type: string;
    }>;
    initTotalCountCancel: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    setElementsTotalCountWithCurrentSettings: AttributeFilterReducer<{
        payload: {
            totalCount: number;
        };
        type: string;
    }>;
    setOffset: AttributeFilterReducer<{
        payload: {
            offset: number;
        };
        type: string;
    }>;
    setLimit: AttributeFilterReducer<{
        payload: {
            limit: number;
        };
        type: string;
    }>;
    setSearch: AttributeFilterReducer<{
        payload: {
            search: string;
        };
        type: string;
    }>;
    setOrder: AttributeFilterReducer<{
        payload: {
            order: SortDirection;
        };
        type: string;
    }>;
    setLimitingAttributeFilters: AttributeFilterReducer<{
        payload: {
            filters: IElementsQueryAttributeFilter[];
        };
        type: string;
    }>;
    setLimitingMeasures: AttributeFilterReducer<{
        payload: {
            filters: IMeasure[];
        };
        type: string;
    }>;
    setLimitingDateFilters: AttributeFilterReducer<{
        payload: {
            filters: IRelativeDateFilter[];
        };
        type: string;
    }>;
    setLimitingAttributeFiltersAttributes: AttributeFilterReducer<{
        payload: {
            attributes: IAttributeMetadataObject[];
        };
        type: string;
    }>;
};
